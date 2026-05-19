# Cursor rules 30 - Лиды, аналитика, legal

## Роль

Эти правила применяются ко всем задачам форм, заявок, Supabase, Telegram, оплат, аналитики, SEO и legal-слоя.

## Обязательные документы

Перед задачами читать:

- docs/20-standart-sobytiy-analitiki.md
- docs/21-standart-formy-i-zayavki.md
- docs/25-seo-sistema-pod-klyuch.md
- docs/26-standart-ii-avtovoronki.md
- docs/27-standart-gotovnosti-k-trafiku.md

## Форма заявки

Форма должна иметь:

- server validation;
- client validation where useful;
- consent checkbox;
- success state;
- failure state;
- loading state;
- UTM capture;
- analytics events;
- no personal data sent to analytics.

Форма без реальной отправки не считается production-ready.

## Consent

Обязательно:

- checkbox не включён заранее;
- ссылки на privacy и consent рядом с формой;
- consent version;
- заявка без consent не принимается.

## Supabase

Правила:

- sensitive writes только server-side;
- service role не использовать на клиенте;
- логировать lead status;
- не терять заявку при ошибке Telegram;
- сохранять consent log.

## Telegram

Telegram token только server-side.

Уведомление владельцу должно быть карточкой, а не голым контактом.

Если Telegram notification failed, заявка всё равно сохраняется.

## Аналитика

Использовать общий analytics layer.

Обязательные события для формы:

- lead_form_viewed;
- lead_form_started;
- lead_form_submit_attempt;
- lead_form_submitted;
- lead_form_failed;
- owner_notification_sent;
- owner_notification_failed.

Запрещено отправлять в аналитику:

- имя;
- телефон;
- email;
- Telegram username;
- полный текст заявки;
- чувствительные данные.

## SEO

Cursor реализует SEO-решения, но не меняет SEO-стратегию самовольно.

Обязательно:

- metadata;
- canonical;
- sitemap;
- robots;
- schema.org where needed;
- H-структура;
- alt для смысловых изображений;
- no client-only critical SEO text.

## Оплата трипвайера

Если задача включает оплату:

- использовать провайдера;
- не хранить платёжные данные;
- логировать payment status;
- показывать success/failure;
- уведомлять владельца;
- фиксировать analytics events.

## Legal

Обязательные страницы:

- privacy;
- consent;
- cookies;
- terms if needed.

Footer должен содержать legal links.

## Запрещено

Нельзя:

- делать декоративную форму без backend;
- отправлять лид только в Telegram без сохранения;
- ставить pre-checked consent;
- оставлять console.log в обработке заявки;
- игнорировать failure states;
- отправлять персональные данные в PostHog, Метрику или рекламные пиксели;
- добавлять рискованные гарантии результата.

## Критерий готовности

Интеграционный слой готов, если:

- заявка сохраняется;
- consent сохраняется;
- владелец получает карточку;
- ошибки не теряют заявку;
- analytics events работают;
- legal links есть;
- UTM сохраняются;
- success/failure states понятны.
