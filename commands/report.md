---
description: A C-level consolidates a real report by dispatching its IC subagents
argument-hint: "[area: finance|tech|growth|revenue|ops|people|legal|data|security]"
allowed-tools: ["Read", "Write", "Glob", "Grep", "Agent", "Bash"]
---

# Drax — Report

Produce a **real** report for the requested area by actually running the responsible C-level and its
ICs as subagents. Read the constitution at `{{DRAX_ASSETS}}/DRAX_SYSTEM.md` first.

Area requested: $ARGUMENTS  (if empty, ask the founder which area)

Map area → C-level owner (use the closest match):
- finance → cfo · tech → cto · growth/marketing → cmo · revenue → cro · ops → coo
- people/hr → chro · legal → clo · data → cdo · security → ciso · product → cpo

Steps:
1. Activate the C-level agent for the area via the Agent tool (its declared model).
2. The C-level identifies the ICs in its department that own the relevant outputs and dispatches
   each as a subagent with `model: claude-sonnet-4-6`, passing the workspace path and the specific
   artifact/metric to produce or refresh.
3. Collect the IC outputs (real files written under `./drax-workspace/`), then have the C-level
   consolidate `./drax-workspace/REPORT_<area>.md` with: executive summary, status of each owned
   output, status against internal SLAs (`INTERNAL_SLAS.md` if present), risks, and asks for the
   founder. Status is measured from the artifacts the ICs actually produced — never narrated.
4. Update `.drax/manifest.json`. Print the report path and a 5-line summary.

Live external actions stay approval-gated.
