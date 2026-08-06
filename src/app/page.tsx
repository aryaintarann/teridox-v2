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

      {/* Our Work Section */}
      <section className="container mx-auto px-4 md:px-6 py-24 max-w-4xl w-full">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-[2rem] font-bold tracking-tight">Our Work</h2>
          <Link href="/project" className="text-muted-foreground hover:text-foreground font-mono text-sm">[View all]</Link>
        </div>
        <div className="h-[1px] w-full bg-border mb-8"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group cursor-pointer">
            <div className="w-full aspect-video bg-surface-card border border-border mb-4 overflow-hidden relative rounded-sm">
               <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h3 className="font-bold text-lg mb-1 group-hover:underline">E-Commerce Replatforming</h3>
            <p className="text-muted-foreground text-sm">Web Development</p>
          </div>
          <div className="group cursor-pointer">
            <div className="w-full aspect-video bg-surface-card border border-border mb-4 overflow-hidden relative rounded-sm">
               <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h3 className="font-bold text-lg mb-1 group-hover:underline">Fintech Mobile Wallet</h3>
            <p className="text-muted-foreground text-sm">Mobile App</p>
          </div>
          <div className="group cursor-pointer">
            <div className="w-full aspect-video bg-surface-card border border-border mb-4 overflow-hidden relative rounded-sm">
               <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h3 className="font-bold text-lg mb-1 group-hover:underline">AI Customer Support Bot</h3>
            <p className="text-muted-foreground text-sm">AI Integration</p>
          </div>
          <div className="group cursor-pointer">
            <div className="w-full aspect-video bg-surface-card border border-border mb-4 overflow-hidden relative rounded-sm">
               <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <h3 className="font-bold text-lg mb-1 group-hover:underline">Logistics Dashboard</h3>
            <p className="text-muted-foreground text-sm">Web Development</p>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="container mx-auto px-4 md:px-6 py-24 max-w-4xl w-full">
        <h2 className="text-[2rem] font-bold mb-4 tracking-tight">Client Testimonials</h2>
        <div className="h-[1px] w-full bg-border mb-8"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="flex flex-col">
            <div className="text-4xl text-muted-foreground font-serif leading-none mb-2">"</div>
            <p className="text-lg text-foreground leading-relaxed flex-grow mb-6">
              Teridox completely transformed our digital presence. Their attention to detail and ability to deliver on time is unmatched.
            </p>
            <div className="font-bold">Sarah Jenkins</div>
            <div className="text-sm text-muted-foreground font-mono">CTO, TechFlow</div>
          </div>
          
          <div className="flex flex-col">
            <div className="text-4xl text-muted-foreground font-serif leading-none mb-2">"</div>
            <p className="text-lg text-foreground leading-relaxed flex-grow mb-6">
              The AI integration they built for us reduced our manual processing time by 80%. Highly recommended team of experts.
            </p>
            <div className="font-bold">David Chen</div>
            <div className="text-sm text-muted-foreground font-mono">Operations Director, Nexus</div>
          </div>
        </div>
      </section>

      {/* Blog & Insights Section */}
      <section className="container mx-auto px-4 md:px-6 py-24 max-w-4xl w-full">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-[2rem] font-bold tracking-tight">Blog & Insights</h2>
          <Link href="/blog" className="text-muted-foreground hover:text-foreground font-mono text-sm">[View all]</Link>
        </div>
        <div className="h-[1px] w-full bg-border mb-8"></div>
        
        <div className="space-y-6">
          <Link href="/blog" className="group block border border-border p-6 hover:border-foreground transition-colors bg-surface-card rounded-sm">
            <div className="text-sm text-muted-foreground mb-2 font-mono">August 12, 2026</div>
            <h3 className="text-xl font-bold mb-2 group-hover:underline">The Future of Jamstack in Enterprise Applications</h3>
            <p className="text-muted-foreground">Exploring how large-scale businesses are leveraging static site generation and headless CMS for better security and performance.</p>
          </Link>
          
          <Link href="/blog" className="group block border border-border p-6 hover:border-foreground transition-colors bg-surface-card rounded-sm">
            <div className="text-sm text-muted-foreground mb-2 font-mono">July 28, 2026</div>
            <h3 className="text-xl font-bold mb-2 group-hover:underline">5 AI Automation Trends Transforming B2B Workflows</h3>
            <p className="text-muted-foreground">A deep dive into how machine learning models and intelligent agents are streamlining operations across various industries.</p>
          </Link>
          
          <Link href="/blog" className="group block border border-border p-6 hover:border-foreground transition-colors bg-surface-card rounded-sm">
            <div className="text-sm text-muted-foreground mb-2 font-mono">July 10, 2026</div>
            <h3 className="text-xl font-bold mb-2 group-hover:underline">React Native vs Flutter: Choosing the Right Framework</h3>
            <p className="text-muted-foreground">An objective comparison of the top two cross-platform mobile development frameworks to help you make an informed technical decision.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
