# Task ID

TASK-PLAT-002

# Title

Define Runtime Secret Provider Boundary Redaction

# Sprint

00

# PRD Requirements

SEC-003, SEC-004, OBS-006

# Objective

Define runtime secret-provider boundary, redaction policy, and local/CI secret handling.

# Context

This is an MVP task from the approved modular-monolith plan. It must preserve server-side tenant isolation, explicit authorization, bounded AI behavior where applicable, and safe observability. It does not authorize a product, architecture, or ADR change.

# Scope

- Implement only: Define runtime secret-provider boundary, redaction policy, and local/CI secret handling.
- Expected change areas: platform configuration, module boundaries, deployment/CI configuration, and focused tests.
- Preserve workspace scoping and server-side authorization on every applicable path.

# Out of Scope

- end-user product features, business schemas, or unapproved infrastructure capabilities.
- Changes to the PRD, approved architecture, ADRs, or this task's requirement mapping without approval.
- Unrelated refactoring or dependencies not required for this focused task.

# Dependencies

- TASK-PLAT-001

# Parallelization

TASK-PLAT-003 must wait until this task is complete and its public contracts are reviewed. Other tasks may run concurrently only when their own dependencies and contract boundaries permit it; shared-file ownership alone does not establish independence.

# Expected Changes

Update the approved secrets area, focused interfaces/contracts, tests, and necessary configuration/documentation. Use the structure established by prerequisite tasks; do not invent unrelated application paths or packages.

# API / Contract Changes

Publish the provider-neutral contracts consumed by TASK-PLAT-003 through the existing package public exports:

- `packages/config`: server-only secret resolution through an injected provider, with documented secret-reference inputs, resolved-value handling, and sanitized missing/unavailable/invalid-secret failure semantics. Keep secret-bearing connection configuration separate from public/non-secret configuration and diagnostic summaries.
- `packages/observability`: the shared sanitization/redaction contract for configuration and error diagnostics, excluding credentials and secret-bearing connection strings.
- Document local/CI test-provider injection and deterministic contract examples so persistence tests need no live secret-manager account.

TASK-PLAT-003 may consume these public contracts for database bootstrap and safe diagnostics. It must not depend on provider SDKs, internal storage/caching, environment-variable parsing internals, or a concrete cloud secret manager. Database-specific validation, Prisma setup, tenant context, roles, and RLS remain owned by TASK-PLAT-003. No product API or vendor selection is introduced.

# Data Changes

Only approved configuration, tenant-context, or job metadata required by this task; no business-feature schema.

# Security Requirements

Preserve server-side authorization and tenant-context enforcement. Never log secrets, tokens, or unnecessary customer data.

# Observability Requirements

Propagate correlation IDs; emit structured, redacted logs and relevant success/failure metrics. Add traces and audit events where the cited requirements require them.

# Testing Requirements

- Unit: cover task-specific validation, state, policy, and failure rules.
- Integration: cover the changed secrets boundary, persistence, queue, storage, provider, or API path as applicable.
- E2E: not required unless this task changes a user-visible flow.
- Security: cover tenant isolation, authorization, validation, redaction, and abuse cases applicable to this task.

# Acceptance Criteria

- [x] No credential is in source, logs, errors, or client configuration.
- [x] Public secret-resolution, configuration-separation, sanitized-failure, and redaction contracts are documented and tested for TASK-PLAT-003 consumption without provider-specific imports.
- [x] The behavior is implemented only for the listed PRD requirements.
- [x] Valid authorized behavior succeeds; invalid or unauthorized behavior fails safely.
- [x] Applicable tenant isolation, server-side authorization, and input validation tests pass.
- [x] Required contracts and telemetry/audit behavior are covered without sensitive data.
- [x] The testing requirements above pass.

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


# Implementation Evidence

TASK-PLAT-002 implementation covers all seven acceptance criteria within the assigned boundary; human code review remains outstanding.

| Criterion | Evidence |
|---|---|
| No credential exposure | Synthetic test values only; `.env.test` is ignored; secret values redact on serialization/inspection and provider exceptions are replaced without causes. |
| Public downstream contracts | `@flowpilot/config` exports provider/resolver/value/error contracts; `@flowpilot/observability` exports safe diagnostics; `packages/config/SECRETS.md` documents TASK-PLAT-003 consumption. |
| Requirement scope | SEC-003, SEC-004, OBS-006; no persistence, cloud vendor, product endpoint, or telemetry backend implementation. |
| Authorized success and safe failure | Tests exercise bootstrap grants, denial before provider access, invalid/missing values, provider failures, and bounded timeout without retries. |
| Applicable isolation and validation | Reference/grant validation and immutable grant snapshots are tested; service-bootstrap resolution exposes no tenant-scoped capability or request-derived grants. |
| Safe contracts and telemetry | Correlated outcome-code projection discards raw diagnostics, including hostile getters and cyclic objects; integration tests consume package public exports. |
| Required tests | Unit and package-boundary integration/API suites, format check, lint, typecheck, and build pass; no external account is required. |

A managed-secret deployment adapter, automatic logging/exporters, CI scanners, tenant credential access, and database setup are not claimed by this task. The `.env` ignore rule is not a substitute for future CI secret scanning.
