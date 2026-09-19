import { ConfigurationError, loadRuntimeConfig } from '@flowpilot/config';

import { createApplication } from './application.js';

async function bootstrap(): Promise<void> {
  const config = loadRuntimeConfig(process.env);
  const application = await createApplication();
  await application.listen(config.port);
}

void bootstrap().catch((error: unknown) => {
  const code = error instanceof ConfigurationError ? error.code : 'STARTUP_FAILED';

  console.error(JSON.stringify({ event: 'api_startup_failed', code }));
  process.exitCode = 1;
});
