import React from "react";

import { FadeIn } from "@/components/animations/fade-in";

export default function About() {
  return (
    <FadeIn delay={0.1}>
    <div className="container mx-auto px-4 md:px-6 py-16 max-w-3xl">
      <h1 className="text-display-xl font-bold mb-8">About Teridox</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-heading-md font-bold mb-4">Our Story</h2>
          <div className="h-[1px] w-full bg-border mb-4"></div>
          <p className="text-body-md text-body leading-relaxed mb-4">
            Founded with a vision to streamline digital transformation, Teridox serves as a technical partner for businesses looking to scale through robust software solutions. We specialize in modern web architectures, performant mobile applications, and resilient SaaS backends.
          </p>
          <p className="text-body-md text-body leading-relaxed">
            By combining deep engineering expertise with clean, functional design, we build systems that are not only powerful but also intuitive and maintainable.
          </p>
        </section>

        <section>
          <h2 className="text-heading-md font-bold mb-4">Vision & Mission</h2>
          <div className="h-[1px] w-full bg-border mb-4"></div>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="text-foreground shrink-0">[+]</span>
              <div>
                <span className="font-bold">Vision</span>
                <p className="text-muted-foreground mt-1">
                  To be the standard for engineering excellence and thoughtful digital design in the region.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-foreground shrink-0">[+]</span>
              <div>
                <span className="font-bold">Mission</span>
                <p className="text-muted-foreground mt-1">
                  Deliver software solutions that directly impact our clients' bottom line, prioritizing speed, security, and scalability.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-heading-md font-bold mb-4">Core Values</h2>
          <div className="h-[1px] w-full bg-border mb-4"></div>
          <ul className="space-y-2 text-body-md text-body">
            <li className="flex gap-4">
              <span className="text-foreground shrink-0">[x]</span>
              <span>Engineering Rigor</span>
            </li>
            <li className="flex gap-4">
              <span className="text-foreground shrink-0">[x]</span>
              <span>Transparent Communication</span>
            </li>
            <li className="flex gap-4">
              <span className="text-foreground shrink-0">[x]</span>
              <span>Long-term Maintainability</span>
            </li>
            <li className="flex gap-4">
              <span className="text-foreground shrink-0">[x]</span>
              <span>Performance First</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
    </FadeIn>
  );
}
