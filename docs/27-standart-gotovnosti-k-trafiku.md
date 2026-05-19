# Стандарт готовности к трафику

Статус: v1 foundation
Назначение: зафиксировать, что значит сайт готов к приёму рекламного, SEO, Telegram и другого трафика.

## 1. Главная позиция

Сайт не готов к трафику, если он просто опубликован.

Сайт готов к трафику только если работает вся цепочка:

```text
Источник -> UTM -> страница -> CTA -> лид-магнит / форма / Telegram-бот -> заявка -> уведомление -> аналитика -> отчёт -> улучшение
```

Если пользователь пришёл, нажал, оставил данные, но заявка потерялась или не измерилась — сайт не готов.

## 2. Что значит traffic-ready

Traffic-ready сайт должен иметь:

1. Чёткий оффер.
2. Понятный первый экран.
3. CTA под разные уровни готовности.
4. Лид-магнит или ИИ-автоворонку.
5. Рабочую форму заявки.
6. Telegram-бот или Telegram-переход.
7. UTM capture.
8. Lead storage.
9. Owner notification.
10. Analytics events.
11. Legal consent.
12. Mobile-ready UX.
13. SEO-ready структуру.
14. Speed-ready реализацию.
15. QA Gate.

## 3. Источники трафика

Фабрика должна учитывать разные источники:

```text
SEO
Яндекс Директ
VK Ads
Telegram Ads
посевы в Telegram
контент в соцсетях
личный бренд
рефералы
email / рассылки
партнёрский трафик
offline QR
```

Каждый источник должен вести в понятный маршрут, а не просто на главную.

## 4. UTM-стандарт

Обязательные UTM:

```text
utm_source
utm_medium
utm_campaign
utm_content
utm_term
```

Дополнительные параметры:

```text
entry_point
lead_magnet
bot_start
product
campaign_id
ad_id
```

Правила:

- UTM сохраняются при первом входе;
- UTM передаются в форму;
- UTM передаются в Telegram-бот через deep-link, если возможно;
- UTM сохраняются в базе заявок;
- UTM попадают в карточку владельца;
- UTM не ломают сайт при отсутствии параметров.

## 5. Входные маршруты

Для каждого источника нужно определить маршрут.

Пример:

```text
Яндекс Директ -> страница услуги -> CTA -> форма -> Supabase -> Telegram owner card
```

```text
Telegram Ads -> лид-магнит -> Telegram-бот -> welcome-цепочка -> трипвайер -> оплата
```

```text
SEO -> информационная страница -> лид-магнит -> бот -> прогрев -> заявка
```

## 6. CTA под трафик

У сайта должно быть минимум 3 уровня CTA:

### Горячий CTA

Для готовых к покупке:

```text
Обсудить проект
Получить разбор системы
Оставить заявку на сайт с ИИ-автоворонкой
```

### Мягкий CTA

Для прогрева:

```text
Пройти диагностику
Получить карту потерь заявок
Получить мини-аудит сайта
```

### Доверительный CTA

Для знакомства:

```text
Посмотреть подход
Перейти в Telegram-канал
Посмотреть кейсы
```

## 7. Лид-магнит под трафик

Каждая traffic-ready связка должна иметь лид-магнит или понятное действие.

Лид-магнит должен:

- соответствовать источнику трафика;
- быть связан с болью;
- давать быструю ценность;
- вести в ИИ-автоворонку;
- собирать данные для сегментации;
- подводить к трипвайеру или заявке.

## 8. ИИ-автоворонка под трафик

Если пользователь не готов оставить заявку, сайт должен вести его в ИИ-автоворонку.

Маршрут:

```text
CTA -> Telegram deep-link -> бот -> лид-магнит -> ИИ-сбор данных -> сегмент -> welcome-цепочка -> трипвайер -> основной продукт
```

Обязательно:

- deep-link с source;
- событие `bot_started`;
- событие `lead_magnet_delivered`;
- сегментация;
- карточка владельца;
- возможность связи с человеком.

## 9. Форма заявки

Форма должна быть production-ready:

- server validation;
- consent;
- success state;
- failure state;
- UTM capture;
- lead storage;
- owner notification;
- analytics events;
- spam protection.

Форма без реальной отправки не считается traffic-ready.

## 10. Owner notification

Владелец должен получать не просто контакт, а карточку.

Карточка должна включать:

```text
имя
контакт
интерес
источник
UTM
страница
лид-магнит
ответы
бюджет
срочность
lead score
следующий шаг
```

Если Telegram notification не работает, заявка всё равно должна сохраняться.

## 11. Оплата трипвайера

Если воронка включает трипвайер, traffic-ready требует:

- понятное предложение;
- страницу или экран оплаты;
- платёжный провайдер;
- payment status;
- выдачу продукта после оплаты;
- уведомление владельца;
- analytics events.

События:

```text
tripwire_offered
payment_started
payment_success
payment_failed
tripwire_delivered
```

## 12. Аналитика трафика

Минимальная воронка:

```text
page_viewed
-> section_viewed
-> cta_clicked
-> lead_form_started / bot_started
-> lead_form_submitted / lead_magnet_delivered
-> owner_notification_sent / owner_notification_failed
-> tripwire_offered
-> payment_started
-> payment_success / payment_failed
```

Инструменты:

- Яндекс.Метрика;
- PostHog;
- Better Stack for production monitoring;
- рекламные кабинеты where needed.

## 13. Рекламные пиксели и цели

Для рекламных источников предусмотреть:

- цели Метрики;
- события PostHog;
- VK pixel if needed;
- Telegram Ads tracking where possible;
- thank-you or success state;
- conversion event после успешной заявки;
- payment event после оплаты.

Не отправлять персональные данные в рекламные пиксели без правового основания.

## 14. Страницы под трафик

Не весь трафик должен идти на главную.

Возможные посадочные:

```text
/
/products/site
/products/system
/diagnostic
/nishi/[slug]
/lp/[campaign]
/lead-magnet/[slug]
```

Каждая посадочная должна иметь:

- один главный интент;
- один главный CTA;
- понятный лид-магнит;
- аналитику;
- mobile-ready UX.

## 15. Скорость под трафик

Трафик нельзя вести на тяжёлую страницу.

Проверить:

- LCP;
- CLS;
- INP;
- размер изображений;
- font loading;
- лишний JS;
- mobile speed;
- анимации;
- third-party scripts.

## 16. Legal под трафик

Обязательно:

- privacy;
- consent;
- cookie notice;
- legal links near form;
- no pre-checked checkbox;
- осторожные формулировки;
- отсутствие гарантии результата без основания;
- соблюдение требований ниши.

## 17. SLA обработки лида

Traffic-ready сайт бесполезен, если лиды не обрабатываются.

Нужно определить:

```text
кто получает заявку
как быстро отвечает
что пишет первым сообщением
что делать с горячими лидами
что делать с нецелевыми
что делать с оплатившими трипвайер
```

Минимум:

- owner notification;
- suggested reply;
- lead status;
- next action.

## 18. Отчётность

После запуска трафика нужен минимум отчёта:

```text
визиты
источники
CTA clicks
bot starts
lead magnets delivered
form starts
form submits
notification success
tripwire offers
payments
conversion rate
weak points
next improvements
```

## 19. Traffic-ready Gate

Оценить по 10-балльной шкале.

| Блок | Оценка | Комментарий |
| --- | ---: | --- |
| Оффер |  |  |
| Первый экран |  |  |
| CTA |  |  |
| Лид-магнит |  |  |
| ИИ-автоворонка |  |  |
| Форма |  |  |
| UTM |  |  |
| Аналитика |  |  |
| Legal |  |  |
| Mobile / speed |  |  |

Итого: /100

Статусы:

```text
90-100: готов к трафику
75-89: условно готов
ниже 75: не готов
```

Критичные блокеры:

- форма не работает;
- UTM не сохраняются;
- нет analytics events;
- нет consent;
- нет mobile QA;
- нет owner notification;
- нет лид-магнита для холодного трафика;
- Telegram-бот не запускается;
- оплата трипвайера не работает, если заявлена;
- нет success/failure state;
- сайт медленный на mobile.

## 20. Роль GPT Business

GPT Business отвечает за:

- traffic-ready стратегию;
- выбор маршрутов;
- CTA;
- лид-магнит;
- ИИ-автоворонку;
- трипвайер;
- карту событий;
- QA Gate.

## 21. Роль Cursor Pro+

Cursor отвечает за:

- UTM capture;
- форму;
- серверную обработку;
- Supabase;
- Telegram API;
- analytics adapters;
- payment integration;
- success/failure states;
- technical checks.

Cursor не должен сам менять traffic strategy без задания.

## 22. Решение

Сайт считается готовым к трафику только после прохождения Traffic-ready Gate.

Публикация сайта не равна готовности к трафику.
