import { z } from "zod";
import { businessTypes } from "@/lib/content";

export const partnerApplicationSchema = z.object({
  name: z.string().min(2, "Please enter your full name.").max(120),
  company: z.string().min(2, "Please enter your company name.").max(160),
  email: z.string().email("Please enter a valid email address."),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number.")
    .max(20)
    .regex(/^[+\d][\d\s()-]*$/, "Please enter a valid phone number."),
  businessType: z.enum(businessTypes, {
    message: "Please select your business type.",
  }),
  city: z.string().min(2, "Please enter your city.").max(120),
  website: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => !val || /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/.test(val),
      "Please enter a valid website URL.",
    ),
  message: z.string().max(1000).optional().or(z.literal("")),
});

export type PartnerApplicationInput = z.infer<typeof partnerApplicationSchema>;
