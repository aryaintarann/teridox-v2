import React from "react";
import Link from "next/link";

import { FadeIn } from "@/components/animations/fade-in";

export default function Services() {
  return (
    <FadeIn delay={0.1}>
    <div className="container mx-auto px-4 md:px-6 py-16 max-w-4xl">
      <h1 className="text-display-xl font-bold mb-8">Services</h1>
      
      <div className="space-y-16">
        <section>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <h2 className="text-heading-md font-bold text-foreground">Web Development</h2>
              <div className="mt-4 flex gap-2">
                <span className="bg-surface-soft px-2 py-1 rounded-sm text-xs font-medium border border-border">React</span>
                <span className="bg-surface-soft px-2 py-1 rounded-sm text-xs font-medium border border-border">Next.js</span>
              </div>
            </div>
            <div className="md:w-2/3 space-y-4">
              <p className="text-body-md text-body leading-relaxed">
                Custom websites and web applications built with modern Jamstack technologies for maximum performance, SEO, and security. We build everything from high-conversion landing pages to complex corporate portals.
              </p>
              <div className="pt-2">
                <Link href="/contact?service=web" className="text-link-md font-medium text-foreground underline hover:text-muted-foreground transition-colors">
                  Inquire about Web Development →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="h-[1px] w-full bg-border"></div>

        <section>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <h2 className="text-heading-md font-bold text-foreground">Mobile App Development</h2>
              <div className="mt-4 flex gap-2">
                <span className="bg-surface-soft px-2 py-1 rounded-sm text-xs font-medium border border-border">React Native</span>
                <span className="bg-surface-soft px-2 py-1 rounded-sm text-xs font-medium border border-border">Flutter</span>
              </div>
            </div>
            <div className="md:w-2/3 space-y-4">
              <p className="text-body-md text-body leading-relaxed">
                Cross-platform mobile applications that run smoothly on both iOS and Android from a single codebase. We focus on native-like performance, smooth animations, and intuitive UI/UX.
              </p>
              <div className="pt-2">
                <Link href="/contact?service=mobile" className="text-link-md font-medium text-foreground underline hover:text-muted-foreground transition-colors">
                  Inquire about Mobile App Development →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="h-[1px] w-full bg-border"></div>

        <section>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <h2 className="text-heading-md font-bold text-foreground">SaaS Solutions</h2>
              <div className="mt-4 flex gap-2">
                <span className="bg-surface-soft px-2 py-1 rounded-sm text-xs font-medium border border-border">Node.js</span>
                <span className="bg-surface-soft px-2 py-1 rounded-sm text-xs font-medium border border-border">PostgreSQL</span>
              </div>
            </div>
            <div className="md:w-2/3 space-y-4">
              <p className="text-body-md text-body leading-relaxed">
                Scalable software-as-a-service architectures designed to grow with your business and user base. We handle everything from database design to authentication, payment integration, and multi-tenant logic.
              </p>
              <div className="pt-2">
                <Link href="/contact?service=saas" className="text-link-md font-medium text-foreground underline hover:text-muted-foreground transition-colors">
                  Inquire about SaaS Solutions →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    </FadeIn>
  );
}
