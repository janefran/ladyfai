"use client";

import { useEffect, useRef, useState } from "react";

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

function ease(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function YearOneScrub() {
  const wrapRef = useRef<HTMLElement | null>(null);
  const [p, setP] = useState(0);
  const [pinned, setPinned] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const applyMode = () => setPinned(mq.matches);
    applyMode();
    mq.addEventListener("change", applyMode);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setP(1);
      return () => mq.removeEventListener("change", applyMode);
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        if (total <= 0) {
          setP(1);
          return;
        }
        setP(clamp(-rect.top / total, 0, 1));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", applyMode);
    };
  }, []);

  // On mobile we are not pinned, so every card is simply fully present.
  const eff = pinned ? p : 1;

  // Each card pops at its own point in the scroll, then its number counts up.
  const card = (appearAt: number) => {
    const local = clamp((eff - appearAt) / 0.16, 0, 1);
    return {
      local,
      style: pinned
        ? ({
            opacity: local,
            transform: `translateY(${28 * (1 - ease(local))}px) scale(${0.92 + 0.08 * ease(local)})`,
          } as React.CSSProperties)
        : ({} as React.CSSProperties),
    };
  };

  const a = card(0.06); // signups
  const b = card(0.26); // payout toast
  const c = card(0.46); // retention
  const d = card(0.64); // referrals (small)
  const e = card(0.8); // review

  const signups = Math.round(562 * ease(a.local));
  const paid = Math.round(2400 * ease(b.local));
  const retention = Math.round(71 * ease(c.local));
  const referrals = Math.round(38 * ease(d.local));

  return (
    <section
      ref={wrapRef}
      aria-label="What a year-one product looks like, revealed on scroll"
      className="relative bg-[var(--mint)] lg:h-[320vh]"
    >
      <div className="relative flex flex-col items-center px-6 pb-20 pt-28 lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden lg:pb-0 lg:pt-32">
        {/* Depth */}
        <div className="dot-grid" />
        <div
          className="glow-blob"
          style={{ top: "-6%", left: "-4%", width: "32rem", height: "32rem", background: "rgba(20,188,186,0.18)" }}
        />
        <div
          className="glow-blob"
          style={{ bottom: "-10%", right: "-6%", width: "30rem", height: "30rem", background: "rgba(244,213,141,0.22)" }}
        />
        <h2 className="display-lg relative z-10 max-w-2xl text-center">
          What year one looks like when you build right.
        </h2>

        <div className="relative z-10 mt-10 w-full max-w-5xl flex-1">
          {/* Signups: medium */}
          <div
            className="card-raised mx-auto mb-4 w-full max-w-xs p-6 text-left lg:absolute lg:left-[4%] lg:top-[6%] lg:mb-0 lg:w-60 lg:-rotate-3"
            style={a.style}
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-soft">
              New signups
            </p>
            <p className="mt-1 font-display text-4xl font-bold text-[var(--ink-strong)]">
              {signups.toLocaleString("en-US")}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="rounded-full bg-[#dff5ec] px-2.5 py-0.5 text-xs font-bold text-[#0c7a52]">
                +18%
              </span>
              <span className="text-xs text-soft">this week</span>
            </div>
          </div>

          {/* Payout toast: wide, dark */}
          <div
            className="mx-auto mb-4 w-full max-w-sm rounded-2xl bg-[#101a19] p-5 text-left shadow-[0_18px_44px_-18px_rgba(8,28,27,0.5)] lg:absolute lg:right-[2%] lg:top-[2%] lg:mb-0 lg:w-80 lg:rotate-2"
            style={b.style}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#22c55e]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0b2615" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4.5 12.5l5 5L19.5 7" />
                </svg>
              </span>
              <div>
                <p className="font-display text-2xl font-bold text-[#f4fbfb]">
                  ${paid.toLocaleString("en-US")}
                  <span className="font-body text-sm font-semibold text-[#9fd9d8]"> received</span>
                </p>
                <p className="text-xs text-[#7fa9a8]">Stripe · just now</p>
              </div>
            </div>
          </div>

          {/* Retention: the big one */}
          <div
            className="card-raised mx-auto mb-4 w-full max-w-sm p-8 text-left lg:absolute lg:bottom-[14%] lg:left-[18%] lg:mb-0 lg:w-72 lg:-rotate-1"
            style={c.style}
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-soft">
              Still active
            </p>
            <p className="mt-1 font-display text-6xl font-bold text-[var(--accent)]">
              {retention}%
            </p>
            <p className="mt-3 text-sm text-soft">
              of your users, 12 months after launch. The industry average is
              under 30%.
            </p>
          </div>

          {/* Referrals: small chip card */}
          <div
            className="card-raised mx-auto mb-4 w-full max-w-[15rem] p-5 text-left lg:absolute lg:right-[16%] lg:top-[44%] lg:mb-0 lg:w-52 lg:rotate-3"
            style={d.style}
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-soft">
              Referrals
            </p>
            <p className="mt-1 font-display text-3xl font-bold text-[var(--ink-strong)]">
              {referrals}
            </p>
            <p className="text-xs text-soft">this week, unprompted</p>
          </div>

          {/* Review: medium */}
          <div
            className="card-raised mx-auto w-full max-w-xs p-6 text-left lg:absolute lg:bottom-[4%] lg:right-[4%] lg:w-64 lg:rotate-1"
            style={e.style}
          >
            <div className="flex gap-1" aria-label="Five star review">
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="var(--accent-bright)" aria-hidden="true">
                  <path d="M12 2.5l2.95 6.27 6.55.84-4.82 4.52 1.25 6.37L12 17.4l-5.93 3.1 1.25-6.37L2.5 9.61l6.55-.84L12 2.5Z" />
                </svg>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]">
              &ldquo;Finally an app that solves the actual problem. Worth every
              dollar.&rdquo;
            </p>
            <p className="mt-3 text-xs font-semibold text-soft">
              A paying user, month 9
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
