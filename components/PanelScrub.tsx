"use client";

import { useEffect, useRef, useState } from "react";

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

export type Panel = {
  lead: string;
  body: string;
};

export default function PanelScrub({
  kicker,
  items,
  dark = false,
  label,
}: {
  kicker: string;
  items: Panel[];
  dark?: boolean;
  label: string;
}) {
  const wrapRef = useRef<HTMLElement | null>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setP(0.99);
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
          setP(0.99);
          return;
        }
        setP(clamp(-rect.top / total, 0, 0.999));
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

  const pos = p * items.length;
  const active = Math.min(items.length - 1, Math.floor(pos));
  const heightVh = 120 + items.length * 70;

  return (
    <section
      ref={wrapRef}
      aria-label={label}
      className="relative"
      style={{
        height: `${heightVh}vh`,
        background: dark ? "var(--bg-drench)" : "transparent",
      }}
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <p
          className="text-sm font-bold uppercase tracking-[0.22em]"
          style={{ color: dark ? "#7fa9a8" : "var(--ink-soft)" }}
        >
          {kicker}
        </p>

        <div
          className="relative mt-6 flex w-full max-w-3xl flex-1 items-center justify-center"
          style={{ maxHeight: "60vh" }}
        >
          {items.map((t, i) => {
            const d = pos - (i + 0.5);
            const beyond = Math.max(0, Math.abs(d) - 0.27);
            const opacity = clamp(1 - beyond * 3.4, 0, 1);
            const y = Math.sign(d) * beyond * -110;
            return (
              <div
                key={t.lead}
                className="absolute inset-x-0"
                style={{ opacity, transform: `translateY(${y}px)` }}
                aria-hidden={opacity < 0.5}
              >
                <h2
                  className="display-lg"
                  style={dark ? { color: "#f4fbfb" } : undefined}
                >
                  {t.lead}
                </h2>
                <p
                  className="mx-auto mt-6 max-w-xl text-lg leading-relaxed"
                  style={{ color: dark ? "#cfe9e8" : "var(--ink-soft)" }}
                >
                  {t.body}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mb-10 flex items-center gap-3" aria-hidden="true">
          {items.map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === active ? "2.25rem" : "0.75rem",
                background:
                  i === active
                    ? "var(--accent-bright)"
                    : dark
                      ? "rgba(127,169,168,0.4)"
                      : "var(--line-strong)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
