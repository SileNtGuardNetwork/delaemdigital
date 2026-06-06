# DD Visual Reference Stack v1

Status: adopted reference layer for Delaem Digital design production.
Last updated: 2026-06-06.

## Purpose

This document defines the external design inspiration sources approved for Delaem Digital / ClientFlow Factory.

These sources are not production dependencies. They are reference libraries used to raise visual quality, build reference packs and guide Codex/Cursor implementation.

## Core rule

Do not copy sites.

Extract patterns:

- composition;
- typography;
- grid;
- spacing;
- CTA hierarchy;
- section logic;
- motion behavior;
- mobile UX;
- brand language;
- component patterns.

Then adapt through DD Visual System and Visual QA Gate.

## Approved reference sources

| Source | Status | Use for |
|---|---|---|
| `curated.design` | DESIGN REFERENCE | high-end web design, composition, visual taste |
| `landing.love` | DESIGN REFERENCE | landing page structure, hero, offer, proof, FAQ, CTA |
| `saaspo.com` | DESIGN REFERENCE | SaaS/product positioning, feature sections, product UI |
| `navbar.gallery` | DESIGN REFERENCE | desktop/mobile nav, CTA placement, header patterns |
| `cta.gallery` | DESIGN REFERENCE | final CTA, diagnostic CTA, audit CTA, conversion sections |
| `appmotion.design` | DESIGN REFERENCE | motion references, microinteractions, mobile/product motion |
| `mobbin.com` | DESIGN REFERENCE | mobile UX, onboarding, app screens, forms, flows |
| `rebrand.gallery` | DESIGN REFERENCE | brand systems, visual identity, typography, color logic |
| `hugeicons.com` | ASSET CANDIDATE | icon style and icon sourcing after style check |
| `component.gallery` | DESIGN REFERENCE | UI components, forms, tabs, pricing, cards, nav patterns |

## How to use sources

### curated.design

Use for:

- general premium web design level;
- composition;
- spacing;
- visual rhythm;
- strong typography;
- non-generic layouts.

Do not copy full visual systems.

### landing.love

Use for:

- landing page structure;
- first-screen patterns;
- offer sections;
- proof blocks;
- pricing / package logic;
- FAQ and final CTA.

Use when designing pages for Delaem Digital, Zapadny Metr and SileNt public pages.

### saaspo.com

Use for:

- product-led website patterns;
- feature sections;
- product interface framing;
- integration blocks;
- pricing/product ladder;
- onboarding route.

Filter heavily. Avoid generic SaaS look.

### navbar.gallery

Use for:

- header structure;
- sticky navigation;
- mobile menu;
- CTA placement;
- product/service nav.

Navbar must not overpower the first screen.

### cta.gallery

Use for:

- conversion sections;
- diagnostic CTA;
- Telegram CTA;
- audit CTA;
- final CTA;
- lead magnet CTA.

CTA must be specific, not generic.

### appmotion.design

Use for:

- hero reveal references;
- section transitions;
- microinteractions;
- product UI motion;
- mobile app motion.

All motion must pass `DD_MOTION_STANDARD_v1.md`.

### mobbin.com

Use for:

- mobile UX;
- onboarding;
- forms;
- multi-step flows;
- app-like screens;
- SileNt onboarding/support UX;
- AI Lead Qualifier flow.

Mobile is not an afterthought.

### rebrand.gallery

Use for:

- brand identity systems;
- color logic;
- typography pairings;
- logo/mark application;
- brand rollout examples.

Useful for Delaem Digital, Zapadny Metr, SileNt and Architect Web3.

### hugeicons.com

Use for:

- icon research;
- consistent line icon style;
- feature cards;
- process steps;
- status UI.

Do not mix icon families inside one project.

### component.gallery

Use for:

- buttons;
- cards;
- forms;
- tabs;
- tables;
- accordions;
- modals;
- pricing cards;
- dashboard elements;
- empty states.

This source is especially useful for turning visual direction into reusable components.

## Project-specific source priority

### Delaem Digital

Priority:

1. curated.design
2. landing.love
3. saaspo.com
4. cta.gallery
5. component.gallery
6. appmotion.design
7. navbar.gallery

Goal:

```text
Premium dark B2B + ClientFlow System + founder-led authority.
```

### Zapadny Metr

Priority:

1. curated.design
2. landing.love
3. rebrand.gallery
4. component.gallery
5. mobbin.com

Goal:

```text
Light architectural premium + real estate trust + local expertise.
```

### SileNt

Priority:

1. saaspo.com
2. mobbin.com
3. component.gallery
4. appmotion.design
5. cta.gallery

Goal:

```text
Secure dark product + clear access UX + no cyberpunk noise.
```

## Reference pack workflow

For each serious project, create:

```text
docs/design/reference-packs/[project]/REFERENCE_PACK_v1.md
```

Every reference pack must include:

1. project goal;
2. style family;
3. selected links/screenshots;
4. what to borrow from each source;
5. what not to copy;
6. hero direction;
7. section patterns;
8. motion references;
9. mobile references;
10. Visual QA target.

## Codex/Cursor prompt rule

Bad prompt:

```text
Make it look like curated.design.
```

Good prompt:

```text
Use DD Visual System v1.
Reference pack:
- Ref A: borrow typography scale and spacing only.
- Ref B: borrow hero composition only.
- Ref C: borrow CTA hierarchy only.
- Ref D: borrow mobile navigation pattern only.
Do not copy colors, logos, text or layout exactly.
Implement in Next.js + Tailwind + shadcn/ui.
Pass DD Visual QA Gate 85/100.
```

## Visual ethics

Do not copy:

- brand identity;
- logos;
- proprietary illustrations;
- unique copy;
- full layout;
- product screenshots;
- exact animations.

Allowed:

- abstract structure;
- spacing principles;
- hierarchy logic;
- generic interaction patterns;
- section sequencing;
- design vocabulary.

## Required gate

Every reference-inspired implementation must pass:

- `DD_VISUAL_SYSTEM_v1.md`;
- `DD_VISUAL_QA_GATE_v1.md`;
- `DD_MOTION_STANDARD_v1.md` if animated.

Minimum production score: 85/100.
