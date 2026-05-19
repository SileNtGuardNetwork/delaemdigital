import { cn } from "@/lib/cn";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type PrimaryButtonProps = {
  href?: string;
  analyticsEvent?: string;
  analyticsSection?: string;
  analyticsLabel?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<"button">, "children">;

export function PrimaryButton({
  href,
  analyticsEvent,
  analyticsSection,
  analyticsLabel,
  className,
  children,
  ...buttonProps
}: PrimaryButtonProps) {
  const classes = cn(
    "inline-flex min-h-12 items-center justify-center rounded-button bg-copper px-6 py-3 text-sm font-semibold text-base transition-colors hover:bg-copper-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper",
    className,
  );

  const dataProps = {
    ...(analyticsEvent ? { "data-analytics-event": analyticsEvent } : {}),
    ...(analyticsSection ? { "data-analytics-section": analyticsSection } : {}),
    ...(analyticsLabel ? { "data-analytics-label": analyticsLabel } : {}),
  };

  if (href) {
    return (
      <Link href={href} className={classes} {...dataProps}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...dataProps} {...buttonProps}>
      {children}
    </button>
  );
}
