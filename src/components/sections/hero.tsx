"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarClock, ShieldCheck } from "lucide-react";

import { heroStats, site } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/logo";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-fade opacity-70" />
        <div className="absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 aurora opacity-60" />
      </div>

      <div className="container-px mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
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
              Join the PureHabitat partner network and bring hospital-grade clean
              air to the spaces you design. You refer — we handle consultation,
              installation and lifetime service, so your projects breathe better
              without any operational burden.
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

            <p className="mt-5 text-sm text-muted-foreground">
              {site.tagline}
            </p>
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
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative mx-auto hidden aspect-square w-full max-w-md lg:block"
    >
      {/* Concentric "clean air bubble" rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-border"
            style={{ inset: `${i * 14}%` }}
            animate={{ scale: [1, 1.03, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-[18%] rounded-full bg-brand-gradient opacity-[0.14] blur-2xl" />

      <div className="relative flex size-full items-center justify-center">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="glass ring-hairline flex size-40 items-center justify-center rounded-[2rem] shadow-xl"
        >
          <LogoMark gradient className="size-24" />
        </motion.div>
      </div>

      {/* Floating chips */}
      <FloatingChip className="left-0 top-10" label="PM2.5" value="< 5 µg/m³" />
      <FloatingChip className="right-0 top-1/3" label="Coverage" value="1,500 sq.ft" delay={0.6} />
      <FloatingChip className="bottom-8 left-6" label="Uptime" value="99.99%" delay={1.1} />
    </motion.div>
  );
}

function FloatingChip({
  className,
  label,
  value,
  delay = 0,
}: {
  className?: string;
  label: string;
  value: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div className="glass ring-hairline rounded-2xl px-3.5 py-2.5 shadow-lg">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="font-display text-sm font-semibold">{value}</p>
      </div>
    </motion.div>
  );
}
