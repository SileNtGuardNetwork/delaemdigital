# DD Memory Layer Standard v1

Status: spike standard. Not production-approved yet.
Last updated: 2026-06-05.

## Purpose

This standard defines how Delaem Digital may test and later adopt an AI memory layer.

Candidate technology:

```text
mem0ai/mem0
```

Decision status:

```text
SPIKE
```

Mem0 is promising for long-term AI memory, but it must pass privacy, deletion, cross-user isolation, and quality gates before production use.

## Candidate role

```text
AI Memory Layer
```

## Approved initial use cases

For spike only:

- DD AI Engineering OS project memory;
- ClientFlow decision memory;
- AI Lead Qualifier memory with synthetic/test leads;
- Case Factory memory;
- SileNt support and incident memory with sanitized data.

## Forbidden until production approval

Do not store:

- raw payment secrets;
- API keys;
- VPN access keys;
- seed phrases or private keys;
- full raw logs with secrets;
- unnecessary PII;
- sensitive client documents without explicit approval;
- legally protected data without retention/deletion policy.

## Memory categories

Allowed memory categories must be explicit.

Example categories:

```text
project_decision
client_preference
lead_context
support_context
qa_finding
incident_summary
case_evidence
agent_instruction
```

Forbidden generic categories:

```text
misc
unknown
dump
raw_log
all_context
```

## Isolation model

Every memory record must include scoped identifiers.

Minimum fields:

```text
tenant_id
project_id
user_id or lead_id where applicable
agent_id where applicable
category
source
created_at
retention_policy
```

No cross-client retrieval unless explicitly authorized.

## Deletion and correction

Production use requires:

- ability to delete all memories for a user/lead/client;
- ability to delete by project;
- ability to correct wrong memories;
- audit trail for memory creation/deletion;
- documented retention policy.

If deletion cannot be verified, the system cannot go production.

## Quality gate

Memory must improve output quality without increasing hallucination or leaking context.

Test questions must cover:

- current state;
- past decisions;
- future commitments;
- user/client preference;
- conflicting old/new facts;
- deleted memory behavior;
- Russian-language retrieval;
- cross-user leakage attempt.

## Privacy and compliance gate

Before production:

- [ ] PII minimization defined.
- [ ] Consent/notice defined where applicable.
- [ ] Retention policy defined.
- [ ] Deletion path tested.
- [ ] Cross-user isolation tested.
- [ ] Sensitive categories blocked.
- [ ] Admin access restricted.
- [ ] Backups considered.
- [ ] Logs do not expose memory payloads unnecessarily.

## First approved spike

```text
MEM0-SPIKE-01
```

Target:

Test Mem0 as memory layer for DD AI Engineering OS and AI Lead Qualifier using synthetic/test data only.

Checklist:

1. Python SDK test.
2. Node SDK test.
3. Vercel AI SDK integration check.
4. User/session/project isolation.
5. Russian-language memory search quality.
6. Temporal reasoning check.
7. Delete/correction behavior.
8. PII minimization rules.
9. Failure behavior when memory is unavailable.
10. Cost estimate per 100 leads/conversations.

PASS criteria:

- memory improves answers;
- no cross-user leakage;
- deletion works;
- wrong memory can be corrected or suppressed;
- categories are explicit;
- integration path with Next.js/Telegram is clear;
- cost and latency are acceptable.

## Integration rule

Mem0 must not become a hidden source of truth.

Authoritative state remains in:

- product database;
- CRM/Supabase;
- payment provider;
- Git/Notion/Drive source documents;
- SileNt backend for VPN access.

Memory is a context layer, not the truth layer.
