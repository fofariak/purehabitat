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
      <circle cx="24" cy="24" r="21" stroke={stroke} strokeWidth="1.75" />
      <path
        d="M24 4C36 13 36 35 24 44"
        stroke={stroke}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M24 4C12 13 12 35 24 44"
        stroke={stroke}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path d="M24 4V44" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" />
      <path
        d="M15 24C18.5 21 29.5 21 33 24"
        stroke={stroke}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
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
