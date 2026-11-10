"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { Mesh, MeshStandardMaterial } from "three";
import { Reveal, RevealText } from "@/components/motion/reveal";

type PartId = "about" | "services" | "project" | "blog";

// Each mesh in public/teridox_logo.glb opens one page. `dir` is the direction
// the piece slides when it is active, `delay` staggers the entrance.
const PARTS = [
  { mesh: "Teridox_WingLeft", id: "about", dir: [-0.48, 0.3, 0.3], delay: 0 },
  { mesh: "Teridox_WingRight", id: "services", dir: [0.48, 0.3, 0.3], delay: 0.15 },
  { mesh: "Teridox_StemTop", id: "project", dir: [-0.38, 0, 0.6], delay: 0.3 },
  { mesh: "Teridox_StemBottom", id: "blog", dir: [0, -0.5, 0.3], delay: 0.45 },
] as const;

const HREF: Record<PartId, string> = {
  about: "/about",
  services: "/services",
  project: "/project",
  blog: "/blog",
};

const CARD_W = 300;
const CARD_H = 270;

export function LogoHero({
  projectTitles,
  postTitles,
}: {
  projectTitles: string[];
  postTitles: string[];
}) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<PartId | null>(null);
  const darkRef = useRef(false);

  const sectionRef = useRef<HTMLElement>(null);
  const [card, setCard] = useState<{ id: PartId; on: boolean }>({ id: "about", on: false });
  const [failed, setFailed] = useState(false);

  // Scrolling away, the stage recedes: it shrinks a little, drifts down and fades, handing the page over.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const stageOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  // The render loop reads the ref, the preview card reads the state.
  const setActive = (id: PartId | null) => {
    activeRef.current = id;
    setCard((c) => (id ? { id, on: true } : c.on ? { ...c, on: false } : c));
  };

  useEffect(() => {
    darkRef.current = resolvedTheme === "dark";
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let dead = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js");
      const gltf = await new GLTFLoader().loadAsync("/teridox_logo.glb");
      if (dead) return;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, 1, 0.5, 80);
      scene.add(new THREE.HemisphereLight(0xffffff, 0x8fa6d8, 1.8));
      const key = new THREE.DirectionalLight(0xffffff, 2.4);
      key.position.set(1.75, 3.5, 4.25);
      scene.add(key);

      // Rotate around the logo's center, not the file's origin.
      const center = new THREE.Box3().setFromObject(gltf.scene).getCenter(new THREE.Vector3());
      gltf.scene.position.copy(center).negate();
      const root = new THREE.Group();
      root.add(gltf.scene);
      scene.add(root);

      const parts = PARTS.map((p) => {
        const mesh = gltf.scene.getObjectByName(p.mesh) as Mesh | undefined;
        if (!mesh) throw new Error(`teridox_logo.glb has no mesh named ${p.mesh}`);
        // The file shares one material; each piece needs its own to light up alone.
        const material = (mesh.material as MeshStandardMaterial).clone();
        material.emissive.set(0x1e60d6);
        mesh.material = material;
        return { ...p, mesh, material, home: mesh.position.clone(), ex: 0 };
      });
      const meshes = parts.map((p) => p.mesh);

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const stackedQuery = window.matchMedia("(max-width: 980px)");
      const t0 = performance.now() - (reduce ? 10000 : 0);
      const ptr = { x: 0, y: 0, sx: 0, sy: 0 };
      let raf = 0;
      let visible = true;
      let size = "";

      const frame = () => {
        raf = requestAnimationFrame(frame);
        const cw = canvas.clientWidth;
        const ch = canvas.clientHeight;
        if (!visible || !cw || !ch) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        if (size !== `${cw}x${ch}@${dpr}`) {
          size = `${cw}x${ch}@${dpr}`;
          renderer.setPixelRatio(dpr);
          renderer.setSize(cw, ch, false);
          camera.aspect = cw / ch;
        }

        // Fit the logo into the free area beside the headline (wide) or below
        // it (narrow), so it never sits under the text.
        const cr = canvas.getBoundingClientRect();
        const tr = colRef.current?.getBoundingClientRect();
        const legendH = 48; // bottom margin kept free for the hint line
        let ppu: number; // pixels per model unit; the logo spans about 4.4 units
        let shiftX = 0;
        let shiftY = 0;
        if (!stackedQuery.matches) {
          const textRight = (tr ? tr.right - cr.left : 560) + 56;
          const regionW = Math.max(200, cw - 28 - textRight);
          ppu = Math.min((ch - legendH - 110) / 4.4, regionW / 4.4);
          shiftX = (textRight + regionW / 2 - cw / 2) / ppu;
        } else {
          const textBottom = (tr ? tr.bottom - cr.top : 400) + 32;
          const regionH = Math.max(240, ch - legendH - 32 - textBottom);
          ppu = Math.min(regionH / 4.4, (cw - 24) / 4.6);
          shiftY = -(textBottom + regionH / 2 - ch / 2) / ppu;
        }
        const dist = ch / (2 * ppu) / Math.tan((15 * Math.PI) / 180);
        camera.position.set(-shiftX, -shiftY, dist);
        camera.updateProjectionMatrix();

        const now = (performance.now() - t0) / 1000;
        ptr.sx += (ptr.x - ptr.sx) * 0.08;
        ptr.sy += (ptr.y - ptr.sy) * 0.08;
        const sway = reduce ? 0 : Math.sin(now * 0.6) * 0.14;
        root.rotation.set(0.1 + ptr.sy * 0.32, -0.32 + sway + ptr.sx * 0.55, 0);

        const activeId = activeRef.current;
        for (const p of parts) {
          const t = Math.max(0, Math.min(1, (now - p.delay) / 1.4));
          const enter = 1 - Math.pow(1 - t, 3);
          p.ex += ((p.id === activeId ? 1 : 0) - p.ex) * 0.12;
          const k = p.ex + (1 - enter) * 4;
          p.mesh.position.set(
            p.home.x + p.dir[0] * k,
            p.home.y + p.dir[1] * k,
            p.home.z + p.dir[2] * k,
          );
          p.mesh.scale.setScalar(Math.max(enter, 0.0001));
          p.material.emissiveIntensity = p.ex * 0.35 + (darkRef.current ? 0.3 : 0);
          p.material.color.setScalar(activeId && p.id !== activeId ? 0.78 : 1);
        }
        renderer.render(scene, camera);
      };

      const ray = new THREE.Raycaster();
      const ndc = new THREE.Vector2();
      const pick = (e: MouseEvent): PartId | null => {
        const r = canvas.getBoundingClientRect();
        ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, 1 - ((e.clientY - r.top) / r.height) * 2);
        ray.setFromCamera(ndc, camera);
        const hit = ray.intersectObjects(meshes, false)[0];
        return hit ? parts[meshes.indexOf(hit.object as Mesh)].id : null;
      };

      // The preview card follows the pointer and never takes pointer events.
      const placeCard = (e: MouseEvent) => {
        if (!cardRef.current) return;
        const r = canvas.getBoundingClientRect();
        let x = e.clientX - r.left + 26;
        let y = e.clientY - r.top + 26;
        if (x + CARD_W > r.width - 12) x = e.clientX - r.left - CARD_W - 26;
        if (y + CARD_H > r.height - 12) y = e.clientY - r.top - CARD_H - 26;
        x = Math.max(12, Math.min(x, r.width - CARD_W - 12));
        y = Math.max(12, y);
        cardRef.current.style.transform = `translate(${Math.round(x)}px,${Math.round(y)}px)`;
      };

      let touch = false;
      let armed: PartId | null = null;
      const onDown = (e: PointerEvent) => {
        touch = e.pointerType !== "mouse";
      };
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        const r = canvas.getBoundingClientRect();
        ptr.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
        ptr.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
        const id = pick(e);
        canvas.style.cursor = id ? "pointer" : "default";
        if (id) placeCard(e);
        setActive(id);
      };
      const onLeave = (e: PointerEvent) => {
        ptr.x = 0;
        ptr.y = 0;
        if (e.pointerType === "mouse") setActive(null);
      };
      const onClick = (e: MouseEvent) => {
        const id = pick(e);
        if (!id) {
          armed = null;
          setActive(null);
          return;
        }
        // Touch has no hover: the first tap shows the preview, the second opens the page.
        if (touch && armed !== id) {
          armed = id;
          placeCard(e);
          setActive(id);
          return;
        }
        router.push(HREF[id]);
      };

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      io.observe(canvas);
      canvas.addEventListener("pointerdown", onDown);
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerleave", onLeave);
      canvas.addEventListener("click", onClick);
      frame();

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        canvas.removeEventListener("pointerdown", onDown);
        canvas.removeEventListener("pointermove", onMove);
        canvas.removeEventListener("pointerleave", onLeave);
        canvas.removeEventListener("click", onClick);
        for (const p of parts) {
          p.mesh.geometry.dispose();
          p.material.map?.dispose();
          p.material.dispose();
        }
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
  }, [router]);

  const previews: Record<PartId, { n: string; title: string; blurb: string; items: string[] }> = {
    about: {
      n: "01 / About",
      title: "About Teridox",
      blurb: "A technical partner for businesses that want to scale, at work since 2024.",
      items: ["Fast", "On-Target", "Quality"],
    },
    services: {
      n: "02 / Services",
      title: "Our Services",
      blurb: "Custom websites, cross-platform apps, SaaS platforms, and AI features.",
      items: ["Web Development", "Mobile Apps", "SaaS", "AI Integration"],
    },
    project: {
      n: "03 / Project",
      title: "Our Work",
      blurb: "Recent builds for clients and our own products.",
      items: projectTitles,
    },
    blog: {
      n: "04 / Blog",
      title: "Blog & Insights",
      blurb: "Notes on AI, web strategy, and building digital products.",
      items: postTitles,
    },
  };
  const pv = previews[card.id];

  return (
    <section ref={sectionRef} aria-label="Intro" className="px-4 py-4">
      <motion.div
        className="hero-stage relative overflow-hidden"
        style={{ scale: stageScale, opacity: stageOpacity, y: stageY, transformOrigin: "50% 0%" }}
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Teridox logo in 3D, split into four pieces: About, Services, Project and Blog"
          className="absolute inset-0 block h-full w-full touch-pan-y"
        />

        {failed && (
          <p role="status" className="pointer-events-none absolute inset-x-0 bottom-40 px-6 text-center text-[15px] text-muted-foreground">
            The 3D logo could not load. The links below open the same pages.
          </p>
        )}

        <div className="pointer-events-none absolute inset-0 flex flex-col justify-start min-[981px]:justify-center">
          <div className="mx-auto w-full max-w-[1208px] px-6 py-9">
            <div
              ref={colRef}
              className="flex max-w-[520px] flex-col items-start gap-5 min-[981px]:max-w-[min(520px,34vw)]"
            >
              {/* Hero sequence: headline first, then the line under it, then the buttons. */}
              <RevealText
                as="h1"
                delay={0.15}
                className="text-[clamp(36px,4.6vw,72px)] font-extrabold leading-[1.02] tracking-[-0.035em] text-balance"
              >
                Web, mobile, and AI, built to scale.
              </RevealText>
              <Reveal delay={0.7}>
                <p className="max-w-[440px] text-lg text-muted-foreground">
                  Since 2024, Teridox has built websites, cross-platform mobile apps, and AI
                  features for businesses that are growing.
                </p>
              </Reveal>
              <Reveal delay={0.9} className="pointer-events-auto flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-primary min-h-[52px] px-7">
                  Start a project
                </Link>
                <Link href="/project" className="btn btn-quiet min-h-[52px] px-7">
                  See our work
                </Link>
              </Reveal>
            </div>
          </div>
        </div>

        <p className="pointer-events-none absolute inset-x-0 bottom-4 px-4 text-center text-sm font-semibold text-muted-foreground">
          <span className="[@media(hover:none)]:hidden">Hover a piece of the logo, click it to open</span>
          <span className="hidden [@media(hover:none)]:inline">Tap a piece of the logo to preview, tap again to open</span>
        </p>

        <div
          ref={cardRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 w-[300px] max-w-[calc(100%-24px)]"
        >
          <div
            className="glass flex flex-col gap-3 rounded-[20px] p-5 transition-[opacity,translate] duration-200"
            style={{
              // More opaque than the navbar glass: the blue logo sits right behind this text.
              background: "color-mix(in srgb, var(--surface-card) 86%, transparent)",
              opacity: card.on ? 1 : 0,
              translate: card.on ? "0 0" : "0 8px",
            }}
          >
            <div className="flex items-center justify-between gap-3 text-sm font-bold">
              <span className="text-accent">{pv.n}</span>
              <span className="text-muted-foreground">Click or tap again to open</span>
            </div>
            <p className="text-[26px] font-extrabold leading-[1.1] tracking-[-0.02em]">{pv.title}</p>
            <p className="text-[15px] text-muted-foreground">{pv.blurb}</p>
            <ul className="flex flex-wrap gap-1.5">
              {pv.items.map((item) => (
                <li key={item} className="chip max-w-full truncate">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
