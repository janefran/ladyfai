"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

type Row = {
  id: string;
  title: string;
  youtube_id: string;
  description: string;
  published: boolean;
};

const blank = { title: "", youtube_id: "", description: "", published: true };

// Accepts a full YouTube URL (watch, youtu.be, shorts, embed) or a raw ID.
function extractYouTubeId(input: string): string {
  const v = input.trim();
  if (!v) return "";
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/shorts\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
  ];
  for (const p of patterns) {
    const m = v.match(p);
    if (m) return m[1];
  }
  if (/^[\w-]{11}$/.test(v)) return v; // already an ID
  return "";
}

export default function VideosManager() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<(Omit<Row, "id"> & { id?: string }) | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const supabase = getSupabase();
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase
      .from("videos")
      .select("*")
      .order("created_at", { ascending: false });
    setRows((data as Row[]) || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(row?: Row) {
    if (row) {
      setEditing(row);
      setUrlInput(`https://youtu.be/${row.youtube_id}`);
    } else {
      setEditing({ ...blank });
      setUrlInput("");
    }
    setError("");
  }

  async function save() {
    if (!editing) return;
    const id = extractYouTubeId(urlInput);
    if (!editing.title.trim()) {
      setError("Give the video a title.");
      return;
    }
    if (!id) {
      setError("That does not look like a YouTube link. Paste the link from the video's address bar.");
      return;
    }
    const supabase = getSupabase();
    if (!supabase) return;
    setSaving(true);
    setError("");
    const payload = {
      title: editing.title.trim(),
      youtube_id: id,
      description: editing.description.trim(),
      published: editing.published,
    };
    const { error: e } = editing.id
      ? await supabase.from("videos").update(payload).eq("id", editing.id)
      : await supabase.from("videos").insert(payload);
    setSaving(false);
    if (e) {
      setError(e.message);
      return;
    }
    setEditing(null);
    load();
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this video? This cannot be undone.")) return;
    const supabase = getSupabase();
    if (!supabase) return;
    await supabase.from("videos").delete().eq("id", id);
    load();
  }

  async function togglePublish(row: Row) {
    const supabase = getSupabase();
    if (!supabase) return;
    await supabase.from("videos").update({ published: !row.published }).eq("id", row.id);
    load();
  }

  if (editing) {
    const previewId = extractYouTubeId(urlInput);
    return (
      <div className="max-w-xl">
        <h2 className="font-display text-2xl font-bold text-[var(--ink-strong)]">
          {editing.id ? "Edit video" : "Add video"}
        </h2>
        <div className="mt-6 space-y-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="v-url">YouTube link</label>
            <input
              id="v-url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://youtu.be/..."
            />
            <span className="text-xs text-soft">
              Paste the link from the YouTube video. I will pull out the video ID
              for you.
            </span>
          </div>
          {previewId && (
            <div className="overflow-hidden rounded-xl border border-[var(--line)]">
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${previewId}`}
                  title="Preview"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="v-title">Title</label>
            <input
              id="v-title"
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="v-desc">Short description (about two lines)</label>
            <textarea
              id="v-desc"
              rows={2}
              value={editing.description}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
            />
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={editing.published}
              onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
            />
            Show on the videos page
          </label>
          {error && <p role="alert" className="text-sm font-semibold text-red-600">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button onClick={save} className="btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Save video"}
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
        <h2 className="font-display text-2xl font-bold text-[var(--ink-strong)]">Videos</h2>
        <button onClick={() => startEdit()} className="btn-primary">
          Add video
        </button>
      </div>

      {loading ? (
        <p className="mt-6 text-soft">Loading...</p>
      ) : rows.length === 0 ? (
        <p className="mt-6 text-soft">
          No videos yet. Add your first one and it appears on the videos page.
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {rows.map((row) => (
            <div key={row.id} className="card-raised overflow-hidden">
              <div className="aspect-video bg-[var(--bg-drench)]">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${row.youtube_id}`}
                  title={row.title}
                  loading="lazy"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-display font-semibold text-[var(--ink-strong)]">{row.title}</p>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      row.published ? "bg-[#dff5ec] text-[#0c7a52]" : "bg-[var(--bg)] text-soft"
                    }`}
                  >
                    {row.published ? "Live" : "Hidden"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-soft">{row.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={() => startEdit(row)} className="btn-ghost !px-4 !py-1.5 text-sm">
                    Edit
                  </button>
                  <button onClick={() => togglePublish(row)} className="btn-ghost !px-4 !py-1.5 text-sm">
                    {row.published ? "Hide" : "Show"}
                  </button>
                  <button
                    onClick={() => remove(row.id)}
                    className="rounded-full px-4 py-1.5 text-sm font-bold text-red-600 transition-colors hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
