export type LeadFormStatus = "idle" | "loading" | "success" | "error";

export type LeadPayload = {
  name: string;
  phone?: string;
  telegram?: string;
  email?: string;
  website?: string;
  project_type: string;
  budget_range: string;
  business_context?: string;
  message?: string;
  consent_accepted: boolean;
  consent_version: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  page_path?: string;
};
