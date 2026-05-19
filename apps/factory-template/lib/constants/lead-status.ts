export const LEAD_STATUSES = [
  "new",
  "notified",
  "notification_failed",
  "in_review",
  "qualified",
  "not_fit",
  "contacted",
  "archived",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const OWNER_NOTIFICATION_STATUSES = {
  NEW: "new",
  NOTIFIED: "notified",
  FAILED: "notification_failed",
} as const;
