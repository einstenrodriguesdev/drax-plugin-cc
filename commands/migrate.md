---
description: Detect and migrate an existing drax-workspace to the current schema — non-destructive, approval-gated
allowed-tools: ["Read", "Write", "Glob", "Grep", "Bash"]
---

# Drax — Migrate

Bring an existing `./drax-workspace/` to the schema this plugin version expects, **without ever
losing information** and **only with the founder's explicit approval**.

Steps:
1. Read the expected schema from `{{DRAX_ASSETS}}/hooks/session-start.mjs` (`SCHEMA_VERSION` and
   `EXPECTED_DOCS`) and the workspace's `.drax/manifest.json` (its `schemaVersion`).
2. Build a **proposed mapping** of existing documents → current names:
   - Exact-name matches stay as-is.
   - For legacy/renamed docs, infer the best target by reading each file's heading/content (e.g.
     `VISION_AND_STRATEGY.md` → split/seed into `VISION.md` + `CHAIRMAN_LETTER.md`;
     `RESPONSIBILITY_MATRIX.md` → `AUTHORITY_MATRIX.md`; `TECH_DECISION_RECORD.md` → `TECH.md`).
   - Anything you cannot confidently map is listed as "keep as-is, needs founder decision".
3. **Present the full mapping to the founder and ask for approval. Do NOT change anything yet.**
4. On approval only:
   a. Back up the entire workspace to `./drax-workspace/.drax/backup-<ISO-timestamp>/` (copy, not move).
   b. Apply the approved renames/merges, preserving all content (append, never overwrite; when
      merging, keep both sources under clear headings).
   c. Write/refresh `.drax/manifest.json` with the new `schemaVersion` and `docs` list.
5. Print a summary: backup path, each action taken, and any items left for a founder decision.

Never delete a source file during migration; renames are copy-then-mark-superseded inside the backup.
