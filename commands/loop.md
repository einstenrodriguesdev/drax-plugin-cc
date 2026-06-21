---
description: Run iterative in-session work/report cycles for an area until a completion goal is met
argument-hint: "[area] [--iterations N] [--until \"goal\"]"
allowed-tools: ["Read", "Write", "Glob", "Grep", "Agent", "Bash"]
---

# Drax — Loop

Run repeated work cycles in this session for the requested area, advancing the governance build or a
report until a completion goal is met. Read `{{DRAX_ASSETS}}/DRAX_SYSTEM.md` first.

Input: $ARGUMENTS  (area, optional `--iterations N` cap, optional `--until "goal"` completion promise)

Each cycle:
1. Run the area's work: activate the C-level (Agent tool), which dispatches IC subagents
   (`claude-sonnet-4-6`) to produce or refresh the owned artifacts under `./drax-workspace/`.
2. Evaluate progress against the completion goal (or, if none given, against the area's owned outputs
   reaching READY and zero open `NEEDS_DECISION`).
3. If the goal is met or the iteration cap is reached, stop and summarize. Otherwise note what is
   still missing and start the next cycle.

Between cycles, surface any founder decision needed (`NEEDS_DECISION`) and pause for the answer
rather than guessing. Default iteration cap is 5 if none is given. Live external actions stay
approval-gated. For unattended/recurring cadence instead of an in-session loop, use `/drax:schedule`.
