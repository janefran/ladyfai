"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import KitForm from "@/components/KitForm";

const socials = [
  {
    label: "YouTube",
    href: site.social.youtube,
    icon: (
      <path d="M23 7.5a4 4 0 0 0-2.8-2.9C18.2 4 12 4 12 4s-6.2 0-8.2.6A4 4 0 0 0 1 7.5 42 42 0 0 0 .5 12 42 42 0 0 0 1 16.5a4 4 0 0 0 2.8 2.9c2 .6 8.2.6 8.2.6s6.2 0 8.2-.6a4 4 0 0 0 2.8-2.9A42 42 0 0 0 23.5 12 42 42 0 0 0 23 7.5ZM9.8 15.3V8.7L15.7 12l-5.9 3.3Z" />
    ),
  },
  {
    label: "LinkedIn",
    href: site.social.linkedin,
    icon: (
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.5c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21h-4V9Z" />
    ),
  },
  {
    label: "X",
    href: site.social.twitter,
    icon: (
      <path d="M18.9 2H22l-6.8 7.8L23.3 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1 2h6.4l4.4 5.9L18.9 2Zm-1.1 18h1.7L7.3 3.8H5.5L17.8 20Z" />
    ),
  },
  {
    label: "Medium",
    href: site.social.medium,
    icon: (
      <path d="M2.8 7.4a.8.8 0 0 0-.3-.7L.9 4.8v-.3h5l3.9 8.5 3.4-8.5H19v.3l-1.4 1.3a.4.4 0 0 0-.2.4v9.6a.4.4 0 0 0 .2.4l1.3 1.3v.3h-6.7v-.3l1.4-1.3c.1-.2.1-.2.1-.4V7.6l-3.8 9.6h-.5L5.1 7.6v6.4c0 .3.1.6.3.8l1.8 2.2v.3H2v-.3l1.8-2.2c.2-.2.3-.5.2-.8V7.4Z" />
    ),
  },
];

const Footer = forwardRef<HTMLElement, { curtain?: boolean }>(function Footer(
  { curtain = false },
  ref
) {
  return (
    <footer
      ref={ref}
      className={`${
        curtain ? "fixed bottom-0 left-0 right-0 z-0" : "relative z-0"
      } overflow-hidden bg-[var(--sand)] text-[var(--ink)]`}
    >
      <div
        aria-hidden="true"
        className="glow-blob"
        style={{ bottom: "-30%", left: "50%", width: "44rem", height: "30rem", marginLeft: "-22rem", background: "rgba(20,188,186,0.14)" }}
      />

      {/* Closing CTA: one action, calm hierarchy */}
      <div className="container-site relative z-10 flex flex-col items-center border-b border-[var(--line)] py-12 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-accent">
          Your first step is free
        </p>
        <h2 className="display-lg mt-4 max-w-2xl">
          Build something still winning a year from now.
        </h2>
        <p className="mt-3 max-w-2xl text-soft">
          No spam, and I am not selling you anything. I am just here to help you
          succeed, and you can unsubscribe the moment I stop being useful.
        </p>
        <div className="mt-6 flex w-full max-w-md justify-center">
          <KitForm compact />
        </div>
      </div>

      {/* Identity + links: logo left, link groups run horizontally */}
      <div className="container-site relative z-10 flex flex-col gap-8 py-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xs">
          <p className="font-display text-lg font-bold text-[var(--ink-strong)]">
            LadyF<span className="text-accent"> AI</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-soft">
            From your first idea to a product still winning a year after
            launch. Without a team or an engineer.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <nav aria-label="Pages" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <span className="w-20 text-xs font-bold uppercase tracking-[0.18em] text-accent">
              Explore
            </span>
            <Link className="text-soft hover:text-[var(--accent)]" href="/about">About</Link>
            <Link className="text-soft hover:text-[var(--accent)]" href="/blog">Blog</Link>
            <Link className="text-soft hover:text-[var(--accent)]" href="/videos">Videos</Link>
            <Link className="text-soft hover:text-[var(--accent)]" href="/brands">For brands</Link>
          </nav>

          <nav aria-label="Find me elsewhere" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <span className="w-20 text-xs font-bold uppercase tracking-[0.18em] text-accent">
              Find me
            </span>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="group flex items-center gap-2 text-soft hover:text-[var(--accent)]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] text-[var(--accent)] transition-colors group-hover:border-[var(--accent)]">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    {s.icon}
                  </svg>
                </span>
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="container-site relative z-10 flex flex-col gap-2 border-t border-[var(--line)] py-6 text-xs text-soft sm:flex-row sm:items-center sm:justify-between">
        <span>Built with research, not guesses. By LadyF.</span>
        <span>&copy; {new Date().getFullYear()} LadyF AI</span>
      </div>
    </footer>
  );
});

export default Footer;
