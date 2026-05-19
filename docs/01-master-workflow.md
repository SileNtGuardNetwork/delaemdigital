# Master Workflow - Website Production Pipeline

Status: v1 foundation

## Purpose

This document defines the production workflow for building one premium ClientFlow website from first client input to launch and case packaging.

## Pipeline Overview

```text
01 Intake
02 Discovery Gate
03 Offer Architecture
04 Site Blueprint
05 Copy-doc
06 Reference Pack
07 Hero Factory
08 Section Factory
09 Production Build
10 Technical Conversion Layer
11 QA Gate
12 Launch
13 Handoff
14 Case Factory
```

## 01 Intake

Goal: understand whether the project fits the factory.

Collect:

- niche
- product or service
- geography
- average check
- current website
- current traffic sources
- current CRM or Telegram process
- main business problem
- desired result
- budget level
- deadline
- legal or industry constraints

Output:

- fit or not fit
- recommended product
- missing information
- next best action

## 02 Discovery Gate

Goal: understand the business before designing anything.

Output:

- client discovery brief
- audience map
- pain map
- current client route
- loss map
- existing assets
- constraints
- gate score

Rule: do not move to design without discovery.

## 03 Offer Architecture

Goal: define what the website must sell and why the user should care.

Output:

- main offer
- short offer
- CTA logic
- audience segments
- objections
- trust blocks
- risky claims
- positioning notes

Acceptance: the offer is clear in 5 seconds.

## 04 Site Blueprint

Goal: design the site as a client route, not as a collection of sections.

Output:

- site goal
- primary conversion path
- page structure
- homepage structure
- section goals
- CTA per section
- required forms
- integrations
- analytics events
- mobile behavior
- acceptance criteria

## 05 Copy-doc

Goal: produce text ready for design and implementation.

Output:

- hero copy
- section copy
- CTA labels
- FAQ
- form copy
- legal microcopy
- Telegram intro
- follow-up text if needed

Rules:

- one section equals one main idea
- no cheap promises
- no abstract agency language
- no pressure tactics
- every CTA must be a real next step

## 06 Reference Pack

Goal: define visual direction without copying references.

Output:

- 3 to 5 references
- what to use
- what to avoid
- composition notes
- typography notes
- mood notes
- interaction notes
- niche signals

## 07 Hero Factory

Goal: build the first screen that explains and sells the system.

Hero must explain:

1. who is speaking
2. who it is for
3. what is being built
4. why it is different
5. what to do next

Output:

- 3 hero concepts
- winner direction
- desktop logic
- mobile logic
- CTA hierarchy
- visual restrictions

Forbidden:

- fake dashboards
- random floating cards
- cyberpunk or neon overload
- raster text in images
- portrait that competes with the offer
- generic SaaS hero

## 08 Section Factory

Goal: build sections 2 to 13 from reusable patterns without making them feel generic.

Each section must define:

- goal
- user emotion
- copy
- layout pattern
- visual direction
- CTA
- motion
- mobile behavior
- acceptance criteria
- reject criteria

## 09 Production Build

Default stack:

- Next.js App Router
- TypeScript strict
- Tailwind CSS
- shadcn/ui
- Supabase when data is needed
- Telegram Bot API for owner notifications
- PostHog
- Yandex Metrika for RU traffic
- Better Stack
- Vercel for own products
- Timeweb Cloud when Russian personal data requirements apply

Rules:

- do not touch secrets without explicit approval
- do not run production deploy without explicit approval
- preview only until approval
- use real HTML text
- no image text
- no fake dashboards
- no unused heavy dependencies

Required checks when app exists:

```bash
npm run build
npx tsc --noEmit
```

## 10 Technical Conversion Layer

Minimum requirements:

- validated forms
- consent checkbox not pre-checked
- lead storage when applicable
- owner notification
- UTM capture
- source tracking
- analytics events
- success state
- failure state
- spam protection
- privacy links
- cookie banner when analytics or cookies are used

## 11 QA Gate

Gate blocks:

1. Strategy readiness
2. Offer clarity
3. UX and design quality
4. Development readiness
5. Forms and lead flow
6. Analytics and events
7. Monitoring and errors
8. AI and automation safety if applicable
9. Payments and access if applicable
10. Legal, handoff, and evidence

Critical blockers:

- form does not work
- lead does not reach the owner
- consent is missing
- mobile QA is missing
- analytics are missing
- monitoring is missing for production
- risky result guarantees
- project cannot be handed off

Gate status:

- PASS: 90 to 100
- CONDITIONAL PASS: 75 to 89
- FAIL: below 75 or any critical blocker

## 12 Launch

Launch checklist:

- build passed
- typecheck passed
- preview approved
- mobile approved
- forms tested
- owner notification tested
- analytics tested
- legal links present
- cookie and consent logic present
- monitoring enabled
- domain connected only after approval
- smoke test completed

## 13 Handoff

Client handoff includes only what is in scope:

- published website
- access instructions
- short admin guide
- analytics explanation
- form and lead flow explanation
- support rules
- warranty rules
- integration list
- next improvement plan

Internal assets are not transferred by default:

- prompts
- internal templates
- ClientFlow methodology
- production checklists
- reusable components
- internal AI scenarios
- factory process documents

## 14 Case Factory

Every project must become an asset.

Collect:

- initial situation
- business goal
- screenshots before
- screenshots after
- site structure
- technical stack
- form proof
- notification proof
- analytics events
- launch smoke test
- client feedback
- 7-day report
- 30-day report
- final case draft
