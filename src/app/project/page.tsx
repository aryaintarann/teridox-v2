import React from "react";

export default function Project() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-16 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <h1 className="text-display-xl font-bold">Projects</h1>
        <div className="flex gap-4 border-b border-border w-full md:w-auto pb-2">
          <button className="text-body-md font-bold text-foreground border-b-2 border-foreground pb-2 -mb-[10px]">
            All
          </button>
          <button className="text-body-md text-muted-foreground hover:text-foreground pb-2 -mb-[10px]">
            Web
          </button>
          <button className="text-body-md text-muted-foreground hover:text-foreground pb-2 -mb-[10px]">
            Mobile
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {/* Placeholder Project Card */}
        <div className="border border-border p-4 bg-surface-soft flex flex-col h-full rounded-sm hover:border-muted-foreground transition-colors cursor-pointer">
          <div className="aspect-video bg-surface-card border border-border mb-4 flex items-center justify-center text-muted-foreground">
            [ Project Thumbnail ]
          </div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-heading-md font-bold">E-Commerce Redesign</h3>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Web</span>
          </div>
          <p className="text-body-md text-body mb-4 line-clamp-2 flex-grow">
            A complete overhaul of a legacy e-commerce platform using Next.js and headless Shopify, resulting in a 40% increase in conversion rate.
          </p>
          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border">
            <span className="text-xs text-muted-foreground">Next.js</span>
            <span className="text-xs text-muted-foreground">Shopify</span>
            <span className="text-xs text-muted-foreground">Tailwind</span>
          </div>
        </div>

        {/* Placeholder Project Card 2 */}
        <div className="border border-border p-4 bg-surface-soft flex flex-col h-full rounded-sm hover:border-muted-foreground transition-colors cursor-pointer">
          <div className="aspect-video bg-surface-card border border-border mb-4 flex items-center justify-center text-muted-foreground">
            [ Project Thumbnail ]
          </div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-heading-md font-bold">Fintech Dashboard App</h3>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Mobile</span>
          </div>
          <p className="text-body-md text-body mb-4 line-clamp-2 flex-grow">
            A secure cross-platform mobile application for personal finance management with real-time charting and budget tracking.
          </p>
          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border">
            <span className="text-xs text-muted-foreground">React Native</span>
            <span className="text-xs text-muted-foreground">Supabase</span>
          </div>
        </div>
      </div>
    </div>
  );
}
