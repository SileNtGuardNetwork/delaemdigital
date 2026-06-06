# Delaem Digital Reference Pack v1

Status: approved starting reference pack for DD Visual Pass.
Last updated: 2026-06-06.

## Project

Delaem Digital / ClientFlow Factory flagship site.

## Confirmed direction

```text
Founder-led ClientFlow Architecture
```

Meaning:

- founder authority and personal responsibility;
- visible ClientFlow system map;
- premium dark B2B visual language;
- calm, structured, high-ticket presentation;
- no neon, no cyberpunk, no generic SaaS template.

## Confirmed CTA

Primary CTA:

```text
Разбор системы
```

Secondary CTA options:

```text
Как работает ClientFlow
Посмотреть систему
Telegram-канал
```

## Scope for first visual pass

```text
Hero
ClientFlow Map
Product Cards preview
Mobile 390/430px
Motion plan
Visual QA score
```

Out of scope:

```text
n8n
server
Mem0
S3
database
complex integrations
production deploy
full site redesign below target sections
```

## Reference source stack

Use `DD_VISUAL_REFERENCE_STACK_v1.md`.

Priority sources for this project:

1. curated.design
2. landing.love
3. saaspo.com
4. cta.gallery
5. component.gallery
6. appmotion.design
7. navbar.gallery
8. mobbin.com
9. rebrand.gallery

## Reference intent

This pack does not copy exact websites. It defines what to borrow from each source category.

| Source | Borrow | Do not copy |
|---|---|---|
| curated.design | premium spacing, strong composition, editorial visual rhythm | full layouts, brand identity, illustrations |
| landing.love | hero structure, proof blocks, CTA sequencing | generic startup page style |
| saaspo.com | product-like architecture, feature/product card logic | generic SaaS gradients, fake dashboards |
| cta.gallery | final/diagnostic CTA hierarchy | over-hyped CTA copy |
| component.gallery | component discipline: cards, tabs, forms, buttons | unrelated design system details |
| appmotion.design | hero reveal and route/map motion ideas | decorative motion without meaning |
| navbar.gallery | clean header structure and CTA placement | heavy navbar, mega-menu clutter |
| mobbin.com | mobile-first flow clarity and form/onboarding patterns | app UI copied into marketing page blindly |
| rebrand.gallery | brand-level restraint, color discipline, typography logic | logo/identity copying |

## Visual target

The page must feel like:

```text
premium founder-led digital architecture studio
not a regular web studio
not a generic AI agency
not a SaaS template
```

Required visual signals:

- dark graphite/obsidian canvas;
- copper as commercial CTA accent;
- steel-blue as system/architecture accent;
- large controlled typography;
- real HTML text;
- structured system map;
- founder/editorial trust layer;
- restrained motion.

## Hero direction

Use Hybrid A+B:

```text
Founder Architect + ClientFlow System Map
```

### Composition

Desktop:

```text
Header
Hero split layout
Left: founder/offer/copy/CTA/proof markers
Right: ClientFlow system visual
Bottom: compact trust/process strip
```

Mobile:

```text
Text first
CTA early
System visual second
No cramped cards
No horizontal overflow
```

### Hero must answer

1. Who speaks.
2. Who it is for.
3. What outcome is offered.
4. What is different.
5. What to do next.

## Hero copy direction

Use approved meaning:

```text
Виталий Тимошенко · основатель Делаем Диджитал

Собираю бизнесу
управляемую систему
привлечения клиентов

Для владельцев бизнеса и экспертов, которым нужен не набор digital-инструментов, а понятный маршрут от первого касания до заявки.

CTA: Разбор системы
Secondary: Как работает ClientFlow
```

Copy may be tightened, but positioning must not change without approval.

## ClientFlow Map direction

The ClientFlow Map is the main visual proof that DD sells a system, not a site.

Required route:

```text
Traffic / Source
-> Website / Offer
-> Lead Capture
-> AI Qualification
-> Telegram / CRM
-> Analytics
-> Improvement Loop
```

Visual requirements:

- horizontal or stepped route on desktop;
- vertical readable route on mobile;
- cards/modules connected by thin route lines;
- steel-blue system cues;
- copper only for action/CTA;
- no fake metrics;
- no noisy dashboard wall;
- each stage has one clear role.

## Product cards preview

Preview three product/service cards:

```text
Delaem Site
Delaem Leads
ClientFlow System
```

Cards must show product ladder, not random services.

Each card:

- outcome;
- who it is for;
- what is included;
- next CTA or detail state.

## Navbar direction

Borrow from navbar references:

- simple left logo/wordmark;
- center nav only if useful;
- right primary CTA;
- dark translucent or solid surface;
- no heavy mega menu in first pass.

Navigation:

```text
Подход
Услуги
Кейсы
Обо мне
Контакты
```

## CTA direction

Primary CTA:

```text
Разбор системы
```

CTA style:

- copper accent;
- rectangular / softly rounded;
- premium, not pill-heavy;
- clear hover state;
- visible above fold.

Avoid:

- “Оставить заявку” as primary hero CTA;
- overexcited copy;
- bright neon button.

## Motion direction

Apply after static design is strong.

Allowed first-pass motion plan:

- H1 line reveal;
- subheadline fade/y;
- CTA reveal;
- ClientFlow route line draw;
- stage cards stagger;
- reduced-motion fallback.

No scroll hijacking. No perpetual decorative loops.

## Mobile direction

Target widths:

```text
390px
430px
```

Mobile requirements:

- H1 readable;
- CTA visible early;
- system visual simplified;
- route map becomes vertical timeline;
- no tiny gray text for critical meaning;
- no horizontal overflow.

## Visual QA target

Minimum score for accepted visual pass:

```text
85 / 100
```

Automatic fail if:

- first-screen offer unclear;
- CTA weak/hidden;
- design looks generic SaaS;
- fake dashboard/cards appear;
- mobile hero breaks;
- text is raster image;
- motion blocks readability.

## Reference pack usage prompt

Use this pack with:

- `DD_VISUAL_SYSTEM_v1.md`;
- `DD_VISUAL_QA_GATE_v1.md`;
- `DD_MOTION_STANDARD_v1.md`;
- `DD_OPEN_DESIGN_SPIKE_v1.md` if using Open Design;
- `docs/design/open-design/delaem-digital/DESIGN.md` for Open Design.

## Decision

Start DD Visual Pass with this reference pack.

Do not start backend/server/n8n/Mem0 work until Hero + ClientFlow Map visual quality is acceptable.
