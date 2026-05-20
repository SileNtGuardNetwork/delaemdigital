import type { UtmParams } from "@/lib/utm";
import { captureUtmFromSearch } from "@/lib/utm";

const UTM_STORAGE_KEY = "dd_utm_v1";

type StoredUtm = UtmParams & { capturedAt?: string };

function readJson(storage: Storage): StoredUtm | null {
  try {
    const raw = storage.getItem(UTM_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredUtm;
  } catch {
    return null;
  }
}

function hasUtmParams(utm: UtmParams): boolean {
  return Boolean(
    utm.utm_source ||
      utm.utm_medium ||
      utm.utm_campaign ||
      utm.utm_content ||
      utm.utm_term,
  );
}

/** Persist UTM from current URL (first-touch in localStorage, last in session). */
export function persistUtmFromLocation(): void {
  if (typeof window === "undefined") return;

  const fromUrl = captureUtmFromSearch(window.location.search);
  if (!hasUtmParams(fromUrl)) return;

  const enriched: StoredUtm = {
    ...fromUrl,
    capturedAt: new Date().toISOString(),
  };

  sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(enriched));

  if (!localStorage.getItem(UTM_STORAGE_KEY)) {
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(enriched));
  }
}

function mergeStored(): StoredUtm {
  const local = readJson(localStorage) ?? {};
  const session = readJson(sessionStorage) ?? {};
  return { ...local, ...session };
}

/** UTM + page context for form submit. */
export function getUtmForSubmit(): UtmParams & { source: string } {
  if (typeof window === "undefined") {
    return { source: "factory-template" };
  }

  const stored = mergeStored();

  return {
    utm_source: stored.utm_source,
    utm_medium: stored.utm_medium,
    utm_campaign: stored.utm_campaign,
    utm_content: stored.utm_content,
    utm_term: stored.utm_term,
    referrer: document.referrer || stored.referrer,
    page_path: window.location.pathname,
    source: "factory-template",
  };
}
