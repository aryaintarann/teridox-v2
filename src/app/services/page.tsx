import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, RevealLink, RevealText } from "@/components/motion/reveal";
import { CtaBand } from "@/components/shared/cta-band";
import { PageIntro } from "@/components/shared/page-intro";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Services" };
export const revalidate = 60;

const services = [
  {
    key: "web",
    name: "Web Development",
    short: "Web Development",
    stack: ["React", "Next.js"],
    text: "Custom websites and web applications built with modern Jamstack technologies for maximum performance, SEO, and security. We build everything from high-conversion landing pages to complex corporate portals.",
  },
  {
    key: "mobile",
    name: "Mobile App Development",
    short: "Mobile Apps",
    stack: ["React Native", "Flutter"],
    text: "Cross-platform mobile applications that run smoothly on both iOS and Android from a single codebase. We focus on native-like performance, smooth animations, and intuitive UI/UX.",
  },
  {
    key: "saas",
    name: "SaaS Solutions",
    short: "SaaS Solutions",
    stack: ["Node.js", "PostgreSQL"],
    text: "Scalable software-as-a-service architectures designed to grow with your business and user base. We handle everything from database design to authentication, payment integration, and multi-tenant logic.",
  },
  {
    key: "ai",
    name: "AI Integration",
    short: "AI Integration",
    stack: [],
    text: "Automation and AI features built into the workflows and applications you already use.",
  },
];

export default async function Services() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("id, slug, title, category, summary")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <>
      <PageIntro title="Web, mobile, SaaS, and AI under one roof.">
        Your technical partner for robust digital solutions, from high-conversion landing pages to
        multi-tenant platforms.
      </PageIntro>

      <section aria-label="Service list" className="wrap flex flex-col gap-5 pb-[104px]">
        {services.map((s, i) => {
          // AI is the newest line of work, so it alone takes the accent fill.
          const accent = s.key === "ai";
          return (
            <Reveal
              as="article"
              key={s.key}
              className={`${accent ? "card-accent" : "card"} flex flex-wrap gap-x-14 gap-y-6 p-[clamp(28px,4vw,48px)]`}
            >
              <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-5">
                <span className={accent ? "text-sm font-bold" : "label"}>0{i + 1}</span>
                <h2 className="title">{s.name}</h2>
                {s.stack.length > 0 && (
                  <ul className="flex flex-wrap gap-2">
                    {s.stack.map((tech) => (
                      <li key={tech} className="chip text-sm">
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex min-w-0 flex-[1.4_1_380px] flex-col items-start gap-6">
                <p className={`text-lg ${accent ? "" : "text-muted-foreground"}`}>{s.text}</p>
                <Link
                  href={`/contact?service=${s.key}`}
                  className={`btn ${accent ? "btn-light" : "btn-quiet"}`}
                >
                  Inquire about {s.short}
                </Link>
              </div>
            </Reveal>
          );
        })}
      </section>

      {projects && projects.length > 0 && (
        <section aria-labelledby="services-work" className="wrap flex flex-col gap-9 pb-[104px]">
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
            <RevealText id="services-work" className="title">
              Built with these services
            </RevealText>
            <Reveal delay={0.3}>
              <Link href="/project" className="btn btn-quiet">
                All projects <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-4">
            {projects.map((p, i) => (
              <RevealLink
                key={p.id}
                delay={i * 0.1}
                href={`/project/${p.slug}`}
                className="card flex flex-col gap-2.5 p-7"
              >
                <span className="label">{p.category}</span>
                <span className="text-[22px] font-extrabold leading-tight tracking-[-0.02em]">
                  {p.title}
                </span>
                <span className="text-muted-foreground">{p.summary}</span>
              </RevealLink>
            ))}
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
