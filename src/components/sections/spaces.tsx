import { Home, GraduationCap, Building2, Stethoscope, Dumbbell, Hotel } from "lucide-react";

import { spaces } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/reveal";

const icons = [Home, GraduationCap, Building2, Stethoscope, Dumbbell, Hotel];

export function Spaces() {
  return (
    <section
      id="spaces"
      className="scroll-mt-24 border-y border-border bg-secondary/30 py-16 sm:py-28"
    >
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Where it works"
          title="Perfect for every premium space."
          description="One Y-CAB covers up to 1,500 sq.ft of whole-space clean air — the right fit for the environments your clients live, work, learn and train in."
        />

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {spaces.map((space, i) => {
            const Icon = icons[i % icons.length];
            return (
              <StaggerItem key={space.title}>
                <div className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-6 lift">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-brand-gradient group-hover:text-white">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {space.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {space.body}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
