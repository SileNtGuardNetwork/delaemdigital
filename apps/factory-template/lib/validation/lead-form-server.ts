import { z } from "zod";

import { leadFormFieldsSchema, refineContactRequired } from "./lead-form-shared";

export const leadFormServerSchema = leadFormFieldsSchema
  .extend({
    name: z
      .string()
      .min(2)
      .max(120)
      .transform((v) => v.trim()),
    project_type: z
      .string()
      .min(1)
      .max(64)
      .transform((v) => v.trim()),
    budget_range: z
      .string()
      .min(1)
      .max(64)
      .transform((v) => v.trim()),
    consent_accepted: z.literal(true),
  })
  .extend({
    _honeypot: z
      .string()
      .max(200)
      .optional()
      .transform((v) => v?.trim() ?? ""),
  })
  .superRefine((data, ctx) => refineContactRequired(data, ctx, true));

export type LeadFormServerInput = z.infer<typeof leadFormServerSchema>;

export type NormalizedLeadPayload = {
  name: string;
  phone: string | null;
  telegram: string | null;
  email: string | null;
  website: string | null;
  project_type: string;
  budget_range: string;
  business_context: string | null;
  message: string | null;
  consent_accepted: boolean;
  consent_version: string;
  source: string | null;
  page_path: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
};

function trimRequired(value: string): string {
  return value.trim();
}

function trimToNull(value: string | undefined): string | null {
  if (value === undefined) return null;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

export function normalizeLeadPayload(input: LeadFormServerInput): NormalizedLeadPayload {
  return {
    name: trimRequired(input.name),
    phone: trimToNull(input.phone),
    telegram: trimToNull(input.telegram),
    email: trimToNull(input.email),
    website: trimToNull(input.website),
    project_type: trimRequired(input.project_type),
    budget_range: trimRequired(input.budget_range),
    business_context: trimToNull(input.business_context),
    message: trimToNull(input.message),
    consent_accepted: true,
    consent_version: trimRequired(input.consent_version),
    source: trimToNull(input.source) ?? "factory-template",
    page_path: trimToNull(input.page_path),
    referrer: trimToNull(input.referrer),
    utm_source: trimToNull(input.utm_source),
    utm_medium: trimToNull(input.utm_medium),
    utm_campaign: trimToNull(input.utm_campaign),
    utm_content: trimToNull(input.utm_content),
    utm_term: trimToNull(input.utm_term),
  };
}
