# Bounded AI Runtime and Provider Gateway

## Status

Proposed.

## Context

The PRD requires context, retrieval, authorized tools, observability, execution limits, controlled failure, human control, and provider flexibility. It explicitly does not require multi-agent orchestration in MVP.

## Decision

Use an in-house bounded runtime state machine and a provider-neutral AI gateway. A simple MVP selector resolves at most one active support agent per workspace while preserving agent and immutable configuration-version identity on executions. The model may propose typed calls only for tools in the configured registry; the runtime independently authorizes and validates them. Enforce turn, tool, time, token, and output limits; record AI traces and usage.

## Alternatives Considered

- Autonomous-agent framework: accelerates experimentation but obscures safety and control boundaries.
- Direct provider SDK calls from domains: couples application behavior to one provider.
- Multi-agent orchestration: explicitly outside MVP.

## Consequences

The team owns a small but explicit orchestration layer and must maintain provider adapters and evaluation coverage. The configurable MVP tool registry includes `request_handoff`; retrieval remains an internal runtime capability. Future routing/orchestration can replace the MVP selector without rewriting historical executions. External/action tools remain separately approved.

## PRD Requirements

AGENT-006–008; RUNTIME-001–010; HANDOFF-001–003; SEC-005–008; OBS-002–003.
