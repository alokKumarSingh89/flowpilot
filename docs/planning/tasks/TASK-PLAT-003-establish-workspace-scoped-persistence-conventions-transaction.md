# Task ID

TASK-PLAT-003

# Title

Establish Workspace Scoped Persistence Conventions Transaction

# Sprint

00

# PRD Requirements

WS-008, SEC-001, SEC-002

# Objective

Establish workspace-scoped persistence conventions, transaction tenant context, non-owner app DB role, and RLS baseline.

# Context

This is an MVP task from the approved modular-monolith plan. It must preserve server-side tenant isolation, explicit authorization, bounded AI behavior where applicable, and safe observability. It does not authorize a product, architecture, or ADR change.

# Scope

- Implement only: Establish workspace-scoped persistence conventions, transaction tenant context, non-owner app DB role, and RLS baseline.
- Expected change areas: platform configuration, module boundaries, deployment/CI configuration, and focused tests.
- Preserve workspace scoping and server-side authorization on every applicable path.

# Out of Scope

- end-user product features, business schemas, or unapproved infrastructure capabilities.
- Changes to the PRD, approved architecture, ADRs, or this task's requirement mapping without approval.
- Unrelated refactoring or dependencies not required for this focused task.

# Dependencies

- TASK-PLAT-001
- TASK-PLAT-002 — completed and reviewed public secret-access, configuration-separation, sanitized-failure, and redaction contracts.

# Parallelization

Do not run in parallel with TASK-PLAT-002. Begin only after TASK-PLAT-001 and TASK-PLAT-002 are complete. After those prerequisites, TASK-PLAT-005 and TASK-PLAT-006 may run concurrently when shared-file ownership and public contracts are agreed; this is not a blanket prohibition on independent work. Do not infer that TASK-PLAT-004 is independent: its PostgreSQL-backed job state requires a separate dependency review against ADR-0006.

# Expected Changes

Update the approved persistence area, focused interfaces/contracts, tests, and necessary configuration/documentation. Use the structure established by prerequisite tasks; do not invent unrelated application paths or packages.

# API / Contract Changes

Consume only the public provider-neutral contracts established by TASK-PLAT-002: server-only secret resolution and secret/non-secret configuration separation from `packages/config`, and sanitized configuration/error diagnostics from `packages/observability`. Resolve database credentials at the trusted bootstrap boundary and pass the required connection configuration into the database boundary; never include credentials or connection strings in public configuration, logs, or errors.

This is a contract dependency, not a dependency on secret-provider internals, SDKs, storage/caching, or environment-variable parsing. Persistence tests may inject a deterministic test provider conforming to the same contract. TASK-PLAT-003 owns database-specific validation, Prisma integration, transaction tenant context, roles, and RLS; TASK-PLAT-002 must not import database implementation details. No product API or production secret-manager selection is required.

# Data Changes

Only approved configuration, tenant-context, or job metadata required by this task; no business-feature schema.

# Security Requirements

Preserve server-side authorization and tenant-context enforcement. Never log secrets, tokens, or unnecessary customer data.

# Observability Requirements

Propagate correlation IDs; emit structured, redacted logs and relevant success/failure metrics. Add traces and audit events where the cited requirements require them.

# Testing Requirements

- Unit: cover task-specific validation, state, policy, and failure rules.
- Integration: cover the changed persistence boundary, persistence, queue, storage, provider, or API path as applicable.
- E2E: not required unless this task changes a user-visible flow.
- Security: cover tenant isolation, authorization, validation, redaction, and abuse cases applicable to this task.

# Acceptance Criteria

- [ ] Unscoped/cross-workspace persistence is denied; app role cannot bypass RLS.
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

