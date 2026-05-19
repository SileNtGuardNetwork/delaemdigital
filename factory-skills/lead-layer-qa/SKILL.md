---
name: lead-layer-qa
description: Проверяет рабочий слой заявок сайта: форма, server route, Supabase, consent logs, lead events, Telegram notification, UTM и analytics без PII. Использовать перед merge и production deploy.
---

# Lead Layer QA Skill

## Когда использовать

Использовать после реализации формы и интеграций.

## Вход

- branch / PR;
- env status;
- Supabase project;
- Telegram bot status;
- test URL;
- form fields;
- expected database tables.

## Процесс

1. Проверить `.env.local` и отсутствие секретов в Git.
2. Проверить migration.
3. Отправить валидную заявку.
4. Проверить `site_leads`.
5. Проверить `consent_logs`.
6. Проверить `lead_events`.
7. Проверить `notification_logs`.
8. Проверить Telegram sent / skipped / failed.
9. Проверить UTM.
10. Проверить analytics events без PII.
11. Проверить UI success/failure states.

## Выход

```text
lead QA report
pass/fail table
open risks
merge decision
```

## QA pass criteria

Lead-layer считается готовым, если:

- заявка сохраняется;
- consent сохраняется;
- event создаётся;
- Telegram failure не теряет lead;
- UTM сохраняются;
- PII не уходит в analytics;
- user получает управляемый response;
- build/typecheck/lint проходят.

## Запреты

- не принимать форму, если она только отправляет Telegram;
- не принимать форму без consent;
- не принимать route, если Supabase env ломает build;
- не логировать PII в console.
