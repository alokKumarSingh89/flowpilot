# PostgreSQL and pgvector for MVP Knowledge Retrieval

## Status

Proposed.

## Context

The MVP needs text, FAQ, URL, and PDF processing, searchable tenant-scoped content, citations, reprocessing, and deletion.

## Decision

Store source metadata, versions, chunks, and vectors in PostgreSQL using pgvector, with PostgreSQL full-text search as a complementary lexical signal. Store originals privately in object storage. Version source processing and apply workspace, active-version, and agent-approved-source authorization predicates in every retrieval query; validate returned chunk ownership before context assembly.

## Alternatives Considered

- Dedicated vector database: may scale further, but adds synchronization, tenancy, and operations complexity.
- Keyword-only search: does not adequately support semantic question answering.
- Document blobs in the database: worsens database cost and backup behavior.

## Consequences

Use an index/query strategy that preserves filtered retrieval correctness as corpus size grows, and measure corpus size, query latency, and filter quality before moving to a dedicated vector system. Embedding model/version metadata is required to support re-embedding.

## PRD Requirements

KB-001–011; AGENT-005; RUNTIME-003; SEC-008.
