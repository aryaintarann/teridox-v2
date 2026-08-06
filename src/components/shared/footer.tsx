import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center md:divide-x divide-border">
          <div className="flex flex-col gap-2 p-2">
            <Link href="/" className="text-sm font-medium hover:underline">
              Home
            </Link>
          </div>
          <div className="flex flex-col gap-2 p-2">
            <Link href="/about" className="text-sm font-medium hover:underline">
              About
            </Link>
          </div>
          <div className="flex flex-col gap-2 p-2">
            <Link href="/services" className="text-sm font-medium hover:underline">
              Services
            </Link>
          </div>
          <div className="flex flex-col gap-2 p-2">
            <Link href="/project" className="text-sm font-medium hover:underline">
              Projects
            </Link>
          </div>
          <div className="flex flex-col gap-2 p-2">
            <Link href="/blog" className="text-sm font-medium hover:underline">
              Blog
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground gap-4">
          <div>© {new Date().getFullYear()} Teridox. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
