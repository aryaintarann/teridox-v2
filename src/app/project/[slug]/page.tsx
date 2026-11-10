import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import sanitizeHtml from 'sanitize-html';
import { Metadata } from 'next';
import { Reveal, RevealLink, RevealText } from "@/components/motion/reveal";
import { CtaBand } from "@/components/shared/cta-band";
import { formatDate } from "@/lib/utils";

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

  const { data: more } = await supabase
    .from("projects")
    .select("id, slug, title, category, summary")
    .eq("status", "published")
    .neq("slug", params.slug)
    .order("created_at", { ascending: false })
    .limit(2);

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

  const published = formatDate(project.created_at, false);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "<") }}
      />

      <section aria-label="Project intro" className="wrap flex flex-col items-start gap-6 pb-10 pt-14">
        <Link href="/project" className="btn btn-quiet min-h-11 px-[18px] text-sm">
          <span aria-hidden="true">←</span> All projects
        </Link>
        <RevealText as="h1" className="display mt-4 max-w-[980px]">
          {project.title}
        </RevealText>
        <Reveal delay={0.3}>
          <p className="lede max-w-[720px]">{project.summary}</p>
        </Reveal>
        {project.preview_url && (
          <Reveal delay={0.45}>
            <a
              href={project.preview_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary min-h-[52px] px-7"
            >
              Visit live preview
            </a>
          </Reveal>
        )}
      </section>

      {project.cover_image_url && (
        <section aria-label="Cover" className="wrap pb-14">
          <Reveal scale={0.98} className="card p-3">
            <div className="relative aspect-[16/8] overflow-hidden rounded-[18px] bg-tint">
              <Image
                src={project.cover_image_url}
                alt={project.title}
                fill
                sizes="(max-width: 1240px) 100vw, 1240px"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        </section>
      )}

      <section aria-label="Case study" className="wrap flex flex-wrap items-start gap-6 pb-[104px]">
        <Reveal as="article" className="card min-w-0 flex-[2_1_520px] p-[clamp(24px,3.4vw,44px)]">
          <div
            className="prose prose-lg prose-neutral dark:prose-invert prose-p:leading-relaxed prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-accent max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(project.description || '', { allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]) }) }}
          />
        </Reveal>

        <Reveal as="aside" delay={0.15} aria-label="Project facts" className="card flex min-w-0 flex-[1_1_300px] flex-col gap-6 p-8">
          <div className="flex flex-col gap-1">
            <span className="label">Category</span>
            <span className="text-lg font-bold">{project.category}</span>
          </div>
          <div className="flex flex-col gap-1 border-t border-border pt-6">
            <span className="label">Published</span>
            <span className="text-lg font-bold">{published}</span>
          </div>
          {project.tech_stack?.length > 0 && (
            <div className="flex flex-col gap-2.5 border-t border-border pt-6">
              <span className="label">Tech stack</span>
              <ul className="flex flex-wrap gap-1.5">
                {project.tech_stack.map((tech: string) => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Reveal>
      </section>

      {more && more.length > 0 && (
        <section aria-labelledby="project-more" className="wrap flex flex-col gap-9 pb-[104px]">
          <RevealText id="project-more" className="title">
            More projects
          </RevealText>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-4">
            {more.map((p, i) => (
              <RevealLink key={p.id} delay={i * 0.1} href={`/project/${p.slug}`} className="card flex flex-col gap-2.5 p-8">
                <span className="label">{p.category}</span>
                <span className="text-2xl font-extrabold leading-tight tracking-[-0.02em]">{p.title}</span>
                <span className="text-muted-foreground">{p.summary}</span>
              </RevealLink>
            ))}
          </div>
        </section>
      )}

      <CtaBand title="Need a system shaped around your workflow?" />
    </>
  );
}
