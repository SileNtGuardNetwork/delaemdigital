---
name: launch-qa-gate
description: Финальная проверка сайта перед production deploy: build, typecheck, lint, mobile, форма, Supabase, Telegram, analytics, SEO, legal, performance, accessibility и rollback. Использовать перед запуском каждого сайта.
---

# Launch QA Gate Skill

## Когда использовать

Перед production deploy и перед финальной приёмкой сайта.

## Вход

- branch / PR;
- preview URL;
- production URL if any;
- env checklist;
- Supabase status;
- Telegram status;
- analytics status;
- legal status;
- SEO map.

## Процесс

1. Проверить build.
2. Проверить typecheck.
3. Проверить lint.
4. Проверить mobile viewports.
5. Проверить no horizontal overflow.
6. Проверить форму.
7. Проверить consent.
8. Проверить Supabase writes.
9. Проверить Telegram notification.
10. Проверить UTM.
11. Проверить analytics без PII.
12. Проверить SEO metadata.
13. Проверить legal pages.
14. Проверить performance.
15. Проверить accessibility basics.
16. Проверить rollback plan.

## Выход

```text
launch QA report
pass/fail table
critical blockers
non-blocking issues
launch decision
```

## Pass criteria

Сайт можно запускать, если:

- нет critical blockers;
- форма работает;
- consent работает;
- заявки сохраняются;
- уведомления работают или failure контролируем;
- analytics без PII;
- legal pages доступны;
- SEO metadata корректна;
- mobile usable;
- rollback понятен.

## Запреты

- не запускать сайт без проверки формы;
- не запускать сайт без legal pages;
- не запускать сайт с секретами в репозитории;
- не запускать сайт с pre-checked consent;
- не запускать сайт, если mobile CTA не доступен.
