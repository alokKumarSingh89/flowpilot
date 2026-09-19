# OpenTelemetry, Separate Audit Trail, and AI Telemetry

## Status

Proposed.

## Context

The PRD requires structured logs, metrics, distributed traces, AI/tool/job visibility, error tracking, correlation IDs, and auditable sensitive operations without leaking sensitive data.

## Decision

Adopt OpenTelemetry-compatible logs, metrics, and traces. Assign request correlation IDs and AI trace IDs. Maintain a separate durable, append-only audit-event model for business/security actions; application mutation paths cannot update or delete audit records. Record sanitized AI metadata and token/cost usage by execution.

## Alternatives Considered

- Logs only: insufficient to connect user requests, jobs, providers, and tools.
- Audit data in operational logs: weak retention/query integrity and high privacy risk.
- Provider-only AI tracing: creates lock-in and incomplete system visibility.

## Consequences

Instrumentation and redaction are required work for all important paths. Retention/access policies for customer content need confirmation before detailed prompt capture.

## PRD Requirements

AGENT-009; HANDOFF-007; RUNTIME-006–007; SEC-009; OBS-001–006; Product Success Metrics §14.
