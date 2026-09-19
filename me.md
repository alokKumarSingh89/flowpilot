# 1. Step

```text
You are the Lead Engineer and Software Architect for the FlowPilot project.

Read docs/product/PRD.md completely before doing anything else.

IMPORTANT:
This is a PLANNING-ONLY task.

Do NOT:

- write application code
- create application source files
- install dependencies
- initialize frameworks
- create database schemas
- implement APIs
- implement UI
- implement AI agents
- create migrations
- start the application
- modify the PRD

Your responsibility in this task is to transform the product requirements into a professional engineering architecture.

Analyze the PRD and produce a detailed architecture proposal covering:

1. Product understanding
   - What FlowPilot is
   - Primary users
   - Core user journeys
   - MVP boundary
   - Explicitly identify what is NOT part of MVP

2. Domain architecture
   Identify the major business domains and their responsibilities.

3. System architecture
   Propose the overall architecture for:
   - frontend
   - backend/API
   - authentication
   - authorization/RBAC
   - database
   - cache
   - background jobs
   - realtime communication
   - file/document processing
   - knowledge ingestion
   - embeddings/vector search
   - AI/LLM integration
   - AI agent runtime
   - tool execution
   - human handoff
   - analytics
   - audit logging
   - observability

4. Multi-tenancy
   Explain exactly how tenant/workspace isolation should work.

5. AI architecture
   Design the AI runtime conceptually.

   Explain:
   - conversation context
   - knowledge retrieval
   - tool calling
   - permissions
   - prompt/instruction handling
   - model abstraction
   - provider abstraction
   - guardrails
   - prompt injection considerations
   - human escalation
   - AI observability
   - token/cost tracking

6. Knowledge/RAG architecture
   Explain:
   - supported source types
   - ingestion pipeline
   - document parsing
   - chunking
   - embeddings
   - indexing
   - retrieval
   - citations/source references
   - re-indexing
   - deletion
   - tenant isolation

7. Data architecture
   Identify the major entities and relationships.

8. API architecture
   Decide whether REST, GraphQL, or another approach is appropriate.
   Explain the reasoning.

9. Frontend architecture
   Explain:
   - application structure
   - state management
   - API communication
   - authentication
   - routing
   - reusable UI architecture
   - accessibility
   - responsive design

10. Background processing
    Identify jobs that should not run synchronously.

11. Security architecture
    Cover:
    - authentication
    - authorization
    - tenant isolation
    - secrets
    - API security
    - rate limiting
    - abuse prevention
    - prompt injection
    - tool permissions
    - sensitive data
    - audit logs

12. Observability
    Define:
    - logs
    - metrics
    - traces
    - AI-specific telemetry
    - correlation/request IDs
    - audit events
    - error tracking

13. Testing strategy
    Cover:
    - unit tests
    - integration tests
    - API tests
    - E2E tests
    - AI evaluation tests
    - security tests
    - performance tests

14. Local development architecture

15. CI/CD architecture

16. Deployment architecture

17. Scalability strategy

18. Failure handling and resilience

19. Cost-control strategy
    Especially AI/LLM, embeddings, storage, and background processing.

20. Technology selection
    Recommend technologies for each major component.

    For every major technology choice provide:
    - recommendation
    - reason
    - alternatives considered
    - trade-offs

Do NOT blindly choose technologies just because they are common.
Choose technologies appropriate for a real SaaS product that could eventually scale.

21. Architecture risks

22. Important architectural decisions that should become ADRs.

23. Requirement traceability

For every major architectural decision, reference the relevant PRD requirement IDs.

Use the requirement IDs from PRD.md such as:
AUTH-xxx
WS-xxx
RBAC-xxx
KB-xxx
AGENT-xxx
CHAT-xxx
HANDOFF-xxx
ANALYTICS-xxx
RUNTIME-xxx
SEC-xxx
JOB-xxx
OBS-xxx

24. Architecture maturity

Clearly separate:

MVP
Recommended after MVP
Future / scale stage

25. Open questions

Identify requirements that are ambiguous or need product-owner confirmation.

IMPORTANT OUTPUT RULE:

Do not create files yet.

Return the architecture proposal in your response only.

At the end provide:

A. Proposed architecture
B. Technology decisions
C. Major domains
D. ADR candidates
E. Risks
F. Open questions
G. Recommended engineering roadmap

Do not start implementation until I explicitly approve the architecture.
```

# 2. Step

```text
The architecture analysis is complete.

Now convert the approved architecture analysis into project documentation.

IMPORTANT:
- Do NOT implement application code.
- Do NOT install dependencies.
- Do NOT create application source code.
- Do NOT create database migrations.
- Do NOT modify the PRD.
- Do NOT invent product requirements that are not in the PRD.

Create the following documentation:

docs/
├── product/
│   └── PRD.md
├── architecture/
│   ├── SYSTEM_ARCHITECTURE.md
│   ├── DOMAIN_ARCHITECTURE.md
│   ├── AI_ARCHITECTURE.md
│   ├── DATA_ARCHITECTURE.md
│   ├── SECURITY_ARCHITECTURE.md
│   ├── OBSERVABILITY.md
│   └── TESTING_STRATEGY.md
└── adr/
    └── README.md

Also create:

AGENTS.md

AGENTS.md must be concise.

It should contain:
- project purpose
- repository structure
- architectural principles
- development rules
- testing expectations
- security expectations
- documentation rules
- PRD requirement traceability rule
- instructions for future coding agents
- instructions not to modify architecture or product scope without approval

Do not put the entire PRD or architecture documentation inside AGENTS.md.

For architecture documentation:

1. Preserve the important decisions from the architecture analysis.
2. Clearly distinguish MVP, post-MVP, and future architecture.
3. Reference PRD requirement IDs wherever applicable.
4. Do not create fake requirement IDs.
5. Identify assumptions separately from confirmed requirements.

For ADRs:

Create an ADR index in:

docs/adr/README.md

List the architectural decisions that should be recorded as ADRs.

For each important decision, create a separate ADR file using:

docs/adr/ADR-XXXX-<short-name>.md

Each ADR should contain:

# Title

## Status

## Context

## Decision

## Alternatives Considered

## Consequences

## PRD Requirements

Do not create ADRs for trivial implementation details.

Before creating the files, inspect the repository and confirm that you are only adding documentation/configuration files.

After completion, provide a summary of:
- files created
- architecture decisions documented
- ADRs created
- assumptions made
- anything that still requires product-owner approval

Do not implement application code.
```

# 3. Step

If Codex made a questionable architectural decision, don't immediately ask it to change everything.

First ask it:

```md
Review your architecture against docs/product/PRD.md.

Identify any architectural decisions that could conflict with:

- MVP scope
- multi-tenancy
- security
- AI tool permissions
- scalability
- future multi-agent orchestration

Do not modify files.

Return only the identified risks and proposed corrections.
```

# 4. Step

Then, if necessary:

```md
Apply only the approved architectural corrections.

Do not implement application code.
Do not change the PRD.
Update only the affected architecture and ADR documentation.

After updating, summarize exactly what changed and why.
```
