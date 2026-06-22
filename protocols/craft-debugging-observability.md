# Debugging & Observability (craft: production visibility)

Debugging is systematic hypothesis elimination, not random code changing. Observability is the property that lets you understand a system's state from its outputs — without attaching a debugger to production.

**Apply in this order:**

1. **Reproduce before fixing** — a bug you cannot reproduce reliably is a bug you will not fix reliably. Write a failing test or minimal repro case before touching production code. This also prevents "fixed by coincidence."
2. **Isolate the variable** — binary search the problem space. Bisect git history (`git bisect`) to find the commit that introduced the bug. Disable half the code path and confirm which half contains the fault.
3. **Read the error message fully** — including the stack trace, the cause chain, and the line numbers. Most bugs announce themselves clearly; the skill is resisting the urge to guess before reading.
4. **Structured logging** — logs are not print statements. Every log line should include: timestamp, severity, correlation/trace ID, service name, and structured fields (not interpolated strings). `{"level":"error","traceId":"abc123","userId":"u_42","msg":"payment failed","error":"card_declined"}` beats `"Payment failed for user 42: card_declined"` in every log aggregator.
5. **Metrics for system health** — instrument: request rate, error rate, latency (p50/p95/p99), saturation (queue depth, CPU, memory). The RED method (Rate, Errors, Duration) covers most service monitoring. The USE method (Utilization, Saturation, Errors) covers infrastructure.
6. **Distributed tracing for service boundaries** — in any multi-service system, a single user request crosses multiple services. Without distributed tracing (OpenTelemetry, Jaeger, Tempo), you cannot reconstruct a request's path. Instrument trace IDs from ingress to egress.
7. **Error monitoring with context** — Sentry, Rollbar, or equivalent. Every unhandled exception in production should create an actionable alert with: stack trace, breadcrumbs, user context, and environment. Raw logs are not error monitoring.
8. **Alerts on symptoms, not causes** — alert on "error rate > 1% for 5 minutes" not on "CPU > 80%". CPU spikes happen routinely and don't always mean user impact. User-facing error rate always means user impact.

**Hygiene:**

- DO include trace/correlation IDs in every log, every API response header (`X-Request-Id`), and every error message. You will need them at 2am.
- DO log at the right level: DEBUG (development only), INFO (normal operations), WARN (unexpected but handled), ERROR (failure requiring action), FATAL (immediate intervention needed).
- DO set up alerting before the first production deploy, not after the first outage.
- DON'T log sensitive data: passwords, tokens, PII, payment card data. Log the event, not the payload.
- DON'T silence exceptions with empty catch blocks — if you catch and do nothing, the bug is hidden, not fixed.
- DON'T alert on everything — alert fatigue is a reliability risk. Every alert must be actionable.

**Mastery markers:**

- Professional: can diagnose a production issue without access to the machine using only logs, metrics, and traces; designs observability into features before shipping; treats an unactionable alert as a bug in the alerting system.
- Beginner: adds `console.log` debugging to production; writes `catch(e) {}` to silence errors; discovers production issues from user reports rather than internal monitoring.

**Failure signals:**

- Production incident diagnosed by SSH-ing to the server and `tail -f`-ing raw logs — no structured logging, no aggregation.
- Error monitoring not set up in production — bugs discovered by users, not alerts.
- Alert firing continuously for 48 hours with no one assigned to resolve or silence it (alert fatigue).
- No correlation IDs — impossible to trace a user's request across services in a distributed system.
- Catch block that logs nothing and returns an empty 200 — hiding failures from both the user and the operator.
