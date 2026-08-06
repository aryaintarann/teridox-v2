"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import Link from "next/link";

export function HeroTUI() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("web");

  const handleCopy = () => {
    navigator.clipboard.writeText("curl -fsSL https://teridox.com/contact | bash");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = ["web", "mobile", "ai", "engine"];

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
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors ml-1">
              Contact us now
            </Link>
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] font-bold mb-6 max-w-4xl leading-[1.1] tracking-tight text-foreground">
          Digital agency for Web, Mobile, and AI Integration
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
          <div className="p-5 md:p-6 flex items-center justify-between bg-[#111111]">
            <div className="flex items-center text-sm md:text-base font-mono overflow-x-auto mr-4 hide-scrollbar">
              <span className="text-[#888888] whitespace-nowrap select-none mr-2">curl -fsSL https://</span>
              <span className="text-foreground font-bold whitespace-nowrap">teridox.com/contact</span>
              <span className="text-[#888888] whitespace-nowrap select-none ml-2">| bash</span>
            </div>
            <button 
              onClick={handleCopy}
              className="text-[#888888] hover:text-foreground transition-colors shrink-0 p-2" 
              aria-label="Copy to clipboard"
            >
              {copied ? <Check size={18} className="text-success" /> : <Copy size={18} />}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
