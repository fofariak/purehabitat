import { Check, Minus, Wind } from "lucide-react";

import {
  comparison,
  techSpecs,
  verifiedResults,
  yogaBenefits,
} from "@/lib/content";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function WhyYoga() {
  return (
    <section
      id="why-yoga"
      className="scroll-mt-24 border-y border-border bg-secondary/30 py-20 sm:py-28"
    >
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Why YOGa Clean Air"
          title={
            <>
              India&apos;s first clean air bubble — <br className="hidden sm:block" />
              engineered for every space.
            </>
          }
          description="Unlike room purifiers that recycle stale air, the Y-CAB system draws in fresh filtered outdoor air at positive pressure — solving PM2.5 and CO₂ buildup at the same time."
        />

        {/* Core benefits */}
        <StaggerGroup className="mt-14 grid gap-5 md:grid-cols-2">
          {yogaBenefits.map((b) => (
            <StaggerItem key={b.title}>
              <Card className="flex h-full gap-4 p-6">
                <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white">
                  <Check className="size-4" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {b.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                    {b.body}
                  </p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Verified results */}
        <Reveal className="mt-16">
          <div className="mb-6 flex items-center gap-2">
            <Badge variant="brand">Verified · IIT Delhi study</Badge>
            <span className="text-sm text-muted-foreground">
              Real installations, real measured data
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {verifiedResults.map((r) => (
              <div
                key={r.place}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <p className="font-display text-3xl font-semibold tracking-tight text-gradient">
                  {r.indoor}
                </p>
                <p className="mt-1 text-sm font-medium text-brand-teal">
                  {r.reduction} reduction
                </p>
                <p className="mt-3 text-sm font-medium">{r.place}</p>
                <p className="text-xs text-muted-foreground">{r.outside}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Comparison */}
        <Reveal className="mt-16">
          <h3 className="font-display text-2xl font-semibold tracking-tight">
            Room purifier vs ERV vs Y-CAB
          </h3>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Standard room purifiers and Western ERVs fall short in Indian
            conditions. Here is how the Y-CAB system is engineered differently.
          </p>
          <ComparisonTable />
        </Reveal>

        {/* Tech specs */}
        <Reveal className="mt-16">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Wind className="size-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  Y-CAB technical specifications
                </h3>
                <p className="text-sm text-muted-foreground">
                  Pure passive filtration — no ozone, no ionization.
                </p>
              </div>
            </div>
            <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {techSpecs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-3"
                >
                  <dt className="text-sm text-muted-foreground">{spec.label}</dt>
                  <dd className="text-right text-sm font-medium">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ComparisonTable() {
  return (
    <>
      {/* Desktop table */}
      <div className="mt-8 hidden overflow-hidden rounded-2xl border border-border md:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-secondary/60">
              <th className="w-[24%] p-4 font-medium text-muted-foreground">
                Feature
              </th>
              <th className="p-4 font-medium text-muted-foreground">
                {comparison.columns[0]}
              </th>
              <th className="p-4 font-medium text-muted-foreground">
                {comparison.columns[1]}
              </th>
              <th className="relative p-4 font-semibold text-primary">
                <span className="inline-flex items-center gap-2">
                  {comparison.columns[2]}
                  <span className="rounded-full bg-brand-gradient px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                    Best
                  </span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row, i) => (
              <tr
                key={row.feature}
                className={cn(i % 2 === 1 && "bg-secondary/20")}
              >
                <td className="p-4 align-top font-medium">{row.feature}</td>
                <td className="p-4 align-top text-muted-foreground">
                  <span className="inline-flex items-start gap-2">
                    <Minus className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" />
                    {row.purifier}
                  </span>
                </td>
                <td className="p-4 align-top text-muted-foreground">
                  <span className="inline-flex items-start gap-2">
                    <Minus className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" />
                    {row.erv}
                  </span>
                </td>
                <td className="bg-accent/40 p-4 align-top font-medium text-foreground">
                  <span className="inline-flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-teal" />
                    {row.ycab}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="mt-8 space-y-4 md:hidden">
        {comparison.rows.map((row) => (
          <div
            key={row.feature}
            className="overflow-hidden rounded-2xl border border-border bg-card"
          >
            <p className="border-b border-border bg-secondary/50 px-4 py-3 font-medium">
              {row.feature}
            </p>
            <div className="divide-y divide-border">
              <MobileRow label={comparison.columns[0]} value={row.purifier} />
              <MobileRow label={comparison.columns[1]} value={row.erv} />
              <MobileRow
                label={comparison.columns[2]}
                value={row.ycab}
                highlight
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function MobileRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className={cn("flex gap-3 px-4 py-3", highlight && "bg-accent/40")}>
      {highlight ? (
        <Check className="mt-0.5 size-4 shrink-0 text-brand-teal" />
      ) : (
        <Minus className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" />
      )}
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className={cn("text-sm", highlight ? "font-medium" : "text-muted-foreground")}>
          {value}
        </p>
      </div>
    </div>
  );
}
