import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { routes } from "@/lib/content";

/** Compact header for secondary pages — same brand wash as home, half the height. */
export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="relative overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-fade opacity-60" />
        <div className="absolute -left-[10%] top-[-25%] hidden h-[420px] w-[420px] rounded-full bg-brand-blue/20 blur-[90px] sm:block" />
        <div className="absolute -right-[8%] top-[-15%] hidden h-[380px] w-[380px] rounded-full bg-brand-teal/20 blur-[90px] sm:block" />
      </div>

      <div className="container-px mx-auto max-w-6xl">
        <Link
          href={routes.home}
          className="ph-in inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>

        <p
          className="ph-in mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal"
          style={{ animationDelay: "0.06s" }}
        >
          {eyebrow}
        </p>
        <h1
          className="ph-in mt-4 max-w-3xl font-display text-[2.15rem] font-semibold leading-[1.05] tracking-[-0.035em] text-balance sm:text-[3rem] md:text-[3.5rem]"
          style={{ animationDelay: "0.1s" }}
        >
          {title}
        </h1>
        <p
          className="ph-in mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          style={{ animationDelay: "0.16s" }}
        >
          {lead}
        </p>
      </div>
    </section>
  );
}
