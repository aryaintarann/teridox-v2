import React from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background h-14 flex items-center">
      <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">
        <Link href="/" className="font-bold flex items-center gap-2">
          {/* Simple Block ASCII representation */}
          <span className="bg-foreground text-background px-2 py-0.5 text-xs font-bold whitespace-pre">
            TERIDOX
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/about" className="hover:text-muted-foreground transition-colors">
            About
          </Link>
          <Link href="/services" className="hover:text-muted-foreground transition-colors">
            Services
          </Link>
          <Link href="/project" className="hover:text-muted-foreground transition-colors">
            Project
          </Link>
          <Link href="/blog" className="hover:text-muted-foreground transition-colors">
            Blog
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/contact"
            className="bg-primary text-primary-foreground px-5 py-1 rounded-sm text-sm font-medium hover:bg-surface-dark-elevated dark:hover:bg-surface-soft transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
