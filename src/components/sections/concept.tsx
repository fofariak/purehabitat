import { Leaf, Infinity as InfinityIcon, Circle, Wind, Filter, ArrowRight, ArrowLeft } from "lucide-react";

import { concept } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";

const pillarIcons = [Leaf, InfinityIcon, Circle];

export function Concept() {
  return (
    <section id="concept" className="scroll-mt-24 py-16 sm:py-28">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={concept.eyebrow}
          title={concept.title}
          description={concept.lead}
        />

        {/* Trio — recreated brandmark concept on a branded dark panel */}
        <Reveal className="mt-14">
          <div className="relative overflow-hidden rounded-3xl border border-brand-navy/20 bg-brand-navy p-8 text-white shadow-xl sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(40% 60% at 20% 10%, color-mix(in srgb, var(--brand-blue) 45%, transparent), transparent 70%), radial-gradient(45% 60% at 85% 90%, color-mix(in srgb, var(--brand-teal) 40%, transparent), transparent 70%)",
              }}
            />
            <div className="relative grid gap-8 sm:grid-cols-3">
              {concept.pillars.map((pillar, i) => {
                const Icon = pillarIcons[i];
                return (
                  <div key={pillar.title} className="text-center">
                    <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-white/15 bg-white/5">
                      <Icon className="size-7 text-brand-mint" strokeWidth={1.6} />
                    </div>
                    <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-brand-mint/90">
                      {pillar.caption}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-semibold tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-white/70">
                      {pillar.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Ventilation + Purification dual explainer */}
        <StaggerGroup className="mt-6 grid gap-5 md:grid-cols-2">
          {concept.dual.map((col) => {
            const isVent = col.kind === "Ventilation";
            const Icon = isVent ? Wind : Filter;
            const Dir = isVent ? ArrowRight : ArrowLeft;
            return (
              <StaggerItem key={col.kind}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-brand-gradient text-white">
                      <Icon className="size-5" />
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                      <Dir className="size-3.5" />
                      {col.kind}
                    </div>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">
                    {col.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {col.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-[15px] text-muted-foreground">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-teal" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
