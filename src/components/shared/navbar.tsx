"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ThemeToggle } from "./theme-toggle";

const links = [
  ["/about", "About"],
  ["/services", "Services"],
  ["/project", "Project"],
  ["/blog", "Blog"],
] as const;

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  // Out of the way while reading down, back as soon as the reader scrolls up.
  useMotionValueEvent(scrollY, "change", (y) => {
    setHidden(y > (scrollY.getPrevious() ?? 0) && y > 240);
  });

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: hidden ? "-120%" : 0, opacity: 1 }}
      transition={{ duration: hidden ? 0.4 : 0.7, ease: [0.05, 0.7, 0.1, 1] }}
      // Keyboard users tabbing into the bar always get it back.
      onFocusCapture={() => setHidden(false)}
      className="sticky top-0 z-50 px-4 pt-4 sm:px-6"
    >
      <div className="glass mx-auto flex max-w-[1192px] flex-wrap items-center justify-between gap-x-7 rounded-[28px] py-2 pl-6 pr-2">
        <Link href="/" className="text-xl font-extrabold tracking-tight">
          Teridox
        </Link>
        <nav
          aria-label="Main"
          className="order-3 flex w-full items-center gap-x-7 text-[15px] font-semibold md:order-none md:w-auto"
        >
          {links.map(([href, label]) => {
            const current = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={current ? "page" : undefined}
                className={`py-3 hover:text-accent ${current ? "text-accent" : ""}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/contact" className="btn btn-primary min-h-11 px-5 text-[15px]">
            Contact
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
