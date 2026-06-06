# DD Open Design Spike v1

Status: spike standard, not production dependency.
Last updated: 2026-06-06.

## Decision

Open Design is approved for a controlled spike as a local/self-hosted Visual Prototype Lab.

```text
Tool: nexu-io/open-design
Decision: SPIKE
Stack location: Visual Prototype Lab
Cost mode: local / self-host / BYOK only
Cloud router/subscription: not used for now
Production dependency: no
```

## Purpose

Use Open Design to create fast visual prototypes for:

- hero concepts;
- ClientFlow Map sections;
- premium section concepts;
- case one-pagers;
- proposal/deck concepts;
- product interface mockups.

Open Design is not a website builder for final production.

## Core workflow

```text
DD DESIGN.md
+ Open Design skill
+ prompt
+ Codex / Cursor / local agent or BYOK API
-> visual artifact
-> Visual QA Gate
-> selected winner
-> Next.js implementation
```

## Allowed use

Allowed:

- generate 3 hero concepts;
- generate ClientFlow Map concept;
- generate deck/proposal concept;
- compare visual directions;
- export prototype as reference;
- use artifact as implementation guide.

## Forbidden use

Do not:

- treat Open Design output as final production site;
- copy generated layout blindly;
- use raster AI text as final UI;
- use generic SaaS/neon/cyberpunk output for Delaem Digital;
- connect paid cloud router without explicit decision;
- make Open Design a required dependency for client delivery;
- put secrets/client data into prototype prompts;
- spend time on endless concept generation.

## Operating constraints

Each Open Design run must have a hard scope:

```text
3 concepts max
1 winner
1 corrective pass
then Next.js implementation
```

If the result is weak after one corrective pass, stop and use manual visual direction.

## Required DD design system

Use:

```text
docs/design/open-design/delaem-digital/DESIGN.md
```

This file adapts DD Visual System, Motion Standard and Visual QA rules into the Open Design format.

## First spike

```text
OPEN-DESIGN-SPIKE-01
```

Goal:

Validate whether Open Design improves the visual quality of Delaem Digital above current level.

Scope:

1. Local Docker or local source run.
2. Use DD DESIGN.md.
3. Generate 3 hero concepts:
   - Founder Architect;
   - ClientFlow System Map;
   - Premium Command Interface.
4. Generate 1 ClientFlow Map section concept.
5. Score concepts using DD Visual QA Gate.
6. Select winner.
7. Transfer winner to Next.js manually/Codex.

## PASS criteria

Open Design passes spike if:

- output is visually stronger than current DD design;
- output follows DD visual system;
- result is not generic SaaS/AI template;
- concept is feasible to implement in Next.js/Tailwind;
- mobile adaptation is clear;
- artifact speeds up visual direction;
- Visual QA score can reach 85+ after implementation.

## FAIL criteria

Open Design fails spike if:

- output ignores DESIGN.md;
- result is visually noisy or generic;
- generated artifacts are hard to translate into production UI;
- it creates more work than direct implementation;
- it pushes us toward paid cloud dependency;
- it encourages endless visual exploration.

## Relationship to other tools

Use with:

- `DD_VISUAL_SYSTEM_v1.md`;
- `DD_VISUAL_QA_GATE_v1.md`;
- `DD_MOTION_STANDARD_v1.md`;
- `greensock/gsap-skills`;
- `dd-design-quality-director`;
- `dd-frontend-product-ui-engineer`.

Do not confuse with MotionSites.ai. MotionSites.ai is not adopted due to cost. Open Design is evaluated as open-source/local tooling.
