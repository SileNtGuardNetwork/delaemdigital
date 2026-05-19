---
name: seo-traffic-audit
description: Проверяет сайт на SEO, traffic-ready, metadata, structured data, UTM, analytics events и AI/GEO visibility. Использовать перед запуском и при аудите клиентских сайтов.
---

# SEO Traffic Audit Skill

## Когда использовать

- перед запуском сайта;
- при аудите текущего сайта клиента;
- при анализе конкурентов;
- после production deploy;
- перед запуском рекламы.

## Вход

- URL сайта;
- список страниц;
- ниша;
- регион;
- целевые запросы;
- traffic source;
- analytics setup;
- lead form details.

## Процесс

1. Проверить title / description / canonical.
2. Проверить H1 / headings.
3. Проверить structured data.
4. Проверить sitemap / robots.
5. Проверить OpenGraph.
6. Проверить CTA and landing quality.
7. Проверить UTM handling.
8. Проверить analytics events без PII.
9. Проверить AI/GEO readability.
10. Зафиксировать SEO gaps и conversion gaps.

## Выход

```text
SEO audit report
traffic readiness score
metadata table
critical issues
recommendations
```

## QA

Audit готов, если:

- проверены все индексируемые страницы;
- есть список critical issues;
- есть рекомендации;
- отдельно отмечены conversion risks;
- отдельно отмечены analytics / PII risks.

## Запреты

- не принимать сайт с одинаковыми title;
- не принимать форму без events;
- не отправлять PII в analytics;
- не считать SEO готовым без sitemap / robots / canonical strategy.
