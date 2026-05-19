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
    window.dispatchEvent(new Event("dd-cookie-consent-change"));
    trackEvent(
      value === "accepted" ? "cookie_consent_accepted" : "cookie_consent_rejected",
      { section: "cookie_banner" },
    );
  };

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:bottom-4 sm:right-4 sm:left-auto"
      role="dialog"
      aria-label="Согласие на cookie"
    >
      <div className="pointer-events-auto surface-panel max-w-[calc(100vw-1.5rem)] border border-border-subtle bg-elevated/90 p-3 shadow-panel backdrop-blur-sm sm:max-w-sm sm:p-4">
        <p className="text-xs leading-relaxed text-text-secondary sm:text-sm">
          Cookie для работы сайта и, с вашего согласия, аналитики.{" "}
          <Link href="/cookies" className="text-text-primary underline-offset-4 hover:underline">
            Подробнее
          </Link>
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => applyChoice("rejected")}
            className="inline-flex min-h-9 flex-1 items-center justify-center rounded-button border border-border-subtle px-3 py-2 text-xs text-text-primary hover:border-border-accent sm:flex-none sm:text-sm"
          >
            Только необходимые
          </button>
          <button
            type="button"
            onClick={() => applyChoice("accepted")}
            className="inline-flex min-h-9 flex-1 items-center justify-center rounded-button bg-copper px-3 py-2 text-xs font-semibold text-base hover:bg-copper-hover sm:flex-none sm:text-sm"
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
}
