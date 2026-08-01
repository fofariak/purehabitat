import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import { site, whatsappLink } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/logo";
import { WhatsAppIcon } from "@/components/whatsapp-button";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-28">
      <div className="container-px mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-12 lg:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 hidden size-64 rounded-full bg-brand-gradient opacity-[0.12] blur-3xl sm:block"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -left-16 hidden size-64 rounded-full bg-brand-gradient opacity-[0.1] blur-3xl sm:block"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
              <div>
                <LogoMark gradient className="size-12" />
                <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                  Let&apos;s bring clean air to your next space.
                </h2>
                <p className="mt-4 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
                  {site.tagline} Refer your clients and earn, or book a free
                  assessment for your own space — anywhere in India.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="brand" size="lg">
                    <Link href="#join">
                      Join the Referral Network
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" className="bg-[#25D366] text-white hover:bg-[#25D366]/90">
                    <a
                      href={whatsappLink(site.contacts[0].whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon className="size-5" />
                      Chat on WhatsApp
                    </a>
                  </Button>
                </div>
              </div>

              <div className="space-y-2 rounded-2xl border border-border bg-background/50 p-6">
                <p className="text-sm font-medium text-muted-foreground">
                  Talk to our team on WhatsApp
                </p>
                {site.contacts.map((c) => (
                  <a
                    key={c.tel}
                    href={whatsappLink(c.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-sm transition-colors hover:bg-secondary"
                  >
                    <WhatsAppIcon className="size-4 text-[#25D366]" />
                    <span className="font-medium">{c.name}</span>
                    <span className="text-muted-foreground">{c.phone}</span>
                  </a>
                ))}
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-sm transition-colors hover:bg-secondary"
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
