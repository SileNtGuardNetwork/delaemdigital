# План factory-template v0.2

Статус: v1 foundation
Назначение: зафиксировать второй технический слой фабрики сайтов — рабочий lead-layer: база, форма, consent, события, Telegram-уведомление и analytics adapters.

## 1. Главная цель

`factory-template v0.2` должен превратить v0.1 из визуального premium-каркаса в рабочую систему приёма заявок.

v0.1 отвечает на вопрос:

```text
Как выглядит и устроен эталонный сайт фабрики?
```

v0.2 отвечает на вопрос:

```text
Как сайт принимает, сохраняет, фиксирует и передаёт заявку владельцу?
```

## 2. Что создаём в v0.2

Состав v0.2:

1. Server route для формы.
2. Server-side validation.
3. Supabase lead storage.
4. Consent logs.
5. Lead events.
6. Notification logs.
7. Telegram owner notification.
8. UTM persistence.
9. Analytics adapters.
10. Real success/failure states.
11. Env requirements.
12. SQL migration.
13. QA checks.

## 3. Что НЕ создаём в v0.2

Не делаем:

- полноценный Telegram-бот;
- welcome-цепочку;
- ИИ-ядро;
- lead score;
- оплату трипвайера;
- client portal;
- dashboard;
- CRM;
- auth;
- production deploy без отдельной команды;
- сложную админку.

Это слой заявки, а не вся ИИ-автоворонка.

## 4. База данных

Основной путь фабрики:

```text
Supabase PostgreSQL
```

Стратегия:

```text
Разработка / preview: Supabase Free или отдельный dev project
Production: Supabase Pro или согласованная production-база
РФ-проекты с особыми требованиями: PostgreSQL в РФ / база клиента / отдельная инфраструктура
```

В v0.2 архитектура должна быть Supabase-first, но без жёсткой привязки бизнес-логики к клиентскому SDK.

## 5. Таблицы v0.2

### site_leads

Назначение: хранит заявки.

Поля:

```text
id uuid primary key
created_at timestamptz
updated_at timestamptz
status text
source text
page_path text
referrer text
utm_source text
utm_medium text
utm_campaign text
utm_content text
utm_term text
name text
phone text
telegram text
email text
website text
project_type text
budget_range text
business_context text
message text
consent_accepted boolean
consent_version text
owner_notification_status text
owner_notification_error text
metadata jsonb
```

Статусы:

```text
new
notified
notification_failed
in_review
qualified
not_fit
contacted
archived
```

### consent_logs

Назначение: хранит факт согласия.

Поля:

```text
id uuid primary key
lead_id uuid references site_leads(id)
created_at timestamptz
consent_accepted boolean
consent_version text
privacy_url text
consent_url text
form_id text
page_path text
metadata jsonb
```

### lead_events

Назначение: хранит события обработки заявки.

Поля:

```text
id uuid primary key
lead_id uuid references site_leads(id)
created_at timestamptz
event_name text
event_payload jsonb
```

Примеры событий:

```text
lead_created
consent_saved
owner_notification_sent
owner_notification_failed
lead_status_changed
```

### notification_logs

Назначение: хранит попытки уведомления владельца.

Поля:

```text
id uuid primary key
lead_id uuid references site_leads(id)
created_at timestamptz
channel text
status text
error text
payload jsonb
```

Каналы:

```text
telegram
email
manual
```

## 6. Server route формы

Создать:

```text
apps/factory-template/app/api/leads/route.ts
```

Маршрут:

```text
POST /api/leads
```

Обработка:

```text
1. принять payload
2. server-side validation через Zod
3. normalize contacts
4. reject invalid consent
5. insert site_leads
6. insert consent_logs
7. insert lead_events: lead_created
8. send Telegram owner notification
9. insert notification_logs
10. update site_leads.owner_notification_status
11. return success response
```

Важно:

Telegram failure не должен терять заявку.

## 7. Validation

Использовать общую Zod-схему из v0.1, но разделить:

```text
client schema
server schema
normalized payload type
```

Server validation обязательна всегда.

Правила:

- trim strings;
- phone OR telegram OR email required для production v0.2;
- consent required;
- limit text length;
- block empty critical fields;
- ignore unknown unsafe fields;
- не доверять client-side hidden fields.

## 8. Supabase слой

Создать server-side lib:

```text
apps/factory-template/lib/server/supabase.ts
apps/factory-template/lib/server/leads.ts
```

Правила:

- Supabase service role только server-side;
- не импортировать server client в client components;
- все database writes через server route;
- `.env.example` должен содержать только имена переменных, без секретов.

Env:

```text
NEXT_PUBLIC_SITE_URL=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
TELEGRAM_BOT_TOKEN=
TELEGRAM_OWNER_CHAT_ID=
NEXT_PUBLIC_ANALYTICS_ENABLED=false
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
NEXT_PUBLIC_YANDEX_METRIKA_ID=
```

## 9. Telegram owner notification

Создать:

```text
apps/factory-template/lib/server/telegram.ts
```

Формат уведомления владельцу:

```text
Новая заявка

Проект:
Интерес:
Имя:
Контакт:
Сайт:
Бюджет:
Проблема:
Сообщение:
Источник:
UTM:
Страница:
Consent:
```

Правила:

- token только server-side;
- chat id только server-side;
- не отправлять лишние sensitive data;
- ошибка Telegram логируется;
- ошибка Telegram не ломает сохранение заявки;
- owner_notification_status обновляется.

## 10. LeadForm v0.2

Обновить `LeadForm`:

- убрать mock-submit как default;
- отправлять POST `/api/leads`;
- сохранить loading state;
- сохранить success state;
- сохранить failure state;
- не терять введённые данные при ошибке;
- отправлять analytics events;
- не отправлять PII в analytics;
- сохранять fallback mock только через explicit dev flag, если нужно.

## 11. UTM persistence

v0.2 должен сохранять UTM надёжнее, чем v0.1.

Client side:

- capture query params;
- save to localStorage/sessionStorage;
- attach to form payload.

Server side:

- validate UTM;
- save to `site_leads`;
- include in owner card.

Поля:

```text
utm_source
utm_medium
utm_campaign
utm_content
utm_term
referrer
page_path
source
```

## 12. Analytics adapters

v0.2 должен подготовить adapters:

```text
apps/factory-template/lib/analytics/events.ts
apps/factory-template/lib/analytics/posthog.ts
apps/factory-template/lib/analytics/yandex.ts
```

Реальная загрузка провайдеров может быть включена только через env и cookie consent.

Запрещено отправлять в analytics:

```text
name
phone
email
telegram
message
business_context
```

События:

```text
lead_form_viewed
lead_form_started
lead_form_submit_attempt
lead_form_submitted
lead_form_failed
owner_notification_sent
owner_notification_failed
```

## 13. SQL migration

Создать директорию:

```text
apps/factory-template/supabase/migrations/
```

Файл:

```text
001_lead_layer.sql
```

В миграции:

- create tables;
- indexes по created_at, status, utm_source, project_type;
- enums или check constraints if useful;
- RLS disabled or restricted depending on server-only usage;
- комментарии к таблицам.

В v0.2 можно использовать service role server-side без public client access.

## 14. README update

Обновить:

```text
apps/factory-template/README.md
```

Добавить:

- как создать Supabase project;
- какие env нужны;
- как применить SQL migration;
- как проверить форму;
- как проверить Telegram notification;
- что не входит в v0.2;
- как отключить Telegram в dev if needed.

## 15. Проверки v0.2

Автоматические:

```bash
npm run build
npm run typecheck
npm run lint
```

Ручные:

- отправка валидной формы;
- отказ без consent;
- ошибка invalid email;
- phone/telegram/email validation;
- запись в `site_leads`;
- запись в `consent_logs`;
- запись в `lead_events`;
- Telegram notification success;
- Telegram notification failure не теряет заявку;
- UTM сохраняются;
- success state работает;
- failure state работает;
- analytics events без PII.

## 16. Стратегия без покупки сразу

Не покупать Supabase Pro до необходимости.

Порядок:

```text
1. Создать dev Supabase project.
2. Применить migration.
3. Проверить v0.2 локально.
4. Проверить preview.
5. Только потом принимать решение о Pro.
```

## 17. Риски

| Риск | Решение |
| --- | --- |
| Утечка service role key | Только server-side, env, не коммитить |
| Telegram failure теряет заявку | Сначала save lead, потом notify |
| PII уходит в analytics | Typed event payload без PII |
| Supabase Free limits | Для dev ок, production решается отдельно |
| РФ legal requirements | Матрица инфраструктуры: Supabase / РФ PostgreSQL / база клиента |
| Форма считается production при mock | v0.2 убирает mock по умолчанию |
| Нет owner workflow | Owner card + lead status + suggested next action |

## 18. Критерий готовности v0.2

v0.2 готов, если:

- форма реально отправляет заявку;
- заявка сохраняется в базе;
- consent log сохраняется;
- lead event сохраняется;
- Telegram notification отправляется или failure логируется;
- success/failure state работает;
- UTM сохраняются;
- analytics events работают без PII;
- build/typecheck/lint проходят;
- README объясняет настройку;
- секреты не попали в репозиторий.

## 19. Что после v0.2

v0.3:

- Telegram-бот;
- лид-магнит;
- welcome-цепочка;
- ИИ-ядро;
- сегментация;
- lead score;
- трипвайер;
- payment integration;
- owner lead card v2.

## 20. Решение

`factory-template v0.2` — это не новый сайт, а второй слой фабрики.

После v0.2 каждый сайт фабрики сможет не только выглядеть premium, но и принимать заявки как production-система.
