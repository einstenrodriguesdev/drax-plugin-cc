# INTERNAL SLAS

> **Owner:** coo
> **Approver:** ceo
> **Chain role:** Inter-department delivery contracts that make the matrix work (e.g. Data team delivers a requested report within 48h; IT keeps the platform up 99.9%/month). Prevents boundary disputes.
> **Status:** DRAFT
> **Gate:** G-operations (ratified once departmental structure and headcount are confirmed)
> **Consistency:** must not contradict CHAIRMAN_LETTER.md or VISION.md.

---

## Purpose

Internal SLAs are the explicit delivery commitments that each department makes to the departments that depend on it. They replace informal expectations with measurable agreements, give the COO a tool to mediate boundary disputes, and ensure that cross-functional work flows at a predictable pace. Breach of an internal SLA triggers the escalation procedure defined here, not unilateral retaliation.

---

## How to Read This Document

Each SLA entry defines:
- **Provider:** the department or role delivering the service
- **Consumer:** the department or role receiving it
- **Service:** what is being delivered
- **Commitment:** the performance standard (response time, uptime, frequency)
- **Measurement:** how compliance is tracked
- **Escalation:** what happens on breach

---

## 1. Technology / IT SLAs

### SLA-TECH-01 — Platform Uptime

| Field | Value |
|-------|-------|
| Provider | Technology / Engineering |
| Consumer | All departments |
| Service | Core product platform availability |
| Commitment | `NEEDS_DECISION: e.g., 99.9% uptime per calendar month` |
| Planned maintenance window | `NEEDS_DECISION: e.g., Sundays 02:00–04:00 local time, with 48h notice` |
| Incident response — P1 (total outage) | `NEEDS_DECISION: e.g., acknowledged within 15 min, mitigated within 2h` |
| Incident response — P2 (partial degradation) | `NEEDS_DECISION: e.g., acknowledged within 1h, resolved within 8h` |
| Measurement | Uptime monitoring tool: `<tool name>` |
| Escalation on breach | CTO notifies CEO within `<timeframe>`; post-mortem due within `<days>` |

### SLA-TECH-02 — Feature Request Intake

| Field | Value |
|-------|-------|
| Provider | Technology / Product |
| Consumer | All departments |
| Service | Acknowledging and triaging incoming feature or change requests |
| Commitment | `NEEDS_DECISION: e.g., acknowledgment within 2 business days; priority assigned within 5 business days` |
| Measurement | Ticket tracker backlog report |
| Escalation on breach | COO mediates if intake exceeds SLA by more than `<days>` |

---

## 2. Data SLAs

### SLA-DATA-01 — Ad-Hoc Report Delivery

| Field | Value |
|-------|-------|
| Provider | Data / Analytics |
| Consumer | All departments |
| Service | Delivery of a requested ad-hoc data report or analysis |
| Commitment | `NEEDS_DECISION: e.g., standard request: 48 business hours; urgent (CEO-flagged): 8 business hours` |
| Request channel | `<e.g., data-requests Slack channel / ticketing tool>` |
| Measurement | Ticket open→close timestamp |
| Escalation on breach | Consumer department notifies CDO and COO if deadline missed |

### SLA-DATA-02 — Dashboard Refresh

| Field | Value |
|-------|-------|
| Provider | Data / Analytics |
| Consumer | All departments |
| Service | Keeping standard dashboards up to date |
| Commitment | `NEEDS_DECISION: e.g., refreshed by 09:00 on every business day` |
| Measurement | Automated data freshness check |
| Escalation on breach | CDO notified; root cause logged within 24h |

---

## 3. Finance SLAs

### SLA-FIN-01 — Expense Reimbursement

| Field | Value |
|-------|-------|
| Provider | Finance |
| Consumer | All C-levels and ICs |
| Service | Processing approved expense reimbursement claims |
| Commitment | `NEEDS_DECISION: e.g., payment within 5 business days of approved submission` |
| Measurement | Submission-to-payment timestamp in accounting system |
| Escalation on breach | CFO escalates to COO if processing backlog exceeds SLA |

### SLA-FIN-02 — Monthly Financial Close

| Field | Value |
|-------|-------|
| Provider | Finance |
| Consumer | CEO, Board |
| Service | Delivery of closed monthly management accounts |
| Commitment | `NEEDS_DECISION: e.g., draft P&L, balance sheet, and cash flow delivered by day 10 of the following month` |
| Measurement | Finance delivery date log |
| Escalation on breach | CFO flags to CEO with revised date and root cause |

---

## 4. Legal SLAs

### SLA-LEGAL-01 — Contract Review

| Field | Value |
|-------|-------|
| Provider | Legal |
| Consumer | All departments |
| Service | Initial review and markup of incoming contracts |
| Commitment | `NEEDS_DECISION: e.g., standard contract: 3 business days; complex contract: 7 business days; urgent: 1 business day with CLO approval` |
| Measurement | Ticket open→first-response timestamp |
| Escalation on breach | COO notified; CLO provides revised ETA |

---

## 5. People / HR SLAs

### SLA-HR-01 — Hiring Process Timeline

| Field | Value |
|-------|-------|
| Provider | People / CHRO |
| Consumer | Hiring manager (any C-level or Director) |
| Service | Delivering a shortlist of qualified candidates from open-role posting |
| Commitment | `NEEDS_DECISION: e.g., shortlist of at least 3 qualified candidates within 15 business days of role approval` |
| Measurement | Role-open date to shortlist-delivered date |
| Escalation on breach | CHRO notifies CEO if timeline will be missed, with revised date |

---

## 6. Marketing SLAs

### SLA-MKT-01 — Asset Delivery to Sales / Product

| Field | Value |
|-------|-------|
| Provider | Marketing |
| Consumer | Sales, Product |
| Service | Delivering requested marketing collateral (presentations, one-pagers, landing pages) |
| Commitment | `NEEDS_DECISION: e.g., standard asset: 5 business days; urgent: 2 business days with CMO approval` |
| Measurement | Request-to-delivery timestamp |
| Escalation on breach | COO mediates if asset delivery misses SLA by more than 2 days |

---

## 7. SLA Breach Escalation Procedure

1. The consumer department notifies the provider department in writing (via `<channel>`)
2. The provider department acknowledges within `<NEEDS_DECISION: timeframe>` and provides a revised delivery date
3. If the revised date is missed, the consumer escalates to the COO
4. The COO mediates within `<NEEDS_DECISION: timeframe>` and issues a resolution directive
5. If the breach is systemic (more than `<NEEDS_DECISION: number>` breaches per quarter from the same provider), the COO raises a formal performance issue with the relevant C-level and the CEO

---

## 8. SLA Review Cadence

> NEEDS_DECISION: How often are internal SLAs reviewed and updated?

**Review frequency:** `<e.g., biannual>`
**Owner:** COO, with input from all department heads

---

## Interview inputs (ask one at a time)

1. What uptime commitment should Engineering make to the rest of the company for the core platform?
2. What is the planned maintenance window for the platform, and how much notice is required?
3. How quickly must the data team deliver a standard ad-hoc report after a request is made?
4. Is there an "urgent" data request tier, and what triggers it?
5. How many business days does Finance have to process approved expense reimbursements?
6. By which day of the following month must the monthly management accounts be delivered?
7. How many business days does Legal have to complete an initial contract review?
8. How many days from role approval must HR deliver a qualified candidate shortlist?
9. What is the SLA for Marketing delivering a standard piece of collateral to Sales or Product?
10. What channel is used to formally log an internal SLA breach?
11. How quickly must the provider department acknowledge a breach and give a revised ETA?
12. How many breaches per quarter from a single provider triggers a formal performance escalation?
13. How often should internal SLAs be reviewed and updated?
