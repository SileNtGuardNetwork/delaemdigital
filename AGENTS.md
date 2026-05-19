# AGENTS.md — Delaem Digital Website Factory

## Project

Repository: `SileNtGuardNetwork/delaemdigital`

Purpose: production operating system and future codebase for the Delaem Digital Website Factory.

This is not a generic agency template. This repository exists to build premium ClientFlow websites and reusable production systems.

## Core Formula

```text
Discovery -> Blueprint -> Copy -> Design -> Next.js -> Integrations -> Analytics -> QA Gate -> Launch -> Case
```

## Primary Product

`Delaem Site` — premium website system under the ClientFlow methodology.

A Delaem Site is not just a visual website. It must include:

- offer architecture;
- conversion-first site blueprint;
- production copy;
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
- Framer Motion only when justified
- Supabase for data/storage/auth when needed
- Telegram Bot API for owner notifications
- PostHog for product analytics
- Yandex Metrika for RU-market websites
- Better Stack for monitoring
- Vercel for own products
- Timeweb Cloud for Russian client personal-data infrastructure when required

## Work Rules

Before implementation:

1. Read relevant docs in `/docs`.
2. Identify the current stage: discovery, blueprint, copy, design, build, integration, QA, launch, or case.
3. Do not skip gates.
4. Do not invent business positioning if already specified.
5. Do not touch secrets or environment variables unless explicitly requested.

After implementation:

```bash
npm run build
npx tsc --noEmit
```

If a Next.js app is not yet initialized, do not claim build/typecheck were run.

## Forbidden

- Do not use Framer as the final production runtime for this repo.
- Do not generate or commit AI raster text as UI.
- Do not create fake dashboards.
- Do not add random floating cards.
- Do not use neon/cyberpunk styling for Delaem Digital premium websites.
- Do not use pill buttons for primary/secondary CTAs unless a design document explicitly allows it.
- Do not add forms without consent logic.
- Do not ship lead forms without success and failure states.
- Do not connect production deploys without explicit approval.
- Do not store secrets in code.

## Required Report Format

Every implementation report must include:

- files changed;
- what changed;
- build result;
- typecheck result;
- preview URL if created;
- risks/blockers;
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

## Quality Standard

A project is not ready if:

- the main offer is unclear;
- CTA is weak or generic;
- mobile version fails;
- lead flow is untested;
- analytics are absent;
- consent/legal minimum is absent;
- owner notification is absent;
- critical AI actions lack human approval;
- there is no handoff or evidence pack.
