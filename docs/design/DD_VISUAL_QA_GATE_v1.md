# DD Visual QA Gate v1

Status: adopted visual quality gate.
Last updated: 2026-06-06.

## Purpose

Visual QA Gate prevents Delaem Digital from shipping visually weak or generic websites.

A page can be technically correct and still fail if it looks cheap, unclear or templated.

## Minimum production score

```text
85 / 100
```

Below 85: not production-ready.

## Score model

| Block | Weight |
|---|---:|
| First screen clarity | 15 |
| Typography | 15 |
| Grid / spacing | 15 |
| Color / contrast | 10 |
| Premium feel | 10 |
| CTA / conversion | 10 |
| Mobile quality | 10 |
| Motion quality | 5 |
| Performance / cleanliness | 5 |
| Originality / brand fit | 5 |

## 1. First screen clarity — 15

Checks:

- offer is understood in 5 seconds;
- who speaks is clear;
- who it is for is clear;
- primary CTA is visible;
- visual does not compete with headline;
- no generic vague headline.

Fail examples:

- “Innovative solutions for business”;
- CTA only below fold;
- visual dominates copy;
- page looks like anonymous SaaS.

## 2. Typography — 15

Checks:

- H1 has strong hierarchy;
- line-height and letter-spacing are controlled;
- body text readable;
- no tiny critical copy;
- no more than 3 text colors on screen;
- no long centered paragraphs.

## 3. Grid / spacing — 15

Checks:

- content sits in clear layout;
- section spacing feels premium;
- cards align;
- no cramped blocks;
- no accidental empty holes;
- mobile spacing is not collapsed.

## 4. Color / contrast — 10

Checks:

- color tokens followed;
- contrast is readable;
- one accent = one meaning;
- no neon/rainbow gradients;
- no low-contrast secondary text for important messages.

## 5. Premium feel — 10

Checks:

- restrained, mature, expensive;
- no cheap template feeling;
- no random decorative elements;
- trust is built through structure, not noise.

## 6. CTA / conversion — 10

Checks:

- primary CTA is clear;
- secondary CTA is not competing too hard;
- CTA copy is action-specific;
- buttons do not look like generic pills unless allowed;
- next step is obvious.

## 7. Mobile quality — 10

Checks:

- 360-430px works;
- no horizontal overflow;
- CTA visible early;
- text first;
- decorative visual does not break reading;
- cookie/sticky elements do not cover CTA.

## 8. Motion quality — 5

Checks:

- motion supports hierarchy;
- no SSR issues;
- reduced-motion fallback exists;
- no scroll hijacking;
- no pointless floating objects.

## 9. Performance / cleanliness — 5

Checks:

- no excessive heavy images;
- no animation jank;
- no huge unused libraries;
- build/typecheck pass;
- no console errors in target flow.

## 10. Originality / brand fit — 5

Checks:

- fits project brand;
- not direct copy of reference;
- not generic SaaS/AI visual;
- sector-specific signals are present.

## Automatic fail

Visual gate fails immediately if:

- offer is unclear in first 5 seconds;
- mobile hero is broken;
- primary CTA is hidden or vague;
- text is an AI/raster image;
- design uses forbidden visual patterns;
- motion blocks content or forms;
- page looks like a generic template;
- form/lead state is visually unclear;
- visual claims are fake or unsupported.

## Required evidence

For each gate pass, collect:

- desktop screenshot 1440px;
- mobile screenshot 390/430px;
- build result;
- typecheck result;
- Lighthouse or performance note;
- motion check note if animated;
- visual QA score table;
- blocker list.

## Report format

```text
Visual QA Gate
Project:
Page/flow:
Score: /100
Status: PASS / CONDITIONAL PASS / FAIL
Desktop evidence:
Mobile evidence:
Critical blockers:
Medium issues:
Recommended corrective pass:
```

## Status rules

PASS:

- score 85+;
- no critical blockers;
- desktop and mobile acceptable.

CONDITIONAL PASS:

- score 80-84;
- no critical blockers;
- allowed only for internal preview, not flagship launch.

FAIL:

- score below 80;
- or any automatic fail condition.
