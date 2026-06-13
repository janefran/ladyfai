"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase, supabaseConfigured } from "@/lib/supabase";

export default function StudioLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const supabase = getSupabase();
    if (!supabase) {
      setError("The studio is not connected yet. Supabase setup is pending.");
      return;
    }

    setBusy(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setBusy(false);

    if (signInError) {
      setError("Wrong email or password.");
      return;
    }
    router.push("/lf-studio/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="card-raised w-full max-w-sm p-8">
        <p className="font-display text-2xl font-bold text-[var(--ink-strong)]">
          LF<span className="text-accent"> Studio</span>
        </p>
        <p className="mt-1 text-sm text-soft">The quiet door.</p>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          {error && (
            <p className="text-sm font-semibold text-red-600">{error}</p>
          )}
          {!supabaseConfigured && (
            <p className="text-sm text-soft">
              Note: the studio activates once Supabase is connected.
            </p>
          )}
          <button type="submit" className="btn-primary mt-2 justify-center" disabled={busy}>
            {busy ? "Checking..." : "Enter"}
          </button>
        </form>
      </div>
    </main>
  );
}
