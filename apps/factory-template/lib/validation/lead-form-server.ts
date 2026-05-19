import { z } from "zod";

import { leadFormFieldsSchema, refineContactRequired } from "./lead-form-shared";

export const leadFormServerSchema = leadFormFieldsSchema
  .extend({
    name: z.string().min(2).max(120),
    project_type: z.string().min(1).max(64),
    budget_range: z.string().min(1).max(64),
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

export function normalizeLeadPayload(input: LeadFormServerInput): NormalizedLeadPayload {
  return {
    name: input.name,
    phone: input.phone || null,
    telegram: input.telegram || null,
    email: input.email || null,
    website: input.website || null,
    project_type: input.project_type,
    budget_range: input.budget_range,
    business_context: input.business_context || null,
    message: input.message || null,
    consent_accepted: true,
    consent_version: input.consent_version,
    source: input.source || "factory-template",
    page_path: input.page_path || null,
    referrer: input.referrer || null,
    utm_source: input.utm_source || null,
    utm_medium: input.utm_medium || null,
    utm_campaign: input.utm_campaign || null,
    utm_content: input.utm_content || null,
    utm_term: input.utm_term || null,
  };
}
