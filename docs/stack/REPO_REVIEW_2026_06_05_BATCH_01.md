# Repo Review Batch — 2026-06-05

Status: archived stack research for Delaem Digital.

Reviewed repositories:

1. `cporter202/API-mega-list`
2. `greensock/gsap-skills`
3. `masterking32/MasterDnsVPN`
4. `mem0ai/mem0`
5. `n8n-io/n8n`

## Final decisions

| Repo | Decision | Why |
|---|---|---|
| `n8n-io/n8n` | `ADOPT` | Strategic automation backbone for ClientFlow, lead routing, Telegram owner cards, reports and operational automations. |
| `greensock/gsap-skills` | `ADOPT` | Official GSAP AI skills for safe, high-quality animation implementation in Next.js/React. |
| `mem0ai/mem0` | `SPIKE` | Strong candidate for AI memory layer, but requires privacy, deletion and isolation gates. |
| `cporter202/API-mega-list` | `RESEARCH SOURCE` | Useful as raw API discovery source only; catalog includes risky/paid/low-trust tools. |
| `masterking32/MasterDnsVPN` | `LAB ONLY` | Interesting DNS tunnel research, but not suitable for DD/SileNt production at this stage. |

## Created stack documents

- `docs/stack/STACK_DECISION_MATRIX_v1.md`
- `docs/standards/DD_N8N_WORKFLOW_STANDARD_v1.md`
- `docs/standards/DD_MOTION_STANDARD_v1.md`
- `docs/standards/DD_MEMORY_LAYER_STANDARD_v1.md`
- `docs/standards/API_SOURCING_GATE_v1.md`
- `docs/labs/SILENT_EMERGENCY_TRANSPORT_LAB_GATE_v1.md`

## Production adoption

### Adopt now

```text
n8n
GSAP skills
```

### Spike

```text
mem0
```

### Research only

```text
API-mega-list
```

### Lab only

```text
MasterDnsVPN
```

## Cost posture

These additions do not create immediate mandatory license spend, but they are not all fully cost-free in operation.

| Tool | License/start cost | Real operating cost |
|---|---|---|
| GSAP skills | 0 | implementation/QA time |
| API-mega-list | 0 | listed APIs/Apify actors may be paid |
| MasterDnsVPN | 0 MIT | VPS/domain/lab time |
| Mem0 | 0 OSS/self-host | LLM/embeddings/storage/VPS or paid cloud |
| n8n | 0 for internal self-host use under license constraints | VPS/DB/backups/monitoring/support or paid cloud/enterprise |

## Next implementation order

1. Build first n8n ClientFlow workflow:

```text
lead form -> n8n webhook -> validation -> Supabase -> Telegram owner card -> analytics -> error alert
```

2. Install GSAP skills into Codex/Cursor and create one restrained premium motion pattern.

3. Run Mem0 spike with synthetic/test data only.

4. Use API-mega-list only through API Sourcing Gate.

5. Keep MasterDnsVPN strictly outside production as lab-only research.
