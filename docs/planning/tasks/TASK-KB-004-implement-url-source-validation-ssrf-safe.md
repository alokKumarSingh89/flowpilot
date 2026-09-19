# Task ID

TASK-KB-004

# Title

Implement Url Source Validation SSRF Safe

# Sprint

02

# PRD Requirements

KB-004, KB-005, KB-006, SEC-008

# Objective

Implement URL source validation, SSRF-safe fetch job, and status reporting.

# Context

This is an MVP task from the approved modular-monolith plan. It must preserve server-side tenant isolation, explicit authorization, bounded AI behavior where applicable, and safe observability. It does not authorize a product, architecture, or ADR change.

# Scope

- Implement only: Implement URL source validation, SSRF-safe fetch job, and status reporting.
- Expected change areas: knowledge module, workers, storage boundary, admin surface where applicable, and focused tests.
- Preserve workspace scoping and server-side authorization on every applicable path.

# Out of Scope

- unsupported source types, advanced RAG, external integrations, or unapproved retention behavior.
- Changes to the PRD, approved architecture, ADRs, or this task's requirement mapping without approval.
- Unrelated refactoring or dependencies not required for this focused task.

# Dependencies

- TASK-KB-001
- TASK-PLAT-004

# Parallelization

Yes. After its dependencies are complete, it can run in parallel with: TASK-KB-002, TASK-KB-003, TASK-KB-005, TASK-KB-006.

# Expected Changes

Update the approved urls area, focused interfaces/contracts, tests, and necessary configuration/documentation. Use the structure established by prerequisite tasks; do not invent unrelated application paths or packages.

# API / Contract Changes

Define or update only the urls contract required by this task. Document validation, authorization, and failure behavior; do not add unrelated endpoints.

# Data Changes

Add or update only the minimal urls data representation needed for the cited requirements, with workspace ownership where applicable.

# Security Requirements

Protect URL ingestion from SSRF with network, redirect, size, content-type, and timeout controls.

# Observability Requirements

Trace ingestion jobs with safe error categories; never log fetched sensitive content.

# Testing Requirements

- Unit: cover task-specific validation, state, policy, and failure rules.
- Integration: cover the changed urls boundary, persistence, queue, storage, provider, or API path as applicable.
- E2E: cover the affected user-visible flow when the surface is available.
- Security: cover tenant isolation, authorization, validation, redaction, and abuse cases applicable to this task.

# Acceptance Criteria

- [ ] Private-network/invalid redirects/content are rejected; valid URL is queued.
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
