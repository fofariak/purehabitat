"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarClock, Filter, ShieldCheck, Wind } from "lucide-react";

import { heroStats, site } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/logo";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Ambient background — matches the logo's blue → teal gradient */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-fade opacity-60" />
        <div className="absolute -left-[10%] top-[-15%] h-[560px] w-[560px] rounded-full bg-brand-blue/25 blur-[120px]" />
        <div className="absolute -right-[8%] top-[-5%] h-[520px] w-[520px] rounded-full bg-brand-teal/25 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brand-sky/20 blur-[120px]" />
      </div>

      <div className="container-px mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3.5 py-1.5 text-xs font-medium tracking-wide text-muted-foreground">
                <ShieldCheck className="size-3.5 text-brand-teal" />
                Authorized channel partner · {site.partnerOf}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mt-6 font-display text-4xl font-semibold leading-[1.06] tracking-tight text-balance sm:text-5xl md:text-6xl"
            >
              Help your clients build{" "}
              <span className="text-gradient">healthier luxury homes.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
            >
              PureHabitat partners with interior designers, architects, luxury
              builders and home-automation companies. Recommend YOGa Clean Air to
              the clients you already serve — and one introduction can become
              qualified buyers for years. You refer; we handle everything else.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
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
            </motion.div>

            <p className="mt-5 text-sm text-muted-foreground">{site.tagline}</p>
          </div>

          <HeroVisual />
        </div>

        {/* Stats */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:mt-20 lg:grid-cols-4"
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
        </motion.dl>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative mx-auto w-full max-w-md"
    >
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

        {/* Concentric bubble rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-white/15"
              style={{ inset: `${8 + i * 11}%` }}
              animate={{ scale: [1, 1.03, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.35,
              }}
            />
          ))}
        </div>

        {/* Logo mark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="flex size-32 items-center justify-center rounded-[1.75rem] border border-white/15 bg-white/5 backdrop-blur-sm"
          >
            <LogoMark className="size-20 text-white" />
          </motion.div>
        </div>

        {/* Caption */}
        <div className="absolute inset-x-5 bottom-5 text-center">
          <p className="font-display text-sm font-semibold text-white">
            The Clean Air Bubble
          </p>
          <p className="text-xs text-white/60">Fresh air in · pollution out</p>
        </div>
      </div>

      {/* Floating pills — ventilation + purification */}
      <motion.div
        className="absolute -left-3 top-10 hidden sm:block"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="glass ring-hairline flex items-center gap-2 rounded-full px-3.5 py-2 shadow-lg">
          <Wind className="size-4 text-brand-blue" />
          <span className="text-sm font-medium">Ventilation</span>
        </div>
      </motion.div>
      <motion.div
        className="absolute -right-3 bottom-16 hidden sm:block"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      >
        <div className="glass ring-hairline flex items-center gap-2 rounded-full px-3.5 py-2 shadow-lg">
          <Filter className="size-4 text-brand-teal" />
          <span className="text-sm font-medium">Purification</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
