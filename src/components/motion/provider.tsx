"use client";

import { MotionConfig, motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

/** The light behind the glass drifts up slowly as the page scrolls, so the glass seems to refract it. */
function AmbientLight() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-9%"]);
  return <motion.div aria-hidden="true" className="ambient" style={{ y }} />;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  // reducedMotion="user": visitors who ask the system for less motion keep fades but lose movement.
  return (
    <MotionConfig reducedMotion="user">
      <AmbientLight />
      <ScrollProgress />
      {children}
    </MotionConfig>
  );
}
