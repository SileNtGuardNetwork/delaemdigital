# Site Audit / Crawl Layer — Делаем Диджитал

Статус: v1 standard
Назначение: зафиксировать слой аудита сайтов, конкурентов и исходного состояния клиента перед созданием нового сайта.

## 1. Главный принцип

Перед созданием сайта нельзя опираться только на слова клиента.

Нужно проверить:

```text
текущий сайт
конкурентов
структуру страниц
SEO
оффер
формы
скорость
метаданные
ошибки
путь клиента
```

## 2. Зачем нужен crawl-layer

Для фабрики это даёт:

- быстрый аудит текущего сайта клиента;
- сбор структуры конкурентов;
- извлечение сильных и слабых офферов;
- SEO gap analysis;
- проверку broken links;
- подготовку copy-doc;
- подготовку GEO / AI visibility;
- постзапусковый мониторинг.

## 3. Внешний паттерн

Референс: Firecrawl.

Что берём как идею:

- search;
- scrape;
- crawl;
- map URLs;
- structured extraction;
- clean Markdown for AI;
- screenshots;
- JS-heavy page support.

Что не делаем сейчас:

- не подключаем API key;
- не добавляем зависимость в код;
- не строим crawler до закрытия v0.2;
- не храним чужие данные без необходимости.

## 4. Сценарии аудита

### 4.1. Аудит текущего сайта клиента

Собрать:

```text
URL map
titles
descriptions
H1
CTA
forms
legal links
structured data
broken links
page speed signals
content gaps
```

### 4.2. Аудит конкурентов

Собрать:

```text
оффер
первый экран
структура
CTA
пакеты
кейсы
lead magnets
FAQ
SEO intent
visual direction
```

### 4.3. Постзапусковый аудит

Проверить:

```text
индексация
sitemap
robots
404
broken links
metadata
schema
form availability
analytics events
```

## 5. Выходной артефакт

Для каждого проекта создавать:

```text
docs/projects/[project-slug]/01-audit.md
```

Содержит:

- что проверено;
- что найдено;
- critical issues;
- conversion issues;
- SEO issues;
- design issues;
- technical issues;
- opportunities;
- recommendations.

## 6. Связь с фабрикой

Crawl-layer питает:

```text
Discovery
Conversion Blueprint
Copy-doc
SEO map
Design direction
Case notes
```

## 7. QA

Аудит готов, если:

- проверены минимум 3 конкурента;
- текущий сайт клиента проверен, если есть;
- найдены conversion gaps;
- найдены SEO gaps;
- есть выводы для структуры будущего сайта;
- есть выводы для оффера;
- есть выводы для lead magnet.

## 8. Эффект

Ожидаемый эффект:

```text
качество discovery: +30%
точность copy-doc: +20%
SEO strategy: +25%
риск делать сайт вслепую: -50%
```

## 9. Внедрение

После v0.2 merge:

```text
factory-skills/site-audit-crawl/SKILL.md
```

Позже можно рассмотреть:

```text
Firecrawl API
Playwright crawler
simple internal URL mapper
```
