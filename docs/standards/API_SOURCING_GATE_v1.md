# API Sourcing Gate v1

Status: adopted research gate for Delaem Digital.
Last updated: 2026-06-05.

## Purpose

This gate defines how Delaem Digital evaluates external APIs, Apify actors, MCP servers, data providers and automation tools before adding them to the stack.

Reference source:

```text
cporter202/API-mega-list
```

Decision status for API-mega-list:

```text
RESEARCH SOURCE
```

The list is not trusted by default. It is a raw discovery source only.

## Core rule

No API/tool from a catalog may be adopted directly.

Every candidate must pass:

1. usefulness check;
2. legal/compliance check;
3. security check;
4. pricing check;
5. reliability check;
6. integration check;
7. data-quality check.

## Forbidden categories

Do not adopt tools used for:

- unauthorized personal-data scraping;
- cold spam outreach;
- auto-submitting contact forms at scale;
- scraping private groups or members;
- bypassing platform protections;
- credential harvesting;
- surveillance or spyware behavior;
- unclear/illegal data resale;
- tools with hidden cookie/session requirements;
- tools that require violating a platform ToS.

## Candidate evaluation template

```text
Tool name:
Source URL:
Category:
Proposed DD use case:
ClientFlow layer:
Data involved:
Does it process PII:
Legal risk:
Security risk:
Pricing:
Rate limits:
Auth method:
Data retention:
Alternatives:
Decision: ADOPT / SPIKE / WATCH / REJECT
Reason:
```

## Scoring

| Criterion | Score 0-5 |
|---|---|
| Clear DD use case | |
| Legal safety | |
| Security posture | |
| Pricing clarity | |
| API reliability | |
| Documentation quality | |
| Data quality | |
| Integration fit | |

Minimum for spike: 28/40.
Minimum for adoption: 34/40 and no critical legal/security blockers.

## Approved discovery categories

Allowed categories for research:

- SEO and SERP analysis;
- company research;
- public website content extraction;
- documentation indexing;
- analytics connectors;
- translation;
- content summarization;
- public pricing intelligence;
- public market/news monitoring;
- official API connectors.

## High-risk categories

Require explicit owner approval:

- social media scraping;
- lead enrichment;
- email/phone discovery;
- WhatsApp/Telegram automation;
- contact-form automation;
- review scraping;
- job/candidate scraping;
- competitor monitoring at scale.

## Integration rule

Any accepted API must be documented in:

```text
docs/stack/STACK_DECISION_MATRIX_v1.md
```

If used in production, also document:

- env variables;
- webhook shape;
- rate limits;
- retry policy;
- failure behavior;
- data retention;
- cost owner;
- monitoring.

## First approved process

```text
API-MEGA-LIST-SPIKE-01
```

Goal:

Extract up to 20 candidate tools from API-mega-list for DD.

Allowed categories:

- AI;
- MCP Servers;
- SEO Tools;
- Integrations;
- News.

Output:

- shortlist of 5-7 safe tools;
- one-page evaluation each;
- stack decision proposal;
- no direct integration until accepted.
