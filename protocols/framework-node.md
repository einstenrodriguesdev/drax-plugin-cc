# Node.js (framework: Node runtime)

Node is a single-threaded async I/O runtime — blocking the event loop is the cardinal sin. The runtime rewards correct async patterns, stream-based I/O, and minimal trust of external input.

## Best practices

1. **ESM everywhere** — `"type": "module"` in `package.json`; `.mjs` for mixed-module projects; `import` at top level; avoid dynamic `require()`.
2. **Streams for large data** — pipe `fs.createReadStream` → transform → `createWriteStream` instead of loading files into memory; use `pipeline()` from `node:stream/promises` (handles cleanup and error propagation).
3. **`AsyncLocalStorage` for request context** — pass trace IDs, user context, and request-scoped data through `AsyncLocalStorage`; avoid threading context through every function parameter.
4. **Validate all external input at the boundary** — parse and validate every HTTP request body, env variable, and file content with Zod or a schema validator before use; never trust shape from outside the process.
5. **Environment variables via a single validated module** — read `process.env` in one `config.ts`; validate required vars at startup; throw with a clear message if missing; export typed constants.
6. **Graceful shutdown** — listen for `SIGTERM`/`SIGINT`; stop accepting connections; drain in-flight requests; close DB pools; exit within 10 seconds.
7. **Least privilege for the process** — run as a non-root user in containers; use `--permission` flag (Node 22+) to restrict file system and network access in workers.
8. **Worker threads for CPU-bound work** — offload parsing, compression, or crypto to `worker_threads`; the main thread handles I/O only.

## Hygiene

- No `eval`, `new Function()`, or `vm.runInThisContext` with external input — remote code execution.
- No synchronous file system calls (`readFileSync`, `writeFileSync`) in request handlers — blocks the event loop.
- No `process.exit()` except in graceful-shutdown handlers — let unhandled errors surface to the process `uncaughtException` handler.
- Handle `'error'` events on every stream and `EventEmitter` — unhandled `'error'` events crash the process.
- Set timeouts on all outbound HTTP requests — never rely on the server to close the connection.
- Pin Node version in `.nvmrc` / `.tool-versions` and in `engines` field of `package.json`.

## Mastery markers

- Correctly implements backpressure: checks `writable.write()` return value and pauses the readable on `false`.
- Uses `AbortController` + `AbortSignal` to cancel fetch/stream/timer chains on request timeout.
- Profiles event loop lag with `--prof` and identifies blocking callbacks using the flame graph.
- Sets up a `diagnostics_channel` subscriber to instrument library internals (undici, postgres) without patching them.
- Understands `libuv` thread pool sizing (`UV_THREADPOOL_SIZE`) and when DNS/crypto/fs operations saturate it.

## Failure signals

- `readFileSync` inside an HTTP request handler (every request blocks).
- Missing error handler on a `net.Socket` or `http.IncomingMessage` stream.
- Environment variables read with `process.env.FOO` scattered across 40 files — no central validation.
- Secrets logged to `console.log` because request body is logged wholesale.
- `setInterval` without a `clearInterval` path — memory leak in long-running processes.
- Catching `process.on('uncaughtException', () => {})` and continuing — corrupted state is now hidden.
