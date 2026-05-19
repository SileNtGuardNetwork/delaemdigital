---
name: hero-motion-video
description: Проектирует motion/video hero для premium-сайта: code-driven motion, video loop, poster, mobile fallback, reduced motion и CTA overlay. Использовать для premium first screen.
---

# Hero Motion Video Skill

## Когда использовать

- premium hero;
- экспертный сайт;
- cinematic first screen;
- ClientFlow system visual;
- AI funnel preview;
- Telegram flow preview.

## Вход

- hero copy;
- design direction;
- available photo/video assets;
- CTA map;
- mobile requirements;
- performance budget.

## Процесс

1. Выбрать тип:
   - code-driven motion;
   - video loop;
   - hybrid photo + motion.
2. Зафиксировать HTML H1 / subtitle / CTA.
3. Определить background layer.
4. Определить overlay.
5. Определить poster fallback.
6. Определить mobile fallback.
7. Определить reduced-motion behavior.
8. Проверить LCP risk.

## Выход

```text
hero motion plan
video requirements
fallback strategy
mobile behavior
performance notes
```

## QA

Hero motion готов, если:

- H1 и CTA не находятся внутри видео;
- есть poster;
- есть mobile fallback;
- есть reduced-motion fallback;
- motion не мешает чтению;
- видео не ломает LCP;
- CTA виден и кликабелен.

## Запреты

- scroll hijacking;
- тяжёлый 3D без смысла;
- бесконечный motion вокруг CTA;
- video-only hero без HTML-контента;
- отсутствие mobile fallback.
