# System Architecture

## Status and scope

This document records the approved target architecture and technical baseline for FlowPilot. Confirmed product scope comes from the PRD; the baseline constrains implementation technology but does not add product features.

### MVP

FlowPilot is a multi-tenant SaaS for at most one active, knowledge-grounded customer-support agent per workspace, customer chat, human handoff, basic analytics, RBAC, and audit logging. Agent records and configuration history may exist without being active. [AUTH-001–008; WS-001–008; RBAC-001–005; KB-001–011; AGENT-001–009; CHAT-001–007; HANDOFF-001–007; ANALYTICS-001–005]

### Post-MVP

Add evaluated external read-only integrations, richer retrieval/evaluation, and analytics only after the MVP boundaries and safety controls are proven.

### Future / scale

Consider action integrations, multi-agent orchestration, workflow execution, dedicated tenant infrastructure, warehouse analytics, and enterprise capabilities only as separately approved product scope.

## Architecture overview

```text
Admin console / customer chat widget
              | HTTPS, SSE, WebSocket
              v
      Stateless API and BFF layer ---- Managed identity provider
              |\
              | \--- AI provider gateway
              |
              +--- PostgreSQL + pgvector (system of record)
              +--- Redis (cache, rate limits, fan-out, BullMQ backing store)
              +--- Private object storage (documents)
              +--- Durable queue and worker deployments
              +--- Telemetry, audit, and error-tracking services
```

The MVP is a pnpm TypeScript modular monolith on Node.js 24 LTS: one backend codebase organized by domains, deployed as independently scalable API and worker processes. It avoids early distributed-service complexity while retaining clear domain interfaces.

## Component responsibilities

| Component | Responsibility | Relevant requirements |
|---|---|---|
| Admin console | Workspace administration, knowledge, agent settings, support inbox, analytics, audit access | WS-004–007, KB-001–010, AGENT-001–009, HANDOFF-004–006, ANALYTICS-001–005 |
| Customer chat | Starts/resumes chats, receives streamed AI or human messages, displays citations and handoff state | CHAT-001–006, KB-011, HANDOFF-001 |
| API | NestJS REST/OpenAPI API; auth verification, tenant resolution, RBAC, resource APIs, conversation orchestration, streaming | AUTH-001–008, RBAC-002–003, CHAT-005, SEC-001–002 |
| Workers | BullMQ worker process for ingestion, embedding, index lifecycle, analytics aggregation, notifications, cleanup | KB-006, JOB-001–004 |
| PostgreSQL | Prisma 7 transactional data access/migrations, RLS defense-in-depth, full-text and vector indexes | WS-008, SEC-001, KB-007–008 |
| Object storage | Private originals and processed file assets | KB-002, SEC-008 |
| AI gateway/runtime | Context, retrieval, provider access, tools, limits, traces, controlled failures | RUNTIME-001–010 |

The managed identity provider authenticates users and manages its supported account lifecycle. The API validates provider-issued credentials, maps the immutable provider subject to a FlowPilot internal user, and then applies FlowPilot workspace membership and RBAC. Provider organizations, groups, and claims are not tenant authorization. The identity adapter is the only application boundary that uses provider-specific SDKs or token formats. [AUTH-001–008; WS-008; RBAC-001–003; SEC-001–004]

## Interfaces and realtime behavior

REST/JSON with OpenAPI is the primary API style. It matches resource-oriented workspace, knowledge, agent, and conversation APIs and keeps authorization and idempotency explicit. SSE streams AI responses; WebSockets publish durable inbox, assignment, and handoff notifications. Persist an event before publishing it, and reconnect clients from a cursor. [CHAT-004–005; HANDOFF-004]

Public customer-chat APIs are distinct from authenticated admin APIs. Public access uses a server-resolved, scoped deployment credential that is revocable and rotatable, plus per-deployment/IP/session quotas and abuse protections; it never receives a workspace-user credential. CORS/origin checks are additional browser protections, not authorization. [CHAT-001–006; SEC-010]

## Background work and resilience

Parsing, URL retrieval, scanning, chunking, embedding, re-indexing, deletion cleanup, analytics aggregation, and notifications are asynchronous. Jobs have idempotency keys, bounded exponential retries, dead-letter handling, trace/correlation IDs, and visible failure states. [KB-005–006; JOB-001–004; OBS-004]

The API remains stateless and scales horizontally. Durable persistence precedes realtime fan-out. For AI/provider failure, respond safely and offer escalation rather than retrying uncertain work. Retain the last known-good knowledge version while a replacement source is processing. [RUNTIME-010; HANDOFF-002]

## Approved technical baseline

- **Language/runtime:** TypeScript on Node.js 24 LTS.
- **Repository:** pnpm monorepo with `apps/api`, `apps/web`, and `apps/worker`; shared boundaries are `packages/config`, `packages/database`, `packages/contracts`, `packages/observability`, `packages/auth`, and `packages/ai`.
- **Applications:** NestJS backend, REST/JSON API with OpenAPI/Swagger documentation, and Next.js/React/TypeScript frontend.
- **Data and jobs:** PostgreSQL with Prisma 7, PostgreSQL/pgvector for initial vector search, Redis, and BullMQ initially for background jobs.
- **Validation and quality:** strong runtime validation at external boundaries; ESLint, Prettier, Husky, lint-staged, Vitest, Supertest, Playwright, Docker Compose for local infrastructure, and GitHub Actions for CI.
- **Operations:** OpenTelemetry-compatible structured logging, metrics, tracing, and correlation/request IDs.
- **AI:** provider-neutral internal abstraction; domain logic must not be coupled to a model-provider SDK.

The approved baseline does not authorize product functionality, authentication implementation, database schema, provider selection, or deployment-specific vendors beyond the named engineering technologies.

## Confirmed requirements vs assumptions

Confirmed: multi-tenancy, RBAC, knowledge source types, one MVP support agent, streaming where appropriate, handoff, retries, observability, and horizontal scalability where appropriate.

Assumptions requiring approval: JavaScript widget plus hosted customer chat, the at-most-one-active-agent interpretation, a managed-cloud single-primary-region deployment, and the detailed MVP tool registry. These assumptions do not add product features.
