# AGENTS.md — Delaem Digital Website Factory

## Project

Repository: `SileNtGuardNetwork/delaemdigital`

Purpose: production operating system and future codebase for the Delaem Digital Website Factory.

This is not a generic agency template. This repository exists to build premium ClientFlow websites and reusable production systems.

## Core Formula

```text
Discovery -> Blueprint -> Copy -> Design -> References -> Next.js -> Motion -> Integrations -> Analytics -> QA Gate -> Launch -> Case
```

## Primary Product

`Delaem Site` — premium website system under the ClientFlow methodology.

A Delaem Site is not just a visual website. It must include:

- offer architecture;
- conversion-first site blueprint;
- production copy;
- reference pack;
- premium restrained UI;
- adaptive layout;
- validated lead form;
- consent logic;
- Telegram/CRM notification path;
- analytics events;
- QA gate;
- handoff and evidence pack.

## Technology Defaults

Use these defaults unless a specific document says otherwise:

- Next.js App Router
- TypeScript strict
- Tailwind CSS
- shadcn/ui
- Supabase for data/storage/auth when needed
- Telegram Bot API for owner notifications
- PostHog for product analytics
- Yandex Metrika for RU-market websites
- Better Stack for monitoring
- Vercel for own products
- Timeweb Cloud for Russian client personal-data infrastructure when required
- n8n for approved automation workflows
- GSAP for approved premium motion patterns when animation is justified

## Stack Source of Truth

Current stack decisions and standards live in:

- `docs/stack/STACK_DECISION_MATRIX_v1.md`
- `docs/design/DD_VISUAL_SYSTEM_v1.md`
- `docs/design/DD_VISUAL_REFERENCE_STACK_v1.md`
- `docs/design/DD_VISUAL_QA_GATE_v1.md`
- `docs/standards/DD_OPEN_DESIGN_SPIKE_v1.md`
- `docs/standards/DD_N8N_WORKFLOW_STANDARD_v1.md`
- `docs/standards/DD_MOTION_STANDARD_v1.md`
- `docs/standards/DD_MEMORY_LAYER_STANDARD_v1.md`
- `docs/standards/API_SOURCING_GATE_v1.md`
- `docs/labs/SILENT_EMERGENCY_TRANSPORT_LAB_GATE_v1.md`

Current stack decisions:

- `n8n`: `ADOPT` as DD Automation Layer.
- `greensock/gsap-skills`: `ADOPT` as Website Factory Motion Layer.
- `nexu-io/open-design`: `SPIKE` as local/self-host Visual Prototype Lab.
- `mem0ai/mem0`: `SPIKE` as candidate AI Memory Layer.
- `cporter202/API-mega-list`: `RESEARCH SOURCE` only.
- `masterking32/MasterDnsVPN`: `LAB ONLY`, not DD/SileNt production.

Do not upgrade a `SPIKE`, `RESEARCH SOURCE` or `LAB ONLY` item into production without updating the stack decision matrix and adding evidence.

## Visual Reference Source of Truth

Use `docs/design/DD_VISUAL_REFERENCE_STACK_v1.md` before serious visual work.

Approved reference sources include:

- curated.design for general premium web design;
- landing.love for landing structure;
- saaspo.com for SaaS/product website patterns;
- navbar.gallery for navigation;
- cta.gallery for CTA sections;
- appmotion.design for animation references;
- mobbin.com for mobile UX;
- rebrand.gallery for brand systems;
- hugeicons.com for icon research;
- component.gallery for component patterns.

Reference sources are not production dependencies and must not be copied directly. Extract patterns, then adapt through DD Visual System and Visual QA Gate.

## Agent Source of Truth

Use the DD Agent Pack when a specialized role is useful:

- `docs/ai-agents/DD_AGENT_PACK_v1.md`
- `docs/ai-agents/CODEX_CUSTOM_AGENTS.md`
- `.cursor/rules/dd-agent-pack-v1.mdc`

Do not import a broad external agent pack wholesale. Use the curated DD roles only.

Recommended roles:

- `dd-senior-digital-architect`
- `dd-clientflow-strategist`
- `dd-website-factory-architect`
- `dd-design-quality-director`
- `dd-frontend-product-ui-engineer`
- `dd-backend-ai-integrations-engineer`
- `dd-telegram-bot-architect`
- `dd-evidence-collector`
- `dd-reality-gate-checker`
- `dd-minimal-change-engineer`
- `dd-security-architect`
- `dd-sre-monitoring-engineer`

## Minimal Autonomy Protocol

This protocol adapts the useful part of Karpathy-style `program.md`: small scope, baseline first, one change, objective check, evidence, keep/discard.

For every implementation task:

1. Define the target flow in one sentence.
2. Read only the relevant files first.
3. State the files that may be changed.
4. State the files that must not be changed.
5. Establish a baseline before editing.
6. Make the smallest safe diff.
7. Run the relevant verification commands.
8. Collect evidence.
9. If the change passes, keep it and report evidence.
10. If the change fails, revert or report the exact blocker.
11. Do not expand scope without explicit instruction.

The agent must not run an indefinite loop. This repo is a production operating system, not an autonomous overnight experiment harness.

## Baseline Requirements

Before editing code, establish the current state using the smallest useful check:

- build/typecheck status;
- relevant page/route behavior;
- current lead form behavior;
- current Telegram/CRM notification behavior;
- current analytics event behavior;
- current docs/spec requirements;
- current visual/reference requirements when the task touches UI.

If a baseline cannot be established, say so explicitly and continue with the safest narrow change.

## Keep / Discard Logic

A change may be kept only if it improves the target flow without damaging adjacent flows.

Keep when:

- build/typecheck pass or the repo has no initialized app yet;
- the target behavior is verified;
- no unrelated files were changed;
- no production secrets or env values were touched;
- evidence is captured in the final report.

Discard or revise when:

- build/typecheck fails because of the change;
- the target behavior is not verified;
- the change broadens scope;
- the change weakens consent, legal, analytics, monitoring or owner notification;
- the change adds visual noise or generic SaaS design;
- reference-inspired work copies a site instead of adapting patterns.

## Work Rules

Before implementation:

1. Read relevant docs in `/docs`.
2. Identify the current stage: discovery, blueprint, copy, design, references, build, integration, QA, launch, or case.
3. Do not skip gates.
4. Do not invent business positioning if already specified.
5. Do not touch secrets or environment variables unless explicitly requested.
6. Prefer one narrow PR/change over broad refactors.
7. For visual work, create or use a reference pack before implementation.

After implementation:

```bash
npm run build
npx tsc --noEmit
```

If a dedicated script exists, prefer it:

```bash
npm run typecheck
```

If a Next.js app is not yet initialized, do not claim build/typecheck were run.

## Forbidden

- Do not use Framer as the final production runtime for this repo.
- Do not generate or commit AI raster text as UI.
- Do not create fake dashboards.
- Do not add random floating cards.
- Do not use neon/cyberpunk styling for Delaem Digital premium websites.
- Do not use pill buttons for primary/secondary CTAs unless a design document explicitly allows it.
- Do not copy complete layouts, logos, text, animations or proprietary illustrations from reference sources.
- Do not add forms without consent logic.
- Do not ship lead forms without success and failure states.
- Do not connect production deploys without explicit approval.
- Do not store secrets in code.
- Do not add dependencies without explicit approval.
- Do not run migrations without explicit approval.
- Do not perform autonomous production deploys.
- Do not use n8n as source of truth for payments, access rights or key issuance.
- Do not store sensitive client/user memory in Mem0 before the memory spike passes.
- Do not use API-mega-list tools for scraping, spam or unauthorized personal-data extraction.
- Do not connect MasterDnsVPN or DNS tunnel research to production DD/SileNt systems.

Destructive commands are forbidden unless explicitly approved:

- `rm -rf`
- `git reset --hard`
- `git clean`
- `DROP`
- `DELETE FROM`
- `supabase db reset`

## Required Report Format

Every implementation report must include:

- applied role, if any;
- target flow;
- baseline checked;
- files changed;
- files intentionally not changed;
- what changed;
- reference pack used if visual work;
- build result;
- typecheck result;
- functional evidence;
- visual QA score if UI changed;
- preview URL if created;
- risks/blockers;
- keep/discard decision;
- next action.

## Design Direction

Default Delaem Digital visual language:

- premium dark minimalism;
- graphite/obsidian surfaces;
- restrained copper action accent;
- steel-blue system cues;
- real HTML text;
- high-ticket B2B authority;
- no visual noise.

Visual references must follow `docs/design/DD_VISUAL_REFERENCE_STACK_v1.md`.
Motion must follow `docs/standards/DD_MOTION_STANDARD_v1.md`.

## Quality Standard

A project is not ready if:

- the main offer is unclear;
- CTA is weak or generic;
- mobile version fails;
- visual reference pack is absent for serious visual work;
- lead flow is untested;
- analytics are absent;
- consent/legal minimum is absent;
- owner notification is absent;
- critical AI actions lack human approval;
- there is no handoff or evidence pack.

## Final Gate

Before any launch claim, apply `dd-reality-gate-checker`.

Default status is `NEEDS WORK` unless evidence proves readiness.

Allowed statuses:

- `PASS`
- `CONDITIONAL PASS`
- `FAIL`

Never claim production readiness from visual review alone.
