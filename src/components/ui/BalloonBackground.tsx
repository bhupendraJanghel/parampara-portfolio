/**
 * BalloonBackground Component
 * 
 * A high-performance 3D background featuring interactive helium balloons 
 * that fly upwards with realistic physics, translucency, and collisions.
 */

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// ── Physics Engine ────────────────────────────────────────────────────────────
class PhysicsWorld {
  config: BalloonProps;
  positionData: Float32Array;
  velocityData: Float32Array;
  sizeData: Float32Array;
  center: THREE.Vector3 = new THREE.Vector3();

  constructor(config: BalloonProps) {
    this.config = config;
    const count = config.count ?? 150;
    this.positionData = new Float32Array(3 * count).fill(0);
    this.velocityData = new Float32Array(3 * count).fill(0);
    this.sizeData = new Float32Array(count).fill(1);
  }

  repositionAll() {
    const { count = 150, minSize = 0.6, maxSize = 1.2 } = this.config;
    const maxX = this.config.maxX ?? 10;
    const maxY = this.config.maxY ?? 5;
    const maxZ = this.config.maxZ ?? 4;

    for (let i = 0; i < count; i++) {
      const idx = 3 * i;
      // Start them scattered below the visible screen
      this.positionData[idx] = THREE.MathUtils.randFloatSpread(maxX * 1.8);
      this.positionData[idx + 1] = THREE.MathUtils.randFloat(-maxY - 12, -maxY - 4);
      this.positionData[idx + 2] = THREE.MathUtils.randFloatSpread(maxZ * 2);
      this.sizeData[i] = THREE.MathUtils.randFloat(minSize, maxSize);
      this.velocityData[idx + 1] = 0; // Reset velocity
    }
  }

  update(delta: number, isPaused: boolean = false) {
    const {
      count = 150,
      risingSpeed = 0.4,
      friction = 0.985,
      wallBounce = 0.8,
      maxVelocity = 0.2,
      followCursor = true,
    } = this.config;
    const maxX = this.config.maxX ?? 10;
    const maxY = this.config.maxY ?? 5;
    const maxZ = this.config.maxZ ?? 4;

    if (followCursor) {
      const tempCenter = new THREE.Vector3().fromArray(this.positionData, 0);
      tempCenter.lerp(this.center, 0.15).toArray(this.positionData, 0);
      new THREE.Vector3().toArray(this.velocityData, 0);
    }

    const startIdx = followCursor ? 1 : 0;
    const time = Date.now() * 0.001;

    for (let i = startIdx; i < count; i++) {
      const base = 3 * i;
      const pos = new THREE.Vector3().fromArray(this.positionData, base);
      const vel = new THREE.Vector3().fromArray(this.velocityData, base);
      const radius = this.sizeData[i];

      // Gravity/Buoyancy only applies if not paused
      if (!isPaused) {
        vel.y += delta * risingSpeed * (radius * 0.5);
      }

      vel.x += Math.sin(time + i) * 0.001;
      vel.z += Math.cos(time * 0.5 + i) * 0.001;
      vel.multiplyScalar(friction);
      vel.clampLength(0, maxVelocity);
      pos.add(vel);

      for (let j = i + 1; j < count; j++) {
        const ob = 3 * j;
        const op = new THREE.Vector3().fromArray(this.positionData, ob);
        const diff = new THREE.Vector3().subVectors(op, pos);
        const dist = diff.length();
        const sr = radius + this.sizeData[j];

        if (dist < sr && dist > 0.0001) {
          const overlap = sr - dist;
          const axis = diff.clone().normalize();
          const correction = axis.clone().multiplyScalar(0.5 * overlap);
          pos.sub(correction);
          op.add(correction);

          const ov = new THREE.Vector3().fromArray(this.velocityData, ob);
          const relVel = ov.clone().sub(vel);
          const impulse = axis.clone().multiplyScalar(relVel.dot(axis) * 0.3);
          vel.add(impulse);
          ov.sub(impulse);

          op.toArray(this.positionData, ob);
          ov.toArray(this.velocityData, ob);
        }
      }

      // Cursor Interaction (Following)
      if (followCursor) {
        const fp = new THREE.Vector3().fromArray(this.positionData, 0);
        const diff = new THREE.Vector3().subVectors(fp, pos);
        const d = diff.length();
        const sr = 6.0;
        if (d < sr && d > 0.01) {
          const force = (1 - d / sr) * 0.002;
          const pull = diff.clone().normalize().multiplyScalar(force);
          vel.add(pull);
        } else if (d < 0.1) {
          const push = diff.clone().normalize().multiplyScalar(-0.01);
          vel.add(push);
        }
      }

      if (Math.abs(pos.x) + radius > maxX) {
        pos.x = Math.sign(pos.x) * (maxX - radius);
        vel.x *= -wallBounce;
      }
      if (Math.abs(pos.z) + radius > maxZ) {
        pos.z = Math.sign(pos.z) * (maxZ - radius);
        vel.z *= -wallBounce;
      }

      if (pos.y - radius > maxY + 5) {
        pos.y = -maxY - 10;
        pos.x = THREE.MathUtils.randFloatSpread(2 * maxX);
        vel.set(0, 0, 0);
      } else if (pos.y + radius < -maxY - 15) {
        pos.y = -maxY - 14;
      }

      pos.toArray(this.positionData, base);
      vel.toArray(this.velocityData, base);
    }
  }
}

// ── Types ────────────────────────────────────────────────────────────────────
export interface BalloonProps {
  count?: number;
  colors?: string[];
  ambientColor?: string;
  ambientIntensity?: number;
  lightIntensity?: number;
  minSize?: number;
  maxSize?: number;
  risingSpeed?: number;
  friction?: number;
  wallBounce?: number;
  maxVelocity?: number;
  maxX?: number;
  maxY?: number;
  maxZ?: number;
  followCursor?: boolean;
  className?: string;
  backgroundColor?: string;
  startDelay?: number; // In milliseconds
}

// ── Component ────────────────────────────────────────────────────────────────
export const BalloonBackground: React.FC<BalloonProps> = ({
  count = 150,
  colors = ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6'],
  ambientColor = '#ffffff',
  ambientIntensity = 0.8,
  lightIntensity = 150,
  minSize = 0.6,
  maxSize = 1.2,
  risingSpeed = 0.4,
  friction = 0.985,
  wallBounce = 0.8,
  maxVelocity = 0.15,
  followCursor = true,
  className = '',
  backgroundColor,
  startDelay = 1000,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startTimeRef = useRef<number>(Date.now());
  const isMobileRef = useRef<boolean>(false);

  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;
    const canvas = canvasRef.current;
    const parent = containerRef.current;
    if (!canvas || !parent) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: !backgroundColor,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    if (backgroundColor) {
      scene.background = new THREE.Color(backgroundColor);
    }

    const roomEnv = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envTexture = pmrem.fromScene(roomEnv).texture;
    scene.environment = envTexture;
    roomEnv.dispose();

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
    camera.position.z = 20;

    const sphereGeo = new THREE.SphereGeometry(1, 24, 24);
    sphereGeo.scale(0.85, 1.1, 0.85);
    const knotGeo = new THREE.ConeGeometry(0.12, 0.2, 8);
    knotGeo.translate(0, -1.05, 0);
    const balloonGeo = BufferGeometryUtils.mergeGeometries([sphereGeo, knotGeo]);

    // Slightly more solid on mobile for better visibility
    const finalOpacity = isMobileRef.current ? 0.65 : 0.45;
    const finalTransmission = isMobileRef.current ? 0.75 : 0.95;

    const material = new THREE.MeshPhysicalMaterial({
      metalness: 0.1,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.8,
      ior: 1.4,
      sheen: 1.0,
      sheenRoughness: 0.2,
      sheenColor: new THREE.Color('#ffffff'),
      envMapIntensity: 2.0,
      transparent: true,
      opacity: finalOpacity,
      transmission: finalTransmission,
      thickness: 0.2,
      attenuationColor: new THREE.Color('#ffffff'),
      attenuationDistance: 1,
    });

    const imesh = new THREE.InstancedMesh(balloonGeo, material, count);
    scene.add(imesh);

    const rotations = new Float32Array(count * 4);
    for (let i = 0; i < count; i++) {
      const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(THREE.MathUtils.randFloat(-0.1, 0.1), THREE.MathUtils.randFloat(0, Math.PI * 2), THREE.MathUtils.randFloat(-0.1, 0.1)));
      q.toArray(rotations, i * 4);
    }

    const threeColors = colors.map((c) => new THREE.Color(c));
    for (let i = 0; i < count; i++) {
      imesh.setColorAt(i, threeColors[i % threeColors.length]);
    }
    if (imesh.instanceColor) imesh.instanceColor.needsUpdate = true;

    const ambient = new THREE.AmbientLight(ambientColor, ambientIntensity);
    scene.add(ambient);

    const pointLight = new THREE.PointLight('#ffffff', lightIntensity, 50, 1);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    const physics = new PhysicsWorld({
      count, minSize, maxSize, risingSpeed, friction, wallBounce,
      maxVelocity, followCursor, maxX: 10, maxY: 6, maxZ: 4,
    });

    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersection = new THREE.Vector3();
    const pointer = new THREE.Vector2(9999, 9999);

    const updatePointer = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0]?.clientX ?? 0 : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0]?.clientY ?? 0 : (e as MouseEvent).clientY;
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = ((clientY - rect.top) / rect.height) * -2 + 1;
      raycaster.setFromCamera(pointer, camera);
      raycaster.ray.intersectPlane(plane, intersection);
      physics.center.copy(intersection);
    };

    window.addEventListener('mousemove', updatePointer, { passive: true });
    window.addEventListener('touchmove', updatePointer, { passive: true });

    const hasInitialized = { current: false };

    const resize = () => {
      const w = parent.offsetWidth || window.innerWidth;
      const h = parent.offsetHeight || window.innerHeight;
      if (w === 0 || h === 0) return;

      renderer.setSize(w, h);
      const aspect = w / h;
      camera.aspect = aspect;
      
      // Dynamic zoom: On narrow screens, push the camera back to maintain coverage
      if (aspect < 1) {
        camera.position.z = 20 / aspect; // Proportionally zoom out
      } else {
        camera.position.z = 20;
      }
      
      camera.updateProjectionMatrix();

      const fovRad = (camera.fov * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(fovRad / 2) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;

      const isMobile = w < 768;
      physics.config.maxX = visibleWidth / 2;
      physics.config.maxY = visibleHeight / 2;

      if (!hasInitialized.current) {
        physics.repositionAll();
        hasInitialized.current = true;
      }

      const baseScale = isMobile ? 0.65 : 1.0;
      for (let i = 0; i < count; i++) {
        const originalSize = THREE.MathUtils.mapLinear(i / count, 0, 1, minSize, maxSize);
        physics.sizeData[i] = originalSize * baseScale;
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    const scrollData = { y: 0 };
    const handleScroll = () => { scrollData.y = window.scrollY; };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let rafId: number;
    const clock = new THREE.Clock();
    const dummy = new THREE.Object3D();
    const tempQ = new THREE.Quaternion();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);

      // Delay check
      const elapsed = Date.now() - startTimeRef.current;
      const isPaused = elapsed < startDelay;

      physics.update(delta, isPaused);
      const time = Date.now() * 0.001;
      const scrollY = scrollData.y;
      const parallaxFactor = 0.015;

      for (let i = 0; i < count; i++) {
        const baseIdx = i * 3;
        const posX = physics.positionData[baseIdx];
        const posY = physics.positionData[baseIdx + 1];
        const posZ = physics.positionData[baseIdx + 2];

        // Apply Parallax: Shift Y based on scroll
        const depthEffect = (posZ + 5) / 10;
        const finalY = posY + (scrollY * parallaxFactor * (1 + depthEffect));
        // Apply Depth Zoom: Balloons move closer as you scroll
        const finalZ = posZ + (scrollY * 0.005);

        dummy.position.set(posX, finalY, finalZ);
        const s = (i === 0 && followCursor) ? 0.001 : physics.sizeData[i];
        tempQ.fromArray(rotations, i * 4);
        const uprightQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, i, 0));
        tempQ.slerp(uprightQ, 0.02);
        tempQ.toArray(rotations, i * 4);
        dummy.quaternion.copy(tempQ);
        dummy.rotation.z += Math.sin(time * 0.5 + i) * 0.05;
        dummy.rotation.x += Math.cos(time * 0.3 + i) * 0.05;
        dummy.scale.setScalar(s);
        dummy.updateMatrix();
        imesh.setMatrixAt(i, dummy.matrix);
        if (i === 0) pointLight.position.copy(dummy.position);
      }
      imesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', updatePointer);
      window.removeEventListener('touchmove', updatePointer);
      window.removeEventListener('scroll', handleScroll);
      ro.disconnect();
      renderer.dispose();
      balloonGeo.dispose();
      material.dispose();
      pmrem.dispose();
    };
  }, [
    count, colors, ambientColor, ambientIntensity, lightIntensity,
    minSize, maxSize, risingSpeed, friction, wallBounce, maxVelocity,
    followCursor, backgroundColor, startDelay
  ]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 20
      }}
      className={className}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          pointerEvents: 'none' // Crucial for mobile scroll passthrough
        }}
      />
    </div>
  );
};

export default BalloonBackground;
