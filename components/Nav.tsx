"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "/about", label: "About" },
  { href: "/#method", label: "How it works" },
  { href: "/blog", label: "Blog" },
  { href: "/videos", label: "Videos" },
  { href: "/#faq", label: "FAQ" },
  { href: "/brands", label: "For brands" },
];

export default function Nav() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("ladyfai-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("ladyfai-theme", "light");
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-[76rem] items-center justify-between gap-3">
        {/* Logo pill */}
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-[var(--bg-raised)] py-2 pl-3 pr-5 shadow-[0_8px_30px_-12px_rgba(8,28,27,0.25)]"
        >
          <Image
            src="/logo-black.png"
            alt=""
            width={22}
            height={41}
            className="h-7 w-auto dark:hidden"
            priority
          />
          <Image
            src="/logo-white.png"
            alt=""
            width={22}
            height={41}
            className="hidden h-7 w-auto dark:block"
            priority
          />
          <span className="font-display text-lg font-bold tracking-tight text-[var(--ink-strong)]">
            LadyF<span className="text-accent"> AI</span>
          </span>
        </Link>

        {/* Links pill */}
        <nav
          aria-label="Main"
          className="hidden items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--bg-raised)] p-1.5 shadow-[0_8px_30px_-12px_rgba(8,28,27,0.25)] lg:flex"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-[0.92rem] font-semibold text-soft transition-colors hover:bg-[var(--bg)] hover:text-[var(--accent)]"
            >
              {l.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="mx-1 flex h-9 w-9 items-center justify-center rounded-full text-[var(--accent)] transition-colors hover:bg-[var(--bg)]"
          >
            {dark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
              </svg>
            )}
          </button>
          <a
            href={site.verdAiUrl}
            className="rounded-full bg-[var(--accent)] px-5 py-2 text-[0.92rem] font-bold text-[#f4fbfb] transition-transform hover:-translate-y-0.5 dark:bg-[var(--accent-bright)] dark:text-[#081c1b]"
          >
            Try Verd AI
          </a>
        </nav>

        {/* Mobile buttons */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg-raised)] text-[var(--accent)] shadow-[0_8px_30px_-12px_rgba(8,28,27,0.25)]"
          >
            {dark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg-raised)] text-[var(--accent)] shadow-[0_8px_30px_-12px_rgba(8,28,27,0.25)]"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="mx-auto mt-3 max-w-[76rem] rounded-2xl border border-[var(--line)] bg-[var(--bg-raised)] p-5 shadow-[0_18px_50px_-18px_rgba(8,28,27,0.35)] lg:hidden"
        >
          <ul className="flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-1 font-semibold text-[var(--ink)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <a href={site.verdAiUrl} className="btn-primary">
                Try Verd AI
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
