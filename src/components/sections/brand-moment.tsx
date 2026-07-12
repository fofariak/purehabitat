import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { brandMoment } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export function BrandMoment() {
  return (
    <section className="scroll-mt-24 border-y border-border bg-secondary/30 py-16 sm:py-28">
      <div className="container-px mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
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

            <ul className="mt-7 grid max-w-md grid-cols-2 gap-3">
              {brandMoment.pillars.map((pillar) => (
                <li key={pillar} className="flex items-center gap-2.5 text-sm font-medium">
                  <span className="flex size-5 items-center justify-center rounded-full bg-brand-teal/15 text-brand-teal">
                    <Check className="size-3" strokeWidth={2.5} />
                  </span>
                  {pillar}
                </li>
              ))}
            </ul>

            <Button asChild variant="brand" size="lg" className="mt-8">
              <Link href="#become-partner">
                Become a partner
                <ArrowRight className="size-4" />
              </Link>
            </Button>
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
