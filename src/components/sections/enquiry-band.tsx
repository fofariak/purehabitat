import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { routes, technologyPage } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

/**
 * Closing hand-off on /technology. The form itself stays on home — one form,
 * one place, so there is never a question of which submission went where.
 */
export function EnquiryBand() {
  const { backLink } = technologyPage;

  return (
    <section className="border-t border-border py-16 sm:py-24">
      <div className="container-px mx-auto max-w-6xl">
        <Reveal>
          <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm sm:p-12">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl">
              {backLink.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              {backLink.body}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="brand" size="lg">
                <Link href={routes.join}>
                  Join the Referral Network
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={routes.assessment}>
                  <Sparkles className="size-4" />
                  Book a free assessment
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
