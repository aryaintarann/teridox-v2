"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { ease } from "@/components/motion/reveal";

export type Testimonial = { id: string; quote: string; name: string; position: string | null };

/**
 * Testimonials as a stack: one quote in front, the next two peeking out below it.
 * Swipe the front card, or focus the stack and use the arrow keys.
 */
export function TestimonialDeck({ items }: { items: Testimonial[] }) {
  const n = items.length;
  const stackRef = useRef<HTMLDivElement>(null);
  // `swing` is the card that travels sideways on its way to or from the bottom of the stack.
  const [{ active, swing, dir, reach }, setDeck] = useState({ active: 0, swing: -1, dir: -1, reach: 0 });

  const width = () => (stackRef.current?.offsetWidth ?? 480) * 0.6;
  const next = (to = -1) =>
    setDeck((d) => ({ active: (d.active + 1) % n, swing: d.active, dir: to, reach: width() }));
  const prev = () =>
    setDeck((d) => {
      const a = (d.active - 1 + n) % n;
      return { active: a, swing: a, dir: -1, reach: width() };
    });

  return (
    <>
      {/* One grid cell for every card, so the stack is as tall as the longest quote.
          With no buttons on screen, the arrow keys are the keyboard's way through the stack. */}
      <div
        ref={stackRef}
        role="group"
        aria-label="Client testimonials. Swipe, or use the left and right arrow keys, to change the one in front."
        tabIndex={n > 1 ? 0 : undefined}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") next();
          else if (e.key === "ArrowLeft") prev();
        }}
        className="mx-auto grid w-full max-w-[760px] rounded-[28px] pb-8"
      >
        {items.map((t, i) => {
          const depth = (i - active + n) % n;
          const level = Math.min(depth, 3);
          const front = depth === 0;
          const swinging = i === swing;
          return (
            <motion.figure
              key={t.id}
              className={`card flex origin-bottom flex-col gap-8 p-7 [grid-area:1/1] sm:p-9 ${
                front && n > 1 ? "cursor-grab touch-pan-y active:cursor-grabbing" : ""
              }`}
              initial={false}
              animate={{
                x: swinging ? [null, dir * reach, 0] : 0,
                y: level * 16,
                scale: 1 - level * 0.05,
                opacity: depth > 2 ? 0 : 1,
                zIndex: n - depth,
              }}
              transition={{
                duration: 0.6,
                ease,
                x: { duration: 0.6, ease: "easeInOut" },
                // The swinging card changes layer halfway, once it is clear of the stack.
                zIndex: { duration: 0, delay: swinging ? 0.3 : 0 },
              }}
              drag={front && n > 1 ? "x" : false}
              dragSnapToOrigin
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.x) > 500) {
                  next(Math.sign(info.offset.x) || -1);
                }
              }}
            >
              {/* The cards are glass, so the quotes underneath fade out instead of showing
                  through. They stay in the page for screen readers, in order. */}
              <div
                className={`flex flex-1 flex-col gap-8 transition-opacity duration-300 ${
                  front ? "opacity-100" : "opacity-0"
                }`}
              >
                <blockquote className="text-[22px] font-semibold leading-[1.4] tracking-[-0.01em]">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3.5">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-tint font-extrabold text-accent"
                  >
                    {t.name.charAt(0)}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-bold">{t.name}</span>
                    {t.position && <span className="text-sm text-muted-foreground">{t.position}</span>}
                  </span>
                </figcaption>
              </div>
            </motion.figure>
          );
        })}
      </div>

    </>
  );
}
