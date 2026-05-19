# Стандарт событий аналитики

Статус: v1 foundation
Назначение: зафиксировать измеримую модель сайта до подключения трафика.

## 1. Принцип

Сайт не готов к production, если нельзя понять:

- кто пришёл;
- откуда пришёл;
- что увидел;
- куда нажал;
- начал ли форму;
- отправил ли заявку;
- дошла ли заявка владельцу;
- где произошла ошибка.

Аналитика не должна собирать лишние персональные данные.

## 2. Инструменты

Основные:

- PostHog — продуктовая аналитика;
- Яндекс.Метрика — базовая веб-аналитика и рекламный контур РФ;
- Better Stack — uptime, ошибки и runtime logs на production.

V1 сайта:

- PostHog optional, но архитектурно предусмотрен;
- Яндекс.Метрика optional, но для РФ-трафика желательна;
- Better Stack подключается перед production launch.

## 3. Правила нейминга

Технические события пишутся в snake_case.

Правильно:

```text
lead_form_submitted
hero_primary_cta_clicked
owner_notification_failed
```

Неправильно:

```text
Lead Form Submitted
clickHeroButton
Отправка формы
```

Документация события — по-русски. Техническое имя события — английский snake_case.

## 4. Базовые события страницы

### page_viewed

Когда: пользователь открыл страницу.

Payload:

```text
path
referrer
utm_source
utm_medium
utm_campaign
utm_content
utm_term
```

### section_viewed

Когда: ключевая секция попала в viewport.

Payload:

```text
section_id
section_name
path
```

Правило: событие отправляется один раз на секцию за сессию.

## 5. CTA-события

### hero_primary_cta_clicked

Когда: клик по главному CTA первого экрана.

Payload:

```text
label
target
path
```

### hero_secondary_cta_clicked

Когда: клик по второму CTA первого экрана.

Payload:

```text
label
target
path
```

### final_cta_clicked

Когда: клик по финальному CTA.

Payload:

```text
label
target
path
```

### contact_method_clicked

Когда: клик по Telegram, email, телефону или другому способу связи.

Payload:

```text
method
target
path
```

## 6. События оффера и секций

### offer_card_clicked

Когда: пользователь нажал на карточку продукта или CTA внутри карточки.

Payload:

```text
product
label
target
path
```

### faq_item_opened

Когда: пользователь открыл FAQ.

Payload:

```text
question_id
question
path
```

### clientflow_step_clicked

Когда: пользователь нажал на этап ClientFlow-карты.

Payload:

```text
step_id
step_name
path
```

## 7. События формы

### lead_form_viewed

Когда: форма попала в viewport.

Payload:

```text
form_id
path
```

### lead_form_started

Когда: пользователь впервые начал вводить данные.

Payload:

```text
form_id
first_field
path
```

### lead_form_submit_attempt

Когда: пользователь нажал submit.

Payload:

```text
form_id
project_type
has_website
budget_range
path
```

Запрещено отправлять:

- имя;
- телефон;
- email;
- Telegram username;
- полный текст сообщения.

### lead_form_submitted

Когда: заявка успешно сохранена и обработана.

Payload:

```text
form_id
lead_id
project_type
budget_range
path
```

### lead_form_failed

Когда: заявка не была успешно обработана.

Payload:

```text
form_id
reason
path
```

## 8. События уведомления владельца

### owner_notification_sent

Когда: Telegram-уведомление владельцу отправлено.

Payload:

```text
lead_id
channel
path
```

### owner_notification_failed

Когда: Telegram-уведомление владельцу не отправлено.

Payload:

```text
lead_id
channel
reason
path
```

Правило: если Telegram notification failed, lead всё равно должен быть сохранён.

## 9. События CookieConsent

### cookie_consent_accepted

Когда: пользователь принял cookie/analytics.

Payload:

```text
consent_version
path
```

### cookie_consent_rejected

Когда: пользователь отклонил необязательные cookie/analytics.

Payload:

```text
consent_version
path
```

### cookie_settings_opened

Когда: пользователь открыл настройки cookie.

Payload:

```text
consent_version
path
```

## 10. События ошибок

### runtime_error_seen

Когда: поймана пользовательская ошибка интерфейса, если такой слой реализован.

Payload:

```text
error_scope
path
```

### api_error_seen

Когда: API endpoint вернул ошибку в контролируемом сценарии.

Payload:

```text
endpoint
status
scope
path
```

## 11. UTM и источник

Нужно сохранять:

```text
utm_source
utm_medium
utm_campaign
utm_content
utm_term
referrer
landing_path
current_path
```

Правила:

- UTM сохраняются в localStorage/sessionStorage при первом входе;
- UTM прикладываются к форме;
- UTM попадают в lead storage;
- UTM не должны ломать форму при отсутствии значений.

## 12. Что нельзя отправлять в аналитику

Запрещено без отдельной необходимости:

- ФИО;
- телефон;
- email;
- Telegram username;
- полный текст заявки;
- документы;
- платёжные данные;
- чувствительные данные;
- raw AI prompt;
- private conversations.

## 13. Минимальная воронка

Для каждого production-сайта должна быть воронка:

```text
page_viewed
-> hero_primary_cta_clicked or final_cta_clicked
-> lead_form_started
-> lead_form_submit_attempt
-> lead_form_submitted or lead_form_failed
-> owner_notification_sent or owner_notification_failed
```

## 14. События v1

Обязательные для factory-template v1:

```text
page_viewed
section_viewed
hero_primary_cta_clicked
hero_secondary_cta_clicked
final_cta_clicked
contact_method_clicked
offer_card_clicked
faq_item_opened
lead_form_viewed
lead_form_started
lead_form_submit_attempt
lead_form_submitted
lead_form_failed
owner_notification_sent
owner_notification_failed
cookie_consent_accepted
cookie_consent_rejected
```

## 15. Решение

Создать единый analytics layer:

```text
packages/analytics
```

Состав:

```text
events.ts
track-event.ts
adapters/posthog.ts
adapters/yandex.ts
utm.ts
consent.ts
```

Сайт использует только общий `trackEvent`. Конкретные сервисы аналитики подключаются через адаптеры.
