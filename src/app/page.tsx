import type { Metadata } from "next";
import Link from "next/link";
import { LogoHero } from "@/components/home/logo-hero";
import { FaqList } from "@/components/home/faq-list";
import { ServiceGrid } from "@/components/home/service-grid";
import { ProcessFlow } from "@/components/home/process-flow";
import { ProjectReel } from "@/components/home/project-reel";
import { TestimonialDeck } from "@/components/home/testimonial-deck";
import { CtaBand } from "@/components/shared/cta-band";
import { Reveal, RevealLink, RevealText } from "@/components/motion/reveal";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { jsonLdString } from "@/lib/json-ld";
import { HOME_FAQ, HOME_PROCESS, HOME_SERVICES, HOME_STACK, HOME_WEB_POINTS } from "./home-content";

const TITLE = "Web Development & Mobile App Agency | Teridox";
const DESCRIPTION =
  "Teridox is a web development agency in Indonesia. We build websites, web apps, cross-platform mobile apps, SaaS products, and AI integrations for growing businesses.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/", type: "website" },
  twitter: { title: TITLE, description: DESCRIPTION },
};


// Every home section opens the same way: headline, optional line under it, optional link on the right.
function SectionHeader({
  id,
  title,
  intro,
  href,
  cta,
}: {
  id: string;
  title: string;
  intro?: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
      <div className="flex max-w-[720px] flex-col gap-4">
        <RevealText id={id} className="title">
          {title}
        </RevealText>
        {intro && (
          <Reveal delay={0.2}>
            <p className="text-lg text-muted-foreground">{intro}</p>
          </Reveal>
        )}
      </div>
      {href && (
        <Reveal delay={0.3}>
          <Link href={href} className="btn btn-quiet">
            {cta} <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      )}
    </div>
  );
}

const homeLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://teridox.com/#website",
      url: "https://teridox.com",
      name: "Teridox",
      description: DESCRIPTION,
      inLanguage: "en",
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://teridox.com/#service",
      name: "Teridox",
      url: "https://teridox.com",
      description: DESCRIPTION,
      foundingDate: "2024",
      areaServed: "Worldwide",
      knowsAbout: [...HOME_STACK, "Web development", "Mobile app development", "SaaS", "AI integration"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: HOME_SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, description: s.text },
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: HOME_FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export const revalidate = 60;

export default async function Home() {
  const supabase = await createClient();

  const [{ data: projects }, { data: testimonials }, { data: posts }] = await Promise.all([
    supabase
      .from("projects")
      .select("title, slug, summary, category, cover_image_url")
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

  const featured = projects ?? [];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(homeLd) }} />
      <LogoHero
        projectTitles={(projects ?? []).map((p) => p.title)}
        postTitles={(posts ?? []).slice(0, 2).map((p) => p.title)}
      />

      <section aria-labelledby="home-services" className="wrap flex flex-col gap-9 py-[104px]">
        <SectionHeader
          id="home-services"
          title="Web development, mobile apps, SaaS, and AI"
          intro="Teridox is a web development and software agency. We design and build the product, then keep it running after launch."
          href="/services"
          cta="All services"
        />
        <ServiceGrid main={HOME_SERVICES[0]} points={HOME_WEB_POINTS} others={HOME_SERVICES.slice(1)} />
      </section>

      {featured.length > 0 && (
        <section aria-labelledby="home-projects" className="wrap flex flex-col gap-9 pb-[104px]">
          <SectionHeader id="home-projects" title="Recent projects" href="/project" cta="All projects" />
          <Reveal>
            <ProjectReel
              items={featured.map((p) => ({
                slug: p.slug,
                title: p.title,
                summary: p.summary,
                category: p.category,
                cover: p.cover_image_url,
              }))}
            />
          </Reveal>
        </section>
      )}

      <section aria-labelledby="home-process" className="wrap flex flex-col gap-9 pb-[104px]">
        <SectionHeader id="home-process" title="How we work" />
        <ProcessFlow steps={HOME_PROCESS} />
      </section>

      {/* No testimonials yet means no section, never invented quotes. */}
      {testimonials && testimonials.length > 0 && (
        // Clipped sideways: a swiped card leaves the stack without widening the page.
        <section aria-labelledby="home-testimonials" className="overflow-x-clip">
          <div className="wrap flex flex-col gap-9 pb-[104px]">
            <SectionHeader id="home-testimonials" title="What clients say after launch" />
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
        className="wrap flex flex-col gap-9 pb-[104px]"
      >
        <SectionHeader id="home-blog" title="Latest from the blog" href="/blog" cta="All posts" />

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
              <Reveal delay={0.08} className="card flex min-w-0 flex-[1.2_1_440px] flex-col px-6 py-2 sm:px-8">
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

      <section aria-labelledby="home-faq" className="wrap flex flex-col gap-9 pb-[104px]">
        <SectionHeader id="home-faq" title="Frequently asked questions" />
        <FaqList items={HOME_FAQ} />
      </section>

      <CtaBand />
    </>
  );
}
