import { Reveal, RevealText } from "@/components/motion/reveal";

export function PageIntro({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section aria-label="Intro" className="wrap flex flex-col items-start gap-6 pb-14 pt-[88px]">
      <RevealText as="h1" className="display max-w-[980px]">
        {title}
      </RevealText>
      <Reveal delay={0.35}>
        <p className="lede">{children}</p>
      </Reveal>
    </section>
  );
}
