---
name: ai-funnel-architecture
description: Проектирует ИИ-автоворонку сайта: Telegram-бот, лид-магнит, welcome-chain, ИИ-ядро, сегментация, lead score, owner card и tripwire skeleton. Использовать для v0.3 и клиентских AI funnel проектов.
---

# AI Funnel Architecture Skill

## Когда использовать

- после lead-layer;
- при проектировании Telegram-бота;
- при создании лид-магнита;
- при настройке welcome-цепочки;
- при проектировании трипвайера.

## Вход

- ниша;
- оффер;
- lead magnet idea;
- target audience;
- form fields;
- Telegram strategy;
- tripwire idea;
- owner workflow.

## Процесс

1. Определить вход в воронку.
2. Определить лид-магнит.
3. Спроектировать `/start` flow.
4. Сформировать 3-5 диагностических вопросов.
5. Определить сегменты.
6. Определить lead score factors.
7. Спроектировать welcome-chain.
8. Спроектировать owner card.
9. Спроектировать tripwire skeleton.
10. Определить события аналитики.

## Выход

```text
AI funnel blueprint
bot flow
lead magnet logic
questions
segments
lead score rules
owner card
tripwire skeleton
analytics events
```

## QA

Воронка готова, если:

- понятен вход;
- пользователь получает ценность;
- ответы сохраняются;
- сегмент определяется;
- owner получает summary;
- PII не уходит в analytics;
- failure states предусмотрены;
- tripwire не навязан слишком рано.

## Запреты

- не строить бота без lead-layer;
- не хранить PII в analytics;
- не отправлять одинаковую цепочку всем без сегментации;
- не продавать трипвайер до выдачи пользы;
- не делать AI core без ограниченного назначения.
