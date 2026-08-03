"use client";

import * as React from "react";
import Image from "next/image";
import { MapPin, Play } from "lucide-react";

import { projects } from "@/lib/content";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

/**
 * Video source resolution (first match wins):
 *   1. NEXT_PUBLIC_SHOWCASE_YOUTUBE_ID / projects.youtubeId → YouTube embed
 *   2. NEXT_PUBLIC_SHOWCASE_VIDEO_URL                       → direct .mp4 URL
 *   3. projects.videoSrc                                    → public/video/
 *
 * Nothing third-party loads until the visitor actually presses play.
 */
const YOUTUBE_ID =
  process.env.NEXT_PUBLIC_SHOWCASE_YOUTUBE_ID || projects.youtubeId;
const VIDEO_URL = process.env.NEXT_PUBLIC_SHOWCASE_VIDEO_URL || projects.videoSrc;

const IS_PORTRAIT = projects.videoOrientation === "portrait";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-16 sm:py-28">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={projects.eyebrow}
          title={projects.title}
          description={projects.lead}
        />

        {/* A vertical video sits beside the proof points rather than above
            them — full width, a 9:16 frame would be absurdly tall. */}
        <div
          className={cn(
            "mt-14",
            IS_PORTRAIT
              ? "grid items-center gap-8 lg:grid-cols-[minmax(0,330px)_1fr] lg:gap-12"
              : "space-y-6",
          )}
        >
          <Reveal>
            <Player />
          </Reveal>

          <Reveal delay={0.1}>
            <dl
              className={cn(
                "grid gap-px overflow-hidden rounded-2xl border border-border bg-border",
                IS_PORTRAIT ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-4",
              )}
            >
              {projects.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card p-5 text-center transition-colors duration-300 hover:bg-secondary/50 sm:p-6"
                >
                  <dd className="font-display text-2xl font-semibold tracking-[-0.03em] text-gradient sm:text-3xl">
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
    <div className={cn("relative", IS_PORTRAIT && "mx-auto w-full max-w-[330px]")}>
      {/* Ambient glow behind the frame (desktop only — cheap paint on mobile) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 hidden rounded-[2.5rem] bg-brand-gradient opacity-20 blur-3xl sm:block"
      />

      <div
        className={cn(
          "relative overflow-hidden rounded-3xl border border-border bg-brand-navy shadow-xl",
          IS_PORTRAIT ? "aspect-[9/16]" : "aspect-video",
        )}
      >
        {playing ? (
          YOUTUBE_ID ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
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

            {IS_PORTRAIT ? (
              <>
                {/*
                  The poster is a landscape still, so centre-cropping it into a
                  9:16 frame would slice the sides off the meter. Letterbox the
                  sharp copy over a blurred fill instead — the treatment every
                  video app uses for mismatched aspect ratios.
                */}
                <Image
                  src={projects.videoPoster}
                  alt=""
                  aria-hidden
                  fill
                  sizes="330px"
                  className="scale-110 object-cover opacity-40 blur-2xl"
                />
                <Image
                  src={projects.videoPoster}
                  alt=""
                  aria-hidden
                  fill
                  sizes="330px"
                  className="object-contain"
                />
              </>
            ) : (
              <Image
                src={projects.videoPoster}
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            )}

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

            <span className="absolute inset-x-5 bottom-5 text-left sm:bottom-6">
              <span className="block font-display text-base font-semibold text-white sm:text-lg">
                Inside a completed installation
              </span>
              <span className="mt-1 flex items-center gap-1 text-xs text-white/70 sm:text-sm">
                <MapPin className="size-3.5 shrink-0" />
                Installed and serviced across India
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
