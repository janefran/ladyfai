"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

type Row = {
  id: string;
  quote: string;
  highlight: string;
  name: string;
  role: string;
  published: boolean;
};

const blank: Omit<Row, "id"> = {
  quote: "",
  highlight: "",
  name: "",
  role: "",
  published: true,
};

export default function TestimonialsManager() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Row | (Omit<Row, "id"> & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const supabase = getSupabase();
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    setRows((data as Row[]) || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function save() {
    if (!editing) return;
    const supabase = getSupabase();
    if (!supabase) return;
    if (!editing.quote.trim() || !editing.name.trim()) {
      setError("A quote and a name are required.");
      return;
    }
    setSaving(true);
    setError("");
    const payload = {
      quote: editing.quote.trim(),
      highlight: editing.highlight.trim(),
      name: editing.name.trim(),
      role: editing.role.trim(),
      published: editing.published,
    };
    const { error: e } = editing.id
      ? await supabase.from("testimonials").update(payload).eq("id", editing.id)
      : await supabase.from("testimonials").insert(payload);
    setSaving(false);
    if (e) {
      setError(e.message);
      return;
    }
    setEditing(null);
    load();
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this testimonial? This cannot be undone.")) return;
    const supabase = getSupabase();
    if (!supabase) return;
    await supabase.from("testimonials").delete().eq("id", id);
    load();
  }

  async function togglePublish(row: Row) {
    const supabase = getSupabase();
    if (!supabase) return;
    await supabase
      .from("testimonials")
      .update({ published: !row.published })
      .eq("id", row.id);
    load();
  }

  if (editing) {
    return (
      <div className="max-w-xl">
        <h2 className="font-display text-2xl font-bold text-[var(--ink-strong)]">
          {editing.id ? "Edit testimonial" : "New testimonial"}
        </h2>
        <div className="mt-6 space-y-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="t-quote">The quote</label>
            <textarea
              id="t-quote"
              rows={4}
              value={editing.quote}
              onChange={(e) => setEditing({ ...editing, quote: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="t-highlight">Phrase to highlight in teal</label>
            <input
              id="t-highlight"
              value={editing.highlight}
              onChange={(e) => setEditing({ ...editing, highlight: e.target.value })}
            />
            <span className="text-xs text-soft">
              Copy a few words from the quote above. They appear in teal on the
              homepage. Leave empty for no highlight.
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="t-name">Name</label>
              <input
                id="t-name"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="t-role">Role</label>
              <input
                id="t-role"
                value={editing.role}
                onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                placeholder="Founder, wellness app"
              />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={editing.published}
              onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
            />
            Show on the homepage
          </label>
          {error && <p role="alert" className="text-sm font-semibold text-red-600">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button onClick={save} className="btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Save testimonial"}
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
        <h2 className="font-display text-2xl font-bold text-[var(--ink-strong)]">
          Testimonials
        </h2>
        <button onClick={() => setEditing({ ...blank })} className="btn-primary">
          Add testimonial
        </button>
      </div>

      {loading ? (
        <p className="mt-6 text-soft">Loading...</p>
      ) : rows.length === 0 ? (
        <p className="mt-6 text-soft">
          No testimonials yet. Add your first one and it joins the homepage wall.
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {rows.map((row) => (
            <div key={row.id} className="card-raised p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="max-w-xl">
                  <p className="text-[var(--ink)]">&ldquo;{row.quote}&rdquo;</p>
                  <p className="mt-2 text-sm font-bold text-[var(--ink-strong)]">
                    {row.name}
                    {row.role ? <span className="font-normal text-soft"> · {row.role}</span> : null}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      row.published ? "bg-[#dff5ec] text-[#0c7a52]" : "bg-[var(--bg)] text-soft"
                    }`}
                  >
                    {row.published ? "Live" : "Hidden"}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button onClick={() => setEditing(row)} className="btn-ghost !px-4 !py-1.5 text-sm">
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
          ))}
        </div>
      )}
    </div>
  );
}
