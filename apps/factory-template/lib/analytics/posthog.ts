import type { AnalyticsEventName, SafeAnalyticsPayload } from "./events";

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, string>) => void;
    };
  }
}

export function capturePostHog(name: AnalyticsEventName, payload?: SafeAnalyticsPayload) {
  if (!window.posthog?.capture) return;
  window.posthog.capture(name, payload as Record<string, string> | undefined);
}
