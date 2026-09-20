# FlowPilot Agent Guide

## Purpose

FlowPilot is a multi-tenant SaaS platform for knowledge-grounded AI customer support with human handoff. The product source of truth is [docs/product/PRD.md](docs/product/PRD.md).

## Repository structure

- `docs/product/`: product requirements.
- `docs/architecture/`: approved system architecture and engineering guidance.
- `docs/adr/`: architectural decision records and their index.
- Application source directories will be added only through approved implementation work.

## Approved platform baseline

- Use Node.js 26 and the current stable, mutually compatible NestJS 12.x packages for the API foundation.
- Keep NestJS framework, platform-adapter, and companion packages on compatible majors; do not introduce Nest CLI or scaffolding dependencies unless a task requires them.

## Architectural principles

- Enforce workspace isolation and authorization server-side.
- AI augments humans; use explicit permissions, bounded execution, and human handoff.
- Keep AI, tool, job, and security-sensitive activity observable and auditable.
- Prefer a modular monolith with independently scalable API and worker deployments for the MVP.
- Preserve provider flexibility behind internal abstractions.

## Development rules

- Read the PRD and applicable architecture documents before changing behavior.
- Do not introduce product scope, integrations, autonomous agents, or action tools without approval.
- Keep tenant context explicit at every data, cache, file, job, retrieval, and tool boundary.
- Put long-running work in durable background jobs; make retries bounded and idempotent.

## Testing and security

- Add proportionate unit, integration, API, E2E, and AI-evaluation coverage for changed behavior.
- Test cross-workspace denial paths for every workspace-scoped capability.
- Never log or commit secrets, credentials, raw auth tokens, or unnecessary customer content.
- Validate all API and tool inputs; treat customer and retrieved content as untrusted.

## Documentation and traceability

- Map implementation and material design changes to valid PRD requirement IDs; never invent IDs.
- Update relevant architecture documentation and ADRs when an approved architectural decision changes.
- Do not modify the PRD, architecture, or product scope without explicit product/architecture approval.

## Instructions for future coding agents

Implement only approved work. Preserve documented boundaries, record assumptions or ambiguities for review, and ask for approval before materially changing an architectural decision or product requirement.
