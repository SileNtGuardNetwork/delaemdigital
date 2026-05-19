# QA Gate Report Standard

Status: v1 foundation
Purpose: prevent weak websites from reaching launch.

A project is not ready because it looks finished. A project is ready only when the full client route works and can be measured.

## 1. Gate Status

### PASS

Launch allowed.

Conditions:

- score 90 to 100
- no critical blockers
- key flows tested end to end
- monitoring enabled when production is real
- handoff prepared

### CONDITIONAL PASS

Limited launch allowed.

Conditions:

- score 75 to 89
- no critical blockers
- medium issues documented
- fix plan exists

### FAIL

Launch forbidden.

Conditions:

- score below 75
- at least one critical blocker
- key conversion flow does not work
- legal minimum missing where required
- no mobile check

## 2. Critical Blockers

Any of these means FAIL:

1. Main form does not submit.
2. Lead does not reach owner or manager.
3. Form accepts invalid or empty critical data.
4. Consent checkbox is missing where personal data is collected.
5. Consent checkbox is pre-checked.
6. Privacy policy link is missing near form.
7. Mobile version blocks the primary CTA.
8. There is horizontal overflow on mobile.
9. Analytics are absent for a production marketing site.
10. Owner notification is absent or untested.
11. Success and failure states are absent.
12. Risky guarantee of leads, sales, profit, or medical result is used without basis.
13. Secrets are exposed in code or client bundle.
14. AI can perform critical client-facing action without human approval.
15. Project cannot be handed off.

## 3. Score Model

| Block | Weight |
| --- | ---: |
| Strategy readiness | 10 |
| Offer clarity | 10 |
| UX and design quality | 10 |
| Development readiness | 15 |
| Forms and lead flow | 10 |
| Analytics and events | 10 |
| Monitoring and errors | 10 |
| AI and automation safety | 10 |
| Legal readiness | 10 |
| Handoff and evidence | 5 |

If a block is not applicable, redistribute its weight across development readiness, forms, analytics, and monitoring.

## 4. Strategy Readiness

Check:

- business goal is clear
- audience is clear
- product is clear
- primary conversion is clear
- owner of lead processing is clear
- success criteria are clear

Score:

- 0 to 4: unclear
- 5 to 7: partially ready
- 8 to 10: ready

Notes:

- 

## 5. Offer Clarity

Check:

- offer is understandable in 5 seconds
- headline communicates result
- CTA is specific
- trust markers exist
- no empty agency language
- no risky guarantees

Red flags:

- vague headline
- generic CTA
- too many offers at once
- proof is absent
- audience is unclear

Score:

- 

Notes:

- 

## 6. UX and Design Quality

Check:

- visual hierarchy
- premium perception
- readable typography
- clear CTA rhythm
- mobile readability
- no visual noise
- no fake dashboards
- no random decoration
- no raster text

Score:

- 

Notes:

- 

## 7. Development Readiness

Check:

- build passes
- typecheck passes
- routes open
- no console trash in user flow
- images optimized
- no horizontal overflow
- server-side validation where required
- errors handled
- loading states exist
- environment variables are not exposed

Required commands when Next.js app exists:

```bash
npm run build
npx tsc --noEmit
```

Build result:

Typecheck result:

Score:

- 

Notes:

- 

## 8. Forms and Lead Flow

Check:

- form opens
- fields validate
- submit works
- success state works
- failure state works
- lead is stored or transmitted
- owner receives notification
- duplicate behavior is understood
- source and UTM are captured if required
- consent is logged if required

Required events:

- lead_form_viewed
- lead_form_started
- lead_form_submitted
- lead_form_failed
- owner_notification_sent
- owner_notification_failed

Score:

- 

Notes:

- 

## 9. Analytics and Events

Check:

- PostHog or analytics tool connected
- Yandex Metrika connected for RU traffic when required
- CTA clicks tracked
- form events tracked
- key sections tracked
- UTM captured
- funnel can be built
- no unnecessary personal data in analytics

Minimum funnel:

```text
page_viewed -> hero_cta_clicked -> lead_form_started -> lead_form_submitted
```

Score:

- 

Notes:

- 

## 10. Monitoring and Errors

Check:

- uptime check enabled when production is real
- runtime errors visible
- submit endpoint errors visible
- owner notification failures visible
- alerting configured for critical flows
- smoke test after deploy completed

Required alerts for production:

- downtime
- form submit failure
- 5xx spike
- owner notification failure
- response time degradation

Score:

- 

Notes:

- 

## 11. AI and Automation Safety

Applicable if AI, automation, bot, or agent logic exists.

Check:

- prompt versioning exists
- model/provider logged
- fallback exists
- schema validation exists
- critical actions require human approval
- raw sensitive data is not logged unnecessarily
- AI output is not treated as final commercial decision

Score:

- 

Notes:

- 

## 12. Legal Readiness

Check:

- privacy policy exists
- consent text exists
- consent checkbox is not pre-checked
- cookie banner exists if needed
- legal links are in footer
- personal data is minimized
- industry disclaimers exist where needed
- risky claims are removed

Sensitive niches:

- medicine
- finance
- real estate
- education
- legal services
- investment
- construction
- insurance

Score:

- 

Notes:

- 

## 13. Handoff and Evidence

Check:

- client instructions exist
- access list exists
- integration map exists
- support and warranty terms are clear
- screenshots collected
- launch proof collected
- analytics proof collected
- next improvement plan exists

Score:

- 

Notes:

- 

## 14. Final Gate Table

| Block | Weight | Score | Weighted Result | Notes |
| --- | ---: | ---: | ---: | --- |
| Strategy readiness | 10 |  |  |  |
| Offer clarity | 10 |  |  |  |
| UX and design quality | 10 |  |  |  |
| Development readiness | 15 |  |  |  |
| Forms and lead flow | 10 |  |  |  |
| Analytics and events | 10 |  |  |  |
| Monitoring and errors | 10 |  |  |  |
| AI and automation safety | 10 |  |  |  |
| Legal readiness | 10 |  |  |  |
| Handoff and evidence | 5 |  |  |  |

Total score:

Gate status:

Critical blockers:

- 

Medium issues:

- 

Low issues:

- 

Launch decision:

- PASS
- CONDITIONAL PASS
- FAIL

Next actions:

- 
