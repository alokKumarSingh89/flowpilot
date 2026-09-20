export type EnvironmentName = 'development' | 'production' | 'test';

export interface RuntimeConfig {
  readonly environment: EnvironmentName;
  readonly port: number;
  readonly serviceName: string;
}

export interface SafeRuntimeConfigSummary {
  readonly environment: EnvironmentName;
  readonly port: number;
  readonly serviceName: string;
}

export class ConfigurationError extends Error {
  readonly code = 'CONFIGURATION_INVALID';

  constructor(readonly issues: readonly string[]) {
    super('Runtime configuration is invalid.');
    this.name = 'ConfigurationError';
  }
}

const validEnvironments = new Set<EnvironmentName>(['development', 'production', 'test']);
const serviceNamePattern = /^[a-z][a-z0-9-]{0,62}$/;

export function loadRuntimeConfig(environment: NodeJS.ProcessEnv): RuntimeConfig {
  const issues: string[] = [];
  const nodeEnvironment = environment.NODE_ENV;
  const portValue = environment.API_PORT;
  const serviceName = environment.SERVICE_NAME ?? 'api';

  if (nodeEnvironment === undefined || !validEnvironments.has(nodeEnvironment as EnvironmentName)) {
    issues.push('NODE_ENV must be development, test, or production.');
  }

  const port = Number(portValue);
  if (
    portValue === undefined ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65_535 ||
    !/^\d+$/.test(portValue)
  ) {
    issues.push('API_PORT must be an integer between 1 and 65535.');
  }

  if (!serviceNamePattern.test(serviceName)) {
    issues.push('SERVICE_NAME must be a lowercase service identifier.');
  }

  if (issues.length > 0) {
    throw new ConfigurationError(issues);
  }

  return {
    environment: nodeEnvironment as EnvironmentName,
    port,
    serviceName,
  };
}

export function summarizeRuntimeConfig(config: RuntimeConfig): SafeRuntimeConfigSummary {
  return {
    environment: config.environment,
    port: config.port,
    serviceName: config.serviceName,
  };
}
