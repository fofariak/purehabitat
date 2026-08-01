"use client";

import * as React from "react";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";

import { aqiDemo } from "@/lib/content";
import { LogoMark } from "@/components/logo";

/**
 * Hero visual: the measured before/after from the IIT Delhi study, counting up
 * once when it scrolls into view.
 *
 * These are real verified figures, not a simulation — the panel is explicitly
 * labelled with the study and the site, so it can never read as live data.
 */
export function AirQualityPanel() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [run, setRun] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="ph-in relative mx-auto w-full max-w-sm sm:max-w-md"
      style={{ animationDelay: "0.2s" }}
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-brand-navy/20 bg-brand-navy p-6 shadow-xl sm:p-7">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 60% at 20% 10%, color-mix(in srgb, var(--brand-blue) 45%, transparent), transparent 70%), radial-gradient(55% 60% at 85% 95%, color-mix(in srgb, var(--brand-teal) 40%, transparent), transparent 70%)",
          }}
        />

        {/* Concentric bubble rings, behind the readout */}
        <div aria-hidden className="absolute inset-0 flex items-center justify-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="ph-ring absolute rounded-full border border-white/10"
              style={
                {
                  inset: `${-8 + i * 13}%`,
                  "--ph-ring-dur": `${5 + i}s`,
                  animationDelay: `${i * 0.35}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div className="relative">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-brand-mint">
              <span className="size-1.5 rounded-full bg-brand-mint" />
              {aqiDemo.source}
            </span>
            <LogoMark className="size-7 text-white/70" />
          </div>

          <div className="mt-7 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <Reading
              label={aqiDemo.outside.label}
              value={aqiDemo.outside.value}
              unit={aqiDemo.outside.unit}
              run={run}
              tone="bad"
            />
            <ArrowRight className="size-5 text-white/40" />
            <Reading
              label={aqiDemo.inside.label}
              value={aqiDemo.inside.value}
              unit={aqiDemo.inside.unit}
              decimals={2}
              run={run}
              tone="good"
            />
          </div>

          {/* Proportional bars — the visual punch of a 200x difference */}
          <div className="mt-7 space-y-2.5">
            <Bar tone="bad" width={run ? 100 : 0} />
            <Bar tone="good" width={run ? 2 : 0} />
          </div>

          <div className="mt-7 border-t border-white/10 pt-4">
            <p className="font-display text-sm font-semibold text-white">
              {aqiDemo.reduction} less PM2.5, measured indoors
            </p>
            <p className="mt-0.5 text-xs text-white/55">{aqiDemo.place}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Reading({
  label,
  value,
  unit,
  decimals = 0,
  run,
  tone,
}: {
  label: string;
  value: number;
  unit: string;
  decimals?: number;
  run: boolean;
  tone: "bad" | "good";
}) {
  const shown = useCountUp(value, run, decimals);
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/50">
        {label}
      </p>
      <p
        className={`mt-1 font-display text-[2.1rem] font-semibold leading-none tracking-[-0.04em] tabular-nums sm:text-[2.5rem] ${
          tone === "bad" ? "text-[#ff9a7b]" : "text-brand-mint"
        }`}
      >
        {shown}
      </p>
      <p className="mt-1.5 text-xs text-white/45">{unit}</p>
    </div>
  );
}

function Bar({ tone, width }: { tone: "bad" | "good"; width: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <div
        className={`h-full rounded-full transition-[width] duration-[1600ms] ease-out ${
          tone === "bad"
            ? "bg-gradient-to-r from-[#ff7a52] to-[#ff9a7b]"
            : "bg-gradient-to-r from-brand-teal to-brand-mint"
        }`}
        style={{ width: `${Math.max(width, width > 0 ? 1.5 : 0)}%` }}
      />
    </div>
  );
}

/** Eased count-up. Runs once, and only after the panel is actually on screen. */
function useCountUp(target: number, run: boolean, decimals: number) {
  const [n, setN] = React.useState(0);

  React.useEffect(() => {
    if (!run) return;

    // Reduced motion still lands on the real number — it just gets there in a
    // single frame instead of counting up.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduce ? 0 : 1600;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
      // easeOutExpo — fast then settling, reads as a meter coming to rest.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setN(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);

  return n.toFixed(decimals);
}
