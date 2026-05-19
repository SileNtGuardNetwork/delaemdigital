"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { trackEvent } from "@/components/analytics/track-event";
import {
  getStoredCookieConsent,
  setStoredCookieConsent,
  type CookieConsentValue,
} from "@/lib/consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getStoredCookieConsent();
    if (!stored) setVisible(true);
  }, []);

  const applyChoice = (value: CookieConsentValue) => {
    setStoredCookieConsent(value);
    setVisible(false);
    trackEvent(
      value === "accepted" ? "cookie_consent_accepted" : "cookie_consent_rejected",
      { section: "cookie_banner" },
    );
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border-subtle bg-elevated/95 p-4 backdrop-blur-md md:p-5"
      role="dialog"
      aria-label="Согласие на cookie"
    >
      <div className="mx-auto flex max-w-container flex-col gap-4 px-[var(--space-container-x)] md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm text-text-secondary">
          Мы используем cookie для работы сайта и, с вашего согласия, аналитики.{" "}
          <Link href="/cookies" className="text-text-primary underline-offset-4 hover:underline">
            Подробнее
          </Link>
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => applyChoice("rejected")}
            className="inline-flex min-h-10 items-center justify-center rounded-button border border-border-subtle px-4 py-2 text-sm text-text-primary hover:border-border-accent"
          >
            Только необходимые
          </button>
          <button
            type="button"
            onClick={() => applyChoice("accepted")}
            className="inline-flex min-h-10 items-center justify-center rounded-button bg-copper px-4 py-2 text-sm font-semibold text-base hover:bg-copper-hover"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
}
