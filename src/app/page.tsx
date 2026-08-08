import { HeroTUI } from "@/components/hero-tui";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/animations/fade-in";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

export default async function Home() {
  const supabase = await createClient();
  
  // Fetch latest 4 projects
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(4);
    
  // Fetch active testimonials
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });
    
  // Fetch latest 3 blog posts
  const { data: blogs } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <div className="flex flex-col items-center w-full overflow-hidden">
      <HeroTUI />

      <FadeIn delay={0.1}>
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
      </FadeIn>

      <FadeIn delay={0.1}>
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
      </FadeIn>

      {/* Our Work Section */}
      <FadeIn delay={0.1}>
        <section className="container mx-auto px-4 md:px-6 py-24 max-w-4xl w-full">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-[2rem] font-bold tracking-tight">Our Work</h2>
            <Link href="/project" className="text-muted-foreground hover:text-foreground font-mono text-sm">[View all]</Link>
          </div>
          <div className="h-[1px] w-full bg-border mb-8"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects && projects.length > 0 ? (
              projects.map((project: any) => (
                <Link href={`/project`} key={project.id} className="group cursor-pointer block">
                  <div className="w-full aspect-video bg-surface-card border border-border mb-4 overflow-hidden relative rounded-sm flex items-center justify-center">
                     {project.cover_image_url ? (
                        <Image src={project.cover_image_url} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                     ) : (
                        <span className="text-muted-foreground text-sm">[ No Image ]</span>
                     )}
                     <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <h3 className="font-bold text-lg mb-1 group-hover:underline">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">{project.category}</p>
                </Link>
              ))
            ) : (
              <p className="text-muted-foreground col-span-2 py-8 text-center border border-border bg-surface-soft">
                Projects coming soon.
              </p>
            )}
          </div>
        </section>
      </FadeIn>

      {/* Client Testimonials Section */}
      <FadeIn delay={0.1}>
        <section className="container mx-auto px-4 md:px-6 py-24 max-w-4xl w-full">
          <h2 className="text-[2rem] font-bold mb-4 tracking-tight">Client Testimonials</h2>
          <div className="h-[1px] w-full bg-border mb-8"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {testimonials && testimonials.length > 0 ? (
              testimonials.map((testi: any) => (
                <div key={testi.id} className="flex flex-col">
                  <div className="text-4xl text-muted-foreground font-serif leading-none mb-2">"</div>
                  <p className="text-lg text-foreground leading-relaxed flex-grow mb-6">
                    {testi.quote}
                  </p>
                  <div className="font-bold">{testi.client_name}</div>
                  <div className="text-sm text-muted-foreground font-mono">{testi.client_position}</div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground col-span-2">No testimonials available yet.</p>
            )}
          </div>
        </section>
      </FadeIn>

      {/* Blog & Insights Section */}
      <FadeIn delay={0.1}>
        <section className="container mx-auto px-4 md:px-6 py-24 max-w-4xl w-full">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-[2rem] font-bold tracking-tight">Blog & Insights</h2>
            <Link href="/blog" className="text-muted-foreground hover:text-foreground font-mono text-sm">[View all]</Link>
          </div>
          <div className="h-[1px] w-full bg-border mb-8"></div>
          
          <div className="space-y-6">
            {blogs && blogs.length > 0 ? (
              blogs.map((blog: any) => (
                <Link key={blog.id} href={`/blog`} className="group block border border-border p-6 hover:border-foreground transition-colors bg-surface-card rounded-sm">
                  <div className="text-sm text-muted-foreground mb-2 font-mono">
                    {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:underline">{blog.title}</h3>
                  <p className="text-muted-foreground">{blog.excerpt || 'Read more about this topic.'}</p>
                </Link>
              ))
            ) : (
              <p className="text-muted-foreground py-8 text-center border border-border bg-surface-soft">
                No articles published yet.
              </p>
            )}
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
