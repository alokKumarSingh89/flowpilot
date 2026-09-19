# Observability

## Requirements

FlowPilot requires structured logs, metrics, distributed tracing, AI traces, error tracking, and correlation IDs, while excluding sensitive information from telemetry. [OBS-001–006]

## Telemetry model

| Signal | Minimum content | Requirements |
|---|---|---|
| Structured logs | timestamp, service, severity, request/correlation ID, trace ID, opaque workspace ID, event/error code | OBS-001, OBS-006 |
| Metrics | API latency/errors, queue depth/age/failures, worker throughput, DB/cache health, streams, handoffs | OBS-004–005 |
| Traces | browser/API/worker/provider spans using propagated trace context | OBS-001–002 |
| AI telemetry | execution/model/provider/config version, retrieval/tool spans, latency, tokens, estimated cost, stop/handoff reason | RUNTIME-006–007, OBS-002–003 |
| Audit | append-only durable actor/action/target/outcome records for important changes; separate write permissions from application mutation paths | AGENT-009, HANDOFF-007, SEC-009 |
| Error tracking | sanitized exception grouping by release/environment | OBS-005–006 |

Shared observability contracts, correlation context, and sanitization helpers live in `packages/observability`. They must remain OpenTelemetry-compatible and independent of exporter/vendor SDKs. Full structured logging, metrics, traces, and exporter configuration are introduced incrementally by the relevant platform and feature tasks.

## Correlation

Assign a correlation/request ID at ingress and propagate it through conversation messages, jobs, agent executions, tool calls, provider calls, and response headers. Each AI execution has an independent trace identifier. [OBS-001–004; RUNTIME-007]

## Privacy and retention

Do not put passwords, tokens, secrets, raw credentials, or unnecessary customer/document content into logs or traces. Prompt/message capture must be disabled or redacted by default in operational telemetry. Retention periods and privileged access rules require product-owner/legal confirmation. [AUTH-008; SEC-003–004, SEC-008; OBS-006]

## Stage plan

MVP: OpenTelemetry instrumentation, structured logs, request/AI/job correlation, error tracking, dashboards and alerts for API, queue, ingestion, AI failures, and cost.

Post-MVP: SLO/error-budget management, richer business dashboards, sampled sanitized prompt diagnostics.

Future: tenant-specific observability exports and advanced anomaly detection, subject to privacy and contract review.
