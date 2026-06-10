"use client";

import type { LeadFormStatus } from "./lead-form.types";

type FormStatusProps = {
  status: LeadFormStatus;
  onRetry?: () => void;
};

export function FormStatus({ status, onRetry }: FormStatusProps) {
  if (status === "idle" || status === "loading") return null;

  if (status === "success") {
    return (
      <div
        className="surface-panel surface-panel-accent p-6"
        role="status"
        aria-live="polite"
      >
        <p className="font-display text-lg font-semibold text-success">Запрос подготовлен</p>
        <p className="mt-2 text-sm text-text-secondary">
          Контактные данные и контекст сохранены в интерфейсе. Боевой маршрут заявки — база, n8n, Telegram-уведомление и CRM — подключается на следующем lead-layer этапе.
        </p>
      </div>
    );
  }

  return (
    <div className="surface-panel border border-danger/40 p-6" role="alert">
      <p className="font-display text-lg font-semibold text-danger">Не удалось отправить заявку</p>
      <p className="mt-2 text-sm text-text-secondary">
        Проверьте соединение и попробуйте ещё раз. Если ошибка повторяется — напишите на
        delaemdigital@gmail.com.
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
