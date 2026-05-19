export type AnalyticsEventName =
  | "page_viewed"
  | "section_viewed"
  | "hero_primary_cta_clicked"
  | "hero_secondary_cta_clicked"
  | "offer_card_clicked"
  | "faq_item_opened"
  | "lead_form_viewed"
  | "lead_form_started"
  | "lead_form_submit_attempt"
  | "lead_form_submitted"
  | "lead_form_failed"
  | "owner_notification_sent"
  | "owner_notification_failed"
  | "final_cta_clicked"
  | "cookie_consent_accepted"
  | "cookie_consent_rejected";

export type SafeAnalyticsPayload = {
  section?: string;
  label?: string;
  path?: string;
  project_type?: string;
  budget_range?: string;
  notification_status?: "sent" | "failed" | "skipped";
};

const ALLOWED_KEYS = new Set<keyof SafeAnalyticsPayload>([
  "section",
  "label",
  "path",
  "project_type",
  "budget_range",
  "notification_status",
]);

export function sanitizeAnalyticsPayload(
  payload?: Record<string, string | undefined>,
): SafeAnalyticsPayload | undefined {
  if (!payload) return undefined;

  const safe: SafeAnalyticsPayload = {};
  for (const key of ALLOWED_KEYS) {
    const value = payload[key];
    if (value === undefined || value === "") continue;
    if (key === "notification_status") {
      if (value === "sent" || value === "failed" || value === "skipped") {
        safe.notification_status = value;
      }
      continue;
    }
    safe[key] = value;
  }

  return Object.keys(safe).length > 0 ? safe : undefined;
}

export function trackAnalyticsEvent(
  name: AnalyticsEventName,
  payload?: SafeAnalyticsPayload,
): void {
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", name, payload);
  }

  if (typeof window === "undefined") return;

  const analyticsEnabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";
  const consent =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("dd_cookie_consent") === "accepted"
      : false;

  if (!analyticsEnabled || !consent) return;

  void import("./posthog").then(({ capturePostHog }) => capturePostHog(name, payload));
  void import("./yandex").then(({ captureYandex }) => captureYandex(name, payload));
}
