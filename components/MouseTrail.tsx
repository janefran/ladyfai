"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
};

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let raf = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      for (let i = 0; i < 3; i++) {
        const maxLife = 28 + Math.random() * 22;
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 0.9,
          vy: (Math.random() - 0.5) * 0.9 - 0.2,
          size: 2 + Math.random() * 4,
          life: maxLife,
          maxLife,
        });
      }
      if (particles.length > 220) {
        particles = particles.slice(particles.length - 220);
      }
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter((p) => p.life > 0);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        const alpha = (p.life / p.maxLife) * 0.55;
        const r = p.size * (p.life / p.maxLife);
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(r, 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20, 188, 186, ${alpha})`;
        ctx.shadowColor = "rgba(20, 188, 186, 0.6)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60]"
    />
  );
}
