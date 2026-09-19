# Durable Queue and Idempotent Background Workers

## Status

Proposed.

## Context

Document processing, embedding, analytics, notifications, and future synchronization must not block user requests. Jobs need retries, controlled retry loops, observability, and idempotency.

## Decision

Use a managed durable queue with dead-letter queues and separate worker deployments. Persist business job state and idempotency keys, use bounded exponential retry with jitter, and propagate workspace/correlation/trace IDs.

## Alternatives Considered

- In-process asynchronous tasks: not durable across restarts and cannot scale independently.
- Redis-only queue: productive but makes job durability dependent on cache infrastructure.
- Workflow engine: useful for future long-lived workflows but excessive for MVP.

## Consequences

Workers must make handlers idempotent and distinguish safe retries from uncertain operations. Failed work is visible and replayed through controlled operations.

## PRD Requirements

KB-005–006, KB-010; JOB-001–004; OBS-004; Non-Functional Requirements.
