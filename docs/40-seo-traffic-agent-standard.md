# SEO / Traffic Agent Standard — Делаем Диджитал

Статус: v1 standard
Назначение: зафиксировать стандарт SEO, traffic-ready и post-launch оптимизации для сайтов фабрики.

## 1. Главный принцип

Сайт фабрики не считается готовым, если он только красиво выглядит.

Сайт должен быть готов к:

```text
органическому поиску
платному трафику
аналитике
UTM
конверсии
последующей оптимизации
AI / GEO visibility
```

## 2. Роль SEO / Traffic Agent

SEO / Traffic Agent включается на этапах:

```text
Discovery
Blueprint
Copy-doc
Before implementation
Before launch
Post-launch
```

Задачи:

- SEO-карта;
- посадочные интенты;
- metadata;
- headings;
- internal links;
- structured data;
- sitemap;
- robots;
- UTM strategy;
- analytics event map;
- landing quality audit;
- AI / GEO readiness;
- post-launch monitoring.

## 3. Входные данные

Для работы агенту нужны:

- ниша;
- регион;
- целевая аудитория;
- оффер;
- список услуг;
- конкуренты;
- traffic source;
- география;
- страницы сайта;
- lead magnet;
- форма;
- аналитика.

## 4. SEO-карта

Минимальная SEO-карта должна содержать:

```text
страница
основной интент
основной ключ
дополнительные ключи
H1
title
description
schema type
CTA
внутренние ссылки
```

## 5. Страницы по умолчанию

Для сайта фабрики минимально:

```text
/
/privacy
/consent
/cookies
/terms
```

Для production-сайта эксперта или компании может добавляться:

```text
/about
/services
/cases
/blog
/diagnostic
/lead-magnet
```

## 6. Metadata standard

Для каждой индексируемой страницы:

- title;
- description;
- canonical;
- OpenGraph title;
- OpenGraph description;
- OpenGraph image;
- robots policy;
- language;
- structured data where appropriate.

Запрещено:

- одинаковые title на всех страницах;
- пустые description;
- canonical без стратегии;
- OpenGraph без изображения;
- индексировать технические страницы без причины.

## 7. Structured Data

Разрешённые типы:

```text
ProfessionalService
Organization
Person
WebSite
WebPage
FAQPage
Article
Service
BreadcrumbList
```

FAQ schema использовать только если на странице реально есть FAQ.

## 8. Traffic-ready analytics

Каждый сайт должен иметь event map:

```text
page_view
cta_click
lead_form_viewed
lead_form_started
lead_form_submit_attempt
lead_form_submitted
lead_form_failed
lead_magnet_requested
telegram_started
tripwire_offered
payment_started
payment_success
```

Запрещено отправлять PII в analytics:

```text
name
phone
email
telegram
message
business_context
leadId
```

## 9. Landing quality audit

Перед запуском проверить:

- H1 ясно объясняет оффер;
- первый CTA виден без скролла;
- есть trust-блок;
- есть работа с возражениями;
- форма не слишком рано и не слишком поздно;
- mobile CTA доступен;
- legal links есть;
- thank-you / success state есть;
- UTM сохраняются;
- event tracking работает.

## 10. GEO / AI visibility readiness

Сайт должен быть понятен не только поисковику, но и AI-системам.

Проверить:

- ясное описание компании;
- кто оказывает услугу;
- что входит;
- для кого;
- какие результаты;
- где работает;
- условия;
- FAQ;
- структурированные данные;
- clean HTML text, а не raster text.

## 11. Post-launch monitoring

После запуска проверить:

```text
индексация
sitemap submitted
robots доступен
analytics events
conversion rate
lead quality
UTM sources
form failures
404
Core Web Vitals
```

## 12. Связанные внешние паттерны

Вдохновение:

- nowork-studio/toprank — SEO / Ads / GEO agent model;
- firecrawl/firecrawl — crawl / scrape / clean web data;
- Playwright — проверка реального пользовательского пути.

## 13. Эффект

Ожидаемый прирост после внедрения:

```text
SEO readiness: 50% -> 85%
traffic readiness: 55% -> 85%
post-launch optimization: 20% -> 70%
AI/GEO visibility: 10% -> 60-70%
```

## 14. Внедрение

Код не меняется.

После v0.2 merge создать skill:

```text
factory-skills/seo-traffic-audit/SKILL.md
```

И добавить SEO checklist в project workflow.
