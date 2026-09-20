# AI Architecture

## Purpose and scope

The MVP AI runtime powers a knowledge-grounded customer-support agent. It is deliberately bounded and human-supervised; it is not a general autonomous-agent platform. [AGENT-001–009; RUNTIME-001–010; HANDOFF-001–003]

### MVP

- At most one active support agent per workspace, with configurable instructions, selected knowledge sources, and granted internal tools; inactive/draft records retain configuration history. [AGENT-001–008]
- Conversation-aware, source-cited knowledge retrieval and streamed response generation. [RUNTIME-001–003; CHAT-005; KB-011]
- A configurable MVP tool registry that includes `request_handoff`. Knowledge retrieval is an internal runtime capability, not a model-authorized tool, unless a later approved design makes it grantable. No external or action tools are in MVP.
- Execution limits, controlled errors, traces, and token/cost measurement. [RUNTIME-006–010]

### Post-MVP and future

Evaluated read-only integrations, richer retrieval/evaluation, and selectively approved business tools are post-MVP. Multi-agent orchestration and advanced workflows are future scope and explicitly not MVP. [PRD §5.2, §15]

## Runtime flow

```text
customer message
→ validate public/customer session and conversation state
→ resolve the active tenant-authorized agent and immutable configuration version
→ assemble bounded conversation context
→ retrieve authorized knowledge
→ call model through provider gateway
→ validate and authorize any proposed tool call
→ execute bounded tool / evaluate result
→ stream cited response, handoff, or controlled failure
→ persist execution, usage, audit, and telemetry
```

An execution has maximum model turns, tool calls, elapsed time, tokens, output length, and retry policy. Uncontrolled loops are terminated and converted to a safe customer response or escalation. [RUNTIME-008–010]

## Context and prompt handling

Context includes the current message, recent conversation turns, a summary of older history when needed, conversation/handoff state, approved agent instruction version, and compact retrieved source excerpts. [RUNTIME-002]

Instructions are layered: platform safety policy, workspace/agent instructions, runtime/tool constraints, retrieved source material, then customer input. Customer and retrieved text are untrusted data, not instructions. The runtime prevents source or customer text from changing policies, obtaining secrets, granting tools, or causing arbitrary actions. [AGENT-006; SEC-007–008]

## Retrieval, citations, and abstention

The runtime embeds the query, searches only ready workspace chunks from agent-selected sources, applies workspace/source/version authorization predicates in every retrieval query, validates returned chunk ownership before context assembly, and supplies bounded excerpts with stable source identifiers. AI responses persist citations as source/version/chunk references and render relevant sources to customers. [AGENT-005; KB-011; RUNTIME-003]

Low retrieval confidence, unsupported questions, policy risk, or uncertain results should produce a transparent limitation or human handoff, not fabricated claims. This is an engineering behavior supporting the PRD's human-control principle; numerical confidence thresholds require evaluation and approval.

## Tools and permissions

The model proposes a structured tool call; it never authorizes one. Each grantable tool has a versioned schema, risk class, timeout, idempotency semantics, and required permission. The execution boundary independently checks workspace, agent grant, conversation state, input schema, rate limits, and policy before calling it. [AGENT-007–008; RUNTIME-004–005; SEC-005–006]

Tool calls and outcomes are traceable and auditable. Future action tools require explicit approval, durable confirmation/idempotency design, and a dedicated ADR/security review.

## Provider and model abstraction

Application domains use provider-neutral interfaces in `packages/ai` for chat completion/streaming and embeddings. A gateway selects an approved model, applies timeout/retry/redaction/usage policy, normalizes responses, and emits telemetry. This avoids unnecessary single-provider coupling while avoiding premature automatic multi-provider routing. [Product Principle: Provider flexibility; RUNTIME-006]

## Guardrails, escalation, and failure

Guardrails enforce tool and token limits, output limits, sensitive-data minimization, injection controls, unsupported-intent handling, and agent/workspace kill switches. Escalate on customer request, configured conditions, repeated/runtime failure, high-risk request, or inadequate grounded answer. [HANDOFF-001–003; RUNTIME-009–010; SEC-007]

An escalated conversation is no longer autonomously answered until policy permits it. The runtime records handoff reason and execution termination state. [HANDOFF-004–007]

## AI telemetry and cost

Each execution records model/provider, model and prompt/configuration version, retrieval references/scores, tool attempts/outcomes, latency, token counts, estimated cost, stop reason, error class, and handoff reason. Do not store raw sensitive content by default. [RUNTIME-006–007; OBS-002–003, OBS-006; PRD §14]

## Assumptions requiring approval

The PRD does not specify model provider, moderation approach, numeric limits, default escalation rules, tool list beyond authorized-tool support, customer-data handling policy, or provider residency requirements. These must be decided before production use.
