import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, CalendarClock, Filter, ShieldCheck, Wind } from "lucide-react";

import { heroStats, site } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/logo";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-40 sm:pb-28">
      {/* Ambient background — matches the logo's blue → teal gradient.
          Heavy blur blobs are desktop-only to keep mobile paint cheap. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-fade opacity-60" />
        <div className="absolute -left-[10%] top-[-15%] hidden h-[520px] w-[520px] rounded-full bg-brand-blue/25 blur-[90px] sm:block" />
        <div className="absolute -right-[8%] top-[-5%] hidden h-[480px] w-[480px] rounded-full bg-brand-teal/25 blur-[90px] sm:block" />
        <div className="absolute bottom-[-20%] left-1/2 hidden h-[400px] w-[680px] -translate-x-1/2 rounded-full bg-brand-sky/20 blur-[90px] lg:block" />
      </div>

      <div className="container-px mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <div className="ph-in">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3.5 py-1.5 text-xs font-medium tracking-wide text-muted-foreground">
                <ShieldCheck className="size-3.5 text-brand-teal" />
                Authorized channel partner · {site.partnerOf}
              </span>
            </div>

            <h1
              className="ph-in mt-6 font-display text-[2rem] font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-6xl"
              style={{ animationDelay: "0.06s" }}
            >
              Help your clients build{" "}
              <span className="text-gradient">healthier luxury homes.</span>
            </h1>

            <p
              className="ph-in mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
              style={{ animationDelay: "0.14s" }}
            >
              PureHabitat partners with interior designers, architects, luxury
              builders and home-automation companies. Recommend YOGa Clean Air to
              the clients you already serve — and one introduction can become
              qualified buyers for years. You refer; we handle everything else.
            </p>

            <div
              className="ph-in mt-8 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "0.22s" }}
            >
              <Button asChild variant="brand" size="lg">
                <Link href="#become-partner">
                  Become a partner
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#book-demo">
                  <CalendarClock className="size-4" />
                  Book a demo
                </Link>
              </Button>
            </div>

            <p className="ph-in mt-5 text-sm text-muted-foreground" style={{ animationDelay: "0.3s" }}>
              {site.tagline}
            </p>
          </div>

          <HeroVisual />
        </div>

        {/* Stats */}
        <dl
          className="ph-in mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:mt-20 lg:grid-cols-4"
          style={{ animationDelay: "0.38s" }}
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="bg-card p-5 sm:p-6">
              <dt className="text-sm text-muted-foreground">{stat.label}</dt>
              <dd className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {stat.value}
              </dd>
              <dd className="mt-1 text-xs text-muted-foreground">{stat.sub}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="ph-in relative mx-auto w-full max-w-sm sm:max-w-md" style={{ animationDelay: "0.2s" }}>
      {/* Branded "clean air bubble" panel */}
      <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-brand-navy/20 bg-brand-navy shadow-xl">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 60% at 25% 20%, color-mix(in srgb, var(--brand-blue) 55%, transparent), transparent 70%), radial-gradient(55% 60% at 80% 85%, color-mix(in srgb, var(--brand-teal) 45%, transparent), transparent 70%)",
          }}
        />

        {/* Concentric bubble rings (CSS-only) */}
        <div aria-hidden className="absolute inset-0 flex items-center justify-center">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="ph-ring absolute rounded-full border border-white/15"
              style={
                {
                  inset: `${8 + i * 11}%`,
                  "--ph-ring-dur": `${5 + i}s`,
                  animationDelay: `${i * 0.35}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>

        {/* Logo mark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="ph-float flex size-28 items-center justify-center rounded-[1.75rem] border border-white/15 bg-white/5 sm:size-32">
            <LogoMark className="size-16 text-white sm:size-20" />
          </div>
        </div>

        {/* Caption */}
        <div className="absolute inset-x-5 bottom-5 text-center">
          <p className="font-display text-sm font-semibold text-white">
            The Clean Air Bubble
          </p>
          <p className="text-xs text-white/60">Fresh air in · pollution out</p>
        </div>
      </div>

      {/* Floating pills — ventilation + purification (desktop only) */}
      <div className="ph-float absolute -left-3 top-10 hidden sm:block">
        <div className="glass ring-hairline flex items-center gap-2 rounded-full px-3.5 py-2 shadow-lg">
          <Wind className="size-4 text-brand-blue" />
          <span className="text-sm font-medium">Ventilation</span>
        </div>
      </div>
      <div
        className="ph-float absolute -right-3 bottom-16 hidden sm:block"
        style={{ animationDelay: "0.6s" }}
      >
        <div className="glass ring-hairline flex items-center gap-2 rounded-full px-3.5 py-2 shadow-lg">
          <Filter className="size-4 text-brand-teal" />
          <span className="text-sm font-medium">Purification</span>
        </div>
      </div>
    </div>
  );
}
