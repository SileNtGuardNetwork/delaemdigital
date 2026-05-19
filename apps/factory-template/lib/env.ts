import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_ANALYTICS_ENABLED: z
    .enum(["true", "false"])
    .default("false")
    .transform((v) => v === "true"),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().optional(),
  NEXT_PUBLIC_YANDEX_METRIKA_ID: z.string().optional(),
  NEXT_PUBLIC_LEAD_FORM_MOCK: z
    .enum(["true", "false"])
    .default("false")
    .transform((v) => v === "true"),
});

export type AppEnv = z.infer<typeof envSchema>;

function parseEnv(): AppEnv {
  return envSchema.parse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_ANALYTICS_ENABLED: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_YANDEX_METRIKA_ID: process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID,
    NEXT_PUBLIC_LEAD_FORM_MOCK: process.env.NEXT_PUBLIC_LEAD_FORM_MOCK,
  });
}

export const env = parseEnv();
