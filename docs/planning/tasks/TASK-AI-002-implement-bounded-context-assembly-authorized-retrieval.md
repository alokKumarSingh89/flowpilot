# Task ID

TASK-AI-002

# Title

Implement Bounded Context Assembly Authorized Retrieval

# Sprint

03

# PRD Requirements

RUNTIME-002, RUNTIME-003, KB-011, SEC-007, SEC-008

# Objective

Implement bounded context assembly, authorized retrieval use, citations, and untrusted-content separation.

# Context

This is an MVP task from the approved modular-monolith plan. It must preserve server-side tenant isolation, explicit authorization, bounded AI behavior where applicable, and safe observability. It does not authorize a product, architecture, or ADR change.

# Scope

- Implement only: Implement bounded context assembly, authorized retrieval use, citations, and untrusted-content separation.
- Expected change areas: AI gateway/runtime boundary, evaluation assets where applicable, and focused tests.
- Preserve workspace scoping and server-side authorization on every applicable path.

# Out of Scope

- autonomous agents, multi-agent orchestration, external/action tools, unbounded loops, or raw sensitive telemetry.
- Changes to the PRD, approved architecture, ADRs, or this task's requirement mapping without approval.
- Unrelated refactoring or dependencies not required for this focused task.

# Dependencies

- TASK-AI-001
- TASK-AGENT-002
- TASK-KB-007

# Parallelization

No. This task is on a required dependency path; begin only after the listed dependencies are complete.

# Expected Changes

Update the approved context/rag area, focused interfaces/contracts, tests, and necessary configuration/documentation. Use the structure established by prerequisite tasks; do not invent unrelated application paths or packages.

# API / Contract Changes

Define or update only the context/rag contract required by this task. Document validation, authorization, and failure behavior; do not add unrelated endpoints.

# Data Changes

Add or update only the minimal context/rag data representation needed for the cited requirements, with workspace ownership where applicable.

# Security Requirements

Treat customer and retrieved text as untrusted; send only bounded tenant-authorized context and no unnecessary sensitive data.

# Observability Requirements

Propagate correlation IDs; emit structured, redacted logs and relevant success/failure metrics. Add traces and audit events where the cited requirements require them.

# Testing Requirements

- Unit: cover task-specific validation, state, policy, and failure rules.
- Integration: cover the changed context/rag boundary, persistence, queue, storage, provider, or API path as applicable.
- E2E: not required unless this task changes a user-visible flow.
- Security: cover tenant isolation, authorization, validation, redaction, and abuse cases applicable to this task.

# Acceptance Criteria

- [ ] Only approved context is sent; response has source references where knowledge is used.
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
