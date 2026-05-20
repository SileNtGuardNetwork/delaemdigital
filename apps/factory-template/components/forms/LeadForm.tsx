"use client";

import { useEffect, useState } from "react";
import { ZodError } from "zod";

import { trackEvent } from "@/components/analytics/track-event";
import { LeadSubmitError, submitLead } from "@/lib/api/submit-lead";
import { CONSENT_VERSION } from "@/lib/consent";
import { env } from "@/lib/env";
import { getUtmForSubmit } from "@/lib/utm-storage";
import {
  budgetRangeOptions,
  leadFormClientSchema,
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

const isMockSubmitEnabled = () => env.NEXT_PUBLIC_LEAD_FORM_MOCK === true;

export function LeadForm() {
  const [values, setValues] = useState(initialValues);
  const [honeypot, setHoneypot] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<LeadFormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    trackEvent("lead_form_viewed", { section: "contact", path: "/#contact" });
  }, []);

  const handleStart = () => {
    if (!started) {
      setStarted(true);
      trackEvent("lead_form_started", { section: "contact", path: "/#contact" });
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

  const runMockSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    if (new URLSearchParams(window.location.search).get("form_mock_failure") === "1") {
      throw new Error("mock_failure");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({});
    setErrorMessage(undefined);
    trackEvent("lead_form_submit_attempt", {
      section: "contact",
      path: "/#contact",
      project_type: values.project_type || undefined,
      budget_range: values.budget_range || undefined,
    });

    const utm = getUtmForSubmit();

    try {
      const payload = leadFormClientSchema.parse({
        ...values,
        email: values.email || undefined,
        website: values.website || undefined,
        consent_accepted: consent ? true : undefined,
        consent_version: CONSENT_VERSION,
        _honeypot: honeypot,
        ...utm,
      });

      setStatus("loading");

      if (isMockSubmitEnabled()) {
        await runMockSubmit();
        setStatus("success");
        trackEvent("lead_form_submitted", {
          section: "contact",
          path: "/#contact",
          project_type: payload.project_type,
          budget_range: payload.budget_range,
          notification_status: "skipped",
        });
        return;
      }

      const result = await submitLead(payload);
      if (!result.ok) {
        throw new LeadSubmitError("submit_failed", "submit_failed");
      }

      const notificationStatus = result.notification.sent
        ? "sent"
        : result.notification.skipped
          ? "skipped"
          : "failed";

      trackEvent("lead_form_submitted", {
        section: "contact",
        path: "/#contact",
        project_type: payload.project_type,
        budget_range: payload.budget_range,
        notification_status: notificationStatus,
      });

      if (notificationStatus === "sent") {
        trackEvent("owner_notification_sent", {
          section: "contact",
          notification_status: "sent",
        });
      } else if (notificationStatus === "failed") {
        trackEvent("owner_notification_failed", {
          section: "contact",
          notification_status: "failed",
        });
      }

      setStatus("success");
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

      if (error instanceof LeadSubmitError) {
        if (error.code === "lead_storage_not_configured") {
          setErrorMessage(
            "Сохранение заявок пока не настроено. Добавьте Supabase в .env.local и примените migration.",
          );
        } else if (error.fields) {
          setErrors(error.fields);
          setStatus("idle");
          return;
        } else if (error.code === "spam_detected") {
          setErrorMessage("Не удалось отправить заявку. Попробуйте ещё раз.");
        } else {
          setErrorMessage("Не удалось отправить заявку. Проверьте данные и попробуйте снова.");
        }
      } else {
        setErrorMessage("Не удалось отправить заявку. Проверьте соединение и попробуйте снова.");
      }

      setStatus("error");
      trackEvent("lead_form_failed", {
        section: "contact",
        path: "/#contact",
        project_type: values.project_type || undefined,
        budget_range: values.budget_range || undefined,
      });
    }
  };

  const handleRetry = () => {
    setStatus("idle");
    setErrorMessage(undefined);
  };

  if (status === "success" || status === "error") {
    return (
      <FormStatus
        status={status}
        message={errorMessage}
        onRetry={status === "error" ? handleRetry : undefined}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="surface-panel space-y-6 p-6 md:p-8"
      noValidate
      aria-busy={status === "loading"}
    >
      <input
        type="text"
        name="_honeypot"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-px w-px overflow-hidden opacity-0"
        aria-hidden
      />

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
        Нажимая кнопку, вы подтверждаете согласие на обработку данных. UTM и источник сохраняются
        вместе с заявкой.
      </p>
    </form>
  );
}
