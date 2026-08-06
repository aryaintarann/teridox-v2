import { HeroTUI } from "@/components/hero-tui";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <HeroTUI />

      <section className="container mx-auto px-4 md:px-6 py-24 max-w-4xl w-full">
        <h2 className="text-heading-md font-bold mb-4">What is Teridox?</h2>
        <div className="h-[1px] w-full bg-border mb-8"></div>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <span className="text-foreground shrink-0">[+]</span>
            <div>
              <span className="font-bold">Web Development</span>
              <p className="text-muted-foreground mt-1">
                Custom websites and web applications built with modern Jamstack technologies for maximum performance and SEO.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-foreground shrink-0">[+]</span>
            <div>
              <span className="font-bold">Mobile App Development</span>
              <p className="text-muted-foreground mt-1">
                Cross-platform mobile applications that run smoothly on iOS and Android with a single codebase.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-foreground shrink-0">[+]</span>
            <div>
              <span className="font-bold">AI Integration</span>
              <p className="text-muted-foreground mt-1">
                Intelligent automation and AI-driven features seamlessly integrated into your existing workflows and applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-24 max-w-4xl w-full">
        <h2 className="text-heading-md font-bold mb-4">Install Teridox</h2>
        <div className="h-[1px] w-full bg-border mb-8"></div>
        
        <div className="bg-surface-card rounded-sm p-4 flex items-center justify-between mb-8">
          <code className="text-body-md text-foreground">
            curl -fsSL https://teridox.com/contact | bash
          </code>
          <button className="text-muted-foreground hover:text-foreground">
            [copy]
          </button>
        </div>
        
        <div className="flex justify-center">
           <Link href="/contact" className="bg-background text-foreground border border-border px-5 py-2 rounded-sm hover:bg-surface-soft transition-colors font-medium">
             Contact Sales
           </Link>
        </div>
      </section>
    </div>
  );
}
