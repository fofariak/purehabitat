"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Reveal-on-scroll without an animation library.
 *
 * A single IntersectionObserver toggles an `is-visible` class; the actual
 * animation is a plain CSS transition (see `.ph-reveal` in globals.css). This
 * keeps ~0 KB of JS on the wire compared with a motion library and stays cheap
 * on mobile because it only animates opacity + transform (compositor only).
 */
function useInView<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [inView]);

  return { ref, inView };
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn("ph-reveal", inView && "is-visible", className)}
      style={
        {
          "--ph-y": `${y}px`,
          transitionDelay: delay ? `${delay}s` : undefined,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

export function StaggerGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn("ph-stagger", inView && "is-visible", className)}
    >
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("ph-reveal", className)}>{children}</div>;
}
