# Code Review (craft: review & validation)

Code review is the primary quality gate in a software team — the moment where correctness, security, and maintainability are checked before code becomes permanent. In 2026, reviewing AI-generated code is equally critical: it looks fluent but carries novel failure modes.

**Apply in this order:**

1. **Understand intent first** — read the PR description, linked issue, or acceptance criteria before looking at a single line of diff. Review without intent is just pattern matching.
2. **Check correctness** — does the code do what it claims? Trace the logic through edge cases: empty inputs, null, off-by-one, concurrency, partial failures.
3. **Check security** — OWASP Top 10 mindset on every diff. Look for: unsanitized user input reaching SQL/shell/HTML, broken object-level authorization (BOLA), missing authentication on new routes, hardcoded secrets, insecure deserialization, path traversal in file ops.
4. **Check AI-generated code specifically** — verify it doesn't hallucinate library APIs, introduce deprecated patterns, or silently swallow errors. AI code often handles the happy path and ignores error branches.
5. **Check for over-engineering** — YAGNI. New abstractions need justification. If the diff adds indirection without immediate payoff, call it out.
6. **Enforce small PRs** — PRs over 400 lines are a review liability. Ask for splits. Large PRs hide bugs and delay merge.
7. **Inline comments must be actionable** — "nit:", "suggestion:", "blocker:". Never leave ambiguous comments. Blockers are non-negotiable before merge; nits are optional.
8. **Approve only what you understand** — if a section is opaque and the author can't explain it, it's a blocker.

**Hygiene:**

- DO comment on the code, not the author. "This branch is unreachable when X" not "you forgot to handle X."
- DO distinguish style from substance. Style nits via linter, not review.
- DO test the code locally if the risk is high (auth changes, data migrations, payment flows).
- DON'T approve PRs under time pressure without reading them. Rubber-stamping is worse than no review.
- DON'T request changes on things the linter or formatter should enforce — automate them out of the review loop.
- DON'T block a PR over personal preference without a stated engineering reason.

**Mastery markers:**

- Professional: catches behavioral bugs via logic trace, not just surface-level issues; leaves comments that teach, not just reject; knows which risks warrant in-depth review vs. quick scan.
- Beginner: focuses on style, misses logic errors; approves large diffs because "it looks fine"; treats every comment as equally important regardless of severity.

**Failure signals:**

- PR merged with no review (or rubber-stamp review) that later causes a production incident.
- Security vulnerability shipped in AI-generated code that passed review unchallenged.
- Review comments that are vague, dismissive, or personal.
- Average PR size growing past 500 lines without team pushback.
- No distinction between blocker and nit — everything is equally urgent or equally ignored.
