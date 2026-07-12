"use client";

import * as React from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";

import { businessTypes } from "@/lib/content";
import {
  submitPartnerApplication,
  type PartnerActionState,
} from "@/app/actions";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialState: PartnerActionState = { status: "idle", message: "" };

const perks = [
  "Dedicated partner manager for every referral",
  "Free on-site IAQ consultation for your clients",
  "Co-branded marketing collateral & renders",
  "Structured referral rewards on every install",
];

export function PartnerForm() {
  const [state, formAction] = useActionState(
    submitPartnerApplication,
    initialState,
  );
  const [businessType, setBusinessType] = React.useState("");

  React.useEffect(() => {
    if (state.status === "success") {
      toast.success("Application received", { description: state.message });
    } else if (state.status === "error" && !state.fieldErrors) {
      toast.error("Something went wrong", { description: state.message });
    }
  }, [state]);

  const err = state.fieldErrors ?? {};

  return (
    <section
      id="become-partner"
      className="scroll-mt-24 border-t border-border bg-secondary/30 py-20 sm:py-28"
    >
      <div className="container-px mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Become a partner"
              title="Join the PureHabitat partner network."
              description="Tell us a little about your practice. Our partnerships team will reach out within two business days to get you set up."
            />
            <ul className="mt-8 space-y-3.5">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-teal" />
                  <span className="text-[15px] text-muted-foreground">{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={0.1}>
            {state.status === "success" ? (
              <SuccessCard message={state.message} />
            ) : (
              <form
                action={formAction}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
                noValidate
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" htmlFor="name" error={err.name}>
                    <Input id="name" name="name" placeholder="Jane Sharma" autoComplete="name" />
                  </Field>
                  <Field label="Company" htmlFor="company" error={err.company}>
                    <Input id="company" name="company" placeholder="Studio / firm name" autoComplete="organization" />
                  </Field>
                  <Field label="Email" htmlFor="email" error={err.email}>
                    <Input id="email" name="email" type="email" placeholder="you@studio.com" autoComplete="email" />
                  </Field>
                  <Field label="Phone" htmlFor="phone" error={err.phone}>
                    <Input id="phone" name="phone" type="tel" placeholder="+91 90000 00000" autoComplete="tel" />
                  </Field>
                  <Field label="Business type" htmlFor="businessType" error={err.businessType}>
                    <Select
                      name="businessType"
                      value={businessType}
                      onValueChange={setBusinessType}
                    >
                      <SelectTrigger id="businessType">
                        <SelectValue placeholder="Select your field" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="City" htmlFor="city" error={err.city}>
                    <Input id="city" name="city" placeholder="Mumbai" autoComplete="address-level2" />
                  </Field>
                  <Field
                    label="Website"
                    htmlFor="website"
                    optional
                    error={err.website}
                    className="sm:col-span-2"
                  >
                    <Input id="website" name="website" placeholder="https://studio.com" autoComplete="url" />
                  </Field>
                  <Field
                    label="Anything we should know?"
                    htmlFor="message"
                    optional
                    error={err.message}
                    className="sm:col-span-2"
                  >
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your practice or a project in mind…"
                    />
                  </Field>
                </div>

                <SubmitButton />

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  By submitting, you agree to be contacted about the PureHabitat
                  partner program.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  optional,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-center justify-between">
        <Label htmlFor={htmlFor}>{label}</Label>
        {optional && (
          <span className="text-xs text-muted-foreground">Optional</span>
        )}
      </div>
      {children}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="brand"
      size="lg"
      disabled={pending}
      className="mt-6 w-full"
    >
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Submitting…
        </>
      ) : (
        <>
          <Sparkles className="size-4" />
          Submit application
        </>
      )}
    </Button>
  );
}

function SuccessCard({ message }: { message: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
      <div className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <CheckCircle2 className="size-7 text-brand-teal" />
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">
        You&apos;re on the list
      </h3>
      <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
        {message}
      </p>
    </div>
  );
}
