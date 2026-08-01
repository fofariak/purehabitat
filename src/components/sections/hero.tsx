import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck, Sparkles } from "lucide-react";

import { hero, heroStats, site } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { PurificationField } from "@/components/purification-field";
import { AirQualityPanel } from "@/components/air-quality-panel";

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
        {/* Pollution particles being swept clean by the expanding bubble */}
        <PurificationField className="absolute inset-0 size-full" />
      </div>

      <div className="container-px mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <div className="ph-in flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3.5 py-1.5 text-xs font-medium tracking-wide text-muted-foreground">
                <ShieldCheck className="size-3.5 text-brand-teal" />
                {site.authorization} · {site.brand}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3.5 py-1.5 text-xs font-medium tracking-wide text-muted-foreground">
                <MapPin className="size-3.5 text-brand-blue" />
                {site.coverage}
              </span>
            </div>

            <h1
              className="ph-in mt-6 font-display text-[2.15rem] font-semibold leading-[1.05] tracking-[-0.035em] text-balance sm:text-[3.25rem] md:text-[4rem]"
              style={{ animationDelay: "0.06s" }}
            >
              {hero.headline}{" "}
              <span className="text-gradient">{hero.headlineAccent}</span>
            </h1>

            <p
              className="ph-in mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
              style={{ animationDelay: "0.14s" }}
            >
              {hero.lead}
            </p>

            <div
              className="ph-in mt-8 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "0.22s" }}
            >
              <Button asChild variant="brand" size="lg">
                <Link href="#join">
                  Join the Referral Network
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#assessment">
                  <Sparkles className="size-4" />
                  Book a free assessment
                </Link>
              </Button>
            </div>

            <p className="ph-in mt-5 text-sm text-muted-foreground" style={{ animationDelay: "0.3s" }}>
              {site.tagline}
            </p>
          </div>

          <AirQualityPanel />
        </div>

        {/* Stats */}
        <dl
          className="ph-in mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:mt-20 lg:grid-cols-4"
          style={{ animationDelay: "0.38s" }}
        >
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card p-5 transition-colors duration-300 hover:bg-secondary/50 sm:p-6"
            >
              <dt className="text-sm text-muted-foreground">{stat.label}</dt>
              <dd className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
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
