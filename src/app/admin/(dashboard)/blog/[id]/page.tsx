"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { ImageUploader } from "@/components/admin/image-uploader";
import { updateBlogPost } from "@/app/admin/actions";
import { useFormStatus } from "react-dom";
import { createClient } from "@/lib/supabase/client";
import { notFound } from "next/navigation";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="bg-foreground text-background px-6 py-2 rounded-sm font-medium hover:bg-foreground/90 disabled:opacity-50"
    >
      {pending ? "Saving..." : "Update Post"}
    </button>
  );
}

export default function EditBlogPost(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("blog_posts").select("*").eq("id", params.id).single();
      
      if (error || !data) {
        setLoading(false);
        return;
      }
      
      setPost(data);
      setContent(data.content || "");
      setCoverImage(data.cover_image_url || "");
      setLoading(false);
    };
    fetchPost();
  }, [params.id]);

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="animate-spin w-8 h-8 text-muted-foreground" /></div>;
  }

  if (!post) {
    return notFound();
  }

  return (
    <div className="max-w-4xl pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/blog" className="p-2 hover:bg-surface-soft rounded-sm text-muted-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Edit Blog Post</h1>
      </div>

      <div className="bg-surface-card border border-border p-6 rounded-sm shadow-sm">
        <form action={updateBlogPost.bind(null, params.id)} className="space-y-6">
          <input type="hidden" name="content" value={content} />
          <input type="hidden" name="cover_image_url" value={coverImage} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium block">Title</label>
              <input 
                name="title" 
                defaultValue={post.title}
                required
                className="w-full bg-background border border-border px-3 py-2 rounded-sm text-sm outline-none focus:border-foreground" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium block">Category</label>
              <input 
                name="category" 
                defaultValue={post.category}
                className="w-full bg-background border border-border px-3 py-2 rounded-sm text-sm outline-none focus:border-foreground"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block">Cover Image</label>
            <ImageUploader value={coverImage} onChange={setCoverImage} folder="blog" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block">Excerpt (displayed on cards)</label>
            <textarea 
              name="excerpt" 
              defaultValue={post.excerpt}
              required
              rows={3}
              className="w-full bg-background border border-border px-3 py-2 rounded-sm text-sm outline-none focus:border-foreground resize-y" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block">Full Content (Rich Text)</label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block">Status</label>
            <select 
              name="status" 
              defaultValue={post.status}
              className="w-full bg-background border border-border px-3 py-2 rounded-sm text-sm outline-none focus:border-foreground"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
