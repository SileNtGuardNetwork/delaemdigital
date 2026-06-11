import { getSupabase } from "./supabase";

export type LeadInsert = {
  name: string;
  phone?: string;
  telegram?: string;
  email?: string;
  website?: string;
  project_type?: string;
  budget_range?: string;
  business_context?: string;
  message?: string;
  consent_accepted: boolean;
  consent_version?: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  page_path?: string;
};

export type LeadRecord = LeadInsert & {
  id: string;
  created_at: string;
  updated_at: string;
  status: string;
  owner_notification_status?: string;
  owner_notification_error?: string;
  owner_notification_at?: string;
};

export async function insertLead(lead: LeadInsert): Promise<LeadRecord> {
  const { data, error } = await getSupabase()
    .from("site_leads")
    .insert({
      ...lead,
      consent_at: lead.consent_accepted ? new Date().toISOString() : null,
      status: "new",
    })
    .select()
    .single();

  if (error) {
    console.error("[leads] Insert error:", error);
    throw error;
  }

  return data;
}

export async function insertConsentLog(params: {
  lead_id: string;
  consent_accepted: boolean;
  consent_version: string;
  privacy_url?: string;
  consent_url?: string;
  form_id?: string;
  page_path?: string;
}): Promise<void> {
  const { error } = await getSupabase().from("consent_logs").insert({
    lead_id: params.lead_id,
    consent_accepted: params.consent_accepted,
    consent_version: params.consent_version,
    privacy_url: params.privacy_url,
    consent_url: params.consent_url,
    form_id: params.form_id,
    page_path: params.page_path,
  });

  if (error) {
    console.error("[leads] Consent log error:", error);
  }
}

export async function insertLeadEvent(params: {
  lead_id: string;
  event_type: "lead_created" | "consent_saved" | "owner_notification_sent" | "owner_notification_failed" | "lead_status_changed";
  event_payload?: Record<string, unknown>;
}): Promise<void> {
  const { error } = await getSupabase().from("lead_events").insert({
    lead_id: params.lead_id,
    event_type: params.event_type,
    event_payload: params.event_payload || {},
  });

  if (error) {
    console.error("[leads] Event log error:", error);
  }
}

export async function updateLeadNotificationStatus(
  leadId: string,
  status: "sent" | "failed",
  error?: string
): Promise<void> {
  const { error: updateError } = await getSupabase()
    .from("site_leads")
    .update({
      owner_notification_status: status,
      owner_notification_error: error || null,
      owner_notification_at: new Date().toISOString(),
      status: status === "sent" ? "notified" : "notification_failed",
    })
    .eq("id", leadId);

  if (updateError) {
    console.error("[leads] Update notification status error:", updateError);
  }
}

export async function insertNotificationLog(params: {
  lead_id: string;
  channel: "telegram" | "email" | "manual";
  status: string;
  error?: string;
  payload?: Record<string, unknown>;
}): Promise<void> {
  const { error } = await getSupabase().from("notification_logs").insert({
    lead_id: params.lead_id,
    channel: params.channel,
    status: params.status,
    error: params.error || null,
    payload: params.payload || {},
  });

  if (error) {
    console.error("[leads] Notification log error:", error);
  }
}
