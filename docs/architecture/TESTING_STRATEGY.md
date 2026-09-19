# Testing Strategy

## Quality principle

Testing is layered: fast tests protect domain rules; integration tests protect boundaries; E2E tests protect user outcomes; AI evaluations protect behavior that conventional assertions cannot fully cover. The PRD explicitly requires unit, integration, E2E, and AI evaluation coverage. [PRD §12]

## MVP test layers

| Layer | Coverage |
|---|---|
| Unit | Business rules, validation, RBAC policy, tenant context, state transitions, agent routing, context assembly, tool decisions |
| Integration | PostgreSQL/RLS, authentication verification, repositories, queue retry/idempotency, storage, provider adapters, tool authorization |
| API/contract | OpenAPI compatibility, error contracts, authorization matrix, malformed/oversized input, rate limits and public-chat boundary |
| E2E | Registration, login, workspace creation, invitation, agent setup, knowledge upload, customer chat, streamed response, handoff, human response, resolution |
| AI evaluation | Answer/citation faithfulness, retrieval relevance, hallucination/abstention, tool selection and arguments, escalation, prompt-injection resistance |
| Security | Secret/dependency/SAST scans, RLS cross-tenant tests, authorization fuzzing, file/URL SSRF tests, penetration testing before production |
| Performance/resilience | Chat concurrency, vector latency, ingestion throughput, backpressure, retry/DLQ, provider outage, duplicate delivery, worker restart |

## Approved test and quality tooling

- Use Vitest for unit and integration tests, Supertest for HTTP/API contract tests, and Playwright for E2E tests.
- Use ESLint and Prettier for static analysis and formatting. Husky and lint-staged run scoped checks before commits; GitHub Actions is the CI execution environment.
- Use Docker Compose to provide local PostgreSQL, Redis, and other approved local infrastructure when the relevant task introduces it. Tests must not require production accounts or secrets.
- The root workspace provides deterministic commands for format check, lint, type check, unit/integration/API tests, E2E tests when introduced, and build.

## Identity-provider testing

Use an approved non-production identity-provider tenant/project and deterministic test identities. Unit tests mock the provider adapter at the identity boundary; integration tests validate issuer/audience/signature/expiry failure handling and subject-to-internal-user provisioning against the approved non-production configuration. E2E tests cover registration, login, refresh, and rejection of invalid credentials without logging credentials or raw tokens. Provider organizations, groups, and claims must not bypass FlowPilot workspace-membership and RBAC tests. [AUTH-001–008; WS-008; RBAC-002–003; SEC-001–004; OBS-001, OBS-006]

## Requirement traceability

The test suite must explicitly cover tenant isolation and server-side authorization. [WS-008; RBAC-002–003; SEC-001–002] It must validate knowledge states/asynchrony, agent tool boundaries, conversation retention/streaming, handoff lifecycle, jobs, and telemetry propagation. [KB-005–006; AGENT-008; CHAT-004–005; HANDOFF-001–007; JOB-001–004; OBS-001–004]

## AI evaluation governance

Keep versioned datasets and expected outcomes separate from production customer content. Run a focused regression suite for changes to prompts, retrieval, models, tools, and provider adapters. Set acceptance thresholds only after baseline measurement; the PRD does not yet define numeric quality thresholds.

## Stage plan and assumptions

MVP gates: type/lint checks, unit/integration/API tests, core E2E flows, targeted AI safety/citation evaluations, and security scans.

Post-MVP: broader benchmark suites, load tests on release candidates, restore drills, and automated resilience tests.

Future: continuous production-quality evaluation with approved privacy controls.

Assumption: exact coverage targets, performance SLOs, test-data retention, and AI score thresholds need product/engineering approval.
