"use client";

import * as React from "react";

/**
 * Animated hero background: drifting pollution particles that get swept clean
 * by an expanding "clean air bubble" pulse. It is the product story in one
 * glance — polluted air arrives, the bubble reaches it, it turns clean.
 *
 * Performance is the constraint here, since this runs behind the LCP element:
 *   - particle count scales down hard on small screens
 *   - the loop stops entirely when the hero scrolls out of view or the tab is
 *     hidden, so it never burns battery below the fold
 *   - `prefers-reduced-motion` paints a single static frame and stops
 *   - device pixel ratio is capped at 2
 */

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  /** 0 = polluted, 1 = fully purified. */
  purity: number;
  /** Seconds remaining as clean air before this particle recycles to the edge. */
  ttl: number;
};

const CYCLE_MS = 7000;
const POLLUTED = { r: 122, g: 118, b: 110 };
const CLEAN = { r: 79, g: 227, b: 173 };

export function PurificationField({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let running = false;
    const start = performance.now();
    let last = start;

    const seed = (p: Particle, initial: boolean) => {
      // Recycled particles enter from the edges — pollution keeps arriving.
      const edge = Math.random();
      if (initial) {
        p.x = Math.random() * width;
        p.y = Math.random() * height;
      } else if (edge < 0.5) {
        p.x = Math.random() < 0.5 ? -20 : width + 20;
        p.y = Math.random() * height;
      } else {
        p.x = Math.random() * width;
        p.y = Math.random() < 0.5 ? -20 : height + 20;
      }
      p.vx = (Math.random() - 0.5) * 11;
      p.vy = (Math.random() - 0.5) * 11;
      p.r = 1 + Math.random() * 2.4;
      p.purity = 0;
      p.ttl = 1.5 + Math.random() * 2.5;
    };

    const build = () => {
      const area = width * height;
      // ~1 particle per 14k px², clamped so phones stay cheap.
      const count = Math.round(
        Math.min(window.innerWidth < 640 ? 26 : 78, Math.max(14, area / 14000)),
      );
      particles = Array.from({ length: count }, () => {
        const p: Particle = { x: 0, y: 0, vx: 0, vy: 0, r: 0, purity: 0, ttl: 0 };
        seed(p, true);
        return p;
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // The bubble front sweeps out from the centre, then restarts.
      const phase = ((now - start) % CYCLE_MS) / CYCLE_MS;
      const cx = width * 0.5;
      const cy = height * 0.42;
      const maxR = Math.hypot(Math.max(cx, width - cx), Math.max(cy, height - cy));
      const frontR = phase * maxR;

      ctx.clearRect(0, 0, width, height);

      // The bubble front itself — a soft expanding ring, fading as it grows.
      const frontAlpha = (1 - phase) * 0.32;
      if (frontAlpha > 0.01 && frontR > 4) {
        const ring = ctx.createRadialGradient(
          cx,
          cy,
          Math.max(frontR - 60, 0),
          cx,
          cy,
          frontR,
        );
        ring.addColorStop(0, "rgba(79,227,173,0)");
        ring.addColorStop(0.75, `rgba(79,227,173,${frontAlpha * 0.5})`);
        ring.addColorStop(1, "rgba(79,227,173,0)");
        ctx.beginPath();
        ctx.arc(cx, cy, frontR, 0, Math.PI * 2);
        ctx.strokeStyle = ring;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        const d = Math.hypot(p.x - cx, p.y - cy);
        if (d < frontR) {
          // The front has reached it — purify, then start its clean-air clock.
          p.purity = Math.min(1, p.purity + dt * 2.2);
        }
        if (p.purity >= 1) {
          p.ttl -= dt;
          if (p.ttl <= 0) seed(p, false);
        }

        if (p.x < -40 || p.x > width + 40 || p.y < -40 || p.y > height + 40) {
          seed(p, false);
        }

        const t = p.purity;
        const cr = Math.round(POLLUTED.r + (CLEAN.r - POLLUTED.r) * t);
        const cg = Math.round(POLLUTED.g + (CLEAN.g - POLLUTED.g) * t);
        const cb = Math.round(POLLUTED.b + (CLEAN.b - POLLUTED.b) * t);
        // Polluted specks read heavier; purified ones lighten and shrink away.
        const alpha = 0.42 - t * 0.2;
        const radius = p.r * (1 - t * 0.4);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
        ctx.fill();
      }

      if (running) raf = requestAnimationFrame(draw);
    };

    const play = () => {
      if (running || reduceMotion) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(draw);
    };

    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();

    if (reduceMotion) {
      // One static frame: polluted specks, no motion, no loop.
      draw(performance.now());
      return () => {};
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let onScreen = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen && !document.hidden) play();
        else pause();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) pause();
      else if (onScreen) play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      // Decorative only — the hero copy carries all the meaning.
      role="presentation"
    />
  );
}
