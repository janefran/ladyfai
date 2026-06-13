"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

export default function Dashboard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      router.replace("/lf-studio");
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/lf-studio");
        return;
      }
      setUserEmail(data.session.user.email || "");
      setReady(true);
      supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20)
        .then(({ data: rows }) => {
          if (rows) setEnquiries(rows as Enquiry[]);
        });
    });
  }, [router]);

  async function signOut() {
    const supabase = getSupabase();
    if (supabase) await supabase.auth.signOut();
    router.replace("/lf-studio");
  }

  async function markHandled(id: string) {
    const supabase = getSupabase();
    if (!supabase) return;
    await supabase.from("enquiries").update({ handled: true }).eq("id", id);
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, handled: true } : e))
    );
  }

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-soft">Opening the studio...</p>
      </main>
    );
  }

  return (
    <main className="container-site max-w-5xl py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-[var(--ink-strong)]">
            LF<span className="text-accent"> Studio</span>
          </h1>
          <p className="mt-1 text-sm text-soft">{userEmail}</p>
        </div>
        <button onClick={signOut} className="btn-ghost">
          Sign out
        </button>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Blog posts",
            body: "Write, edit, and publish. Posts appear on /blog the moment you publish them.",
            note: "Manage in Supabase Table Editor for now. A full editor lands in the next phase.",
          },
          {
            title: "Videos",
            body: "Paste a YouTube link and description. It appears on /videos instantly.",
            note: "Manage in Supabase Table Editor for now.",
          },
          {
            title: "Testimonials",
            body: "Add a quote, the phrase to highlight, a name and role. It joins the homepage wall.",
            note: "Manage in Supabase Table Editor for now.",
          },
          {
            title: "Subscribers",
            body: "Your email list lives in Kit, with every subscriber tagged by where they came from.",
            note: "Open Kit to see and email your list.",
          },
        ].map((card) => (
          <div key={card.title} className="card-raised p-6">
            <h2 className="font-display text-lg font-semibold text-[var(--ink-strong)]">
              {card.title}
            </h2>
            <p className="mt-2 text-sm text-soft">{card.body}</p>
            <p className="mt-3 text-xs font-semibold text-accent">{card.note}</p>
          </div>
        ))}
      </div>

      <section className="mt-14" aria-labelledby="enquiries-heading">
        <h2
          id="enquiries-heading"
          className="font-display text-2xl font-bold text-[var(--ink-strong)]"
        >
          Brand enquiries
        </h2>
        {enquiries.length === 0 ? (
          <p className="mt-4 text-soft">
            Nothing yet. When a brand fills the form on /brands, it lands here.
          </p>
        ) : (
          <div className="mt-6 space-y-4">
            {enquiries.map((e) => (
              <div key={e.id} className="card-raised p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-bold text-[var(--ink-strong)]">
                    {e.company}
                    <span className="ml-2 font-normal text-soft">
                      {e.name} · {e.email}
                    </span>
                  </p>
                  {e.handled ? (
                    <span className="text-sm font-semibold text-accent">
                      Handled
                    </span>
                  ) : (
                    <button
                      onClick={() => markHandled(e.id)}
                      className="btn-ghost !px-4 !py-1.5 text-sm"
                    >
                      Mark handled
                    </button>
                  )}
                </div>
                <p className="mt-1 text-sm font-semibold text-accent">
                  {e.product}
                </p>
                <p className="mt-2 text-sm text-soft">{e.message}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
