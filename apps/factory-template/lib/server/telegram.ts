import type { NormalizedLeadPayload } from "@/lib/validation/lead-form-server";
import {
  budgetRangeOptions,
  projectTypeOptions,
} from "@/lib/validation/index";

import { getTelegramConfig } from "./env";

export function escapeTelegramHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function labelFor(
  options: readonly { value: string; label: string }[],
  value: string,
): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

function formatContact(payload: NormalizedLeadPayload): string {
  const parts: string[] = [];
  if (payload.phone) parts.push(`Тел: ${payload.phone}`);
  if (payload.telegram) parts.push(`TG: ${payload.telegram}`);
  if (payload.email) parts.push(`Email: ${payload.email}`);
  return parts.join(" · ") || "—";
}

function formatUtm(payload: NormalizedLeadPayload): string {
  const parts = [
    payload.utm_source,
    payload.utm_medium,
    payload.utm_campaign,
  ].filter(Boolean);
  return parts.length ? parts.join(" / ") : "—";
}

export function buildOwnerNotificationMessage(payload: NormalizedLeadPayload): string {
  const projectLabel = labelFor(projectTypeOptions, payload.project_type);
  const budgetLabel = labelFor(budgetRangeOptions, payload.budget_range);

  const lines = [
    "<b>Новая заявка</b>",
    "",
    `<b>Проект:</b> ${escapeTelegramHtml(projectLabel)}`,
    `<b>Интерес:</b> ${escapeTelegramHtml(payload.project_type)}`,
    `<b>Имя:</b> ${escapeTelegramHtml(payload.name)}`,
    `<b>Контакт:</b> ${escapeTelegramHtml(formatContact(payload))}`,
    `<b>Сайт:</b> ${escapeTelegramHtml(payload.website ?? "—")}`,
    `<b>Бюджет:</b> ${escapeTelegramHtml(budgetLabel)}`,
    `<b>Сообщение:</b> ${escapeTelegramHtml(payload.message ?? "—")}`,
    `<b>Контекст:</b> ${escapeTelegramHtml(payload.business_context ?? "—")}`,
    `<b>Источник:</b> ${escapeTelegramHtml(payload.source ?? "—")}`,
    `<b>UTM:</b> ${escapeTelegramHtml(formatUtm(payload))}`,
    `<b>Страница:</b> ${escapeTelegramHtml(payload.page_path ?? "—")}`,
    `<b>Согласие:</b> v${escapeTelegramHtml(payload.consent_version)}`,
  ];

  return lines.join("\n");
}

export async function sendOwnerTelegramNotification(
  payload: NormalizedLeadPayload,
): Promise<{ sent: boolean; skipped: boolean; error?: string }> {
  const config = getTelegramConfig();
  if (!config) {
    return { sent: false, skipped: true };
  }

  const text = buildOwnerNotificationMessage(payload);
  const url = `https://api.telegram.org/bot${config.botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: config.ownerChatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!response.ok) {
      return { sent: false, skipped: false, error: "telegram_http_error" };
    }

    const data = (await response.json()) as { ok?: boolean };
    if (!data.ok) {
      return { sent: false, skipped: false, error: "telegram_api_error" };
    }

    return { sent: true, skipped: false };
  } catch {
    return { sent: false, skipped: false, error: "telegram_network_error" };
  }
}
