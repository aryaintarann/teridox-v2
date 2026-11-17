"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ease } from "@/components/motion/reveal";

export type ReelItem = {
  slug: string;
  title: string;
  summary: string | null;
  category: string | null;
  cover: string | null;
};

// Narrow enough on a phone that the cards either side peek in, which says "swipe".
const CARD_W = "min(72vw,720px)";

/**
 * A looping film strip: the project in the middle is in colour, the ones beside it sit back in
 * black and white, and the strip never runs out. Same controls as the testimonial stack: drag
 * the middle card, or focus the strip and use the arrow keys. A side card slides to the middle.
 */
export function ProjectReel({ items }: { items: ReelItem[] }) {
  const n = items.length;
  const stripRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLLIElement>(null);
  const dragged = useRef(false);
  const reduce = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);

  // One step is a card plus the gap, read from the layout so it follows resizes.
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    // Side cards shrink to 90%, which already opens a gap, so phones skip the extra 20px.
    const measure = () => setStep(el.offsetWidth + (window.innerWidth < 640 ? 0 : 20));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const go = (by: number) => setActive((a) => (a + by + n) % n);

  return (
    <div
      ref={stripRef}
      role="group"
      aria-label="Recent projects. Swipe, or use the left and right arrow keys, to change the one in front."
      tabIndex={n > 1 ? 0 : undefined}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        else if (e.key === "ArrowLeft") go(-1);
      }}
      className="overflow-x-clip py-2 max-sm:-mx-4"
    >
      {/* One grid cell for every card, so the strip is as tall as the tallest one. */}
      <ul className="grid">
        {items.map((item, i) => {
          // Signed distance from the middle, wrapped so the last card sits just left of the first.
          const offset = ((((i - active + n / 2) % n) + n) % n) - n / 2;
          return (
            <ReelCard
              key={item.slug}
              ref={i === 0 ? cardRef : undefined}
              item={item}
              offset={Math.round(offset)}
              n={n}
              step={step}
              still={reduce}
              onGo={go}
              setDragged={(v) => (dragged.current = v)}
              isDragged={() => dragged.current}
              onPick={() => go(Math.round(offset))}
            />
          );
        })}
      </ul>
    </div>
  );
}

function ReelCard({
  item,
  offset,
  n,
  step,
  still,
  onGo,
  setDragged,
  isDragged,
  onPick,
  ref,
}: {
  item: ReelItem;
  offset: number;
  n: number;
  step: number;
  still: boolean;
  onGo: (by: number) => void;
  setDragged: (v: boolean) => void;
  isDragged: () => boolean;
  onPick: () => void;
  ref?: React.Ref<HTMLLIElement>;
}) {
  const front = offset === 0;
  const far = Math.abs(offset) > 1;
  // A card that wraps round the loop crosses the strip unseen: it fades out fast on the way
  // out, and fades in only once it has arrived.
  const fade = far ? { duration: 0.15 } : { duration: 0.2, delay: 0.4 };

  return (
    <motion.li
      ref={ref}
      className={`justify-self-center [grid-area:1/1] ${front && n > 1 ? "cursor-grab touch-pan-y active:cursor-grabbing" : ""}`}
      style={{ width: CARD_W }}
      initial={false}
      animate={{
        x: offset * step,
        scale: far || !front ? 0.9 : 1,
        opacity: far ? 0 : front ? 1 : 0.5,
        filter: `grayscale(${front ? 0 : 1})`,
        zIndex: n - Math.abs(offset),
      }}
      transition={
        still
          ? { duration: 0 }
          : { duration: 0.6, ease, x: { duration: 0.6, ease: "easeInOut" }, opacity: fade }
      }
      drag={front && n > 1 ? "x" : false}
      dragSnapToOrigin
      onDragStart={() => {
        setDragged(true);
      }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.x) > 500) {
          onGo(info.offset.x < 0 ? 1 : -1);
        }
        // The click that ends a drag must not open the project.
        setTimeout(() => setDragged(false), 0);
      }}
    >
      <Link
        href={`/project/${item.slug}`}
        tabIndex={front ? 0 : -1}
        draggable={false}
        onClick={(e) => {
          if (isDragged()) return e.preventDefault();
          // A side card slides to the middle first; the middle card opens the project.
          if (!front) {
            e.preventDefault();
            onPick();
          }
        }}
        className="card flex h-full flex-col gap-3 p-3 pb-6"
      >
        {/* Black bars above and below the still, as on a film frame. */}
        <span className="relative block aspect-[16/9] overflow-hidden rounded-[18px] bg-foreground">
          {item.cover ? (
            <Image
              src={item.cover}
              alt=""
              fill
              draggable={false}
              sizes="(max-width: 768px) 72vw, 720px"
              className="object-cover"
            />
          ) : (
            <span className="absolute inset-0 grid place-items-center text-sm font-semibold text-background/70">
              No cover yet
            </span>
          )}
        </span>
        {item.category && <span className="label px-4 pt-1.5">{item.category}</span>}
        <span className="px-4 text-2xl font-extrabold leading-[1.15] tracking-[-0.02em]">{item.title}</span>
        {item.summary && <span className="line-clamp-2 px-4 text-muted-foreground">{item.summary}</span>}
      </Link>
    </motion.li>
  );
}
