import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/animations/fade-in";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import sanitizeHtml from 'sanitize-html';
import { Metadata } from 'next';

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const supabase = await createClient();
  const { data: project } = await supabase.from("projects").select("*").eq("slug", params.slug).single();

  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `https://teridox.com/project/${project.slug}`,
      type: 'article',
      images: project.cover_image_url ? [project.cover_image_url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.summary,
      images: project.cover_image_url ? [project.cover_image_url] : [],
    }
  };
}

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.summary,
    "url": `https://teridox.com/project/${project.slug}`,
    "image": project.cover_image_url,
    "creator": {
      "@type": "Organization",
      "name": "Teridox"
    }
  };

  return (
    <FadeIn delay={0.1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="container mx-auto px-4 md:px-6 py-16 max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium px-3 py-1 bg-surface-soft border border-border rounded-full">
                {project.category}
              </span>
              <span className="text-sm text-muted-foreground">
                {new Date(project.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>
            
            <h1 className="text-display-sm md:text-display-md font-bold mb-4">{project.title}</h1>
            <p className="text-body-lg text-muted-foreground max-w-2xl">
              {project.summary}
            </p>
          </div>
          
          {project.preview_url && (
            <a 
              href={project.preview_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-sm hover:bg-foreground/90 transition-colors shrink-0"
            >
              Live Preview <ExternalLink className="w-4 h-4" />
            </a>
          )}
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
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(project.description || '', { allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]) }) }}
        />
      </article>
    </FadeIn>
  );
}
