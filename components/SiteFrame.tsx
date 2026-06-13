"use client";

import { useEffect, useRef, useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

// Wraps every public page. On desktop it runs the "curtain" reveal: the page
// content is an opaque layer that scrolls up to uncover the fixed footer
// underneath. On mobile the footer sits in normal flow (a tall fixed footer
// would not fit the viewport), so it just scrolls in like any section.
export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const footRef = useRef<HTMLElement | null>(null);
  const [curtain, setCurtain] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMode = () => setCurtain(mq.matches && !reduced.matches);
    applyMode();
    mq.addEventListener("change", applyMode);
    reduced.addEventListener("change", applyMode);

    const setHeight = () => {
      const f = footRef.current;
      if (f) {
        document.documentElement.style.setProperty("--footer-h", `${f.offsetHeight}px`);
      }
    };
    setHeight();
    const ro = new ResizeObserver(setHeight);
    if (footRef.current) ro.observe(footRef.current);
    window.addEventListener("resize", setHeight);

    return () => {
      mq.removeEventListener("change", applyMode);
      reduced.removeEventListener("change", applyMode);
      ro.disconnect();
      window.removeEventListener("resize", setHeight);
    };
  }, []);

  return (
    <>
      <Nav />
      <div
        className="relative z-10 bg-[var(--bg)]"
        style={
          curtain
            ? {
                marginBottom: "var(--footer-h, 560px)",
                boxShadow: "0 40px 70px -28px rgba(8,28,27,0.5)",
              }
            : undefined
        }
      >
        {children}
      </div>
      <Footer ref={footRef} curtain={curtain} />
      <BackToTop />
    </>
  );
}
