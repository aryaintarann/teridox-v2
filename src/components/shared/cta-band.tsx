import Link from "next/link";
import { Reveal, RevealText } from "@/components/motion/reveal";

export function CtaBand({ title = "Have a project in mind? Let's build it." }: { title?: string }) {
  return (
    <section aria-label="Contact" className="wrap pb-10">
      {/* The closing band opens from slightly smaller: it is the last thing the reader sees. */}
      <Reveal
        y={40}
        scale={0.96}
        className="band flex flex-col items-center gap-7 px-6 py-[clamp(48px,7vw,96px)] text-center"
      >
        <RevealText
          as="h2"
          delay={0.2}
          className="max-w-[760px] text-[clamp(32px,4.6vw,64px)] font-extrabold leading-[1.03] tracking-[-0.035em] text-balance"
        >
          {title}
        </RevealText>
        <Reveal delay={0.6}>
          <Link href="/contact" className="btn btn-light min-h-14 px-8 text-[17px]">
            Contact us
          </Link>
        </Reveal>
      </Reveal>
    </section>
  );
}
