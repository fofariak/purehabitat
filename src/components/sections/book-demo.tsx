"use client";

import * as React from "react";
import Script from "next/script";
import { CalendarClock, Mail, Phone, Video } from "lucide-react";

import { site } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL;

export function BookDemo() {
  return (
    <section id="book-demo" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Book a demo"
          title="See the Clean Air Bubble in action."
          description="Schedule a walkthrough with our team — or arrange a free on-site Indoor Air Quality (IAQ) consultation for one of your projects."
        />

        <Reveal className="mt-14">
          {CALENDLY_URL ? (
            <CalendlyEmbed url={CALENDLY_URL} />
          ) : (
            <BookingFallback />
          )}
        </Reveal>
      </div>
    </section>
  );
}

function CalendlyEmbed({ url }: { url: string }) {
  return (
    <>
      <div
        className="calendly-inline-widget overflow-hidden rounded-2xl border border-border bg-card"
        data-url={url}
        style={{ minWidth: "320px", height: "720px" }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}

function BookingFallback() {
  return (
    <div className="grid gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm md:grid-cols-2 md:p-10">
      <div>
        <div className="flex size-12 items-center justify-center rounded-2xl bg-brand-gradient text-white">
          <Video className="size-6" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">
          Let&apos;s find a time that works.
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          Pick a slot that suits you and we&apos;ll walk you through the product,
          the partner program and answer any technical questions. Prefer to talk
          now? Reach us directly below.
        </p>

        <div className="mt-6 space-y-3">
          {site.contacts.map((c) => (
            <a
              key={c.tel}
              href={`tel:${c.tel}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-background/50 px-4 py-3 text-sm transition-colors hover:bg-secondary"
            >
              <Phone className="size-4 text-brand-teal" />
              <span className="font-medium">{c.name}</span>
              <span className="text-muted-foreground">{c.phone}</span>
            </a>
          ))}
          <a
            href={`mailto:${site.email}?subject=Book a PureHabitat demo`}
            className="flex items-center gap-3 rounded-xl border border-border bg-background/50 px-4 py-3 text-sm transition-colors hover:bg-secondary"
          >
            <Mail className="size-4 text-brand-teal" />
            <span className="text-muted-foreground">{site.email}</span>
          </a>
        </div>
      </div>

      <div className="flex flex-col justify-center rounded-2xl border border-dashed border-border bg-secondary/40 p-8 text-center">
        <CalendarClock className="mx-auto size-10 text-primary" />
        <h4 className="mt-4 font-display text-lg font-semibold tracking-tight">
          Instant scheduling
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Live scheduling opens here once connected. In the meantime, request a
          slot in one tap and we&apos;ll confirm by email.
        </p>
        <Button asChild variant="brand" size="lg" className="mt-6">
          <a href={`mailto:${site.email}?subject=Request a PureHabitat demo`}>
            <CalendarClock className="size-4" />
            Request a demo slot
          </a>
        </Button>
      </div>
    </div>
  );
}
