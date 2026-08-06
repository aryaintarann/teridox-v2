import React from "react";
import Link from "next/link";

import { FadeIn } from "@/components/animations/fade-in";

export default function Blog() {
  return (
    <FadeIn delay={0.1}>
    <div className="container mx-auto px-4 md:px-6 py-16 max-w-4xl">
      <h1 className="text-display-xl font-bold mb-8">Blog</h1>
      
      <div className="flex flex-col gap-8 mt-12">
        {/* Placeholder Article */}
        <article className="border-b border-border pb-8">
          <div className="flex gap-4 items-center mb-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Engineering</span>
            <span className="text-xs text-muted-foreground">August 6, 2026</span>
          </div>
          <h2 className="text-xl font-bold mb-3 hover:underline cursor-pointer">
            <Link href="/blog/why-we-chose-nextjs-app-router">
              Why We Chose Next.js App Router for Our Marketing Site
            </Link>
          </h2>
          <p className="text-body-md text-body mb-4">
            A deep dive into our decision-making process for migrating from a legacy SPA to the Next.js App Router. We discuss performance benefits, SEO improvements, and the developer experience of React Server Components.
          </p>
          <Link href="/blog/why-we-chose-nextjs-app-router" className="text-sm font-bold text-foreground">
            Read more [→]
          </Link>
        </article>

        {/* Placeholder Article 2 */}
        <article className="border-b border-border pb-8">
          <div className="flex gap-4 items-center mb-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Design</span>
            <span className="text-xs text-muted-foreground">July 22, 2026</span>
          </div>
          <h2 className="text-xl font-bold mb-3 hover:underline cursor-pointer">
            <Link href="/blog/terminal-aesthetic-in-modern-web-design">
              The Return of the Terminal Aesthetic in Modern Web Design
            </Link>
          </h2>
          <p className="text-body-md text-body mb-4">
            Exploring the rising trend of monospaced typography, austere layouts, and CLI-inspired interfaces in developer tools and technical marketing sites.
          </p>
          <Link href="/blog/terminal-aesthetic-in-modern-web-design" className="text-sm font-bold text-foreground">
            Read more [→]
          </Link>
        </article>
      </div>
    </div>
    </FadeIn>
  );
}
