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

  const shouldMockFail = () => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("form_mock_failure") === "1";
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

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (shouldMockFail()) {
        throw new Error("mock_failure");
      }

      void payload;
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

        <FormField id="project_type" label="Что интересует *" error={errors.project_type}>
          <select
            id="project_type"
            name="project_type"
            value={values.project_type}
            onChange={(e) => updateField("project_type", e.target.value)}
            className={formControlClassName(Boolean(errors.project_type))}
            disabled={status === "loading"}
          >
            <option value="">Выберите продукт</option>
            {projectTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="budget_range" label="Бюджетный диапазон *" error={errors.budget_range}>
          <select
            id="budget_range"
            name="budget_range"
            value={values.budget_range}
            onChange={(e) => updateField("budget_range", e.target.value)}
            className={formControlClassName(Boolean(errors.budget_range))}
            disabled={status === "loading"}
          >
            <option value="">Выберите диапазон</option>
            {budgetRangeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField id="business_context" label="Кратко о проекте" error={errors.business_context}>
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

      <FormField id="message" label="Сообщение" error={errors.message}>
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
        {status === "loading" ? "Отправляем..." : "Отправить заявку"}
      </button>

      <p className="text-xs text-text-muted">
        Нажимая кнопку, вы подтверждаете согласие на обработку данных. UTM и источник фиксируются
        при подключении v0.2.
      </p>
    </form>
  );
}
