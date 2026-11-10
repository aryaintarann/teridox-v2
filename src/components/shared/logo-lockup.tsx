"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import type { Mesh, MeshStandardMaterial } from "three";

/**
 * The full Teridox logo (mark + wordmark) from public/teridox_logo_full.glb.
 * Decorative: it assembles once, sways slowly and tilts toward the pointer.
 */
export function LogoLockup({ className = "h-[240px] sm:h-[300px]" }: { className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const darkRef = useRef(false);
  const { resolvedTheme } = useTheme();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    darkRef.current = resolvedTheme === "dark";
  }, [resolvedTheme]);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    let dead = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js");
      const gltf = await new GLTFLoader().loadAsync("/teridox_logo_full.glb");
      if (dead) return;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, 1, 0.5, 80);
      scene.add(new THREE.HemisphereLight(0xffffff, 0x8fa6d8, 1.8));
      const key = new THREE.DirectionalLight(0xffffff, 2.4);
      key.position.set(1.75, 3.5, 4.25);
      scene.add(key);

      // Rotate around the middle of the lockup, not the file's origin.
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const size = box.getSize(new THREE.Vector3());
      gltf.scene.position.copy(box.getCenter(new THREE.Vector3())).negate();
      const root = new THREE.Group();
      root.add(gltf.scene);
      scene.add(root);

      // Every piece rises into place left to right; letters come from below, the mark from above.
      const pieces: { mesh: Mesh; home: import("three").Vector3; delay: number; from: number }[] = [];
      let shared: MeshStandardMaterial | null = null;
      gltf.scene.traverse((o) => {
        const mesh = o as Mesh;
        if (!mesh.isMesh) return;
        shared = mesh.material as MeshStandardMaterial;
        const x = mesh.getWorldPosition(new THREE.Vector3()).x;
        pieces.push({
          mesh,
          home: mesh.position.clone(),
          delay: ((x - box.min.x) / size.x) * 0.9,
          from: mesh.name.startsWith("Teridox_Letter") ? -1.4 : 1.4,
        });
      });
      // The file uses one material for every piece, so one handle lights them all.
      const mat = shared as MeshStandardMaterial | null;
      if (!mat) throw new Error("teridox_logo_full.glb contains no meshes");
      mat.emissive.set(0x1e60d6);

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // The clock starts when the logo first scrolls into view, so the assembly is seen, not missed.
      let t0: number | null = reduce ? performance.now() - 10000 : null;
      const ptr = { x: 0, y: 0, sx: 0, sy: 0 };
      let visible = true;
      let dims = "";
      let raf = 0;

      const frame = () => {
        raf = requestAnimationFrame(frame);
        const cw = canvas.clientWidth;
        const ch = canvas.clientHeight;
        if (!visible || !cw || !ch) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        if (dims !== `${cw}x${ch}@${dpr}`) {
          dims = `${cw}x${ch}@${dpr}`;
          renderer.setPixelRatio(dpr);
          renderer.setSize(cw, ch, false);
          camera.aspect = cw / ch;
          // Fit the whole lockup in the stage with room left for the tilt.
          const ppu = Math.min(cw / (size.x * 1.12), ch / (size.y * 1.16));
          camera.position.set(0, 0, ch / (2 * ppu) / Math.tan((15 * Math.PI) / 180));
          camera.updateProjectionMatrix();
        }

        t0 ??= performance.now();
        const now = (performance.now() - t0) / 1000;
        ptr.sx += (ptr.x - ptr.sx) * 0.08;
        ptr.sy += (ptr.y - ptr.sy) * 0.08;
        const sway = reduce ? 0 : Math.sin(now * 0.6) * 0.12;
        root.rotation.set(0.08 + ptr.sy * 0.25, -0.26 + sway + ptr.sx * 0.45, 0);

        for (const p of pieces) {
          const t = Math.max(0, Math.min(1, (now - p.delay) / 1.2));
          const e = 1 - Math.pow(1 - t, 3);
          p.mesh.position.set(p.home.x, p.home.y + p.from * (1 - e), p.home.z);
          p.mesh.scale.setScalar(Math.max(e, 0.0001));
        }
        mat.emissiveIntensity = darkRef.current ? 0.3 : 0;
        renderer.render(scene, camera);
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        const r = stage.getBoundingClientRect();
        ptr.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
        ptr.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
      };
      const onLeave = () => {
        ptr.x = 0;
        ptr.y = 0;
      };
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      io.observe(stage);
      stage.addEventListener("pointermove", onMove);
      stage.addEventListener("pointerleave", onLeave);
      frame();

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        stage.removeEventListener("pointermove", onMove);
        stage.removeEventListener("pointerleave", onLeave);
        for (const p of pieces) p.mesh.geometry.dispose();
        mat.map?.dispose();
        mat.dispose();
        renderer.dispose();
      };
      if (dead) cleanup();
    })().catch(() => {
      if (!dead) setFailed(true);
    });

    return () => {
      dead = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={stageRef} className={`relative w-full ${className}`}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Teridox logo in 3D"
        className="absolute inset-0 block h-full w-full touch-pan-y"
      />
      {failed && (
        <span
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center text-[clamp(48px,8vw,96px)] font-extrabold tracking-[-0.04em] text-accent"
        >
          Teridox
        </span>
      )}
    </div>
  );
}
