"use client";

import { useEffect, useRef, useState } from "react";
import Confetti from "@/components/Confetti";

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

export default function RevenueScrub() {
  const wrapRef = useRef<HTMLElement | null>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setP(1);
      return;
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
    };
  }, []);

  const amount = Math.round(12400 * p);
  const headingOpacity = 0.3 + 0.7 * clamp(p * 4, 0, 1);
  const detailsOpacity = clamp((p - 0.72) * 5, 0, 1);

  return (
    <section
      ref={wrapRef}
      aria-label="Recurring revenue, driven by scroll"
      className="relative h-[280vh] bg-[#0a0f0e]"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <Confetti />
        <h2
          className="display-xl max-w-3xl !text-[#f4fbfb]"
          style={{ opacity: headingOpacity }}
        >
          Built right, it keeps paying you.
        </h2>

        <p className="mt-10 font-display text-[clamp(3.5rem,10vw,7rem)] font-bold leading-none text-[#f4fbfb]">
          ${amount.toLocaleString("en-US")}
        </p>
        <p className="mt-4 text-sm font-bold uppercase tracking-[0.22em] text-[#7fa9a8]">
          MRR, twelve months after launch
        </p>

        <div
          className="mt-10 max-w-xl"
          style={{ opacity: detailsOpacity, transform: `translateY(${14 * (1 - detailsOpacity)}px)` }}
        >
          <p className="text-lg leading-relaxed text-[#cfe9e8]">
            A year after launch, your users are still paying you. Not because
            of clever marketing. Because you studied the problem before you
            built, and the product actually solves it.
          </p>
        </div>
      </div>
    </section>
  );
}
