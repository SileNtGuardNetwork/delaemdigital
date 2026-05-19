# Playwright QA Gate — Делаем Диджитал

Статус: v1 standard
Назначение: зафиксировать будущий автоматизированный QA Gate для сайтов фабрики. Основано на текущих QA-правилах фабрики и паттернах Playwright / Playwright MCP.

## 1. Главный принцип

Фабрика не принимает сайт по словам “всё работает”.

Фабрика принимает сайт по evidence:

```text
автоматические проверки
ручная проверка
скриншоты
логи
записи в базе
результаты формы
```

## 2. Почему Playwright

Playwright нужен для:

- проверки реального пользовательского пути;
- проверки формы;
- проверки cookie banner;
- проверки mobile layout;
- проверки CTA;
- проверки отсутствия horizontal overflow;
- проверки legal routes;
- smoke-тестов перед merge;
- regression-тестов будущих шаблонов.

## 3. MCP или CLI

Для coding workflow основной путь:

```text
Playwright CLI / tests
```

Playwright MCP — опционально для Cursor/agent QA, когда нужен интерактивный браузерный контекст.

Причина:

```text
CLI-тесты дешевле по контексту, воспроизводимы и лучше подходят для CI.
```

## 4. Структура будущего внедрения

После закрытия v0.2 создать:

```text
apps/factory-template/playwright.config.ts
apps/factory-template/tests/e2e/
  home.spec.ts
  lead-form.spec.ts
  legal.spec.ts
  mobile.spec.ts
  cookie-consent.spec.ts
  seo-smoke.spec.ts
```

## 5. Минимальные тесты

### home.spec.ts

Проверяет:

- главная открывается;
- есть один H1;
- primary CTA виден;
- final CTA виден;
- нет crash UI.

### lead-form.spec.ts

Проверяет:

- форма видна;
- submit без consent заблокирован;
- invalid contact показывает ошибку;
- loading state появляется;
- success/failure state работает;
- honeypot не виден пользователю.

### legal.spec.ts

Проверяет маршруты:

```text
/privacy
/consent
/cookies
/terms
```

### mobile.spec.ts

Viewports:

```text
360x800
390x844
768x1024
1024x768
1440x900
```

Проверяет:

- нет horizontal overflow;
- CTA не обрезаны;
- форма доступна;
- cookie banner не перекрывает критичный CTA.

### cookie-consent.spec.ts

Проверяет:

- banner появляется;
- accept работает;
- necessary-only работает;
- состояние сохраняется;
- analytics не грузится без consent.

### seo-smoke.spec.ts

Проверяет:

- title;
- description;
- canonical;
- robots;
- sitemap;
- OpenGraph basic tags.

## 6. QA evidence format

Каждый QA-прогон должен давать:

```text
дата
ветка
commit
какие тесты запущены
результат
что упало
скриншоты / trace if failed
решение: pass / fail / needs manual check
```

## 7. Что не делаем сразу

В первом внедрении Playwright QA не делаем:

- full visual regression;
- Percy / Chromatic;
- платные сервисы;
- complex auth flows;
- payment flow;
- full Lighthouse CI.

Это можно добавить позже.

## 8. Принятие сайта

Сайт нельзя считать готовым, если не пройдены:

```text
npm run build
npm run typecheck
npm run lint
Playwright smoke tests
manual design QA
manual form QA
```

## 9. Эффект

Ожидаемый прирост:

```text
QA готовность: 40% -> 80%
риск сломанного mobile: -50%
риск сломанной формы: -60%
риск случайного regression: -40%
```

## 10. Порядок внедрения

Только после merge v0.2:

```text
1. создать отдельную ветку qa-playwright-gate
2. добавить Playwright dev dependency
3. добавить config
4. добавить smoke tests
5. прогнать локально
6. открыть PR
7. GPT Business review
8. merge
```
