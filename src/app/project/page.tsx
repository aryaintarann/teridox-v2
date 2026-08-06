import React from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60; // ISR every 60s

export default async function Project() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  return (
    <FadeIn delay={0.1}>
    <div className="container mx-auto px-4 md:px-6 py-16 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <h1 className="text-display-xl font-bold">Projects</h1>
        <div className="flex gap-4 border-b border-border w-full md:w-auto pb-2">
          <button className="text-body-md font-bold text-foreground border-b-2 border-foreground pb-2 -mb-[10px]">
            All
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {projects && projects.length > 0 ? (
          projects.map((project: any) => (
            <div key={project.id} className="border border-border p-4 bg-surface-soft flex flex-col h-full rounded-sm hover:border-muted-foreground transition-colors cursor-pointer">
              <div className="aspect-video bg-surface-card border border-border mb-4 flex items-center justify-center text-muted-foreground overflow-hidden">
                {project.cover_image_url ? (
                  <img src={project.cover_image_url} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <span>[ No Image ]</span>
                )}
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-heading-md font-bold">{project.title}</h3>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{project.category}</span>
              </div>
              <p className="text-body-md text-body mb-4 line-clamp-2 flex-grow">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border">
                {project.tech_stack?.map((tech: string, i: number) => (
                  <span key={i} className="text-xs text-muted-foreground">{tech}</span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground col-span-2 text-center py-12 border border-border bg-surface-soft">
            More projects coming soon.
          </p>
        )}
      </div>
    </div>
    </FadeIn>
  );
}
