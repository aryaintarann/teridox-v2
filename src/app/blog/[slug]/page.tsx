import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/animations/fade-in";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import sanitizeHtml from 'sanitize-html';

export default async function BlogPost(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const supabase = await createClient();
  
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <FadeIn delay={0.1}>
      <article className="container mx-auto px-4 md:px-6 py-16 max-w-3xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to blog
        </Link>
        
        <div className="mb-8">
          <div className="flex gap-4 items-center mb-4">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{post.category}</span>
            <span className="text-xs text-muted-foreground">
              {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{post.title}</h1>
        </div>

        {post.cover_image_url && (
          <div className="aspect-video w-full rounded-sm overflow-hidden mb-12 border border-border bg-surface-card">
            <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div 
          className="prose prose-neutral dark:prose-invert prose-p:leading-relaxed prose-headings:font-bold prose-a:text-foreground hover:prose-a:text-foreground/80 max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content || '', { allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]) }) }}
        />
      </article>
    </FadeIn>
  );
}
