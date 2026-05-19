import Link from "next/link";

import { cn } from "@/lib/cn";

const links = [
  { href: "/privacy", label: "Конфиденциальность" },
  { href: "/consent", label: "Согласие на обработку ПДн" },
  { href: "/cookies", label: "Cookie" },
  { href: "/terms", label: "Условия" },
] as const;

type LegalLinksProps = {
  className?: string;
  inline?: boolean;
};

export function LegalLinks({ className, inline }: LegalLinksProps) {
  return (
    <nav
      className={cn(
        inline ? "flex flex-wrap gap-x-4 gap-y-2" : "flex flex-col gap-2",
        className,
      )}
      aria-label="Юридические документы"
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
