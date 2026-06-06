# DD-VISUAL-PASS-01 — Implementation Prompt

Status: ready for Codex/Cursor.
Last updated: 2026-06-06.

## Role

Apply these roles:

- `dd-website-factory-architect`
- `dd-design-quality-director`
- `dd-frontend-product-ui-engineer`
- GSAP React skill if adding motion, but motion is optional in first static pass.

## Target project

Delaem Digital flagship site / personal site showcase.

Primary direction:

```text
Founder-led ClientFlow Architecture
```

Primary CTA:

```text
Разбор системы
```

## Required source docs

Read first:

- `AGENTS.md`
- `docs/design/DD_VISUAL_SYSTEM_v1.md`
- `docs/design/DD_VISUAL_REFERENCE_STACK_v1.md`
- `docs/design/DD_VISUAL_QA_GATE_v1.md`
- `docs/design/reference-packs/delaem-digital/REFERENCE_PACK_v1.md`
- `docs/standards/DD_MOTION_STANDARD_v1.md`

If working in `delaemdigitalmain`, also read the local docs:

- `docs/delaem-digital/design-constitution-v1.md`
- `docs/delaem-digital/hero-factory-brief-v1.md`
- `docs/delaem-digital/site-blueprint-v1.md`
- `docs/delaem-digital/copy-doc-v1.md`

## Scope

Implement only the first visual pass:

```text
Hero
ClientFlow Map
Product Cards preview
Mobile 390/430px
Motion plan or minimal safe static placeholders
Visual QA report
```

Do not touch:

- n8n;
- server;
- Mem0;
- S3;
- database;
- backend integrations;
- lead form backend;
- production deploy;
- lower sections outside the visual-pass target unless required for layout continuity.

## Design requirements

Visual language:

- premium dark B2B;
- founder-led authority;
- ClientFlow architecture visible;
- graphite/obsidian surfaces;
- restrained copper CTA;
- steel-blue system cues;
- strict layout;
- real HTML text;
- no visual noise.

Forbidden:

- generic SaaS template;
- fake dashboard wall;
- random floating cards;
- neon/cyberpunk;
- purple/rainbow gradients;
- AI raster text;
- CTA hidden below fold;
- mobile overflow.

## Hero content direction

Preserve meaning:

```text
Виталий Тимошенко · основатель Делаем Диджитал

Собираю бизнесу
управляемую систему
привлечения клиентов

Для владельцев бизнеса и экспертов, которым нужен не набор digital-инструментов, а понятный маршрут от первого касания до заявки.

CTA: Разбор системы
Secondary CTA: Как работает ClientFlow
```

Do not change positioning without explicit approval.

## ClientFlow Map required stages

```text
Traffic / Source
-> Website / Offer
-> Lead Capture
-> AI Qualification
-> Telegram / CRM
-> Analytics
-> Improvement Loop
```

Desktop:

- system map / route architecture;
- clean module cards;
- route lines;
- readable labels;
- no fake metrics.

Mobile:

- vertical route/timeline;
- no horizontal overflow;
- readable text.

## Product cards preview

Preview three products:

```text
Delaem Site
Delaem Leads
ClientFlow System
```

Each card must show:

- outcome;
- target user;
- included system pieces;
- next action or detail hint.

## Motion rules

If adding motion:

- use restrained reveal only;
- no scroll hijacking;
- no perpetual decorative loops;
- respect reduced motion;
- avoid SSR issues;
- use scoped refs and cleanup.

If motion is not implemented in this pass, include a motion plan in the report.

## Verification

Run available checks:

```bash
npm run build
npx tsc --noEmit
```

If the project has `npm run typecheck`, use it.

If commands are unavailable, state that clearly and provide nearest evidence.

## Required final report

Return:

```text
Applied roles:
Target flow:
Baseline checked:
Files changed:
Files intentionally not changed:
Reference pack used:
What changed:
Desktop visual evidence:
Mobile visual evidence:
Build result:
Typecheck result:
Visual QA score /100:
Motion status:
Risks/blockers:
Keep/discard decision:
Next action:
```

## Acceptance criteria

Pass only if:

- first screen clearly communicates the offer;
- primary CTA is visible above fold;
- visual feels premium and non-generic;
- ClientFlow Map explains the system;
- mobile layout works;
- no forbidden visual patterns;
- build/typecheck pass or missing scripts are documented;
- Visual QA score target is 85+.
