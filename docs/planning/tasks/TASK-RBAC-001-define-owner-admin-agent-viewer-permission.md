# Task ID

TASK-RBAC-001

# Title

Define Owner Admin Agent Viewer Permission

# Sprint

01

# PRD Requirements

RBAC-001, RBAC-004, RBAC-005

# Objective

Define OWNER, ADMIN, AGENT, VIEWER permission matrix and server-side policy service.

# Context

This is an MVP task from the approved modular-monolith plan. It must preserve server-side tenant isolation, explicit authorization, bounded AI behavior where applicable, and safe observability. It does not authorize a product, architecture, or ADR change.

# Scope

- Implement only: Define OWNER, ADMIN, AGENT, VIEWER permission matrix and server-side policy service.
- Expected change areas: server-side policy service, guards, console affordances, and focused tests.
- Preserve workspace scoping and server-side authorization on every applicable path.

# Out of Scope

- client-only authorization, custom roles beyond OWNER/ADMIN/AGENT/VIEWER, or permission bypasses.
- Changes to the PRD, approved architecture, ADRs, or this task's requirement mapping without approval.
- Unrelated refactoring or dependencies not required for this focused task.

# Dependencies

- TASK-WS-001

# Parallelization

Yes. After its dependencies are complete, it can run in parallel with: TASK-AUTH-001, TASK-AUTH-002, TASK-AUTH-003, TASK-AUTH-004.

# Expected Changes

Update the approved authorization area, focused interfaces/contracts, tests, and necessary configuration/documentation. Use the structure established by prerequisite tasks; do not invent unrelated application paths or packages.

# API / Contract Changes

Define or update only the authorization contract required by this task. Document validation, authorization, and failure behavior; do not add unrelated endpoints.

# Data Changes

No new product data model is expected unless required for the cited authorization or evidence behavior.

# Security Requirements

Preserve server-side authorization and tenant-context enforcement. Never log secrets, tokens, or unnecessary customer data.

# Observability Requirements

Propagate correlation IDs; emit structured, redacted logs and relevant success/failure metrics. Add traces and audit events where the cited requirements require them.

# Testing Requirements

- Unit: cover task-specific validation, state, policy, and failure rules.
- Integration: cover the changed authorization boundary, persistence, queue, storage, provider, or API path as applicable.
- E2E: cover the affected user-visible flow when the surface is available.
- Security: cover tenant isolation, authorization, validation, redaction, and abuse cases applicable to this task.

# Acceptance Criteria

- [ ] Each membership has one role and policy outcome is deterministic.
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

