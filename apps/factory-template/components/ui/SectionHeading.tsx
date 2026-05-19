import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <h2 className="font-display text-[length:var(--text-h2)] font-semibold leading-tight tracking-tight text-text-primary">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-lg text-text-secondary">{subtitle}</p>
      ) : null}
    </div>
  );
}
