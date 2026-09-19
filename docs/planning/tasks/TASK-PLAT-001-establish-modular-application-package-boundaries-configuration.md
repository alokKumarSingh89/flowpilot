# Task ID

TASK-PLAT-001

# Title

Establish Modular Application Package Boundaries Configuration

# Sprint

00

# PRD Requirements

OBS-001, OBS-006

# Objective

Establish the approved application bootstrap, modular package boundaries, deterministic tooling baseline, validated non-secret runtime configuration, and API error/correlation conventions required by all later API and worker work.

# Context

This is an MVP task from the approved modular-monolith plan. It must preserve server-side tenant isolation, explicit authorization, bounded AI behavior where applicable, and safe observability. It does not authorize a product, architecture, or ADR change.

# Scope

- Create only the approved pnpm TypeScript monorepo bootstrap on Node.js 24 LTS: root workspace configuration; `apps/api` NestJS REST/OpenAPI bootstrap; `apps/web` and `apps/worker` reserved entry-point boundaries; and reserved `packages/config`, `packages/database`, `packages/contracts`, `packages/observability`, `packages/auth`, and `packages/ai` boundaries. Only configuration, contracts, and observability receive the platform behavior specified by this task. Do not implement web UI, worker behavior, database access, authentication, AI, or business modules.
- Add pnpm commands for TypeScript build/type check, ESLint, Prettier, Vitest, and the future Supertest/Playwright boundaries. The bootstrap must be reproducible from a clean checkout with pnpm and Node.js 24 LTS.
- Define an explicit, allow-listed runtime-configuration schema. Validate required values and value formats before the API accepts traffic; expose only a sanitized configuration summary suitable for diagnostics.
- Define a versioned internal API error contract with a stable error code, safe message, request/correlation ID, and no stack trace, token, credential, secret, or customer content in responses.
- Define ingress correlation behavior: accept a syntactically valid correlation/request ID when supplied, otherwise generate one; attach it to request context and response headers; make it available to downstream platform code without global mutable state.
- Add focused tests for configuration validation, sensitive-value exclusion, request-ID generation/propagation, and error serialization.
- Preserve future workspace scoping and server-side authorization boundaries, but do not add tenant tables, database connections, authentication, jobs, or product endpoints in this task.

# Out of Scope

- End-user product features, business schemas, tenant persistence/RLS, authentication or identity-provider configuration, queues/workers, secret-manager integration, structured logging/tracing exporters, and deployment infrastructure.
- Selecting an API framework, package manager, runtime version, repository topology, database, job queue, model provider, or other technology outside the approved baseline.
- Changes to the PRD, approved architecture, ADRs, or this task's requirement mapping without approval.
- Unrelated refactoring or dependencies not required for this focused task.

# Dependencies

- None.

# Required Architecture Inputs

- ADR-0001 and ADR-0008 are accepted and provide the modular-monolith and OpenTelemetry-compatible direction.
- The approved baseline is TypeScript on Node.js 24 LTS; pnpm monorepo; NestJS REST/OpenAPI API; Next.js/React frontend boundary; Prisma 7/PostgreSQL; Redis/BullMQ; Vitest, Supertest, Playwright; ESLint, Prettier, Husky, lint-staged; Docker Compose; and GitHub Actions. This task implements only the subset explicitly in scope.
- ADR-0007 does not require provider configuration in this task. Provider-specific configuration starts only in `TASK-AUTH-001` after a provider-selection record is approved.

# Parallelization

Yes. After its dependencies are complete, it can run in parallel with: other non-dependent tasks in the same sprint.

# Expected Changes

- Create `package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`, Node.js 24 LTS version metadata, TypeScript project configuration, ESLint, Prettier, Husky, lint-staged, Vitest, and Docker Compose configuration only to the extent needed for the empty foundation.
- Create `apps/api`, `apps/web`, and `apps/worker` boundaries; only `apps/api` receives the minimal NestJS REST/OpenAPI bootstrap required to exercise configuration, correlation, and safe errors. `apps/web` and `apps/worker` contain no product, queue, or UI behavior.
- Create `packages/config`, `packages/contracts`, and `packages/observability` modules for configuration, request context/correlation IDs, and safe error serialization. Create reserved `packages/database`, `packages/auth`, and `packages/ai` package boundaries only; they contain no implementation code in this task.
- Add `.env.example` or equivalent non-secret configuration documentation containing variable names, formats, required/optional status, and safe development defaults only. Never add real credentials or tokens.
- Add focused unit/API-contract tests and minimal developer documentation describing local validation and the standard commands.

# API / Contract Changes

Internal configuration, request context, correlation-header, and error-response contracts only. No authentication, workspace, or other product API is authorized.

# Tooling Requirements

- Provide deterministic pnpm commands for install, format check, lint, type check, Vitest unit/API-contract tests, and build.
- Pin Node/package/tool versions through the approved workspace metadata and pnpm lockfile.
- Configure tooling to fail on type, lint, formatting, or test failures; CI enforcement itself remains `TASK-PLAT-006`.

# Configuration Requirements

- Separate public/non-secret runtime configuration from secret values. Configuration validation for this task is implemented within `packages/config` using explicit runtime checks; do not add a separate validation library without approval.
- Validate configuration at process startup; fail closed with a safe error code when required configuration is absent or malformed.
- Do not read, log, serialize, or expose provider credentials, database URLs, queue credentials, or raw environment values.
- Define the request/correlation header name, validation limits, response behavior, and generated-ID format in the internal contract.

# Environment Requirements

- Support local development, test, and production configuration modes without environment-specific application branching outside the configuration boundary. Docker Compose is reserved for the approved local infrastructure introduced by later tasks; this task must not start PostgreSQL, Redis, BullMQ, or other services.
- Test configuration must use non-secret deterministic values and must not require live cloud services.
- Provider-specific identity values are intentionally excluded; they are introduced by `TASK-AUTH-001` only after ADR-0007 provider selection.

# Data Changes

Only approved configuration, tenant-context, or job metadata required by this task; no business-feature schema.

# Security Requirements

Preserve server-side authorization and tenant-context enforcement. Never log secrets, tokens, or unnecessary customer data.

# Observability Requirements

Generate/propagate correlation IDs and ensure configuration and error contracts exclude sensitive data. Full structured logging, traces, error capture, and telemetry redaction middleware remain `TASK-PLAT-005`; do not duplicate that work here.

# Testing Requirements

- Unit: configuration schema success/failure cases; required/optional values; invalid correlation IDs; generated IDs; sensitive-value exclusion; error serialization.
- API/contract: API bootstrap returns the standard safe error response and correlation header for an invalid request/configuration failure without stack traces or raw configuration.
- Integration: not required for databases, queues, storage, or providers because they are explicitly out of scope.
- E2E: not required; this task introduces no user-visible flow.
- Security: prove that test fixtures, error responses, diagnostics, and process output do not contain configured secret-like values.

# Acceptance Criteria

- [ ] A clean checkout can install dependencies and run format check, lint, type check, unit test, and build through documented commands.
- [ ] The API bootstrap rejects missing or malformed required non-secret configuration before serving requests and exposes only a safe error contract.
- [ ] A valid inbound correlation ID is propagated; an absent valid ID is generated; malformed IDs are replaced or rejected according to the documented contract.
- [ ] Response headers and serialized errors carry the correlation ID and never carry stack traces, raw configuration, credentials, tokens, or customer content.
- [ ] The repository has explicit API/shared-platform boundaries and, where required by the approved layout, a worker boundary with no queue behavior.
- [ ] The behavior is implemented only for the listed PRD requirements.
- [ ] Valid authorized behavior succeeds; invalid or unauthorized behavior fails safely.
- [ ] Applicable tenant isolation, server-side authorization, and input validation tests pass.
- [ ] Required contracts and telemetry/audit behavior are covered without sensitive data.
- [ ] The testing requirements above pass.

# Definition of Done

- [ ] Implementation is complete and limited to this task's approved scope.
- [ ] Required unit, API-contract, and security tests are passing; no database, queue, identity-provider, or E2E test is claimed for this task.
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
