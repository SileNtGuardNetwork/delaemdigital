export type LeadStorageConfig = {
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
};

export type TelegramConfig = {
  botToken: string;
  ownerChatId: string;
};

/** Lazy read — does not throw at import/build time. */
export function isLeadStorageConfigured(): boolean {
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  return Boolean(url && key);
}

export function getLeadStorageConfig(): LeadStorageConfig | null {
  if (!isLeadStorageConfigured()) return null;

  return {
    supabaseUrl: process.env.SUPABASE_URL!.trim(),
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!.trim(),
  };
}

export function isTelegramConfigured(): boolean {
  if (process.env.TELEGRAM_NOTIFICATIONS_ENABLED === "false") return false;

  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_OWNER_CHAT_ID?.trim();
  return Boolean(token && chatId);
}

export function getTelegramConfig(): TelegramConfig | null {
  if (!isTelegramConfigured()) return null;

  return {
    botToken: process.env.TELEGRAM_BOT_TOKEN!.trim(),
    ownerChatId: process.env.TELEGRAM_OWNER_CHAT_ID!.trim(),
  };
}
