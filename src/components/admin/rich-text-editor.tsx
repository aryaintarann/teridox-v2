"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered, Heading2 } from 'lucide-react';

export function RichTextEditor({ content, onChange }: { content: string, onChange: (val: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
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
      </div>
      <EditorContent editor={editor} className="flex-grow bg-background cursor-text" />
    </div>
  );
}
