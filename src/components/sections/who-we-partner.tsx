import Image from "next/image";

import { targetProfessionals } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/reveal";

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
          {targetProfessionals.map((pro) => (
            <StaggerItem key={pro.title}>
              <article className="group h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image
                    src={pro.image}
                    alt={pro.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/45 via-brand-navy/0 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-navy shadow-sm">
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
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
