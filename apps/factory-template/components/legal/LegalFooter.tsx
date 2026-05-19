import { siteConfig } from "@/lib/site-config";

import { LegalLinks } from "./LegalLinks";

export function LegalFooter() {
  const { brand } = siteConfig;

  return (
    <footer className="border-t border-border-subtle bg-elevated py-12">
      <div className="mx-auto grid w-full max-w-container gap-10 px-[var(--space-container-x)] md:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold text-text-primary">{brand.name}</p>
          <p className="mt-2 text-sm text-text-secondary">{brand.tagline}</p>
          <p className="mt-4 text-sm text-text-muted">
            {brand.legalName}
            <br />
            ИНН {brand.inn}
            <br />
            ОГРНИП {brand.ogrnip}
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-text-primary">Документы</p>
          <LegalLinks />
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-text-primary">Контакты</p>
          <p className="text-sm text-text-secondary">
            <a href={`mailto:${brand.email}`} className="hover:text-text-primary">
              {brand.email}
            </a>
          </p>
          <p className="mt-2 text-sm text-text-secondary">
            <a
              href={brand.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary"
            >
              Telegram
            </a>
          </p>
          <p className="mt-6 text-xs text-text-muted">
            © {new Date().getFullYear()} {brand.name}. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
