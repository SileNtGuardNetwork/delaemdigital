# SileNt Emergency Transport Lab Gate v1

Status: lab-only gate.
Last updated: 2026-06-05.

## Purpose

This gate defines how Delaem Digital/SileNt may research emergency network transports without risking production users, production domains, payment flows or the SileNt brand.

Reference technology:

```text
masterking32/MasterDnsVPN
```

Decision status:

```text
LAB ONLY
```

## Core rule

Emergency transport research must stay outside production.

No lab transport may be connected to:

- production SileNt bot;
- production subscription gateway;
- production payment flow;
- production users;
- production domains;
- public tariffs;
- owner/admin production menus.

## Allowed use

Allowed only for isolated research:

- separate VPS;
- separate test domain;
- separate DNS zone/delegation;
- test users only;
- no public marketing;
- no SileNt branding;
- no payment activation;
- no production support promises.

## Forbidden use

Do not:

- add DNS tunnel profiles to production SileNt gateway;
- sell it as a plan feature;
- route real users through it;
- use primary domains;
- put it into ordinary-user flow;
- publish setup as official SileNt instruction;
- mix lab logs with production logs;
- store test secrets in production env.

## Test checklist

```text
MASTERDNSVPN-SPIKE-01
```

Check:

1. Isolated VPS deploy.
2. Separate domain and DNS delegation.
3. Port 53 TCP/UDP binding.
4. Client connection.
5. SOCKS behavior if applicable.
6. Throughput baseline.
7. Latency baseline.
8. Stability for 30/60/120 minutes.
9. Packet loss behavior.
10. Resolver behavior.
11. Resource usage.
12. Logs and secret handling.
13. Setup complexity for non-technical user.
14. Delete/rollback path.
15. Legal/reputation risk review.

## PASS criteria

A lab candidate can only advance to a deeper research stage if:

- stable under test;
- isolated from production;
- no primary domain risk;
- no real-user exposure;
- setup and rollback are documented;
- support burden is understood;
- product/legal risk is acceptable.

## FAIL criteria

Immediate fail if:

- requires production domain;
- creates abnormal risk for SileNt brand;
- setup is too complex for users;
- unstable under short tests;
- high DNS noise/reputation risk;
- cannot be cleanly removed;
- encourages unsafe public claims.

## Reporting format

Every lab result must include:

- test date;
- VPS provider;
- test domain;
- server resources;
- client platform;
- config summary without secrets;
- latency/throughput;
- stability notes;
- observed failures;
- legal/product risk;
- decision: STOP / CONTINUE LAB / CANDIDATE FOR DEEPER RESEARCH.

## Production rule

This gate does not approve production adoption.

A separate production architecture decision, user-gate, client-compatibility gate, support model, and legal review would be required before any production discussion.
