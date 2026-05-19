# Статус-отчёт фабрики сайтов — 2026-05-19

Статус: управленческий срез
Назначение: зафиксировать текущее состояние фабрики сайтов Делаем Диджитал, принятые решения, выполненные работы, открытые PR, риски и следующий маршрут.

## 1. Executive summary

Зафиксирована производственная модель фабрики сайтов:

```text
GPT Business -> центр управления фабрикой
Cursor Pro+ -> инженерная реализация
```

Claude исключён из производственного стека.

Ключевое решение дня:

```text
мы не делаем один сайт вручную
мы строим фабрику, которая затем будет производить сайты под ключ
```

На 2026-05-19 в `main` принят первый эталонный визуально-технический каркас:

```text
apps/factory-template v0.1
```

В отдельном PR находится второй слой:

```text
factory-template v0.2 — lead-layer
```

`v0.2` прошёл кодовое ревью, но не сливается в `main`, пока не будет проверен на dev Supabase и Telegram.

## 2. Что уже принято в main

### factory-template v0.1

Принят и merged в `main`.

Состав:

- npm workspaces;
- Next.js App Router;
- TypeScript strict;
- Tailwind;
- premium design tokens;
- собственные UI-примитивы без shadcn;
- главная страница с 9 секциями;
- LeadForm mock;
- CookieConsent;
- legal pages;
- SEO metadata;
- robots / sitemap;
- ProfessionalService JSON-LD;
- analytics stub;
- границы будущих packages.

Назначение `v0.1`:

```text
эталонный визуально-структурный каркас фабрики
```

Это не финальный сайт Делаем Диджитал и не клиентский сайт.

## 3. Что находится в PR #2

PR:

```text
#2 — Добавить lead-layer factory-template v0.2
```

Статус:

```text
open
draft
не merged
кодовое ревью пройдено
ожидает dev Supabase QA
```

Состав `v0.2`:

- SQL migration `001_lead_layer.sql`;
- `POST /api/leads`;
- server-side validation;
- Supabase server-only слой через service role;
- `site_leads`;
- `consent_logs`;
- `lead_events`;
- `notification_logs`;
- Telegram owner notification;
- UTM persistence;
- analytics adapters без PII;
- LeadForm real submit;
- mock submit только через env flag;
- обновлены `.env.example` и README.

Что исправлено после ревью:

- notification bookkeeping защищён;
- сбой логирования уведомлений не должен ломать уже сохранённую заявку;
- server normalization усилен;
- строки trim-ятся;
- пустые nullable-поля приводятся к `null`;
- PII не логируется в analytics.

## 4. Почему v0.2 не merged

`v0.2` уже относится к рабочему lead-layer.

Его нельзя принимать только по коду, потому что нужно проверить реальную цепочку:

```text
форма -> API -> Supabase -> consent log -> lead event -> Telegram -> response UI
```

Перед merge нужно:

1. Создать dev Supabase project.
2. Применить SQL migration.
3. Заполнить `.env.local`.
4. Отправить реальную форму.
5. Проверить таблицы:
   - `site_leads`;
   - `consent_logs`;
   - `lead_events`;
   - `notification_logs`.
6. Проверить Telegram success.
7. Проверить Telegram skipped.
8. Проверить Telegram failed.
9. Проверить UTM.
10. Убедиться, что `.env.local` не попадает в Git.

## 5. Главные документы, созданные в процессе

Созданы и зафиксированы стандарты:

- `docs/22-standart-konversionnogo-prototipa.md`;
- `docs/23-dizayn-sistema-premium-saytov.md`;
- `docs/24-standart-motion-i-premialnyh-effektov.md`;
- `docs/25-seo-sistema-pod-klyuch.md`;
- `docs/26-standart-ii-avtovoronki.md`;
- `docs/27-standart-gotovnosti-k-trafiku.md`;
- `docs/28-standart-bystrodeystviya-i-komforta.md`;
- `docs/29-slovar-i-neyming-fabriki.md`;
- `docs/30-usilenie-ai-steka.md`;
- `docs/31-plan-sozdaniya-factory-template.md`;
- `docs/32-nastroyka-rabochey-oblasti-cursor.md`;
- `docs/33-plan-factory-template-v0.2.md`.

Также добавлены Cursor rules:

- `.cursor/rules/00-obshchie-pravila.mdc`;
- `.cursor/rules/10-nextjs-i-kachestvo-koda.mdc`;
- `.cursor/rules/20-dizayn-i-verstka.mdc`;
- `.cursor/rules/30-lidy-analitika-legal.mdc`;
- `.cursor/rules/40-otchet-posle-raboty.mdc`.

## 6. Текущая архитектура фабрики

```text
Документы стандартов
  -> Cursor rules
  -> factory-template v0.1
  -> factory-template v0.2 lead-layer
  -> v0.3 Telegram / AI funnel / tripwire
  -> первый сайт Делаем Диджитал
  -> клиентские сайты под ключ
```

## 7. Продуктовое состояние

Фабрика уже имеет:

- стратегию;
- правила GPT / Cursor;
- стандарты качества;
- дизайн-стандарт;
- motion-стандарт;
- SEO-стандарт;
- traffic-ready стандарт;
- стандарт ИИ-автоворонки;
- рабочую область Cursor;
- первый Next.js-шаблон;
- PR lead-layer.

Фабрика пока не имеет:

- принятого production lead-layer в `main`;
- dev Supabase QA;
- Telegram QA;
- ИИ-бота;
- welcome-цепочки;
- лид-магнита;
- трипвайера;
- payment integration;
- первого production-сайта.

## 8. Когда запускать фабрику

Фабрику можно считать технически готовой к производству первых сайтов после завершения:

```text
v0.2 accepted + merged
v0.3 plan created
минимальный Telegram/ИИ funnel стандарт утверждён
```

Минимальный запуск фабрики без полной оплаты/ИИ:

```text
после merge v0.2
```

Полноценный запуск фабрики с ИИ-автоворонкой:

```text
после v0.3
```

## 9. Когда начинать первый сайт Делаем Диджитал

Первый сайт Делаем Диджитал стоит начинать после:

1. Merge `v0.2`.
2. Создания плана `v0.3`.
3. Решения по Supabase dev/prod.
4. Решения по Telegram bot.
5. Утверждения первого copy-doc для сайта Делаем Диджитал.

Рекомендуемый порядок:

```text
1. Закрыть v0.2 dev QA
2. Merge v0.2
3. Создать docs/35-plan-factory-template-v0.3.md
4. Зафиксировать минимальную ИИ-автоворонку
5. Начать сайт Делаем Диджитал как первый production-проект фабрики
```

## 10. Главные риски

| Риск | Статус | Решение |
| --- | --- | --- |
| v0.2 не проверен на реальной БД | открыт | dev Supabase QA |
| Telegram не проверен | открыт | BotFather + chat id + тестовые сценарии |
| Legal по ПДн не проверен | открыт | юридическая проверка перед production |
| Supabase Cloud может не подходить для РФ-клиентов | открыт | матрица Supabase / РФ PostgreSQL / база клиента |
| ИИ-воронка ещё не реализована | открыт | v0.3 |
| Первый сайт может превратиться в ручную разработку | контролируемый | использовать только factory-template и QA gates |

## 11. Следующее действие

Следующий шаг:

```text
создать dev Supabase project
применить migration
заполнить .env.local
проверить v0.2 end-to-end
```

До этого не начинать первый сайт и не сливать PR #2.

## 12. Управленческое решение

На конец дня 2026-05-19 проект находится в правильной фазе.

Мы не перескочили к первому сайту преждевременно.

Сначала строится фабрика, затем через неё будет собран первый сайт Делаем Диджитал.

Главный текущий рубеж:

```text
превратить v0.2 из кодово готового слоя в проверенный рабочий lead-layer
```
