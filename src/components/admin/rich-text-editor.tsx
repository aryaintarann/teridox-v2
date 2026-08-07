"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Bold, Italic, List, ListOrdered, Heading2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

export function RichTextEditor({ content, onChange }: { content: string, onChange: (val: string) => void }) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-sm border border-border mx-auto my-4 max-w-full',
        },
      }),
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-invert max-w-none min-h-[150px] p-4 outline-none focus:ring-0 focus:outline-none',
      },
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    setIsUploading(true);
    const supabase = createClient();

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `blog/${fileName}`;

      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(filePath, file);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);

      editor.chain().focus().setImage({ src: publicUrlData.publicUrl }).run();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
      // Reset input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-border rounded-sm bg-background flex flex-col overflow-hidden">
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-surface-soft p-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-sm transition-colors ${editor.isActive('bold') ? 'bg-surface-card text-foreground shadow-sm border border-border' : 'text-muted-foreground hover:bg-surface-card hover:text-foreground border border-transparent'}`}
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-sm transition-colors ${editor.isActive('italic') ? 'bg-surface-card text-foreground shadow-sm border border-border' : 'text-muted-foreground hover:bg-surface-card hover:text-foreground border border-transparent'}`}
        >
          <Italic className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-border mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded-sm transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-surface-card text-foreground shadow-sm border border-border' : 'text-muted-foreground hover:bg-surface-card hover:text-foreground border border-transparent'}`}
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-border mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-sm transition-colors ${editor.isActive('bulletList') ? 'bg-surface-card text-foreground shadow-sm border border-border' : 'text-muted-foreground hover:bg-surface-card hover:text-foreground border border-transparent'}`}
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-sm transition-colors ${editor.isActive('orderedList') ? 'bg-surface-card text-foreground shadow-sm border border-border' : 'text-muted-foreground hover:bg-surface-card hover:text-foreground border border-transparent'}`}
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-border mx-1" />
        
        {/* Image Upload Button */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          accept="image/*" 
          className="hidden" 
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="p-2 rounded-sm transition-colors text-muted-foreground hover:bg-surface-card hover:text-foreground border border-transparent flex items-center justify-center disabled:opacity-50"
        >
          {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
        </button>
      </div>
      <EditorContent editor={editor} className="flex-grow bg-background cursor-text" />
    </div>
  );
}
