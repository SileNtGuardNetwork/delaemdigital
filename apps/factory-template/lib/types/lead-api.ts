import type { LeadStatus } from "@/lib/constants/lead-status";

export type NotificationStatus = "sent" | "failed" | "skipped";

export type LeadSubmitSuccessResponse = {
  ok: true;
  leadId: string;
  status: LeadStatus;
  notification: {
    sent: boolean;
    skipped?: boolean;
    error?: string;
  };
};

export type LeadSubmitErrorResponse = {
  ok: false;
  error: string;
  fields?: Record<string, string>;
};

export type LeadSubmitResponse = LeadSubmitSuccessResponse | LeadSubmitErrorResponse;
