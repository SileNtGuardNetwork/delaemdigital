# factory-template v0.2

Premium ClientFlow-шаблон фабрики Делаем Диджитал с рабочим lead-layer: Supabase, consent logs, Telegram-уведомление владельцу, UTM и analytics без PII.

## Запуск

```bash
# из корня репозитория
npm install
npm run dev
```

Откройте http://localhost:3000

## Проверки

```bash
npm run build
npm run typecheck
npm run lint
```

`npm run build` проходит **без** Supabase env. Ошибка `503 lead_storage_not_configured` появляется только при отправке формы, если storage не настроен.

## Supabase dev setup (Free tier)

1. Создайте проект на [supabase.com](https://supabase.com) (Free, без Pro).
2. В **SQL Editor** выполните файл:
   `apps/factory-template/supabase/migrations/001_lead_layer.sql`
3. В **Project Settings → API** скопируйте:
   - Project URL → `SUPABASE_URL`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (только server, не публикуйте)

## Env (.env.local)

Скопируйте `.env.example` в `apps/factory-template/.env.local` (или корень monorepo — Next подхватит при `npm run dev` из workspace).

```text
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
TELEGRAM_BOT_TOKEN=...
TELEGRAM_OWNER_CHAT_ID=...
TELEGRAM_NOTIFICATIONS_ENABLED=true
```

**Не коммитьте** `.env.local` и реальные ключи.

### Mock submit (только dev)

```text
NEXT_PUBLIC_LEAD_FORM_MOCK=true
```

Форма не обращается к API. По умолчанию `false`.

## Telegram owner notification

Это **не** полноценный бот. Только исходящее уведомление владельцу через Bot API.

1. Создайте бота через [@BotFather](https://t.me/BotFather) → `TELEGRAM_BOT_TOKEN`
2. Напишите боту любое сообщение
3. Откройте `https://api.telegram.org/bot<TOKEN>/getUpdates` → найдите `chat.id` → `TELEGRAM_OWNER_CHAT_ID`
4. Перезапустите `npm run dev`

Отключить Telegram (заявки всё равно сохраняются в Supabase):

```text
TELEGRAM_NOTIFICATIONS_ENABLED=false
```

## Локальная проверка формы

| Шаг | Действие |
|-----|----------|
| 1 | `npm run dev` с заполненным `.env.local` |
| 2 | Откройте `/?utm_source=test&utm_medium=cpc` |
| 3 | Заполните форму на `/#contact`, отметьте согласие |
| 4 | Supabase → Table Editor → `site_leads`, `consent_logs`, `lead_events` |
| 5 | Проверьте Telegram-карточку (если токен настроен) |
| 6 | Отключите Supabase env → submit → `503` и понятное сообщение в UI |

### Failure QA

- Без consent → 400 validation
- Неверный email → 400
- `TELEGRAM_NOTIFICATIONS_ENABLED=false` → lead в БД, `notification_logs.status = skipped`
- Неверный Telegram token → lead сохранён, `notification_failed` в `site_leads`

## Analytics

- Включается только при `NEXT_PUBLIC_ANALYTICS_ENABLED=true` **и** согласии на cookie
- В события **не** попадают: имя, телефон, email, telegram, website, message, business_context, leadId
- Разрешены: section, label, path, project_type, budget_range, notification_status

## v0.2 включает

- `POST /api/leads`
- Supabase: `site_leads`, `consent_logs`, `lead_events`, `notification_logs`
- Telegram owner notification (HTML с экранированием полей)
- UTM persistence (localStorage + sessionStorage)
- Real success/failure states формы

## Не входит в v0.2

- Production deploy
- Supabase Pro (не требуется для dev)
- Telegram-бот, welcome-цепочка, ИИ-ядро
- Оплата, dashboard, CRM, auth
- IP rate limit (v0.2.1)
