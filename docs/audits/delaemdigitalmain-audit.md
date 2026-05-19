# Аудит репозитория delaemdigitalmain

Статус: первичный аудит
Цель: понять, что можно переиспользовать для фабрики сайтов, что нужно усилить, а что нельзя переносить без переработки.

## 1. Проверенный репозиторий

Репозиторий: `SileNtGuardNetwork/delaemdigitalmain`

Назначение по README: текущий сайт Делаем Диджитал, демонстрирующий ClientFlow System как маршрут от первого касания до квалифицированной заявки.

## 2. Краткий вывод

`delaemdigitalmain` полезен как внутренний эталон и исходный материал, но не должен становиться фабричным шаблоном напрямую.

Можно переиспользовать:

- секционную структуру главной страницы;
- подход к тёмной premium-визуальной системе;
- hero-композицию с founder-led подачей;
- базовые design tokens;
- централизованную конфигурацию сайта;
- начальную аналитику кликов;
- идею cookie banner;
- юридический минимум как направление.

Нельзя переносить без усиления:

- форму заявки, потому что сейчас это stub;
- footer, потому что legal-links неполные;
- cookie banner, потому что он слишком простой для строгого consent-слоя;
- аналитику, потому что event taxonomy ограничена;
- CSS как единый большой слой без выделения фабричных токенов;
- секции как универсальные компоненты без нормализации props и шаблонов.

## 3. Стек

Найденный стек:

- Next.js
- TypeScript
- Tailwind CSS
- Supabase client dependency
- PostHog dependency
- Zod dependency
- Яндекс.Метрика через внутренний analytics layer

Плюсы:

- стек близок к целевой фабрике;
- TypeScript strict включён;
- есть build и typecheck scripts;
- Tailwind CSS уже используется;
- зависимости Supabase, PostHog и Zod уже заложены.

Минусы:

- Supabase пока не используется как полноценный lead storage;
- PostHog есть в зависимостях, но нужен строгий стандарт событий;
- нет Playwright smoke tests;
- нет отдельного пакета форм;
- нет отдельного пакета аналитики;
- нет env example standard.

## 4. Главная страница

Главная страница собрана модульно через секции:

- Header
- HeroSection
- ContextSection
- SystemSection
- AssemblySection
- AuditSection
- ServicesSection
- ProcessSection
- WhySection
- AudienceSection
- LeadsSection
- PricingSection
- FounderSection
- FinalCtaSection
- Footer
- CookieBanner

Плюсы:

- хорошая секционная декомпозиция;
- структура близка к будущей фабрике;
- главная уже мыслит не одной витриной, а маршрутом;
- CookieBanner подключён на уровне страницы.

Риски:

- секции пока конкретны для ДД, а не универсальны;
- нет единого Section Contract;
- нет props-driven архитектуры;
- нет общей карты событий по секциям;
- нет автоматической проверки, что каждая секция имеет задачу, CTA и mobile rules.

Решение для фабрики:

Не копировать секции напрямую. Использовать их как эталон для создания фабричных паттернов:

- `HeroFounderSystem`
- `ProblemRouteLoss`
- `ClientFlowMap`
- `OfferCards`
- `ProcessTimeline`
- `FounderAuthority`
- `FinalLeadForm`

## 5. Hero

Сильные стороны:

- hero отвечает на главный смысл: собирается управляемая система привлечения клиентов;
- есть сильная founder-led подача;
- CTA разделены на коммерческий шаг и Telegram-канал;
- есть маршрут: Трафик, Сайт, AI-квалификация, Заявка, Аналитика;
- портрет вынесен в визуальный слой;
- mobile получает приглушённый фон вместо тяжелой правой колонки.

Что взять:

- структуру hero: kicker, H1, subheadline, CTA, route proof;
- тёмный premium mood;
- связку founder + system route;
- restrained copper / steel-blue акценты.

Что улучшить:

- hero должен стать props-driven;
- маршрут должен быть отдельным компонентом;
- CTA-события должны следовать единому стандарту;
- visual rules должны быть вынесены в design system;
- нужно добавить доступную альтернативу для важных визуальных элементов, если они несут смысл.

## 6. Форма заявки

Текущее состояние:

- форма есть в финальном CTA;
- поля: имя, email, сайт, интерес;
- интерес выбирается chips;
- submit сейчас делает `preventDefault` и `console.log`;
- нет реальной отправки;
- нет Supabase insert;
- нет Telegram notification;
- нет success/failure state;
- нет обязательного отдельного consent checkbox;
- текст согласия есть, но без кликабельных legal links.

Вердикт:

Форму нельзя переносить в фабрику как production-решение.

Что нужно для фабрики:

- `LeadForm` как отдельный компонент;
- Zod schema;
- server action или route handler;
- Supabase insert;
- Telegram owner notification;
- success state;
- failure state;
- consent checkbox not pre-checked;
- кликабельные ссылки на privacy и consent;
- UTM capture;
- event tracking;
- spam protection;
- rate limiting на production.

## 7. Аналитика

Сильные стороны:

- есть централизованный `AnalyticsClickListener`;
- клики ловятся через `data-analytics-event`;
- параметры нормализуются;
- ошибка аналитики не ломает сайт;
- подключены компоненты Яндекс.Метрики и PostHog provider.

Ограничения:

- события пока ограничены CTA, pricing, Telegram, legal, cookie, lead submit;
- нет обязательного `section_viewed`;
- нет стандартных событий `form_started`, `owner_notification_sent`, `owner_notification_failed`;
- нет отдельной event taxonomy для фабрики;
- не видно связи с PostHog как полноценной продуктовой аналитикой.

Решение для фабрики:

Создать отдельный стандарт:

- `analytics/events.ts`;
- `trackEvent` provider abstraction;
- adapters: Yandex, PostHog;
- event naming convention на русском в документации, но с техническими snake_case событиями;
- запрет на отправку лишних персональных данных.

## 8. SEO и метаданные

Сильные стороны:

- metadata вынесены в layout;
- есть title template;
- description и keywords берутся из config;
- есть OpenGraph;
- есть Twitter card;
- html lang ru;
- используются шрифты с cyrillic subsets.

Что улучшить:

- проверить необходимость `en` alternate, если английской версии нет;
- добавить page-level metadata для legal pages;
- добавить sitemap и robots standard;
- добавить OG image generation или статический production-ready OG.

## 9. Footer и legal

Сильные стороны:

- в footer выведены ИП, ИНН, ОГРНИП;
- домашний адрес не выводится;
- есть базовая навигация.

Проблемы:

- нет ссылок на privacy, consent, cookies, terms;
- есть пункт Web3, который может быть лишним для текущей публичной структуры;
- footer не соответствует полностью утверждённому legal/footer стандарту;
- legal links должны быть рядом с формой и в footer.

Решение для фабрики:

Создать `LegalFooter` и `LegalLinks` как обязательные компоненты.

## 10. Cookie banner

Сильные стороны:

- баннер есть;
- сохраняет выбор в localStorage;
- есть ссылка на cookies;
- событие `cookie_accept` размечено.

Ограничения:

- только одна кнопка `Понятно`;
- нет отдельных категорий;
- нет отказа от необязательных cookies;
- нет настройки аналитики до согласия;
- не логируется версия consent-текста;
- текст нуждается в приведении к утверждённому cookie standard.

Решение для фабрики:

V1 может иметь простой cookie layer, но для production-клиентов нужен расширенный `CookieConsent`:

- принять;
- настроить;
- отклонить необязательные;
- категории;
- localStorage consent version;
- analytics gating.

## 11. Design tokens и CSS

Сильные стороны:

- есть сильная палитра graphite / obsidian / copper / steel-blue;
- есть радиусы, тени, surface tokens;
- есть базовая typography direction;
- dark mode принят как основной.

Проблемы:

- в `globals.css` смешаны новые `--dd-*` токены и старые generic tokens;
- CSS большой и содержит много глобальных классов;
- нужно выделить фабричный token layer;
- нужно разделить global base, tokens, utilities, component styles.

Решение для фабрики:

Создать:

- `styles/tokens.css`;
- `styles/base.css`;
- `styles/utilities.css`;
- `components/ui` на базе tokens;
- brand override layer для клиентских сайтов.

## 12. Что брать в фабрику

Берём как основу решений:

1. Секционная архитектура главной.
2. Founder-led hero pattern.
3. Тёмная premium visual direction.
4. Палитра graphite / copper / steel-blue.
5. Центральный siteConfig.
6. Analytics click listener idea.
7. SEO layout pattern.
8. Cookie banner как минимальный каркас.
9. Footer legal data principle без домашнего адреса.
10. README rules как основу для project rules.

## 13. Что не брать напрямую

Не переносить напрямую:

1. Stub form.
2. Footer без legal links.
3. Cookie banner без категорий и отказа.
4. Глобальный CSS как есть.
5. Конкретные секции без props и section contract.
6. Ограниченный список analytics events.
7. Chips selection без accessible state review.
8. Console logging в production flow.

## 14. Решение для будущего шаблона

Фабричный шаблон должен быть lean, но боевой:

```text
Next.js app
+ design tokens
+ section contracts
+ lead form
+ consent layer
+ analytics layer
+ Telegram notification
+ legal footer
+ QA gate
```

Не делать в v1:

```text
auth
client dashboard
billing
complex CMS
full SaaS admin
AI agent runtime
```

## 15. Итоговая оценка

| Блок | Оценка | Комментарий |
| --- | ---: | --- |
| Архитектура страниц | 8 | Хорошая секционная база |
| Визуальное направление | 8 | Сильная premium-основа |
| Copy / позиционирование | 8 | Близко к текущему ДД-стандарту |
| Форма / lead flow | 3 | Stub, не production |
| Legal layer | 5 | Есть ИП-данные, но links и consent неполные |
| Аналитика | 6 | Есть основа, нужна taxonomy и PostHog layer |
| Переиспользуемость | 5 | Нужно выделять компоненты и contracts |
| Production-readiness | 5 | Для визуального сайта ок, для фабрики недостаточно |
| Фабричная ценность | 7 | Хороший внутренний reference, не готовый template |

Средняя оценка: 6.1 / 10

Вердикт: использовать как внутренний референс и источник паттернов, но не как основу прямого копирования.

## 16. Следующее действие

Создать документ:

`docs/18-technical-architecture-decision.md`

В нём зафиксировать:

- структура будущего шаблона;
- какие части берём из `delaemdigitalmain`;
- что переписываем;
- что исключаем из v1;
- как будет устроен lead flow;
- как будет устроена аналитика;
- как будет устроен legal layer;
- когда подключаем Vercel и Supabase.
