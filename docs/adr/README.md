# Architecture Decision Records

ADRs capture durable, non-trivial engineering decisions. They document approved direction, alternatives, consequences, and PRD traceability; they do not replace the PRD.

| ADR | Decision | Status |
|---|---|---|
| [ADR-0001](ADR-0001-modular-monolith.md) | Modular monolith with independently deployed API and workers | Proposed |
| [ADR-0002](ADR-0002-api-and-realtime.md) | REST/OpenAPI with SSE and WebSockets | Proposed |
| [ADR-0003](ADR-0003-tenant-isolation.md) | Shared PostgreSQL tenancy with server-scoped context and RLS | Proposed |
| [ADR-0004](ADR-0004-knowledge-and-vector-search.md) | PostgreSQL/pgvector knowledge architecture | Proposed |
| [ADR-0005](ADR-0005-ai-runtime-and-provider-gateway.md) | Bounded AI runtime and provider gateway | Proposed |
| [ADR-0006](ADR-0006-durable-background-jobs.md) | Durable queue and idempotent workers | Proposed |
| [ADR-0007](ADR-0007-managed-identity.md) | Managed identity provider | Proposed |
| [ADR-0008](ADR-0008-observability-and-audit.md) | OpenTelemetry, separated audit trail, and AI telemetry | Proposed |

Status is `Proposed` until formally accepted. Future changes require a new ADR or a superseding ADR, plus explicit approval when scope or architecture changes.
