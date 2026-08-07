"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Loader2 } from "lucide-react";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { ImageUploader } from "@/components/admin/image-uploader";
import { createBlogPost } from "@/app/admin/actions";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="bg-foreground text-background px-6 py-2 rounded-sm font-medium hover:bg-foreground/90 disabled:opacity-50"
    >
      {pending ? "Saving..." : "Publish Post"}
    </button>
  );
}

export default function NewBlogPost() {
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");

  const [aiTopic, setAiTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [aiError, setAiError] = useState("");

  const handleAiGenerate = async () => {
    if (!aiTopic.trim()) return;
    setIsGenerating(true);
    setAiError("");

    try {
      const res = await fetch("/api/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: aiTopic }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate blog");

      setTitle(data.title || "");
      setCategory(data.category || "");
      setExcerpt(data.excerpt || "");
      setContent(data.content || "");
      if (data.coverImage) setCoverImage(data.coverImage);
      
      setShowAiPanel(false);
    } catch (err: any) {
      setAiError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl pb-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="p-2 hover:bg-surface-soft rounded-sm text-muted-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">New Blog Post</h1>
        </div>
        
        <button 
          onClick={() => setShowAiPanel(!showAiPanel)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium rounded-sm hover:opacity-90 transition-opacity"
        >
          <Sparkles className="w-4 h-4" />
          Generate with AI
        </button>
      </div>

      {showAiPanel && (
        <div className="mb-6 p-6 bg-surface-soft border border-violet-500/30 rounded-sm">
          <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-violet-500" /> AI Blog Assistant
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Enter a topic or idea. The AI will write the entire article, find a category, write an excerpt, and generate a beautiful cover image for you.
          </p>
          <div className="flex gap-4">
            <input 
              type="text" 
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              placeholder="e.g. The future of web development with AI"
              className="flex-1 bg-background border border-border px-4 py-2 rounded-sm text-sm outline-none focus:border-violet-500"
              onKeyDown={(e) => e.key === 'Enter' && handleAiGenerate()}
            />
            <button 
              onClick={handleAiGenerate}
              disabled={isGenerating || !aiTopic.trim()}
              className="bg-violet-500 text-white px-6 py-2 rounded-sm font-medium hover:bg-violet-600 disabled:opacity-50 flex items-center gap-2"
            >
              {isGenerating ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</> : "Generate"}
            </button>
          </div>
          {aiError && <p className="text-destructive text-sm mt-3">{aiError}</p>}
        </div>
      )}

      <div className="bg-surface-card border border-border p-6 rounded-sm shadow-sm">
        <form action={createBlogPost} className="space-y-6">
          <input type="hidden" name="content" value={content} />
          <input type="hidden" name="cover_image_url" value={coverImage} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium block">Title</label>
              <input 
                name="title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-background border border-border px-3 py-2 rounded-sm text-sm outline-none focus:border-foreground" 
                placeholder="e.g. Why Next.js is Awesome"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium block">Category</label>
              <input 
                name="category" 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-background border border-border px-3 py-2 rounded-sm text-sm outline-none focus:border-foreground"
                placeholder="e.g. Engineering, Design"
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
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              required
              rows={3}
              className="w-full bg-background border border-border px-3 py-2 rounded-sm text-sm outline-none focus:border-foreground resize-y" 
              placeholder="A brief introduction..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block">Full Content (Rich Text)</label>
            {/* Force RichTextEditor re-render when AI generates content by using a key */}
            <RichTextEditor key={content.substring(0, 20)} content={content} onChange={setContent} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block">Status</label>
            <select 
              name="status" 
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
