# Drax

Agentic corporate-governance orchestration for solo founders — native to Claude Code.

Drax turns a founder into a governed company. A Chairman's **Director's Letter** seeds a
document-progressive interview: the board and C-suite each interview the founder for the facts
*their own* corporate document needs, fabricate that document, and walk the org chart in
dependency order. C-levels then supervise individual contributors (ICs) and produce real reports.

The output is a VC- / audit- / IPO-grade corporate-governance suite (Articles of Incorporation,
Shareholders' Agreement, Board Charter, Authority Matrix, Job Descriptions, internal SLAs,
NDA/Non-Compete, Stock Option Plan, IP Assignment, Strategic Plan & Budget, Data Governance Policy)
alongside the company's strategic chain.

## Install

```bash
claude plugin marketplace add einstenrodriguesdev/drax-plugin-cc
claude plugin install drax@drax
```

## Commands

| Command | Purpose |
| --- | --- |
| `/drax` | Start or resume the governance build |
| `/drax:status` | Org-chart progress: documents, gates, blockers |
| `/drax:report [area]` | A C-level consolidates a real report by dispatching IC subagents |
| `/drax:loop [area]` | In-session iterative work/report loop until completion |
| `/drax:schedule [cadence]` | Register a recurring cloud routine for reports |
| `/drax:migrate` | Detect and migrate an existing workspace, non-destructively |

## How it works

- **The org**: a full board → C-suite → directors → IC operating org, dispatched as Claude Code
  subagents. Heavy execution runs on Sonnet; board/C-suite arbitration runs on the strongest model.
- **The workspace**: all artifacts live under `drax-workspace/`, written in English.
- **Safety**: live actions and migrations are approval-gated; nothing is renamed or restructured
  without the founder's explicit consent, and migration always backs up first.

## License

UNLICENSED. © Drax.
