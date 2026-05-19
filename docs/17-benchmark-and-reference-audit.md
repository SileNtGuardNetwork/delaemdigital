# Benchmark and Reference Audit

Status: v1 foundation
Purpose: prevent the Website Factory from becoming an isolated, low-quality internal template.

## 1. Principle

Do not build the production template in isolation.

Before the first Next.js implementation, the factory must inspect:

1. Internal repositories owned by Delaem Digital.
2. Public high-quality Next.js templates.
3. Official examples from core tools.
4. Current best practices for analytics, forms, validation, deployment, and monitoring.

The goal is not to copy repositories. The goal is to extract patterns, avoid mistakes, and define a stronger internal standard.

## 2. Internal Repositories To Audit

### SileNtGuardNetwork/delaemdigitalmain

Purpose: current Delaem Digital personal site and ClientFlow showcase.

Audit for:

- current Next.js structure
- design tokens
- homepage sections
- legal pages
- cookie banner
- existing lead form state
- reusable copy
- reusable components
- problems to avoid

### SileNtGuardNetwork/simbioz-core

Purpose: internal product experience and possible AI or product patterns.

Audit for:

- project structure
- AI usage
- data flow
- reusable backend patterns
- mistakes to avoid

### SileNtGuardNetwork/architect-web3-bot

Purpose: Telegram bot and monetization patterns.

Audit for:

- Telegram flow
- bot structure
- payments if present
- notification patterns
- error handling

## 3. Public Repositories To Audit

Categories:

### Next.js official examples

Audit for:

- App Router patterns
- server actions
- route handlers
- metadata
- image optimization
- deployment defaults

### Supabase official examples

Audit for:

- auth patterns
- server-side clients
- RLS patterns
- form submission
- environment separation

### shadcn/ui examples

Audit for:

- component organization
- design token patterns
- accessibility
- form components
- dark mode patterns

### Vercel AI SDK examples

Audit for:

- streaming
- tool calling
- structured output
- AI route handlers
- observability requirements

### High-quality SaaS starters

Audit for:

- folder structure
- monorepo patterns
- payments
- auth
- dashboards
- email
- onboarding
- testing

Use carefully. SaaS starters often contain too much product weight for a website factory.

## 4. What To Extract

For each audited repo, extract:

- folder structure
- dependency choices
- form handling
- validation pattern
- analytics pattern
- environment pattern
- deployment pattern
- UI structure
- accessibility practices
- error handling
- testing approach
- what not to copy

## 5. What Not To Copy

Do not copy:

- bloated SaaS dashboards
- irrelevant auth systems
- payment flows before they are needed
- generic landing-page visuals
- random shadcn blocks without strategy
- outdated App Router patterns
- unmaintained repositories
- dependencies without clear production value

## 6. Benchmark Scorecard

Score each repository from 0 to 10.

| Block | Score | Notes |
| --- | ---: | --- |
| Architecture clarity |  |  |
| Current stack relevance |  |  |
| Maintainability |  |  |
| Form and validation quality |  |  |
| Analytics readiness |  |  |
| Accessibility |  |  |
| Performance orientation |  |  |
| Security posture |  |  |
| Visual quality |  |  |
| Reuse value |  |  |

Total score: /100

Decision:

- Use as reference
- Extract patterns only
- Ignore
- Avoid

## 7. First Audit Tasks

1. Audit `SileNtGuardNetwork/delaemdigitalmain`.
2. Audit official Next.js examples.
3. Audit official Supabase Next.js examples.
4. Audit shadcn/ui component structure.
5. Audit Vercel AI SDK examples.
6. Review 3 to 5 public starters, but do not adopt any blindly.
7. Produce `docs/18-technical-architecture-decision.md`.

## 8. Gate Before Next.js Template

The factory cannot start its first Next.js template until this is clear:

- folder structure decision
- app router conventions
- component strategy
- form validation strategy
- Supabase usage strategy
- analytics strategy
- environment variable strategy
- deployment strategy
- QA command strategy
- what will not be included in v1

## 9. Current Working Assumption

The first production template should be leaner than a SaaS starter and stronger than a landing-page template.

Target:

```text
Premium website system + lead flow + analytics + legal + QA gate
```

Not target:

```text
Full SaaS dashboard + auth + billing + complex admin panel
```
