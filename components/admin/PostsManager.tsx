"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getSupabase } from "@/lib/supabase";
import RichEditor from "@/components/admin/RichEditor";

type Row = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image?: string | null;
  published: boolean;
  published_at: string;
};

type Draft = Omit<Row, "id" | "published_at"> & { id?: string };

const blank: Draft = {
  slug: "",
  title: "",
  excerpt: "",
  body: "",
  cover_image: "",
  published: false,
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export default function PostsManager() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const coverRef = useRef<HTMLInputElement | null>(null);

  async function load() {
    const supabase = getSupabase();
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("published_at", { ascending: false });
    setRows((data as Row[]) || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(row?: Row) {
    setError("");
    setSlugTouched(true);
    setEditing(row ? { ...row } : { ...blank });
  }

  async function uploadCover(file: File) {
    const supabase = getSupabase();
    if (!supabase || !editing) return;
    const safe = file.name.replace(/[^a-zA-Z0-9.]/g, "-");
    const path = `covers/${Date.now()}-${safe}`;
    const { error: upErr } = await supabase.storage.from("blog-images").upload(path, file);
    if (upErr) {
      window.alert(
        "Cover upload is not ready yet. We need to run the image-storage step together first."
      );
      return;
    }
    const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
    setEditing({ ...editing, cover_image: data.publicUrl });
  }

  async function save(publish: boolean) {
    if (!editing) return;
    const title = editing.title.trim();
    const slug = (editing.slug || slugify(title)).trim();
    if (!title) {
      setError("Give your post a title.");
      return;
    }
    if (!slug) {
      setError("This post needs a web address (slug). It is usually made from the title.");
      return;
    }
    const supabase = getSupabase();
    if (!supabase) return;
    setSaving(true);
    setError("");

    const payload: Record<string, unknown> = {
      slug,
      title,
      excerpt: editing.excerpt.trim(),
      body: editing.body,
      published: publish,
    };
    if (editing.cover_image) payload.cover_image = editing.cover_image;
    if (publish) payload.published_at = new Date().toISOString();

    const { error: e } = editing.id
      ? await supabase.from("posts").update(payload).eq("id", editing.id)
      : await supabase.from("posts").insert(payload);

    setSaving(false);
    if (e) {
      setError(
        e.message.includes("duplicate")
          ? "A post already uses that web address. Change the slug to something unique."
          : e.message
      );
      return;
    }
    setEditing(null);
    load();
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this post? This cannot be undone.")) return;
    const supabase = getSupabase();
    if (!supabase) return;
    await supabase.from("posts").delete().eq("id", id);
    load();
  }

  if (editing) {
    return (
      <div className="max-w-2xl">
        <h2 className="font-display text-2xl font-bold text-[var(--ink-strong)]">
          {editing.id ? "Edit post" : "New post"}
        </h2>
        <div className="mt-6 space-y-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="p-title">Title</label>
            <input
              id="p-title"
              value={editing.title}
              onChange={(e) => {
                const title = e.target.value;
                setEditing((prev) =>
                  prev
                    ? { ...prev, title, slug: slugTouched ? prev.slug : slugify(title) }
                    : prev
                );
              }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="p-slug">Web address (slug)</label>
            <input
              id="p-slug"
              value={editing.slug}
              onChange={(e) => {
                setSlugTouched(true);
                setEditing({ ...editing, slug: e.target.value });
              }}
            />
            <span className="text-xs text-soft">
              Your post will live at /blog/{editing.slug || "your-title"}
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="p-excerpt">Short summary (shown on the blog list)</label>
            <textarea
              id="p-excerpt"
              rows={2}
              value={editing.excerpt}
              onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label>Cover image</label>
            {editing.cover_image ? (
              <div className="relative aspect-[16/9] w-full max-w-sm overflow-hidden rounded-xl">
                <Image src={editing.cover_image} alt="Cover preview" fill className="object-cover" sizes="24rem" />
                <button
                  type="button"
                  onClick={() => setEditing({ ...editing, cover_image: "" })}
                  className="absolute right-2 top-2 rounded-full bg-[#081c1b]/80 px-3 py-1 text-xs font-bold text-white"
                >
                  Remove
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => coverRef.current?.click()}
                className="btn-ghost w-fit"
              >
                Upload cover image
              </button>
            )}
            <input
              ref={coverRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) uploadCover(f);
                e.target.value = "";
              }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label>Post body</label>
            <RichEditor
              value={editing.body}
              onChange={(html) => setEditing((prev) => (prev ? { ...prev, body: html } : prev))}
            />
          </div>

          {error && <p role="alert" className="text-sm font-semibold text-red-600">{error}</p>}

          <div className="flex flex-wrap gap-3 pt-1">
            <button onClick={() => save(true)} className="btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Publish"}
            </button>
            <button onClick={() => save(false)} className="btn-ghost" disabled={saving}>
              Save as draft
            </button>
            <button onClick={() => setEditing(null)} className="btn-ghost">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-[var(--ink-strong)]">Blog posts</h2>
        <button onClick={() => startEdit()} className="btn-primary">
          New post
        </button>
      </div>

      {loading ? (
        <p className="mt-6 text-soft">Loading...</p>
      ) : rows.length === 0 ? (
        <p className="mt-6 text-soft">
          No posts yet. Write your first one and publish it to /blog.
        </p>
      ) : (
        <div className="mt-6 space-y-3">
          {rows.map((row) => (
            <div key={row.id} className="card-raised flex flex-wrap items-center justify-between gap-3 p-5">
              <div>
                <p className="font-display font-semibold text-[var(--ink-strong)]">{row.title}</p>
                <p className="text-xs text-soft">/blog/{row.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    row.published ? "bg-[#dff5ec] text-[#0c7a52]" : "bg-[var(--bg)] text-soft"
                  }`}
                >
                  {row.published ? "Published" : "Draft"}
                </span>
                <button onClick={() => startEdit(row)} className="btn-ghost !px-4 !py-1.5 text-sm">
                  Edit
                </button>
                <button
                  onClick={() => remove(row.id)}
                  className="rounded-full px-4 py-1.5 text-sm font-bold text-red-600 transition-colors hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
