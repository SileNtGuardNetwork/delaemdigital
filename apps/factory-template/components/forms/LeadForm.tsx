"use client";

import { useEffect, useState } from "react";
import { ZodError } from "zod";

import { trackEvent } from "@/components/analytics/track-event";
import { CONSENT_VERSION } from "@/lib/consent";
import { captureUtmFromWindow } from "@/lib/utm";
import {
  budgetRangeOptions,
  leadFormSchema,
  projectTypeOptions,
} from "@/lib/validation";

import { ConsentCheckbox } from "./ConsentCheckbox";
import { FormField, formControlClassName } from "./FormField";
import { FormStatus } from "./FormStatus";
import type { LeadFormStatus } from "./lead-form.types";

type FieldErrors = Record<string, string>;

const initialValues = {
  name: "",
  phone: "",
  telegram: "",
  email: "",
  website: "",
  project_type: "",
  budget_range: "",
  business_context: "",
  message: "",
};

export function LeadForm() {
  const [values, setValues] = useState(initialValues);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<LeadFormStatus>("idle");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    trackEvent("lead_form_viewed", { section: "contact" });
  }, []);

  const handleStart = () => {
    if (!started) {
      setStarted(true);
      trackEvent("lead_form_started", { section: "contact" });
    }
  };

  const updateField = (field: keyof typeof initialValues, value: string) => {
    handleStart();
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({});
    trackEvent("lead_form_submit_attempt", { section: "contact" });

    const utm = captureUtmFromWindow();

    try {
      const payload = leadFormSchema.parse({
        ...values,
        email: values.email || undefined,
        website: values.website || undefined,
        consent_accepted: consent ? true : undefined,
        consent_version: CONSENT_VERSION,
        source: "factory-template",
        ...utm,
      });

      setStatus("loading");

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.details?.fieldErrors) {
          const fieldErrors: FieldErrors = {};
          for (const [key, value] of Object.entries(data.details.fieldErrors)) {
            if (Array.isArray(value) && value[0]) {
              fieldErrors[key] = value[0] as string;
            }
          }
          setErrors(fieldErrors);
          setStatus("idle");
          return;
        }
        throw new Error(data.error || "Failed to submit");
      }

      setStatus("success");
      trackEvent("lead_form_submitted", { section: "contact" });
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: FieldErrors = {};
        for (const issue of error.issues) {
          const key = issue.path[0];
          if (typeof key === "string" && !fieldErrors[key]) {
            fieldErrors[key] = issue.message;
          }
        }
        if (!consent) {
          fieldErrors.consent_accepted =
            "Необходимо согласие на обработку персональных данных";
        }
        setErrors(fieldErrors);
        setStatus("idle");
        return;
      }

      console.error("[LeadForm] Submit error:", error);
      setStatus("error");
      trackEvent("lead_form_failed", { section: "contact" });
    }
  };

  const handleRetry = () => {
    setStatus("idle");
  };

  if (status === "success" || status === "error") {
    return <FormStatus status={status} onRetry={status === "error" ? handleRetry : undefined} />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="surface-panel space-y-6 p-6 md:p-8"
      noValidate
      aria-busy={status === "loading"}
    >
      <div className="rounded-card border border-border-subtle bg-base/35 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-steel">Мини-бриф перед разговором</p>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          Ответьте коротко: что нужно улучшить и как с вами связаться. Имя и телефон или
          мессенджер обязательны; остальное можно заполнить позже после ClientFlow Аудита.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField id="name" label="Имя *" error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => updateField("name", e.target.value)}
            className={formControlClassName(Boolean(errors.name))}
            disabled={status === "loading"}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </FormField>

        <FormField id="phone" label="Телефон" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className={formControlClassName(Boolean(errors.phone))}
            disabled={status === "loading"}
            placeholder="+7 ..."
          />
        </FormField>

        <FormField id="telegram" label="Telegram" error={errors.telegram}>
          <input
            id="telegram"
            name="telegram"
            value={values.telegram}
            onChange={(e) => updateField("telegram", e.target.value)}
            className={formControlClassName(Boolean(errors.telegram))}
            disabled={status === "loading"}
            placeholder="@username"
          />
        </FormField>

        <FormField id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={formControlClassName(Boolean(errors.email))}
            disabled={status === "loading"}
          />
        </FormField>

        <FormField id="website" label="Сайт компании" error={errors.website}>
          <input
            id="website"
            name="website"
            type="url"
            value={values.website}
            onChange={(e) => updateField("website", e.target.value)}
            className={formControlClassName(Boolean(errors.website))}
            disabled={status === "loading"}
            placeholder="https://"
          />
        </FormField>

        <FormField id="project_type" label="Что хотите обсудить" error={errors.project_type}>
          <select
            id="project_type"
            name="project_type"
            value={values.project_type}
            onChange={(e) => updateField("project_type", e.target.value)}
            className={formControlClassName(Boolean(errors.project_type))}
            disabled={status === "loading"}
          >
            <option value="">Не знаю, нужна диагностика</option>
            {projectTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="budget_range" label="Ориентир по пакету" error={errors.budget_range}>
          <select
            id="budget_range"
            name="budget_range"
            value={values.budget_range}
            onChange={(e) => updateField("budget_range", e.target.value)}
            className={formControlClassName(Boolean(errors.budget_range))}
            disabled={status === "loading"}
          >
            <option value="">Обсудим после диагностики</option>
            {budgetRangeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField id="business_context" label="Что сейчас есть: сайт, реклама, CRM, менеджеры" error={errors.business_context}>
        <textarea
          id="business_context"
          name="business_context"
          rows={3}
          value={values.business_context}
          onChange={(e) => updateField("business_context", e.target.value)}
          className={formControlClassName()}
          disabled={status === "loading"}
        />
      </FormField>

      <FormField id="message" label="Где сейчас главная проблема" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={3}
          value={values.message}
          onChange={(e) => updateField("message", e.target.value)}
          className={formControlClassName()}
          disabled={status === "loading"}
        />
      </FormField>

      <ConsentCheckbox
        checked={consent}
        onChange={setConsent}
        error={errors.consent_accepted}
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-button bg-copper px-6 py-3 text-sm font-semibold text-base transition-colors hover:bg-copper-hover disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
        data-analytics-event="final_cta_clicked"
        data-analytics-section="contact"
        data-analytics-label="submit_lead_form"
      >
        {status === "loading" ? "Отправляем..." : "Обсудить проект"}
      </button>

      <p className="text-xs text-text-muted">
        Нажимая кнопку, вы подтверждаете согласие на обработку персональных данных.
      </p>
    </form>
  );
}
