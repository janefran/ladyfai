"use client";

import { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { getSupabase } from "@/lib/supabase";

function ToolButton({
  onClick,
  active,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm font-bold transition-colors ${
        active
          ? "bg-[var(--accent)] text-[#f4fbfb]"
          : "text-[var(--ink)] hover:bg-[var(--bg)]"
      }`}
    >
      {children}
    </button>
  );
}

export default function RichEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image.configure({ inline: false }),
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener" } }),
    ],
    content: value || "",
    editorProps: { attributes: { class: "rich" } },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) {
    return <div className="rich-editor-area text-soft">Loading editor...</div>;
  }

  function addLink() {
    const url = window.prompt("Paste the link address (https://...)");
    if (url === null) return;
    if (url === "") {
      editor!.chain().focus().unsetLink().run();
      return;
    }
    editor!.chain().focus().setLink({ href: url }).run();
  }

  async function uploadImage(file: File) {
    const supabase = getSupabase();
    if (!supabase) return;
    const safe = file.name.replace(/[^a-zA-Z0-9.]/g, "-");
    const path = `posts/${Date.now()}-${safe}`;
    const { error } = await supabase.storage.from("blog-images").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) {
      window.alert(
        "Image upload is not ready yet. We need to run the image-storage step together first. Your text is safe, just add images after that."
      );
      return;
    }
    const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
    editor!.chain().focus().setImage({ src: data.publicUrl }).run();
  }

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center gap-1 rounded-md border border-[var(--line)] bg-[var(--bg-raised)] p-1">
        <ToolButton label="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          B
        </ToolButton>
        <ToolButton label="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <span className="italic">I</span>
        </ToolButton>
        <span className="mx-1 h-5 w-px bg-[var(--line)]" />
        <ToolButton label="Heading" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </ToolButton>
        <ToolButton label="Subheading" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </ToolButton>
        <span className="mx-1 h-5 w-px bg-[var(--line)]" />
        <ToolButton label="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          &bull; List
        </ToolButton>
        <ToolButton label="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1. List
        </ToolButton>
        <ToolButton label="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          &ldquo; &rdquo;
        </ToolButton>
        <span className="mx-1 h-5 w-px bg-[var(--line)]" />
        <ToolButton label="Add link" active={editor.isActive("link")} onClick={addLink}>
          Link
        </ToolButton>
        <ToolButton label="Add image" onClick={() => fileRef.current?.click()}>
          Image
        </ToolButton>
      </div>

      <div className="rich-editor-area">
        <EditorContent editor={editor} />
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) uploadImage(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}
