# Automated Testing (craft: test discipline)

Code without tests is a liability — it works until it doesn't, and you find out in production. Automated tests are the mechanism that makes change safe and refactoring possible.

**Apply in this order:**

1. **Know the pyramid/trophy** — unit tests at the base (fast, cheap, many), integration tests in the middle (service boundaries, DB, queues), e2e tests at the top (few, slow, high-value flows only). Invert the pyramid and your suite will be slow and brittle.
2. **Test behavior, not implementation** — tests that assert on internal state or private methods break on every refactor. Test what the unit does, not how it does it.
3. **Write the test before the fix** — for any bug, write a failing test that reproduces it first. The test proves the fix. No test = the bug will return.
4. **TDD for complex logic** — Red → Green → Refactor. Forces you to design for testability. Avoids accidental coupling.
5. **Each test must be FIRST** — Fast, Isolated, Repeatable, Self-validating, Timely. A test that calls external services, depends on order, or needs manual interpretation is not a test — it's a script.
6. **Coverage that matters** — measure branch coverage, not line coverage. 100% line coverage with no branch assertions is vanity. Prioritize coverage on business-critical paths, auth flows, payment logic, and error handling.
7. **Mutation testing** — run a mutation tool (Stryker, mutmut) periodically to verify your tests actually catch bugs, not just execute code.
8. **CI must be the gate** — no merge without green tests. A flaky test that gets ignored is worse than no test.

**Hygiene:**

- DO name tests with intent: `test("returns 401 when token is expired")` not `test("auth works")`.
- DO keep test setup minimal — long `beforeEach` blocks signal the production code is over-coupled.
- DO isolate external dependencies (DB, queues, APIs) with fakes, stubs, or test containers — not mocks that over-specify implementation.
- DON'T skip tests to ship faster. That debt compounds at the worst time.
- DON'T write tests that only pass when the database has specific seed data in a specific state.
- DON'T let test coverage be a vanity KPI reported upward without examining what the tests actually assert.

**Mastery markers:**

- Professional: maintains a fast, green suite; catches regressions before review; uses test feedback to improve production design; knows when e2e adds value vs. slows the build.
- Beginner: writes tests after code is "done"; only tests happy paths; treats flaky tests as normal; adds tests to hit coverage thresholds, not to verify behavior.

**Failure signals:**

- Test suite takes more than 10 minutes locally — developers skip running it.
- Flaky tests are ignored or disabled without root-cause investigation.
- A production bug that had no test coverage and was not added after the fix.
- Coverage metric is reported but branch coverage is not tracked.
- Tests that fail if run in a different order.
