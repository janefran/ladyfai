"use client";

import { useEffect, useRef } from "react";

// Real confetti: pours from the top with gravity, drift, spin, and fade,
// emitting continuously while the section is in view, then settling when it
// scrolls away. Canvas-based so hundreds of pieces stay smooth.

const COLORS = ["#14bcba", "#3dcfcc", "#0d7377", "#f4d58d", "#f7e9e4", "#ffffff"];

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vrot: number;
  color: string;
  round: boolean;
  life: number;
};

export default function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = canvas.width = parent.clientWidth;
      h = canvas.height = parent.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let pieces: Piece[] = [];
    let emitting = false;
    let raf = 0;

    const io = new IntersectionObserver(
      (entries) => {
        emitting = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0.05 }
    );
    if (canvas.parentElement) io.observe(canvas.parentElement);

    const spawn = () => {
      const size = 5 + Math.random() * 8;
      pieces.push({
        x: Math.random() * w,
        y: -20,
        vx: (Math.random() - 0.5) * 1.4,
        vy: 1.4 + Math.random() * 2.2,
        size,
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        round: Math.random() > 0.6,
        life: 1,
      });
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      if (emitting) {
        for (let i = 0; i < 4; i++) spawn();
      }
      pieces = pieces.filter((p) => p.y < h + 30 && p.life > 0);
      for (const p of pieces) {
        // gravity + air drift (ease into terminal velocity)
        p.vy += 0.045;
        p.vy = Math.min(p.vy, 5.5);
        p.vx += Math.sin(p.y * 0.01) * 0.02;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;
        if (p.y > h * 0.78) p.life -= 0.03;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillStyle = p.color;
        if (p.round) {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        }
        ctx.restore();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
