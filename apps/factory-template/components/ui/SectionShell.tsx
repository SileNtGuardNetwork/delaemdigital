import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type SectionVariant = "default" | "elevated" | "accent";

type SectionShellProps = {
  id: string;
  children: ReactNode;
  className?: string;
  variant?: SectionVariant;
  analyticsName?: string;
};

const variantClasses: Record<SectionVariant, string> = {
  default: "bg-base",
  elevated: "bg-elevated",
  accent:
    "bg-elevated border-y border-border-subtle bg-[radial-gradient(ellipse_at_top,rgba(91,124,157,0.08),transparent_55%)]",
};

export function SectionShell({
  id,
  children,
  className,
  variant = "default",
  analyticsName,
}: SectionShellProps) {
  return (
    <section
      id={id}
      data-section={analyticsName ?? id}
      className={cn(
        "py-[var(--space-section-y-lg)]",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </section>
  );
}
