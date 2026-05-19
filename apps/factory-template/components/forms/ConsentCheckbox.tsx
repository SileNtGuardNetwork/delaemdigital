"use client";

import Link from "next/link";

type ConsentCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
};

export function ConsentCheckbox({ checked, onChange, error }: ConsentCheckboxProps) {
  return (
    <div className="space-y-2">
      <label className="flex cursor-pointer items-start gap-3 text-sm text-text-secondary">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 rounded border-border-subtle bg-base accent-copper"
          aria-invalid={Boolean(error)}
        />
        <span>
          Я соглашаюсь с{" "}
          <Link href="/privacy" className="text-text-primary underline-offset-4 hover:underline">
            политикой конфиденциальности
          </Link>{" "}
          и{" "}
          <Link href="/consent" className="text-text-primary underline-offset-4 hover:underline">
            условиями обработки персональных данных
          </Link>
        </span>
      </label>
      {error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
