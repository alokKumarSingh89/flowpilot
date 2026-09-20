# MVP Sprint Plan

Each sprint ends with a demonstrable, reviewable increment and the Definition of Done in [TASK_BREAKDOWN.md](TASK_BREAKDOWN.md). Tasks are defined in detail there; requirement status is authoritative in [TRACEABILITY.md](TRACEABILITY.md).

## Sprint 00 — Secure delivery foundation

**Goal:** Establish the minimum platform controls required to build safely.

**PRD requirements covered:** WS-008; SEC-001–004; JOB-001–004; OBS-001–006.

**Architecture areas:** modular monolith, managed identity boundary, PostgreSQL/RLS, durable jobs, secrets, telemetry; ADR-0001, ADR-0003, ADR-0006, ADR-0007, ADR-0008.

**Tasks:** TASK-PLAT-001 through TASK-PLAT-006.

**Dependencies:** None. This sprint gates all later backend, storage, queue, and public API work.

**Parallelizable:** application/module skeleton and API contract conventions; environment/secrets policy; telemetry baseline; CI quality gates. RLS verification depends on the persistence baseline.

**Sequential:** establish persistence role model → tenant context/RLS checks → tenant denial integration tests; establish job contract → retry/DLQ behavior.

**Acceptance criteria:** a request/job has correlation context; secrets are excluded from source/logs; tenant-scoped persistence rejects cross-workspace access; jobs are idempotent/retry-bounded/observable; CI enforces agreed quality checks.

**Testing:** unit tests for context/config validation; integration tests for RLS and job retry/idempotency; telemetry propagation test.

**Security:** non-owner application database role without RLS bypass; secret-manager-only runtime credentials; redaction checks.

**Observability:** structured logs, request IDs, error capture, job trace/correlation fields.

**Definition of Done:** all Sprint 00 tasks meet the shared Definition of Done.

## Sprint 01 — Identity, workspaces, and authorization

**Goal:** Users securely authenticate and operate only within authorized workspaces.

**PRD requirements covered:** AUTH-001–008; WS-001–008; RBAC-001–005; SEC-001–003, SEC-009; OBS-001, OBS-005–006.

**Architecture areas:** identity provider boundary, internal user profile, membership/role policy, tenant context/RLS, audit; ADR-0003, ADR-0007, ADR-0008.

**Tasks:** TASK-AUTH-001 through TASK-AUTH-004; TASK-WS-001 through TASK-WS-004; TASK-RBAC-001 through TASK-RBAC-003; TASK-AUDIT-001.

**Dependencies:** `TASK-AUTH-001` starts only after `TASK-PLAT-001`, `TASK-PLAT-002`, `TASK-PLAT-003`, and `TASK-PLAT-005` are complete, and after the approved provider-selection record required by ADR-0007 is available. Membership requires workspace creation; resource authorization requires membership/role policy. No Sprint 01 task may select an identity provider implicitly.

**Parallelizable:** identity lifecycle adapters; workspace/settings endpoints; role-policy matrix and UI guards; audit-event integration. UI work may use approved contracts.

**Sequential:** approve provider-selection record → verify identity → provision/update internal user → create/select workspace → manage membership/roles → enforce policy on workspace resources.

**Acceptance criteria:** a user can register, log in/out/refresh/reset/update profile; create and switch workspaces; owner can invite/remove/assign roles; all roles have tested server-side access boundaries; important access changes are audited.

**Testing:** identity integration tests; RBAC policy matrix tests; cross-workspace API/RLS denial tests; E2E registration, login, workspace creation, and invitation.

**Security:** no sensitive auth logging; server-only role enforcement; membership changes are audited.

**Observability:** safe authentication outcomes, request IDs, redacted errors, audit events for workspace/member changes.

**Definition of Done:** all Sprint 01 tasks meet the shared Definition of Done.

## Sprint 02 — Knowledge lifecycle and ingestion

**Goal:** Administrators add supported knowledge and receive tenant-isolated searchable sources with visible processing status.

**PRD requirements covered:** KB-001–011; AGENT-005; JOB-001–004; SEC-001–003, SEC-008–010; OBS-001, OBS-004–006.

**Architecture areas:** private object storage, source/version/chunk model, worker pipeline, pgvector/full-text retrieval, URL safety; ADR-0003, ADR-0004, ADR-0006.

**Tasks:** TASK-KB-001 through TASK-KB-009.

**Dependencies:** Sprint 00 queue/worker and tenancy baseline; Sprint 01 administrator authorization.

**Parallelizable:** source CRUD/FAQ text; upload contract and asset authorization; URL ingestion boundary; parser adapter contract. Embedding/index activation follows normalized content.

**Sequential:** create source/version → validate/store/fetch → enqueue → parse/normalize → chunk/embed/index → mark ready/failed → retrieve/cite; update/delete follows version lifecycle.

**Acceptance criteria:** authorized administrators can create text/FAQ/URL/PDF sources; states are visible; processing is asynchronous, retry-safe, and observable; only workspace/agent-authorized ready content is retrievable; updates reprocess and deletion removes retrieval eligibility.

**Testing:** source authorization and state-transition units; storage/SSRF/parser/queue integration tests; cross-tenant vector retrieval denial tests; E2E text/FAQ/PDF/URL lifecycle as supported by approved test fixtures.

**Security:** server-generated object keys, exact-asset signed URLs, private storage, size/type/signature validation, scan before parsing, URL SSRF protections, redacted failure reporting.

**Observability:** source/job IDs, queue traces, processing metrics, failure state/error codes without document content.

**Definition of Done:** all Sprint 02 tasks meet the shared Definition of Done.

## Sprint 03 — Agent configuration and bounded AI runtime

**Goal:** Administrators configure the workspace support agent, which produces grounded/cited responses or controlled escalation.

**PRD requirements covered:** AGENT-001–009; RUNTIME-001–010; KB-011; HANDOFF-002–003; SEC-005–009; OBS-002–003, OBS-005–006.

**Architecture areas:** agent/configuration versioning, provider gateway, retrieval/context assembly, tool authorization, prompt-injection controls, AI telemetry; ADR-0004, ADR-0005, ADR-0008.

**Tasks:** TASK-AGENT-001 through TASK-AGENT-005; TASK-AI-001 through TASK-AI-006.

**Dependencies:** Sprint 01 authorization/audit and Sprint 02 ready knowledge retrieval.

**Parallelizable:** agent admin configuration; provider adapter/gateway; AI telemetry schema; evaluation harness fixtures. Runtime orchestration depends on configuration, retrieval, and provider gateway.

**Sequential:** configure/version agent → select authorized sources and tool grants → assemble context/retrieve → invoke gateway → validate tool proposal → bounded execution/response or escalation.

**Acceptance criteria:** at most one active agent per workspace; its configuration changes are auditable; it uses only selected sources and authorized `request_handoff`; responses identify sources; every execution has trace/cost metadata and controlled failure/loop/limit behavior.

**Testing:** configuration and activation policy units; provider-gateway integration tests with test adapter; retrieval/citation tests; tool authorization and malformed argument tests; AI evaluations for grounding, escalation, and injection resistance.

**Security:** model output never authorizes tools; typed input validation; prompt/data trust boundaries; no unnecessary sensitive data in model/telemetry.

**Observability:** AI execution trace IDs, model/provider/version, retrieval/tool spans, token/cost/termination metrics, sanitized errors.

**Definition of Done:** all Sprint 03 tasks meet the shared Definition of Done.

## Sprint 04 — Customer chat and human handoff

**Goal:** Customers chat through a protected public surface and support staff can take ownership and resolve conversations.

**PRD requirements covered:** CHAT-001–007; HANDOFF-001–007; RUNTIME-001–002, RUNTIME-010; SEC-001–002, SEC-009–010; OBS-001–006.

**Architecture areas:** public deployment credential, customer sessions, conversation/message state, SSE/WebSockets, support inbox, handoff state machine; ADR-0002, ADR-0003, ADR-0005, ADR-0008.

**Tasks:** TASK-CHAT-001 through TASK-CHAT-006; TASK-HANDOFF-001 through TASK-HANDOFF-004.

**Dependencies:** Sprint 01 access policy and Sprint 03 runtime. Public chat must not launch before public credential/rate-limit checks pass.

**Parallelizable:** customer session/deployment contract; console inbox views; durable conversation model; realtime event transport. Streaming runtime integration follows persisted conversation/message behavior.

**Sequential:** authorize deployment → start/resume conversation → persist message → execute/stream response → request/escalate handoff → surface queue → take ownership/reply → resolve.

**Acceptance criteria:** customer can start and continue a workspace-bound conversation; messages/history persist; AI streams when applicable; customer/AI escalation appears in dashboard; a support agent takes ownership, replies, and resolves; each handoff is recorded.

**Testing:** public API abuse/rate-limit tests; conversation/handoff state-machine units; SSE/WebSocket reconnection integration; cross-workspace conversation denial tests; E2E customer chat, AI response, requested/AI escalation, human reply, resolution.

**Security:** scoped/revocable public credentials, no member-token exposure, origin checks as secondary control, server-side conversation ownership/tenant checks.

**Observability:** correlate public request, conversation, execution, handoff, realtime delivery, and support action; capture stream and handoff failures safely.

**Definition of Done:** all Sprint 04 tasks meet the shared Definition of Done.

## Sprint 05 — Analytics, operational assurance, and MVP release

**Goal:** Deliver basic isolated analytics and demonstrate the complete MVP is secure, observable, resilient, and releasable.

**PRD requirements covered:** ANALYTICS-001–005; JOB-001–004; OBS-001–006; SEC-001–010; all MVP end-to-end success criteria.

**Architecture areas:** event/aggregate model, audit access, dashboards, error/metric/tracing coverage, release pipeline and resilience; ADR-0001, ADR-0003, ADR-0006, ADR-0008.

**Tasks:** TASK-ANALYTICS-001 through TASK-ANALYTICS-003; TASK-OPS-001 through TASK-OPS-004; TASK-QA-001 through TASK-QA-003.

**Dependencies:** durable events from Sprints 01–04. Analytics definitions require resolved/escalated conversation state and execution records.

**Parallelizable:** event aggregation; dashboard UI; operational dashboards/alerts; security/resilience suite; E2E/AI release suite.

**Sequential:** define/version metric calculations → aggregate workspace-scoped events → render dashboard → execute release gates and remediate failures.

**Acceptance criteria:** dashboard reports conversation metrics, AI resolution rate, escalation rate, and agent usage only for the authorized workspace; failed jobs/errors/tool calls are observable; release gates cover the PRD success flow, tenant isolation, AI safety, and recovery behavior.

**Testing:** analytics calculation units and workspace-scoping integrations; complete E2E suite; AI regression suite; dependency/secret/SAST checks; load and failure drills appropriate to MVP.

**Security:** final authorization/RLS/public API review, audit-event integrity review, secret scan, dependency vulnerability review, documented incident/rollback paths.

**Observability:** dashboards/alerts for API, queue, ingestion, provider/runtime, tool, handoff, error, and cost signals; verify trace correlation across each E2E success flow.

**Definition of Done:** all Sprint 05 tasks meet the shared Definition of Done and the MVP exit criteria in ROADMAP.md.
