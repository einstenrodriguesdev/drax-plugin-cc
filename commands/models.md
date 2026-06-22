---
description: Research the latest available models and set the per-band model policy (executives vs ICs)
argument-hint: "[optional: 'latest' to guarantee newest]"
allowed-tools: ["Read", "Write", "Bash", "WebSearch"]
---

# Drax — Model Policy

Decide which models the org's agents use, based on what is actually available now. Read
`{{DRAX_ASSETS}}/DRAX_SYSTEM.md` (Section 2) first.

Input: $ARGUMENTS

Steps:
1. **WebSearch** for the latest available Claude models right now — the newest Opus, the newest
   Sonnet, and the current top tier (e.g. Fable 5). Do not assume; confirm names live.
2. Present the recommended policy and ask the founder (unless they passed `latest`):
   - **Recommended:** executive band (board + C-suite) → newest Opus (e.g. `claude-opus-4-8`) at
     **high** effort (xhigh/max for the hardest forks); IC/execution band → newest Sonnet (e.g.
     `claude-sonnet-4-6`) at **high** effort.
   - **Guarantee-latest:** always use the newest; re-check each run.
   - **Custom:** founder sets each band (e.g. Fable 5 for executives, or all Sonnet to save cost).
3. Write `./drax-workspace/.drax/model-policy.json`:
   `{ "executive": {"model": "...", "effort": "..."}, "ic": {"model": "...", "effort": "..."},
   "guaranteeLatest": true|false, "checkedAt": "<ISO>", "source": "<what the search found>" }`.
4. Tell the founder how to apply the recommended **effort** (session/settings control, not per
   subagent): `/effort`, `CLAUDE_CODE_EFFORT_LEVEL`, or settings. Confirm the saved policy.

From now on, every Agent dispatch uses the band's model from this file.
