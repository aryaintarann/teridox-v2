"use client";

import { motion } from "motion/react";
import { ease } from "@/components/motion/reveal";

// A template remounts on every navigation, so each page settles in instead of snapping in.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
    >
      {children}
    </motion.div>
  );
}
