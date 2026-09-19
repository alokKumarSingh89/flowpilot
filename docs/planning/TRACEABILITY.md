# PRD-to-Task Traceability Matrix

## Status legend

- **Planned:** mapped to an MVP task, not yet implemented.
- **Implemented:** no requirements have this status; this repository is still planning-only.
- **Deferred:** not scheduled for the MVP despite being a valid requirement.
- **Future:** belongs to explicitly future/non-goal PRD scope.
- **Needs clarification:** implementation is planned but the documented assumption needs product-owner confirmation before release.

All numbered PRD requirements are accounted for below. The current planning-only state means none are implemented.

## Authentication

| PRD requirement | Status | Sprint | Tasks |
|---|---|---:|---|
| AUTH-001 | Planned | 01 | TASK-AUTH-001 |
| AUTH-002 | Planned | 01 | TASK-AUTH-001 |
| AUTH-003 | Planned | 01 | TASK-AUTH-002 |
| AUTH-004 | Planned | 01 | TASK-AUTH-001 |
| AUTH-005 | Planned | 01 | TASK-AUTH-002 |
| AUTH-006 | Planned | 01 | TASK-AUTH-003 |
| AUTH-007 | Planned | 01 | TASK-AUTH-004 |
| AUTH-008 | Planned | 01 | TASK-AUTH-004 |

## Workspace

| PRD requirement | Status | Sprint | Tasks |
|---|---|---:|---|
| WS-001 | Planned | 01 | TASK-WS-001 |
| WS-002 | Planned | 01 | TASK-WS-001 |
| WS-003 | Planned | 01 | TASK-WS-001 |
| WS-004 | Planned | 01 | TASK-WS-002 |
| WS-005 | Planned | 01 | TASK-WS-002 |
| WS-006 | Planned | 01 | TASK-WS-003 |
| WS-007 | Planned | 01 | TASK-WS-003 |
| WS-008 | Planned | 00–01 | TASK-PLAT-003, TASK-WS-004 |

## RBAC

| PRD requirement | Status | Sprint | Tasks |
|---|---|---:|---|
| RBAC-001 | Planned | 01 | TASK-RBAC-001 |
| RBAC-002 | Planned | 01 | TASK-RBAC-002 |
| RBAC-003 | Planned | 01 | TASK-WS-004, TASK-RBAC-002 |
| RBAC-004 | Planned | 01 | TASK-RBAC-001, TASK-RBAC-003 |
| RBAC-005 | Planned | 01 | TASK-RBAC-001, TASK-RBAC-003 |

## Knowledge base

| PRD requirement | Status | Sprint | Tasks |
|---|---|---:|---|
| KB-001 | Planned | 02 | TASK-KB-001 |
| KB-002 | Planned | 02 | TASK-KB-003 |
| KB-003 | Planned | 02 | TASK-KB-002 |
| KB-004 | Planned | 02 | TASK-KB-004 |
| KB-005 | Planned | 02 | TASK-KB-001, TASK-KB-002, TASK-KB-003, TASK-KB-004 |
| KB-006 | Planned | 02 | TASK-KB-002, TASK-KB-003, TASK-KB-004, TASK-KB-005, TASK-KB-006 |
| KB-007 | Planned | 02 | TASK-KB-005, TASK-KB-007 |
| KB-008 | Planned | 02 | TASK-KB-001, TASK-KB-007 |
| KB-009 | Planned | 02 | TASK-KB-008 |
| KB-010 | Planned | 02 | TASK-KB-006, TASK-KB-008 |
| KB-011 | Planned | 02–03 | TASK-KB-009, TASK-AI-002 |

## AI agent

| PRD requirement | Status | Sprint | Tasks |
|---|---|---:|---|
| AGENT-001 | Needs clarification | 03 | TASK-AGENT-001 |
| AGENT-002 | Needs clarification | 03 | TASK-AGENT-001 |
| AGENT-003 | Needs clarification | 03 | TASK-AGENT-001 |
| AGENT-004 | Planned | 03 | TASK-AGENT-001 |
| AGENT-005 | Planned | 02–03 | TASK-KB-007, TASK-AGENT-002 |
| AGENT-006 | Planned | 03 | TASK-AGENT-002 |
| AGENT-007 | Needs clarification | 03 | TASK-AGENT-003 |
| AGENT-008 | Planned | 03 | TASK-AGENT-003, TASK-AI-003 |
| AGENT-009 | Planned | 01, 03 | TASK-AUDIT-001, TASK-AGENT-004 |

**Clarification:** AGENT-001–003 are planned using the approved architectural interpretation of at most one active/deployed support agent per workspace while preserving draft/inactive records. AGENT-007 is planned using a configurable MVP registry containing `request_handoff`; the product owner must confirm this minimal registry before release.

## Customer conversation

| PRD requirement | Status | Sprint | Tasks |
|---|---|---:|---|
| CHAT-001 | Planned | 04 | TASK-CHAT-001, TASK-CHAT-002 |
| CHAT-002 | Planned | 04 | TASK-CHAT-001, TASK-CHAT-002 |
| CHAT-003 | Planned | 04 | TASK-CHAT-002, TASK-CHAT-003 |
| CHAT-004 | Planned | 04 | TASK-CHAT-002, TASK-CHAT-006 |
| CHAT-005 | Planned | 04 | TASK-CHAT-003, TASK-CHAT-006 |
| CHAT-006 | Planned | 04 | TASK-CHAT-002 |
| CHAT-007 | Planned | 04 | TASK-CHAT-004, TASK-CHAT-005 |

## Human handoff

| PRD requirement | Status | Sprint | Tasks |
|---|---|---:|---|
| HANDOFF-001 | Planned | 04 | TASK-HANDOFF-001 |
| HANDOFF-002 | Planned | 03–04 | TASK-AI-004, TASK-HANDOFF-002 |
| HANDOFF-003 | Needs clarification | 03 | TASK-AI-004 |
| HANDOFF-004 | Planned | 04 | TASK-CHAT-004, TASK-CHAT-006, TASK-HANDOFF-003 |
| HANDOFF-005 | Planned | 04 | TASK-CHAT-005, TASK-HANDOFF-003 |
| HANDOFF-006 | Planned | 04 | TASK-CHAT-005 |
| HANDOFF-007 | Planned | 01, 04 | TASK-AUDIT-001, TASK-HANDOFF-001, TASK-HANDOFF-004 |

**Clarification:** HANDOFF-003 is planned, but the product owner must define the MVP escalation-condition model and defaults; the plan does not assume a workflow/rules builder.

## Analytics

| PRD requirement | Status | Sprint | Tasks |
|---|---|---:|---|
| ANALYTICS-001 | Planned | 05 | TASK-ANALYTICS-001, TASK-ANALYTICS-003 |
| ANALYTICS-002 | Needs clarification | 05 | TASK-ANALYTICS-002 |
| ANALYTICS-003 | Planned | 05 | TASK-ANALYTICS-002 |
| ANALYTICS-004 | Planned | 05 | TASK-ANALYTICS-001, TASK-ANALYTICS-002 |
| ANALYTICS-005 | Planned | 05 | TASK-ANALYTICS-001, TASK-ANALYTICS-003 |

**Clarification:** ANALYTICS-002 requires a product-approved definition of “AI-resolved”; no unsupported metric definition will be silently implemented.

## AI runtime

| PRD requirement | Status | Sprint | Tasks |
|---|---|---:|---|
| RUNTIME-001 | Planned | 03–04 | TASK-AI-001, TASK-CHAT-003 |
| RUNTIME-002 | Planned | 03–04 | TASK-AI-002, TASK-AGENT-005 |
| RUNTIME-003 | Planned | 02–03 | TASK-KB-007, TASK-AI-002 |
| RUNTIME-004 | Needs clarification | 03 | TASK-AGENT-003, TASK-AI-003 |
| RUNTIME-005 | Planned | 03 | TASK-AGENT-003, TASK-AI-003 |
| RUNTIME-006 | Planned | 03 | TASK-AI-001, TASK-AI-005 |
| RUNTIME-007 | Planned | 03 | TASK-AI-001, TASK-AI-005 |
| RUNTIME-008 | Planned | 03 | TASK-AI-003 |
| RUNTIME-009 | Planned | 03 | TASK-AI-003 |
| RUNTIME-010 | Planned | 03–04 | TASK-AI-004, TASK-CHAT-003 |

**Clarification:** RUNTIME-004 is planned against the minimal approved MVP tool registry. Any tool beyond `request_handoff`, particularly a business action, needs approved product scope and security review.

## Security

| PRD requirement | Status | Sprint | Tasks |
|---|---|---:|---|
| SEC-001 | Planned | 00–05 | TASK-PLAT-003, TASK-WS-004, TASK-KB-007, TASK-CHAT-002, TASK-OPS-002 |
| SEC-002 | Planned | 01–05 | TASK-RBAC-002, TASK-WS-004, TASK-OPS-002 |
| SEC-003 | Planned | 00, 05 | TASK-PLAT-002, TASK-PLAT-006, TASK-OPS-004 |
| SEC-004 | Planned | 00, 05 | TASK-PLAT-002, TASK-OPS-004 |
| SEC-005 | Planned | 03 | TASK-AGENT-003, TASK-AI-003 |
| SEC-006 | Planned | 03 | TASK-AGENT-003, TASK-AI-003 |
| SEC-007 | Planned | 03, 05 | TASK-AI-002, TASK-AI-004, TASK-AI-006, TASK-OPS-002 |
| SEC-008 | Needs clarification | 02–03 | TASK-KB-003, TASK-KB-004, TASK-AI-001, TASK-AI-002 |
| SEC-009 | Planned | 01–05 | TASK-AUDIT-001, TASK-AGENT-004, TASK-HANDOFF-004, TASK-OPS-004 |
| SEC-010 | Planned | 04–05 | TASK-CHAT-001, TASK-OPS-002 |

**Clarification:** SEC-008 controls are planned, but permitted customer/document data sent to a model, retention, residency, and provider terms require product/legal confirmation before production.

## Background processing

| PRD requirement | Status | Sprint | Tasks |
|---|---|---:|---|
| JOB-001 | Planned | 00–05 | TASK-PLAT-004, TASK-KB-005, TASK-KB-008, TASK-ANALYTICS-002, TASK-OPS-003 |
| JOB-002 | Planned | 00 | TASK-PLAT-004 |
| JOB-003 | Planned | 00–05 | TASK-PLAT-004, TASK-KB-005, TASK-ANALYTICS-002, TASK-OPS-001 |
| JOB-004 | Planned | 00–05 | TASK-PLAT-004, TASK-KB-006, TASK-ANALYTICS-002, TASK-OPS-003 |

## Observability

| PRD requirement | Status | Sprint | Tasks |
|---|---|---:|---|
| OBS-001 | Planned | 00–05 | TASK-PLAT-001, TASK-PLAT-005, TASK-CHAT-003, TASK-ANALYTICS-001, TASK-OPS-001 |
| OBS-002 | Planned | 03 | TASK-AI-001, TASK-AI-005 |
| OBS-003 | Planned | 03–04 | TASK-AI-005, TASK-HANDOFF-004 |
| OBS-004 | Planned | 00–05 | TASK-PLAT-004, TASK-KB-005, TASK-OPS-001 |
| OBS-005 | Planned | 00–05 | TASK-PLAT-005, TASK-AUTH-004, TASK-AI-005, TASK-OPS-001 |
| OBS-006 | Planned | 00–05 | TASK-PLAT-002, TASK-PLAT-005, TASK-AUTH-004, TASK-AI-005, TASK-OPS-002 |

## PRD future scope and explicit MVP non-goals

These items have no individual requirement IDs and are classified as **Future**. They are intentionally not implementation tasks in the MVP plan: multiple agents, AI orchestration, sales/billing agents, voice, WhatsApp, email, Shopify, Stripe production integration, CRM integrations, advanced workflows, marketplace, advanced RAG, enterprise SSO, and white-labeling. [PRD §5.2, §15]

The plan includes only future-safe extension points—agent/configuration identity, provider abstraction, durable jobs, and tenant-scoped tool grants—not the future capabilities themselves.
