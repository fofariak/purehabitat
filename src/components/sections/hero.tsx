"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CalendarClock, ShieldCheck } from "lucide-react";

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
      {/* Gradient halo behind the frame */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2.5rem] bg-brand-gradient opacity-20 blur-2xl"
      />

      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl ring-hairline">
        <div className="relative aspect-[4/5]">
          <Image
            src="/img/breathe.jpg"
            alt="A person breathing clean, filtered air"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 440px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-brand-navy/5 to-transparent" />

          {/* Brand badge */}
          <div className="absolute left-4 top-4">
            <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5 shadow-lg">
              <LogoMark gradient className="size-5" />
              <span className="font-display text-xs font-semibold text-white">
                Clean Air Bubble
              </span>
            </div>
          </div>

          {/* Bottom caption */}
          <div className="absolute inset-x-4 bottom-4">
            <div className="glass rounded-2xl px-4 py-3 shadow-lg">
              <p className="text-xs text-white/80">Guaranteed indoor PM2.5</p>
              <p className="font-display text-xl font-semibold text-white">
                {"< 5 µg/m³"}{" "}
                <span className="text-sm font-normal text-brand-mint">
                  · 99.5% verified
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating stat chip */}
      <motion.div
        className="absolute -right-3 top-1/3 hidden sm:block"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="glass ring-hairline rounded-2xl px-3.5 py-2.5 shadow-lg">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
            Coverage
          </p>
          <p className="font-display text-sm font-semibold">1,500 sq.ft</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
