import Image from "next/image";

import { alsoForProfessionals, targetProfessionals } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";

export function WhoWeReferWith() {
  return (
    <section id="who" className="scroll-mt-24 py-16 sm:py-28">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Who refers with us"
          title="Built for the professionals who serve luxury clients."
          description="Our Referral Network is made up of the specialists who already have the trust of affluent clients — so clean air reaches the spaces that matter most, one introduction at a time."
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

        {/* Trades without a photo card still need to see themselves on the page. */}
        <Reveal className="mt-10">
          <div className="rounded-2xl border border-dashed border-border bg-secondary/40 px-6 py-6 text-center sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Also referring with us
            </p>
            <ul className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
              {alsoForProfessionals.map((label) => (
                <li
                  key={label}
                  className="rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground/80"
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
