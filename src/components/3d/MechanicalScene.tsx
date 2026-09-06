import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface MechanicalSceneProps {
  scrollProgress: number; // 0 to 1 across whole page
  activeSection: number;  // 0 to 6
  explosionFactor?: number; // 0 (assembled) to 1 (fully exploded)
  isDarkTheme?: boolean;
}

export const MechanicalScene: React.FC<MechanicalSceneProps> = ({
  scrollProgress,
  activeSection,
  explosionFactor = 0,
  isDarkTheme = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const assemblyGroupRef = useRef<THREE.Group | null>(null);

  // Group references for exploded view
  const explodedGroupsRef = useRef<{
    shaft: THREE.Group;
    sunGear: THREE.Group;
    carrier: THREE.Group;
    planets: THREE.Group[];
    bearings: THREE.Group[];
    bolts: THREE.Group[];
    housing: THREE.Group;
    flange: THREE.Group;
  }>({
    shaft: new THREE.Group(),
    sunGear: new THREE.Group(),
    carrier: new THREE.Group(),
    planets: [],
    bearings: [],
    bolts: [],
    housing: new THREE.Group(),
    flange: new THREE.Group(),
  });

  // Mouse parallax
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.5);

    // 2. Renderer
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
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 3. Cinematic Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Main Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(6, 8, 8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Rim / Edge Light (Produces beautiful metallic chamfers)
    const rimLight = new THREE.DirectionalLight(0xaad8ff, 3.2);
    rimLight.position.set(-8, -4, -6);
    scene.add(rimLight);

    // Subtle Top Highlight
    const topLight = new THREE.DirectionalLight(0xffeedd, 1.2);
    topLight.position.set(0, 10, 0);
    scene.add(topLight);

    // 4. Materials (High-Precision PBR)
    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0x9ea8b3,
      metalness: 0.92,
      roughness: 0.22,
    });

    const brushedAluMaterial = new THREE.MeshStandardMaterial({
      color: 0xd6dde3,
      metalness: 0.85,
      roughness: 0.35,
    });

    const darkAnodizedMaterial = new THREE.MeshStandardMaterial({
      color: 0x22262c,
      metalness: 0.88,
      roughness: 0.28,
    });

    const chromeBearingMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f8fa,
      metalness: 0.98,
      roughness: 0.08,
    });

    const brassBushingMaterial = new THREE.MeshStandardMaterial({
      color: 0xc89d3a,
      metalness: 0.9,
      roughness: 0.25,
    });

    // 5. Procedural Precision Mechanical Assembly
    const mainAssembly = new THREE.Group();
    assemblyGroupRef.current = mainAssembly;
    scene.add(mainAssembly);

    const parts = explodedGroupsRef.current;
    parts.planets = [];
    parts.bearings = [];
    parts.bolts = [];

    // Helper: Gear Teeth Generator
    const createGearGeometry = (radius: number, teeth: number, thickness: number, holeRadius: number) => {
      const shape = new THREE.Shape();
      const angleStep = (Math.PI * 2) / teeth;
      const toothHeight = radius * 0.14;
      const toothWidth = angleStep * 0.42;

      for (let i = 0; i < teeth; i++) {
        const angle = i * angleStep;
        const r1 = radius - toothHeight;
        const r2 = radius + toothHeight;

        const x1 = Math.cos(angle - toothWidth) * r1;
        const y1 = Math.sin(angle - toothWidth) * r1;
        const x2 = Math.cos(angle - toothWidth * 0.6) * r2;
        const y2 = Math.sin(angle - toothWidth * 0.6) * r2;
        const x3 = Math.cos(angle + toothWidth * 0.6) * r2;
        const y3 = Math.sin(angle + toothWidth * 0.6) * r2;
        const x4 = Math.cos(angle + toothWidth) * r1;
        const y4 = Math.sin(angle + toothWidth) * r1;

        if (i === 0) shape.moveTo(x1, y1);
        else shape.lineTo(x1, y1);

        shape.lineTo(x2, y2);
        shape.lineTo(x3, y3);
        shape.lineTo(x4, y4);
      }
      shape.closePath();

      // Center Bore Hole
      if (holeRadius > 0) {
        const holePath = new THREE.Path();
        holePath.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
        shape.holes.push(holePath);
      }

      const extrudeSettings = {
        depth: thickness,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.03,
        bevelThickness: 0.03,
      };

      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geo.center();
      return geo;
    };

    // A) Central Splined Drive Shaft
    const shaftGroup = new THREE.Group();
    const shaftCore = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.35, 4.2, 32),
      steelMaterial
    );
    shaftCore.rotation.x = Math.PI / 2;
    shaftGroup.add(shaftCore);

    // Keyway / Splines
    for (let i = 0; i < 6; i++) {
      const spline = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.08, 2.5),
        darkAnodizedMaterial
      );
      const ang = (i * Math.PI) / 3;
      spline.position.set(Math.cos(ang) * 0.36, Math.sin(ang) * 0.36, 0.3);
      shaftGroup.add(spline);
    }
    parts.shaft = shaftGroup;
    mainAssembly.add(shaftGroup);

    // B) Central Sun Gear
    const sunGearGroup = new THREE.Group();
    const sunGearMesh = new THREE.Mesh(
      createGearGeometry(0.85, 14, 0.55, 0.36),
      steelMaterial
    );
    sunGearGroup.add(sunGearMesh);
    parts.sunGear = sunGearGroup;
    mainAssembly.add(sunGearGroup);

    // C) Planetary Carrier Plate
    const carrierGroup = new THREE.Group();
    const carrierPlate = new THREE.Mesh(
      new THREE.CylinderGeometry(1.9, 1.9, 0.22, 48),
      brushedAluMaterial
    );
    carrierPlate.rotation.x = Math.PI / 2;
    carrierGroup.add(carrierPlate);

    // Weight reduction cutouts on carrier
    for (let i = 0; i < 3; i++) {
      const ang = (i * Math.PI * 2) / 3 + Math.PI / 6;
      const cutout = new THREE.Mesh(
        new THREE.CylinderGeometry(0.35, 0.35, 0.26, 24),
        darkAnodizedMaterial
      );
      cutout.rotation.x = Math.PI / 2;
      cutout.position.set(Math.cos(ang) * 1.35, Math.sin(ang) * 1.35, 0);
      carrierGroup.add(cutout);
    }
    parts.carrier = carrierGroup;
    mainAssembly.add(carrierGroup);

    // D) Planetary Gears (3x) with Precision Pins
    const planetOrbitRadius = 1.35;
    for (let i = 0; i < 3; i++) {
      const planetGroup = new THREE.Group();
      const angle = (i * Math.PI * 2) / 3;
      planetGroup.position.set(
        Math.cos(angle) * planetOrbitRadius,
        Math.sin(angle) * planetOrbitRadius,
        0
      );

      const planetGear = new THREE.Mesh(
        createGearGeometry(0.55, 10, 0.5, 0.2),
        brushedAluMaterial
      );
      planetGroup.add(planetGear);

      // Planet Mounting Pin
      const pin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.18, 0.9, 24),
        brassBushingMaterial
      );
      pin.rotation.x = Math.PI / 2;
      planetGroup.add(pin);

      parts.planets.push(planetGroup);
      mainAssembly.add(planetGroup);
    }

    // E) High-Precision Ball Bearings (2 units: front & rear)
    [-1.2, 1.2].forEach((zPos) => {
      const bearingGroup = new THREE.Group();
      bearingGroup.position.z = zPos;

      // Outer Race
      const outerRace = new THREE.Mesh(
        new THREE.TorusGeometry(0.75, 0.08, 16, 48),
        steelMaterial
      );
      bearingGroup.add(outerRace);

      // Inner Race
      const innerRace = new THREE.Mesh(
        new THREE.TorusGeometry(0.48, 0.06, 16, 48),
        steelMaterial
      );
      bearingGroup.add(innerRace);

      // Chrome Balls (12 per bearing)
      for (let b = 0; b < 12; b++) {
        const ballAng = (b * Math.PI * 2) / 12;
        const ball = new THREE.Mesh(
          new THREE.SphereGeometry(0.1, 16, 16),
          chromeBearingMaterial
        );
        ball.position.set(Math.cos(ballAng) * 0.61, Math.sin(ballAng) * 0.61, 0);
        bearingGroup.add(ball);
      }

      parts.bearings.push(bearingGroup);
      mainAssembly.add(bearingGroup);
    });

    // F) Outer Ring Gear & Cylindrical Housing Shell
    const housingGroup = new THREE.Group();
    const housingMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(2.35, 2.35, 1.1, 64, 1, true),
      darkAnodizedMaterial
    );
    housingMesh.rotation.x = Math.PI / 2;
    housingGroup.add(housingMesh);

    // Ribbed Heat Sink Fin Details
    for (let r = -0.4; r <= 0.4; r += 0.2) {
      const fin = new THREE.Mesh(
        new THREE.TorusGeometry(2.37, 0.04, 12, 64),
        brushedAluMaterial
      );
      fin.position.z = r;
      housingGroup.add(fin);
    }
    parts.housing = housingGroup;
    mainAssembly.add(housingGroup);

    // G) Rear Structural Mounting Flange
    const flangeGroup = new THREE.Group();
    flangeGroup.position.z = -1.3;

    const flangePlate = new THREE.Mesh(
      new THREE.CylinderGeometry(2.8, 2.8, 0.28, 64),
      steelMaterial
    );
    flangePlate.rotation.x = Math.PI / 2;
    flangeGroup.add(flangePlate);

    // 8x Socket Head Hex Bolts on Flange Circumference
    for (let b = 0; b < 8; b++) {
      const boltGroup = new THREE.Group();
      const bAngle = (b * Math.PI * 2) / 8;
      const bRad = 2.55;

      boltGroup.position.set(
        Math.cos(bAngle) * bRad,
        Math.sin(bAngle) * bRad,
        -1.15
      );

      // Bolt Head with Socket Hex
      const boltHead = new THREE.Mesh(
        new THREE.CylinderGeometry(0.16, 0.16, 0.35, 6),
        darkAnodizedMaterial
      );
      boltHead.rotation.x = Math.PI / 2;
      boltGroup.add(boltHead);

      const boltShaft = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 0.6, 16),
        steelMaterial
      );
      boltShaft.rotation.x = Math.PI / 2;
      boltShaft.position.z = -0.3;
      boltGroup.add(boltShaft);

      parts.bolts.push(boltGroup);
      mainAssembly.add(boltGroup);
    }
    parts.flange = flangeGroup;
    mainAssembly.add(flangeGroup);

    // Center entire assembly
    mainAssembly.rotation.set(0.35, -0.45, 0.1);
    mainAssembly.scale.set(1.15, 1.15, 1.15);

    // 6. Mouse Tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / height) * 2 - 1);
      mouseRef.current.targetX = x * 0.35;
      mouseRef.current.targetY = y * 0.25;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 7. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse parallax inertia
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Rotate planet gears around sun gear continuously
      parts.sunGear.rotation.z += delta * 1.5;
      parts.planets.forEach((p, idx) => {
        p.rotation.z -= delta * 2.2;
      });

      // Assembly base idle rotation & mouse reaction
      if (mainAssembly) {
        mainAssembly.rotation.x = 0.35 + mouseRef.current.y * 0.5;
        mainAssembly.rotation.y = -0.45 + elapsedTime * 0.15 + mouseRef.current.x * 0.8;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update exploded positions and assembly transformations when props change
  useEffect(() => {
    const parts = explodedGroupsRef.current;
    const assembly = assemblyGroupRef.current;
    if (!assembly) return;

    // Calculate effective explosion progress
    // If activeSection is 5 (Technical Showcase), explode fully
    let targetExplosion = explosionFactor;
    if (activeSection === 5) {
      targetExplosion = Math.max(targetExplosion, 1.0);
    } else if (activeSection === 1) {
      targetExplosion = Math.max(targetExplosion, 0.25);
    } else if (activeSection === 6) {
      targetExplosion = 0.05;
    }

    // Explode parts along Z and radial axes
    const ef = targetExplosion;

    // Front shaft slides forward
    parts.shaft.position.z = ef * 2.6;

    // Sun gear slides slightly forward
    parts.sunGear.position.z = ef * 1.6;

    // Carrier plate moves forward
    parts.carrier.position.z = ef * 1.1;

    // Planets fan outwards and forwards
    parts.planets.forEach((p, idx) => {
      const angle = (idx * Math.PI * 2) / 3;
      p.position.z = ef * 1.1;
      p.position.x = Math.cos(angle) * (1.35 + ef * 0.8);
      p.position.y = Math.sin(angle) * (1.35 + ef * 0.8);
    });

    // Front bearing pulls out forward, rear bearing pushes backward
    if (parts.bearings[0]) parts.bearings[0].position.z = -1.2 - ef * 1.4;
    if (parts.bearings[1]) parts.bearings[1].position.z = 1.2 + ef * 2.0;

    // Bolts unthread and pull backward
    parts.bolts.forEach((b) => {
      b.position.z = -1.15 - ef * 1.8;
    });

    // Rear flange separates backward
    parts.flange.position.z = -1.3 - ef * 1.2;

    // Position assembly on screen based on active section
    // Section 0 (Hero): massive right-shifted position
    // Section 1 (Intro): left-shifted, slightly smaller
    // Section 2 (Capabilities): center-right
    // Section 3 (Projects): background ambient
    // Section 4 (Process): aligned with timeline
    // Section 5 (Technical Exploded): centered, large scale
    // Section 6 (CTA): centered, heroic
    if (activeSection === 0) {
      assembly.position.set(1.4, -0.1, 0);
      assembly.scale.set(1.25, 1.25, 1.25);
    } else if (activeSection === 1) {
      assembly.position.set(-1.6, 0.2, -0.5);
      assembly.scale.set(1.05, 1.05, 1.05);
    } else if (activeSection === 2) {
      assembly.position.set(1.6, 0.0, 0);
      assembly.scale.set(1.15, 1.15, 1.15);
    } else if (activeSection === 3) {
      assembly.position.set(2.0, -0.5, -1.0);
      assembly.scale.set(0.95, 0.95, 0.95);
    } else if (activeSection === 4) {
      assembly.position.set(0, 0.4, -0.8);
      assembly.scale.set(1.0, 1.0, 1.0);
    } else if (activeSection === 5) {
      assembly.position.set(0.6, 0.0, 0.2);
      assembly.scale.set(1.18, 1.18, 1.18);
    } else if (activeSection === 6) {
      assembly.position.set(0, -0.2, 0.4);
      assembly.scale.set(1.3, 1.3, 1.3);
    }
  }, [scrollProgress, activeSection, explosionFactor]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full pointer-events-none select-none"
      style={{ touchAction: 'none' }}
    />
  );
};
