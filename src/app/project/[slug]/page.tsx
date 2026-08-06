import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/animations/fade-in";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DOMPurify from 'isomorphic-dompurify';

export default async function ProjectDetail(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const supabase = await createClient();
  
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!project) {
    notFound();
  }

  return (
    <FadeIn delay={0.1}>
      <article className="container mx-auto px-4 md:px-6 py-16 max-w-4xl">
        <Link href="/project" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to projects
        </Link>
        
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{project.title}</h1>
            <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{project.category}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack?.map((tech: string, i: number) => (
              <span key={i} className="bg-surface-soft border border-border px-3 py-1 rounded-sm text-xs font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {project.cover_image_url && (
          <div className="aspect-video w-full rounded-sm overflow-hidden mb-12 border border-border bg-surface-card">
            <img src={project.cover_image_url} alt={project.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div 
          className="prose prose-neutral dark:prose-invert prose-p:leading-relaxed prose-headings:font-bold max-w-none"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.description) }}
        />
      </article>
    </FadeIn>
  );
}
