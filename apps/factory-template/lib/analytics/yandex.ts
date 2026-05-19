import type { AnalyticsEventName, SafeAnalyticsPayload } from "./events";

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
  }
}

export function captureYandex(name: AnalyticsEventName, payload?: SafeAnalyticsPayload) {
  const id = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  if (!id || !window.ym) return;

  const counterId = Number(id);
  if (Number.isNaN(counterId)) return;

  window.ym(counterId, "reachGoal", name, payload ?? {});
}
