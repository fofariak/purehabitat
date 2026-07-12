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
            <stop stopColor="var(--brand-blue)" />
            <stop offset="1" stopColor="var(--brand-teal)" />
          </linearGradient>
        </defs>
      )}
      <g
        stroke={stroke}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="24" cy="24" r="20.5" />
        {/* Upper leaf (fresh air) */}
        <path d="M24 5C31.5 11.5 31.5 19 24 23.7C16.5 19 16.5 11.5 24 5Z" />
        {/* Lower loop (constant purification) */}
        <path d="M24 24.3C32.5 28.5 32.5 39 24 43C15.5 39 15.5 28.5 24 24.3Z" />
        {/* Center vein */}
        <path d="M24 5V43" />
        {/* Leaf tip detail */}
        <path d="M19.6 15L24 10.2L28.4 15" />
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
