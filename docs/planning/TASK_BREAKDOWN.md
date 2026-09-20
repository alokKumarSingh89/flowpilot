# Task Breakdown and Definition of Done

## Task conventions

Each task is an implementation-sized, reviewable unit. `Tests required` is the minimum new or changed coverage; all tasks also follow the shared Definition of Done. Dependencies reference task IDs or completed sprints. No task authorizes scope beyond the cited PRD requirements.

## Sprint 00 — Foundation

| Task | PRD | Area | Description | Dependencies | Acceptance criteria | Tests required |
|---|---|---|---|---|---|---|
| TASK-PLAT-001 | OBS-001, OBS-006 | Platform | Establish the approved application/package layout, deterministic tooling baseline, validated non-secret runtime configuration, and API error/correlation conventions. | None | API bootstrap rejects invalid configuration before serving; request IDs are generated/propagated; error responses and telemetry contain no sensitive values. | Config, request-ID, error-contract, and redaction unit/API tests. |
| TASK-PLAT-002 | SEC-003, SEC-004, OBS-006 | Secrets | Define runtime secret-provider boundary, redaction policy, and local/CI secret handling. | PLAT-001 | No credential is in source, logs, errors, or client configuration. | Secret/redaction checks. |
| TASK-PLAT-003 | WS-008, SEC-001, SEC-002 | Persistence | Establish workspace-scoped persistence conventions, transaction tenant context, non-owner app DB role, and RLS baseline. | PLAT-001, PLAT-002 | Unscoped/cross-workspace persistence is denied; app role cannot bypass RLS. | Database/RLS integration tests. |
| TASK-PLAT-004 | JOB-001–004, OBS-004 | Jobs | Establish durable job envelope, idempotency key, bounded retry/DLQ policy, and worker correlation propagation. | PLAT-001 | Duplicate jobs are safe; retry exhaustion is visible and routed to DLQ. | Job retry/idempotency integration tests. |
| TASK-PLAT-005 | OBS-001, OBS-005–006 | Observability | Add structured logging, error capture, trace propagation, and telemetry redaction middleware. | PLAT-001, PLAT-002 | API and worker errors have correlated, sanitized telemetry. | Telemetry propagation/redaction tests. |
| TASK-PLAT-006 | SEC-003, OBS-005 | Delivery | Establish CI checks for formatting/type/lint/tests, secret scanning, dependency/security scanning, and artifact health checks. | PLAT-001, PLAT-002 | Pull requests fail on configured quality/security violations. | CI pipeline validation. |

### Foundation contract sequencing

TASK-PLAT-001 → TASK-PLAT-002 → TASK-PLAT-003. TASK-PLAT-003 consumes only TASK-PLAT-002's reviewed public secret-resolution, secret/non-secret configuration separation, sanitized-failure, and redaction contracts through the existing configuration/observability boundaries. Provider implementations and database internals remain independent. Complete TASK-PLAT-002 before starting TASK-PLAT-003; TASK-PLAT-005/006 may overlap with TASK-PLAT-003 after their prerequisites and shared-file ownership are settled.

This scheduling clarification does not change PRD requirement mappings or declare either task implemented. The separate ADR-0006 persistence prerequisite for TASK-PLAT-004 still requires reconciliation; its existing parallelization list is not evidence that it can complete before TASK-PLAT-003.

## Sprint 01 — Identity, workspace, RBAC, audit

| Task | PRD | Area | Description | Dependencies | Acceptance criteria | Tests required |
|---|---|---|---|---|---|---|
| TASK-AUTH-001 | AUTH-001, AUTH-002, AUTH-004 | Authentication | Integrate the ADR-0007-approved managed identity provider for registration, login, and refresh verification with internal-user provisioning. | PLAT-001–003, PLAT-005; approved ADR-0007 provider-selection record | Valid identity lifecycle creates/maps an internal user; invalid credentials are rejected without token/credential exposure. | Provider adapter, token-validation, provisioning, and auth integration tests. |
| TASK-AUTH-002 | AUTH-003, AUTH-005 | Authentication | Implement logout/session invalidation and password-reset initiation/completion integration. | AUTH-001 | Logout/recovery follows provider lifecycle without exposing tokens. | Auth lifecycle integration tests. |
| TASK-AUTH-003 | AUTH-006 | Identity | Implement authenticated profile read/update boundary. | AUTH-001 | A user updates only their own profile. | Authorization/API tests. |
| TASK-AUTH-004 | AUTH-007, AUTH-008, OBS-005–006 | Authentication | Record safe authentication outcomes and redact sensitive identity failures. | AUTH-001–002, PLAT-005 | Success/failure events are observable with no credentials/tokens. | Log redaction and event tests. |
| TASK-WS-001 | WS-001, WS-002, WS-003, WS-008 | Workspace | Implement workspace creation, unique identifier, membership linkage, and workspace switching/listing. | AUTH-001, PLAT-003 | Creator is a member; users see only their own workspaces. | Repository/API/RLS integration tests. |
| TASK-WS-002 | WS-004, WS-005 | Membership | Implement owner-authorized invitation and member removal lifecycle. | WS-001, RBAC-001 | Only owners perform changes; invitation/removal is tenant-scoped. | Policy/API/E2E invitation tests. |
| TASK-WS-003 | WS-006, WS-007 | Workspace | Implement owner role assignment and workspace settings update boundaries. | WS-001, RBAC-001 | Only allowed actor updates role/settings; changes are auditable. | Policy/API tests. |
| TASK-WS-004 | WS-008, RBAC-003, SEC-001–002 | Tenancy | Apply tenant context/policy guard to workspace-resource routes and repositories. | PLAT-003, WS-001 | Cross-workspace resources return no data and cannot mutate. | Cross-tenant integration suite. |
| TASK-RBAC-001 | RBAC-001, RBAC-004, RBAC-005 | Authorization | Define OWNER, ADMIN, AGENT, VIEWER permission matrix and server-side policy service. | WS-001 | Each membership has one role and policy outcome is deterministic. | Permission-matrix unit tests. |
| TASK-RBAC-002 | RBAC-002, RBAC-003, SEC-002 | Authorization | Integrate policy checks into authenticated API/service boundaries. | RBAC-001, WS-004 | UI cannot bypass server authorization. | Route/service authorization tests. |
| TASK-RBAC-003 | RBAC-004, RBAC-005 | Frontend access | Apply role-aware navigation/actions while retaining server enforcement. | RBAC-001 | Users see only permitted actions; read-only views cannot submit writes. | Component/E2E role tests. |
| TASK-AUDIT-001 | AGENT-009, HANDOFF-007, SEC-009 | Audit | Implement append-only audit event foundation with actor/action/target/outcome/request ID. | PLAT-003, PLAT-005 | Application paths cannot update/delete audit events. | Audit permission/integration tests. |

## Sprint 02 — Knowledge ingestion

| Task | PRD | Area | Description | Dependencies | Acceptance criteria | Tests required |
|---|---|---|---|---|---|---|
| TASK-KB-001 | KB-001, KB-005, KB-008, RBAC-004 | Knowledge | Implement tenant-scoped knowledge-source/version model and processing-state transitions. | WS-004, RBAC-002 | Authorized admin creates sources with valid states only. | State-machine/RLS tests. |
| TASK-KB-002 | KB-003, KB-005–006 | Knowledge | Implement text and FAQ source creation, versioning, enqueueing, and status display contract. | KB-001, PLAT-004 | Text/FAQ processing is asynchronous and reaches ready/failed state. | API/job integration tests. |
| TASK-KB-003 | KB-002, KB-005–006, SEC-008 | Files | Implement exact-asset authorized upload flow with server-generated object keys and source status. | KB-001, PLAT-002–004 | Supported upload is private, validated, and queued without exposing storage credentials. | Upload authorization/type/size tests. |
| TASK-KB-004 | KB-004, KB-005–006, SEC-008 | URLs | Implement URL source validation, SSRF-safe fetch job, and status reporting. | KB-001, PLAT-004 | Private-network/invalid redirects/content are rejected; valid URL is queued. | SSRF and fetch integration tests. |
| TASK-KB-005 | KB-006–007, JOB-001–004 | Parsing | Implement worker parser/normalizer contract for text, FAQ, PDF, and URL content. | KB-002–004, PLAT-004 | Valid sources yield normalized content; failures are safe/observable/retry-bounded. | Parser fixtures and job tests. |
| TASK-KB-006 | KB-006–008, KB-010, JOB-004 | Indexing | Implement chunk/version, embedding, and transactional index-activation jobs. | KB-005 | Only successful current versions become retrievable; duplicate work is safe. | Chunk/index idempotency integration tests. |
| TASK-KB-007 | KB-007–008, AGENT-005, RUNTIME-003, SEC-001 | Retrieval | Implement workspace/source-authorized full-text/vector retrieval and returned-chunk ownership validation. | KB-006, WS-004 | Retrieval cannot return another workspace or unselected source content. | Cross-tenant/allowed-source retrieval tests. |
| TASK-KB-008 | KB-009–010, JOB-001–004 | Lifecycle | Implement source update/reprocessing and immediate retrieval disable plus asynchronous deletion cleanup. | KB-001, KB-006 | Updated source serves last ready version until replacement; deleted source is not retrievable. | Version/delete/job tests. |
| TASK-KB-009 | KB-011, RUNTIME-003 | Citations | Implement stable source/version/chunk citation references and source-display API contract. | KB-007 | A retrieval result carries resolvable, tenant-authorized source reference metadata. | Citation integrity/API tests. |

## Sprint 03 — Agent and AI runtime

| Task | PRD | Area | Description | Dependencies | Acceptance criteria | Tests required |
|---|---|---|---|---|---|---|
| TASK-AGENT-001 | AGENT-001–004, WS-008 | Agent config | Implement tenant-scoped agent records, create/update/deactivate, and at-most-one-active support-agent invariant. | WS-004, RBAC-002 | Draft/inactive history is retained; no workspace has more than one active agent. | State/policy/RLS tests. |
| TASK-AGENT-002 | AGENT-005–006 | Agent config | Implement selected knowledge-source association and versioned instructions. | AGENT-001, KB-001 | Agent can use only its selected sources and current approved instructions. | Association/version tests. |
| TASK-AGENT-003 | AGENT-007–008, RUNTIME-004–005, SEC-005–006 | Tools | Implement agent tool-grant model and MVP `request_handoff` registry/schema. | AGENT-001 | An ungranted/invalid tool invocation is denied before execution. | Tool grant/schema/policy tests. |
| TASK-AGENT-004 | AGENT-009, SEC-009 | Audit | Emit append-only audit events for agent configuration/activation/source/tool changes. | AGENT-001–003, AUDIT-001 | Every material configuration change has actor, before/after-safe metadata, and outcome. | Audit integration tests. |
| TASK-AGENT-005 | AGENT-001–003, RUNTIME-002 | Agent selection | Implement simple active-agent selector and persist resolved agent/configuration version on execution. | AGENT-001 | Runtime selects only the active tenant agent and historical execution remains reproducible. | Selector/version persistence tests. |
| TASK-AI-001 | RUNTIME-001, RUNTIME-006–007, SEC-008, OBS-002 | Provider gateway | Implement provider-neutral chat/embedding gateway boundary, safe request shaping, and AI trace creation. | PLAT-002, PLAT-005 | Provider calls have sanitized traces and no direct domain-provider coupling. | Adapter integration tests with test provider. |
| TASK-AI-002 | RUNTIME-002–003, KB-011, SEC-007–008 | Context/RAG | Implement bounded context assembly, authorized retrieval use, citations, and untrusted-content separation. | AI-001, AGENT-002, KB-007–009 | Only approved context is sent; response has source references where knowledge is used. | Context/citation/injection tests. |
| TASK-AI-003 | RUNTIME-004–005, RUNTIME-008–009, SEC-005–006 | Execution | Implement bounded runtime state machine, structured tool proposal validation, grant checks, and loop/limit enforcement. | AI-001, AGENT-003 | Model cannot self-authorize; tool/turn/time/token limits terminate safely. | Tool/limit/malformed-call tests. |
| TASK-AI-004 | RUNTIME-010, HANDOFF-002–003, SEC-007 | Guardrails | Implement controlled failure/low-confidence/high-risk escalation decisions and configurable escalation conditions. | AI-002–003, AGENT-003 | Failure or unsafe outcome returns controlled response or handoff request. | Failure/escalation evaluation tests. |
| TASK-AI-005 | RUNTIME-006–007, OBS-002–003, OBS-006 | AI telemetry | Persist execution/tool spans, retrieval metadata, termination/error class, token and estimated-cost measures with redaction. | AI-001–004 | Every execution has trace ID and sanitized operational record. | Trace/usage/redaction tests. |
| TASK-AI-006 | RUNTIME-001–010, SEC-007 | AI evaluation | Establish versioned non-production evaluation fixtures for grounding, citation, tool, escalation, and injection regression tests. | AI-002–005 | A deterministic release suite detects defined unsafe/ungrounded regressions. | Evaluation suite execution. |

## Sprint 04 — Chat and handoff

| Task | PRD | Area | Description | Dependencies | Acceptance criteria | Tests required |
|---|---|---|---|---|---|---|
| TASK-CHAT-001 | CHAT-001–002, SEC-010 | Public chat | Implement revocable/rotatable deployment credential validation, origin policy, and per-deployment/IP/session abuse limits. | PLAT-002, WS-004 | Public request resolves only its configured workspace and exceeds no quota. | Credential/rate-limit/abuse tests. |
| TASK-CHAT-002 | CHAT-001–004, CHAT-006, SEC-001 | Conversations | Implement tenant-bound customer session, conversation, message persistence, and continuation token/session flow. | CHAT-001, WS-004 | Customer can start/resume only the intended conversation; history persists. | Conversation/RLS/session tests. |
| TASK-CHAT-003 | CHAT-003–005, RUNTIME-001–002, OBS-001 | Streaming | Orchestrate persisted customer message, runtime invocation, and SSE response stream. | CHAT-002, AI-002–005 | Stream corresponds to persisted conversation/execution and reconnect does not lose durable messages. | SSE/integration/reconnect tests. |
| TASK-CHAT-004 | CHAT-007, HANDOFF-004–006, RBAC-002 | Support inbox | Implement workspace-scoped inbox/list/detail API and role-authorized support views. | CHAT-002, RBAC-002 | Support users view only permitted workspace conversations. | RBAC/RLS/API tests. |
| TASK-CHAT-005 | CHAT-007, HANDOFF-005–006, SEC-009 | Human reply | Implement human ownership, agent reply, and conversation resolution transitions. | CHAT-004, AUDIT-001 | Authorized support agent takes ownership, replies, and resolves; actions are recorded. | State/policy/E2E tests. |
| TASK-CHAT-006 | CHAT-004–005, HANDOFF-004, OBS-001 | Realtime | Publish durable conversation/handoff events through WebSocket with cursor/reconnect behavior. | CHAT-002, CHAT-004 | Inbox receives persisted event; reconnect resumes from cursor. | WebSocket/event replay tests. |
| TASK-HANDOFF-001 | HANDOFF-001, HANDOFF-007 | Customer handoff | Implement customer-requested handoff command and durable handoff event. | CHAT-002, AUDIT-001 | Customer request moves eligible conversation to escalated state and records event. | Command/state/audit tests. |
| TASK-HANDOFF-002 | HANDOFF-002–003, RUNTIME-004–005 | AI handoff | Connect authorized `request_handoff` tool and configured escalation conditions to handoff lifecycle. | AGENT-003, AI-003–004, HANDOFF-001 | AI may request but cannot bypass handoff policy; reason is recorded. | Tool-to-handoff integration tests. |
| TASK-HANDOFF-003 | HANDOFF-004–005, CHAT-007 | Assignment | Implement escalated queue visibility and atomic ownership assignment. | CHAT-004, HANDOFF-001 | Escalated conversations appear once; ownership conflicts are resolved safely. | Concurrency/API/E2E tests. |
| TASK-HANDOFF-004 | HANDOFF-006–007, SEC-009, OBS-003 | Handoff audit | Complete human-response/handoff audit, trace, and notification event coverage. | CHAT-005, HANDOFF-002–003 | Handoff lifecycle is queryable and correlated to conversation/runtime/tool event. | Audit/trace integration tests. |

## Sprint 05 — Analytics and release readiness

| Task | PRD | Area | Description | Dependencies | Acceptance criteria | Tests required |
|---|---|---|---|---|---|---|
| TASK-ANALYTICS-001 | ANALYTICS-001, ANALYTICS-005, OBS-001 | Analytics | Define and emit workspace-scoped conversation, handoff, execution, and tool-usage events. | CHAT-002–005, AI-005 | Events have tenant/correlation context and no cross-workspace aggregation. | Event schema/RLS tests. |
| TASK-ANALYTICS-002 | ANALYTICS-002–004, JOB-001–004 | Analytics | Implement idempotent aggregate jobs for AI resolution, escalation rate, and agent usage. | ANALYTICS-001, PLAT-004 | Replaying events does not double-count; failed aggregates are observable. | Aggregate/idempotency tests. |
| TASK-ANALYTICS-003 | ANALYTICS-001–005, RBAC-005 | Analytics UI | Implement workspace-authorized basic analytics dashboard. | ANALYTICS-002, RBAC-002 | Authorized users see only their workspace’s metrics. | API/RBAC/E2E dashboard tests. |
| TASK-OPS-001 | OBS-001–006, RUNTIME-006–007, JOB-003–004 | Operations | Complete dashboards/alerts for API, queue, ingestion, AI, tools, handoffs, errors, and cost. | PLAT-004–005, AI-005, CHAT-006 | Operators can correlate a failure from request to job/runtime/tool. | Telemetry smoke tests. |
| TASK-OPS-002 | SEC-001–010, OBS-005–006 | Security assurance | Execute and remediate secret, dependency, authorization/RLS, public API, upload/URL, and telemetry-redaction checks. | Sprints 00–04 | No known release-blocking security control gap remains. | Security test suite/review evidence. |
| TASK-OPS-003 | JOB-001–004, RUNTIME-010, OBS-004–005 | Resilience | Exercise provider timeout, failed job/DLQ, duplicate delivery, worker restart, and safe handoff/failure paths. | PLAT-004, AI-004, CHAT-003 | Failure modes preserve data and provide controlled customer/operator outcomes. | Resilience integration drills. |
| TASK-OPS-004 | SEC-003–004, SEC-009, OBS-005 | Release operations | Document and verify backup/restore, rollback, secret rotation, incident, and agent-disable operational procedures. | Sprints 00–04 | Runbooks are reviewed and one restore/rollback exercise succeeds. | Runbook drill evidence. |
| TASK-QA-001 | AUTH-001–008, WS-001–008, RBAC-001–005, KB-001–011 | E2E | Automate the identity/workspace/knowledge portions of the PRD success flow. | Sprints 01–02 | Core setup flow passes against an isolated test environment. | E2E suite. |
| TASK-QA-002 | AGENT-001–009, CHAT-001–007, HANDOFF-001–007, RUNTIME-001–010 | E2E/AI | Automate agent configuration, grounded response, customer/AI handoff, human reply, and resolution flow. | Sprints 03–04 | Complete support journey passes with citations and controlled escalation. | E2E and AI evaluation suite. |
| TASK-QA-003 | ANALYTICS-001–005, SEC-001–010, OBS-001–006 | Release gate | Execute final traceability, accessibility/responsive review, performance smoke, documentation, and release-readiness review. | ANALYTICS-003, OPS-001–004, QA-001–002 | Every MVP requirement is accounted for and all release gates have evidence. | Release checklist and smoke evidence. |

## Shared Definition of Done

A task is done only when all applicable items are complete:

- **Implementation:** narrowly scoped implementation satisfies its cited PRD requirement(s), uses approved architecture/ADRs, handles expected error states, and introduces no unapproved feature.
- **Unit tests:** business rules, validation, state transitions, and permission decisions are covered.
- **Integration tests:** changed persistence, auth, queue, storage, provider, retrieval, and tool boundaries are covered as applicable.
- **E2E tests:** a user-facing flow is covered when the task changes a user-visible capability; core PRD flows remain green.
- **AI evaluation:** prompt, retrieval, provider, tool, routing, or escalation changes pass relevant groundedness, citation, tool, escalation, and injection regression fixtures.
- **Security:** tenant isolation, server-side authorization, input validation, secret handling, telemetry redaction, and public-abuse controls are reviewed/tested as applicable.
- **Observability:** correlation/trace IDs, safe logs, metrics, errors, and audit events are added or verified for important paths.
- **Documentation:** API/operational/architecture/ADR documentation is updated only when the approved design changes; assumptions are surfaced for approval.
- **Code review:** a reviewer verifies scope, dependency compatibility, tests, security, and traceability; no unresolved critical findings remain.
- **PRD traceability:** the task and implementation evidence reference only valid PRD requirement IDs; [TRACEABILITY.md](TRACEABILITY.md) is updated if status or task mapping changes.
