---
description: Show Drax org-chart progress — documents present, gate state, and blockers
allowed-tools: ["Read", "Glob", "Bash"]
---

# Drax — Status

Report the current state of the governance build for `./drax-workspace/`.

Steps:
1. If `./drax-workspace/` does not exist, say no build has started and suggest `/drax`.
2. Read `./drax-workspace/.drax/manifest.json` for `schemaVersion` and the recorded docs.
3. List the `.md` documents present in `./drax-workspace/` and, for each governance-suite and
   strategic-chain document, read its `Status:` header field (DRAFT / READY) if present.
4. Determine the open gate from the constitution at `{{DRAX_ASSETS}}/DRAX_SYSTEM.md` (Section 3):
   the first gate whose owned document is missing or still DRAFT.

Output a compact table: Document | Owner | Status (present/DRAFT/READY/missing). Then one line each
for: **Open gate**, **Next owner to activate**, and **Blockers** (any `NEEDS_DECISION` markers found
in present documents). Do not modify any files.
