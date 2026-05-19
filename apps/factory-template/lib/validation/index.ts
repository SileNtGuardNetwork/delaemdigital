export { leadFormClientSchema, type LeadFormClientValues } from "./lead-form-client";
export {
  leadFormServerSchema,
  normalizeLeadPayload,
  type LeadFormServerInput,
  type NormalizedLeadPayload,
} from "./lead-form-server";

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

/** @deprecated Use leadFormClientSchema */
export { leadFormClientSchema as leadFormSchema } from "./lead-form-client";
