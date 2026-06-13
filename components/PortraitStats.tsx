"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Stat = {
  big: string;
  label: string;
  pos: string;
  accent?: boolean;
  delay: number;
};

const stats: Stat[] = [
  { big: "13Y+", label: "Research methodology", pos: "left-[-16%] top-[6%]", accent: true, delay: 120 },
  { big: "Idea → Yr 1", label: "Guided end to end", pos: "right-[-16%] top-[34%]", delay: 280 },
  { big: "5Y", label: "Product design", pos: "bottom-[8%] left-[-12%]", delay: 440 },
];

export default function PortraitStats({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[20rem] px-6 sm:px-10 lg:px-6">
      {/* glow behind */}
      <div
        aria-hidden="true"
        className="glow-blob"
        style={{ inset: "12% -8%", background: "rgba(20,188,186,0.18)" }}
      />
      <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-[var(--bg-drench)] shadow-[0_30px_70px_-30px_var(--glow)]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-all duration-700 ease-out [filter:saturate(0.92)] group-hover:scale-105 group-hover:[filter:saturate(1.1)]"
          sizes="20rem"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 translate-y-full bg-gradient-to-t from-[#081c1b]/70 to-transparent transition-transform duration-500 ease-out group-hover:translate-y-0"
        />
      </div>

      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`absolute ${s.pos} ${s.accent ? "bg-[#0d7377] text-white" : "bg-[var(--bg-raised)] text-[var(--ink-strong)]"} rounded-2xl border border-[var(--line)] p-4 shadow-[0_18px_40px_-18px_rgba(8,28,27,0.4)]`}
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0) scale(1)" : "translateY(20px) scale(0.92)",
            transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${s.delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${s.delay}ms`,
            animation: shown ? `bob 6s ease-in-out ${i * 0.8}s infinite` : undefined,
          }}
        >
          <p className="font-display text-2xl font-bold leading-none">{s.big}</p>
          <p
            className={`mt-1 text-xs font-semibold ${s.accent ? "text-white/85" : "text-soft"}`}
          >
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
