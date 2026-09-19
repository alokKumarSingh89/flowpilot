# OpenTelemetry, Separate Audit Trail, and AI Telemetry

## Status

Accepted.

## Context

The PRD requires structured logs, metrics, distributed traces, AI/tool/job visibility, error tracking, correlation IDs, and auditable sensitive operations without leaking sensitive data.

## Decision

Adopt an OpenTelemetry-compatible architecture for structured logs, metrics, and traces. Assign request correlation IDs at ingress and AI trace IDs at runtime. Maintain a separate durable, append-only audit-event model for business/security actions; application mutation paths cannot update or delete audit records. Record sanitized AI metadata and token/cost usage by execution. The `packages/observability` boundary owns shared correlation and telemetry contracts; exporter/vendor selection remains deployment configuration and must not leak into domain modules.

## Alternatives Considered

- Logs only: insufficient to connect user requests, jobs, providers, and tools.
- Audit data in operational logs: weak retention/query integrity and high privacy risk.
- Provider-only AI tracing: creates lock-in and incomplete system visibility.

## Consequences

Instrumentation and redaction are required work for all important paths. Retention/access policies for customer content need confirmation before detailed prompt capture.

## PRD Requirements

AGENT-009; HANDOFF-007; RUNTIME-006–007; SEC-009; OBS-001–006; Product Success Metrics §14.
