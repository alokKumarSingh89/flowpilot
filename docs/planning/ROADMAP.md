# FlowPilot Engineering Roadmap

## Purpose

This roadmap converts the approved PRD and architecture into a delivery sequence for a small team using AI coding agents. It does not add product scope. Requirement status and task-level traceability are maintained in [TRACEABILITY.md](TRACEABILITY.md) and [TASK_BREAKDOWN.md](TASK_BREAKDOWN.md).

## Delivery principles

- Deliver tenant isolation, server-side authorization, auditability, and observability before exposing workspace data or public chat. [WS-008; RBAC-002–003; SEC-001–002, SEC-009; OBS-001–006]
- Keep the MVP to at most one active support agent per workspace; preserve configuration history without implementing routing or orchestration. [AGENT-001–009]
- Use bounded AI execution and the configured MVP `request_handoff` tool only. External/action tools are not MVP. [RUNTIME-004–010; SEC-005–008]
- Complete vertical, verifiable slices. A UI is not complete until its API, authorization, tests, audit/telemetry where required, and failure behavior are complete.

## Foundation — Sprint 00

Establish the approved modular-monolith delivery baseline: repository boundaries, environment configuration and secrets handling, CI quality gates, correlation/error telemetry, tenant-context persistence/RLS, and durable job primitives. This foundation precedes any customer-facing feature. [WS-008; SEC-001–004; JOB-001–004; OBS-001–006]

## MVP — Sprints 01–05

| Sprint | Goal | Primary outcome | Prerequisites |
|---|---|---|---|
| 01 | Identity, workspace, and access | Authenticated users can create/switch workspaces and authorized staff access only permitted data | 00 |
| 02 | Knowledge ingestion | Administrators can create/upload supported knowledge and receive searchable, tenant-isolated content | 00, 01 |
| 03 | Agent and bounded AI runtime | Administrators configure one active support agent; it retrieves approved knowledge, produces cited responses, and safely hands off | 01, 02 |
| 04 | Customer chat and human handoff | Customers converse through public chat; staff can take ownership, reply, and resolve | 01, 03 |
| 05 | Analytics and release readiness | Basic workspace analytics, complete audit/operations views, resilience/security verification, and release readiness | 00–04 |

### MVP exit criteria

The MVP is ready for release only when the PRD success flow works end-to-end: registration, workspace/member setup, knowledge ingestion, agent configuration, deployed chat, knowledge-grounded response with sources, human escalation/takeover/resolution, basic analytics, and audit of important actions. [PRD §16; AUTH-001–008; WS-001–008; KB-001–011; AGENT-001–009; CHAT-001–007; HANDOFF-001–007; ANALYTICS-001–005]

## Post-MVP

Post-MVP work requires product prioritization and an approved task/ADR update. Candidate work already contemplated by the PRD or architecture:

- Evaluated read-only business integrations and protected credential lifecycle. [SEC-004]
- Richer retrieval quality controls and broader evaluation suites. [RUNTIME-003; SEC-007]
- More detailed analytics and operational controls. [ANALYTICS-001–005; OBS-001–006]
- Load, restore, and resilience automation beyond MVP release gates. [JOB-001–004; OBS-004–005]

## Future / scale

The following are explicitly outside MVP and must not be started from this plan without approved product scope: multiple agents and orchestration, sales/billing agents, voice, WhatsApp/email, Shopify/Stripe/CRM integrations, advanced workflows, marketplace, enterprise SSO, and white-labeling. [PRD §5.2, §15]

Scale work is triggered by measured need: tenant-tier isolation, dedicated vector/analytics stores, read replicas, dedicated workers, regional deployment, or extraction of modules into services. [WS-008; KB-007–008; ANALYTICS-005; Non-Functional Requirements]

## Critical dependency chain

```text
Sprint 00 foundation
  → Sprint 01 identity + tenancy + RBAC
    → Sprint 02 knowledge lifecycle + durable ingestion
      → Sprint 03 agent configuration + retrieval runtime
        → Sprint 04 public chat + handoff
          → Sprint 05 analytics + release hardening
```

Within a sprint, frontend work may proceed against reviewed API contracts/mocks while backend implementation proceeds. No public endpoint, worker, retrieval query, or tool execution may bypass the tenant/authorization baseline.

## Principal risks and release gates

| Risk | Gate before dependent delivery |
|---|---|
| Cross-tenant access | Automated denial tests for API, database/RLS, job, cache, file, retrieval, and tool paths [WS-008; RBAC-003; SEC-001] |
| Unsafe AI/tool behavior | Bounded execution, prompt-injection tests, typed/authorized tool calls, controlled handoff [RUNTIME-004–010; SEC-005–008] |
| Ingestion failure/data exposure | Private storage, scan/validation, idempotent jobs, visible failure state [KB-002, KB-005–006; JOB-001–004] |
| Weak support takeover | E2E customer-requested and AI-requested handoff, ownership, reply, resolution [HANDOFF-001–007] |
| Unobservable operations | Correlation and trace propagation across API, worker, AI, and tool paths [OBS-001–006] |

## Planning assumptions requiring confirmation

- “One AI support agent” is implemented as at most one active/deployed support agent per workspace; draft/inactive records retain history.
- The MVP grantable tool registry includes `request_handoff`; retrieval is runtime-internal.
- The detailed customer deployment model, customer authentication, retention/deletion, residency, exact escalation conditions, provider selection, and numeric SLO/evaluation thresholds remain product/engineering decisions before production.

These assumptions are documented in the approved architecture and do not create new PRD requirements.
