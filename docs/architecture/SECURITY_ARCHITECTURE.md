# Security Architecture

## Security objectives

FlowPilot must enforce server-side authorization and tenant isolation, protect credentials, restrict agent tools, validate inputs, protect public APIs, account for prompt injection, minimize AI exposure of sensitive data, and audit security-sensitive operations. [SEC-001–010]

## Identity, authorization, and tenancy

- Use a managed identity provider for registration, login, logout, refresh, reset, and secure session lifecycle. Authentication failures are recorded without sensitive details. [AUTH-001–008]
- Resolve workspace membership and role server-side for each authenticated request. UI visibility is not authorization. [RBAC-001–005]
- Carry immutable tenant context through API, services, repositories, jobs, caches, object storage, retrieval, and tools. Every workspace-owned query includes workspace scope; RLS is a second control. The application database role must not own tenant tables or bypass RLS; privileged operational access is exceptional and controlled. [WS-008; RBAC-003; SEC-001–002]
- Customer chat uses scoped, server-resolved public deployment credentials, not member credentials. Credentials are revocable/rotatable and protected by per-deployment/IP/session quotas and abuse controls. Origin validation is an additional browser protection, not authorization. [CHAT-001–006; SEC-010]

## Data, secrets, and APIs

- Store provider/integration credentials in a managed secret manager; encrypt in transit and at rest; rotate them; never commit or log them. [SEC-003–004]
- Validate request and tool schemas, enforce payload/size limits, idempotency where needed, CORS policy, rate limits, WAF/bot controls, and secure cookie/CSRF controls where applicable. [SEC-006, SEC-010]
- Uploads are private, type/size/signature validated and scanned before parsing. Object keys are server-generated; signed URLs are short-lived and authorized against the exact asset and operation. URL ingestion blocks SSRF via network, redirect, content, and timeout restrictions. [KB-002; SEC-008]

## AI and tool safety

Treat customer messages and retrieved documents as untrusted. Platform safety rules, tenant instructions, data, and tool contracts remain separate. Retrieved content cannot grant access, change system rules, reveal secrets, or authorize tools. [SEC-007–008]

The model only proposes typed tool calls. The runtime independently verifies agent grant, workspace, conversation state, argument schema, risk policy, rate limits, and idempotency. The configurable MVP registry includes `request_handoff`; knowledge retrieval is an internal capability rather than a model-authorized tool. External or action tools require separate approval. [AGENT-007–008; RUNTIME-004–005; SEC-005–006]

## Audit and incident readiness

Record immutable, redacted audit events for membership/role changes, agent configuration, source lifecycle, handoff, tool use, and security-sensitive actions. Enforce append-only audit permissions and prevent application update/delete paths. Separate audit records from operational logs. Maintain alerting, access review, key rotation, backup/restore, and incident response runbooks. [AGENT-009; HANDOFF-007; SEC-009; OBS-005–006]

## Scope stages and assumptions

MVP includes the controls above. Post-MVP may add stronger enterprise controls such as SSO, dedicated tenant infrastructure, and formal compliance tooling; enterprise SSO is explicitly not MVP. [PRD §15]

Assumptions requiring confirmation: compliance obligations, data residency, retention/deletion periods, MFA policy, and whether customer chat must support authenticated end customers.
