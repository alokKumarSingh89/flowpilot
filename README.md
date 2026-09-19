# FlowPilot

## Foundation commands

Use Node.js 26 and pnpm 11.

- `pnpm install`
- `pnpm format:check`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:api`
- `pnpm build`

Copy `.env.example` to a local `.env` only when a later task introduces runtime execution. The foundation accepts only the documented non-secret API bootstrap values. It does not configure databases, Redis, queues, identity providers, or AI providers.
