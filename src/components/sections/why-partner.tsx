import { HeartPulse, Building2, ShieldCheck, Sparkles } from "lucide-react";

import { whyPartner } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/reveal";
import { Card } from "@/components/ui/card";

const icons = [HeartPulse, Building2, ShieldCheck, Sparkles];

export function WhyPartner() {
  return (
    <section id="why-partner" className="scroll-mt-24 py-16 sm:py-28">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={whyPartner.eyebrow}
          title={whyPartner.title}
          description={whyPartner.lead}
        />

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2">
          {whyPartner.points.map((point, i) => {
            const Icon = icons[i % icons.length];
            return (
              <StaggerItem key={point.title}>
                <Card className="group h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground transition-colors group-hover:bg-brand-gradient group-hover:text-white">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">
                    {point.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                    {point.body}
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
