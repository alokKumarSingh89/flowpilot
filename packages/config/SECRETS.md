# Runtime secrets contract

TASK-PLAT-002 implements the provider-neutral boundary for SEC-003, SEC-004, and
OBS-006. It does not select a managed secret vendor, configure a database, expose
an API, or implement the logging/exporter pipeline owned by TASK-PLAT-005.

## Public server contract

Import `createSecretResolver`, `SecretProvider`, `SecretResolver`, `SecretValue`,
and `SecretResolutionError` from `@flowpilot/config`. These contracts are Node-only;
never import secret resolution into a browser bundle or pass secret values to a
client. The existing runtime configuration loader continues to accept only
non-secret bootstrap settings and does not read secret environment variables.

Trusted bootstrap code injects a `SecretProvider` and its least-privilege list of
allowed logical references. References are 1–128 lowercase ASCII characters,
begin with a letter, and consist of alphanumeric segments separated by `.`, `_`,
or `-`. They are logical identifiers, not credentials, paths, URLs, or provider
resource locators. The adapter owns mapping them to approved secret locations.
The resolver snapshots grants and denies all references not explicitly granted
before invoking the provider. Never derive grants or references from request
parameters. This is a service-bootstrap capability, not workspace authorization;
tenant-specific credential retrieval is not implemented or authorized here.

`SecretProvider.read(reference, signal)` returns a promise resolving to a raw
string, or `undefined` when missing. Any thrown/rejected provider failure becomes
`SECRET_UNAVAILABLE`; its message, cause, stack, metadata, and reference are not
retained. Null, non-string, blank, and NUL-containing results are `SECRET_INVALID`.
Other strings are preserved exactly; consumer-specific format validation belongs
to the consuming boundary. Malformed references yield `SECRET_REFERENCE_INVALID`,
ungranted references `SECRET_ACCESS_DENIED`, and missing results `SECRET_MISSING`.

Resolution waits at most 5 seconds by default, configurable to an integer between
1 and 30,000 milliseconds. Timeout aborts the supplied signal and returns
`SECRET_UNAVAILABLE`. Adapters must honor cancellation and avoid logging raw
values/errors; the wrapper cannot stop an adapter that ignores cancellation or
blocks the event loop. There are no automatic retries, caching, fallback
credentials, environment reads, or provider SDK dependencies. Subsequent calls
re-read the provider, allowing it to supply rotated values.

Resolved `SecretValue` instances keep plaintext in a private field. JSON
serialization, string coercion, and Node inspection redact it. `reveal()` is the
explicit escape hatch for passing plaintext directly to a trusted server-side
consumer; never log, serialize, spread into diagnostics, or return that plaintext.
This wrapper prevents accidental disclosure, not access by malicious code in the
same process, and does not promise memory zeroization.

## Diagnostics and correlation

Import `sanitizeDiagnostic` from `@flowpilot/observability`. Pass a trusted outcome
code, for example `SECRET_RESOLVED` or a caught `SecretResolutionError.code`.
It returns only `event`, an allow-listed `code`, and the current correlation ID.
Unknown input, including raw errors/configuration objects, becomes
`UNEXPECTED_ERROR` without property traversal, getters, or serialization.
This deliberately discards details instead of trying to find every possible
credential field. Never merge raw context into its output or encode secret values
in correlation IDs. Use the existing request context, or establish a bootstrap
context with `createRequestContext` and `requestContextStorage.run`.

The helper emits nothing itself; safe records can be used by the later telemetry
pipeline. No audit store, metrics backend, or exporter is introduced by this task.

## Local and CI handling

- Commit only variable names, public configuration, and clearly synthetic fixtures.
  All `.env` variants, including `.env.test`, are ignored except `.env.example`;
  the example must remain non-secret. Git ignore is not a secret scanner.
- Local test providers use synthetic in-memory fixtures. Do not copy production
  credentials into tests, snapshots, command arguments, or build artifacts.
- Real runtime credentials must come from the approved managed-secret deployment
  integration once selected. Do not introduce an implicit plaintext environment
  fallback in production.
- Future CI integrations obtain least-privilege non-production values from an
  approved secret facility at execution time, never from repository files or
  untrusted pull requests. Disable shell tracing for secret handling and avoid
  printing environment/configuration dumps; CI masking is only defense in depth.
- No real secret or live account is needed for the tests introduced here. Secret
  scanning and CI enforcement remain TASK-PLAT-006.

## TASK-PLAT-003 consumption example

```ts
import { createSecretResolver, type SecretProvider } from '@flowpilot/config';

const provider: SecretProvider = {
  read: () => Promise.resolve('synthetic-private-value'),
};
const resolver = createSecretResolver(provider, ['service.connection']);
const connection = await resolver.resolve('service.connection');
// TASK-PLAT-003 may pass connection.reveal() directly to its trusted bootstrap.
// Keep connection separate from public runtime configuration and summaries.
```

TASK-PLAT-003 owns database-specific validation and connection setup. It consumes
only these public exports and safe diagnostic codes, with no import of provider
internals, SDKs, cache/storage details, or environment parsing. The integration
example is exercised through package exports in
`apps/api/test/secrets-contract.spec.ts`; provider failure and redaction behavior
are also covered by package unit tests.
