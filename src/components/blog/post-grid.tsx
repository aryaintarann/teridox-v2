"use client";

import Image from "next/image";
import { useState } from "react";
import { RevealLink } from "@/components/motion/reveal";
import { formatDate } from "@/lib/utils";

export type PostCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  cover_image_url: string | null;
  created_at: string;
};

export function PostGrid({ posts }: { posts: PostCard[] }) {
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(posts.flatMap((p) => (p.category ? [p.category] : [])))];
  const shown = category === "All" ? posts : posts.filter((p) => p.category === category);

  if (posts.length === 0) {
    return <p className="card p-10 text-center text-muted-foreground">No blog posts published yet.</p>;
  }

  return (
    <div className="flex flex-col gap-10">
      {/* A filter with one real choice is noise, so it waits for a second category. */}
      {categories.length > 2 && (
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={c === category}
              onClick={() => setCategory(c)}
              className={`btn min-h-11 px-5 text-[15px] ${c === category ? "btn-primary" : "btn-quiet"}`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-5">
        {shown.map((post, i) => (
          <RevealLink
            key={post.id}
            delay={(i % 2) * 0.1}
            href={`/blog/${post.slug}`}
            className="card flex flex-col gap-3.5 p-3 pb-8"
          >
            {post.cover_image_url && (
              <span className="relative block aspect-[16/8] overflow-hidden rounded-[18px] bg-tint">
                <Image
                  src={post.cover_image_url}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover"
                />
              </span>
            )}
            <span className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-5 pt-2 text-sm font-bold">
              <span className="text-accent">{post.category}</span>
              <span className="text-muted-foreground">{formatDate(post.created_at)}</span>
            </span>
            <span className="px-5 text-[clamp(22px,2.2vw,28px)] font-extrabold leading-[1.15] tracking-[-0.02em]">
              {post.title}
            </span>
            {post.excerpt && <span className="px-5 text-muted-foreground">{post.excerpt}</span>}
            <span className="mt-auto px-5 pt-2 font-bold text-accent">
              Read article <span aria-hidden="true">→</span>
            </span>
          </RevealLink>
        ))}
      </div>
    </div>
  );
}
