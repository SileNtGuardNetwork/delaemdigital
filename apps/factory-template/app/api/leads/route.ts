import { NextResponse } from "next/server";

import { CONSENT_VERSION } from "@/lib/consent";
import { leadFormBaseSchema } from "@/lib/validation";

import {
  insertLead,
  insertConsentLog,
  insertLeadEvent,
  updateLeadNotificationStatus,
  insertNotificationLog,
} from "@/lib/server/leads";
import { sendOwnerNotification } from "@/lib/server/telegram";

const serverSchema = leadFormBaseSchema.refine((data) => data.consent_accepted === true, {
  message: "Необходимо согласие на обработку персональных данных",
  path: ["consent_accepted"],
});

function normalizeString(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = serverSchema.safeParse({
      ...body,
      name: body.name?.trim() || "",
      phone: normalizeString(body.phone),
      telegram: normalizeString(body.telegram),
      email: normalizeString(body.email),
      website: normalizeString(body.website),
      project_type: normalizeString(body.project_type),
      budget_range: normalizeString(body.budget_range),
      business_context: normalizeString(body.business_context),
      message: normalizeString(body.message),
      source: normalizeString(body.source),
      utm_source: normalizeString(body.utm_source),
      utm_medium: normalizeString(body.utm_medium),
      utm_campaign: normalizeString(body.utm_campaign),
      utm_content: normalizeString(body.utm_content),
      utm_term: normalizeString(body.utm_term),
      referrer: normalizeString(body.referrer),
      page_path: normalizeString(body.page_path),
      consent_accepted: body.consent_accepted === true,
      consent_version: body.consent_version || CONSENT_VERSION,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Insert lead
    const lead = await insertLead({
      name: data.name,
      phone: data.phone,
      telegram: data.telegram,
      email: data.email,
      website: data.website,
      project_type: data.project_type,
      budget_range: data.budget_range,
      business_context: data.business_context,
      message: data.message,
      consent_accepted: data.consent_accepted,
      consent_version: data.consent_version,
      source: data.source,
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
      utm_content: data.utm_content,
      utm_term: data.utm_term,
      referrer: data.referrer,
      page_path: data.page_path,
    });

    // Log consent
    await insertConsentLog({
      lead_id: lead.id,
      consent_accepted: data.consent_accepted,
      consent_version: data.consent_version,
      form_id: "lead_form",
      page_path: data.page_path,
    });

    // Log lead created event
    await insertLeadEvent({
      lead_id: lead.id,
      event_type: "lead_created",
      event_payload: { source: data.source },
    });

    // Try Telegram notification (non-blocking failure)
    let notificationError: string | undefined;
    try {
      const notification = await sendOwnerNotification(lead);

      if (notification.success) {
        await updateLeadNotificationStatus(lead.id, "sent");
        await insertNotificationLog({
          lead_id: lead.id,
          channel: "telegram",
          status: "sent",
        });
        await insertLeadEvent({
          lead_id: lead.id,
          event_type: "owner_notification_sent",
        });
      } else {
        notificationError = notification.error || "Unknown error";
        await updateLeadNotificationStatus(lead.id, "failed", notificationError);
        await insertNotificationLog({
          lead_id: lead.id,
          channel: "telegram",
          status: "failed",
          error: notificationError,
        });
        await insertLeadEvent({
          lead_id: lead.id,
          event_type: "owner_notification_failed",
          event_payload: { error: notificationError },
        });
      }
    } catch (err) {
      notificationError = err instanceof Error ? err.message : "Unknown error";
      console.error("[api/leads] Notification error:", err);
      await updateLeadNotificationStatus(lead.id, "failed", notificationError);
    }

    return NextResponse.json({
      success: true,
      lead_id: lead.id,
      notification_sent: !notificationError,
    });
  } catch (error) {
    console.error("[api/leads] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
