# Performance Engineering (craft: measure-first optimization)

Performance problems are measured, not guessed. The cardinal sin of performance work is optimizing code that is not the actual bottleneck. Measure first; then optimize the specific constraint.

**Apply in this order:**

1. **Profile before touching code** — use flame graphs (Pyroscope, async-profiler, Chrome DevTools) to find where time is actually spent. 80% of execution time is in 20% of the code, and it is rarely where you expect it.
2. **Algorithmic complexity first** — O(n²) at n=1000 is 1M operations. A better algorithm beats any micro-optimization. Know your complexity: nested loops over growing collections are O(n²) by default. Sorting is O(n log n). Hash lookups are O(1).
3. **Database is usually the bottleneck** — run `EXPLAIN ANALYZE` on slow queries before changing anything else. Add indexes on columns in `WHERE`, `JOIN`, and `ORDER BY` clauses. Avoid N+1 queries: one query per item in a loop. Use query batching, eager loading, or dataloader patterns.
4. **Caching with deliberate invalidation** — cache at the layer closest to the consumer. CDN for static/semi-static responses. Redis/Memcached for computed results. In-memory for hot read paths. Every cache must have a clear invalidation trigger — TTL alone is not a strategy for mutable data.
5. **Payload size matters** — over-fetching is a tax paid on every request. Return only the fields the consumer needs. Compress responses (gzip/brotli). Paginate. For frontend: code-split bundles, lazy-load images, serve next-gen formats (WebP/AVIF).
6. **Core Web Vitals ownership (frontend)** — LCP (Largest Contentful Paint) < 2.5s: optimize hero image delivery, reduce render-blocking resources. CLS (Cumulative Layout Shift) < 0.1: size images and ads explicitly. INP (Interaction to Next Paint) < 200ms: move heavy computation off the main thread, use web workers.
7. **Async and concurrency** — I/O-bound work (network, disk) should be non-blocking. CPU-bound work should be moved to a worker pool. Never block the event loop (Node.js) or the main thread (browser) with synchronous computation.
8. **Set performance budgets** — define SLOs (p95 latency < 300ms, LCP < 2.5s, bundle < 200kb) and enforce them in CI with Lighthouse CI, k6, or custom checks. Performance that is not gated will regress.

**Hygiene:**

- DO reproduce the problem under realistic load before optimizing. Local benchmarks with 10 records tell you nothing.
- DO benchmark before and after every optimization. If you can't measure the improvement, you don't know if you made one.
- DO consider the read/write ratio before adding a cache. Write-heavy paths with low read frequency don't benefit from caching.
- DON'T add indexes to every column — write-heavy tables pay the index maintenance cost on every INSERT/UPDATE.
- DON'T premature-optimize. "Premature optimization is the root of all evil" (Knuth) — but that quote is about micro-optimization, not ignoring algorithmic complexity.
- DON'T tune connection pool sizes, worker counts, or cache sizes without load testing under realistic concurrency first.

**Mastery markers:**

- Professional: starts every performance investigation with a profiler output, not an assumption; speaks in percentiles (p95, p99), not averages; understands the difference between latency and throughput and optimizes for the right one.
- Beginner: rewrites code in a "faster" language before profiling; adds caching everywhere without invalidation logic; reports average response time and misses tail latency problems.

**Failure signals:**

- N+1 query pattern discovered in production via slow query log, not during development.
- Performance optimization committed without a before/after benchmark in the PR.
- LCP above 4 seconds in production for a paid-traffic landing page.
- Cache added with no expiry or invalidation — serving stale data indefinitely.
- Bundle size growing 10% per sprint with no budget enforcement in CI.
