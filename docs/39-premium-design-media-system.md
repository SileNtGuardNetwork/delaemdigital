# Premium Design / Expert Photo / Hero Motion System — Делаем Диджитал

Статус: v1 standard
Назначение: зафиксировать систему, за счёт которой фабрика делает уникальные, дизайнерские, премиальные и конверсионные сайты, особенно для экспертов и founder-led проектов.

## 1. Главный принцип

Premium-сайт не создаётся за счёт одного красивого шаблона.

Premium-сайт создаётся через систему:

```text
art direction
→ copy logic
→ hero pattern
→ photo/media strategy
→ typography
→ spacing
→ motion
→ conversion CTA
→ mobile adaptation
→ QA Gate
```

## 2. Что запрещено

Запрещено:

- generic SaaS landing;
- случайные floating cards;
- stock people;
- fake dashboards;
- AI raster text в UI;
- тяжёлый parallax;
- neon/cyberpunk без причины;
- видео, где H1 и CTA зашиты внутрь файла;
- фото эксперта без композиции под текст;
- mobile hero, где лицо или CTA обрезаны.

## 3. Дизайн-направления фабрики

Минимальный набор направлений:

### 3.1. Founder Premium

Для:

- экспертов;
- личного бренда;
- наставников;
- консультантов;
- владельцев компаний.

Код:

```text
портрет
редакционная типографика
тёмный premium-фон
спокойный motion
доверие через личность
```

### 3.2. Diagnostic System

Для:

- аудитов;
- консалтинга;
- ClientFlow диагностики;
- B2B-услуг.

Код:

```text
маршрут клиента
диагностическая карта
системные блоки
акцент на причину потерь
```

### 3.3. Editorial Authority

Для:

- экспертов с сильной методологией;
- образовательных продуктов;
- авторских систем.

Код:

```text
крупная типографика
больше текста
меньше декора
структура как журнал / manifesto
```

### 3.4. Productized Service

Для:

- агентств;
- услуг под ключ;
- digital-продуктов;
- фабричных офферов.

Код:

```text
пакеты
процесс
результат
сроки
CTA
```

### 3.5. Dark Technology Premium

Для:

- AI;
- automation;
- SaaS-like продуктов;
- digital systems.

Код:

```text
graphite / obsidian
copper accent
steel-blue light
system maps
controlled glow
```

## 4. Hero Factory

Фабрика должна иметь набор hero-паттернов.

### Founder Portrait Hero

Использование:

```text
эксперт / личный бренд / консультант
```

Состав:

- портрет;
- H1;
- subtitle;
- 1 primary CTA;
- 1 secondary CTA;
- trust bullets;
- mobile crop.

### System Map Hero

Использование:

```text
сложная услуга / ClientFlow System
```

Состав:

- route-line;
- этапы;
- активный узел;
- объяснение системы;
- CTA.

### Diagnostic Hero

Использование:

```text
аудит / диагностика / разбор бизнеса
```

Состав:

- проблема;
- диагностический promise;
- CTA на диагностику;
- список точек проверки.

### Video Hero

Использование:

```text
premium launch / эксперт с сильной фотосессией / cinematic brand
```

Состав:

- video loop;
- poster;
- dark overlay;
- HTML H1;
- HTML CTA;
- mobile fallback;
- reduced-motion fallback.

### Hybrid Motion Hero

Использование:

```text
лучший default для premium-сайтов
```

Состав:

- фото или визуал;
- code-driven motion;
- route preview;
- ambient light;
- HTML offer;
- CTA.

## 5. Expert Photo System

### Минимум фото

```text
8-12 качественных фото
```

### Оптимум

```text
20-30 фото
```

### Нужные типы кадров

| Тип | Кол-во |
| --- | ---: |
| Главный портрет | 1-3 |
| Полурост | 2-4 |
| Рабочие фото | 3-5 |
| Детали: руки / ноутбук / кабинет | 3-6 |
| Вертикальные mobile-кадры | 2-4 |
| Горизонтальные hero-кадры | 2-3 |
| Чистый фон / нейтральные кадры | 2-3 |

## 6. Asset structure

Для каждого экспертного сайта:

```text
/public/experts/[slug]/
  hero/
  portraits/
  work/
  details/
  mobile/
  og/
```

Конфиг:

```text
expert-config.ts
```

Содержит:

- mainHeroPhoto;
- mobileHeroPhoto;
- fallbackPhoto;
- ogImage;
- photoMood;
- compositionSide;
- textSafeArea;
- preferredHeroPattern.

## 7. Video / motion rules

### H1 и CTA

Всегда HTML.

Запрещено:

```text
H1 внутри видео
CTA внутри видео
важный текст в растровом изображении
```

### Обязательные fallback

- poster image;
- mobile fallback;
- reduced-motion fallback;
- low bandwidth strategy;
- lazy/non-blocking load where possible.

### Performance budget

Hero video:

```text
короткий loop
без звука
WebM + MP4 fallback
контролируемый размер
не блокировать LCP
```

## 8. Motion patterns

Разрешены:

- soft reveal;
- route-line animation;
- step highlight;
- CTA feedback;
- form state transition;
- subtle ambient glow;
- Telegram-flow preview;
- AI-funnel preview.

Запрещены:

- scroll hijacking;
- агрессивный parallax;
- тяжёлый 3D без пользы;
- бесконечно двигающиеся элементы вокруг CTA;
- motion, который мешает чтению.

## 9. Design QA Gate

Каждый premium-сайт получает оценку:

| Блок | Минимум |
| --- | ---: |
| Первый экран | 9/10 |
| CTA | 9/10 |
| Mobile | 9/10 |
| Фото/визуал | 8/10 |
| Типографика | 9/10 |
| Motion | 8/10 |
| Уникальность | 8/10 |
| Конверсия | 9/10 |
| Скорость | 8/10 |

Если сайт выглядит как обычный шаблон — не принимать.

## 10. Внедрение в код

Не сейчас.

После v0.2 merge создать отдельные PR:

```text
premium-design-factory
expert-photo-system
hero-motion-system
```

Возможная структура:

```text
packages/design-patterns/
packages/hero-factory/
packages/media/
```

Компоненты:

```text
FounderHeroPremium
ExpertPhotoHero
SystemMapHero
VideoHero
HybridMotionHero
LeadMagnetHero
```

## 11. Эффект

Ожидаемый прирост:

```text
premium-дизайн: 35% -> 80-90%
экспертные сайты: 20% -> 80-90%
hero video/motion: 10% -> 70-85%
уникальность сайтов: +30-40%
```
