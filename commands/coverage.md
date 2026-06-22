---
description: Run the mandatory capability-coverage analysis — does the available org actually cover the chosen stack and scope?
argument-hint: "[optional: area or scope]"
allowed-tools: ["Read", "Write", "Glob", "Grep", "Agent", "Bash"]
---

# Drax — Capability Coverage

Verify that the available org actually covers what is being built, and write
`./drax-workspace/CAPABILITY_COVERAGE.md`. Read `{{DRAX_ASSETS}}/DRAX_SYSTEM.md` (Section 3b) first.

Scope: $ARGUMENTS  (if empty, cover the whole current build)

Steps:
1. Read `TECH.md`, `PRODUCT.md`, `DESIGN_SYSTEM.md`, and `GTM.md` from `./drax-workspace/` (if a
   required one is missing, say so — it is a fundamental-input gap to fix first via `/drax`).
2. Activate the `ceo` agent (with `cto`, `chro`, `ciso` as needed) to derive the required capabilities
   from the stack and scope.
3. Copy `{{DRAX_ASSETS}}/templates/CAPABILITY_COVERAGE.md` into the workspace and fill the coverage
   matrix: for each required capability name the agent that **produces** it, the **quality** reviewer,
   and the **security** reviewer. Map real agents (e.g. React → `senior-frontend-engineer`; secure
   code → `appsec-engineer`/`security-engineer`; UI/brand → `design-cto`/`art-director`).
4. Flag every `COVERAGE_GAP` (capability with no owner or no review path) and present it to the
   founder. Do not greenlight domain execution while a gap is open — the founder closes or accepts it.
5. Update `.drax/manifest.json`. Print the coverage summary and the list of gaps.

Guarantee that code capabilities have a security review and design capabilities have a design review.
