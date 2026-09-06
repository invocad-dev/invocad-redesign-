import * as THREE from 'three';

/**
 * Procedural PBR Canvas Texture Generators for Precision Mechanical CAD
 * Creates realistic brushed metal, turned lathe marks, and bead-blasted finishes.
 */

// 1. Brushed stainless steel anisotropic texture
export function createBrushedMetalTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, size, size);

    // Draw fine linear machining brush marks
    for (let i = 0; i < 4000; i++) {
      const y = Math.random() * size;
      const length = Math.random() * 80 + 30;
      const x = Math.random() * size;
      const alpha = Math.random() * 0.12 + 0.02;
      const shade = Math.random() > 0.5 ? 255 : 0;
      ctx.strokeStyle = `rgba(${shade}, ${shade}, ${shade}, ${alpha})`;
      ctx.lineWidth = Math.random() * 1.5 + 0.5;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + length, y);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

// 2. Circular / Lathe-turned tool mark normal/bump pattern
export function createTurnedMetalTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, size, size);

    const cx = size / 2;
    const cy = size / 2;

    // Draw concentric micro-grooves from CNC lathe turning
    for (let r = 5; r < size * 0.7; r += 1.5) {
      const alpha = Math.random() * 0.15 + 0.03;
      const shade = Math.random() > 0.5 ? 240 : 20;
      ctx.strokeStyle = `rgba(${shade}, ${shade}, ${shade}, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// 3. Bead-blasted matte anodized aluminum surface micro-roughness
export function createBeadBlastedTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const imgData = ctx.createImageData(size, size);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 45;
      const val = Math.min(255, Math.max(0, 128 + noise));
      data[i] = val;     // R
      data[i + 1] = val; // G
      data[i + 2] = val; // B
      data[i + 3] = 255; // A
    }

    ctx.putImageData(imgData, 0, 0);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}
