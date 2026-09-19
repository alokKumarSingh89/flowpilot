# Domain Architecture

## Scope stages

### MVP domains

| Domain | Responsibilities | Requirements |
|---|---|---|
| Identity and access | User profile, authentication/session integration, membership, roles, permissions | AUTH-001–008, WS-003–006, RBAC-001–005 |
| Workspace and tenancy | Workspace lifecycle/settings and tenant context | WS-001–008, SEC-001 |
| Knowledge | Text/FAQ/URL/PDF source lifecycle, processing status, retrieval references, deletion | KB-001–011 |
| Agent configuration | One active support agent, instructions, selected sources, tool grants, activation, audit | AGENT-001–009 |
| Conversation and handoff | Customer sessions, messages, history, streaming, ownership, escalation, resolution | CHAT-001–007, HANDOFF-001–007 |
| AI runtime and tools | Context, retrieval, bounded tool loop, authorization, controlled errors, traces | RUNTIME-001–010, SEC-005–008 |
| Jobs | Durable work lifecycle, retry/idempotency/failure visibility | JOB-001–004 |
| Analytics and audit | Workspace metrics; immutable important action records | ANALYTICS-001–005, AGENT-009, SEC-009 |

### Post-MVP domains

Integration management, enriched evaluations, additional read-only business data, and deeper analytics may be introduced only through approved scope.

### Future domains

Sales/billing agents, workflows, orchestration, marketplace, voice, multichannel delivery, SSO, and white-labeling are explicitly not MVP. [PRD §5.2, §15]

## Domain rules

- Every workspace-owned aggregate is accessed with a server-derived tenant context. [WS-008; RBAC-003; SEC-001]
- Identity owns the provider adapter and FlowPilot user provisioning. Workspace owns membership and role decisions; authenticated provider claims never grant workspace access by themselves. [AUTH-001–008; WS-003–008; RBAC-001–003]
- An agent belongs to one workspace, uses only selected knowledge, and only uses granted tools. The MVP selector resolves at most one active support agent; it must not be hard-coded as a workspace singleton. [AGENT-004–008]
- Conversation messages are retained; a handoff records a durable state transition and actor/reason. [CHAT-003–004; HANDOFF-007]
- Analytics is derived from durable domain events and remains workspace-scoped. [ANALYTICS-001–005]
- Audit is separate from general telemetry and records security-sensitive actions. [SEC-009; OBS-006]

## Bounded-context relationships

```text
Identity ─ membership/role ─> Workspace
Workspace ─ owns ─> Knowledge, Agent, Conversation, Audit, Analytics
Agent ─ authorizes ─> Knowledge sources and Tools
Conversation ─ invokes ─> AI Runtime ─ retrieves ─> Knowledge
Conversation ─ escalates ─> Handoff / Support ownership
All domains ─ emit ─> Audit and Analytics events
```

## Assumption

The PRD says one AI support agent for MVP while also requiring agent creation/update. The architecture treats this as permitting draft/history records but at most one active/deployed support agent per workspace. Conversations and executions retain the resolved agent and configuration version so a future approved routing/orchestration capability does not require rewriting conversation history. Product-owner confirmation is required.
