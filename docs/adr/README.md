# Architecture Decision Records

ADRs capture durable, non-trivial engineering decisions. They document approved direction, alternatives, consequences, and PRD traceability; they do not replace the PRD.

| ADR | Decision | Status |
|---|---|---|
| [ADR-0001](ADR-0001-modular-monolith.md) | pnpm TypeScript modular monolith with independently deployed API and workers | Accepted |
| [ADR-0002](ADR-0002-api-and-realtime.md) | NestJS REST/OpenAPI with SSE and WebSockets | Accepted |
| [ADR-0003](ADR-0003-tenant-isolation.md) | PostgreSQL/Prisma tenancy with server-scoped context and RLS | Accepted |
| [ADR-0004](ADR-0004-knowledge-and-vector-search.md) | PostgreSQL/pgvector knowledge architecture | Accepted |
| [ADR-0005](ADR-0005-ai-runtime-and-provider-gateway.md) | Bounded AI runtime and provider gateway | Accepted |
| [ADR-0006](ADR-0006-durable-background-jobs.md) | BullMQ/Redis durable jobs and idempotent workers | Accepted |
| [ADR-0007](ADR-0007-managed-identity.md) | Managed identity provider with FlowPilot internal user profile | Accepted |
| [ADR-0008](ADR-0008-observability-and-audit.md) | OpenTelemetry-compatible observability, separated audit trail, and AI telemetry | Accepted |

An ADR is `Proposed` until formally accepted. Future changes require a new ADR or a superseding ADR, plus explicit approval when scope or architecture changes.
