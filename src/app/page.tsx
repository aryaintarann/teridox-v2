import { HeroTUI } from "@/components/hero-tui";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <HeroTUI />

      <section className="container mx-auto px-4 md:px-6 py-24 max-w-4xl w-full">
        <h2 className="text-[2rem] font-bold mb-4 tracking-tight">About Teridox</h2>
        <div className="h-[1px] w-full bg-border mb-8"></div>
        
        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            Teridox was born from a deep passion for technology and the belief that every business deserves the best software solutions. We build more than products — we build the technology foundation that drives real growth.
          </p>
          <p>
            With a dedicated team and strong commitment since 2024, we stand as your trusted technology partner ready to help your business grow.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-border p-5 bg-surface-soft rounded-sm flex flex-col items-start">
            <span className="bg-foreground text-background px-2 py-0.5 font-bold text-xs uppercase tracking-wider mb-3">Fast</span>
            <p className="text-body-md text-foreground font-medium">On-time delivery, always.</p>
          </div>
          <div className="border border-border p-5 bg-surface-soft rounded-sm flex flex-col items-start">
            <span className="bg-foreground text-background px-2 py-0.5 font-bold text-xs uppercase tracking-wider mb-3">On-Target</span>
            <p className="text-body-md text-foreground font-medium">Solutions tailored to business needs.</p>
          </div>
          <div className="border border-border p-5 bg-surface-soft rounded-sm flex flex-col items-start">
            <span className="bg-foreground text-background px-2 py-0.5 font-bold text-xs uppercase tracking-wider mb-3">Quality</span>
            <p className="text-body-md text-foreground font-medium">Premium standards in every detail.</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-24 max-w-4xl w-full">
        <h2 className="text-[2rem] font-bold mb-4 tracking-tight">Our Services</h2>
        <div className="h-[1px] w-full bg-border mb-8"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-border bg-surface-card p-6 rounded-sm flex flex-col hover:border-foreground transition-colors">
            <div className="text-foreground font-mono text-xl mb-4">[+]</div>
            <h3 className="text-xl font-bold mb-3">Web Development</h3>
            <p className="text-muted-foreground leading-relaxed flex-grow">
              Custom websites and web applications built with modern Jamstack technologies for maximum performance and SEO.
            </p>
          </div>
          <div className="border border-border bg-surface-card p-6 rounded-sm flex flex-col hover:border-foreground transition-colors">
            <div className="text-foreground font-mono text-xl mb-4">[+]</div>
            <h3 className="text-xl font-bold mb-3">Mobile App Development</h3>
            <p className="text-muted-foreground leading-relaxed flex-grow">
              Cross-platform mobile applications that run smoothly on iOS and Android with a single codebase.
            </p>
          </div>
          <div className="border border-border bg-surface-card p-6 rounded-sm flex flex-col hover:border-foreground transition-colors">
            <div className="text-foreground font-mono text-xl mb-4">[+]</div>
            <h3 className="text-xl font-bold mb-3">AI Integration</h3>
            <p className="text-muted-foreground leading-relaxed flex-grow">
              Intelligent automation and AI-driven features seamlessly integrated into your existing workflows and applications.
            </p>
          </div>
        </div>
        
        <div className="mt-12">
           <Link href="/contact" className="inline-block bg-background text-foreground border border-border px-6 py-3 rounded-sm hover:bg-surface-soft transition-colors font-medium">
             Start a Project
           </Link>
        </div>
      </section>
    </div>
  );
}
