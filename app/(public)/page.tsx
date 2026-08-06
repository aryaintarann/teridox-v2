import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const heroTuiWordmark = `
████████╗███████╗██████╗ ██╗██████╗  ██████╗ ██╗  ██╗
╚══██╔══╝██╔════╝██╔══██╗██║██╔══██╗██╔═══██╗╚██╗██╔╝
   ██║   █████╗  ██████╔╝██║██║  ██║██║   ██║ ╚███╔╝ 
   ██║   ██╔══╝  ██╔══██╗██║██║  ██║██║   ██║ ██╔██╗ 
   ██║   ███████╗██║  ██║██║██████╔╝╚██████╔╝██╔╝ ██╗
   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝
`.trim();

export default function Home() {
  return (
    <div className="flex flex-col gap-[96px] py-12 md:py-24">
      {/* Hero Section */}
      <section className="px-4 md:px-8 max-w-5xl mx-auto w-full">
        <div className="mb-4 text-sm">
          <span className="bg-foreground text-background px-2 py-0.5 rounded-sm mr-2">[+]</span>
          <span>We are Teridox</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
          The digital agency for<br />
          modern web & mobile solutions.
        </h1>
        
        {/* TUI Mockup Card */}
        <div className="bg-[#201d1d] text-[#fdfcfc] p-8 md:p-16 rounded-none w-full overflow-hidden flex flex-col justify-between" style={{ minHeight: '400px' }}>
          <div className="flex justify-center mb-12">
            <pre className="text-[6px] md:text-[8px] leading-[6px] md:leading-[8px] font-bold text-center">
              {heroTuiWordmark}
            </pre>
          </div>
          
          <div>
            <div className="bg-[#302c2c] rounded-sm p-2 md:p-3 flex items-center mb-12">
              <span className="text-[#9a9898] mr-4">|</span>
              <span>Build <span className="text-muted-foreground ml-2">[Web App]</span> <span className="ml-4 text-white">Next.js + Supabase</span></span>
            </div>
            
            <div className="text-[#9a9898] flex gap-4 text-xs">
              <span>tab switch service</span>
              <span>ctrl-p run command</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-4 md:px-8 max-w-5xl mx-auto w-full border border-border p-8">
        <h2 className="text-xl font-bold mb-8">What we do</h2>
        <div className="flex flex-col gap-2">
          <div className="flex bg-background text-foreground py-2 border-b border-border">
            <span className="mr-4">[+]</span>
            <span className="font-bold w-48 shrink-0">Web Development</span>
            <span className="text-muted-foreground hidden md:inline">High-performance websites and web applications.</span>
          </div>
          <div className="flex bg-background text-foreground py-2 border-b border-border">
            <span className="mr-4">[+]</span>
            <span className="font-bold w-48 shrink-0">Mobile Apps</span>
            <span className="text-muted-foreground hidden md:inline">Native and cross-platform mobile experiences.</span>
          </div>
          <div className="flex bg-background text-foreground py-2">
            <span className="mr-4">[+]</span>
            <span className="font-bold w-48 shrink-0">SaaS Solutions</span>
            <span className="text-muted-foreground hidden md:inline">Scalable software as a service architecture.</span>
          </div>
        </div>
        <div className="mt-8">
          <Link href="/services" className={buttonVariants({ variant: "outline" })}>
            View All Services
          </Link>
        </div>
      </section>

      {/* Projects Section */}
      <section className="px-4 md:px-8 max-w-5xl mx-auto w-full border border-border p-8">
        <h2 className="text-xl font-bold mb-8">Featured Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-border p-4 hover:bg-secondary transition-colors group">
            <div className="h-48 bg-muted mb-4 flex items-center justify-center">
              <span className="text-muted-foreground">[ Project Thumbnail ]</span>
            </div>
            <h3 className="font-bold mb-2">E-Commerce Replatforming</h3>
            <p className="text-sm text-muted-foreground mb-4">Migrated a legacy monolith to Next.js commerce.</p>
            <Link href="/project" className="text-sm underline underline-offset-4 group-hover:text-foreground">Read Case Study -{'>'}</Link>
          </div>
          <div className="border border-border p-4 hover:bg-secondary transition-colors group">
            <div className="h-48 bg-muted mb-4 flex items-center justify-center">
              <span className="text-muted-foreground">[ Project Thumbnail ]</span>
            </div>
            <h3 className="font-bold mb-2">Mobile Banking App</h3>
            <p className="text-sm text-muted-foreground mb-4">React Native app for a regional financial institution.</p>
            <Link href="/project" className="text-sm underline underline-offset-4 group-hover:text-foreground">Read Case Study -{'>'}</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-8 max-w-5xl mx-auto w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to build something?</h2>
        <p className="text-muted-foreground mb-8">Let's discuss your next digital project.</p>
        <Link href="/contact" className={buttonVariants({ size: "lg" })}>
          Contact Us
        </Link>
      </section>
    </div>
  );
}
