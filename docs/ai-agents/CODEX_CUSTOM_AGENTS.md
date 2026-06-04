# Codex Custom Agents — DD Agent Pack v1

Status: implementation guide.
Source spec: `docs/ai-agents/DD_AGENT_PACK_v1.md`.

## Purpose

Use these custom agents to make Codex operate through Delaem Digital production roles instead of generic implementation mode.

The goal is not to add ceremony. The goal is to reduce:

- scope creep;
- fantasy approvals;
- unsafe AI/payment/Telegram behavior;
- one-off code instead of reusable factory assets;
- launches without evidence.

## Recommended local installation

Create local Codex agent files in:

```text
~/.codex/agents/
```

Each agent may be represented as TOML:

```toml
name = "DD Reality Gate Checker"
description = "Final evidence-based production gate for Delaem Digital projects."
developer_instructions = "Use the dd-reality-gate-checker role from docs/ai-agents/DD_AGENT_PACK_v1.md. Default to NEEDS WORK unless evidence proves readiness. Return PASS / CONDITIONAL PASS / FAIL with blockers and next actions."
```

## Minimal recommended Codex agents

Do not install everything first. Start with these 8:

1. DD Senior Digital Architect
2. DD Website Factory Architect
3. DD Frontend Product UI Engineer
4. DD Backend AI Integrations Engineer
5. DD Telegram Bot Architect
6. DD Minimal Change Engineer
7. DD Evidence Collector
8. DD Reality Gate Checker

## Example prompts

### Architecture

```text
Use the DD Senior Digital Architect agent.
Convert this project context into a minimal ClientFlow architecture, stack decision, risks, and next concrete implementation task.
```

### Website blueprint

```text
Use the DD Website Factory Architect agent.
Create a homepage section blueprint with purpose, user question, copy direction, visual direction, CTA, analytics event, and implementation notes per section.
```

### Minimal bugfix

```text
Use the DD Minimal Change Engineer agent.
Fix only the broken form submit state. No broad refactor. Report exact files changed and verification commands.
```

### Final gate

```text
Use the DD Reality Gate Checker agent.
Assess production readiness. Default to NEEDS WORK unless evidence proves readiness. Return PASS / CONDITIONAL PASS / FAIL.
```

### SileNt VPN

```text
Use the SileNt VPN Production Gate Checker agent.
Validate ordinary-user contour first: /start, access issuance, subscription import, iOS compatibility, node profiles, payment/access activation, logs and owner/admin side effects.
```

## Conversion template

Use this pattern to create any agent manually:

```toml
name = "[Agent Name]"
description = "[Short role description]"
developer_instructions = "Use the [agent-slug] role from docs/ai-agents/DD_AGENT_PACK_v1.md. Follow DD production context. Output applied role, goal, findings/plan, blockers, next task, and verification/evidence needed."
```

## Project-scoped Cursor rule

For Cursor, this repo includes:

```text
.cursor/rules/dd-agent-pack-v1.mdc
```

Cursor usage example:

```text
Apply dd-reality-gate-checker to the current diff.
```

## Rule

Do not use agents as decoration. Use them only when their role changes the quality of the output.
