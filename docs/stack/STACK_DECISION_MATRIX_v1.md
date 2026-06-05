# Stack Decision Matrix v1 — Delaem Digital

Status: source of truth for current technology decisions.
Last updated: 2026-06-05.

This document records stack decisions for Delaem Digital / ClientFlow Factory. It separates production stack, spike candidates, research-only sources, and lab-only experiments.

## Decision levels

| Level | Meaning |
|---|---|
| `ADOPT` | Approved for internal production stack or standard implementation path. |
| `SPIKE` | Promising, but must pass a controlled test before production use. |
| `RESEARCH SOURCE` | Useful for discovery only. Do not integrate directly. |
| `LAB ONLY` | Isolated experiment. No production dependency. |
| `REJECT` | Do not use unless a future decision reverses it. |

## Current decisions

| Tool / repo | Decision | Stack location | Cost posture | Notes |
|---|---|---|---|---|
| `n8n-io/n8n` | `ADOPT` | DD Automation Layer | Self-host license cost starts at 0, but VPS/DB/backups/support cost money. Cloud/Enterprise paid. | Use for ClientFlow automation, lead routing, Telegram owner cards, reports, CRM/n8n workflows. Do not use as payment/access source of truth. |
| `greensock/gsap-skills` | `ADOPT` | Website Factory Motion Layer | 0 license cost. Implementation time only. | Official GSAP skills for Codex/Cursor/Claude. Use for safe premium animation patterns in Next.js. |
| `mem0ai/mem0` | `SPIKE` | AI Memory Layer | OSS/self-host starts at 0, but LLM/embedding/storage/VPS cost money. Cloud paid after limits. | Test for DD AI Engineering OS, lead qualifier memory, support memory. Requires PII/deletion/cross-user leakage gates. |
| `cporter202/API-mega-list` | `RESEARCH SOURCE` | API Sourcing / Market Research | Repo is free. Listed APIs/Apify actors may be paid and legally risky. | Use only as raw discovery input. Every candidate must pass API Sourcing Gate. |
| `masterking32/MasterDnsVPN` | `LAB ONLY` | SileNt Emergency Transport Research, outside DD production | Code is MIT/free. VPS/domain/test infra cost money. | DNS tunnel research only. Do not integrate into DD production or SileNt production without separate gate. |

## Production stack additions

### n8n

Approved role:

```text
DD Automation Layer
```

Primary use cases:

- website lead form routing;
- quiz / diagnostic submission routing;
- Telegram owner lead cards;
- Supabase / CRM writes;
- follow-up tasks;
- campaign and content workflow automation;
- case factory automation;
- weekly/daily operational digests;
- SileNt ops notifications and reports, without becoming source of truth.

Hard boundaries:

- no payment activation as n8n-only business logic;
- no access key issuance source of truth;
- no production workflow without error handling;
- no public webhook without auth/signature/rate limiting;
- no secrets in node parameters or exported JSON.

Reference standard:

```text
docs/standards/DD_N8N_WORKFLOW_STANDARD_v1.md
```

### GSAP skills

Approved role:

```text
Website Factory Motion Layer
```

Primary use cases:

- premium hero reveal;
- scroll-supported narrative sections;
- case/trust reveal patterns;
- onboarding visual flows;
- high-quality interaction states.

Hard boundaries:

- motion must support hierarchy, not decoration;
- no neon/cyberpunk/noisy animation;
- no ScrollTrigger without mobile/performance/reduced-motion checks;
- no GSAP during SSR;
- always scope and cleanup animations in React/Next.js.

Reference standard:

```text
docs/standards/DD_MOTION_STANDARD_v1.md
```

## Spike candidates

### Mem0

Approved role after successful spike:

```text
AI Memory Layer
```

Candidate use cases:

- DD AI Engineering OS project memory;
- AI Lead Qualifier memory;
- support context memory;
- ClientFlow decision memory;
- Case Factory memory;
- SileNt support and incident history memory.

Required gate before production:

```text
docs/standards/DD_MEMORY_LAYER_STANDARD_v1.md
```

## Research-only sources

### API Mega List

Allowed use:

- discover possible APIs/MCP servers/Apify actors;
- identify market tooling categories;
- build candidate list for Stack Decision Matrix.

Forbidden use:

- direct adoption without review;
- cold outreach/scraping/spam tooling;
- unauthorized personal-data extraction;
- tools with unclear legal basis or unstable pricing.

Reference gate:

```text
docs/standards/API_SOURCING_GATE_v1.md
```

## Lab-only technologies

### MasterDnsVPN

Allowed use:

- isolated technical research only;
- separate VPS/domain;
- no DD/SileNt branding;
- no real users;
- no payments;
- no production gateway.

Reference gate:

```text
docs/labs/SILENT_EMERGENCY_TRANSPORT_LAB_GATE_v1.md
```

## Current adoption priority

1. `n8n` — implement DD Automation Layer standard and first ClientFlow workflow.
2. `gsap-skills` — install skills and define DD Motion Standard.
3. `mem0` — run controlled memory spike.
4. `API-mega-list` — use only for candidate sourcing.
5. `MasterDnsVPN` — keep outside production as lab-only research.
