# Managed Identity Provider with Internal User Profile

## Status

Proposed.

## Context

The MVP includes account lifecycle, password reset, session refresh, profile updates, and safe authentication logging. Owning password/session security increases product risk without being core differentiation.

## Decision

Use a managed identity provider for authentication and retain an internal user profile keyed by the provider subject. The backend verifies credentials/tokens and maps them to workspace membership and RBAC.

## Alternatives Considered

- Self-hosted identity: more control but substantial security, operational, and maintenance burden.
- Auth library embedded in the application: efficient for simple cases but makes password/reset abuse controls the team's responsibility.

## Consequences

Identity vendor selection and account-recovery policy remain implementation choices. Provider data must not substitute for application authorization or tenant isolation.

## PRD Requirements

AUTH-001–008; WS-003–006; RBAC-001–003; SEC-002–004.
