import { siteConfig } from "@/lib/site-config";

import { LegalLinks } from "./LegalLinks";

export function LegalFooter() {
  const { brand, navigation, offers } = siteConfig;

  return (
    <footer className="border-t border-border-subtle bg-elevated py-12">
      <div className="mx-auto grid w-full max-w-container gap-10 px-[var(--space-container-x)] md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg font-semibold text-text-primary">{brand.name}</p>
          <p className="mt-2 text-sm text-text-secondary">{brand.tagline}</p>
          <p className="mt-4 text-xs leading-relaxed text-text-muted">
            {brand.legalName}
            <br />
            ИНН {brand.inn}
            <br />
            ОГРНИП {brand.ogrnip}
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-text-primary">Навигация</p>
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-text-secondary hover:text-text-primary">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-text-primary">Продукты</p>
          <ul className="space-y-2">
            {offers.cards.map((card) => (
              <li key={card.name} className="text-sm text-text-secondary">
                {card.name} · {card.price}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-text-muted">Рекламный бюджет и внешние сервисы оплачиваются отдельно.</p>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-text-primary">Контакты и документы</p>
          <p className="text-sm text-text-secondary">
            <a href={`mailto:${brand.email}`} className="hover:text-text-primary">
              {brand.email}
            </a>
          </p>
          <p className="mt-2 text-sm text-text-secondary">
            <a href={`mailto:${brand.ruEmail}`} className="hover:text-text-primary">
              {brand.ruEmail}
            </a>
          </p>
          <p className="mt-2 text-sm text-text-secondary">
            <a href={brand.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-text-primary">
              Telegram-канал
            </a>
            {" · "}
            <a href={brand.auditBot} target="_blank" rel="noopener noreferrer" className="hover:text-text-primary">
              ClientFlow Аудит
            </a>
          </p>
          <div className="mt-4">
            <LegalLinks />
          </div>
          <p className="mt-6 text-xs text-text-muted">
            © {new Date().getFullYear()} {brand.name}. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
