# Shared PostgreSQL Tenancy with Server-Scoped Context and RLS

## Status

Proposed.

## Context

Workspaces must never access another workspace's data. The MVP needs practical operating cost and supports multiple workspaces per user.

## Decision

Use shared PostgreSQL infrastructure. Every workspace-owned record has `workspace_id`; server-derived tenant context scopes all access; PostgreSQL row-level security provides defense in depth. The application database role does not own tenant tables and cannot bypass RLS; exceptional operational access is separately controlled. Apply the same scope to vectors, caches, storage, jobs, and tools. Object keys are server-generated and signed URLs require exact asset/operation authorization.

## Alternatives Considered

- Database per tenant: strongest isolation but costly and operationally complex for SMB MVP.
- Schema per tenant: migration/connection management complexity with limited advantages.
- Application filters only: insufficient protection against omitted predicates.

## Consequences

Cross-tenant denial tests are mandatory, including public-chat, retrieval, cache, storage, job, and tool paths. Administrative/background access needs tightly controlled bypasses. Future enterprise residency or high-scale tenants may require dedicated data planes.

## PRD Requirements

WS-003, WS-008; RBAC-001–003; KB-008; CHAT-002; ANALYTICS-005; SEC-001–002.
