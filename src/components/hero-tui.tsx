"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Typewriter } from "@/components/animations/typewriter";

export function HeroTUI() {
  const [activeTab, setActiveTab] = useState("web");

  const services = {
    web: {
      description: "Custom websites and web applications built with modern Jamstack technologies for maximum performance.",
    },
    mobile: {
      description: "Cross-platform mobile applications that run smoothly on iOS and Android with a single codebase.",
    },
    ai: {
      description: "Intelligent automation and AI-driven features seamlessly integrated into your workflows and applications.",
    }
  };

  const activeService = services[activeTab as keyof typeof services] || services.web;
  const tabs = ["web", "mobile", "ai"];

  return (
    <section className="dark bg-[#0a0a0a] px-4 py-24 md:py-32 font-mono w-full min-h-[80vh] flex items-center">
      <div className="container mx-auto max-w-[1000px] flex flex-col items-start">
        
        {/* News Badge */}
        <div className="mb-10 flex flex-wrap items-center gap-3 text-sm text-foreground">
          <span className="bg-foreground text-background px-2 py-0.5 font-bold text-xs rounded-sm shrink-0">
            New
          </span>
          <span className="font-medium tracking-wide">
            Teridox Digital Solutions. Built for scale, speed, and reliability.{" "}
            <Link href="/contact" className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors ml-1">
              Contact us now
            </Link>
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] font-bold mb-6 max-w-4xl leading-[1.1] tracking-tight text-foreground">
          <Typewriter text="Digital agency for Web, Mobile, and AI Integration" delay={0.3} />
        </h1>
        
        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl leading-relaxed">
          Your technical partner for robust digital solutions. We build scalable websites, cross-platform mobile apps, and integrate intelligent AI features seamlessly.
        </p>

        {/* Terminal Box */}
        <div className="bg-[#111111] border border-[#333333] rounded-md w-full max-w-3xl overflow-hidden shadow-2xl">
          {/* Tabs */}
          <div className="flex border-b border-[#333333] overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab 
                    ? "text-foreground border-b-2 border-foreground bg-[#1a1a1a]" 
                    : "text-[#888888] hover:text-foreground hover:bg-[#161616]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Content */}
          <div className="p-6 md:p-8 flex items-center bg-[#111111] min-h-[140px]">
            <p className="text-foreground text-base md:text-lg leading-relaxed font-mono">
              <span className="text-[#888888] mr-2">/&gt;</span>
              {activeService.description}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
