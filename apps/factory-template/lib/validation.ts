import { z } from "zod";

import { CONSENT_VERSION } from "./consent";

export const leadFormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Укажите имя — минимум 2 символа")
      .max(120, "Слишком длинное имя"),
    phone: z.string().optional(),
    telegram: z.string().optional(),
    email: z.union([z.literal(""), z.string().email("Некорректный email")]).optional(),
    website: z.union([z.literal(""), z.string().url("Укажите корректный URL сайта")]).optional(),
    project_type: z.string().min(1, "Выберите тип проекта"),
    budget_range: z.string().min(1, "Выберите бюджетный диапазон"),
    business_context: z.string().max(2000).optional(),
    message: z.string().max(4000).optional(),
    consent_accepted: z.literal(true, {
      errorMap: () => ({
        message: "Необходимо согласие на обработку персональных данных",
      }),
    }),
    consent_version: z.string().default(CONSENT_VERSION),
    source: z.string().optional(),
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
    utm_content: z.string().optional(),
    utm_term: z.string().optional(),
    referrer: z.string().optional(),
    page_path: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const phone = data.phone?.trim() ?? "";
    const telegram = data.telegram?.trim() ?? "";

    if (!phone && !telegram) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Укажите телефон или Telegram",
        path: ["phone"],
      });
    }
  });

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export const projectTypeOptions = [
  { value: "site", label: "Делаем Сайт" },
  { value: "traffic", label: "Делаем Трафик" },
  { value: "system", label: "Делаем Систему" },
  { value: "audit", label: "ClientFlow Аудит" },
] as const;

export const budgetRangeOptions = [
  { value: "150-300", label: "150 000 – 300 000 ₽" },
  { value: "300-600", label: "300 000 – 600 000 ₽" },
  { value: "600+", label: "от 600 000 ₽" },
  { value: "discuss", label: "Обсудим на разборе" },
] as const;
