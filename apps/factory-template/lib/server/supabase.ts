import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { getLeadStorageConfig } from "./env";

let adminClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  const config = getLeadStorageConfig();
  if (!config) {
    throw new Error("lead_storage_not_configured");
  }

  if (!adminClient) {
    adminClient = createClient(config.supabaseUrl, config.supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return adminClient;
}
