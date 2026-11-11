"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
import { ThemeToggle } from "./theme-toggle";

const links = [
  ["/about", "About"],
  ["/services", "Services"],
  ["/project", "Project"],
  ["/blog", "Blog"],
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.05, 0.7, 0.1, 1] }}
      className="sticky top-0 z-50 px-4 pt-4 sm:px-6"
    >
      <div className="glass mx-auto flex max-w-[1192px] flex-wrap items-center justify-between gap-x-7 rounded-[28px] py-2 pl-6 pr-2">
        <Link href="/" className="text-xl font-extrabold tracking-tight">
          Teridox
        </Link>
        <nav
          id="main-nav"
          aria-label="Main"
          className={`order-3 w-full flex-col gap-y-1 pb-2 text-[15px] font-semibold md:order-none md:flex md:w-auto md:flex-row md:items-center md:gap-x-7 md:pb-0 ${open ? "flex" : "hidden"}`}
        >
          {links.map(([href, label]) => {
            const current = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={current ? "page" : undefined}
                className={`py-3 hover:text-accent ${current ? "text-accent" : ""}`}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-1 min-h-11 px-5 text-[15px] md:hidden"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/contact" className="btn btn-primary min-h-11 px-5 text-[15px] max-md:hidden">
            Contact
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen((o) => !o)}
            className="grid size-11 place-items-center rounded-full md:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
