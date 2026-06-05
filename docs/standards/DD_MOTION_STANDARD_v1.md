# DD Motion Standard v1

Status: adopted standard for Delaem Digital Website Factory.
Last updated: 2026-06-05.

## Purpose

This standard defines how motion is used in Delaem Digital premium websites and ClientFlow interfaces.

Approved source:

```text
greensock/gsap-skills
```

GSAP skills are approved for Codex, Cursor, Claude Code and other coding agents when implementing production animation patterns.

## Approved role

```text
Website Factory Motion Layer
```

## Core principle

Motion must support hierarchy, comprehension and trust.

Motion is not decoration.

## Approved use cases

- premium hero reveal;
- section reveal that clarifies story progression;
- trust/case card reveal;
- product ladder transition;
- diagnostic flow transition;
- subtle CTA state transition;
- dashboard/metric reveal where it improves understanding;
- onboarding visual guide.

## Forbidden motion patterns

Do not use:

- neon/cyberpunk motion;
- random floating cards;
- continuous distracting loops;
- aggressive parallax;
- scroll hijacking;
- heavy blur/glow animation;
- fake dashboard animation with no product meaning;
- animation that delays access to the CTA;
- animation on critical form submission that hides loading/error/success state.

## Technical rules for Next.js / React

When using GSAP in React/Next.js:

1. Use `@gsap/react` when available.
2. Prefer `useGSAP()` over raw `useEffect()`.
3. Use refs for targets.
4. Always pass a scope.
5. Never target selectors globally without scope.
6. Never call GSAP during SSR.
7. Cleanup animations on unmount.
8. Use `ScrollTrigger.refresh()` after layout changes when relevant.
9. Respect `prefers-reduced-motion`.
10. Verify mobile behavior.

Recommended packages:

```bash
npm install gsap @gsap/react
```

## Accessibility

All motion must respect reduced-motion preference.

Minimum rule:

```text
If prefers-reduced-motion is enabled, disable non-essential motion and keep content readable.
```

Do not use animation as the only way to communicate state.

## Performance

Prefer animating:

- transform;
- opacity;
- autoAlpha;
- scale;
- x/y.

Avoid animating:

- width/height;
- top/left;
- expensive filters;
- large shadows;
- layout-affecting properties.

## QA gate

Before marking a motion pattern production-ready:

- [ ] Build passes.
- [ ] Typecheck passes.
- [ ] No SSR error.
- [ ] Mobile behavior checked.
- [ ] Reduced-motion checked.
- [ ] No selector leaks.
- [ ] Cleanup is implemented.
- [ ] Motion improves comprehension or hierarchy.
- [ ] Lighthouse/performance impact acceptable.

## Agent usage

When implementing animation, agents must apply:

- `dd-design-quality-director` for visual relevance;
- `dd-frontend-product-ui-engineer` for implementation;
- GSAP skills for technical API correctness.

Prompt example:

```text
Apply dd-frontend-product-ui-engineer and GSAP React skill. Implement a restrained hero reveal using scoped refs, useGSAP, cleanup, reduced-motion fallback, and no SSR execution.
```

## First approved spike

```text
GSAP-SKILLS-SPIKE-01
```

Target:

- one premium hero reveal;
- one section reveal;
- no production dependency until QA passes.

PASS criteria:

- visual improves hierarchy;
- no generic SaaS feel;
- build/typecheck pass;
- mobile pass;
- reduced-motion pass;
- reusable component pattern produced.
