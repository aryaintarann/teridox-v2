"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { animate, cancelFrame, frame, motionValue, transformValue } from "motion";
import { threeEffect } from "motion/three";
import { AnimatePresence, motion } from "motion/react";
import type { BufferGeometry, Material, Mesh, MeshStandardMaterial } from "three";
import { ease } from "@/components/motion/reveal";

// Session flag. The inline script in layout.tsx reads the same key before first paint.
const INTRO_KEY = "teridox-intro";

const clamp = (v: number) => Math.min(1, Math.max(0, v));

function IntroScene({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bar] = useState(() => motionValue(0));

  useEffect(() => {
    const canvas = canvasRef.current;
    // The layout script only sets "play" on a first visit with motion allowed.
    if (!canvas || document.documentElement.dataset.intro !== "play") return;
    const overlay = canvas.parentElement!;

    let dead = false;
    let finished = false;
    const undo: (() => void)[] = [];

    // The page under the overlay is rendered but must not scroll or take focus yet.
    const blocked = [...document.body.children].filter(
      (el): el is HTMLElement => el instanceof HTMLElement && el !== overlay && !el.inert,
    );
    for (const el of blocked) el.inert = true;
    document.documentElement.style.overflow = "hidden";
    const release = () => {
      for (const el of blocked) el.inert = false;
      document.documentElement.style.overflow = "";
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      clearTimeout(cap);
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {}
      release();
      // The hero logo waits for this before it assembles.
      document.documentElement.dataset.introDone = "";
      window.dispatchEvent(new Event("intro-done"));
      onDone();
    };
    // A slow or failed download never traps the visitor behind the loader.
    const cap = setTimeout(finish, 4000);

    (async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js");
      const gltf = await new GLTFLoader().loadAsync("/teridox_logo_full.glb", (e) => {
        if (e.total) bar.set((e.loaded / e.total) * 0.25);
      });
      if (dead || finished) return;
      clearTimeout(cap);

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, 1, 0.5, 80);
      // Same lights as the hero logo, so the handover does not change the blue.
      scene.add(new THREE.HemisphereLight(0xffffff, 0x8fa6d8, 1.8));
      const key = new THREE.DirectionalLight(0xffffff, 2.4);
      key.position.set(1.75, 3.5, 4.25);
      scene.add(key);

      const box = new THREE.Box3().setFromObject(gltf.scene);
      const size = box.getSize(new THREE.Vector3());
      gltf.scene.position.copy(box.getCenter(new THREE.Vector3())).negate();
      const root = new THREE.Group();
      root.add(gltf.scene);
      scene.add(root);

      const wire = new THREE.LineDashedMaterial({
        color: getComputedStyle(overlay).color,
        dashSize: 0,
        gapSize: 2,
        transparent: true,
      });
      const fills = new Set<Material>();
      const disposables: (BufferGeometry | Material)[] = [wire];

      gltf.scene.traverse((o) => {
        const mesh = o as Mesh;
        if (!mesh.isMesh) return;
        const material = mesh.material as MeshStandardMaterial;
        // Same lift the hero gives the logo on the dark theme, or the navy wordmark sinks into the page.
        if (document.documentElement.classList.contains("dark")) {
          material.emissive.set(0x1e60d6);
          material.emissiveIntensity = 0.3;
        }
        material.transparent = true;
        material.opacity = 0;
        fills.add(material);

        // Only the sharp edges, so the bevels and curves do not turn into a tangle.
        const edges = new THREE.EdgesGeometry(mesh.geometry, 30);
        // Distance runs 0..1 along the whole outline of the piece, so one dash
        // growing from 0 to 1 draws every piece in step.
        const pos = edges.getAttribute("position");
        const dist = new Float32Array(pos.count);
        const a = new THREE.Vector3();
        const b = new THREE.Vector3();
        let total = 0;
        for (let i = 0; i < pos.count; i += 2) {
          dist[i] = total;
          total += a.fromBufferAttribute(pos, i).distanceTo(b.fromBufferAttribute(pos, i + 1));
          dist[i + 1] = total;
        }
        for (let i = 0; i < dist.length; i++) dist[i] /= total || 1;
        edges.setAttribute("lineDistance", new THREE.BufferAttribute(dist, 1));
        mesh.add(new THREE.LineSegments(edges, wire));
        disposables.push(edges, mesh.geometry, material);
      });

      const progress = motionValue(0);
      const drawn = transformValue(() => clamp(progress.get() / 0.6));
      const filled = transformValue(() => clamp((progress.get() - 0.5) / 0.4));

      undo.push(
        threeEffect(wire, {
          dashSize: drawn,
          opacity: transformValue(() => 1 - filled.get() * 0.9),
        }),
        // Turns from a three-quarter view to the pose the hero logo rests in.
        threeEffect(root, {
          rotateY: transformValue(() => -60 + progress.get() * 42),
          rotateX: transformValue(() => 25 - progress.get() * 19),
        }),
        ...[...fills].map((m) => threeEffect(m, { opacity: filled })),
        progress.on("change", (v) => bar.set(0.25 + v * 0.75)),
      );

      let fit = "";
      const render = () => {
        const cw = canvas.clientWidth;
        const ch = canvas.clientHeight;
        if (!cw || !ch) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        if (fit !== `${cw}x${ch}@${dpr}`) {
          fit = `${cw}x${ch}@${dpr}`;
          renderer.setPixelRatio(dpr);
          renderer.setSize(cw, ch, false);
          camera.aspect = cw / ch;
          // Far enough back that the lockup fits the short side with room to turn.
          const half = Math.max(size.y / 2, size.x / 2 / camera.aspect) * 1.6;
          camera.position.z = half / Math.tan((15 * Math.PI) / 180);
          camera.updateProjectionMatrix();
        }
        renderer.render(scene, camera);
      };
      frame.render(render, true);

      const controls = animate(progress, 1, { duration: 2.4, ease: "easeInOut" });
      const hold = { id: 0 as ReturnType<typeof setTimeout> | 0 };
      controls.then(() => {
        // A short beat on the finished logo before the page takes over.
        hold.id = setTimeout(finish, 250);
      });

      undo.push(() => {
        controls.stop();
        clearTimeout(hold.id || undefined);
        cancelFrame(render);
        for (const d of disposables) d.dispose();
        for (const m of fills) (m as Material & { map?: { dispose(): void } | null }).map?.dispose();
        renderer.dispose();
      });
      if (dead) for (const fn of undo.splice(0)) fn();
    })().catch(finish);

    return () => {
      dead = true;
      clearTimeout(cap);
      release();
      for (const fn of undo.splice(0)) fn();
    };
  }, [bar, onDone]);

  return (
    <motion.div
      role="status"
      aria-label="Loading Teridox"
      // Hidden until the layout script asks for it: no flash on repeat visits, nothing stuck without JavaScript.
      className="fixed inset-0 z-[100] hidden bg-background text-accent [html[data-intro=play]_&]:block"
      exit={{ opacity: 0, transition: { duration: 0.5, ease } }}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full" />
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-accent"
        style={{ scaleX: bar }}
      />
    </motion.div>
  );
}

/** First visit to the home page in a session: the logo draws itself, fills in, then hands over. */
export function IntroLoader() {
  const pathname = usePathname();
  // Decided once from the landing URL, so moving to "/" later never replays it.
  const [show, setShow] = useState(pathname === "/");
  const [done] = useState(() => () => setShow(false));

  return <AnimatePresence>{show && <IntroScene onDone={done} />}</AnimatePresence>;
}
