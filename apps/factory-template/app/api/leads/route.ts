import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { OWNER_NOTIFICATION_STATUSES, type LeadStatus } from "@/lib/constants/lead-status";
import type { LeadSubmitSuccessResponse } from "@/lib/types/lead-api";
import { isLeadStorageConfigured } from "@/lib/server/env";
import {
  createConsentLog,
  createLeadEvent,
  createNotificationLog,
  createSiteLead,
  updateLeadNotificationStatus,
} from "@/lib/server/leads";
import { sendOwnerTelegramNotification } from "@/lib/server/telegram";
import {
  leadFormServerSchema,
  normalizeLeadPayload,
} from "@/lib/validation/lead-form-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_PAYLOAD_BYTES = 32 * 1024;

function validationErrorResponse(error: ZodError) {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fields[key]) {
      fields[key] = issue.message;
    }
  }
  return NextResponse.json(
    { ok: false, error: "validation_error", fields },
    { status: 400 },
  );
}

export async function POST(request: Request) {
  if (!isLeadStorageConfigured()) {
    return NextResponse.json(
      { ok: false, error: "lead_storage_not_configured" },
      { status: 503 },
    );
  }

  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_PAYLOAD_BYTES) {
    return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  if (rawBody.length > MAX_PAYLOAD_BYTES) {
    return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
  }

  let json: unknown;
  try {
    json = JSON.parse(rawBody) as unknown;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = leadFormServerSchema.safeParse(json);
  if (!parsed.success) {
    return validationErrorResponse(parsed.error);
  }

  if (parsed.data._honeypot) {
    return NextResponse.json({ ok: false, error: "spam_detected" }, { status: 400 });
  }

  const payload = normalizeLeadPayload(parsed.data);

  let leadId: string;
  try {
    leadId = await createSiteLead(payload);
    await createConsentLog(leadId, payload);
    await createLeadEvent(leadId, "lead_created", {
      project_type: payload.project_type,
      budget_range: payload.budget_range,
    });
    await createLeadEvent(leadId, "consent_saved", {
      consent_version: payload.consent_version,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "lead_save_failed" }, { status: 500 });
  }

  const telegramResult = await sendOwnerTelegramNotification(payload);

  let leadStatus: LeadStatus = OWNER_NOTIFICATION_STATUSES.NEW;
  let notification: LeadSubmitSuccessResponse["notification"];

  if (telegramResult.skipped) {
    await createNotificationLog(leadId, "telegram", "skipped", undefined, {
      reason: "not_configured",
    });
    await createLeadEvent(leadId, "owner_notification_skipped", {});
    notification = { sent: false, skipped: true };
  } else if (telegramResult.sent) {
    leadStatus = OWNER_NOTIFICATION_STATUSES.NOTIFIED;
    await updateLeadNotificationStatus(leadId, OWNER_NOTIFICATION_STATUSES.NOTIFIED);
    await createNotificationLog(leadId, "telegram", "sent");
    await createLeadEvent(leadId, "owner_notification_sent", {});
    notification = { sent: true };
  } else {
    leadStatus = OWNER_NOTIFICATION_STATUSES.FAILED;
    await updateLeadNotificationStatus(
      leadId,
      OWNER_NOTIFICATION_STATUSES.FAILED,
      telegramResult.error,
    );
    await createNotificationLog(leadId, "telegram", "failed", telegramResult.error);
    await createLeadEvent(leadId, "owner_notification_failed", {
      error: telegramResult.error ?? "unknown",
    });
    notification = { sent: false, error: telegramResult.error };
  }

  const response: LeadSubmitSuccessResponse = {
    ok: true,
    leadId,
    status: leadStatus,
    notification,
  };

  return NextResponse.json(response);
}
