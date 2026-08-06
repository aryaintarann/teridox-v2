"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  className?: string;
  delay?: number;
}

export function Typewriter({ text, className, delay = 0 }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasStarted(true);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;
    
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayedText(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 45); // Typing speed

    return () => clearInterval(interval);
  }, [text, hasStarted]);

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block ml-[2px] w-[0.4em] h-[1em] bg-current align-middle"
        style={{ marginBottom: "-0.1em" }}
      />
    </span>
  );
}
