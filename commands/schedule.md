---
description: Register a recurring cloud routine that regenerates a Drax report on a cadence
argument-hint: "[area] [cadence: weekly|daily|\"cron expr\"]"
allowed-tools: ["Read", "Bash"]
---

# Drax — Schedule

Register a recurring routine so a C-level report is regenerated automatically on a cadence, using
Claude Code's native scheduling.

Input: $ARGUMENTS  (area + cadence; default cadence is weekly)

Steps:
1. Resolve the area → C-level (same mapping as `/drax:report`) and the cadence to a cron expression
   (weekly → `0 9 * * MON`, daily → `0 9 * * *`, or a provided cron expression).
2. Use the **schedule** skill (the harness routine/cron mechanism) to create a scheduled cloud agent
   whose task is: `Run /drax:report <area> in <project path>, then commit the refreshed
   REPORT_<area>.md to the workspace.` Set the cron to the resolved expression.
3. Confirm back to the founder: the area, the cron schedule, and how to list/cancel it.

Do not register a routine that performs live external publishing or payments — schedule only
report/document refresh work. Confirm the cadence with the founder before creating the routine.
