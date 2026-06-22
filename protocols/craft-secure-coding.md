# Secure Coding (craft: security-by-default)

Security is not a phase — it is a property of every line of code. Every feature added without a security lens is potential attack surface shipped to production.

**Apply in this order:**

1. **OWASP Top 10 as a checklist on every PR** — Broken Access Control (#1 since 2021), Cryptographic Failures, Injection, Insecure Design, Security Misconfiguration, Vulnerable Components, Auth Failures, Integrity Failures, Logging Failures, SSRF. Know them. Check them.
2. **Validate all input at the boundary** — trust nothing from the network, filesystem, environment, or user. Validate type, length, format, range. Reject early. Never pass raw input to SQL, shell commands, template engines, or file paths.
3. **Parameterize every query** — no string concatenation in SQL. ORM does not guarantee safety if you use `.raw()`. Check it.
4. **Enforce authorization at the data layer** — always check ownership before returning records. Object-level authorization (BOLA/IDOR) is the most common API vulnerability. Don't rely on the UI to hide routes.
5. **Handle secrets properly** — never hardcode secrets in source code. Load from environment. Never log secrets. Rotate on suspected exposure. Use a secrets manager for production (Vault, AWS Secrets Manager, Doppler).
6. **Dependency hygiene** — run `npm audit` / `pip-audit` / `bundle audit` in CI. Pin dependency versions. Review changelogs before major version upgrades. Supply-chain attacks start with a transitive dependency.
7. **Output encoding** — when rendering user data in HTML, JSON, shell, CSV, or email, encode for the output context. XSS comes from trusting user content in output without encoding.
8. **Least privilege** — DB user should not be root. Service account should have only the permissions it needs. Application should not run as root in a container.
9. **Cryptography: use the platform** — don't implement crypto. Use bcrypt/argon2 for passwords. Use TLS 1.2+ for transport. Don't roll your own HMAC unless you have a verified reason.

**Hygiene:**

- DO treat security findings as blockers, not "future improvements."
- DO add security-relevant inputs to tests: SQL injection strings, oversized payloads, Unicode edge cases.
- DO rotate secrets after any team member with access leaves.
- DON'T catch-and-silently-swallow auth exceptions — fail loud and return a clear 401/403.
- DON'T store session tokens, JWTs, or credentials in localStorage without understanding the XSS risk.
- DON'T merge a PR that adds a `//skipchecks` on a security lint rule without a documented reason.

**Mastery markers:**

- Professional: thinks about trust boundaries before writing the first line; designs permission models top-down; knows which OWASP class each new feature surface could expose.
- Beginner: adds security "later"; treats auth as a middleware concern only; copies authentication snippets from Stack Overflow without auditing them.

**Failure signals:**

- SQL query built by string concatenation in code review.
- Hardcoded secret committed to git history (even if "removed" later — it's in history).
- New API endpoint with no authorization check.
- `npm audit` showing critical severity vulnerabilities in production dependencies.
- Logging user passwords or tokens in error messages.
