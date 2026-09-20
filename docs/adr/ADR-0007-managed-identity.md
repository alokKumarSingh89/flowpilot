# Managed Identity Provider with Internal User Profile

## Status

Accepted.

## Context

The MVP includes account lifecycle, password reset, session refresh, profile updates, and safe authentication logging. Owning password/session security increases product risk without being core differentiation.

## Decision

Use a managed identity provider for registration, login, logout, refresh, password reset, and provider-managed session security. Retain a FlowPilot internal user profile keyed by the immutable provider subject.

The identity provider authenticates a person; it does not authorize access to a FlowPilot workspace. The backend validates issued credentials at the authenticated API boundary, resolves the internal user by provider subject, and then resolves workspace membership and RBAC server-side.

Provider selection is intentionally separate from this decision. Before `TASK-AUTH-001` begins, an approved provider-selection record must identify the provider, production and non-production tenants/projects, supported lifecycle flows, token-verification configuration, redirect/callback origins, secret-management locations, and integration-test strategy. No task may select a provider implicitly.

## Alternatives Considered

- Self-hosted identity: more control but substantial security, operational, and maintenance burden.
- Auth library embedded in the application: efficient for simple cases but makes password/reset abuse controls the team's responsibility.

## Consequences

FlowPilot avoids custom password cryptography and provider-specific authorization coupling, but accepts a managed identity dependency. The identity adapter must keep provider SDKs and token formats out of workspace/RBAC domain services. The internal user profile preserves a stable application identity for audit records and a future approved provider migration.

Provider data, organizations, groups, and custom claims must not substitute for application authorization or tenant isolation. Account-recovery, MFA, social-login, enterprise-federation, retention, residency, and pricing choices remain provider-selection decisions; they are not authorized by this ADR alone.

## PRD Requirements

AUTH-001–008; WS-003–006; RBAC-001–003; SEC-002–004.
