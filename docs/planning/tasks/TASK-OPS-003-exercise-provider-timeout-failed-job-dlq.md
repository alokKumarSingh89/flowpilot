# Task ID

TASK-OPS-003

# Title

Exercise Provider Timeout Failed Job Dlq

# Sprint

05

# PRD Requirements

JOB-001, JOB-002, JOB-003, JOB-004, RUNTIME-010, OBS-004, OBS-005

# Objective

Exercise provider timeout, failed job/DLQ, duplicate delivery, worker restart, and safe handoff/failure paths.

# Context

This is an MVP task from the approved modular-monolith plan. It must preserve server-side tenant isolation, explicit authorization, bounded AI behavior where applicable, and safe observability. It does not authorize a product, architecture, or ADR change.

# Scope

- Implement only: Exercise provider timeout, failed job/DLQ, duplicate delivery, worker restart, and safe handoff/failure paths.
- Expected change areas: operational configuration, assurance evidence, runbooks, and focused tests.
- Preserve workspace scoping and server-side authorization on every applicable path.

# Out of Scope

- unapproved infrastructure redesigns, data-plane changes, or feature expansion.
- Changes to the PRD, approved architecture, ADRs, or this task's requirement mapping without approval.
- Unrelated refactoring or dependencies not required for this focused task.

# Dependencies

- TASK-PLAT-004
- TASK-AI-004
- TASK-CHAT-003

# Parallelization

Yes. After its dependencies are complete, it can run in parallel with: TASK-ANALYTICS-001, TASK-ANALYTICS-002, TASK-ANALYTICS-003, TASK-OPS-001.

# Expected Changes

Update the approved resilience area, focused interfaces/contracts, tests, and necessary configuration/documentation. Use the structure established by prerequisite tasks; do not invent unrelated application paths or packages.

# API / Contract Changes

No production API change is expected; update only test, operational, or evidence contracts as applicable.

# Data Changes

No new product data model is expected unless required for the cited authorization or evidence behavior.

# Security Requirements

Follow approved secret handling, authorization, tenant isolation, and telemetry-redaction rules.

# Observability Requirements

Propagate correlation IDs; emit structured, redacted logs and relevant success/failure metrics. Add traces and audit events where the cited requirements require them.

# Testing Requirements

- Unit: cover task-specific validation, state, policy, and failure rules.
- Integration: cover the changed resilience boundary, persistence, queue, storage, provider, or API path as applicable.
- E2E: not required unless this task changes a user-visible flow.
- Security: cover tenant isolation, authorization, validation, redaction, and abuse cases applicable to this task.

# Acceptance Criteria

- [ ] Failure modes preserve data and provide controlled customer/operator outcomes.
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
