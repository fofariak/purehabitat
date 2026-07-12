import Image from "next/image";

import { brandMoment } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function BrandMoment() {
  return (
    <section className="scroll-mt-24 border-y border-border bg-secondary/30 py-16 sm:py-28">
      <div className="container-px mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal">
              {brandMoment.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
              {brandMoment.title}
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {brandMoment.lead}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative mx-auto w-full max-w-md">
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 hidden rounded-[2.5rem] bg-brand-gradient opacity-20 blur-3xl sm:block"
              />
              <div className="overflow-hidden rounded-3xl border border-border shadow-xl">
                <Image
                  src={brandMoment.image}
                  alt={brandMoment.alt}
                  width={760}
                  height={951}
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
