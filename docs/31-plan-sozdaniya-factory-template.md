# План создания factory-template

Статус: v1 foundation
Назначение: зафиксировать первый технический спринт перед созданием Next.js-шаблона фабрики.

## 1. Главная цель

Создать первый рабочий шаблон фабрики:

```text
apps/factory-template
```

Это не финальный клиентский сайт и не SaaS starter.

Это базовый premium ClientFlow-шаблон, из которого потом будут собираться сайты с ИИ-автоворонками, лид-магнитами, SEO, аналитикой, формами и готовностью к трафику.

## 2. Что создаём в v0.1

v0.1 — визуально и архитектурно правильный каркас без боевых секретов.

Состав:

1. Next.js App Router.
2. TypeScript strict.
3. Tailwind.
4. Базовая структура приложения.
5. Design tokens.
6. Базовые UI-компоненты.
7. Секционный каркас главной страницы.
8. Legal pages.
9. LeadForm UI без боевой отправки.
10. CookieConsent v1.
11. SEO metadata.
12. `.env.example`.
13. Build/typecheck scripts.

## 3. Что НЕ создаём в v0.1

Не делаем:

- production deploy;
- Supabase insert;
- Telegram notification;
- оплату трипвайера;
- реальный Telegram-бот;
- auth;
- dashboard;
- billing;
- сложную CMS;
- AI runtime;
- client portal.

Причина:

Сначала нужен чистый каркас высокого качества. Боевые интеграции подключаются в v0.2.

## 4. Структура v0.1

```text
apps/
  factory-template/
    app/
      layout.tsx
      page.tsx
      privacy/page.tsx
      consent/page.tsx
      cookies/page.tsx
      terms/page.tsx
    components/
      layout/
      sections/
      forms/
      legal/
      analytics/
      ui/
    styles/
      tokens.css
      base.css
      utilities.css
      globals.css
    lib/
      site-config.ts
      env.ts
      validation.ts
      utm.ts
    public/
    package.json
    next.config.ts
    tsconfig.json
```

Будущие пакеты:

```text
packages/
  ui/
  forms/
  analytics/
  telegram/
  config/
  legal/
```

В v0.1 можно оставить их пустыми или создать README внутри каждого пакета.

## 5. Обязательные компоненты v0.1

```text
Container
SectionShell
PrimaryButton
SecondaryButton
LegalLinks
LegalFooter
CookieConsent
LeadForm
ConsentCheckbox
FounderHero
ClientFlowMap
OfferCards
FAQAccordion
FinalCTA
```

## 6. Главная страница v0.1

Минимальная структура:

```text
1. Первый экран
2. Карта проблемы
3. ClientFlow System
4. Что входит в сайт
5. ИИ-автоворонка
6. Процесс работы
7. Продукты / пакеты
8. FAQ
9. Финальный CTA + LeadForm
```

## 7. Дизайн v0.1

Использовать стандарт:

- `docs/23-dizayn-sistema-premium-saytov.md`
- `docs/24-standart-motion-i-premialnyh-effektov.md`
- `docs/28-standart-bystrodeystviya-i-komforta.md`

Визуальная база:

```text
graphite / obsidian
copper action accent
steel-blue system accent
premium dark minimalism
soft glow
thin borders
clear typography
```

## 8. Форма v0.1

Форма пока без боевой отправки, но уже должна иметь:

- поля;
- client validation;
- consent checkbox;
- loading state mock;
- success state mock;
- failure state mock;
- UTM fields placeholder;
- analytics hooks placeholder.

Важно:

Даже в v0.1 форма не должна выглядеть декоративной. Она должна быть готова к подключению v0.2.

## 9. SEO v0.1

Сделать:

- metadata в layout;
- title / description;
- OpenGraph placeholder;
- canonical;
- robots placeholder;
- sitemap placeholder or plan;
- правильный H1;
- legal pages metadata.

## 10. Cursor-задача v0.1

Постановка Cursor:

```text
Создай apps/factory-template как Next.js App Router проект по стандартам репозитория. Не подключай боевые сервисы. Не трогай секреты. Реализуй premium-визуальный каркас, базовые секции, legal pages, LeadForm UI, CookieConsent, metadata и build/typecheck scripts. После работы дай отчет по docs/cursor-rules/40-otchet-posle-raboty.md.
```

## 11. Проверки v0.1

Обязательно:

```bash
npm run build
npm run typecheck
```

Если добавлен lint:

```bash
npm run lint
```

Manual QA:

- первый экран читается;
- CTA виден;
- mobile не ломается;
- форма удобна;
- legal pages открываются;
- cookie consent отображается;
- нет horizontal overflow.

## 12. v0.2

После v0.1:

1. Supabase lead storage.
2. Telegram owner notification.
3. Analytics adapters.
4. UTM capture.
5. Server route для формы.
6. Consent logs.
7. Success/failure real states.
8. Traffic-ready Gate.

## 13. v0.3

После v0.2:

1. Telegram-бот.
2. Лид-магнит.
3. Welcome-цепочка.
4. ИИ-ядро.
5. Lead score.
6. Карточка лида владельцу.
7. Трипвайер.
8. Оплата.

## 14. Решение

Переход к коду разрешён после настройки рабочей области Cursor и передачи Cursor правил проекта.

Первый технический спринт не должен уходить в лишние функции. Главная цель — создать качественный каркас, который не придётся выбрасывать.
