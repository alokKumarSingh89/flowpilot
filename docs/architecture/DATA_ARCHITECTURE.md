# Data Architecture

## Data principles

- PostgreSQL is the transactional system of record; all workspace-owned records carry non-null `workspace_id`. [WS-008; SEC-001]
- Tenant filtering is enforced by application tenant context and PostgreSQL row-level security defense in depth. The application database role must not own tenant tables or have `BYPASSRLS`; exceptional administrative access is separately controlled.
- Private object storage holds file bytes; database records hold metadata, lifecycle status, and server-generated object keys. Short-lived upload/download URLs are issued only after tenant authorization for the exact asset and operation. [KB-002; SEC-008]
- Append-only histories preserve messages, execution events, analytics events, and audits. Audit records use append-only permissions; application paths cannot update or delete them. [CHAT-004; AGENT-009; HANDOFF-007; SEC-009]

## Core relationships

```text
User --< WorkspaceMembership >-- Workspace
Workspace --< KnowledgeSource --< KnowledgeSourceVersion --< KnowledgeChunk
Workspace --< Agent --< AgentKnowledgeSource
Workspace --< Conversation --< Message
Conversation --< Handoff / Assignment
Conversation --< AgentExecution --< ToolExecution
Workspace --< AnalyticsEvent / Aggregate
Workspace --< AuditEvent
```

## Major entities

| Entity | Purpose | Requirements |
|---|---|---|
| User, Workspace, WorkspaceMembership | Identity linkage, tenant, member role | AUTH-006, WS-001–008, RBAC-001 |
| KnowledgeSource, Version, Chunk, FileAsset | Source lifecycle, normalized/indexed content, source references | KB-001–011 |
| Agent, InstructionVersion, AgentKnowledgeSource, AgentToolGrant | Configurable and auditable agent behavior | AGENT-001–009 |
| CustomerIdentity/Session, Conversation, Message | Customer continuity and retained history | CHAT-001–007 |
| Handoff, Assignment | Escalation reason, queue/owner and human takeover | HANDOFF-001–007 |
| AgentExecution, ToolExecution | Bounded runtime trace and authorized tool outcomes; execution stores resolved agent and immutable configuration version | RUNTIME-004–010 |
| Job | Business work status/idempotency separate from queue provider metadata | JOB-001–004 |
| AnalyticsEvent/Aggregate, UsageLedger | Metrics, token and estimated cost accounting | ANALYTICS-001–005; PRD §14 |
| AuditEvent | Security and configuration history | AGENT-009, HANDOFF-007, SEC-009 |

## Knowledge data lifecycle

A source is `UPLOADED`, `PROCESSING`, `READY`, or `FAILED`. A changed source produces a new version; a ready previous version may continue serving while re-indexing completes. Deletion immediately removes a source from retrieval and schedules physical cleanup, while retaining a minimal audit tombstone. [KB-005–010]

Each chunk stores source/version identity, page/section/URL location, content hash, token count, embedding model version, and vector. Every retrieval query applies workspace, active-version, and agent-selected-source authorization predicates; returned chunks are ownership-validated before context assembly. Use an index/query strategy that preserves filtered retrieval correctness as corpus size grows. Citations stored on AI messages point to immutable source/version/chunk references. [AGENT-005; KB-011; RUNTIME-003]

## Data retention and sensitive data

The PRD requires retained conversation history but does not specify retention durations, deletion rights, residency, or customer-data classification. Define retention schedules and deletion processes with the product owner/legal stakeholders before production. Do not persist secrets, raw password/reset data, or unnecessary raw AI prompt content in telemetry. [AUTH-008; SEC-003–004, SEC-008; OBS-006]

## Assumptions

`pgvector` and PostgreSQL full-text search are recommended for MVP. A dedicated vector database and analytical warehouse are post-MVP scale options, not confirmed requirements.
