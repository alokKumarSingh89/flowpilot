# Durable Queue and Idempotent Background Workers

## Status

Accepted.

## Context

Document processing, embedding, analytics, notifications, and future synchronization must not block user requests. Jobs need retries, controlled retry loops, observability, and idempotency.

## Decision

Use BullMQ backed by Redis initially, with a separate `apps/worker` deployment. Redis must be deployed with persistence, backup, availability, access control, and monitoring appropriate to the durability requirements of queued work; it is not an ephemeral cache-only dependency for this use. Persist business job state and idempotency keys in PostgreSQL, use bounded exponential retry with jitter, record exhausted work in a controlled failed-job/DLQ workflow, and propagate workspace/correlation/trace IDs.

## Alternatives Considered

- In-process asynchronous tasks: not durable across restarts and cannot scale independently.
- A separately managed queue service: deferred for MVP; reconsider if Redis durability, availability, or operational evidence no longer meets job requirements.
- Workflow engine: useful for future long-lived workflows but excessive for MVP.

## Consequences

Workers must make handlers idempotent and distinguish safe retries from uncertain operations. Failed work is visible and replayed through controlled operations. BullMQ and Redis configuration are operational dependencies that must be exercised by the resilience and restore work before release.

## PRD Requirements

KB-005–006, KB-010; JOB-001–004; OBS-004; Non-Functional Requirements.
