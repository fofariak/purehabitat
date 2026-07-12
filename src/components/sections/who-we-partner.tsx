import type { LucideIcon } from "lucide-react";
import { Building2, Cpu, DraftingCompass, Sofa } from "lucide-react";

import { targetProfessionals } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/reveal";

const icons: Record<string, LucideIcon> = {
  sofa: Sofa,
  compass: DraftingCompass,
  building: Building2,
  automation: Cpu,
};

export function WhoWePartner() {
  return (
    <section id="who" className="scroll-mt-24 py-16 sm:py-28">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Who it's for"
          title="Built for the professionals who serve luxury clients."
          description="We build relationships with the specialists who already have the trust of affluent homeowners — so clean air reaches the spaces that matter most, one introduction at a time."
        />

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {targetProfessionals.map((pro) => {
            const Icon = icons[pro.icon] ?? Sofa;
            return (
              <StaggerItem key={pro.title}>
                <article className="group h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  {/* Branded tile — echoes the hero clean-air bubble */}
                  <div className="relative aspect-[5/4] overflow-hidden bg-brand-navy">
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(55% 65% at 25% 20%, color-mix(in srgb, var(--brand-blue) 55%, transparent), transparent 70%), radial-gradient(55% 65% at 82% 85%, color-mix(in srgb, var(--brand-teal) 45%, transparent), transparent 70%)",
                      }}
                    />
                    <div aria-hidden className="absolute inset-0 flex items-center justify-center">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="absolute rounded-full border border-white/12"
                          style={{ inset: `${12 + i * 13}%` }}
                        />
                      ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex size-16 items-center justify-center rounded-2xl border border-white/15 bg-white/15 transition-transform duration-500 group-hover:scale-110">
                        <Icon className="size-8 text-white" strokeWidth={1.5} />
                      </div>
                    </div>
                    <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-white/15 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white/90">
                      {pro.tag}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {pro.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {pro.body}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
