# Стандарт формы и заявки

Статус: v1 foundation
Назначение: зафиксировать production-стандарт формы заявки для фабричных ClientFlow-сайтов.

## 1. Принцип

Форма — это не декоративный блок. Форма является точкой перехода пользователя из сайта в обработку заявки.

Сайт не готов к production, если:

- форма не валидирует данные;
- заявка не сохраняется;
- владелец не получает уведомление;
- нет success state;
- нет failure state;
- нет consent checkbox;
- не фиксируется источник заявки;
- нет событий аналитики.

## 2. Роль формы

Форма должна:

1. Собрать минимальные данные.
2. Зафиксировать согласие.
3. Сохранить заявку.
4. Передать заявку владельцу.
5. Зафиксировать события аналитики.
6. Дать пользователю понятный результат.
7. Не потерять заявку при сбое Telegram.

## 3. Типы форм

### Короткая форма заявки

Для быстрых сайтов и финального CTA.

Поля:

- имя;
- телефон или Telegram;
- интерес;
- сообщение optional;
- consent.

### Форма разбора системы

Для Делаем Диджитал и ClientFlow Аудита.

Поля:

- имя;
- Telegram;
- email optional;
- сайт компании;
- что интересует;
- главная проблема;
- бюджетный диапазон;
- consent.

### Диагностическая форма

Для квизов и Telegram Diagnostic Flow.

Поля:

- ответы на вопросы;
- контакт;
- consent;
- source and UTM.

## 4. Базовая схема заявки

Технические поля:

```text
id
created_at
updated_at
status
source
page_path
referrer
utm_source
utm_medium
utm_campaign
utm_content
utm_term
consent_accepted
consent_version
owner_notification_status
owner_notification_error
```

Контактные поля:

```text
name
phone
telegram
email
```

Проектные поля:

```text
website
project_type
budget_range
business_context
main_problem
message
```

Служебные поля:

```text
ip_hash
user_agent_hash
spam_score
metadata
```

## 5. Статусы заявки

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

Правило:

- после успешного сохранения статус `new`;
- после успешного Telegram-уведомления статус можно обновить на `notified`;
- если уведомление не отправилось, статус `notification_failed`, но заявка остаётся сохранённой.

## 6. Валидация

Client-side:

- быстрые подсказки;
- required states;
- формат email;
- минимум символов;
- consent required.

Server-side:

- обязательна всегда;
- Zod schema;
- trim strings;
- normalize contacts;
- reject empty critical fields;
- limit message length;
- block suspicious payloads;
- ignore unknown dangerous fields.

## 7. Consent

Обязательные правила:

- checkbox не pre-checked;
- пользователь должен явно согласиться;
- рядом с формой есть ссылки на privacy и consent;
- фиксируется consent version;
- фиксируется дата и время;
- заявка без consent не принимается.

Текст по умолчанию:

```text
Я согласен на обработку персональных данных и принимаю условия политики конфиденциальности.
```

Текст должен содержать кликабельные ссылки.

## 8. Обработка заявки

Порядок:

```text
User submit
-> client validation
-> server route
-> server validation
-> save lead
-> save consent log
-> save lead event
-> send Telegram notification
-> save notification result
-> return success or controlled failure
-> analytics event
```

Важное правило:

Telegram notification не является source of truth. Source of truth — база заявок.

## 9. Supabase

Минимальные таблицы:

### site_leads

Хранит заявки.

### consent_logs

Хранит факт согласия.

### lead_events

Хранит события обработки заявки.

Минимальное требование:

- insert lead;
- insert consent log;
- insert lead event;
- update notification status.

## 10. Telegram-уведомление

Формат сообщения владельцу:

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

- Telegram token только server-side;
- chat id только server-side;
- не отправлять лишние данные;
- ошибка Telegram логируется;
- ошибка Telegram не удаляет заявку.

## 11. Success state

После успешной заявки пользователь должен увидеть:

- понятное подтверждение;
- что будет дальше;
- примерный срок ответа;
- альтернативный Telegram-контакт;
- без лишнего давления.

Пример:

```text
Заявка отправлена. Я посмотрю контекст и вернусь с первым ответом в течение рабочего дня. Если вопрос срочный, напишите в Telegram.
```

## 12. Failure state

Если заявка не отправлена:

- не обвинять пользователя;
- показать понятное сообщение;
- дать альтернативный способ связи;
- не терять введённые данные на клиенте;
- отправить analytics event `lead_form_failed`.

Пример:

```text
Не удалось отправить заявку. Попробуйте ещё раз или напишите напрямую в Telegram.
```

## 13. Spam protection

v1 минимум:

- hidden honeypot field;
- message length limit;
- server-side validation;
- simple rate limit if possible;
- reject suspicious URLs in unexpected fields.

v2:

- Turnstile or equivalent;
- IP/device hash;
- Supabase rate table;
- risk score.

## 14. Аналитика формы

Обязательные события:

```text
lead_form_viewed
lead_form_started
lead_form_submit_attempt
lead_form_submitted
lead_form_failed
owner_notification_sent
owner_notification_failed
```

Запрещено отправлять в аналитику:

- имя;
- телефон;
- email;
- Telegram username;
- полный текст сообщения.

## 15. Доступность

Форма должна иметь:

- label для каждого поля;
- visible focus state;
- понятные error messages;
- keyboard navigation;
- aria-invalid для ошибок;
- disabled/loading state при отправке;
- no layout shift after validation.

## 16. UX-правила

- Не запрашивать лишние поля на первом шаге.
- Контакт должен быть обязательным: телефон, Telegram или email.
- Лучше меньше полей, но выше качество обработки.
- Для дорогих проектов допустимы вопросы про бюджет и контекст.
- Не прятать consent.
- Не делать submit label `Отправить`, если можно написать точнее.

Хорошие submit labels:

```text
Отправить заявку на разбор
Получить разбор системы
Обсудить проект
Начать с диагностики
```

## 17. Минимальный v1 contract

Компонент `LeadForm` должен принимать:

```text
formId
projectOptions
budgetOptions
submitLabel
successMessage
failureMessage
privacyUrl
consentUrl
analyticsContext
```

Server route должен принимать только валидный payload.

## 18. QA формы

Перед запуском проверить:

- пустая форма не отправляется;
- invalid email показывает ошибку;
- заявка без consent не отправляется;
- успешная заявка сохраняется;
- Telegram notification приходит;
- Telegram failure не теряет заявку;
- UTM сохраняются;
- success state появляется;
- failure state работает;
- analytics events отправляются;
- персональные данные не уходят в аналитику.

## 19. Вердикт

Фабричная форма v1 должна быть production-ready с первого шаблона.

Нельзя выпускать сайты с декоративной формой, если сайт продаётся как система заявок.
