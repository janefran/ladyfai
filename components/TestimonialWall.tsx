"use client";

import { useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/lib/testimonials";

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

const AVATAR_BG = ["#0d7377", "#14bcba", "#3dcfcc", "#0a3f3e", "#1d9e75", "#0f6e56"];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Card({ t, idx }: { t: Testimonial; idx: number }) {
  const parts = t.highlight && t.quote.includes(t.highlight)
    ? t.quote.split(t.highlight)
    : [t.quote];
  return (
    <figure className="card-raised flex w-[20rem] shrink-0 flex-col justify-between gap-6 p-7 sm:w-[24rem]">
      <blockquote className="text-lg leading-relaxed text-[var(--ink)]">
        {parts.length === 2 ? (
          <>
            {parts[0]}
            <span className="text-accent">{t.highlight}</span>
            {parts[1]}
          </>
        ) : (
          t.quote
        )}
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-bold text-[#f4fbfb]"
          style={{ background: AVATAR_BG[idx % AVATAR_BG.length] }}
          aria-hidden="true"
        >
          {initials(t.name)}
        </span>
        <span>
          <span className="block font-bold text-[var(--ink-strong)]">{t.name}</span>
          <span className="block text-sm text-soft">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function TestimonialWall({ items }: { items: Testimonial[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [prog, setProg] = useState(0.5);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // progress 0 (section entering from below) -> 1 (leaving past top)
        const span = window.innerHeight + rect.height;
        setProg(clamp((window.innerHeight - rect.top) / span, 0, 1));
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

  // Scroll down (prog up): top row drifts left, bottom row drifts right.
  const range = 260;
  const topX = (0.5 - prog) * range;
  const bottomX = (prog - 0.5) * range;

  const mid = Math.ceil(items.length / 2);
  const setTop = items.slice(0, mid);
  const setBottom = items.slice(mid);
  // Three copies so the row overflows the viewport on BOTH sides; -33.33%
  // centres the middle copy, then scroll drift slides it left/right.
  const rowTop = [...setTop, ...setTop, ...setTop];
  const rowBottom = [...setBottom, ...setBottom, ...setBottom];

  return (
    <section
      ref={sectionRef}
      aria-label="What founders say"
      className="overflow-hidden py-24 lg:py-28"
    >
      <h2 className="container-site display-lg mb-12 text-center">
        Founders who stopped guessing.
      </h2>

      <div className="flex flex-col gap-6">
        <div
          className="flex w-max gap-6 will-change-transform"
          style={{ transform: `translateX(calc(-33.333% + ${topX}px))` }}
        >
          {rowTop.map((t, i) => (
            <Card key={`top-${i}`} t={t} idx={i} />
          ))}
        </div>
        <div
          className="flex w-max gap-6 will-change-transform"
          style={{ transform: `translateX(calc(-33.333% + ${bottomX}px))` }}
        >
          {rowBottom.map((t, i) => (
            <Card key={`bot-${i}`} t={t} idx={i + mid} />
          ))}
        </div>
      </div>
    </section>
  );
}
