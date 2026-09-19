# Modular Monolith with Independently Deployed API and Workers

## Status

Proposed.

## Context

FlowPilot needs multiple business domains, asynchronous ingestion, realtime conversation handling, and a production-quality operational baseline. The MVP does not justify the coordination and operational overhead of independently deployed domain microservices.

## Decision

Use one modular backend codebase with explicit domain boundaries. Deploy stateless API/BFF and background-worker processes independently so their scaling and failure behavior are isolated.

## Alternatives Considered

- Microservices per domain: stronger process isolation but premature distributed-system complexity.
- Single API process for all work: simpler initially but risks slow ingestion affecting customer conversations.
- Serverless-only functions: viable in places but can complicate long streams and worker concurrency.

## Consequences

The team must preserve module boundaries and avoid cross-domain database shortcuts. API and worker deployments can scale independently; later service extraction remains possible when backed by operational evidence.

## PRD Requirements

KB-006; CHAT-005; JOB-001–004; OBS-004; Non-Functional Requirements.
