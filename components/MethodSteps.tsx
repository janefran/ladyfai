"use client";

import { useEffect, useRef, useState } from "react";
import PhoneMockup from "@/components/PhoneMockup";
import { site } from "@/lib/site";

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

type Screen = "validate" | "gate" | "prompt" | "metrics";

const steps: {
  n: string;
  rail: string;
  title: string;
  body: string;
  screen: Screen;
  cta?: { label: string; href: string };
}[] = [
  {
    n: "01",
    rail: "Validate",
    title: "Validate the real problem",
    body: "Before anything else, get evidence that people will pay to solve that problem. Verd AI shows you what people actually struggle with and pay for.",
    screen: "validate",
    cta: { label: "Try Verd AI", href: site.verdAiUrl },
  },
  {
    n: "02",
    rail: "Build Gate",
    title: "Pass the Build Gate",
    body: "After problem discovery, the Build Gate finds your moat. It asks two questions: what makes this user keep coming back, and what makes them keep paying six months from now? Answer those, and the gate opens.",
    screen: "gate",
  },
  {
    n: "03",
    rail: "Build Stack",
    title: "Design the brain, then build",
    body: "The Build Stack turns your validated problem into a build plan and a system prompt. You walk into Lovable or Claude Code with clarity, not vibes.",
    screen: "prompt",
  },
  {
    n: "04",
    rail: "After launch",
    title: "Survive and grow after launch",
    body: "The part nobody else stays for. Retention, behaviour, revenue, guided week by week. Launch day is the start line, and your numbers keep climbing.",
    screen: "metrics",
  },
];

export default function MethodSteps() {
  const wrapRef = useRef<HTMLElement | null>(null);
  const [p, setP] = useState(0);
  const [pinned, setPinned] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMode = () => setPinned(mq.matches && !reduced.matches);
    applyMode();
    mq.addEventListener("change", applyMode);
    reduced.addEventListener("change", applyMode);

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        if (total <= 0) {
          setP(0.5);
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
      mq.removeEventListener("change", applyMode);
      reduced.removeEventListener("change", applyMode);
    };
  }, []);

  const pos = p * steps.length;
  const active = Math.min(steps.length - 1, Math.floor(pos));

  // Mobile: simple stacked alternating rows, all visible.
  if (!pinned) {
    return (
      <section id="method" aria-labelledby="method-heading" className="container-site py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="method-heading" className="display-lg">The path. In order. No steps skipped.</h2>
          <p className="mt-4 text-soft">A sequence you follow, with a tool or a framework at every step.</p>
        </div>
        <div className="mt-16 space-y-20">
          {steps.map((s) => (
            <div key={s.n}>
              <PhoneMockup screen={s.screen} />
              <div className="mt-8 text-center">
                <span className="font-display text-4xl font-bold text-[var(--accent)] opacity-25">{s.n}</span>
                <h3 className="display-md mt-2">{s.title}</h3>
                <p className="mx-auto mt-3 max-w-md text-soft">{s.body}</p>
                {s.cta && <a href={s.cta.href} className="btn-ghost mt-5">{s.cta.label}</a>}
              </div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-16 max-w-2xl text-center text-soft">
          Somewhere along this path comes the moment LadyF calls the
          <strong className="text-accent"> Aha Walk</strong>: when confusion lifts and you finally see what you are building.
        </p>
      </section>
    );
  }

  return (
    <section
      id="method"
      ref={wrapRef}
      aria-label="The path, step by step on scroll"
      className="relative h-[440vh]"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-soft">
          The path. In order. No steps skipped.
        </p>

        <div className="relative mt-6 flex w-full max-w-5xl flex-1 items-center" style={{ maxHeight: "66vh" }}>
          {/* Ghost number */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center font-display font-bold"
            style={{ fontSize: "clamp(12rem, 30vw, 22rem)", color: "var(--accent)", opacity: 0.04, lineHeight: 1 }}
          >
            {steps[active].n}
          </div>

          {steps.map((s, i) => {
            const d = pos - (i + 0.5);
            const beyond = Math.max(0, Math.abs(d) - 0.27);
            const opacity = clamp(1 - beyond * 3.4, 0, 1);
            const y = Math.sign(d) * beyond * -90;
            const imageRight = i % 2 === 0;
            return (
              <div
                key={s.n}
                className="absolute inset-x-0 grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                style={{ opacity, transform: `translateY(${y}px)`, pointerEvents: opacity > 0.5 ? "auto" : "none" }}
                aria-hidden={opacity < 0.5}
              >
                <div className={imageRight ? "lg:order-1 lg:pr-6" : "lg:order-2 lg:pl-6"}>
                  <span className="font-display text-2xl font-bold text-accent">{s.n}</span>
                  <h3 className="display-md mt-2">{s.title}</h3>
                  <p className="mt-4 max-w-md text-soft">{s.body}</p>
                  {s.cta && <a href={s.cta.href} className="btn-ghost mt-6">{s.cta.label}</a>}
                </div>
                <div className={imageRight ? "lg:order-2" : "lg:order-1"}>
                  <PhoneMockup screen={s.screen} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Step rail */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {steps.map((s, i) => (
            <span
              key={s.n}
              className="flex items-center gap-2 text-sm font-bold transition-colors duration-300"
              style={{ color: i <= active ? "var(--accent)" : "var(--ink-soft)" }}
            >
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full border text-[0.7rem] transition-colors duration-300"
                style={{
                  background: i <= active ? "var(--accent)" : "transparent",
                  borderColor: i <= active ? "var(--accent)" : "var(--line-strong)",
                  color: i <= active ? "#f4fbfb" : "var(--ink-soft)",
                }}
              >
                {i + 1}
              </span>
              {s.rail}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
