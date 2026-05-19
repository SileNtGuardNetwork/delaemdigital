# Техническое архитектурное решение

Статус: v1 foundation
Назначение: зафиксировать архитектуру будущего фабричного Next.js-шаблона до начала реализации.

## 1. Главная позиция

Фабричный шаблон не должен быть обычным landing template и не должен быть тяжёлым SaaS starter.

Цель v1:

```text
Premium ClientFlow-сайт
+ форма заявки
+ consent layer
+ Telegram-уведомление владельцу
+ Supabase lead storage
+ analytics events
+ legal footer
+ QA Gate
```

Не цель v1:

```text
Auth
Client dashboard
Billing
Complex CMS
Full SaaS admin
AI agent runtime
```

## 2. Что берём из delaemdigitalmain

Берём как паттерны:

1. Секционную структуру главной страницы.
2. Founder-led hero pattern.
3. Тёмную premium-визуальную базу.
4. Палитру graphite / copper / steel-blue.
5. Централизованный `siteConfig`.
6. Идею `AnalyticsClickListener`.
7. SEO layout pattern.
8. Cookie banner как минимальный каркас.
9. Принцип footer с юридическими реквизитами без домашнего адреса.
10. README rules как основу project rules.

Не копируем напрямую:

1. Stub form.
2. Footer без legal links.
3. Cookie banner без расширенного consent.
4. Глобальный CSS как есть.
5. Конкретные секции без props и section contract.
6. Ограниченный список analytics events.
7. Console logging в production flow.

## 3. Структура репозитория v1

Выбранная структура: lean monorepo.

Причина:

- фабрика будет производить не один сайт, а шаблоны, пакеты и будущие клиентские вариации;
- нужно отделить UI, формы, аналитику, Telegram и конфиги;
- при этом не нужен тяжёлый enterprise monorepo.

Целевая структура:

```text
apps/
  factory-template/
    app/
    components/
    public/
    styles/
    next.config.ts
    package.json

packages/
  ui/
  forms/
  analytics/
  telegram/
  config/
  legal/

docs/
  ...

prompts/
  agents/
```

Правило v1:

Если monorepo замедляет запуск, допускается временно начать с одного приложения `apps/factory-template`, но папки `packages/*` всё равно проектируются как будущие границы.

## 4. Приложение factory-template

Роль:

Базовый шаблон premium ClientFlow-сайта.

Минимальный состав:

```text
app/
  layout.tsx
  page.tsx
  privacy/page.tsx
  consent/page.tsx
  cookies/page.tsx
  terms/page.tsx
  api/leads/route.ts

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
```

## 5. Стандарт секций

Каждая секция должна иметь contract:

```text
id
name
goal
headline
subheadline
cta
analyticsEvent
mobileRules
acceptanceCriteria
```

Не допускается:

- секция только ради красоты;
- секция без задачи;
- секция без перехода или CTA;
- повтор одной и той же сетки карточек на всей странице;
- fake dashboards;
- raster text;
- визуальный шум.

## 6. Компоненты v1

Обязательные компоненты:

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
FlowMap
OfferCards
FAQAccordion
FinalCTA
AnalyticsProvider
AnalyticsClickListener
```

Желательные компоненты:

```text
FounderHero
ProblemMap
ProcessTimeline
CasePreview
TrustStack
PricingCards
```

## 7. Форма заявки

Форма v1 должна быть production-ready.

Поля по умолчанию:

```text
name
phone
telegram
email
website
business_context
project_type
budget_range
message
source
utm_source
utm_medium
utm_campaign
utm_content
utm_term
referrer
page_path
consent_accepted
consent_version
```

Правила:

- серверная валидация обязательна;
- клиентская валидация желательна;
- consent checkbox не может быть заранее включён;
- ссылки на privacy и consent рядом с формой обязательны;
- success state обязателен;
- failure state обязателен;
- analytics events обязательны;
- Telegram notification после успешной записи обязательна для v1;
- raw secrets не попадают в клиентский bundle.

## 8. Supabase

Supabase подключается на этапе lead flow v1.

Таблицы v1:

```sql
site_leads
lead_events
consent_logs
```

Минимальная логика:

- insert lead на сервере;
- insert consent log;
- insert lead event;
- owner notification status;
- failure reason if notification failed.

Не делаем в v1:

- auth;
- client portal;
- dashboard;
- billing;
- complex RLS for user accounts.

Важно:

Для клиентских проектов с персональными данными РФ отдельно проверяется инфраструктура, legal-модель и требования хранения данных. Для таких проектов может потребоваться Timeweb Cloud или отдельная инфраструктура клиента.

## 9. Telegram lead flow

Telegram используется как owner notification layer.

Минимальное сообщение владельцу:

```text
Новая заявка

Имя:
Контакт:
Проект:
Интерес:
Бюджет:
Сайт:
Сообщение:
Источник:
UTM:
Страница:
Consent:
```

Правила:

- Telegram token только server-side;
- chat id только server-side;
- notification failure не должен терять lead;
- если Telegram упал, lead всё равно должен быть сохранён;
- failure логируется в `lead_events`.

## 10. Аналитика

Цель:

Сайт должен быть измеримым до запуска трафика.

Инструменты:

- PostHog как продуктовая аналитика;
- Яндекс.Метрика для РФ-трафика;
- Better Stack позже для uptime/errors.

Минимальные события:

```text
page_viewed
section_viewed
hero_primary_cta_clicked
hero_secondary_cta_clicked
offer_card_clicked
faq_item_opened
lead_form_started
lead_form_submitted
lead_form_failed
owner_notification_sent
owner_notification_failed
final_cta_clicked
contact_method_clicked
cookie_consent_accepted
cookie_consent_rejected
```

Правила:

- технические события остаются snake_case;
- в документации события описываются по-русски;
- не отправлять лишние персональные данные в аналитику;
- analytics must never break the site;
- PostHog и Яндекс должны быть адаптерами поверх общего `trackEvent`.

## 11. Legal layer

Обязательные страницы v1:

```text
/privacy
/consent
/cookies
/terms
```

Обязательные компоненты:

```text
LegalLinks
LegalFooter
ConsentCheckbox
CookieConsent
```

Footer должен содержать:

- название бренда;
- юридическое лицо или ИП;
- ИНН;
- ОГРНИП, если применимо;
- ссылки на legal pages;
- copyright;
- без домашнего адреса в публичных marketing-blocks.

Форма должна содержать:

- явное согласие;
- кликабельные ссылки;
- не pre-checked checkbox;
- consent version.

## 12. CookieConsent

V1 минимум:

- принять;
- отклонить необязательные;
- ссылка на cookies;
- localStorage consent state;
- consent version;
- analytics gating.

V2:

- категории;
- настройка;
- журнал consent;
- синхронизация с backend if needed.

## 13. Vercel

Vercel подключается после появления первого Next.js-приложения.

Порядок:

1. GitHub repo ready.
2. `apps/factory-template` initialized.
3. Build passes locally or in CI.
4. Vercel project connected.
5. Preview deployments only.
6. Production domain only after QA Gate.

Не делаем сразу:

- production domain;
- client domain;
- payment env;
- real secrets without need;
- production launch.

## 14. Переменные окружения

Создать `.env.example`, но не коммитить `.env.local`.

Минимум:

```text
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_ANALYTICS_ENABLED=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
NEXT_PUBLIC_YANDEX_METRIKA_ID=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
TELEGRAM_BOT_TOKEN=
TELEGRAM_OWNER_CHAT_ID=
```

Правила:

- service role только server-side;
- Telegram token только server-side;
- публичные переменные только с `NEXT_PUBLIC_`;
- env validation через отдельный `env.ts`;
- не логировать secrets.

## 15. Проверки качества

Минимум до merge:

```bash
npm run build
npm run typecheck
```

Желательно v1:

```bash
npm run lint
```

V2:

```text
Playwright smoke tests
form submit test
mobile viewport checks
Lighthouse
accessibility checks
```

## 16. Что исключаем из v1

Исключаем:

- auth;
- client dashboard;
- billing;
- complex CMS;
- full AI runtime;
- autonomous AI actions;
- admin panel;
- payment flow;
- client portal;
- multilingual system unless required.

Причина:

Сначала нужен сильный сайт под заявки, а не перегруженный SaaS-шаблон.

## 17. Первый технический спринт

Спринт: `Фабричный шаблон v0.1`

Цель:

Создать минимальный Next.js-шаблон с реальной архитектурой, но без подключения боевых сервисов.

Состав:

1. `apps/factory-template`.
2. Next.js App Router.
3. TypeScript strict.
4. Tailwind.
5. tokens/base/utilities CSS.
6. `siteConfig`.
7. секции-заготовки.
8. legal pages.
9. LeadForm UI без real submit.
10. CookieConsent.
11. `.env.example`.
12. build/typecheck scripts.

Спринт v0.2:

1. Supabase lead storage.
2. Telegram notification.
3. Analytics adapters.
4. Form server route.
5. Success/failure states.
6. QA Gate run.

## 18. Решение

Фабрика строит собственный lean-шаблон.

Не берём готовый SaaS starter.

Используем `delaemdigitalmain` как внутренний референс, но переписываем архитектуру под фабрику:

```text
Секции -> contracts
CSS -> tokens/base/utilities
Форма -> production lead flow
Аналитика -> event taxonomy + adapters
Legal -> обязательный слой
Footer -> legal footer
Cookie -> consent layer
```

## 19. Следующий шаг

Создать Next.js-структуру v0.1:

```text
apps/factory-template
```

Но перед этим желательно добавить документы:

- `docs/19-inventar-komponentov.md`
- `docs/20-standart-sobytiy-analitiki.md`
- `docs/21-standart-formy-i-zayavki.md`
