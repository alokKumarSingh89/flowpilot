# REST/OpenAPI API with SSE and WebSockets

## Status

Proposed.

## Context

MVP resources are workspace, membership, knowledge, agents, conversations, and audit records. The product also requires streaming AI responses and timely support-dashboard updates.

## Decision

Use REST/JSON and OpenAPI for resource APIs, SSE for ordered AI response streaming, and WebSockets for support-inbox and handoff notifications. Persist durable events before realtime publication.

## Alternatives Considered

- GraphQL/subscriptions: flexible queries but raises authorization, query-cost, and caching complexity without clear MVP benefit.
- WebSockets for all realtime traffic: possible but heavier for one-way token streams.
- Polling: simpler but degrades conversation and handoff experience.

## Consequences

The API requires cursor pagination, typed errors, idempotency where appropriate, reconnection/event replay, and separate protection for public chat endpoints.

## PRD Requirements

CHAT-001–006; HANDOFF-004–006; RBAC-002–003; SEC-010.
