import type { Metadata } from "next";
import Image from "next/image";
import { Reveal, RevealLink } from "@/components/motion/reveal";
import { CtaBand } from "@/components/shared/cta-band";
import { PageIntro } from "@/components/shared/page-intro";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Projects" };
export const revalidate = 60; // ISR every 60s

export default async function Project() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  return (
    <>
      <PageIntro title="Work we have shipped.">Builds for clients and our own products.</PageIntro>

      <section aria-label="Project list" className="wrap pb-[104px]">
        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))] gap-5">
            {projects.map((project, i) => (
              // Staggered by column, so a row lands left to right and later rows start fresh.
              <RevealLink
                key={project.id}
                delay={(i % 3) * 0.09}
                href={`/project/${project.slug}`}
                className="card flex flex-col gap-3 p-3 pb-7"
              >
                <span className="relative block aspect-[16/10] overflow-hidden rounded-[18px] bg-tint">
                  {project.cover_image_url ? (
                    <Image
                      src={project.cover_image_url}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="absolute inset-0 grid place-items-center text-sm font-semibold text-muted-foreground">
                      No cover yet
                    </span>
                  )}
                </span>
                <span className="label px-4 pt-1.5">{project.category}</span>
                <span className="px-4 text-2xl font-extrabold leading-[1.15] tracking-[-0.02em]">
                  {project.title}
                </span>
                <span className="line-clamp-3 px-4 text-muted-foreground">{project.summary}</span>
                {project.tech_stack?.length > 0 && (
                  <span className="mt-auto flex flex-wrap gap-1.5 px-4 pt-2">
                    {project.tech_stack.map((tech: string) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </span>
                )}
              </RevealLink>
            ))}
          </div>
        ) : (
          <Reveal>
            <p className="card p-10 text-center text-muted-foreground">No projects published yet.</p>
          </Reveal>
        )}
      </section>

      <CtaBand title="Want yours on this list? Let's build it." />
    </>
  );
}
