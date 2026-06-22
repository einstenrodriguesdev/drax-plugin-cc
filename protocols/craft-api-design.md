# API Design (craft: interface contracts)

An API is a contract. Once consumers depend on it, changing it has a cost. Design APIs for the consumer's mental model, not the server's data model.

**Apply in this order:**

1. **Resource modeling for REST** — name resources as nouns, not verbs. `/invoices/{id}` not `/getInvoice`. Nested only one level deep (`/users/{id}/invoices`), never deeper. Actions that don't fit CRUD go on sub-resources: `POST /invoices/{id}/void`.
2. **HTTP semantics are not optional** — GET is idempotent and safe (no side effects). POST creates. PUT replaces. PATCH partially updates. DELETE removes. Return correct status codes: 201 for creation, 200 for retrieval, 204 for successful no-body, 400 for validation errors, 401 for unauthenticated, 403 for unauthorized, 404 for not found, 409 for conflict, 422 for unprocessable entity, 429 for rate limiting, 500 for server error.
3. **Design for idempotency** — mutations (POST, PUT, PATCH) should be idempotent when called with the same input. Use idempotency keys (Stripe pattern) for payment-critical operations. Clients will retry on network failure.
4. **Versioning strategy upfront** — URL versioning (`/v1/`) is explicit and easy to route; header versioning is cleaner but harder to debug. Choose one before launch. Never break a published version — deprecate, then sunset with a timeline.
5. **Pagination on every list endpoint** — cursor-based pagination (`next_cursor`) scales; offset-based does not under high volume. Document the max page size and enforce it. No unbounded list endpoints.
6. **Consistent error contracts** — every error returns a structured body: `{ error: { code: string, message: string, details?: [...] } }`. Never return a naked string or HTML error page from a JSON API.
7. **OpenAPI spec as source of truth** — write the spec first, generate stubs from it. A hand-maintained spec diverges from the implementation within weeks. Use contract testing to enforce alignment.
8. **GraphQL when flexible queries outweigh simplicity cost** — GraphQL wins for complex data graphs with diverse consumer needs (mobile vs web vs third-party). REST wins for simple CRUD, public APIs, and teams that need caching without extra tooling.

**Hygiene:**

- DO use camelCase for JSON fields (or snake_case consistently — pick one globally and never mix).
- DO include `created_at`, `updated_at` on every resource. Consumers will need them.
- DO document auth requirements for every endpoint in the spec — not just the ones you think are sensitive.
- DON'T expose internal database IDs as public API identifiers — use opaque IDs (UUIDs or prefixed slugs).
- DON'T return 200 with an error in the body. That breaks every HTTP client, CDN, and monitoring tool.
- DON'T add a new query parameter to filter a list without thinking about index coverage on the backing query.

**Mastery markers:**

- Professional: designs the API contract before writing any implementation; includes backward-compatibility analysis in every change; thinks about the consumer's error-handling path, not just the happy path.
- Beginner: models routes around controller methods, not resources; uses 200 for everything; adds pagination only after the endpoint starts timing out in production.

**Failure signals:**

- Breaking change deployed to a published API version without a versioning strategy.
- Error responses that return 200 with `{ success: false }` in the body.
- List endpoint with no pagination that starts timing out at 10k records.
- OpenAPI spec that is months behind the implementation.
- Public API exposing sequential integer IDs that allow trivial enumeration attacks.
