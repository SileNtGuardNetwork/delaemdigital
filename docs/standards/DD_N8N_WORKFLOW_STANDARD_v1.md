# DD n8n Workflow Standard v1

Status: adopted standard for Delaem Digital automation layer.
Last updated: 2026-06-05.

## Purpose

n8n is approved as the Delaem Digital automation layer for ClientFlow operations, lead routing, owner notifications, reporting, CRM/support workflows, and selected SileNt operational automations.

n8n is not the source of truth for payments, access rights, VPN keys, or critical product state.

## Approved role

```text
DD Automation Layer
```

## Core ClientFlow pattern

```text
Website / Quiz / Telegram / Form
-> n8n webhook
-> validation
-> idempotency check
-> Supabase / CRM write
-> Telegram owner card
-> analytics event
-> error handling
-> evidence log
```

## Mandatory workflow metadata

Every production workflow must have:

- workflow name;
- owner;
- purpose;
- trigger type;
- inputs;
- outputs;
- credentials used;
- write actions;
- retry behavior;
- failure destination;
- linked documentation;
- exported JSON location.

Recommended naming:

```text
DD | [Product] | [Flow] | v[major]
```

Examples:

```text
DD | Website Lead Form | Owner Telegram Card | v1
DD | ClientFlow Diagnostic | Lead Qualification | v1
DD | Case Factory | Evidence Digest | v1
SileNt | Ops | Daily Health Digest | v1
```

## Security rules

1. Do not place secrets in node parameters that can be exported in plain text.
2. Use n8n credentials storage for secrets.
3. Protect public webhooks with at least one of:
   - HMAC/signature verification;
   - secret token;
   - IP allowlist;
   - Cloudflare rule;
   - Turnstile or equivalent for public forms.
4. Do not expose internal n8n editor publicly without authentication.
5. Do not put raw PII into logs unless required and documented.
6. Do not store payment provider secrets in workflow notes or docs.
7. Do not trigger destructive actions without an approval gate.

## Idempotency rules

Every workflow that writes data must define idempotency.

Examples:

- form submission: hash of form id + phone/email + timestamp bucket;
- payment webhook: provider payment id;
- Telegram action: user id + callback id;
- CRM sync: external contact id or normalized phone/email.

If idempotency cannot be guaranteed, the workflow cannot be marked production-ready.

## Error handling

Every production workflow must have an error branch.

Minimum behavior:

- capture workflow id;
- capture execution id;
- capture failed node name;
- capture sanitized error;
- notify owner/admin via Telegram or monitoring channel;
- write failure event to evidence log or DB where applicable.

## Observability

Required for production workflows:

- visible success path;
- visible failure path;
- execution history retained;
- error alerts;
- optional Better Stack/Sentry/PostHog event when relevant.

## Approval gates

The following actions require explicit human approval or product-level gate:

- sending client-facing messages outside transactional/support context;
- issuing refunds;
- deleting records;
- changing payment/access state;
- changing SileNt user role/access/days;
- deploying production changes;
- sending bulk email/WhatsApp/Telegram campaigns;
- writing to legal/commercial documents.

## Forbidden production use

Do not use n8n as the only source of truth for:

- payment activation;
- VPN key issuance;
- subscription entitlement;
- user role management;
- legal consent history;
- financial accounting.

n8n may orchestrate and notify, but the authoritative state must live in the product backend/database.

## Export and versioning

Production workflows must be exported and stored in Git or Drive after each meaningful change.

Recommended path:

```text
docs/n8n/workflows/[workflow-name]-v1.json
```

Each workflow doc should include:

```text
Status: draft / staging / production / deprecated
Owner:
Last tested:
Production dependencies:
Rollback:
```

## First approved spike

```text
N8N-DD-AUTOMATION-SPIKE-01
```

Target workflow:

```text
Website lead form
-> n8n webhook
-> validation
-> Supabase insert
-> Telegram owner card
-> analytics event
-> error alert
```

PASS criteria:

- lead reliably reaches owner;
- duplicate submits do not create duplicate chaos;
- invalid payload is rejected;
- errors are visible;
- workflow is documented;
- no secrets leak;
- exported workflow JSON is stored.

## Review checklist

Before production:

- [ ] Has clear owner.
- [ ] Has purpose and input/output contract.
- [ ] Has idempotency.
- [ ] Has error branch.
- [ ] Has credential separation.
- [ ] Has no secrets in exported JSON.
- [ ] Has failure notification.
- [ ] Has test evidence.
- [ ] Has rollback plan.
- [ ] Has exported JSON backup.
