"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase, supabaseConfigured } from "@/lib/supabase";

export default function StudioLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const supabase = getSupabase();
    if (!supabase) {
      setError("The studio is not connected to its database yet.");
      return;
    }

    setBusy(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setBusy(false);

    if (signInError) {
      setError("That email and password do not match. Please try again.");
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
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="!pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-soft transition-colors hover:text-[var(--accent)]"
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9.9 4.2A9.1 9.1 0 0 1 12 4c5 0 9 4.5 10 8a13 13 0 0 1-2.3 3.4M6.1 6.1C3.8 7.6 2.2 9.9 2 12c1 3.5 5 8 10 8a9 9 0 0 0 4-1M1 1l22 22M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <p role="alert" className="text-sm font-semibold text-red-600">
              {error}
            </p>
          )}
          {!supabaseConfigured && (
            <p className="text-sm text-soft">
              Note: the studio activates once Supabase is connected.
            </p>
          )}

          <button
            type="submit"
            className="btn-primary mt-2 justify-center"
            disabled={busy}
          >
            {busy ? "Checking..." : "Enter"}
          </button>
        </form>
      </div>
    </main>
  );
}
