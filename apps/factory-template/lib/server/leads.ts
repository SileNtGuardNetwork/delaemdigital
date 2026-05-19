import { OWNER_NOTIFICATION_STATUSES } from "@/lib/constants/lead-status";
import type { NormalizedLeadPayload } from "@/lib/validation/lead-form-server";
import { CONSENT_URL, PRIVACY_URL } from "@/lib/consent";

import { getSupabaseAdmin } from "./supabase";

export async function createSiteLead(payload: NormalizedLeadPayload): Promise<string> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("site_leads")
    .insert({
      status: OWNER_NOTIFICATION_STATUSES.NEW,
      source: payload.source,
      page_path: payload.page_path,
      referrer: payload.referrer,
      utm_source: payload.utm_source,
      utm_medium: payload.utm_medium,
      utm_campaign: payload.utm_campaign,
      utm_content: payload.utm_content,
      utm_term: payload.utm_term,
      name: payload.name,
      phone: payload.phone,
      telegram: payload.telegram,
      email: payload.email,
      website: payload.website,
      project_type: payload.project_type,
      budget_range: payload.budget_range,
      business_context: payload.business_context,
      message: payload.message,
      consent_accepted: payload.consent_accepted,
      consent_version: payload.consent_version,
      owner_notification_status: OWNER_NOTIFICATION_STATUSES.NEW,
    })
    .select("id")
    .single();

  if (error || !data?.id) {
    throw new Error("lead_insert_failed");
  }

  return data.id as string;
}

export async function createConsentLog(
  leadId: string,
  payload: NormalizedLeadPayload,
): Promise<void> {
  const supabase = getSupabaseAdmin();

  const { error } = await supabase.from("consent_logs").insert({
    lead_id: leadId,
    consent_accepted: true,
    consent_version: payload.consent_version,
    privacy_url: PRIVACY_URL,
    consent_url: CONSENT_URL,
    form_id: "main",
    page_path: payload.page_path,
    metadata: {},
  });

  if (error) {
    throw new Error("consent_log_insert_failed");
  }
}

export async function createLeadEvent(
  leadId: string,
  eventName: string,
  eventPayload: Record<string, unknown> = {},
): Promise<void> {
  const supabase = getSupabaseAdmin();

  const { error } = await supabase.from("lead_events").insert({
    lead_id: leadId,
    event_name: eventName,
    event_payload: eventPayload,
  });

  if (error) {
    throw new Error("lead_event_insert_failed");
  }
}

export async function createNotificationLog(
  leadId: string,
  channel: "telegram" | "email" | "manual",
  status: "sent" | "failed" | "skipped",
  error?: string,
  payload: Record<string, unknown> = {},
): Promise<void> {
  const supabase = getSupabaseAdmin();

  const { error: insertError } = await supabase.from("notification_logs").insert({
    lead_id: leadId,
    channel,
    status,
    error: error ?? null,
    payload,
  });

  if (insertError) {
    throw new Error("notification_log_insert_failed");
  }
}

export async function updateLeadNotificationStatus(
  leadId: string,
  status: string,
  notificationError?: string,
): Promise<void> {
  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from("site_leads")
    .update({
      status,
      owner_notification_status: status,
      owner_notification_error: notificationError ?? null,
    })
    .eq("id", leadId);

  if (error) {
    throw new Error("lead_status_update_failed");
  }
}
