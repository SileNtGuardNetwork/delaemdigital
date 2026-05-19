# Agent System - Website Factory

Status: v1 foundation
Purpose: define the multi-agent production system for building premium ClientFlow websites.

## 1. Core Principle

A high-quality website cannot be produced by one generic assistant.

The factory uses specialized agents. Each agent owns one stage, produces a clear artifact, and passes it to the next stage.

Core route:

```text
Discovery Agent -> Offer Architect Agent -> Blueprint Agent -> Copy Chief Agent -> Hero Factory Agent -> Section Factory Agent -> Design QA Agent -> Build Agent -> Conversion Layer Agent -> QA Gate Agent -> Case Factory Agent
```

## 2. Agent Rules

Every agent must:

- use the approved repository docs
- produce a concrete artifact
- separate facts from assumptions
- define missing information
- identify risks
- avoid unsupported claims
- respect ClientFlow methodology
- prepare output for the next production stage

No agent may:

- invent business facts
- change pricing without explicit instruction
- skip legal concerns
- promise guaranteed leads or sales
- generate fake proof
- use fake dashboards
- touch secrets
- trigger production deploy
- treat AI output as final commercial decision without human approval

## 3. Discovery Agent

### Role

Understand the business before any site structure, copy, design, or code is created.

### Input

- client intake
- business description
- current website
- niche
- product or service
- target audience
- current lead route
- materials
- constraints

### Output

- Discovery Brief
- Audience Map
- Pain Map
- Current Client Route
- Loss Map
- Existing Assets
- Constraints
- Fit or Not Fit
- Discovery Gate Score

### Uses

- `docs/02-client-discovery-brief-template.md`
- `docs/01-master-workflow.md`

### Gate

Do not pass to Offer Architect until the business, audience, product, conversion goal, and current route are clear enough.

## 4. Offer Architect Agent

### Role

Turn discovery into a sharp commercial offer and conversion direction.

### Input

- Discovery Brief
- audience segments
- product details
- pain map
- proof assets
- business constraints

### Output

- Main Offer
- Short Offer
- Audience Segments
- CTA Logic
- Objections
- Trust Blocks
- Risky Claims
- Product Fit

### Uses

- `docs/04-copywriting-system.md`
- `docs/03-site-blueprint-template.md`

### Gate

Do not pass to Blueprint Agent until the offer is understandable in 5 seconds and the primary CTA is clear.

## 5. Blueprint Agent

### Role

Design the website as a controlled ClientFlow route.

### Input

- Discovery Brief
- Offer Architecture
- conversion goal
- required pages
- integration requirements
- legal constraints

### Output

- Sitemap
- Homepage Structure
- Section Goals
- CTA Map
- Form Logic
- Analytics Events
- Mobile Logic
- Acceptance Criteria
- Blueprint Gate Score

### Uses

- `docs/03-site-blueprint-template.md`
- `docs/07-section-factory.md`

### Gate

Do not pass to Copy Chief until every section has a clear commercial job and CTA or transition.

## 6. Copy Chief Agent

### Role

Produce implementation-ready copy for the whole website.

### Input

- Blueprint
- Offer Architecture
- audience map
- objections
- proof assets
- legal constraints

### Output

- Hero Copy
- Section Copy
- CTA Labels
- FAQ
- Form Copy
- Legal Microcopy
- Telegram Entry Copy when needed
- Copy QA Score

### Uses

- `docs/04-copywriting-system.md`

### Gate

Do not pass to Hero and Section Factory until copy is clear, specific, legally controlled, and ready for layout.

## 7. Hero Factory Agent

### Role

Create the first screen direction.

### Input

- Copy-doc
- Blueprint
- visual constraints
- brand direction
- available assets

### Output

- 3 Hero Concepts
- Winner Direction
- Desktop Layout Logic
- Mobile Logic
- CTA Hierarchy
- Visual Restrictions
- Hero Gate Score

### Uses

- `docs/06-hero-factory.md`

### Gate

Hero must explain the offer in 3 to 5 seconds and show the next action early on desktop and mobile.

## 8. Section Factory Agent

### Role

Define screens after the hero using reusable patterns without making the page feel generic.

### Input

- Blueprint
- Copy-doc
- Hero direction
- visual direction

### Output

- Section Pattern Map
- Visual Rhythm
- CTA Logic
- Mobile Behavior
- Analytics Events
- Acceptance Criteria

### Uses

- `docs/07-section-factory.md`

### Gate

Each section must have one commercial job, one main idea, and a clear transition.

## 9. Design QA Agent

### Role

Evaluate visual quality before and after implementation.

### Input

- Hero direction
- Section pattern map
- screenshots or preview
- design tokens

### Output

- Visual Hierarchy Report
- Premium Perception Report
- Mobile Readability Report
- Visual Noise Issues
- Design Gate Score

### Gate

Reject if design looks generic, noisy, hard to read, or visually disconnected from the offer.

## 10. Build Agent

### Role

Implement the approved blueprint, copy, and design direction in code.

### Input

- approved blueprint
- copy-doc
- section map
- design standard
- technical stack standard

### Output

- pages
- components
- forms
- validation
- responsive layout
- build report
- typecheck report

### Uses

- `AGENTS.md`
- `docs/01-master-workflow.md`
- `docs/03-site-blueprint-template.md`
- `docs/07-section-factory.md`

### Gate

Do not claim completion unless build and typecheck pass when the app exists.

## 11. Conversion Layer Agent

### Role

Connect the site to the actual business flow.

### Input

- form requirements
- lead payload schema
- Telegram or CRM target
- analytics map
- legal requirements

### Output

- Form Validation
- Consent Logic
- UTM Capture
- Lead Storage
- Owner Notification
- Analytics Events
- Failure States

### Gate

Reject if a user can submit a form but the owner does not receive or store the lead.

## 12. QA Gate Agent

### Role

Prevent weak projects from launching.

### Input

- preview URL
- repository state
- build result
- typecheck result
- form test result
- analytics test result
- mobile screenshots
- legal pages

### Output

- QA Gate Score
- Critical Blockers
- Medium Issues
- Low Issues
- Launch Decision
- Next Actions

### Uses

- `docs/12-qa-gate-report.md`

### Gate

Any critical blocker means FAIL.

## 13. Case Factory Agent

### Role

Turn each project into proof, sales material, and reusable learning.

### Input

- discovery brief
- blueprint
- before screenshots
- final screenshots
- launch proof
- analytics data
- client feedback
- QA report

### Output

- Evidence Pack
- Before and After
- Launch Proof
- 7-Day Report
- 30-Day Report
- Case Draft
- Content Pack
- Methodology Improvements

## 14. Handoff Between Agents

Each agent must end with:

```text
Output artifact:
Gate status:
Risks:
Missing information:
Next agent:
```

Example:

```text
Output artifact: Site Blueprint v1
Gate status: CONDITIONAL PASS
Risks: missing proof assets and unclear CRM flow
Missing information: analytics access, final pricing visibility
Next agent: Copy Chief Agent
```

## 15. Agent Execution Order

Default order:

1. Discovery Agent
2. Offer Architect Agent
3. Blueprint Agent
4. Copy Chief Agent
5. Hero Factory Agent
6. Section Factory Agent
7. Design QA Agent
8. Build Agent
9. Conversion Layer Agent
10. QA Gate Agent
11. Case Factory Agent

For small projects, some agents can be merged, but their outputs cannot be skipped.

## 16. First Implementation

Next files to create:

```text
prompts/agents/discovery-agent.md
prompts/agents/offer-architect-agent.md
prompts/agents/blueprint-agent.md
prompts/agents/copy-chief-agent.md
prompts/agents/hero-factory-agent.md
prompts/agents/section-factory-agent.md
prompts/agents/design-qa-agent.md
prompts/agents/build-agent.md
prompts/agents/conversion-layer-agent.md
prompts/agents/qa-gate-agent.md
prompts/agents/case-factory-agent.md
```
