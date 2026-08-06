"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { ImageUploader } from "@/components/admin/image-uploader";
import { createProject } from "@/app/admin/actions";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="bg-foreground text-background px-6 py-2 rounded-sm font-medium hover:bg-foreground/90 disabled:opacity-50"
    >
      {pending ? "Saving..." : "Save Project"}
    </button>
  );
}

export default function NewProject() {
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");

  return (
    <div className="max-w-4xl pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/projects" className="p-2 hover:bg-surface-soft rounded-sm text-muted-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">New Project</h1>
      </div>

      <div className="bg-surface-card border border-border p-6 rounded-sm shadow-sm">
        <form action={createProject} className="space-y-6">
          <input type="hidden" name="description" value={content} />
          <input type="hidden" name="cover_image_url" value={coverImage} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium block">Project Title</label>
              <input 
                name="title" 
                required
                className="w-full bg-background border border-border px-3 py-2 rounded-sm text-sm outline-none focus:border-foreground" 
                placeholder="e.g. Fintech Mobile App"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium block">Category</label>
              <select 
                name="category" 
                className="w-full bg-background border border-border px-3 py-2 rounded-sm text-sm outline-none focus:border-foreground"
              >
                <option value="Web Development">Web Development</option>
                <option value="Mobile App">Mobile App</option>
                <option value="AI Integration">AI Integration</option>
                <option value="Design">Design</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block">Cover Image</label>
            <ImageUploader value={coverImage} onChange={setCoverImage} folder="projects" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block">Tech Stack (comma separated)</label>
            <input 
              name="tech_stack" 
              className="w-full bg-background border border-border px-3 py-2 rounded-sm text-sm outline-none focus:border-foreground" 
              placeholder="React, Next.js, Tailwind, Supabase"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block">Short Summary (displayed on cards)</label>
            <textarea 
              name="summary" 
              required
              rows={3}
              className="w-full bg-background border border-border px-3 py-2 rounded-sm text-sm outline-none focus:border-foreground resize-y" 
              placeholder="A brief overview of the project..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block">Full Description (Rich Text)</label>
            <RichTextEditor content={content} onChange={setContent} />
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
