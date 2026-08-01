import { z } from "zod";

import { professions, spaceTypes } from "@/lib/content";

/** Fields both branches of the enquiry form share. */
const baseFields = {
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z.email("Please enter a valid email address.").max(160),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(20)
    .regex(/^[+\d][\d\s()-]*$/, "Please enter a valid phone number."),
  city: z.string().trim().min(2, "Please enter your city.").max(120),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
};

const websiteField = z
  .string()
  .trim()
  .max(200)
  .optional()
  .or(z.literal(""))
  .refine(
    (val) => !val || /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/.test(val),
    "Please enter a valid website URL.",
  );

/** "I refer clients" — a professional joining the Referral Network. */
export const referrerSchema = z.object({
  enquiryType: z.literal("refer"),
  ...baseFields,
  company: z.string().trim().min(2, "Please enter your company name.").max(160),
  profession: z.enum(professions, { message: "Please select your profession." }),
  website: websiteField,
});

/** "For my own space" — a homeowner, gym, school, clinic or office. */
export const ownerSchema = z.object({
  enquiryType: z.literal("own"),
  ...baseFields,
  spaceType: z.enum(spaceTypes, { message: "Please select your space type." }),
  areaSqft: z
    .string()
    .trim()
    .max(20)
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => !val || /^\d{2,7}$/.test(val.replace(/[,\s]/g, "")),
      "Please enter the approximate area in square feet.",
    ),
});

export const enquirySchema = z.discriminatedUnion("enquiryType", [
  referrerSchema,
  ownerSchema,
]);

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type EnquiryType = EnquiryInput["enquiryType"];
