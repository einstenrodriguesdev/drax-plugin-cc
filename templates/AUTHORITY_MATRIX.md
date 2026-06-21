# AUTHORITY MATRIX

> **Owner:** cfo + coo
> **Approver:** ceo
> **Chain role:** Defines exact financial limits per C-level and lead IC (delegation of authority / spend thresholds) so financial orders follow a controlled, fraud-resistant flow.
> **Status:** DRAFT
> **Gate:** G-finance (must be approved before any departmental budget is released)
> **Consistency:** must not contradict CHAIRMAN_LETTER.md or VISION.md.

---

## Purpose

The Authority Matrix defines the maximum financial commitment any role in the organization may authorize independently, without escalation. It is the primary control instrument preventing unauthorized spend, contract commitments, or resource allocation. All roles must act within their tier; requests above a tier must escalate to the next level before any commitment is made.

---

## 1. Scope

This matrix applies to:
- Operating expenditures (OpEx): salaries, subscriptions, services, marketing spend
- Capital expenditures (CapEx): equipment, infrastructure, one-time investments
- Contract commitments: vendor agreements, service agreements, partnership agreements
- Hiring decisions: approval to open a role and approve an offer

It does **not** apply to:
- Transactions pre-approved within the annual budget (see STRATEGIC_PLAN_AND_BUDGET.md) — these follow budget release rules
- Reserved matters governed by SHAREHOLDERS_AGREEMENT.md

---

## 2. Approval Tiers

> NEEDS_DECISION: What currency does the matrix use?

**Currency:** `<currency>`

### Tier 1 — Lead IC / Specialist

> NEEDS_DECISION: What is the maximum single-transaction amount a Lead IC may approve autonomously?

| Category | Max per transaction | Max per month | Notes |
|----------|-------------------|--------------|-------|
| Operating expense | `<amount>` | `<amount>` | `<conditions>` |
| Contract commitment | `<amount>` | — | `<conditions>` |
| Hiring | Not authorized | — | Must escalate to manager |

### Tier 2 — Director / Senior Manager

> NEEDS_DECISION: What is the maximum single-transaction amount a Director may approve autonomously?

| Category | Max per transaction | Max per month | Notes |
|----------|-------------------|--------------|-------|
| Operating expense | `<amount>` | `<amount>` | `<conditions>` |
| Contract commitment | `<amount>` | — | `<conditions>` |
| Hiring (IC roles) | Authorized with COO/CHRO sign-off | — | `<conditions>` |

### Tier 3 — C-Level Officer (non-CEO)

> NEEDS_DECISION: What is the maximum single-transaction amount a C-Level may approve without CEO sign-off?

| Category | Max per transaction | Max per month | Notes |
|----------|-------------------|--------------|-------|
| Operating expense | `<amount>` | `<amount>` | Within approved budget line |
| Capital expenditure | `<amount>` | — | `<conditions>` |
| Contract commitment | `<amount>` | — | `<conditions>` |
| Hiring (Director/IC roles) | Authorized with CEO notification | — | `<conditions>` |

### Tier 4 — CEO

> NEEDS_DECISION: What is the maximum single-transaction amount the CEO may approve without board sign-off?

| Category | Max per transaction | Notes |
|----------|-------------------|-------|
| Operating expense | `<amount>` | Within board-approved budget |
| Capital expenditure | `<amount>` | `<conditions>` |
| Contract commitment | `<amount>` | `<conditions>` |
| Hiring (C-Level roles) | Authorized with board notification | Per SHAREHOLDERS_AGREEMENT.md |
| Dismissal (C-Level) | Board approval required | Per SHAREHOLDERS_AGREEMENT.md |

### Tier 5 — Board

All transactions exceeding CEO tier limits require board approval prior to commitment.

---

## 3. Multi-Signature Requirements

> NEEDS_DECISION: Are there transaction types that always require two or more signatories regardless of amount?

| Transaction type | Required signatories | Rationale |
|-----------------|---------------------|-----------|
| Bank wire above `<amount>` | `<roles>` | Fraud prevention |
| New vendor onboarding above `<amount>` | `<roles>` | Procurement control |
| `<other>` | `<roles>` | `<rationale>` |

---

## 4. Emergency Spend Authorization

> NEEDS_DECISION: What procedure applies when an urgent spend is required outside business hours or when the normal approver is unavailable?

**Emergency authorization procedure:** `<procedure>`
**Maximum emergency transaction:** `<amount>`
**Required retrospective approval:** within `<timeframe>`

---

## 5. Prohibited Transactions

No role at any tier may, without board resolution:
- Commit the company to debt or credit facilities
- Pledge company assets as collateral
- Enter into equity transactions
- Make charitable donations exceeding `<NEEDS_DECISION: amount>`
- `<other prohibited transactions>`

---

## 6. Audit and Monitoring

- The CFO reviews all transactions above Tier 2 monthly
- The Audit Committee reviews the authority matrix compliance report `<NEEDS_DECISION: quarterly / biannually>`
- Exceptions and policy violations are reported to the CEO and logged in the audit trail

---

## Interview inputs (ask one at a time)

1. What currency does the authority matrix use?
2. What is the maximum spend a Lead IC may authorize on a single transaction without approval?
3. What is the monthly spend cap for Lead ICs?
4. What is the maximum spend a Director may authorize on a single transaction?
5. What is the maximum spend a C-Level (non-CEO) may authorize on a single transaction?
6. What is the maximum spend the CEO may authorize without board approval?
7. Are there any transaction types that always require two signatories regardless of amount?
8. What bank wire threshold triggers a mandatory dual-signature requirement?
9. What is the procedure for emergency spend when normal approvers are unavailable?
10. What is the maximum amount for an emergency transaction?
11. Are there transaction categories that are completely prohibited without a board resolution?
12. How often will the Audit Committee review authority matrix compliance?
