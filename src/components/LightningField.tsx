"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A 3D field of glowing lightning bolts.
 *
 * Each bolt is a procedurally generated path (fractal midpoint displacement)
 * rendered as two additive tubes — a wide soft glow and a bright core — so it
 * reads as real, luminous lightning with depth. The whole rig parallaxes toward
 * the pointer. Everything scales down on small screens, pauses when off-screen
 * or when the tab is hidden, and is skipped entirely under reduced-motion.
 */

type Bolt = {
  core: THREE.Mesh;
  glow: THREE.Mesh;
  baseX: number;
  z: number;
  nextStrike: number;
  life: number; // seconds remaining in current flash, 0 = idle
  duration: number;
};

function buildPath(baseX: number, z: number, spread: number): THREE.Vector3[] {
  const top = new THREE.Vector3(baseX + (Math.random() - 0.5) * spread, 5.2, z);
  const bottom = new THREE.Vector3(baseX + (Math.random() - 0.5) * spread * 1.6, -5.2, z);

  let pts = [top, bottom];
  // Fractal subdivision: insert displaced midpoints a few times.
  for (let iter = 0; iter < 5; iter++) {
    const next: THREE.Vector3[] = [];
    const amp = 0.9 / (iter + 1);
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];
      const mid = a.clone().lerp(b, 0.5);
      mid.x += (Math.random() - 0.5) * amp * 2;
      mid.z += (Math.random() - 0.5) * amp;
      next.push(a, mid);
    }
    next.push(pts[pts.length - 1]);
    pts = next;
  }
  return pts;
}

function makeTube(pts: THREE.Vector3[], radius: number) {
  const curve = new THREE.CatmullRomCurve3(pts);
  return new THREE.TubeGeometry(curve, 60, radius, 6, false);
}

export default function LightningField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.innerWidth < 640;
    const boltCount = isSmall ? 3 : 5;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSmall,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio = renderer.setPixelRatio.bind(renderer);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";

    const rig = new THREE.Group();
    scene.add(rig);

    const coreMat = () =>
      new THREE.MeshBasicMaterial({
        color: 0xfff2c4,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
    const glowMat = () =>
      new THREE.MeshBasicMaterial({
        color: 0xffc400,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

    const bolts: Bolt[] = [];
    for (let i = 0; i < boltCount; i++) {
      const baseX = THREE.MathUtils.lerp(-5.5, 5.5, i / (boltCount - 1)) + (Math.random() - 0.5);
      const z = -3 + Math.random() * 4;
      const pts = buildPath(baseX, z, 1.2);
      const core = new THREE.Mesh(makeTube(pts, 0.018), coreMat());
      const glow = new THREE.Mesh(makeTube(pts, 0.09), glowMat());
      const scale = THREE.MathUtils.mapLinear(z, -3, 1, 0.7, 1.15);
      core.scale.setScalar(scale);
      glow.scale.setScalar(scale);
      rig.add(glow);
      rig.add(core);
      bolts.push({
        core,
        glow,
        baseX,
        z,
        nextStrike: Math.random() * (reduce ? 6 : 2.5),
        life: 0,
        duration: 0,
      });
    }

    // Ambient drifting sparks for depth.
    const sparkCount = isSmall ? 45 : 90;
    const sparkPos = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i++) {
      sparkPos[i * 3] = (Math.random() - 0.5) * 16;
      sparkPos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      sparkPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPos, 3));
    const sparkMat = new THREE.PointsMaterial({
      color: 0xffd84d,
      size: 0.05,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sparks = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparks);

    function restrike(b: Bolt) {
      const pts = buildPath(b.baseX, b.z, 1.2);
      b.core.geometry.dispose();
      b.glow.geometry.dispose();
      b.core.geometry = makeTube(pts, 0.018);
      b.glow.geometry = makeTube(pts, 0.09);
      b.duration = 0.32 + Math.random() * 0.35;
      b.life = b.duration;
    }

    // Pointer parallax (rig rotates gently toward the cursor).
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    function onMove(e: PointerEvent) {
      const r = mount!.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    }
    window.addEventListener("pointermove", onMove, { passive: true });

    let running = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running) clock.start();
      },
      { threshold: 0.01 },
    );
    io.observe(mount);

    const onVisibility = () => {
      running = !document.hidden;
      if (running) clock.start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const clock = new THREE.Clock();
    let raf = 0;

    function frame() {
      raf = requestAnimationFrame(frame);
      if (!running) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      // Ease parallax.
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;
      rig.rotation.y = current.x * 0.22;
      rig.rotation.x = -current.y * 0.14;

      for (const b of bolts) {
        b.nextStrike -= dt;
        if (b.life <= 0 && b.nextStrike <= 0) {
          restrike(b);
          b.nextStrike = (reduce ? 5 : 2) + Math.random() * (reduce ? 6 : 4);
        }
        if (b.life > 0) {
          b.life -= dt;
          const k = Math.max(b.life / b.duration, 0);
          // Sharp attack, flickering decay.
          const flicker = 0.6 + 0.4 * Math.sin(t * 60 + b.baseX);
          const env = Math.pow(k, 0.5) * flicker;
          (b.core.material as THREE.MeshBasicMaterial).opacity = Math.min(env * 1.1, 1);
          (b.glow.material as THREE.MeshBasicMaterial).opacity = env * 0.55;
        } else {
          (b.core.material as THREE.MeshBasicMaterial).opacity *= 0.85;
          (b.glow.material as THREE.MeshBasicMaterial).opacity *= 0.85;
        }
      }

      sparks.rotation.y = t * 0.02;
      sparks.position.y = Math.sin(t * 0.3) * 0.2;

      renderer.render(scene, camera);
    }
    // Kick one bolt immediately so the hero doesn't open empty.
    if (bolts[Math.floor(boltCount / 2)]) restrike(bolts[Math.floor(boltCount / 2)]);
    frame();

    function onResize() {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      bolts.forEach((b) => {
        b.core.geometry.dispose();
        b.glow.geometry.dispose();
        (b.core.material as THREE.Material).dispose();
        (b.glow.material as THREE.Material).dispose();
      });
      sparkGeo.dispose();
      sparkMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
