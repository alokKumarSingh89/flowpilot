import { fileURLToPath } from 'node:url';
import { defineConfig, defineProject } from 'vitest/config';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  test: {
    projects: [
      defineProject({
        test: {
          name: 'unit',
          include: ['packages/*/src/**/*.spec.ts'],
          environment: 'node',
        },
      }),
      defineProject({
        resolve: {
          alias: {
            '@flowpilot/config': `${root}packages/config/src/index.ts`,
            '@flowpilot/contracts': `${root}packages/contracts/src/index.ts`,
            '@flowpilot/observability': `${root}packages/observability/src/index.ts`,
          },
        },
        test: {
          name: 'api',
          include: ['apps/api/test/**/*.spec.ts'],
          environment: 'node',
        },
      }),
    ],
  },
});
