import { jsonLdString } from "@/lib/json-ld";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import sanitizeHtml from 'sanitize-html';
import { Metadata } from 'next';
import { Reveal, RevealLink, RevealText } from "@/components/motion/reveal";
import { formatDate } from "@/lib/utils";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const supabase = await createClient();
  const { data: post } = await supabase.from("blog_posts").select("*").eq("slug", params.slug).eq("status", "published").single();

  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://teridox.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://teridox.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.published_at || post.created_at,
      images: post.cover_image_url ? [post.cover_image_url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.cover_image_url ? [post.cover_image_url] : [],
    }
  };
}

export default async function BlogPost(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("status", "published")
    .single();

  if (!post) {
    notFound();
  }

  const { data: more } = await supabase
    .from("blog_posts")
    .select("id, slug, title, category, created_at")
    .eq("status", "published")
    .neq("slug", params.slug)
    .order("created_at", { ascending: false })
    .limit(2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.cover_image_url,
    "datePublished": post.published_at || post.created_at,
    "dateModified": post.updated_at || post.created_at,
    "mainEntityOfPage": `https://teridox.com/blog/${post.slug}`,
    "author": {
      "@type": "Organization",
      "name": "Teridox",
      "url": "https://teridox.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Teridox",
      "url": "https://teridox.com"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
      />

      <section aria-label="Article intro" className="wrap flex max-w-[920px] flex-col items-start gap-6 pb-10 pt-14">
        <Link href="/blog" className="btn btn-quiet min-h-11 px-[18px] text-sm">
          <span aria-hidden="true">←</span> All posts
        </Link>
        <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm font-bold">
          <span className="text-accent">{post.category}</span>
          <span className="text-muted-foreground">{formatDate(post.created_at)}</span>
        </p>
        <RevealText
          as="h1"
          className="text-[clamp(32px,4.4vw,60px)] font-extrabold leading-[1.05] tracking-[-0.035em] text-balance"
        >
          {post.title}
        </RevealText>
        <Reveal delay={0.3} className="flex flex-col items-start gap-6">
          {post.excerpt && <p className="text-[19px] text-muted-foreground">{post.excerpt}</p>}
          <p className="font-bold">By Teridox</p>
        </Reveal>
      </section>

      {post.cover_image_url && (
        <section aria-label="Cover" className="wrap pb-14">
          <Reveal scale={0.98} className="card p-3">
            <div className="relative aspect-[16/7] overflow-hidden rounded-[18px] bg-tint">
              <Image
                src={post.cover_image_url}
                alt={post.title}
                fill
                sizes="(max-width: 1240px) 100vw, 1240px"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        </section>
      )}

      <article className="wrap max-w-[920px] pb-[104px]">
        <Reveal className="card p-[clamp(24px,5vw,72px)]">
          <div
            className="prose prose-lg prose-neutral dark:prose-invert prose-p:leading-relaxed prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-accent max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content || '', { allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]) }) }}
          />
        </Reveal>
      </article>

      {more && more.length > 0 && (
        <section aria-labelledby="post-more" className="wrap flex flex-col gap-9 pb-[104px]">
          <RevealText id="post-more" className="title">
            Keep reading
          </RevealText>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-4">
            {more.map((p, i) => (
              <RevealLink key={p.id} delay={i * 0.1} href={`/blog/${p.slug}`} className="card flex flex-col gap-2.5 p-8">
                <span className="label">
                  {[p.category, formatDate(p.created_at)].filter(Boolean).join(" / ")}
                </span>
                <span className="text-[22px] font-extrabold leading-[1.2] tracking-[-0.02em]">{p.title}</span>
              </RevealLink>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
