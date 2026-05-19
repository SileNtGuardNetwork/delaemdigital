# План factory-template v0.3 — ИИ-автоворонка

Статус: v1 plan
Назначение: зафиксировать следующий слой фабрики после v0.2 lead-layer: Telegram-бот, лид-магнит, welcome-цепочка, ИИ-ядро, сегментация, трипвайер и owner workflow.

## 1. Главная цель

`factory-template v0.3` превращает сайт с рабочей формой в сайт с ИИ-автоворонкой.

v0.2 отвечает на вопрос:

```text
как сайт принимает и сохраняет заявку
```

v0.3 отвечает на вопрос:

```text
как сайт автоматически вовлекает, сегментирует, прогревает и монетизирует пользователя после первого действия
```

## 2. Что создаём в v0.3

Минимальный состав:

- Telegram bot skeleton;
- bot user table;
- bot sessions;
- lead magnet delivery;
- welcome-chain state;
- AI core prompt layer;
- segmentation;
- lead score;
- owner card v2;
- tripwire offer skeleton;
- payment state skeleton;
- events for funnel analytics.

## 3. Что не создаём в v0.3 MVP

Не делаем сразу:

- сложную CRM;
- client portal;
- полноценную админку;
- multi-tenant SaaS;
- сложный payment provider flow без отдельного решения;
- voice bot;
- omnichannel automation;
- paid Supabase Pro без необходимости;
- production deploy без QA.

## 4. База данных

Добавить таблицы:

### bot_users

```text
id uuid primary key
created_at timestamptz
updated_at timestamptz
lead_id uuid references site_leads(id)
telegram_user_id text
telegram_username text
first_name text
last_name text
language_code text
status text
metadata jsonb
```

### bot_sessions

```text
id uuid primary key
created_at timestamptz
updated_at timestamptz
bot_user_id uuid references bot_users(id)
lead_id uuid references site_leads(id)
state text
current_step text
last_message_at timestamptz
metadata jsonb
```

### lead_magnet_deliveries

```text
id uuid primary key
created_at timestamptz
lead_id uuid references site_leads(id)
bot_user_id uuid references bot_users(id)
lead_magnet_id text
status text
delivery_channel text
metadata jsonb
```

### ai_funnel_answers

```text
id uuid primary key
created_at timestamptz
lead_id uuid references site_leads(id)
bot_user_id uuid references bot_users(id)
question_id text
question_text text
answer_text text
answer_type text
metadata jsonb
```

### lead_segments

```text
id uuid primary key
created_at timestamptz
lead_id uuid references site_leads(id)
segment text
score integer
reason text
metadata jsonb
```

### tripwire_offers

```text
id uuid primary key
created_at timestamptz
lead_id uuid references site_leads(id)
bot_user_id uuid references bot_users(id)
offer_id text
status text
price integer
currency text
payment_status text
metadata jsonb
```

## 5. Telegram bot architecture

Минимальный маршрут:

```text
/start
получить lead magnet
задать 2-4 диагностических вопроса
сегментировать пользователя
выдать welcome-сообщение
предложить следующий шаг
если уместно — показать tripwire
уведомить владельца
```

## 6. Lead magnet

Лид-магнит должен быть связан с нишей.

Типы:

- чеклист;
- мини-аудит;
- PDF;
- Telegram-серия;
- diagnostic score;
- расчет / калькулятор;
- подборка ошибок;
- карта улучшений.

## 7. AI core

ИИ-ядро не должно делать всё подряд.

Минимальные функции:

- интерпретировать ответы пользователя;
- определить сегмент;
- оценить готовность к покупке;
- предложить next best action;
- сформировать owner summary;
- подготовить персонализированное сообщение.

## 8. Segmentation

Базовые сегменты:

```text
hot_lead
warm_lead
cold_lead
not_fit
needs_diagnostic
price_sensitive
urgent_problem
```

## 9. Lead score

Шкала:

```text
0-100
```

Факторы:

- срочность;
- бюджет;
- боль;
- полномочия;
- ниша;
- готовность к действию;
- качество ответов;
- интерес к трипвайеру.

## 10. Owner card v2

Владелец должен получать не просто уведомление, а карточку:

```text
новый лид
контакт
источник
UTM
lead score
segment
боль
интерес
ответы
следующий рекомендуемый шаг
status
```

## 11. Tripwire skeleton

В v0.3 можно сделать skeleton:

- offer shown;
- payment started;
- payment success;
- payment failed;
- manual payment link placeholder.

Конкретный провайдер оплаты выбирается отдельно.

## 12. Analytics events

Добавить события:

```text
telegram_started
lead_magnet_requested
lead_magnet_delivered
ai_question_answered
segment_assigned
lead_score_updated
welcome_step_sent
tripwire_offered
payment_started
payment_success
payment_failed
```

PII не отправлять в analytics.

## 13. QA

v0.3 считается готовым, если:

- бот запускается;
- пользователь получает лид-магнит;
- ответы сохраняются;
- сегмент сохраняется;
- lead score сохраняется;
- owner card приходит;
- tripwire skeleton работает;
- ошибки не теряют пользователя;
- analytics без PII;
- build/typecheck/lint проходят.

## 14. Порядок реализации

Только после merge v0.2:

```text
1. docs/43-plan-factory-template-v0.3.md accepted
2. Cursor делает implementation plan
3. GPT Business review
4. отдельная ветка factory-template-v0.3
5. SQL migration
6. bot skeleton
7. lead magnet flow
8. AI core stub
9. owner card v2
10. QA
11. PR
12. review
13. merge
```

## 15. Ожидаемый эффект

```text
фабрика: 70-75% после v0.2 -> 88-92% после v0.3
ценность сайта: +30-50%
автоматизация прогрева: +60%
готовность к продукту "сайт + ИИ-автоворонка": 90%+
```
