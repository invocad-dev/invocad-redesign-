import React, { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

interface MechanicalViewportProps {
  className?: string;
  autoRotate?: boolean;
  cameraZ?: number;
  rotationOffset?: { x: number; y: number };
  explosionFactor?: number;
  enableMouseParallax?: boolean;
}

export const MechanicalViewport: React.FC<MechanicalViewportProps> = ({
  className = '',
  autoRotate = true,
  cameraZ = 8.5,
  rotationOffset = { x: 0.3, y: -0.4 },
  explosionFactor = 0,
  enableMouseParallax = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    animId: 0,
    clock: new THREE.Clock(),
  });

  // Explosion groups
  const groupsRef = useRef<{
    shaft: THREE.Group;
    sunGear: THREE.Group;
    carrier: THREE.Group;
    planets: THREE.Group[];
    bearingFront: THREE.Group;
    bearingRear: THREE.Group;
    housing: THREE.Group;
    flange: THREE.Group;
    bolts: THREE.Group[];
    main: THREE.Group;
  } | null>(null);

  const prevExplosionRef = useRef(explosionFactor);

  // Helper: Create spur gear shape extruded
  const createGear = useCallback(
    (radius: number, teeth: number, thickness: number, boreRadius: number): THREE.BufferGeometry => {
      const shape = new THREE.Shape();
      const step = (Math.PI * 2) / teeth;
      const th = radius * 0.13;
      const tw = step * 0.4;
      for (let i = 0; i < teeth; i++) {
        const a = i * step;
        const p = (ang: number, r: number) => [Math.cos(ang) * r, Math.sin(ang) * r] as const;
        const [x1, y1] = p(a - tw, radius - th);
        const [x2, y2] = p(a - tw * 0.5, radius + th);
        const [x3, y3] = p(a + tw * 0.5, radius + th);
        const [x4, y4] = p(a + tw, radius - th);
        if (i === 0) shape.moveTo(x1, y1);
        else shape.lineTo(x1, y1);
        shape.lineTo(x2, y2);
        shape.lineTo(x3, y3);
        shape.lineTo(x4, y4);
      }
      shape.closePath();
      if (boreRadius > 0) {
        const hole = new THREE.Path();
        hole.absarc(0, 0, boreRadius, 0, Math.PI * 2, true);
        shape.holes.push(hole);
      }
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: thickness,
        bevelEnabled: true,
        bevelSegments: 2,
        bevelSize: 0.025,
        bevelThickness: 0.025,
      });
      geo.center();
      return geo;
    },
    []
  );

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = container.clientWidth;
    const H = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
    camera.position.set(0, 0, cameraZ);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting — cinematic studio setup
    scene.add(new THREE.AmbientLight(0xfff8f0, 1.2));

    const key = new THREE.DirectionalLight(0xffffff, 3.0);
    key.position.set(5, 8, 7);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 0.1;
    key.shadow.camera.far = 30;
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xddeeff, 2.4);
    rim.position.set(-7, -3, -5);
    scene.add(rim);

    const fill = new THREE.DirectionalLight(0xffeedd, 0.9);
    fill.position.set(2, 10, 2);
    scene.add(fill);

    // Materials
    const matSteel = new THREE.MeshStandardMaterial({ color: 0x9faab5, metalness: 0.9, roughness: 0.2 });
    const matAlum = new THREE.MeshStandardMaterial({ color: 0xd0d8de, metalness: 0.82, roughness: 0.35 });
    const matDark = new THREE.MeshStandardMaterial({ color: 0x1e2328, metalness: 0.85, roughness: 0.3 });
    const matChrome = new THREE.MeshStandardMaterial({ color: 0xf0f4f7, metalness: 0.98, roughness: 0.07 });
    const matBrass = new THREE.MeshStandardMaterial({ color: 0xc49a2a, metalness: 0.88, roughness: 0.28 });

    // BUILD ASSEMBLY
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // — Shaft —
    const shaftGrp = new THREE.Group();
    const shaftMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 3.8, 32), matSteel);
    shaftMesh.rotation.x = Math.PI / 2;
    shaftMesh.castShadow = true;
    shaftGrp.add(shaftMesh);
    for (let i = 0; i < 6; i++) {
      const ang = (i * Math.PI) / 3;
      const spline = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 2.2), matDark);
      spline.position.set(Math.cos(ang) * 0.29, Math.sin(ang) * 0.29, 0.25);
      shaftGrp.add(spline);
    }

    // — Sun Gear —
    const sunGrp = new THREE.Group();
    const sunMesh = new THREE.Mesh(createGear(0.72, 14, 0.48, 0.3), matSteel);
    sunMesh.castShadow = true;
    sunGrp.add(sunMesh);

    // — Carrier Plate —
    const carrierGrp = new THREE.Group();
    const carrierPlate = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 1.65, 0.2, 48), matAlum);
    carrierPlate.rotation.x = Math.PI / 2;
    carrierPlate.castShadow = true;
    carrierGrp.add(carrierPlate);
    for (let i = 0; i < 3; i++) {
      const ang = (i * Math.PI * 2) / 3 + Math.PI / 6;
      const cutout = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.24, 20), matDark);
      cutout.rotation.x = Math.PI / 2;
      cutout.position.set(Math.cos(ang) * 1.18, Math.sin(ang) * 1.18, 0);
      carrierGrp.add(cutout);
    }

    // — Planet Gears —
    const planetGrps: THREE.Group[] = [];
    const PLANET_R = 1.18;
    for (let i = 0; i < 3; i++) {
      const grp = new THREE.Group();
      const ang = (i * Math.PI * 2) / 3;
      grp.position.set(Math.cos(ang) * PLANET_R, Math.sin(ang) * PLANET_R, 0);
      const planet = new THREE.Mesh(createGear(0.46, 10, 0.44, 0.17), matAlum);
      planet.castShadow = true;
      grp.add(planet);
      const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.76, 20), matBrass);
      pin.rotation.x = Math.PI / 2;
      grp.add(pin);
      planetGrps.push(grp);
    }

    // — Bearings —
    const makeBearing = (): THREE.Group => {
      const grp = new THREE.Group();
      grp.add(Object.assign(new THREE.Mesh(new THREE.TorusGeometry(0.64, 0.07, 14, 40), matSteel), { castShadow: true }));
      grp.add(new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.055, 14, 40), matSteel));
      for (let b = 0; b < 10; b++) {
        const ba = (b * Math.PI * 2) / 10;
        const ball = new THREE.Mesh(new THREE.SphereGeometry(0.085, 14, 14), matChrome);
        ball.position.set(Math.cos(ba) * 0.53, Math.sin(ba) * 0.53, 0);
        grp.add(ball);
      }
      return grp;
    };
    const bearFront = makeBearing();
    bearFront.position.z = 1.05;
    const bearRear = makeBearing();
    bearRear.position.z = -1.05;

    // — Housing Shell —
    const housingGrp = new THREE.Group();
    const shell = new THREE.Mesh(new THREE.CylinderGeometry(2.05, 2.05, 0.96, 56, 1, true), matDark);
    shell.rotation.x = Math.PI / 2;
    shell.castShadow = true;
    housingGrp.add(shell);
    for (let r = -0.35; r <= 0.35; r += 0.18) {
      const fin = new THREE.Mesh(new THREE.TorusGeometry(2.07, 0.035, 10, 56), matAlum);
      fin.position.z = r;
      housingGrp.add(fin);
    }

    // — Rear Flange —
    const flangeGrp = new THREE.Group();
    flangeGrp.position.z = -1.15;
    const flange = new THREE.Mesh(new THREE.CylinderGeometry(2.42, 2.42, 0.24, 56), matSteel);
    flange.rotation.x = Math.PI / 2;
    flange.castShadow = true;
    flangeGrp.add(flange);

    // — Bolts —
    const boltGrps: THREE.Group[] = [];
    for (let b = 0; b < 8; b++) {
      const grp = new THREE.Group();
      const ang = (b * Math.PI * 2) / 8;
      const R = 2.22;
      grp.position.set(Math.cos(ang) * R, Math.sin(ang) * R, -1.0);
      const head = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.3, 6), matDark);
      head.rotation.x = Math.PI / 2;
      grp.add(head);
      const shaft2 = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.5, 14), matSteel);
      shaft2.rotation.x = Math.PI / 2;
      shaft2.position.z = -0.25;
      grp.add(shaft2);
      boltGrps.push(grp);
    }

    // Add all to main
    mainGroup.add(shaftGrp, sunGrp, carrierGrp, bearFront, bearRear, housingGrp, flangeGrp);
    planetGrps.forEach((p) => mainGroup.add(p));
    boltGrps.forEach((b) => mainGroup.add(b));

    // Initial pose
    mainGroup.rotation.set(rotationOffset.x, rotationOffset.y, 0.08);
    mainGroup.scale.setScalar(0.9);

    groupsRef.current = {
      shaft: shaftGrp,
      sunGear: sunGrp,
      carrier: carrierGrp,
      planets: planetGrps,
      bearingFront: bearFront,
      bearingRear: bearRear,
      housing: housingGrp,
      flange: flangeGrp,
      bolts: boltGrps,
      main: mainGroup,
    };

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      if (!enableMouseParallax) return;
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / W) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / H) * 2 - 1);
      stateRef.current.targetMouseX = nx * 0.3;
      stateRef.current.targetMouseY = ny * 0.22;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize
    const onResize = () => {
      if (!container) return;
      const nW = container.clientWidth;
      const nH = container.clientHeight;
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    };
    window.addEventListener('resize', onResize);

    // Animate
    const animate = () => {
      stateRef.current.animId = requestAnimationFrame(animate);
      const s = stateRef.current;
      const dt = s.clock.getDelta();
      const t = s.clock.getElapsedTime();

      // Mouse inertia
      s.mouseX += (s.targetMouseX - s.mouseX) * 0.04;
      s.mouseY += (s.targetMouseY - s.mouseY) * 0.04;

      // Gear rotation
      if (groupsRef.current) {
        groupsRef.current.sunGear.rotation.z += dt * 1.2;
        groupsRef.current.planets.forEach((p) => {
          p.rotation.z -= dt * 1.8;
        });

        // Subtle idle rotation
        if (autoRotate) {
          mainGroup.rotation.y = rotationOffset.y + t * 0.12 + s.mouseX * 0.7;
          mainGroup.rotation.x = rotationOffset.x + s.mouseY * 0.45;
        } else {
          mainGroup.rotation.y = rotationOffset.y + s.mouseX * 0.7;
          mainGroup.rotation.x = rotationOffset.x + s.mouseY * 0.45;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(stateRef.current.animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [cameraZ, autoRotate, rotationOffset.x, rotationOffset.y, enableMouseParallax, createGear]);

  // Update explosion factor reactively
  useEffect(() => {
    const g = groupsRef.current;
    if (!g) return;
    const ef = explosionFactor;
    prevExplosionRef.current = ef;

    g.shaft.position.z = ef * 2.2;
    g.sunGear.position.z = ef * 1.35;
    g.carrier.position.z = ef * 0.9;
    g.planets.forEach((p, i) => {
      const ang = (i * Math.PI * 2) / 3;
      p.position.z = ef * 0.9;
      p.position.x = Math.cos(ang) * (1.18 + ef * 0.7);
      p.position.y = Math.sin(ang) * (1.18 + ef * 0.7);
    });
    g.bearingFront.position.z = 1.05 + ef * 1.6;
    g.bearingRear.position.z = -1.05 - ef * 1.2;
    g.bolts.forEach((b) => {
      b.position.z = -1.0 - ef * 1.5;
    });
    g.flange.position.z = -1.15 - ef * 1.0;
  }, [explosionFactor]);

  return (
    <div
      ref={mountRef}
      className={`pointer-events-none select-none ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
};
