# Инвентарь компонентов

Статус: v1 foundation
Назначение: зафиксировать минимальный набор компонентов для фабричного ClientFlow-сайта до начала кода.

## 1. Принцип

Компонент существует не ради UI. Компонент должен закрывать производственную задачу:

- ускорять сборку сайта;
- сохранять визуальное качество;
- поддерживать conversion path;
- быть адаптивным;
- быть измеримым через аналитику;
- не ломать legal и lead flow.

## 2. Базовые компоненты интерфейса

### Container

Роль: ограничивает ширину контента и задаёт горизонтальные отступы.

Требования:

- desktop max width 1280-1360px;
- mobile отступы 20-24px;
- без horizontal overflow;
- поддержка section-level spacing.

### SectionShell

Роль: единая оболочка секции.

Props:

```text
id
variant
spacing
children
analyticsName
```

Требования:

- semantic section;
- optional analytics marker;
- controlled spacing;
- background variant;
- mobile-safe layout.

### PrimaryButton

Роль: главный CTA.

Требования:

- не pill по умолчанию;
- clear hover/focus state;
- `data-analytics-event`;
- доступный focus ring;
- поддержка link и button mode.

### SecondaryButton

Роль: вторичный CTA.

Требования:

- визуально слабее primary;
- не конкурирует с главным CTA;
- поддерживает analytics attributes.

## 3. Legal-компоненты

### LegalLinks

Роль: набор обязательных legal-ссылок.

Ссылки:

- Политика конфиденциальности;
- Согласие на обработку персональных данных;
- Cookie;
- Условия использования, если нужны.

### LegalFooter

Роль: footer с юридическими данными и навигацией.

Содержит:

- бренд;
- юридическое лицо / ИП;
- ИНН;
- ОГРНИП, если применимо;
- legal links;
- copyright;
- контакты;
- без домашнего адреса в marketing-блоках.

### ConsentCheckbox

Роль: явное согласие перед отправкой формы.

Требования:

- не pre-checked;
- обязательный для submit;
- текст с кликабельными ссылками;
- поддержка consent version;
- error state.

### CookieConsent

Роль: управление cookie и analytics consent.

V1:

- принять;
- отклонить необязательные;
- ссылка на cookie-страницу;
- localStorage state;
- consent version;
- analytics gating.

## 4. Компоненты заявки

### LeadForm

Роль: основная форма заявки.

Требования:

- client validation;
- server validation;
- success state;
- failure state;
- consent checkbox;
- UTM capture;
- analytics events;
- отправка через server route;
- не хранить secrets на клиенте.

### FormField

Роль: единый field wrapper.

Поддерживает:

- label;
- input;
- textarea;
- select;
- error;
- hint;
- required marker.

### ProjectTypeSelector

Роль: выбор интереса / продукта.

Варианты:

- ClientFlow Аудит;
- Делаем Сайт;
- Делаем Трафик;
- Делаем Систему.

Требования:

- accessible state;
- keyboard usable;
- hidden input or controlled value;
- analytics event if needed.

## 5. Секционные компоненты

### FounderHero

Роль: первый экран с основателем и системным оффером.

Использовать для:

- Делаем Диджитал;
- экспертов;
- founder-led услуг;
- premium B2B.

### SystemHero

Роль: первый экран без основателя, с акцентом на систему.

Использовать для:

- компаний;
- B2B-сервисов;
- SaaS/MVP;
- системных продуктов.

### ProblemMap

Роль: показать, где бизнес теряет клиентов.

### ClientFlowMap

Роль: показать маршрут ClientFlow System.

### OfferCards

Роль: показать продуктовую линейку.

### BeforeAfter

Роль: сравнить хаотичное состояние и управляемую систему.

### ProcessTimeline

Роль: показать этапы работы и gate points.

### TrustStack

Роль: показать доверие через факты, стек, процесс, кейсы.

### CasePreview

Роль: показать доказательство проекта.

### FAQAccordion

Роль: закрыть возражения.

### FinalCTA

Роль: финальный переход к заявке или диагностике.

## 6. Аналитические компоненты

### AnalyticsProvider

Роль: подключить адаптеры аналитики.

Адаптеры:

- PostHog;
- Яндекс.Метрика;
- future adapters.

### AnalyticsClickListener

Роль: ловить клики по `data-analytics-event`.

Требования:

- не ломает сайт при ошибке;
- нормализует payload;
- не отправляет лишние персональные данные.

### SectionViewTracker

Роль: фиксировать просмотр ключевых секций.

Требования:

- IntersectionObserver;
- событие один раз за сессию на секцию;
- уважать analytics consent.

## 7. Компоненты конфигурации

### siteConfig

Содержит:

- бренд;
- домен;
- контакты;
- Telegram;
- юридические данные;
- default CTA;
- social links;
- product names.

### env.ts

Роль: проверка переменных окружения.

Требования:

- server-only secrets не доступны клиенту;
- понятные ошибки при missing env;
- разные требования для preview и production.

## 8. Приоритет реализации

v0.1:

1. Container
2. SectionShell
3. PrimaryButton
4. SecondaryButton
5. siteConfig
6. LegalLinks
7. LegalFooter
8. CookieConsent
9. FounderHero
10. ClientFlowMap
11. OfferCards
12. FAQAccordion
13. FinalCTA
14. LeadForm UI

v0.2:

1. ConsentCheckbox production
2. LeadForm server submit
3. Supabase insert
4. Telegram notification
5. AnalyticsProvider
6. SectionViewTracker
7. AnalyticsClickListener

v0.3:

1. CasePreview
2. TrustStack
3. BeforeAfter
4. ProcessTimeline
5. Playwright smoke tests
6. Lighthouse check

## 9. Запреты

Нельзя:

- делать компоненты только под один экран без фабричного контракта;
- смешивать business copy и component logic;
- хранить secrets в компонентах;
- отправлять персональные данные в аналитику;
- делать форму без consent;
- делать CTA без аналитического события;
- делать секцию без задачи.

## 10. Решение

Перед созданием кода нужно реализовывать не страницы, а систему компонентов.

Страница должна собираться как маршрут:

```text
Hero -> ProblemMap -> ClientFlowMap -> OfferCards -> ProcessTimeline -> TrustStack -> FAQ -> FinalCTA
```

Каждый компонент должен поддерживать:

- русский контент;
- premium visual system;
- mobile-first поведение;
- analytics hooks;
- clear acceptance criteria.
