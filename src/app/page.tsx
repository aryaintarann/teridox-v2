import Link from "next/link";
import { LogoHero } from "@/components/home/logo-hero";
import { TestimonialDeck } from "@/components/home/testimonial-deck";
import { CtaBand } from "@/components/shared/cta-band";
import { Reveal, RevealLink, RevealText } from "@/components/motion/reveal";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

export default async function Home() {
  const supabase = await createClient();

  const [{ data: projects }, { data: testimonials }, { data: posts }] = await Promise.all([
    supabase
      .from("projects")
      .select("title")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(4),
    supabase
      .from("testimonials")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false }),
    supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const [latest, ...older] = posts ?? [];

  return (
    <>
      <LogoHero
        projectTitles={(projects ?? []).map((p) => p.title)}
        postTitles={(posts ?? []).slice(0, 2).map((p) => p.title)}
      />

      {/* No testimonials yet means no section, never invented quotes. */}
      {testimonials && testimonials.length > 0 && (
        // Clipped sideways: a swiped card leaves the stack without widening the page.
        <section aria-labelledby="home-testimonials" className="overflow-x-clip">
          <div className="wrap flex flex-col gap-9 py-[104px]">
            <RevealText id="home-testimonials" className="title text-center">
              What clients say after launch
            </RevealText>
            <Reveal>
              <TestimonialDeck
                items={testimonials.map((t) => ({
                  id: String(t.id),
                  quote: t.quote ?? "",
                  name: t.client_name ?? "",
                  position: t.client_position ?? null,
                }))}
              />
            </Reveal>
          </div>
        </section>
      )}

      <section
        aria-labelledby="home-blog"
        className={`wrap flex flex-col gap-9 pb-[104px] ${testimonials?.length ? "" : "pt-[104px]"}`}
      >
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <RevealText id="home-blog" className="title">
            Latest from the blog
          </RevealText>
          <Reveal delay={0.3}>
            <Link href="/blog" className="btn btn-quiet">
              View all posts <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>

        {latest ? (
          <div className="flex flex-wrap gap-4">
            <RevealLink
              href={`/blog/${latest.slug}`}
              className="card-accent flex min-w-0 flex-[1_1_400px] flex-col gap-5 p-7 sm:p-10"
            >
              <span className="text-sm font-bold">{formatDate(latest.created_at)}</span>
              <span className="text-[clamp(26px,2.8vw,38px)] font-extrabold leading-[1.1] tracking-[-0.02em]">
                {latest.title}
              </span>
              {latest.excerpt && <span>{latest.excerpt}</span>}
              <span className="mt-auto pt-4 font-bold">
                Read article <span aria-hidden="true">→</span>
              </span>
            </RevealLink>

            {older.length > 0 && (
              <Reveal delay={0.15} className="card flex min-w-0 flex-[1.2_1_440px] flex-col px-6 py-2 sm:px-8">
                {older.map((post, i) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className={`group flex flex-col gap-1.5 py-[22px] ${i ? "border-t border-border" : ""}`}
                  >
                    <span className="text-sm font-semibold text-muted-foreground">
                      {formatDate(post.created_at)}
                    </span>
                    <span className="text-[19px] font-bold leading-[1.3] tracking-[-0.01em] group-hover:underline">
                      {post.title}
                    </span>
                  </Link>
                ))}
              </Reveal>
            )}
          </div>
        ) : (
          <p className="card p-8 text-center text-muted-foreground">No articles published yet.</p>
        )}
      </section>

      <CtaBand />
    </>
  );
}
