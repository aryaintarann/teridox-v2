import type { Metadata } from "next";
import { Reveal, RevealText } from "@/components/motion/reveal";
import { CtaBand } from "@/components/shared/cta-band";
import { LogoLockup } from "@/components/shared/logo-lockup";
import { PageIntro } from "@/components/shared/page-intro";

export const metadata: Metadata = { title: "About" };

const values = [
  "Engineering Rigor",
  "Transparent Communication",
  "Long-term Maintainability",
  "Performance First",
];

const delivery = [
  ["Fast", "On-time delivery, always."],
  ["On-Target", "Solutions tailored to business needs."],
  ["Quality", "Premium standards in every detail."],
];

export default function About() {
  return (
    <>
      <PageIntro title="A technical partner for businesses that want to scale.">
        Teridox was born from a deep passion for technology and the belief that every business
        deserves the best software solutions.
      </PageIntro>

      <section aria-labelledby="about-story" className="wrap pb-6">
        <Reveal
          scale={0.98}
          className="card grid gap-x-14 gap-y-8 p-[clamp(28px,4vw,56px)] lg:grid-cols-[5fr_7fr]"
        >
          {/* The 3D logo fills the column under the title, beside the text. */}
          <div className="flex flex-col justify-between gap-6">
            <RevealText id="about-story" className="title">
              Our story
            </RevealText>
            <LogoLockup className="h-[220px] sm:h-[260px]" />
            <p className="label">Working as a technical partner since 2024</p>
          </div>
          <div className="flex min-w-0 flex-col gap-8">
            <Reveal delay={0.2}>
              <p className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.3] tracking-[-0.015em]">
                Founded with a vision to streamline digital transformation, Teridox serves as a
                technical partner for businesses looking to scale through robust software
                solutions.
              </p>
            </Reveal>
            <Reveal delay={0.4} className="grid gap-6 text-lg text-muted-foreground md:grid-cols-2">
              <p>
                We specialize in modern web architectures, performant mobile applications, and
                resilient SaaS backends. By combining deep engineering expertise with clean,
                functional design, we build systems that hold up in production and stay easy to
                use and maintain.
              </p>
              <p>
                With a dedicated team and strong commitment since 2024, we stand as your trusted
                technology partner ready to help your business grow.
              </p>
            </Reveal>
          </div>
        </Reveal>
      </section>

      <section aria-label="Vision and mission" className="wrap pb-[104px]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6">
          <Reveal className="card-accent flex min-h-[240px] flex-col gap-5 p-8 sm:p-10">
            <h2 className="text-[15px] font-bold">Vision</h2>
            <p className="mt-auto text-[clamp(24px,2.4vw,32px)] font-bold leading-[1.2] tracking-[-0.02em]">
              To be the standard for engineering excellence and thoughtful digital design in the
              region.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="card flex min-h-[240px] flex-col gap-5 p-8 sm:p-10">
            <h2 className="label text-[15px]">Mission</h2>
            <p className="mt-auto text-[clamp(24px,2.4vw,32px)] font-bold leading-[1.2] tracking-[-0.02em]">
              Deliver software solutions that directly impact our clients&apos; bottom line,
              prioritizing speed, security, and scalability.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Four short values read better as one list than as four near-empty cards. */}
      <section aria-labelledby="about-values" className="wrap flex flex-wrap gap-x-14 gap-y-8 pb-[104px]">
        <RevealText id="about-values" className="title flex-[1_1_300px]">
          What we hold ourselves to
        </RevealText>
        <ol className="min-w-0 flex-[1.4_1_380px]">
          {values.map((value, i) => (
            <Reveal
              as="li"
              key={value}
              delay={i * 0.08}
              className={`flex items-baseline gap-6 py-5 ${i ? "border-t border-border" : "pt-0"}`}
            >
              <span className="label tabular-nums">0{i + 1}</span>
              <span className="text-[clamp(22px,2.4vw,30px)] font-extrabold leading-[1.15] tracking-[-0.02em]">
                {value}
              </span>
            </Reveal>
          ))}
        </ol>
      </section>

      <section aria-labelledby="about-delivery" className="wrap pb-[104px]">
        <Reveal className="card flex flex-col gap-9 p-[clamp(28px,4vw,56px)]">
          <RevealText id="about-delivery" className="title">
            How we deliver
          </RevealText>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-7">
            {delivery.map(([name, text], i) => (
              <Reveal
                key={name}
                delay={0.2 + i * 0.1}
                className="flex flex-col gap-1.5 border-t border-border pt-5"
              >
                <h3 className="text-[22px] font-extrabold tracking-[-0.02em]">{name}</h3>
                <p className="text-muted-foreground">{text}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
