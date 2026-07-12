import { howItWorks } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/reveal";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 py-16 sm:py-28">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="How it works"
          title="From referral to lifetime clean air — handled for you."
          description="A simple, transparent flow. You bring the relationship; PureHabitat delivers the outcome."
        />

        <StaggerGroup className="relative mt-16">
          {/* Connecting line (desktop) */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {howItWorks.map((item) => (
              <StaggerItem key={item.step}>
                <div className="relative">
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
              </StaggerItem>
            ))}
          </div>
        </StaggerGroup>
      </div>
    </section>
  );
}
