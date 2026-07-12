import Link from "next/link";
import { ArrowUpRight, Download, FileText } from "lucide-react";

import { resources } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/reveal";

export function Resources() {
  return (
    <section id="resources" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Resources"
          title="Everything you need to share with a client."
          description="Download-ready collateral and reference material to help you present YOGa Clean Air with confidence."
        />

        <StaggerGroup className="mt-14 grid gap-5 md:grid-cols-3">
          {resources.map((res) => (
            <StaggerItem key={res.title}>
              <Link
                href={res.href}
                {...(res.download
                  ? { download: true, target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <FileText className="size-5" />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    {res.kind}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                  {res.title}
                </h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                  {res.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  {res.download ? (
                    <Download className="size-4" />
                  ) : (
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                  {res.cta}
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
