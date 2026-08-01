"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { enquirySchema } from "@/lib/validations";

export type EnquiryActionState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string>;
};

const SUCCESS_COPY = {
  refer: "You're in. Our team will reach out within two business days with your onboarding kit and referral details.",
  own: "Thanks! We'll call you within two business days to schedule your free on-site air-quality assessment.",
} as const;

export async function submitEnquiry(
  _prev: EnquiryActionState,
  formData: FormData,
): Promise<EnquiryActionState> {
  // Honeypot — real users never see or fill this field.
  if (String(formData.get("company_website") ?? "").trim() !== "") {
    return { status: "success", message: SUCCESS_COPY.refer };
  }

  const enquiryType = formData.get("enquiryType") === "own" ? "own" : "refer";

  const raw = {
    enquiryType,
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    city: String(formData.get("city") ?? ""),
    message: String(formData.get("message") ?? ""),
    ...(enquiryType === "refer"
      ? {
          company: String(formData.get("company") ?? ""),
          profession: String(formData.get("profession") ?? ""),
          website: String(formData.get("website") ?? ""),
        }
      : {
          spaceType: String(formData.get("spaceType") ?? ""),
          areaSqft: String(formData.get("areaSqft") ?? ""),
        }),
  };

  const parsed = enquirySchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Please correct the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const data = parsed.data;
  const supabase = await createSupabaseServerClient();

  // Graceful fallback: without configured credentials we still confirm receipt
  // so the UX works in preview/dev. Wire up Supabase env vars for persistence —
  // until then these leads exist only in the server log.
  if (!supabase) {
    console.warn(
      "[enquiry] Supabase is NOT configured — this lead was not stored:",
      data,
    );
    return { status: "success", message: SUCCESS_COPY[data.enquiryType] };
  }

  const { error } = await supabase.from("enquiries").insert({
    enquiry_type: data.enquiryType,
    name: data.name,
    email: data.email,
    phone: data.phone,
    city: data.city,
    message: data.message || null,
    company: data.enquiryType === "refer" ? data.company : null,
    profession: data.enquiryType === "refer" ? data.profession : null,
    website: data.enquiryType === "refer" ? data.website || null : null,
    space_type: data.enquiryType === "own" ? data.spaceType : null,
    area_sqft: data.enquiryType === "own" ? data.areaSqft || null : null,
  });

  if (error) {
    console.error("[enquiry] insert failed", error);
    return {
      status: "error",
      message:
        "Something went wrong saving your details. Please try again, or message us on WhatsApp.",
    };
  }

  return { status: "success", message: SUCCESS_COPY[data.enquiryType] };
}
