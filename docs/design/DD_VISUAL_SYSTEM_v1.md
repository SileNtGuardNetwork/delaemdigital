# DD Visual System v1

Status: adopted production design standard.
Last updated: 2026-06-06.

## Purpose

This document closes the base visual layer for Delaem Digital / ClientFlow Factory.

Goal: make premium websites repeatable, not accidental.

Design pipeline:

```text
Business input -> reference pack -> visual direction -> hero concepts -> section system -> motion pass -> visual QA -> reusable pattern
```

## Core rule

Do not ask AI to "make it beautiful".

Ask for a specific visual artifact under a specific system with clear acceptance criteria.

## Visual thesis

Delaem Digital style:

- founder-led;
- architectural;
- controlled;
- high-ticket B2B;
- premium dark minimalism;
- calm authority;
- real business systems;
- no visual noise.

It must not look like:

- generic SaaS template;
- random AI landing;
- noisy neon startup;
- fake dashboard collage;
- template agency site;
- random floating cards.

## Production design stack

Use:

- Figma / FigJam for reference and layout thinking;
- Next.js for final implementation;
- TypeScript;
- Tailwind CSS;
- shadcn/ui / Radix UI;
- GSAP + @gsap/react for approved motion;
- Vercel preview;
- Lighthouse / manual visual QA.

## AI usage

Allowed:

- AI for critique, concepts, implementation and QA;
- image generation for moodboards and non-critical visuals;
- GSAP skills for animation correctness.

Not allowed:

- raster AI text as final UI;
- generated screenshot as final website;
- blind copy of generated layout;
- fake visual proof;
- visual decisions without product logic.

## Required input before design

Before any serious visual work, define:

- product;
- audience;
- main offer;
- primary CTA;
- secondary CTA;
- proof assets;
- legal limits;
- brand temperature;
- conversion goal.

## Style families

### Delaem Digital

Premium dark B2B, founder-led, graphite/obsidian surfaces, copper primary action, steel-blue system cues, strict grid, controlled motion.

Use for:

- DD personal site;
- ClientFlow System pages;
- agency pages;
- internal DD products.

### Zapadny Metr

Light architectural premium, real-estate trust, white/warm-stone/graphite, large property visuals, map/location signals, minimal motion.

Use for:

- real estate selection;
- property pages;
- advisory pages;
- premium local trust.

### SileNt

Secure dark product, quiet security feel, restrained status signals, clear tariff/access UX, no panic copy, no visual clutter.

Use for:

- public landing;
- onboarding;
- support pages;
- docs;
- product web screens if needed.

## Token discipline

Every project needs explicit tokens:

- canvas;
- surface;
- border;
- primary text;
- secondary text;
- muted text;
- primary action;
- secondary action;
- success;
- danger;
- focus;
- radius scale;
- elevation rules.

If tokens do not exist, create them before implementation.

## Typography rules

Premium quality starts with typography.

Rules:

- one primary font family;
- large controlled H1;
- strong display letter-spacing only for big headings;
- body text readable at 15-18px;
- no tiny gray paragraphs for critical meaning;
- no more than 3 text colors on screen;
- no centered paragraph longer than 2 lines;
- no uppercase abuse.

## Layout rules

Desktop defaults:

```text
max-width: 1200-1360px
12-column grid or disciplined flex grid
section spacing: 96-160px
card radius: 12-18px
CTA visible without hunting
```

Mobile defaults:

```text
360-430px first
single-column priority
text before decorative visual
CTA early
no horizontal overflow
no sticky/cookie element covering CTA
```

## Motion rule

Motion is applied after static layout is strong.

Allowed motion:

- hero reveal;
- section reveal;
- route/map progression;
- proof reveal;
- CTA hover;
- diagnostic step transition.

Forbidden motion:

- scroll hijacking;
- random floating elements;
- perpetual decorative animation;
- heavy decorative glow loops;
- motion that hides content or form states.

## Source documents

Use with:

- `docs/standards/DD_MOTION_STANDARD_v1.md`
- `docs/ai-agents/DD_AGENT_PACK_v1.md`
- `docs/stack/STACK_DECISION_MATRIX_v1.md`
- `AGENTS.md`

For `delaemdigitalmain`, also use:

- `docs/delaem-digital/design-constitution-v1.md`
- `docs/delaem-digital/hero-factory-brief-v1.md`
- `docs/delaem-digital/site-blueprint-v1.md`
- `docs/delaem-digital/copy-doc-v1.md`

## First priority

Start with:

```text
DD-VISUAL-PASS-01
```

Scope:

- hero;
- ClientFlow Map;
- product cards preview;
- mobile layout;
- restrained motion plan;
- visual QA score.

Do not start with server/n8n/Mem0 work until the flagship visual layer is acceptable.
