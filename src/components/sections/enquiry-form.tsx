"use client";

import * as React from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { ArrowRight, Building2, CheckCircle2, Home, Loader2 } from "lucide-react";

import { professions, spaceTypes, tracks } from "@/lib/content";
import { cn } from "@/lib/utils";
import { submitEnquiry, type EnquiryActionState } from "@/app/actions";
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

type Mode = "refer" | "own";

const initialState: EnquiryActionState = { status: "idle", message: "" };

const copy = {
  refer: {
    eyebrow: "Join the Referral Network",
    title: "Specify clean air into your next project.",
    description:
      "Tell us a little about your practice. Our team reaches out within two business days — free to join, no targets, and your client relationship stays yours.",
    perks: tracks.refer.points,
    submit: "Join the Referral Network",
  },
  own: {
    eyebrow: "Book a free assessment",
    title: "Find out what you're actually breathing.",
    description:
      "Tell us about your space and we'll arrange a free on-site Indoor Air Quality assessment — measured in your own home, gym, school or clinic. No cost, no obligation.",
    perks: tracks.own.points,
    submit: "Book my free assessment",
  },
} as const;

export function EnquiryForm() {
  const [state, formAction] = useActionState(submitEnquiry, initialState);
  const [mode, setMode] = React.useState<Mode>("refer");
  const [choice, setChoice] = React.useState("");

  // The two track CTAs deep-link into this one section: #join opens the
  // professional branch, #assessment opens the own-space branch.
  React.useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#assessment") setMode("own");
      else if (window.location.hash === "#join") setMode("refer");
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  React.useEffect(() => {
    if (state.status === "success") {
      toast.success("Got it — we'll be in touch", { description: state.message });
    } else if (state.status === "error" && !state.fieldErrors) {
      toast.error("Something went wrong", { description: state.message });
    }
  }, [state]);

  const switchMode = (next: Mode) => {
    setMode(next);
    setChoice("");
  };

  const text = copy[mode];
  const err = state.fieldErrors ?? {};

  return (
    <section
      id="join"
      className="scroll-mt-24 border-t border-border bg-secondary/30 py-16 sm:py-28"
    >
      {/* Second anchor so "Book a free assessment" lands on the own-space branch. */}
      <span id="assessment" aria-hidden className="block scroll-mt-24" />

      <div className="container-px mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow={text.eyebrow}
              title={text.title}
              description={text.description}
            />
            <ul className="mt-8 space-y-3.5">
              {text.perks.map((perk) => (
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
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
                <ModeSwitch mode={mode} onChange={switchMode} />

                {/* Keyed on mode so switching branches clears the previous inputs. */}
                <form key={mode} action={formAction} className="mt-6" noValidate>
                  <input type="hidden" name="enquiryType" value={mode} />
                  {/* Honeypot — hidden from people, irresistible to bots. */}
                  <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="company_website">Do not fill this in</label>
                    <input
                      id="company_website"
                      name="company_website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" htmlFor="name" error={err.name}>
                      <Input id="name" name="name" placeholder="Jane Sharma" autoComplete="name" />
                    </Field>

                    {mode === "refer" ? (
                      <Field label="Company" htmlFor="company" error={err.company}>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Studio / firm name"
                          autoComplete="organization"
                        />
                      </Field>
                    ) : (
                      <Field label="Type of space" htmlFor="spaceType" error={err.spaceType}>
                        <Select name="spaceType" value={choice} onValueChange={setChoice}>
                          <SelectTrigger id="spaceType">
                            <SelectValue placeholder="Home, gym, school…" />
                          </SelectTrigger>
                          <SelectContent>
                            {spaceTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    )}

                    <Field label="Email" htmlFor="email" error={err.email}>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                    </Field>
                    <Field label="Phone" htmlFor="phone" error={err.phone}>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 90000 00000"
                        autoComplete="tel"
                      />
                    </Field>

                    {mode === "refer" ? (
                      <Field label="Profession" htmlFor="profession" error={err.profession}>
                        <Select name="profession" value={choice} onValueChange={setChoice}>
                          <SelectTrigger id="profession">
                            <SelectValue placeholder="Select your field" />
                          </SelectTrigger>
                          <SelectContent>
                            {professions.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    ) : (
                      <Field
                        label="Approx. area"
                        htmlFor="areaSqft"
                        optional
                        error={err.areaSqft}
                      >
                        <Input
                          id="areaSqft"
                          name="areaSqft"
                          inputMode="numeric"
                          placeholder="2500 sq.ft"
                        />
                      </Field>
                    )}

                    <Field label="City" htmlFor="city" error={err.city}>
                      <Input
                        id="city"
                        name="city"
                        placeholder="Mumbai"
                        autoComplete="address-level2"
                      />
                    </Field>

                    {mode === "refer" && (
                      <Field
                        label="Website"
                        htmlFor="website"
                        optional
                        error={err.website}
                        className="sm:col-span-2"
                      >
                        <Input
                          id="website"
                          name="website"
                          placeholder="https://studio.com"
                          autoComplete="url"
                        />
                      </Field>
                    )}

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
                        placeholder={
                          mode === "refer"
                            ? "Tell us about your practice or a project in mind…"
                            : "Tell us about your space — floors, rooms, current air-quality concerns…"
                        }
                      />
                    </Field>
                  </div>

                  <SubmitButton label={text.submit} />

                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    By submitting, you agree to be contacted about your enquiry.
                    We install and service across India.
                  </p>
                </form>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ModeSwitch({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (next: Mode) => void;
}) {
  const options = [
    { key: "refer" as const, label: "For my clients", icon: Building2 },
    { key: "own" as const, label: "For my own space", icon: Home },
  ];

  return (
    <div
      role="tablist"
      aria-label="What are you here for?"
      className="grid grid-cols-2 gap-1 rounded-full border border-border bg-secondary/60 p-1"
    >
      {options.map((opt) => {
        const active = mode === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.key)}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-full px-3 py-2.5 text-sm font-medium transition-all duration-200",
              active
                ? "bg-brand-gradient text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <opt.icon className="size-4" />
            {opt.label}
          </button>
        );
      })}
    </div>
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
        {optional && <span className="text-xs text-muted-foreground">Optional</span>}
      </div>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function SubmitButton({ label }: { label: string }) {
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
          Sending…
        </>
      ) : (
        <>
          {label}
          <ArrowRight className="size-4" />
        </>
      )}
    </Button>
  );
}

function SuccessCard({ message }: { message: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
      <div className="flex size-14 items-center justify-center rounded-full bg-accent">
        <CheckCircle2 className="size-7 text-brand-teal" />
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">
        Thanks — we&apos;ve got your details
      </h3>
      <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
        {message}
      </p>
    </div>
  );
}
