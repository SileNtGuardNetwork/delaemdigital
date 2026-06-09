"use client";

import Link from "next/link";
import { useState } from "react";

import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-base/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-container items-center justify-between gap-4 px-[var(--space-container-x)] py-4">
        <Link href="/" className="font-display text-base font-semibold text-text-primary md:text-lg">
          {siteConfig.brand.name}
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Основная навигация">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <PrimaryButton
            href="#contact"
            analyticsEvent="hero_primary_cta_clicked"
            analyticsSection="header"
            analyticsLabel="header_cta"
          >
            Обсудить проект
          </PrimaryButton>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-button border border-border-subtle lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Меню</span>
          <span className="flex flex-col gap-1.5">
            <span className={cn("block h-0.5 w-5 bg-text-primary transition", open && "translate-y-2 rotate-45")} />
            <span className={cn("block h-0.5 w-5 bg-text-primary transition", open && "opacity-0")} />
            <span className={cn("block h-0.5 w-5 bg-text-primary transition", open && "-translate-y-2 -rotate-45")} />
          </span>
        </button>
      </div>

      {open ? (
        <nav
          className="border-t border-border-subtle px-[var(--space-container-x)] py-4 lg:hidden"
          aria-label="Мобильная навигация"
        >
          <ul className="space-y-3">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-1 text-sm text-text-secondary"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <PrimaryButton href="#contact" className="w-full" onClick={() => setOpen(false)}>
                Обсудить проект
              </PrimaryButton>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
