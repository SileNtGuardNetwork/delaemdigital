# Factory Agents System — Делаем Диджитал

Статус: v1 governance
Назначение: зафиксировать агентную систему фабрики сайтов. Основано на собственных стандартах Делаем Диджитал и выборочно усилено паттернами BMAD-METHOD, agency-agents, spec-kit и Superpowers.

## 1. Главный принцип

Фабрика не работает через одного универсального агента.

Фабрика работает через роли:

```text
GPT Business = центр управления, стратегия, приёмка
Cursor Pro+ = инженерная реализация
Factory Agents = специализированные роли внутри процесса
```

Агенты — это не отдельные люди и не обязательно отдельные модели. Это **режимы работы**, которые включаются на конкретном этапе.

## 2. Запрет

Агентам запрещено:

- менять стратегию без GPT Business;
- начинать код без спецификации;
- принимать дизайн без Design QA;
- считать сайт готовым без QA Gate;
- отправлять PII в аналитику;
- использовать fake dashboards;
- превращать premium-сайт в generic SaaS landing;
- обходить consent / legal / lead-layer;
- делать production deploy без отдельной команды.

## 3. Базовая команда фабрики

### 3.1. Директор фабрики

Роль: GPT Business.

Задачи:

- держать стратегию;
- утверждать этапы;
- принимать решения;
- ревьюить PR;
- контролировать качество;
- управлять Cursor;
- защищать продукт от хаоса.

Выход:

- решение;
- задача Cursor;
- ревью;
- статус;
- roadmap.

### 3.2. Архитектор продукта

Роль: превращает бизнес-цель в продуктовую структуру.

Задачи:

- оффер;
- аудит ниши;
- карта боли;
- ClientFlow System logic;
- структура сайта;
- логика лид-магнита;
- критерии конверсии.

Выход:

```text
product brief
conversion blueprint
section map
CTA map
risk map
```

### 3.3. Архитектор конверсионного прототипа

Роль: делает скелет сайта до дизайна.

Задачи:

- первый экран;
- порядок секций;
- логика аргументации;
- возражения;
- CTA;
- lead magnet entry;
- финальный CTA.

Выход:

```text
conversion prototype
wire logic
section-by-section intent
```

### 3.4. Продающий редактор

Роль: пишет русский, сильный, логичный copy-doc.

Задачи:

- H1;
- subtitle;
- оффер;
- section copy;
- microcopy;
- FAQ;
- form copy;
- Telegram/welcome copy.

Правила:

- русский язык по умолчанию;
- ClientFlow, Digital, Next.js, SEO можно оставлять;
- без generic marketing fluff;
- без пустых обещаний;
- без англицизмов там, где есть нормальный русский термин.

### 3.5. Premium-дизайнер

Роль: отвечает за визуальный уровень.

Задачи:

- art direction;
- дизайн-направление;
- hero composition;
- typography;
- spacing;
- premium effects;
- photo integration;
- visual trust.

Запрещено:

- случайные floating cards;
- cyberpunk/neon;
- stock people;
- AI raster text;
- перегруженный parallax;
- шаблонный SaaS-вид.

### 3.6. Архитектор фотосессии эксперта

Роль: превращает фото эксперта в дизайнерский сайт.

Задачи:

- требования к фотосессии;
- отбор кадров;
- hero crop;
- mobile crop;
- фон;
- safe area под текст;
- OG image;
- визуальная последовательность по сайту.

Выход:

```text
photo asset map
hero photo decision
mobile crop rules
visual trust notes
```

### 3.7. Архитектор hero motion / video

Роль: отвечает за premium motion первый экран.

Задачи:

- code-driven motion;
- video hero;
- poster fallback;
- mobile fallback;
- reduced-motion mode;
- CTA поверх motion;
- performance budget.

Правило:

```text
H1, оффер и кнопки всегда HTML, не внутри видео.
```

### 3.8. Next.js-инженер

Роль: Cursor implementation mode.

Задачи:

- Next.js App Router;
- TypeScript strict;
- Tailwind;
- Server Components;
- forms;
- Supabase route;
- Telegram integration;
- analytics adapters;
- legal pages;
- performance.

### 3.9. Архитектор lead-layer

Роль: отвечает за заявки.

Задачи:

- form validation;
- consent;
- Supabase;
- `site_leads`;
- `consent_logs`;
- `lead_events`;
- `notification_logs`;
- Telegram owner notification;
- UTM persistence.

### 3.10. Архитектор ИИ-автоворонки

Роль: отвечает за v0.3.

Задачи:

- Telegram bot;
- lead magnet;
- welcome-chain;
- AI core;
- lead score;
- segmentation;
- tripwire;
- payment state;
- owner card v2.

### 3.11. SEO / Traffic-Ready специалист

Роль: готовит сайт к органике, рекламе и аналитике.

Задачи:

- SEO map;
- metadata;
- structured data;
- sitemap;
- robots;
- landing quality;
- UTM;
- event map;
- GEO / AI visibility readiness.

### 3.12. QA Gate аудитор

Роль: не даёт принимать слабую работу.

Задачи:

- build;
- typecheck;
- lint;
- mobile;
- form;
- consent;
- analytics without PII;
- performance;
- accessibility;
- design quality;
- manual evidence.

## 4. Этапы работы агентов

```text
1. Product Architect
2. Conversion Prototype Architect
3. Sales Copy Editor
4. Premium Designer
5. Photo / Motion Architect if needed
6. Next.js Engineer
7. Lead-layer Architect
8. SEO / Traffic-Ready Specialist
9. AI Funnel Architect
10. QA Gate Auditor
11. GPT Business acceptance
```

## 5. Агентный QA-принцип

Каждый агент обязан завершать работу в формате:

```text
что сделано
что изменено
что не сделано
риски
проверки
следующий шаг
```

## 6. Что внедряется сейчас

Сейчас внедряется агентная система как управленческий стандарт.

Код не меняется.

Реализация в Cursor — только после закрытия v0.2 и отдельной задачи.

## 7. Эффект

Ожидаемый прирост:

```text
управляемость фабрики: 70% -> 85%
повторяемость сайтов: 60% -> 80%
качество постановок Cursor: +25%
риск хаотичной разработки: -40%
```
