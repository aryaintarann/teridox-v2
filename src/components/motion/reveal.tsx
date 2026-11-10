"use client";

import Link from "next/link";
import { Fragment, type ComponentProps } from "react";
import { motion, type HTMLMotionProps } from "motion/react";

/*
 * Motion identity: "Premium". One entrance everywhere (rise 24px, fade in, no overshoot),
 * one decelerating curve, three durations (0.5 / 0.8 / 0.9s). Elements reveal once, as they
 * enter the viewport, so nothing animates twice or behind the reader's back.
 */
export const ease = [0.05, 0.7, 0.1, 1] as const;
const viewport = { once: true, margin: "0px 0px -10% 0px" } as const;

const rise = (delay = 0, y = 24, scale = 1) => ({
  hidden: { opacity: 0, y, scale },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease, delay } },
});

type Tag = "div" | "section" | "article" | "figure" | "li" | "aside" | "footer";
type RevealProps = HTMLMotionProps<"div"> & { as?: Tag; delay?: number; y?: number; scale?: number };

/** Fades a block in as it scrolls into view. `delay` staggers siblings (use index * 0.08). */
export function Reveal({ as = "div", delay, y, scale, ...props }: RevealProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={rise(delay, y, scale)}
      {...props}
    />
  );
}

const MotionLink = motion.create(Link);

/** A card that is a link: same reveal, no wrapper element to break grid or flex sizing. */
export function RevealLink({ delay, ...props }: ComponentProps<typeof MotionLink> & { delay?: number }) {
  return (
    <MotionLink
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={rise(delay)}
      {...props}
    />
  );
}

/**
 * Headline that lifts in word by word from behind a mask. The words are aria-hidden and the
 * full sentence is the label, so a screen reader reads it once, in one piece.
 */
export function RevealText({
  as = "h2",
  children,
  className,
  id,
  delay = 0,
}: {
  as?: "h1" | "h2" | "h3";
  children: string;
  className?: string;
  id?: string;
  delay?: number;
}) {
  const Heading = motion[as] as typeof motion.h2;
  const words = children.split(" ");

  return (
    <Heading
      id={id}
      className={className}
      aria-label={children}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <span aria-hidden="true" className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%", opacity: 0 },
                show: { y: 0, opacity: 1, transition: { duration: 0.9, ease } },
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Heading>
  );
}
