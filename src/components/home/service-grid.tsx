"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ease, Reveal } from "@/components/motion/reveal";

type Service = { readonly name: string; readonly text: string };

const viewport = { once: true, margin: "0px 0px -10% 0px" } as const;

/** A tick that draws itself, the same line-drawing language as the process flow. */
function Tick({ delay, still }: { delay: number; still: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-[3px] size-4 shrink-0">
      <motion.path
        d="M3 8.5 L6.5 12 L13 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={still ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={viewport}
        transition={{ duration: 0.4, ease, delay }}
      />
    </svg>
  );
}

/**
 * Web development is the main line of work, so it takes the large accent card with what it
 * covers. The other three sit beside it, smaller, and lift a little under the pointer.
 */
export function ServiceGrid({
  main,
  points,
  others,
}: {
  main: Service;
  points: readonly string[];
  others: readonly Service[];
}) {
  const still = useReducedMotion() ?? false;

  return (
    <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
      <Reveal className="card-accent flex flex-col gap-6 p-[clamp(28px,4vw,48px)]">
        <h3 className="text-[clamp(28px,3.2vw,40px)] font-extrabold leading-[1.08] tracking-[-0.03em]">
          {main.name}
        </h3>
        <p className="max-w-[560px] text-lg">{main.text}</p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {points.map((point, i) => (
            <motion.li
              key={point}
              className="flex gap-3 font-semibold"
              initial={still ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease, delay: 0.3 + i * 0.1 }}
            >
              <Tick delay={0.45 + i * 0.1} still={still} />
              {point}
            </motion.li>
          ))}
        </ul>
        <Link href="/services" className="btn btn-light mt-auto min-h-12 self-start px-6">
          Web development in detail
        </Link>
      </Reveal>

      <ul className="flex flex-col gap-4">
        {others.map((s, i) => (
          <Reveal
            as="li"
            key={s.name}
            delay={0.15 + i * 0.1}
            className="card flex flex-1 flex-col gap-2 p-7"
            whileHover={still ? undefined : { y: -4 }}
          >
            <h3 className="text-[22px] font-extrabold leading-[1.15] tracking-[-0.02em]">{s.name}</h3>
            <p className="text-muted-foreground">{s.text}</p>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
