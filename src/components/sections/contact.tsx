import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";

import { site } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/logo";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-px mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-12 lg:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-brand-gradient opacity-[0.12] blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -left-16 size-64 rounded-full bg-brand-gradient opacity-[0.1] blur-3xl"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
              <div>
                <LogoMark gradient className="size-12" />
                <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                  Let&apos;s bring clean air to your next project.
                </h2>
                <p className="mt-4 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
                  {site.tagline} Partner with PureHabitat and give every client a
                  home that genuinely breathes better.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="brand" size="lg">
                    <Link href="#become-partner">
                      Become a partner
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="#book-demo">Book a demo</Link>
                  </Button>
                </div>
              </div>

              <div className="space-y-3 rounded-2xl border border-border bg-background/50 p-6">
                <p className="text-sm font-medium text-muted-foreground">
                  Talk to our team
                </p>
                {site.contacts.map((c) => (
                  <a
                    key={c.tel}
                    href={`tel:${c.tel}`}
                    className="flex items-center gap-3 rounded-xl px-2 py-2 text-sm transition-colors hover:bg-secondary"
                  >
                    <Phone className="size-4 text-brand-teal" />
                    <span className="font-medium">{c.name}</span>
                    <span className="text-muted-foreground">{c.phone}</span>
                  </a>
                ))}
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 rounded-xl px-2 py-2 text-sm transition-colors hover:bg-secondary"
                >
                  <Mail className="size-4 text-brand-teal" />
                  <span className="text-muted-foreground">{site.email}</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
