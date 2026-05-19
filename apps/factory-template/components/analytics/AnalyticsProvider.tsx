"use client";

import { createContext, useContext, type ReactNode } from "react";

import { trackEvent } from "./track-event";
import type { SafeAnalyticsPayload } from "@/lib/analytics/events";
import type { AnalyticsEventName } from "@/lib/analytics/events";

type AnalyticsContextValue = {
  track: (name: AnalyticsEventName, payload?: SafeAnalyticsPayload) => void;
};

const AnalyticsContext = createContext<AnalyticsContextValue>({
  track: trackEvent,
});

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  return (
    <AnalyticsContext.Provider value={{ track: trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  return useContext(AnalyticsContext);
}
