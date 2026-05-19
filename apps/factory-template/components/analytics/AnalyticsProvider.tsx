"use client";

import { createContext, useContext, type ReactNode } from "react";

import { trackEvent, type AnalyticsEventName, type AnalyticsPayload } from "./track-event";

type AnalyticsContextValue = {
  track: (name: AnalyticsEventName, payload?: AnalyticsPayload) => void;
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
