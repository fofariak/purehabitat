import {
  Headphones,
  Wrench,
  Megaphone,
  GraduationCap,
  Gift,
  Sparkles,
} from "lucide-react";

import { partnerBenefits } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/reveal";
import { Card } from "@/components/ui/card";

const icons = [Headphones, Wrench, Megaphone, GraduationCap, Gift, Sparkles];

export function PartnerBenefits() {
  return (
    <section
      id="benefits"
      className="scroll-mt-24 border-y border-border bg-secondary/30 py-16 sm:py-28"
    >
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Partner benefits"
          title="Everything you need to recommend with confidence."
          description="We invest in our partners with real support, tools and rewards — not just a logo to put on a deck."
        />

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {partnerBenefits.map((benefit, i) => {
            const Icon = icons[i % icons.length];
            return (
              <StaggerItem key={benefit.title}>
                <Card className="group h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-brand-gradient group-hover:text-white">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    {benefit.body}
                  </p>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
