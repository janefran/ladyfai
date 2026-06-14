"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import TestimonialsManager from "@/components/admin/TestimonialsManager";
import VideosManager from "@/components/admin/VideosManager";
import PostsManager from "@/components/admin/PostsManager";
import EnquiriesManager from "@/components/admin/EnquiriesManager";

type Section = "blog" | "videos" | "testimonials" | "enquiries";

const sections: { id: Section; label: string }[] = [
  { id: "blog", label: "Blog posts" },
  { id: "videos", label: "Videos" },
  { id: "testimonials", label: "Testimonials" },
  { id: "enquiries", label: "Brand enquiries" },
];

export default function Dashboard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [active, setActive] = useState<Section>("blog");
  const [menuOpen, setMenuOpen] = useState(false);

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
    });
  }, [router]);

  async function signOut() {
    const supabase = getSupabase();
    if (supabase) await supabase.auth.signOut();
    router.replace("/lf-studio");
  }

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-soft">Opening the studio...</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[var(--bg)]/95 backdrop-blur">
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
            <p className="font-display text-xl font-bold text-[var(--ink-strong)]">
              LF<span className="text-accent"> Studio</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-soft sm:inline">{userEmail}</span>
            <button onClick={signOut} className="btn-ghost !px-4 !py-1.5 text-sm">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-8 px-5 py-8">
        {/* Sidebar */}
        <aside
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full shrink-0 lg:block lg:w-52`}
        >
          <nav className="flex flex-col gap-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActive(s.id);
                  setMenuOpen(false);
                }}
                className={`rounded-lg px-4 py-2.5 text-left text-sm font-semibold transition-colors ${
                  active === s.id
                    ? "bg-[var(--accent)] text-[#f4fbfb]"
                    : "text-soft hover:bg-[var(--bg-raised)] hover:text-[var(--accent)]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Active section */}
        <main className="min-w-0 flex-1">
          {active === "blog" && <PostsManager />}
          {active === "videos" && <VideosManager />}
          {active === "testimonials" && <TestimonialsManager />}
          {active === "enquiries" && <EnquiriesManager />}
        </main>
      </div>
    </div>
  );
}
