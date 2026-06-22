# System Design (craft: scalable architecture)

System design is the discipline of making explicit trade-offs — choosing the right tool for the constraints, not the most impressive-sounding one. Every architecture decision is a bet on what will be the bottleneck.

**Apply in this order:**

1. **Start with requirements, not technology** — clarify functional requirements (what the system does), then non-functional (scale, latency SLAs, consistency needs, fault tolerance). Technology decisions follow from constraints, not the other way.
2. **Estimate before designing** — back-of-envelope math: requests/second, data volume per day, read/write ratio, storage at 1 year. Sizing tells you whether you need a Redis cache, a queue, or just a better index.
3. **SQL first, NoSQL when justified** — relational databases (Postgres, MySQL) handle most use cases, support ACID, and are well-understood. NoSQL (Cassandra, DynamoDB, MongoDB) solves specific problems: massive write throughput, schema-free data, wide-column access patterns. Wrong choice = years of regret.
4. **Apply CAP theorem consciously** — in a partition, you choose consistency or availability. Know which your feature requires. Banking: consistency. Social feed: availability. Don't default to "both" — distributed systems do not offer both under failure.
5. **Monolith first, microservices only under proven pain** — a monolith is operationally simpler, easier to test, faster to deploy. Migrate to services when: team autonomy is blocked by coupling, a component needs independent scaling, or deployment velocity is provably constrained by the monolith.
6. **Caching layers: know their invalidation story** — CDN (static assets), reverse proxy cache (API responses), application-level (Redis/Memcached), query-level. Cache invalidation is the hard part. Every cache needs an expiry strategy or an explicit invalidation event.
7. **Event-driven / async for decoupling and throughput** — Kafka for high-throughput durable event streams; RabbitMQ for job queues with routing; Redis Streams for lightweight pub/sub. Use async when the producer does not need to block for the consumer's result.
8. **Design for failure** — assume every network call, DB write, and downstream service will fail. Implement retries with exponential backoff, idempotent operations, circuit breakers (Resilience4j, Polly), and graceful degradation.

**Hygiene:**

- DO draw the data flow before writing code. A sequence diagram prevents misunderstandings that code reviews miss.
- DO define SLOs before choosing an architecture. "It should be fast" is not an SLO. "p99 < 200ms at 10k RPM" is.
- DO prefer proven, boring technology over novel stack choices under time pressure.
- DON'T shard a database before you have proven the single-node limit. Premature sharding is one of the worst operational mistakes.
- DON'T add a message queue just because you've heard of Kafka. A queue adds latency, operational burden, and ordering complexity — justify it.
- DON'T design in isolation — the people who will operate the system must review the architecture before build.

**Mastery markers:**

- Professional: reasons from constraints to technology, not from technology to constraints; can describe the failure mode of every component in the design; knows the operational cost of each architectural choice.
- Beginner: reaches for microservices before validating product-market fit; chooses NoSQL because it "scales better"; adds caching before profiling confirms the bottleneck.

**Failure signals:**

- Architecture chosen because a senior engineer likes the technology, not because the requirements demand it.
- Single point of failure in a system where the SLA requires 99.9%+ uptime.
- No retry logic or circuit breaker on external service calls in a production system.
- Message queue added to a feature that needed sub-second consistency — now it's eventually consistent and the team doesn't know it.
- Design document written after the code is shipped.
