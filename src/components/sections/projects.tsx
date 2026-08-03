"use client";

import * as React from "react";
import Image from "next/image";
import { MapPin, Play } from "lucide-react";

import { projects } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

/**
 * Video source resolution (first match wins):
 *   1. NEXT_PUBLIC_SHOWCASE_YOUTUBE_ID → click-to-load YouTube embed
 *   2. NEXT_PUBLIC_SHOWCASE_VIDEO_URL  → any direct .mp4 URL (CDN / Supabase)
 *   3. projects.videoSrc               → self-hosted file in public/video/
 *
 * Nothing third-party loads until the visitor actually presses play.
 */
const YOUTUBE_ID = process.env.NEXT_PUBLIC_SHOWCASE_YOUTUBE_ID;
const VIDEO_URL = process.env.NEXT_PUBLIC_SHOWCASE_VIDEO_URL || projects.videoSrc;

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-16 sm:py-28">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={projects.eyebrow}
          title={projects.title}
          description={projects.lead}
        />

        <Reveal className="mt-14">
          <Player />
        </Reveal>

        {/* Proof strip */}
        <Reveal className="mt-6">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
            {projects.stats.map((stat) => (
              <div key={stat.label} className="bg-card p-5 text-center sm:p-6">
                <dd className="font-display text-2xl font-semibold tracking-tight text-gradient sm:text-3xl">
                  {stat.value}
                </dd>
                <dt className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <CityMarquee />
    </section>
  );
}

function Player() {
  const [playing, setPlaying] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const start = () => {
    setPlaying(true);
    // Self-hosted: the <video> mounts already-playing via autoPlay, but Safari
    // occasionally ignores it on first paint — nudge it on the next frame.
    requestAnimationFrame(() => void videoRef.current?.play().catch(() => {}));
  };

  return (
    <div className="relative">
      {/* Ambient glow behind the frame (desktop only — cheap paint on mobile) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 hidden rounded-[2.5rem] bg-brand-gradient opacity-20 blur-3xl sm:block"
      />

      <div className="relative aspect-video overflow-hidden rounded-3xl border border-border bg-brand-navy shadow-xl">
        {playing ? (
          YOUTUBE_ID ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1`}
              title={projects.videoLabel}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="size-full"
            />
          ) : (
            <video
              ref={videoRef}
              src={VIDEO_URL}
              poster={projects.videoPoster}
              controls
              autoPlay
              playsInline
              preload="metadata"
              aria-label={projects.videoLabel}
              className="size-full object-cover"
            >
              Your browser does not support embedded video.
            </video>
          )
        ) : (
          <button
            type="button"
            onClick={start}
            aria-label={`Play: ${projects.videoLabel}`}
            className="group absolute inset-0 size-full cursor-pointer"
          >
            {/* Branded fallback — shows through if the poster is missing */}
            <span
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(45% 60% at 20% 15%, color-mix(in srgb, var(--brand-blue) 55%, transparent), transparent 70%), radial-gradient(50% 65% at 85% 90%, color-mix(in srgb, var(--brand-teal) 45%, transparent), transparent 70%)",
              }}
            />
            {/* next/image rather than a CSS background: the poster is a photo,
                so it is worth the AVIF/WebP conversion and responsive sizing. */}
            <Image
              src={projects.videoPoster}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority={false}
            />
            {/* Lighter at the centre so the meter reading stays legible */}
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-brand-navy/5 to-brand-navy/30"
            />

            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-20 items-center justify-center rounded-full border border-white/25 bg-white/15 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 sm:size-24">
                <Play className="ml-1 size-8 fill-white text-white sm:size-9" />
              </span>
            </span>

            <span className="absolute inset-x-5 bottom-5 text-left sm:inset-x-8 sm:bottom-7">
              <span className="block font-display text-lg font-semibold text-white sm:text-xl">
                Inside a completed installation
              </span>
              <span className="mt-1 block text-sm text-white/70">
                Watch the walkthrough ·
                {" "}
                <span className="inline-flex items-center gap-1 align-middle">
                  <MapPin className="size-3.5" />
                  Installed and serviced across India
                </span>
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

/** Coverage band — where we install and service. Duplicated once for a seamless loop. */
function CityMarquee() {
  return (
    <div className="mt-14 border-y border-border bg-secondary/30 py-5 sm:mt-20">
      <p className="container-px mx-auto max-w-6xl text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Installation &amp; service across India
      </p>
      <div
        className="group relative mt-4 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        {/* Two identical passes, each with a trailing gap, so translateX(-50%) lands seamlessly. */}
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].map((pass) => (
            <div key={pass} className="flex shrink-0 items-center gap-8 pr-8">
              {projects.cities.map((city) => (
                <span
                  key={city}
                  aria-hidden={pass === 1}
                  className="flex shrink-0 items-center gap-2 font-display text-lg font-medium text-muted-foreground sm:text-xl"
                >
                  <span className="size-1.5 rounded-full bg-brand-gradient" />
                  {city}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
