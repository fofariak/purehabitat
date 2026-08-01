"use client";

import * as React from "react";

import { airSim } from "@/lib/content";

/**
 * Hero visual: a cutaway home with the Y-CAB running. Polluted air hangs in the
 * rooms, the unit switches on, and the haze clears while the PM2.5 and CO₂
 * readouts fall.
 *
 * The numbers are illustrative and the panel is labelled "Simulation" — the
 * real verified figures sit in the footnote. Do not present this as live data.
 *
 * Runs only while on screen, and `prefers-reduced-motion` jumps straight to the
 * cleared state without ever animating.
 */

const RUN_MS = 7000;
const HOLD_MS = 2200;
const RESET_MS = 700;

/** Fixed, not random — random positions would break SSR hydration. */
const MOTES = [
  [124, 96], [162, 122], [206, 88], [236, 140], [148, 154],
  [188, 112], [118, 132], [214, 160], [172, 78], [132, 168],
  [286, 96], [322, 128], [356, 92], [300, 152], [340, 164],
  [368, 130], [296, 118], [352, 152], [312, 82], [378, 106],
  [126, 224], [168, 250], [206, 214], [148, 262], [188, 236],
  [292, 228], [334, 254], [366, 218], [306, 262], [348, 236],
] as const;

export function HouseSimulation() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [t, setT] = React.useState(0);
  const [elapsed, setElapsed] = React.useState(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const done = () => {
        setT(1);
        setElapsed(RUN_MS);
      };
      done();
      return;
    }

    let raf = 0;
    let startedAt = 0;
    let running = false;

    const frame = (now: number) => {
      if (!startedAt) startedAt = now;
      const cycle = RUN_MS + HOLD_MS + RESET_MS;
      const at = (now - startedAt) % cycle;

      if (at < RUN_MS) {
        const p = at / RUN_MS;
        // easeOutCubic — drops fast, then settles, like a real meter.
        setT(1 - Math.pow(1 - p, 3));
        setElapsed(at);
      } else if (at < RUN_MS + HOLD_MS) {
        setT(1);
        setElapsed(RUN_MS);
      } else {
        // Brief fade back to polluted before the next pass.
        setT(1 - (at - RUN_MS - HOLD_MS) / RESET_MS);
        setElapsed(0);
      }

      if (running) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          startedAt = 0;
          raf = requestAnimationFrame(frame);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const pm = Math.round(airSim.pm25.from + (airSim.pm25.to - airSim.pm25.from) * t);
  const co2 = Math.round(airSim.co2.from + (airSim.co2.to - airSim.co2.from) * t);
  const totalSec = Math.floor(elapsed / 1000);
  const clock = `${String(Math.floor(totalSec / 60)).padStart(2, "0")}:${String(totalSec % 60).padStart(2, "0")}`;

  // 0 = filthy, 1 = clean. Drives the haze, the motes and the readout colours.
  const dirty = 1 - t;

  return (
    <div
      ref={ref}
      className="ph-in relative mx-auto w-full max-w-sm sm:max-w-md"
      style={{ animationDelay: "0.2s" }}
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-brand-navy/20 bg-brand-navy p-5 shadow-xl sm:p-6">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 15% 0%, color-mix(in srgb, var(--brand-blue) 40%, transparent), transparent 70%), radial-gradient(55% 55% at 90% 100%, color-mix(in srgb, var(--brand-teal) 38%, transparent), transparent 70%)",
          }}
        />

        <div className="relative">
          {/* Readout bar */}
          <div className="flex items-center gap-2">
            <Readout
              label={airSim.pm25.label}
              value={pm}
              unit={airSim.pm25.unit}
              dirty={dirty}
            />
            <Readout
              label={airSim.co2.label}
              value={co2}
              unit={airSim.co2.unit}
              dirty={dirty}
            />
            <div className="ml-auto rounded-xl border border-white/12 bg-white/5 px-2.5 py-2 text-center">
              <p className="font-display text-sm font-semibold tabular-nums text-white/80">
                {clock}
              </p>
            </div>
          </div>

          <HouseSvg t={t} />

          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 text-[11px] font-medium text-brand-mint">
              <span className="size-1.5 rounded-full bg-brand-mint" />
              {airSim.label}
            </span>
            <span className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/45">
              {airSim.badge}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-3 px-1 text-center text-[11px] leading-relaxed text-muted-foreground">
        {airSim.footnote}
      </p>
    </div>
  );
}

function Readout({
  label,
  value,
  unit,
  dirty,
}: {
  label: string;
  value: number;
  unit: string;
  dirty: number;
}) {
  // Amber when polluted, mint when clean — interpolated, so it shifts live.
  const color = `rgb(${Math.round(79 + (255 - 79) * dirty)}, ${Math.round(
    227 - 87 * dirty,
  )}, ${Math.round(173 - 50 * dirty)})`;

  return (
    <div className="rounded-xl border border-white/12 bg-white/5 px-2.5 py-1.5">
      <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-white/45">
        {label}
      </p>
      <p
        className="font-display text-lg font-semibold leading-tight tabular-nums transition-colors"
        style={{ color }}
      >
        {value}
        <span className="ml-1 text-[9px] font-normal text-white/40">{unit}</span>
      </p>
    </div>
  );
}

/**
 * Cutaway home. Line-art on the dark panel: four rooms, a smoking hob as the
 * indoor pollution source, and the Y-CAB on the outside wall pushing filtered
 * air in.
 */
function HouseSvg({ t }: { t: number }) {
  const dirty = 1 - t;
  const wall = "rgba(255,255,255,0.28)";
  const fill = "rgba(255,255,255,0.045)";

  return (
    <svg
      viewBox="0 0 420 300"
      className="mt-4 w-full"
      role="img"
      aria-label="Cutaway of a home with the Y-CAB running: indoor air clears as PM2.5 and CO₂ fall"
    >
      <defs>
        {/* Smog: heavy enough to read as polluted, light enough to see through */}
        <radialGradient id="ph-haze" cx="0.5" cy="0.55" r="0.78">
          <stop offset="0" stopColor="#d49a68" stopOpacity="0.5" />
          <stop offset="1" stopColor="#7a6046" stopOpacity="0.34" />
        </radialGradient>
        <linearGradient id="ph-clean" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--brand-mint)" stopOpacity="0.16" />
          <stop offset="1" stopColor="var(--brand-teal)" stopOpacity="0.08" />
        </linearGradient>
        <clipPath id="ph-interior">
          <rect x="96" y="40" width="300" height="230" rx="4" />
        </clipPath>
      </defs>

      {/* Ground */}
      <line x1="8" y1="278" x2="412" y2="278" stroke={wall} strokeWidth="1.5" />

      {/* Tree — layered canopy and a real trunk, so it doesn't read as a lollipop */}
      <g stroke={wall} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M46 278V222" strokeWidth="2.6" />
        <path d="M46 246l-12-12M46 234l11-11" strokeWidth="1.4" />
        <path
          d="M46 226c-17 0-27-12-27-26 0-9 5-17 12-21 2-9 9-15 18-15s16 6 18 15c7 4 11 12 11 21 0 14-10 26-27 26Z"
          fill={fill}
          strokeWidth="1.5"
        />
      </g>

      {/* House shell + room dividers */}
      <g stroke={wall} strokeWidth="1.75" fill="none" strokeLinejoin="round">
        <rect x="96" y="40" width="300" height="238" rx="5" fill={fill} />
        <line x1="96" y1="185" x2="396" y2="185" />
        <line x1="252" y1="40" x2="252" y2="278" />
      </g>

      {/* Air fill — hazy while dirty, mint once cleared */}
      <g clipPath="url(#ph-interior)">
        <rect
          x="96"
          y="40"
          width="300"
          height="238"
          fill="url(#ph-haze)"
          opacity={dirty}
        />
        <rect
          x="96"
          y="40"
          width="300"
          height="238"
          fill="url(#ph-clean)"
          opacity={t}
        />
      </g>

      {/* Room contents — deliberately geometric, not illustrated characters */}
      <g stroke={wall} strokeWidth="1.4" fill="none" strokeLinejoin="round" strokeLinecap="round">
        {/* Top-left: bedroom. Nightstand sits right of the bed so it stays
            clear of the intake arrows coming through the wall. */}
        <rect x="118" y="128" width="86" height="38" rx="4" fill={fill} />
        <rect x="210" y="142" width="22" height="24" rx="3" fill={fill} />
        <rect x="212" y="70" width="28" height="28" rx="3" fill={fill} />
        <line x1="226" y1="70" x2="226" y2="98" />
        <line x1="212" y1="84" x2="240" y2="84" />

        {/* Top-right: living room */}
        <rect x="274" y="132" width="76" height="32" rx="5" fill={fill} />
        <rect x="274" y="118" width="76" height="16" rx="4" fill={fill} />
        <rect x="362" y="140" width="20" height="24" rx="3" fill={fill} />
        <path d="M372 140c-8-8-8-20 0-26 8 6 8 18 0 26Z" fill={fill} />
        <rect x="286" y="66" width="24" height="20" rx="2" fill={fill} />
        <rect x="322" y="66" width="24" height="20" rx="2" fill={fill} />

        {/* Bottom-left: kitchen, with the hob as the indoor pollution source */}
        <rect x="118" y="216" width="110" height="34" rx="4" fill={fill} />
        <line x1="156" y1="216" x2="156" y2="250" />
        <line x1="192" y1="216" x2="192" y2="250" />
        <circle cx="137" cy="210" r="5" />
        <rect x="118" y="196" width="38" height="12" rx="3" fill={fill} />

        {/* Bottom-right: study */}
        <rect x="274" y="224" width="80" height="8" rx="3" fill={fill} />
        <line x1="282" y1="232" x2="282" y2="252" />
        <line x1="346" y1="232" x2="346" y2="252" />
        <rect x="292" y="200" width="42" height="22" rx="3" fill={fill} />
        <rect x="362" y="200" width="24" height="52" rx="3" fill={fill} />
        <line x1="362" y1="218" x2="386" y2="218" />
        <line x1="362" y1="236" x2="386" y2="236" />
      </g>

      {/* Cooking smoke — a real indoor source, so it thins but never fully goes */}
      <g
        stroke="#e0a878"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        opacity={0.25 + dirty * 0.6}
      >
        <path d="M137 202c-6-6 4-10-2-16" />
        <path d="M145 200c-6-7 4-11-2-17" />
      </g>

      {/* Suspended motes — the pollution you can see, cleared by the unit */}
      <g clipPath="url(#ph-interior)">
        {MOTES.map(([x, y], i) => {
          // Staggered so the room clears in a sweep rather than all at once.
          const stagger = Math.max(0, Math.min(1, (t - (i % 10) * 0.045) * 2.2));
          return (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y + stagger * -14}
              r={1.7 + (1 - stagger) * 1.3}
              fill="#e6bd93"
              opacity={(1 - stagger) * 0.92}
            />
          );
        })}
      </g>

      {/*
        Y-CAB unit on the outside wall, ducted through into the house.
        Louvers run VERTICALLY and sit beside a fan — horizontal bars in a
        rounded box read as a hamburger menu icon, not an air handler.
      */}
      <g strokeLinejoin="round">
        <rect
          x="52"
          y="106"
          width="46"
          height="34"
          rx="8"
          fill="var(--brand-blue)"
          fillOpacity="0.9"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.4"
        />
        {[60, 65.5, 71, 76.5].map((x) => (
          <line
            key={x}
            x1={x}
            y1="115"
            x2={x}
            y2="131"
            stroke="rgba(255,255,255,0.75)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ))}
        {/* Fan — spins up as the unit comes on */}
        <circle
          cx="87"
          cy="123"
          r="6"
          fill="none"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.4"
        />
        <circle cx="87" cy="123" r="1.8" fill="#ffffff" opacity={0.5 + t * 0.5} />
        {/* Status light — off, then live */}
        <circle cx="57" cy="111" r="2.4" fill="var(--brand-mint)" opacity={0.2 + t * 0.8} />
      </g>

      {/* Filtered air pushing in, strongest once the unit is at work */}
      <g
        stroke="var(--brand-mint)"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        opacity={0.25 + t * 0.7}
      >
        <path d="M100 112h34" />
        <path d="M128 107l6 5-6 5" />
        <path d="M100 124h24" />
        <path d="M118 119l6 5-6 5" />
      </g>

      {/* Positive-pressure bubble, only once the space is actually clean */}
      <ellipse
        cx="246"
        cy="159"
        rx="160"
        ry="126"
        fill="none"
        stroke="var(--brand-mint)"
        strokeWidth="1.2"
        strokeDasharray="4 7"
        opacity={t * 0.5}
      />
    </svg>
  );
}
