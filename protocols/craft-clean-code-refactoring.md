# Clean Code & Refactoring (craft: code quality)

Clean code is code that the next developer — including future you — can read, understand, and change without fear. Refactoring is the discipline of improving that structure continuously, not in one heroic cleanup sprint.

**Apply in this order:**

1. **Name things precisely** — a function name is a contract. `processData()` tells you nothing. `calculateMonthlyChurnRate(cohort)` tells you everything. Variable names must reveal intent. Abbreviations are the enemy of readability.
2. **Functions do one thing** — if you can describe a function using "and", it does two things. Split it. Functions under 20 lines are easier to test, reason about, and reuse. Long functions are a refactoring target.
3. **Apply SOLID for object-oriented code** — Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion. Violations create coupling that makes change painful.
4. **YAGNI — You Aren't Gonna Need It** — don't build abstraction layers for hypothetical future requirements. Abstract when you see the pattern twice, not before.
5. **DRY — Don't Repeat Yourself** — but don't over-apply it. Premature DRY creates wrong abstractions. If two pieces of code look alike but change for different reasons, they should stay separate (WET: Write Everything Twice is fine until the third time).
6. **KISS — Keep It Simple** — the most complex solution is rarely the best one. When a simpler implementation exists, use it. Complexity must be justified by requirements, not preference.
7. **Refactor continuously** — the Boy Scout Rule: leave the code a little cleaner than you found it. Small, consistent improvements prevent the big-bang refactor that never happens.
8. **Manage technical debt explicitly** — track debt as `// TODO:` comments or backlog items with a reason and risk. Debt that is not tracked does not get paid.

**Hygiene:**

- DO rename before you add. If you can't explain the existing name, rename it before adding new behavior.
- DO refactor under test coverage. Refactoring without tests is rewriting with risk.
- DO make structural changes in separate commits from behavioral changes. Mixed commits are impossible to bisect.
- DON'T introduce an abstraction because it feels architectural — introduce it because it removes duplication or clarifies intent.
- DON'T leave commented-out code in the codebase. Git history exists for that.
- DON'T bikeshed formatting — automate it with Prettier/gofmt/black and remove it from human review entirely.

**Mastery markers:**

- Professional: names code at the right level of abstraction for its audience; refactors opportunistically without slipping scope; knows which SOLID violation they're looking at and can articulate the cost.
- Beginner: names things by type (`userList`, `dataObject`); leaves complexity in place because "touching it is risky"; adds abstractions in anticipation of unknown futures.

**Failure signals:**

- Functions longer than 50 lines growing unchallenged.
- Duplicate business logic diverging across two modules without awareness.
- Abstraction layer added "just in case" with no current consumer other than the original use case.
- Commented-out code blocks accumulating and aging.
- Entire files with no test coverage because "they're too hard to test" — a design failure, not a testing failure.
