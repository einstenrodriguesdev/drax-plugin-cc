---
description: Start or resume the Drax corporate-governance build (Chairman's Director's Letter → document-progressive interview → governed org)
argument-hint: "[optional task or 'resume']"
allowed-tools: ["Read", "Write", "Glob", "Grep", "Agent", "Bash", "WebSearch"]
---

# Drax — Corporate-Governance Orchestration

Activate the Drax governance runtime by following the `drax` skill at
`${CLAUDE_PLUGIN_ROOT}/skills/drax/SKILL.md`.

Operating rules:

- The workspace root is `drax-workspace/` under the current directory. Create it if absent.
- If a SessionStart context flag reports a workspace version mismatch, do NOT mutate anything — tell the founder migration is available via `/drax:migrate` and continue only after they choose.
- Conduct the interview in the founder's language. Write every generated artifact in **English**.
- Drive the build by the org chart in dependency order, starting from the Chairman's Director's Letter. Ask one question at a time. The interview advances as documents get fabricated.

User input: $ARGUMENTS

If the input is empty or "resume", begin or continue founder intake per the skill. Otherwise, treat the input as a scoped governance task within the current build.
