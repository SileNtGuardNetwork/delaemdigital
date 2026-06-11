import type { LeadRecord } from "./leads";

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const telegramOwnerChatId = process.env.TELEGRAM_OWNER_CHAT_ID;

type TelegramMessage = {
  chat_id: string;
  text: string;
  parse_mode?: "HTML" | "Markdown";
};

async function sendTelegramMessage(message: TelegramMessage): Promise<boolean> {
  if (!telegramBotToken || !telegramOwnerChatId) {
    console.warn("[telegram] Missing bot token or chat id");
    return false;
  }

  const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[telegram] API error:", data);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[telegram] Request error:", error);
    return false;
  }
}

function escapeHtml(text: string | undefined | null): string {
  if (!text) return "—";
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatOwnerCard(lead: LeadRecord): string {
  const lines = [
    `<b>🆕 Новая заявка</b>`,
    ``,
    `<b>Имя:</b> ${escapeHtml(lead.name)}`,
    `<b>Контакт:</b> ${escapeHtml(lead.phone || lead.telegram || "—")}`,
    lead.email ? `<b>Email:</b> ${escapeHtml(lead.email)}` : null,
    lead.website ? `<b>Сайт:</b> ${escapeHtml(lead.website)}` : null,
    ``,
    `<b>Интерес:</b> ${escapeHtml(lead.project_type || "Не указан")}`,
    lead.budget_range ? `<b>Бюджет:</b> ${escapeHtml(lead.budget_range)}` : null,
    ``,
    lead.business_context
      ? `<b>Контекст:</b>\n${escapeHtml(lead.business_context.slice(0, 500))}`
      : null,
    lead.message
      ? `<b>Проблема:</b>\n${escapeHtml(lead.message.slice(0, 500))}`
      : null,
    ``,
    `<b>Источник:</b> ${escapeHtml(lead.source || "Прямой переход")}`,
    lead.utm_source
      ? `<b>UTM:</b> ${escapeHtml(lead.utm_source)}/${escapeHtml(lead.utm_medium)}/${escapeHtml(lead.utm_campaign)}`
      : null,
    `<b>Страница:</b> ${escapeHtml(lead.page_path || "/")}`,
    ``,
    `<b>Согласие:</b> ${lead.consent_accepted ? "Да" : "Нет"}`,
  ];

  return lines.filter(Boolean).join("\n");
}

export async function sendOwnerNotification(lead: LeadRecord): Promise<{
  success: boolean;
  error?: string;
}> {
  if (!telegramBotToken || !telegramOwnerChatId) {
    return {
      success: false,
      error: "Telegram configuration missing",
    };
  }

  const text = formatOwnerCard(lead);
  const sent = await sendTelegramMessage({
    chat_id: telegramOwnerChatId,
    text,
    parse_mode: "HTML",
  });

  return {
    success: sent,
    error: sent ? undefined : "Failed to send message",
  };
}
