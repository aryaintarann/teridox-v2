"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ease } from "@/components/motion/reveal";

type Step = { readonly step: string; readonly text: string; readonly output: string };

const viewport = { once: true, margin: "0px 0px -10% 0px" } as const;

/** A line that draws itself from its start to its end when it scrolls into view. */
function Draw({ d, delay, still, className }: { d: string; delay: number; still: boolean; className?: string }) {
  return (
    <motion.path
      d={d}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={still ? false : { pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={viewport}
      transition={{ duration: 0.6, ease, delay }}
    />
  );
}

/** The arrow between two steps: down on a phone, across on a desktop. */
function Link({ delay, still }: { delay: number; still: boolean }) {
  return (
    <div aria-hidden="true" className="flex shrink-0 justify-center text-accent lg:w-12 lg:items-center">
      <svg viewBox="0 0 16 40" className="h-10 w-4 lg:hidden">
        <Draw d="M8 2 V34 M3 28 L8 35 L13 28" delay={delay} still={still} />
      </svg>
      <svg viewBox="0 0 48 16" className="hidden h-4 w-12 lg:block">
        <Draw d="M2 8 H42 M36 3 L43 8 L36 13" delay={delay} still={still} />
      </svg>
    </div>
  );
}

/**
 * The way a project runs, drawn as a pipeline: each step is a node with the thing it hands on,
 * the arrows draw themselves in order, and one line loops from the end back to the start,
 * because support feeds the next round of discovery.
 */
export function ProcessFlow({ steps }: { steps: readonly Step[] }) {
  const still = useReducedMotion() ?? false;
  const stagger = 0.35;

  return (
    <div className="flex flex-col">
      <ol className="flex flex-col lg:flex-row lg:items-stretch">
        {steps.map((s, i) => (
          <Fragment key={s.step}>
            <motion.li
              className="card flex flex-1 flex-col gap-3 p-7"
              initial={still ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.8, ease, delay: i * stagger }}
            >
              <span className="label">0{i + 1}</span>
              <h3 className="text-[22px] font-extrabold leading-[1.15] tracking-[-0.02em]">{s.step}</h3>
              <p className="text-muted-foreground">{s.text}</p>
              <p className="mt-auto flex flex-col gap-0.5 border-t border-border pt-4 text-sm">
                <span className="font-semibold text-muted-foreground">Output</span>
                <span className="font-bold">{s.output}</span>
              </p>
            </motion.li>
            {i < steps.length - 1 && (
              // The arrow is not a list item, so it sits in a presentational wrapper.
              <li role="presentation" aria-hidden="true" className="contents">
                <Link delay={i * stagger + 0.4} still={still} />
              </li>
            )}
          </Fragment>
        ))}
      </ol>

      {/* Desktop only: the loop from the last step back to the first. On a phone the steps stack,
          and the closing line says the same in words. */}
      <div aria-hidden="true" className="relative hidden h-14 text-accent lg:block">
        <svg viewBox="0 0 1200 56" preserveAspectRatio="none" className="absolute inset-0 size-full">
          <motion.path
            d="M1050 0 V38 Q1050 52 1036 52 H164 Q150 52 150 38 V10"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            initial={still ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={viewport}
            transition={{ duration: 1.2, ease, delay: steps.length * stagger }}
          />
        </svg>
        <svg viewBox="0 0 16 10" className="absolute left-[12.5%] top-0 h-2.5 w-4 -translate-x-1/2">
          <path d="M3 9 L8 2 L13 9" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="absolute left-1/2 top-[52px] -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-sm font-semibold text-muted-foreground">
          What we learn after launch feeds the next round
        </span>
      </div>
      <p className="mt-4 text-sm text-muted-foreground lg:hidden">
        After launch, what we learn feeds the next round of discovery.
      </p>
    </div>
  );
}
