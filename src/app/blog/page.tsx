import React from "react";
import Link from "next/link";
import { FadeIn } from "@/components/animations/fade-in";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

export default async function Blog() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  return (
    <FadeIn delay={0.1}>
    <div className="container mx-auto px-4 md:px-6 py-16 max-w-4xl">
      <h1 className="text-display-xl font-bold mb-8">Blog</h1>
      
      <div className="flex flex-col gap-8 mt-12">
        {posts && posts.length > 0 ? (
          posts.map((post: any) => (
            <article key={post.id} className="border-b border-border pb-8">
              <div className="flex gap-4 items-center mb-3">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{post.category}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-3 hover:underline cursor-pointer">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              <p className="text-body-md text-body mb-4">
                {post.excerpt}
              </p>
              <Link href={`/blog/${post.slug}`} className="text-sm font-bold text-foreground">
                Read more [→]
              </Link>
            </article>
          ))
        ) : (
          <p className="text-muted-foreground text-center py-12 border border-border bg-surface-soft">
            No blog posts published yet.
          </p>
        )}
      </div>
    </div>
    </FadeIn>
  );
}
