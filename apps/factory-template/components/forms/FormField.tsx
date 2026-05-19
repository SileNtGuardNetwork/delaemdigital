"use client";

import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

export function FormField({ id, label, error, children, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="block text-sm font-medium text-text-primary">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClassName =
  "w-full rounded-button border border-border-subtle bg-base/80 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-border-accent focus:outline-none disabled:cursor-not-allowed disabled:opacity-60";

export function formControlClassName(hasError?: boolean) {
  return cn(inputClassName, hasError && "border-danger");
}

export { inputClassName };
