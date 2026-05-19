import { z } from "zod";

import { CONSENT_VERSION } from "@/lib/consent";

const optionalText = (max: number) =>
  z
    .string()
    .max(max)
    .optional()
    .transform((v) => (v === undefined ? undefined : v.trim()));

const utmField = z
  .string()
  .max(200)
  .optional()
  .transform((v) => (v === undefined ? undefined : v.trim()));

export const leadFormFieldsSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(120)
    .transform((v) => v.trim()),
  phone: optionalText(40),
  telegram: optionalText(80),
  email: z
    .union([z.literal(""), z.string().email()])
    .optional()
    .transform((v) => (v === undefined || v === "" ? undefined : v.trim())),
  website: z
    .union([z.literal(""), z.string().url()])
    .optional()
    .transform((v) => (v === undefined || v === "" ? undefined : v.trim())),
  project_type: z.string().min(1).max(64).transform((v) => v.trim()),
  budget_range: z.string().min(1).max(64).transform((v) => v.trim()),
  business_context: optionalText(2000),
  message: optionalText(4000),
  consent_accepted: z.literal(true),
  consent_version: z.string().default(CONSENT_VERSION),
  source: z.string().max(120).optional(),
  utm_source: utmField,
  utm_medium: utmField,
  utm_campaign: utmField,
  utm_content: utmField,
  utm_term: utmField,
  referrer: z.string().max(500).optional(),
  page_path: z.string().max(500).optional(),
  _honeypot: z.string().max(200).optional(),
});

export function refineContactRequired(
  data: {
    phone?: string;
    telegram?: string;
    email?: string;
  },
  ctx: z.RefinementCtx,
  requireEmail: boolean,
) {
  const phone = data.phone?.trim() ?? "";
  const telegram = data.telegram?.trim() ?? "";
  const email = data.email?.trim() ?? "";

  if (requireEmail) {
    if (!phone && !telegram && !email) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Укажите телефон, Telegram или email",
        path: ["phone"],
      });
    }
    return;
  }

  if (!phone && !telegram) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Укажите телефон или Telegram",
      path: ["phone"],
    });
  }
}
