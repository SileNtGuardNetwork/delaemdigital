"use client";

import { type MouseEvent, type ReactNode } from "react";

import { trackEvent, type AnalyticsEventName } from "./track-event";

export function AnalyticsClickListener({ children }: { children: ReactNode }) {
  const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    const el = target?.closest<HTMLElement>("[data-analytics-event]");
    if (!el) return;

    const name = el.dataset.analyticsEvent as AnalyticsEventName | undefined;
    if (!name) return;

    trackEvent(name, {
      section: el.dataset.analyticsSection,
      label: el.dataset.analyticsLabel,
    });
  };

  return (
    <div className="contents" onClickCapture={handleClickCapture}>
      {children}
    </div>
  );
}
