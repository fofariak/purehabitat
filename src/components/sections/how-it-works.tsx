"use client";

import * as React from "react";
import { Building2, Home } from "lucide-react";

import { howItWorks } from "@/lib/content";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

type Mode = "refer" | "own";

const TABS = [
  { key: "refer" as const, label: "For my clients", icon: Building2 },
  { key: "own" as const, label: "For my own space", icon: Home },
];

export function HowItWorks() {
  const [mode, setMode] = React.useState<Mode>("refer");
  const steps = howItWorks[mode];

  return (
    <section id="how-it-works" className="scroll-mt-24 py-16 sm:py-28">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={howItWorks.eyebrow}
          title={howItWorks.title}
          description={howItWorks.lead}
        />

        <Reveal className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="How it works, by audience"
            className="inline-grid grid-cols-2 gap-1 rounded-full border border-border bg-secondary/60 p-1"
          >
            {TABS.map((tab) => {
              const active = mode === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setMode(tab.key)}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-brand-gradient text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <tab.icon className="size-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="relative mt-14">
          {/* Connecting line (desktop) */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
          />
          {/* Keyed on mode so the steps replay their entrance when the tab changes. */}
          <div key={mode} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {steps.map((item, i) => (
              <div
                key={item.step}
                className="ph-in relative"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className="flex size-14 items-center justify-center rounded-2xl border border-border bg-card font-display text-lg font-semibold text-gradient shadow-sm">
                  {item.step}
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
