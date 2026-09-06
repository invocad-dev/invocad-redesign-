import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  createInvoluteGearGeometry,
  createInternalRingGearGeometry,
  createBearingAssembly,
  createCarrierGeometry,
  createSocketHeadBolt,
} from './gearGeometry';
import {
  createBrushedMetalTexture,
  createTurnedMetalTexture,
  createBeadBlastedTexture,
} from './cadTextures';
import { MECHANICAL_PARTS, MechanicalPartInfo } from './mechanicalData';
import {
  Maximize2,
  RotateCcw,
  Layers,
  Eye,
  Sliders,
  Play,
  Pause,
  Info,
  Compass,
  X,
} from 'lucide-react';

export type CADRenderMode = 'solid' | 'wireframe' | 'xray';
export type ViewAngle = 'iso' | 'front' | 'side' | 'top';

export interface MechanicalViewportProps {
  className?: string;
  autoRotate?: boolean;
  cameraZ?: number;
  rotationOffset?: { x: number; y: number };
  explosionFactor?: number;
  showControls?: boolean;
  interactive?: boolean;
  onOpenInspectModal?: (partId?: string) => void;
}

export const MechanicalViewport: React.FC<MechanicalViewportProps> = ({
  className = '',
  autoRotate = true,
  cameraZ = 8.5,
  rotationOffset = { x: 0.35, y: -0.45 },
  explosionFactor: controlledExplosion = 0,
  showControls = true,
  interactive = true,
  onOpenInspectModal,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef<boolean>(false);

  // State for interactive UI controls
  const [explosion, setExplosion] = useState<number>(controlledExplosion);
  const [renderMode, setRenderMode] = useState<CADRenderMode>('solid');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(autoRotate);
  const [hoveredPart, setHoveredPart] = useState<MechanicalPartInfo | null>(null);
  const [selectedPart, setSelectedPart] = useState<MechanicalPartInfo | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Synchronize if controlled from props
  useEffect(() => {
    if (controlledExplosion !== undefined) {
      setExplosion(controlledExplosion);
    }
  }, [controlledExplosion]);

  // Three.js internal references
  const threeRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    mainGroup: THREE.Group;
    groups: Record<string, THREE.Group>;
    materials: Record<string, THREE.MeshStandardMaterial>;
    guideLines: THREE.LineSegments;
    raycaster: THREE.Raycaster;
    mouse: THREE.Vector2;
    clock: THREE.Clock;
    animId: number;
    targetCamPos: THREE.Vector3 | null;
    targetLookAt: THREE.Vector3 | null;
  } | null>(null);

  // 1. Initialize Scene & Three.js Engine
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // SCENE & ENVIRONMENT
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, cameraZ);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Studio Environment Reflections via PMREM RoomEnvironment
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    const envTexture = pmrem.fromScene(roomEnv, 0.04).texture;
    scene.environment = envTexture;

    // STUDIO LIGHTING SETUP
    const ambientLight = new THREE.AmbientLight(0xf5f7fa, 0.85);
    scene.add(ambientLight);

    // Key Light (warm studio spotlight)
    const keyLight = new THREE.DirectionalLight(0xfffcf5, 3.2);
    keyLight.position.set(6, 9, 8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0004;
    scene.add(keyLight);

    // Cool Rim Light (accents CNC chamfers and gear teeth)
    const rimLight = new THREE.DirectionalLight(0xc8e6ff, 2.4);
    rimLight.position.set(-8, -4, -6);
    scene.add(rimLight);

    // Diffuse Fill Light
    const fillLight = new THREE.DirectionalLight(0xffeedd, 1.1);
    fillLight.position.set(1, 10, 2);
    scene.add(fillLight);

    // Ground Contact Shadow Disc
    const groundGeo = new THREE.PlaneGeometry(12, 12);
    const groundCanvas = document.createElement('canvas');
    groundCanvas.width = 256;
    groundCanvas.height = 256;
    const gctx = groundCanvas.getContext('2d');
    if (gctx) {
      const grad = gctx.createRadialGradient(128, 128, 10, 128, 128, 120);
      grad.addColorStop(0, 'rgba(0,0,0,0.35)');
      grad.addColorStop(0.5, 'rgba(0,0,0,0.12)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      gctx.fillStyle = grad;
      gctx.fillRect(0, 0, 256, 256);
    }
    const groundTex = new THREE.CanvasTexture(groundCanvas);
    const groundMat = new THREE.MeshBasicMaterial({
      map: groundTex,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -2.8;
    scene.add(groundMesh);

    // ORBIT CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = interactive;
    controls.enableRotate = interactive;
    controls.enablePan = interactive;
    controls.minDistance = 3.5;
    controls.maxDistance = 16.0;
    controls.autoRotate = false; // Managed in custom loop

    // PROCEDURAL PBR MATERIALS
    const brushedTex = createBrushedMetalTexture();
    const turnedTex = createTurnedMetalTexture();
    const beadTex = createBeadBlastedTexture();

    const matSteel = new THREE.MeshStandardMaterial({
      color: 0x94a1b0,
      metalness: 0.92,
      roughness: 0.22,
      roughnessMap: brushedTex,
    });

    const matChrome = new THREE.MeshStandardMaterial({
      color: 0xf4f8fc,
      metalness: 0.98,
      roughness: 0.05,
    });

    const matAlum = new THREE.MeshStandardMaterial({
      color: 0xd8e0e8,
      metalness: 0.85,
      roughness: 0.32,
      roughnessMap: beadTex,
    });

    const matDark = new THREE.MeshStandardMaterial({
      color: 0x181c22,
      metalness: 0.88,
      roughness: 0.28,
      roughnessMap: turnedTex,
    });

    const matBrass = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.88,
      roughness: 0.24,
    });

    const matSeal = new THREE.MeshStandardMaterial({
      color: 0x151618,
      metalness: 0.05,
      roughness: 0.85,
    });

    const materials = {
      steel: matSteel,
      chrome: matChrome,
      alum: matAlum,
      dark: matDark,
      brass: matBrass,
      seal: matSeal,
    };

    // ASSEMBLY HIERARCHY
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Input Splined Drive Shaft
    const shaftGrp = new THREE.Group();
    shaftGrp.name = 'shaft';
    const shaftBody = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 4.4, 36), matSteel);
    shaftBody.rotation.x = Math.PI / 2;
    shaftBody.castShadow = true;
    shaftGrp.add(shaftBody);

    // Involute Spline Teeth along shaft
    for (let s = 0; s < 12; s++) {
      const sang = (s * Math.PI * 2) / 12;
      const spline = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.07, 2.2), matDark);
      spline.position.set(Math.cos(sang) * 0.33, Math.sin(sang) * 0.33, 0.7);
      spline.castShadow = true;
      shaftGrp.add(spline);
    }
    // Circlip retention groove
    const groove = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.03, 10, 36), matDark);
    groove.position.z = 1.6;
    shaftGrp.add(groove);

    // 2. Sun Pinion Gear (Z=14)
    const sunGrp = new THREE.Group();
    sunGrp.name = 'sunGear';
    const sunGeo = createInvoluteGearGeometry(0.74, 14, 0.52, 0.34, {
      addendumMod: 0.22,
      dedendumMod: 0.25,
      hasKeyway: true,
      lighteningPockets: 0,
    });
    const sunMesh = new THREE.Mesh(sunGeo, matSteel);
    sunMesh.castShadow = true;
    sunGrp.add(sunMesh);

    // 3. Planetary Reduction Pinions (3x Z=10) & Hardened Pins
    const planetGrps: THREE.Group[] = [];
    const PLANET_R = 1.28;
    const planetsParentGrp = new THREE.Group();
    planetsParentGrp.name = 'planets';

    for (let p = 0; p < 3; p++) {
      const pGrp = new THREE.Group();
      const pAngle = (p * Math.PI * 2) / 3;
      pGrp.position.set(Math.cos(pAngle) * PLANET_R, Math.sin(pAngle) * PLANET_R, 0);

      // Planet Gear with 3 lightening pockets
      const pGeo = createInvoluteGearGeometry(0.48, 10, 0.48, 0.18, {
        addendumMod: 0.18,
        dedendumMod: 0.22,
        hasKeyway: false,
        lighteningPockets: 3,
        pocketRadius: 0.07,
        pocketDistance: 0.3,
      });
      const pMesh = new THREE.Mesh(pGeo, matAlum);
      pMesh.castShadow = true;
      pGrp.add(pMesh);

      // Hardened Ground Pivot Pin
      const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.84, 24), matSteel);
      pin.rotation.x = Math.PI / 2;
      pin.castShadow = true;
      pGrp.add(pin);

      // Brass thrust washer
      const washer = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.04, 24), matBrass);
      washer.rotation.x = Math.PI / 2;
      washer.position.z = 0.28;
      pGrp.add(washer);

      planetGrps.push(pGrp);
      planetsParentGrp.add(pGrp);
    }

    // 4. Internal Annulus Ring Gear (Z=34) with Inspection Cutaway
    const ringGrp = new THREE.Group();
    ringGrp.name = 'ringGear';
    const ringGeo = createInternalRingGearGeometry(1.85, 2.38, 34, 0.88, Math.PI * 0.42);
    const ringMesh = new THREE.Mesh(ringGeo, matSteel);
    ringMesh.castShadow = true;
    ringGrp.add(ringMesh);

    // 5. 5-Axis CNC Tri-Lobe Carrier Spider
    const carrierGrp = new THREE.Group();
    carrierGrp.name = 'carrier';
    const carrierGeo = createCarrierGeometry(0.72, PLANET_R, 0.44, 0.17, 0.26);
    const carrierMesh = new THREE.Mesh(carrierGeo, matAlum);
    carrierMesh.castShadow = true;
    carrierGrp.add(carrierMesh);

    // Carrier central splined output hub
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.65, 32), matAlum);
    hub.rotation.x = Math.PI / 2;
    hub.position.z = -0.35;
    hub.castShadow = true;
    carrierGrp.add(hub);

    // 6. Deep Groove Ball Bearings (Front & Rear)
    const bearFront = createBearingAssembly(0.9, 1.8, 0.42, 10, {
      steel: matSteel,
      chrome: matChrome,
      brass: matBrass,
      seal: matSeal,
    });
    bearFront.name = 'bearingFront';
    bearFront.position.z = 1.15;

    const bearRear = createBearingAssembly(0.8, 1.6, 0.38, 9, {
      steel: matSteel,
      chrome: matChrome,
      brass: matBrass,
      seal: matSeal,
    });
    bearRear.name = 'bearingRear';
    bearRear.position.z = -1.25;

    // 7. Aluminum Housing Shell with Perimeter Heat Dissipation Fins
    const housingGrp = new THREE.Group();
    housingGrp.name = 'housing';
    const shell = new THREE.Mesh(new THREE.CylinderGeometry(2.42, 2.42, 1.15, 56, 1, true), matDark);
    shell.rotation.x = Math.PI / 2;
    shell.castShadow = true;
    housingGrp.add(shell);

    // Aerodynamic Cooling Fins
    for (let f = -0.42; f <= 0.42; f += 0.21) {
      const fin = new THREE.Mesh(new THREE.TorusGeometry(2.44, 0.042, 12, 56), matAlum);
      fin.position.z = f;
      housingGrp.add(fin);
    }

    // Rear Mounting Flange with 8 counterbored holes
    const flangeGrp = new THREE.Group();
    flangeGrp.name = 'flange';
    flangeGrp.position.z = -1.35;
    const flange = new THREE.Mesh(new THREE.CylinderGeometry(2.85, 2.85, 0.28, 56), matSteel);
    flange.rotation.x = Math.PI / 2;
    flange.castShadow = true;
    flangeGrp.add(flange);

    // 8. Socket Head Cap Screws (8x DIN 912 M8)
    const boltGrps: THREE.Group[] = [];
    const boltsParentGrp = new THREE.Group();
    boltsParentGrp.name = 'bolts';

    for (let b = 0; b < 8; b++) {
      const bAng = (b * Math.PI * 2) / 8;
      const bR = 2.62;
      const bolt = createSocketHeadBolt(0.16, 0.26, 0.09, 0.58, 0.16, {
        blackOxide: matDark,
        steel: matSteel,
      });
      bolt.position.set(Math.cos(bAng) * bR, Math.sin(bAng) * bR, -1.18);
      boltGrps.push(bolt);
      boltsParentGrp.add(bolt);
    }

    // Exploded Axis Guide Lines
    const guidePoints = [
      new THREE.Vector3(0, 0, 4.0),
      new THREE.Vector3(0, 0, -4.0),
    ];
    const guideGeo = new THREE.BufferGeometry().setFromPoints(guidePoints);
    const guideMat = new THREE.LineDashedMaterial({
      color: 0x38bdf8,
      dashSize: 0.15,
      gapSize: 0.1,
      opacity: 0.6,
      transparent: true,
    });
    const guideLine = new THREE.LineSegments(guideGeo, guideMat);
    guideLine.computeLineDistances();
    guideLine.visible = false;
    scene.add(guideLine);

    // Attach all groups to main assembly
    mainGroup.add(
      shaftGrp,
      sunGrp,
      planetsParentGrp,
      ringGrp,
      carrierGrp,
      bearFront,
      bearRear,
      housingGrp,
      flangeGrp,
      boltsParentGrp
    );

    // Initial pose
    mainGroup.rotation.set(rotationOffset.x, rotationOffset.y, 0.05);
    mainGroup.scale.setScalar(0.92);

    const groups: Record<string, THREE.Group> = {
      shaft: shaftGrp,
      sunGear: sunGrp,
      planets: planetsParentGrp,
      ringGear: ringGrp,
      carrier: carrierGrp,
      bearingFront: bearFront,
      bearingRear: bearRear,
      housing: housingGrp,
      flange: flangeGrp,
      bolts: boltsParentGrp,
      main: mainGroup,
    };

    // Store references
    threeRef.current = {
      scene,
      camera,
      renderer,
      controls,
      mainGroup,
      groups,
      materials,
      guideLines: guideLine,
      raycaster: new THREE.Raycaster(),
      mouse: new THREE.Vector2(),
      clock: new THREE.Clock(),
      animId: 0,
      targetCamPos: null,
      targetLookAt: null,
    };

    // MOUSE INTERACTION & RAYCASTING
    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / container.clientHeight) * 2 - 1);

      if (threeRef.current) {
        threeRef.current.mouse.x = nx;
        threeRef.current.mouse.y = ny;

        // Perform raycast
        threeRef.current.raycaster.setFromCamera(threeRef.current.mouse, camera);
        const intersects = threeRef.current.raycaster.intersectObjects(mainGroup.children, true);

        if (intersects.length > 0) {
          // Traverse up to find top group name
          let obj: THREE.Object3D | null = intersects[0].object;
          let matchedPartId: string | null = null;

          while (obj && obj !== mainGroup) {
            if (obj.name && MECHANICAL_PARTS[obj.name]) {
              matchedPartId = obj.name;
              break;
            }
            obj = obj.parent;
          }

          if (matchedPartId && MECHANICAL_PARTS[matchedPartId]) {
            setHoveredPart(MECHANICAL_PARTS[matchedPartId]);
            setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            container.style.cursor = 'pointer';
            return;
          }
        }

        setHoveredPart(null);
        container.style.cursor = 'default';
      }
    };

    const onClick = () => {
      if (hoveredPart) {
        setSelectedPart(hoveredPart);
      }
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('click', onClick);

    // RESIZE LISTENER
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // RENDER ANIMATION LOOP
    const animate = () => {
      threeRef.current!.animId = requestAnimationFrame(animate);
      const dt = threeRef.current!.clock.getDelta();
      const elapsed = threeRef.current!.clock.getElapsedTime();

      // Mechanical Gear Train Kinematics
      if (isPlaying) {
        // Sun gear rotates at driver speed
        sunGrp.rotation.z += dt * 1.6;

        // Planet gears rotate on their own pins with matching ratio
        planetGrps.forEach((p) => {
          p.children[0].rotation.z -= dt * 2.24; // Involute mesh
        });

        // Carrier rotates at planetary epicyclic reduction ratio: Z_sun / (Z_sun + Z_ring) = 14 / (14 + 34) = 0.291
        carrierGrp.rotation.z += dt * 0.46;
        planetsParentGrp.rotation.z += dt * 0.46;
      }

      // Auto-rotation when not actively orbiting
      if (isAutoRotate && !isInteractingRef.current) {
        mainGroup.rotation.y += dt * 0.15;
      }

      // Camera tweening for view angle transitions
      if (threeRef.current?.targetCamPos) {
        camera.position.lerp(threeRef.current.targetCamPos, 0.08);
        if (camera.position.distanceTo(threeRef.current.targetCamPos) < 0.05) {
          threeRef.current.targetCamPos = null;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Track user interaction on controls
    const onControlsStart = () => {
      isInteractingRef.current = true;
    };
    const onControlsEnd = () => {
      isInteractingRef.current = false;
    };
    controls.addEventListener('start', onControlsStart);
    controls.addEventListener('end', onControlsEnd);

    // CLEANUP
    return () => {
      cancelAnimationFrame(threeRef.current?.animId || 0);
      controls.removeEventListener('start', onControlsStart);
      controls.removeEventListener('end', onControlsEnd);
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      pmrem.dispose();
      roomEnv.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [cameraZ, interactive, rotationOffset.x, rotationOffset.y]);

  // 2. Exploded View Coordinate Displacement
  useEffect(() => {
    const ref = threeRef.current;
    if (!ref) return;
    const ef = explosion;

    // Explode components smoothly along their CAD assembly vectors
    ref.groups.shaft.position.z = ef * 2.8;
    ref.groups.sunGear.position.z = ef * 1.7;
    ref.groups.bearingFront.position.z = 1.15 + ef * 2.2;

    // Carrier & planets separate forward
    ref.groups.carrier.position.z = ef * 1.0;
    ref.groups.planets.position.z = ef * 1.0;

    // Expand planets radially outwards slightly in exploded state for maximum clarity
    const planetCluster = ref.groups.planets.children;
    planetCluster.forEach((p, idx) => {
      const pAngle = (idx * Math.PI * 2) / 3;
      const baseR = 1.28;
      const expR = baseR + ef * 0.75;
      p.position.set(Math.cos(pAngle) * expR, Math.sin(pAngle) * expR, 0);
    });

    // Rear stack separates backwards
    ref.groups.bearingRear.position.z = -1.25 - ef * 1.6;
    ref.groups.flange.position.z = -1.35 - ef * 1.3;
    ref.groups.bolts.position.z = -ef * 2.1;

    // Toggle exploded guide lines
    if (ref.guideLines) {
      ref.guideLines.visible = ef > 0.15;
    }
  }, [explosion]);

  // 3. Render Mode Switching (Solid / Wireframe / X-Ray)
  useEffect(() => {
    const ref = threeRef.current;
    if (!ref) return;

    const applyMaterialMode = (obj: THREE.Object3D) => {
      if (obj instanceof THREE.Mesh) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((m) => {
          const mat = m as any;
          if (renderMode === 'wireframe') {
            mat.wireframe = true;
            mat.transparent = false;
            mat.opacity = 1.0;
          } else if (renderMode === 'xray') {
            mat.wireframe = false;
            if (obj.parent?.name === 'housing' || obj.parent?.name === 'flange') {
              mat.transparent = true;
              mat.opacity = 0.28;
            } else {
              mat.transparent = false;
              mat.opacity = 1.0;
            }
          } else {
            // Solid PBR
            mat.wireframe = false;
            mat.transparent = false;
            mat.opacity = 1.0;
          }
        });
      }
      obj.children.forEach(applyMaterialMode);
    };

    applyMaterialMode(ref.mainGroup);
  }, [renderMode]);

  // 4. View Angle Transition Helper
  const setViewAngle = useCallback((view: ViewAngle) => {
    const ref = threeRef.current;
    if (!ref) return;

    let target: THREE.Vector3;
    switch (view) {
      case 'front':
        target = new THREE.Vector3(0, 0, 8.5);
        break;
      case 'side':
        target = new THREE.Vector3(8.5, 0, 0);
        break;
      case 'top':
        target = new THREE.Vector3(0, 8.5, 0.1);
        break;
      case 'iso':
      default:
        target = new THREE.Vector3(5.8, 4.5, 6.2);
        break;
    }

    ref.targetCamPos = target;
    ref.controls.target.set(0, 0, 0);
  }, []);

  const resetView = useCallback(() => {
    const ref = threeRef.current;
    if (!ref) return;
    ref.targetCamPos = new THREE.Vector3(5.8, 4.5, 6.2);
    ref.controls.target.set(0, 0, 0);
    ref.mainGroup.rotation.set(rotationOffset.x, rotationOffset.y, 0.05);
    setExplosion(0);
    setSelectedPart(null);
  }, [rotationOffset]);

  return (
    <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full" style={{ touchAction: 'none' }} />

      {/* FLOATING CAD CONTROLS TOOLBAR */}
      {showControls && (
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
          {/* Left: Engineering Status Indicator */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/90 shadow-lg pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-wider uppercase">
              Planetary Transmission • 1:4.2 Ratio
            </span>
          </div>

          {/* Right: Quick Action Controls */}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {/* Auto-Rotate Toggle */}
            <button
              onClick={() => setIsAutoRotate(!isAutoRotate)}
              title={isAutoRotate ? 'Pause Rotation' : 'Auto-Rotate'}
              className={`p-2 rounded-lg backdrop-blur-md border transition-all text-xs font-mono
                ${isAutoRotate ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300' : 'bg-black/60 border-white/10 text-white/70 hover:text-white'}`}
            >
              <RotateCcw size={14} className={isAutoRotate ? 'animate-spin' : ''} style={{ animationDuration: '8s' }} />
            </button>

            {/* Play/Pause Kinematics */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? 'Pause Mechanism' : 'Run Mechanism'}
              className={`p-2 rounded-lg backdrop-blur-md border transition-all text-xs font-mono
                ${isPlaying ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300' : 'bg-black/60 border-white/10 text-white/70 hover:text-white'}`}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>

            {/* Reset Camera */}
            <button
              onClick={resetView}
              title="Reset Camera View"
              className="p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-all"
            >
              <Compass size={14} />
            </button>

            {/* Full CAD Inspection Modal Launcher */}
            {onOpenInspectModal && (
              <button
                onClick={() => onOpenInspectModal(selectedPart?.id || hoveredPart?.id)}
                title="Open CAD Workbench"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition-all shadow-md"
              >
                <Maximize2 size={13} />
                <span className="font-mono tracking-wide uppercase">Inspect CAD</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* BOTTOM FLOATING CONTROLS: Exploded View Slider & Display Modes */}
      {showControls && (
        <div className="absolute bottom-4 left-4 right-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pointer-events-none z-20">
          {/* Exploded Slider Bar */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-white shadow-xl pointer-events-auto">
            <Sliders size={14} className="text-cyan-400 flex-shrink-0" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-white/70 flex-shrink-0">
              Explode:
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={explosion}
              onChange={(e) => setExplosion(parseFloat(e.target.value))}
              className="w-24 md:w-32 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <span className="text-[11px] font-mono text-cyan-300 w-8 text-right">
              {Math.round(explosion * 100)}%
            </span>
            <button
              onClick={() => setExplosion(explosion > 0.5 ? 0 : 1)}
              className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
            >
              {explosion > 0.5 ? 'Assemble' : 'Explode'}
            </button>
          </div>

          {/* Mode Selector & View Angle Buttons */}
          <div className="flex items-center gap-2 pointer-events-auto">
            {/* Display Mode: Solid / Wireframe / X-Ray */}
            <div className="flex items-center p-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 shadow-xl">
              {(['solid', 'wireframe', 'xray'] as CADRenderMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setRenderMode(mode)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all
                    ${renderMode === mode ? 'bg-cyan-500 text-black font-semibold shadow-sm' : 'text-white/70 hover:text-white'}`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* View Presets: ISO / Front / Side */}
            <div className="hidden sm:flex items-center p-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 shadow-xl">
              {(['iso', 'front', 'side'] as ViewAngle[]).map((angle) => (
                <button
                  key={angle}
                  onClick={() => setViewAngle(angle)}
                  className="px-2 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {angle}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE PART HOVER TOOLTIP / HUD */}
      {hoveredPart && tooltipPos && (
        <div
          className="absolute z-30 pointer-events-none transition-all duration-150 transform -translate-x-1/2 -translate-y-full mb-3"
          style={{
            left: `${Math.min(Math.max(tooltipPos.x, 140), 380)}px`,
            top: `${Math.max(tooltipPos.y - 12, 60)}px`,
          }}
        >
          <div className="p-3 rounded-xl bg-black/85 backdrop-blur-lg border border-cyan-400/40 text-white shadow-2xl min-w-[220px]">
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1.5 mb-2">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                {hoveredPart.partNumber}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>
            <div className="font-semibold text-xs text-white leading-tight mb-1">
              {hoveredPart.name}
            </div>
            <div className="text-[10px] text-white/70 leading-relaxed font-mono space-y-0.5">
              <div>Mat: <span className="text-white">{hoveredPart.material.split(',')[0]}</span></div>
              <div>Tol: <span className="text-white/90">{hoveredPart.tolerance}</span></div>
              <div>Finish: <span className="text-white/90">{hoveredPart.surfaceFinish}</span></div>
            </div>
            <div className="mt-2 text-[9px] font-mono text-cyan-300/80 uppercase tracking-wider text-right">
              Click to pin specs
            </div>
          </div>
        </div>
      )}

      {/* PINNED SELECTED PART INSPECTION CARD */}
      {selectedPart && (
        <div className="absolute top-16 right-4 z-30 w-72 p-4 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/15 text-white shadow-2xl animate-fade-up pointer-events-auto">
          <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider">
                {selectedPart.partNumber}
              </span>
            </div>
            <button
              onClick={() => setSelectedPart(null)}
              className="w-5 h-5 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10"
            >
              <X size={12} />
            </button>
          </div>

          <h4 className="font-bold text-sm text-white mb-2 leading-tight">
            {selectedPart.name}
          </h4>
          <p className="text-xs text-white/70 leading-relaxed mb-3">
            {selectedPart.description}
          </p>

          <div className="space-y-1.5 text-[11px] font-mono bg-white/5 p-2.5 rounded-xl border border-white/5 mb-3">
            <div className="flex justify-between">
              <span className="text-white/50">Standard:</span>
              <span className="text-white font-medium">{selectedPart.standard}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Material:</span>
              <span className="text-white font-medium">{selectedPart.material.split(' ')[0]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Treatment:</span>
              <span className="text-white font-medium">{selectedPart.treatment.split(',')[0]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Finish:</span>
              <span className="text-white font-medium">{selectedPart.surfaceFinish.split(' ')[0]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Mass:</span>
              <span className="text-white font-medium">{selectedPart.mass}</span>
            </div>
          </div>

          {onOpenInspectModal && (
            <button
              onClick={() => onOpenInspectModal(selectedPart.id)}
              className="w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs tracking-wider uppercase font-mono transition-colors text-center"
            >
              Full CAD Analysis
            </button>
          )}
        </div>
      )}
    </div>
  );
};
