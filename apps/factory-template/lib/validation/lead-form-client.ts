import { z } from "zod";

import { leadFormFieldsSchema, refineContactRequired } from "./lead-form-shared";

export const leadFormClientSchema = leadFormFieldsSchema
  .extend({
    name: z
      .string()
      .min(2, "Укажите имя — минимум 2 символа")
      .max(120, "Слишком длинное имя")
      .transform((v) => v.trim()),
    email: z
      .union([z.literal(""), z.string().email("Некорректный email")])
      .optional()
      .transform((v) => (v === undefined || v === "" ? undefined : v.trim())),
    website: z
      .union([z.literal(""), z.string().url("Укажите корректный URL сайта")])
      .optional()
      .transform((v) => (v === undefined || v === "" ? undefined : v.trim())),
    project_type: z.string().min(1, "Выберите тип проекта"),
    budget_range: z.string().min(1, "Выберите бюджетный диапазон"),
    consent_accepted: z.literal(true, {
      errorMap: () => ({
        message: "Необходимо согласие на обработку персональных данных",
      }),
    }),
    _honeypot: z.string().optional(),
  })
  .superRefine((data, ctx) => refineContactRequired(data, ctx, false));

export type LeadFormClientValues = z.infer<typeof leadFormClientSchema>;
