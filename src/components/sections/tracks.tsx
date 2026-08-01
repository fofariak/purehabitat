import Link from "next/link";
import { ArrowRight, Building2, Check, Home } from "lucide-react";

import { tracks } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/reveal";
import { Button } from "@/components/ui/button";

/**
 * The primary fork in the page.
 *
 * Professionals earn a referral reward; end clients can't be given one, so they
 * get a free on-site assessment instead. Keeping both visible up front means a
 * gym owner or school never has to read referral copy to find their own path.
 */
export function Tracks() {
  return (
    <section id="work-with-us" className="scroll-mt-24 py-16 sm:py-28">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={tracks.eyebrow}
          title={tracks.title}
          description={tracks.lead}
        />

        <StaggerGroup className="mt-14 grid gap-5 lg:grid-cols-2 lg:gap-6">
          <StaggerItem className="h-full">
            <TrackCard track={tracks.refer} icon={Building2} featured />
          </StaggerItem>
          <StaggerItem className="h-full">
            <TrackCard track={tracks.own} icon={Home} />
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}

type Track = {
  kicker: string;
  title: string;
  body: string;
  points: readonly string[];
  cta: string;
  href: string;
};

function TrackCard({
  track,
  icon: Icon,
  featured = false,
}: {
  track: Track;
  icon: typeof Building2;
  featured?: boolean;
}) {
  return (
    <div
      className={
        featured
          ? "relative flex h-full flex-col overflow-hidden rounded-3xl border border-brand-navy/20 bg-brand-navy p-8 text-white shadow-xl sm:p-10"
          : "lift relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-10"
      }
    >
      {featured && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(45% 55% at 15% 0%, color-mix(in srgb, var(--brand-blue) 50%, transparent), transparent 70%), radial-gradient(50% 60% at 95% 100%, color-mix(in srgb, var(--brand-teal) 42%, transparent), transparent 70%)",
          }}
        />
      )}

      <div className="relative flex flex-1 flex-col">
        <div className="flex items-center gap-3">
          <div
            className={
              featured
                ? "flex size-11 items-center justify-center rounded-xl border border-white/15 bg-white/10"
                : "flex size-11 items-center justify-center rounded-xl bg-brand-gradient text-white"
            }
          >
            <Icon className="size-5" />
          </div>
          <span
            className={
              featured
                ? "text-xs font-semibold uppercase tracking-[0.16em] text-brand-mint"
                : "text-xs font-semibold uppercase tracking-[0.16em] text-brand-teal"
            }
          >
            {track.kicker}
          </span>
        </div>

        <h3 className="mt-6 font-display text-2xl font-semibold leading-tight tracking-tight text-balance sm:text-[1.75rem]">
          {track.title}
        </h3>
        <p
          className={
            featured
              ? "mt-3 text-[15px] leading-relaxed text-white/70"
              : "mt-3 text-[15px] leading-relaxed text-muted-foreground"
          }
        >
          {track.body}
        </p>

        <ul className="mt-7 space-y-3">
          {track.points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span
                className={
                  featured
                    ? "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-mint/15 text-brand-mint"
                    : "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-brand-teal"
                }
              >
                <Check className="size-3" strokeWidth={3} />
              </span>
              <span
                className={
                  featured
                    ? "text-[15px] text-white/85"
                    : "text-[15px] text-foreground/85"
                }
              >
                {point}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-9">
          <Button
            asChild
            size="lg"
            variant={featured ? "default" : "brand"}
            className={
              featured
                ? "w-full bg-white text-brand-navy hover:bg-white/90 sm:w-auto"
                : "w-full sm:w-auto"
            }
          >
            <Link href={track.href}>
              {track.cta}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
