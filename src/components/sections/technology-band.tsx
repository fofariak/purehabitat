import Link from "next/link";
import { ArrowRight, BarChart3, FileText, FlaskConical } from "lucide-react";

import { routes, technologyPage } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

const highlights = [
  { icon: FlaskConical, label: "IIT Delhi verified results" },
  { icon: BarChart3, label: "Purifier vs ERV vs Y-CAB" },
  { icon: FileText, label: "Full specs & brochure" },
];

/** Home-page hand-off to /technology, where the heavy evidence now lives. */
export function TechnologyBand() {
  const { crossLink } = technologyPage;

  return (
    <section className="py-16 sm:py-24">
      <div className="container-px mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-brand-navy/20 bg-brand-navy p-8 text-white shadow-xl sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(45% 60% at 12% 0%, color-mix(in srgb, var(--brand-blue) 48%, transparent), transparent 70%), radial-gradient(50% 65% at 92% 100%, color-mix(in srgb, var(--brand-teal) 42%, transparent), transparent 70%)",
              }}
            />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-mint">
                  {crossLink.eyebrow}
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl">
                  {crossLink.title}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-white/70">
                  {crossLink.body}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {highlights.map((item) => (
                    <li
                      key={item.label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-sm text-white/85"
                    >
                      <item.icon className="size-4 text-brand-mint" />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                asChild
                size="lg"
                className="shrink-0 bg-white text-brand-navy hover:bg-white/90"
              >
                <Link href={routes.technology}>
                  {crossLink.cta}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
