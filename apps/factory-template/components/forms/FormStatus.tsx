"use client";

import type { LeadFormStatus } from "./lead-form.types";

type FormStatusProps = {
  status: LeadFormStatus;
  message?: string;
  onRetry?: () => void;
};

export function FormStatus({ status, message, onRetry }: FormStatusProps) {
  if (status === "idle" || status === "loading") return null;

  if (status === "success") {
    return (
      <div
        className="surface-panel surface-panel-accent p-6"
        role="status"
        aria-live="polite"
      >
        <p className="font-display text-lg font-semibold text-success">Заявка принята</p>
        <p className="mt-2 text-sm text-text-secondary">
          Мы получили ваши данные. Менеджер свяжется с вами в рабочее время.
        </p>
      </div>
    );
  }

  return (
    <div className="surface-panel border border-danger/40 p-6" role="alert">
      <p className="font-display text-lg font-semibold text-danger">Не удалось отправить заявку</p>
      <p className="mt-2 text-sm text-text-secondary">
        {message ??
          "Проверьте соединение и попробуйте ещё раз. Если ошибка повторяется — напишите на hello@delaemdigital.ru."}
      </p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 text-sm font-medium text-copper underline-offset-4 hover:underline"
        >
          Попробовать снова
        </button>
      ) : null}
    </div>
  );
}
