# Spec-driven production workflow — Делаем Диджитал

Статус: v1 governance
Назначение: внедрить spec-driven процесс для фабрики сайтов. Основано на нашем production-процессе и выборочно усилено паттернами GitHub Spec Kit и Superpowers.

## 1. Главный принцип

Фабрика не начинает разработку сайта с кода.

Каждый сайт проходит цепочку:

```text
Constitution
→ Spec
→ Blueprint
→ Copy-doc
→ Design direction
→ Implementation plan
→ Tasks
→ Cursor implementation
→ QA Gate
→ Launch
→ Case
```

## 2. Что это решает

Проблемы, которые workflow обязан предотвращать:

- Cursor начинает делать сайт без утверждённой структуры;
- дизайн появляется раньше оффера;
- копирайтинг пишется после верстки;
- форма есть, но лиды не сохраняются;
- сайт красивый, но не готов к трафику;
- нет QA Gate;
- невозможно повторить процесс для следующего клиента.

## 3. Структура артефактов

Для каждого сайта создаётся папка:

```text
docs/projects/[project-slug]/
```

Внутри:

```text
00-constitution.md
01-discovery.md
02-spec.md
03-conversion-blueprint.md
04-copy-doc.md
05-design-direction.md
06-implementation-plan.md
07-tasks.md
08-qa-checklist.md
09-launch-checklist.md
10-case-notes.md
```

## 4. Constitution

Файл:

```text
00-constitution.md
```

Назначение: зафиксировать неизменяемые принципы конкретного сайта.

Содержит:

- цель проекта;
- тип бизнеса;
- аудитория;
- язык;
- уровень premium;
- ограничения;
- legal constraints;
- lead-layer requirements;
- SEO / traffic goal;
- дизайн-запреты;
- production definition of done.

## 5. Spec

Файл:

```text
02-spec.md
```

Назначение: описать, что сайт должен делать и зачем.

Содержит:

- бизнес-цель;
- пользовательские сценарии;
- целевые действия;
- типы пользователей;
- данные формы;
- события аналитики;
- интеграции;
- mobile requirements;
- SEO requirements;
- success criteria.

Запрещено:

- описывать реализацию до утверждения spec;
- писать “сделать красиво” без критериев;
- начинать дизайн без user journey.

## 6. Conversion Blueprint

Файл:

```text
03-conversion-blueprint.md
```

Назначение: логика сайта до дизайна.

Содержит:

- H1 logic;
- секции;
- цель каждой секции;
- CTA map;
- objections map;
- trust blocks;
- lead magnet entry;
- final CTA;
- FAQ logic.

## 7. Copy-doc

Файл:

```text
04-copy-doc.md
```

Назначение: финальный текст до верстки.

Содержит:

- hero;
- subtitle;
- CTA;
- section copy;
- card copy;
- FAQ;
- form text;
- success/failure messages;
- Telegram / AI funnel copy if needed.

Правило:

```text
Cursor не пишет production-copy самостоятельно, если copy-doc не утверждён.
```

## 8. Design Direction

Файл:

```text
05-design-direction.md
```

Назначение: art direction перед реализацией.

Содержит:

- визуальное направление;
- цветовая система;
- типографика;
- фото / видео / motion strategy;
- hero pattern;
- mobile rules;
- interaction principles;
- design anti-patterns;
- references if any.

## 9. Implementation Plan

Файл:

```text
06-implementation-plan.md
```

Назначение: план для Cursor.

Содержит:

- ветка;
- affected files;
- components;
- routes;
- env;
- integrations;
- tests;
- risks;
- explicit non-goals.

## 10. Tasks

Файл:

```text
07-tasks.md
```

Назначение: пошаговый список реализации.

Формат задачи:

```text
ID:
Название:
Файлы:
Действие:
Проверка:
Риск:
Готово когда:
```

## 11. QA Checklist

Файл:

```text
08-qa-checklist.md
```

Обязательные блоки:

- build;
- typecheck;
- lint;
- mobile 360 / 390 / 768 / 1024 / 1440;
- no horizontal overflow;
- form states;
- consent;
- lead storage;
- Telegram notification;
- UTM;
- analytics without PII;
- SEO metadata;
- performance;
- accessibility;
- design QA;
- content QA;
- legal QA.

## 12. Launch Checklist

Файл:

```text
09-launch-checklist.md
```

Содержит:

- domain;
- Vercel project;
- env vars;
- Supabase production decision;
- Telegram owner chat;
- analytics keys;
- legal pages;
- sitemap;
- robots;
- backup;
- rollback;
- post-launch monitoring.

## 13. Case Notes

Файл:

```text
10-case-notes.md
```

Содержит:

- исходная проблема;
- что сделали;
- структура решения;
- screenshots;
- метрики;
- выводы;
- что можно улучшить;
- публичный кейс.

## 14. Gate rules

### Gate 1 — нельзя в дизайн

Нельзя переходить к дизайну, пока нет:

```text
02-spec.md
03-conversion-blueprint.md
04-copy-doc.md
```

### Gate 2 — нельзя в Cursor

Нельзя отдавать в Cursor, пока нет:

```text
05-design-direction.md
06-implementation-plan.md
07-tasks.md
```

### Gate 3 — нельзя в merge

Нельзя merge, пока нет:

```text
08-qa-checklist.md
отчёт Cursor
ревью GPT Business
```

### Gate 4 — нельзя в production

Нельзя production deploy, пока нет:

```text
09-launch-checklist.md
real env verification
legal confirmation
analytics verification
lead route verification
```

## 15. Эффект

Ожидаемый прирост:

```text
повторяемость сайтов: 60% -> 85%
качество постановок Cursor: +30%
риск ручной хаотичной разработки: -50%
скорость следующих сайтов после первого: +25-40%
```

## 16. Внедрение

Внедряется как стандарт документации.

Код не меняется.

Первый проект, который должен пройти этот workflow:

```text
первый сайт Делаем Диджитал
```
