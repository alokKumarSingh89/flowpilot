# Task ID

TASK-CHAT-001

# Title

Implement Revocable Rotatable Deployment Credential Validation

# Sprint

04

# PRD Requirements

CHAT-001, CHAT-002, SEC-010

# Objective

Implement revocable/rotatable deployment credential validation, origin policy, and per-deployment/IP/session abuse limits.

# Context

This is an MVP task from the approved modular-monolith plan. It must preserve server-side tenant isolation, explicit authorization, bounded AI behavior where applicable, and safe observability. It does not authorize a product, architecture, or ADR change.

# Scope

- Implement only: Implement revocable/rotatable deployment credential validation, origin policy, and per-deployment/IP/session abuse limits.
- Expected change areas: public-chat/conversation or support-console boundary, contracts, and focused tests.
- Preserve workspace scoping and server-side authorization on every applicable path.

# Out of Scope

- voice, WhatsApp, email, CRM channels, or bypass of public credential/tenant controls.
- Changes to the PRD, approved architecture, ADRs, or this task's requirement mapping without approval.
- Unrelated refactoring or dependencies not required for this focused task.

# Dependencies

- TASK-PLAT-002
- TASK-WS-004

# Parallelization

Yes. After its dependencies are complete, it can run in parallel with: TASK-CHAT-003, TASK-CHAT-004, TASK-CHAT-005, TASK-CHAT-006.

# Expected Changes

Update the approved public chat area, focused interfaces/contracts, tests, and necessary configuration/documentation. Use the structure established by prerequisite tasks; do not invent unrelated application paths or packages.

# API / Contract Changes

Define or update only the public chat contract required by this task. Document validation, authorization, and failure behavior; do not add unrelated endpoints.

# Data Changes

Add or update only the minimal public chat data representation needed for the cited requirements, with workspace ownership where applicable.

# Security Requirements

Use revocable/rotatable scoped deployment credentials, quotas, and server-side workspace resolution; CORS is not authorization.

# Observability Requirements

Record rate-limit and abuse outcomes without exposing deployment credential values.

# Testing Requirements

- Unit: cover task-specific validation, state, policy, and failure rules.
- Integration: cover the changed public chat boundary, persistence, queue, storage, provider, or API path as applicable.
- E2E: cover the affected user-visible flow when the surface is available.
- Security: cover tenant isolation, authorization, validation, redaction, and abuse cases applicable to this task.

# Acceptance Criteria

- [ ] Public request resolves only its configured workspace and exceeds no quota.
- [ ] The behavior is implemented only for the listed PRD requirements.
- [ ] Valid authorized behavior succeeds; invalid or unauthorized behavior fails safely.
- [ ] Applicable tenant isolation, server-side authorization, and input validation tests pass.
- [ ] Required contracts and telemetry/audit behavior are covered without sensitive data.
- [ ] The testing requirements above pass.

# Definition of Done

- [ ] Implementation is complete and limited to this task's approved scope.
- [ ] Required unit, integration, E2E, and security tests are passing.
- [ ] Security requirements are satisfied.
- [ ] Required observability and audit coverage is added or verified.
- [ ] Documentation is updated where required; architecture and PRD changes were not made without approval.
- [ ] PRD traceability is maintained with the exact requirement IDs above.
- [ ] No unrelated changes are included.

# Agent Instructions

Read AGENTS.md and the cited planning and architecture documents before editing. Implement the smallest complete slice, respect the dependencies, do not add future-scope capabilities, and stop for approval if this task would require an architecture, ADR, or product-scope change.

# Human Review Checklist

- [ ] Scope matches this task and its cited PRD requirements.
- [ ] Listed dependencies are complete; no new circular dependency was introduced.
- [ ] Tests demonstrate success, failure, authorization, and tenant behavior as applicable.
- [ ] Security, redaction, telemetry, and audit requirements are met.
- [ ] No future/non-MVP feature or unrelated change is included.
