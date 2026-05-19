# Section Factory

Status: v1 foundation
Purpose: define the standard for reusable, conversion-oriented website sections.

## 1. Core Principle

A section exists only if it improves understanding, trust, conversion, navigation, or decision-making.

Every section must move the user through the ClientFlow route:

```text
Attention -> Understanding -> Trust -> Action -> Lead -> Processing -> Improvement
```

Reusable does not mean generic. The pattern can repeat, but the message, visual rhythm, and business logic must fit the project.

## 2. Section Card Format

Every reusable section must define:

- section name
- commercial job
- when to use
- structure
- copy elements
- visual pattern
- CTA logic
- analytics events
- UX rules
- mobile rules
- red flags
- acceptance criteria

## 3. Core Website Sections

### 3.1 Hero - Direct Outcome

Goal: explain who the site is for, what result is created, and what the next step is.

Required:

- kicker
- H1
- subheadline
- primary CTA
- secondary CTA
- trust marker
- visual anchor

Events:

- hero_viewed
- hero_primary_cta_clicked
- hero_secondary_cta_clicked

Red flags:

- vague headline
- too many CTAs
- visual stronger than offer
- CTA below fold

### 3.2 Problem - Cost of Chaos

Goal: show the cost of disconnected digital tools.

Structure:

- headline about the problem
- 3 to 5 symptoms
- consequence
- transition to system

CTA:

- Find the weak point
- Check the client route

Events:

- problem_block_viewed
- problem_cta_clicked

Red flags:

- fear pressure
- too much negativity
- unsupported claims

### 3.3 System - ClientFlow Map

Goal: show the method as a connected process, not as a set of services.

Structure:

- route stages
- short explanation per stage
- visual connection between stages
- CTA to diagnostic or project discussion

Events:

- clientflow_map_viewed
- clientflow_step_clicked
- clientflow_cta_clicked

Acceptance:

- user understands that the product is a system
- stages are readable
- mobile flow is clear

### 3.4 Offer Cards

Goal: show what can be bought.

Card structure:

- name
- who it is for
- what is included
- result
- entry price or estimate logic
- CTA

Events:

- offer_card_viewed
- offer_card_clicked
- offer_cta_clicked

Red flags:

- cheap tariff-table feel
- no difference between products
- too much small text

### 3.5 Before and After

Goal: make the difference between current state and desired system tangible.

Structure:

- current state
- controlled state
- key differences
- CTA

Visual pattern:

- split comparison
- fragmented versus connected route
- diagnostic contrast

### 3.6 Process

Goal: reduce anxiety and show production order.

Structure:

- 5 to 9 stages
- what happens
- what client provides
- output of each stage
- gate or approval point

Events:

- process_viewed
- process_step_opened
- process_cta_clicked

### 3.7 Proof or Case Preview

Goal: prove the method through artifacts, not just claims.

Structure:

- context
- problem
- what was built
- proof artifact
- result or status
- CTA to case

Red flags:

- case without evidence
- fake numbers
- screenshots without context

### 3.8 Founder or Authority Block

Goal: show who is responsible for the system and why they can be trusted.

Structure:

- founder role
- approach
- relevant experience
- principles
- proof markers
- CTA

Red flags:

- ego block without relation to offer
- too much biography
- weak link to product

### 3.9 Audit or Diagnostic CTA

Goal: give a lower-friction entry route.

Structure:

- problem framing
- what the user receives
- time required
- result preview
- CTA

Events:

- diagnostic_cta_viewed
- diagnostic_started

### 3.10 FAQ

Goal: close objections.

Required:

- difference from normal website
- existing website question
- timeline
- client input required
- lead guarantee answer
- after launch question
- data and analytics question
- support question

Events:

- faq_viewed
- faq_item_opened

### 3.11 Final CTA

Goal: convert remaining intent into a clear next step.

Structure:

- final headline
- short explanation
- two routes if needed
- form or CTA
- legal microcopy

Events:

- final_cta_viewed
- final_cta_clicked
- lead_form_started

## 4. Visual Rhythm Rules

Do not repeat the same card grid across the whole page.

Recommended rhythm:

1. Hero: strong split or system visual
2. Problem: diagnostic route
3. System: route map
4. Offer: structured cards
5. Before/After: split comparison
6. Process: timeline
7. Proof: case frames
8. Founder: editorial block
9. Diagnostic: control panel or checklist
10. FAQ: accordion
11. Final CTA: focused conversion panel

## 5. Mobile Rules

- reduce columns to single route
- avoid dense cards
- keep CTA visible
- preserve hierarchy
- avoid horizontal diagrams that overflow
- accordions are acceptable for complex modules
- text must stay readable

## 6. Analytics Rules

Every key section must define at least:

- section_viewed
- primary CTA click
- secondary CTA click if present

Interactive sections must also track:

- item opened
- step clicked
- card clicked
- form started
- form submitted

## 7. Acceptance Criteria

A section is accepted if:

- its commercial job is clear
- copy supports the job
- visual pattern supports the job
- CTA is logical
- mobile version is readable
- analytics event is defined
- it does not duplicate another section

## 8. Reject Criteria

Reject if:

- section exists only for beauty
- section repeats previous idea
- section has no CTA or transition
- section has generic filler text
- section adds visual noise
- section hurts mobile readability
- section uses fake dashboards or fake proof
