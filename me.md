# 1. Give this promt to read PRD and suggest the plan

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

# 2. Ask to creat step if you are okay with plan

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

# 3. Step Review the given architeck

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

# 4. Step fix if have any bug

Then, if necessary:

```md
Apply only the approved architectural corrections.

Do not implement application code.
Do not change the PRD.
Update only the affected architecture and ADR documentation.

After updating, summarize exactly what changed and why.
```

# Step 5 — Now ask Codex to become the Engineering Manager

```md
The architecture documentation is now approved.

Act as the Engineering Manager / Technical Program Lead for FlowPilot.

Read:

- docs/product/PRD.md
- AGENTS.md
- docs/architecture/\*
- docs/adr/\*

Your task is to transform the approved product requirements and architecture into an executable engineering plan.

IMPORTANT:

Do NOT implement application code.

Do NOT install dependencies.

Do NOT create application source files.

Do NOT change product requirements.

Do NOT silently add features.

Create:

docs/
└── planning/
├── ROADMAP.md
├── SPRINT_PLAN.md
├── TASK_BREAKDOWN.md
└── TRACEABILITY.md

The plan must be synchronized with the PRD.

Every implementation task MUST reference one or more PRD requirement IDs.

Example:

TASK-AUTH-001
PRD: AUTH-001, AUTH-002
Sprint: 01
Area: Authentication
Description: ...
Dependencies: ...
Acceptance Criteria: ...
Tests Required: ...

Create a realistic engineering roadmap.

Separate:

1. Foundation
2. MVP
3. Post-MVP
4. Future/Scale

For the MVP create explicit sprints.

Each sprint must contain:

- sprint number
- sprint goal
- PRD requirements covered
- architecture areas involved
- tasks
- dependencies
- parallelizable tasks
- sequential tasks
- acceptance criteria
- testing requirements
- security requirements
- observability requirements
- Definition of Done

Tasks must be small enough that a coding agent can implement them safely.

Avoid tasks such as:

"Build authentication."

Instead split them into meaningful implementation units.

Example:

- establish auth module
- user registration
- password hashing
- login
- session/token management
- authorization guard
- RBAC
- tests
- security tests

Identify which tasks can be implemented in parallel.

Identify which tasks require previous tasks.

Create a PRD-to-task traceability matrix.

Every PRD requirement must be classified as:

- planned
- implemented
- deferred
- future
- needs clarification

Do not leave requirements silently unaccounted for.

Create a Definition of Done covering:

- implementation
- unit tests
- integration tests
- E2E tests
- security
- observability
- documentation
- code review
- PRD traceability

The final plan must be practical for a small engineering team using AI coding agents.

Do not optimize for producing many tasks.

Optimize for safe, reviewable, independently verifiable tasks.

At the end provide:

1. Number of MVP sprints
2. Sprint goals
3. Dependencies
4. Parallelization opportunities
5. Highest-risk areas
6. Recommended agent roles
```

# Step 6 — Make Codex create individual task specifications

```md
We are now converting the approved engineering plan into executable agent tasks.

Read:

- AGENTS.md
- docs/product/PRD.md
- docs/architecture/\*
- docs/adr/\*
- docs/planning/ROADMAP.md
- docs/planning/SPRINT_PLAN.md
- docs/planning/TASK_BREAKDOWN.md
- docs/planning/TRACEABILITY.md

IMPORTANT:

This is still a planning/documentation task.

Do NOT:

- implement application code
- install dependencies
- create application source files
- modify the PRD
- change architecture decisions
- expand product scope

Create:

docs/planning/tasks/

Create one Markdown file for every implementation task.

Use this naming convention:

TASK-<DOMAIN>-<NUMBER>-<short-description>.md

Example:

TASK-AUTH-001-project-foundation.md
TASK-AUTH-002-user-registration.md
TASK-KB-001-knowledge-source-model.md

Each task file must contain:

# Task ID

# Title

# Sprint

# PRD Requirements

List exact PRD requirement IDs.

# Objective

Clearly explain what this task accomplishes.

# Context

Explain the relevant architecture and business context.

# Scope

Explicitly describe what is included.

# Out of Scope

Explicitly describe what must NOT be implemented.

# Dependencies

List task IDs that must be completed first.

# Parallelization

State whether this task can run in parallel with other tasks.

If yes, list compatible tasks.

# Expected Changes

Describe the expected areas/files/modules that may change.

Do not invent exact files if the architecture has not established them yet.

# API / Contract Changes

Describe APIs, events, interfaces, schemas, or contracts affected.

If none, say so.

# Data Changes

Describe database/schema changes.

If none, say so.

# Security Requirements

Describe security considerations.

# Observability Requirements

Describe logging, metrics, tracing, or audit requirements.

# Testing Requirements

Define:

- unit tests
- integration tests
- E2E tests where appropriate
- security tests where appropriate

# Acceptance Criteria

Use explicit testable criteria.

Example:

- [ ] User can register with valid credentials.
- [ ] Duplicate email is rejected.
- [ ] Password is never stored in plaintext.
- [ ] Appropriate validation errors are returned.
- [ ] Tests cover successful registration.
- [ ] Tests cover duplicate registration.

# Definition of Done

Include:

- implementation complete
- tests passing
- security requirements satisfied
- observability added where required
- documentation updated where required
- PRD traceability maintained
- no unrelated changes

# Agent Instructions

Give concise instructions to the coding agent.

# Human Review Checklist

Give the human reviewer a checklist.

IMPORTANT:

Tasks must be small enough for one coding agent to complete safely in one focused session.

Do not create giant tasks such as:

"Build authentication."

Split large domains into independently reviewable tasks.

Do not create duplicate tasks.

Every task must map to at least one PRD requirement.

Every PRD requirement must remain traceable.

After creating the files, validate:

1. Every task has a PRD requirement.
2. Every task belongs to a sprint.
3. Dependencies reference existing task IDs.
4. No circular dependencies exist.
5. Every PRD requirement is accounted for.
6. MVP tasks are separated from future work.

Finally produce a summary:

- total tasks
- tasks per sprint
- tasks per domain
- parallelizable tasks
- sequential dependencies
- PRD requirements without tasks
- tasks without PRD requirements
- possible oversized tasks
```

# Step 7 — Review the task structure

```md
Perform a task-plan consistency review.

Read:

- docs/product/PRD.md
- docs/planning/SPRINT_PLAN.md
- docs/planning/TASK_BREAKDOWN.md
- docs/planning/TRACEABILITY.md
- docs/planning/tasks/\*

Do NOT modify anything.

Check for:

1. Missing PRD requirements
2. Tasks without PRD references
3. Invalid task dependencies
4. Circular dependencies
5. Tasks that are too large
6. Duplicate responsibilities
7. Missing testing work
8. Missing security work
9. Missing observability work
10. Incorrect sprint ordering
11. Hidden scope expansion
12. MVP tasks depending on future features
13. Tasks that cannot realistically be completed independently by an agent

Return a structured review with:

- Critical problems
- High-risk problems
- Medium problems
- Minor improvements
- Recommended corrections

Do not modify files.
```

# 8.Step: If the review finds problems, use:

```md
Apply only the corrections identified in the previous task-plan review.

Before modifying files:

1. Verify each correction against docs/product/PRD.md.
2. Do not introduce new product scope.
3. Do not change approved architecture.
4. Do not implement application code.

Update only the affected planning/task documentation.

After changes, provide:

- files changed
- corrections made
- PRD requirements affected
- any remaining concerns
```

# 9. Step: Start the first Task(Read Only)

```md
You are now the Foundation Implementation Engineer for FlowPilot.

Read:

- AGENTS.md
- docs/product/PRD.md
- docs/architecture/\*
- docs/adr/\*
- docs/planning/SPRINT_PLAN.md

Find the first incomplete task in Sprint 01 whose dependencies are satisfied.

Before doing any implementation:

1. Read the complete task file.
2. Inspect the repository.
3. Inspect existing package/tooling configuration.
4. Check whether the task is actually ready.
5. Identify the files you expect to change.
6. Explain your implementation plan.

Do not implement until the plan is clear.

Then implement ONLY that task.

Rules:

- Follow AGENTS.md.
- Follow the architecture documentation.
- Follow the task specification.
- Do not modify the PRD.
- Do not silently change architecture.
- Do not implement future features.
- Do not modify unrelated files.
- Do not create unnecessary abstractions.
- Keep the change production-quality.
- Add required tests.
- Add required observability.
- Follow security requirements.

After implementation:

1. Run formatting/linting.
2. Run relevant unit tests.
3. Run relevant integration tests if applicable.
4. Check TypeScript/build errors.
5. Review your own diff.
6. Report:
   - files changed
   - implementation summary
   - tests executed
   - test results
   - architecture decisions made
   - PRD requirements satisfied
   - anything requiring human review

STOP after this task.

Do not automatically continue to the next task.
```
