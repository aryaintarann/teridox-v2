import type { Metadata } from "next";
import { PostGrid } from "@/components/blog/post-grid";
import { PageIntro } from "@/components/shared/page-intro";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Blog" };
export const revalidate = 60;

export default async function Blog() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, category, cover_image_url, created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  return (
    <>
      <PageIntro title="Blog & Insights">
        Notes on AI, digital strategy, and building products that grow a business.
      </PageIntro>

      <section aria-label="Posts" className="wrap pb-[104px]">
        <PostGrid posts={posts ?? []} />
      </section>
    </>
  );
}
