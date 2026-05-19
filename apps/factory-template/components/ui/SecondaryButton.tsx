import { cn } from "@/lib/cn";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type SecondaryButtonProps = {
  href?: string;
  analyticsEvent?: string;
  analyticsSection?: string;
  analyticsLabel?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<"button">, "children">;

export function SecondaryButton({
  href,
  analyticsEvent,
  analyticsSection,
  analyticsLabel,
  className,
  children,
  ...buttonProps
}: SecondaryButtonProps) {
  const classes = cn(
    "inline-flex min-h-12 items-center justify-center rounded-button border border-border-subtle bg-transparent px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:border-border-accent hover:bg-white/5",
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
