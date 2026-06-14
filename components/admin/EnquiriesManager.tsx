"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

type Enquiry = {
  id: string;
  company: string;
  name: string;
  email: string;
  product: string;
  message: string;
  handled: boolean;
  created_at: string;
};

export default function EnquiriesManager() {
  const [rows, setRows] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"open" | "all">("open");

  async function load() {
    const supabase = getSupabase();
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    setRows((data as Enquiry[]) || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function setHandled(id: string, handled: boolean) {
    const supabase = getSupabase();
    if (!supabase) return;
    await supabase.from("enquiries").update({ handled }).eq("id", id);
    setRows((prev) => prev.map((e) => (e.id === id ? { ...e, handled } : e)));
  }

  const shown = filter === "open" ? rows.filter((r) => !r.handled) : rows;
  const openCount = rows.filter((r) => !r.handled).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-bold text-[var(--ink-strong)]">
          Brand enquiries
        </h2>
        <div className="flex gap-1 rounded-full border border-[var(--line)] p-1 text-sm">
          {(["open", "all"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 font-semibold capitalize transition-colors ${
                filter === f ? "bg-[var(--accent)] text-[#f4fbfb]" : "text-soft hover:text-[var(--accent)]"
              }`}
            >
              {f === "open" ? `Open (${openCount})` : "All"}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="mt-6 text-soft">Loading...</p>
      ) : shown.length === 0 ? (
        <p className="mt-6 text-soft">
          {filter === "open"
            ? "No open enquiries. When a brand fills the form on the For brands page, it lands here."
            : "No enquiries yet."}
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {shown.map((e) => (
            <div key={e.id} className="card-raised p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-[var(--ink-strong)]">{e.company}</p>
                  <p className="text-sm text-soft">
                    {e.name} ·{" "}
                    <a className="text-accent hover:underline" href={`mailto:${e.email}`}>
                      {e.email}
                    </a>
                  </p>
                </div>
                <span className="text-xs text-soft">
                  {new Date(e.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              {e.product && (
                <p className="mt-2 text-sm font-semibold text-accent">{e.product}</p>
              )}
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]">{e.message}</p>
              <div className="mt-4 flex gap-2">
                <a href={`mailto:${e.email}`} className="btn-ghost !px-4 !py-1.5 text-sm">
                  Reply by email
                </a>
                <button
                  onClick={() => setHandled(e.id, !e.handled)}
                  className="btn-ghost !px-4 !py-1.5 text-sm"
                >
                  {e.handled ? "Mark as open" : "Mark handled"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
