export const CONSENT_VERSION = "2026-05-01";

export const COOKIE_CONSENT_KEY = "dd_cookie_consent";
export const COOKIE_CONSENT_VERSION_KEY = "dd_cookie_consent_version";

export type CookieConsentValue = "accepted" | "rejected";

export function getStoredCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (value === "accepted" || value === "rejected") return value;
  return null;
}

export function setStoredCookieConsent(value: CookieConsentValue) {
  localStorage.setItem(COOKIE_CONSENT_KEY, value);
  localStorage.setItem(COOKIE_CONSENT_VERSION_KEY, CONSENT_VERSION);
}
