import * as React from "react";

import { cn } from "@/lib/utils";
import { site } from "@/lib/content";

type LogoMarkProps = React.SVGProps<SVGSVGElement> & {
  gradient?: boolean;
};

/**
 * PureHabitat brandmark — a leaf (fresh air) held within a circle (your space),
 * with an interior loop suggesting constant purification.
 */
export function LogoMark({ gradient = false, className, ...props }: LogoMarkProps) {
  const stroke = gradient ? "url(#ph-logo-gradient)" : "currentColor";
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label={`${site.name} logo`}
      className={cn("size-8", className)}
      {...props}
    >
      {gradient && (
        <defs>
          <linearGradient id="ph-logo-gradient" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
            {/*
              Set via `style`, not the stop-color attribute: var() is unreliable
              inside SVG presentation attributes, which silently drops the
              gradient (and so the whole mark) in some browsers.
            */}
            <stop style={{ stopColor: "var(--brand-blue, #1B5BFF)" }} />
            <stop offset="1" style={{ stopColor: "var(--brand-teal, #14C08A)" }} />
          </linearGradient>
        </defs>
      )}
      <g
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="24" cy="24" r="20.5" />
        {/* Upper leaf (fresh air) crossing the lower loop to form the mark */}
        <path d="M24 5C15.2 13 15.2 26 24 32.5C32.8 26 32.8 13 24 5Z" />
        {/* Lower loop (constant purification) */}
        <path d="M24 20.5C14.3 27.5 14.3 40 24 44.5C33.7 40 33.7 27.5 24 20.5Z" />
        {/* Center vein */}
        <path d="M24 5V44.5" />
      </g>
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
  showText = true,
}: {
  className?: string;
  markClassName?: string;
  showText?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark gradient className={cn("size-8 text-foreground", markClassName)} />
      {showText && (
        <span className="font-display text-lg font-semibold tracking-tight text-foreground">
          Pure<span className="text-gradient">Habitat</span>
        </span>
      )}
    </span>
  );
}
