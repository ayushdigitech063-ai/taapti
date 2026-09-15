"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || "<p>Write your detailed blog content here...</p>",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div style={{ padding: "20px", border: "1px solid #CBD5E1", borderRadius: "10px", background: "#F8FAFC", color: "#64748B" }}>
        Loading Rich Text Editor...
      </div>
    );
  }

  return (
    <div style={{ border: "1px solid #CBD5E1", borderRadius: "12px", overflow: "hidden", background: "#FFF" }}>
      {/* Editor Formatting Toolbar */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", padding: "10px 14px", background: "#F1F5F9", borderBottom: "1px solid #E2E8F0" }}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #CBD5E1",
            background: editor.isActive("bold") ? "#2563EB" : "#FFF",
            color: editor.isActive("bold") ? "#FFF" : "#0F172A",
            fontWeight: "700",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          B
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #CBD5E1",
            background: editor.isActive("italic") ? "#2563EB" : "#FFF",
            color: editor.isActive("italic") ? "#FFF" : "#0F172A",
            fontStyle: "italic",
            fontWeight: "700",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          I
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #CBD5E1",
            background: editor.isActive("strike") ? "#2563EB" : "#FFF",
            color: editor.isActive("strike") ? "#FFF" : "#0F172A",
            textDecoration: "line-through",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          S
        </button>

        <div style={{ width: "1px", background: "#CBD5E1", margin: "0 4px" }} />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #CBD5E1",
            background: editor.isActive("heading", { level: 1 }) ? "#2563EB" : "#FFF",
            color: editor.isActive("heading", { level: 1 }) ? "#FFF" : "#0F172A",
            fontWeight: "800",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          H1
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #CBD5E1",
            background: editor.isActive("heading", { level: 2 }) ? "#2563EB" : "#FFF",
            color: editor.isActive("heading", { level: 2 }) ? "#FFF" : "#0F172A",
            fontWeight: "800",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          H2
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #CBD5E1",
            background: editor.isActive("heading", { level: 3 }) ? "#2563EB" : "#FFF",
            color: editor.isActive("heading", { level: 3 }) ? "#FFF" : "#0F172A",
            fontWeight: "800",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          H3
        </button>

        <div style={{ width: "1px", background: "#CBD5E1", margin: "0 4px" }} />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #CBD5E1",
            background: editor.isActive("bulletList") ? "#2563EB" : "#FFF",
            color: editor.isActive("bulletList") ? "#FFF" : "#0F172A",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          • Bullet List
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #CBD5E1",
            background: editor.isActive("orderedList") ? "#2563EB" : "#FFF",
            color: editor.isActive("orderedList") ? "#FFF" : "#0F172A",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          1. Numbered List
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #CBD5E1",
            background: editor.isActive("blockquote") ? "#2563EB" : "#FFF",
            color: editor.isActive("blockquote") ? "#FFF" : "#0F172A",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          “ Quote
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #CBD5E1",
            background: editor.isActive("codeBlock") ? "#2563EB" : "#FFF",
            color: editor.isActive("codeBlock") ? "#FFF" : "#0F172A",
            fontSize: "12px",
            cursor: "pointer",
            fontFamily: "monospace",
          }}
        >
          {"</> Code"}
        </button>
      </div>

      {/* Editor Editable Body */}
      <div style={{ padding: "16px", minHeight: "220px", fontSize: "14px", lineHeight: "1.6" }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
