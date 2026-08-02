"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { nav, routes } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * Floating pill navbar: flush and transparent at the top of the page, then it
 * detaches into a glass pill once you scroll. Keeps the hero uncluttered while
 * giving the nav a clear surface over the busy sections further down.
 */
export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the drawer if the viewport grows past the mobile breakpoint.
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto transition-all duration-500 ease-out",
          scrolled ? "max-w-5xl px-3 pt-3" : "max-w-6xl px-0 pt-0",
        )}
      >
        <nav
          className={cn(
            "flex items-center justify-between transition-all duration-500 ease-out",
            scrolled
              ? "h-14 rounded-full border border-border/70 glass px-3 shadow-lg shadow-brand-navy/5 sm:px-4"
              : "container-px h-16 border border-transparent",
          )}
        >
          <Link
            href="/"
            className="shrink-0 rounded-full transition-opacity hover:opacity-80"
            aria-label="PureHabitat home"
          >
            <Logo />
          </Link>

          <div className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
              <Link href={routes.assessment}>Free assessment</Link>
            </Button>
            <Button asChild variant="brand" size="sm" className="hidden sm:inline-flex">
              <Link href={routes.join}>Refer &amp; earn</Link>
            </Button>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              className="inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary lg:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer — floats as its own card under the pill */}
        <div
          className={cn(
            "overflow-hidden transition-[max-height,opacity,margin] duration-300 lg:hidden",
            open ? "mt-2 max-h-[80vh] opacity-100" : "mt-0 max-h-0 opacity-0",
            scrolled ? "" : "mx-4",
          )}
        >
          <div className="flex flex-col gap-1 rounded-3xl border border-border/70 glass p-3 shadow-xl shadow-brand-navy/10">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-medium text-foreground/90 transition-colors hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button asChild variant="outline" onClick={() => setOpen(false)}>
                <Link href={routes.assessment}>Book a free assessment</Link>
              </Button>
              <Button asChild variant="brand" onClick={() => setOpen(false)}>
                <Link href={routes.join}>Join the Referral Network</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
