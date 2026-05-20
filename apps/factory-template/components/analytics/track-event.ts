import {
  sanitizeAnalyticsPayload,
  trackAnalyticsEvent,
  type AnalyticsEventName,
} from "@/lib/analytics/events";

export type { AnalyticsEventName, SafeAnalyticsPayload } from "@/lib/analytics/events";

export function trackEvent(
  name: AnalyticsEventName,
  payload?: Record<string, string | undefined>,
) {
  trackAnalyticsEvent(name, sanitizeAnalyticsPayload(payload));
}
