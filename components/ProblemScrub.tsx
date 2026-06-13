"use client";

import { useEffect, useRef, useState } from "react";

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

const truths = [
  {
    lead: "The back and forth is not a skills problem.",
    body: "You are not missing anything technical. You are missing clarity on what you are building. With clarity, the build becomes as easy as ABC.",
  },
  {
    lead: "“Would you use this?” is the <i>wrongest</i> question.",
    body: "What people say and what people do are different things. Validation without research is just collecting noise.",
  },
  {
    lead: "After launch, everyone leaves you.",
    body: "Success is decided before the build and after the launch. The parts everyone skips. I stay for both.",
  },
];

export default function ProblemScrub() {
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

  const pos = p * truths.length;
  const active = Math.min(truths.length - 1, Math.floor(pos));

  return (
    <section
      ref={wrapRef}
      aria-label="Why building feels hard, one truth at a time"
      className="relative h-[300vh] bg-[var(--bg-drench)]"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#7fa9a8]">
          Building the app is the easy part
        </p>

        <div className="relative mt-6 flex w-full max-w-3xl flex-1 items-center justify-center" style={{ maxHeight: "60vh" }}>
          {truths.map((t, i) => {
            // Plateau: text stays fully readable through the middle of its
            // segment, then fades only at the handoff.
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
                  className="display-xl !text-[#f4fbfb]"
                  dangerouslySetInnerHTML={{ __html: t.lead }}
                />
                <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#cfe9e8]">
                  {t.body}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mb-10 flex items-center gap-3" aria-hidden="true">
          {truths.map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === active ? "2.25rem" : "0.75rem",
                background: i === active ? "#14bcba" : "rgba(127,169,168,0.4)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
