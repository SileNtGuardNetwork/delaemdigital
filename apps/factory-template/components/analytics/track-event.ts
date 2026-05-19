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
  | "final_cta_clicked"
  | "cookie_consent_accepted"
  | "cookie_consent_rejected";

export type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: AnalyticsEventName, payload?: AnalyticsPayload) {
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", name, payload);
  }
  // v0.2: PostHog / Yandex adapters
}
