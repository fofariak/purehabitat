"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { partnerApplicationSchema } from "@/lib/validations";

export type PartnerActionState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string>;
};

export async function submitPartnerApplication(
  _prev: PartnerActionState,
  formData: FormData,
): Promise<PartnerActionState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    company: String(formData.get("company") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    businessType: String(formData.get("businessType") ?? ""),
    city: String(formData.get("city") ?? ""),
    website: String(formData.get("website") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = partnerApplicationSchema.safeParse(raw);

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

  const supabase = await createSupabaseServerClient();

  // Graceful fallback: without configured credentials we still confirm receipt
  // so the UX works in preview/dev. Wire up Supabase env vars for persistence.
  if (!supabase) {
    console.info("[partner-application] (no Supabase configured)", parsed.data);
    return {
      status: "success",
      message:
        "Thanks! Your application has been received. Our partnerships team will be in touch shortly.",
    };
  }

  const { error } = await supabase.from("partner_applications").insert({
    name: parsed.data.name,
    company: parsed.data.company,
    email: parsed.data.email,
    phone: parsed.data.phone,
    business_type: parsed.data.businessType,
    city: parsed.data.city,
    website: parsed.data.website || null,
    message: parsed.data.message || null,
  });

  if (error) {
    console.error("[partner-application] insert failed", error);
    return {
      status: "error",
      message:
        "Something went wrong saving your application. Please try again or email us directly.",
    };
  }

  return {
    status: "success",
    message:
      "Thanks! Your application has been received. Our partnerships team will be in touch shortly.",
  };
}
