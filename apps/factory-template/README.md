# factory-template v0.2

Premium ClientFlow-шаблон фабрики Делаем Диджитал с рабочим lead-layer.

## Запуск

```bash
# из корня репозитория
npm install
npm run dev
```

Откройте http://localhost:3000

## Настройка environment

Создайте `.env.local` в `apps/factory-template/`:

```bash
# Supabase (обязательно)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Telegram (опционально, для owner notifications)
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_OWNER_CHAT_ID=your-chat-id

# Public
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ANALYTICS_ENABLED=false
```

## Проверки

```bash
npm run build
npm run typecheck
npm run lint
```

## v0.2 включает

- Next.js App Router, TypeScript strict, Tailwind
- Design tokens и UI-примитивы
- 9 секций главной страницы
- LeadForm с real submit через `/api/leads`
- Supabase: site_leads, consent_logs, lead_events, notification_logs
- Telegram owner notification (опционально)
- Consent logging
- CookieConsent v1
- Legal pages
- SEO metadata, robots, sitemap
- Organization / ProfessionalService JSON-LD

## Таблицы Supabase

- `site_leads` — заявки
- `consent_logs` — логи согласий
- `lead_events` — события обработки
- `notification_logs` — попытки уведомлений

## Telegram

Если TELEGRAM_BOT_TOKEN и TELEGRAM_OWNER_CHAT_ID указаны, при новой заявке владельцу приходит карточка лида.

Если Telegram не настроен или произошла ошибка — заявка всё равно сохраняется, статус `notification_failed`.

## Статус заявки

- `new` — новая заявка
- `notified` — уведомление отправлено
- `notification_failed` — ошибка уведомления
- `in_review` — в обработке
- `qualified` — квалифицирован
- `not_fit` — не подходит
- `contacted` — связались
- `archived` — в архиве

##下一步

- PostHog / Яндекс.Метрика аналитика
- Playwright QA
- Telegram-бот и ИИ-автоворонка (v0.3)
