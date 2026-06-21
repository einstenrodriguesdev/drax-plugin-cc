# DATA GOVERNANCE POLICY

> **Owner:** cdo + ciso
> **Approver:** ceo
> **Chain role:** Defines who can access what (access matrix) — e.g. a junior marketing IC cannot see salaries (HR) or real-time gross revenue (Finance), and no external developer accesses sensitive personal data unencrypted.
> **Status:** DRAFT
> **Gate:** G-security (must be approved before any production system goes live or any customer data is processed)
> **Consistency:** must not contradict CHAIRMAN_LETTER.md or VISION.md.

---

## Purpose

The Data Governance Policy establishes how the company classifies, stores, accesses, and protects data — internal and external. It defines a data classification scheme, an access matrix by role and data category, encryption and handling requirements, and the incident response obligation when data is breached or mishandled. It is the primary instrument ensuring that sensitive data — including customer personal data, financial records, and employee information — is accessed only by those with a legitimate need.

---

## 1. Scope

This Policy applies to:
- All employees, contractors, advisors, and service providers who access company data
- All data assets, regardless of storage medium (cloud, on-premise, device, paper)
- All systems — production, staging, development, and analytics

---

## 2. Data Classification

All data assets are classified into one of four tiers:

| Tier | Label | Definition | Examples |
|------|-------|-----------|---------|
| 1 | **Restricted** | Highest sensitivity; exposure causes severe harm | Customer personal data (PII), payment data, employee salaries, source code, trade secrets, board deliberations |
| 2 | **Confidential** | Sensitive; exposure causes material harm | Revenue figures, pricing models, growth strategies, investor materials, product roadmap |
| 3 | **Internal** | For internal use only; not for external sharing | OKRs, operational metrics, vendor contracts, hiring data |
| 4 | **Public** | Approved for external release | Marketing materials, published documentation, press releases |

> NEEDS_DECISION: Are there data categories unique to the company's product or industry that require a custom classification?

`<additional classification categories or NONE>`

---

## 3. Access Matrix

Access is granted on a need-to-know basis. The table below shows the maximum access tier for each role. Access to a lower tier automatically includes access to all tiers below it (Public is accessible to all).

| Role | Restricted (T1) | Confidential (T2) | Internal (T3) | Public (T4) |
|------|:---------------:|:-----------------:|:-------------:|:-----------:|
| CEO | Full | Full | Full | Full |
| CFO | Full | Full | Full | Full |
| CLO | Full | Full | Full | Full |
| CTO | `NEEDS_DECISION` | Full | Full | Full |
| CMO | No (except own-dept data) | Partial — see below | Full | Full |
| CHRO | Full (employee data only) | Partial | Full | Full |
| CDO | Full (with purpose limitation) | Full | Full | Full |
| CISO | Full (audit only) | Full | Full | Full |
| COO | Partial — see below | Full | Full | Full |
| Director / Senior IC | No | Dept-scoped | Full | Full |
| Lead IC | No | No | Dept-scoped | Full |
| Junior IC | No | No | Own-team only | Full |
| External contractor | No | No | Project-scoped | Full |
| Board member | Partial — see below | Full | Full | Full |

> NEEDS_DECISION: Define "Partial" for CMO, COO, and Board: which specific Restricted data subsets may they access?

**CMO Restricted access:** `<e.g., aggregated revenue data anonymized at customer level — no individual customer PII>`
**COO Restricted access:** `<e.g., operational data including headcount and salaries — no customer PII without CLO approval>`
**Board Restricted access:** `<e.g., aggregate financial data and board-level reporting — no individual customer PII>`

---

## 4. Data Handling Requirements by Tier

### Tier 1 — Restricted

- Storage: must be encrypted at rest (`<NEEDS_DECISION: encryption standard, e.g., AES-256>`) and in transit (`<e.g., TLS 1.2+>`)
- Access: requires explicit individual authorization logged in the access management system
- Transmission: only via encrypted channels; email is prohibited for Restricted data
- Deletion: must be securely deleted per `<NEEDS_DECISION: retention schedule>` using `<method>`
- External sharing: requires CLO and CDO written approval and a signed data processing agreement

### Tier 2 — Confidential

- Storage: must be encrypted at rest and in transit
- Access: role-based; logged for audit purposes
- Transmission: via company-approved secure channels only; external transmission requires manager approval
- External sharing: requires department head approval; NDA must be in place

### Tier 3 — Internal

- Storage: standard company systems; encryption at rest preferred
- Access: role-based; no personal device storage without MDM enrollment
- External sharing: not permitted without explicit approval

### Tier 4 — Public

- No special handling requirements beyond standard content review before release

---

## 5. Access Provisioning and Deprovisioning

### Provisioning

- Access is requested by the hiring manager and approved by the relevant data owner before the employee begins work
- Access to Restricted data requires dual approval: department head + CDO or CISO
- All access grants are logged in `<NEEDS_DECISION: access management system>`

### Deprovisioning

- Access must be revoked within `<NEEDS_DECISION: hours, e.g., 4 hours>` of termination or role change
- The CHRO notifies the CISO and IT on the same day as any departure or role transition
- Quarterly access reviews are conducted by the CISO to remove dormant or unnecessary access

---

## 6. Personal Data and Privacy

> NEEDS_DECISION: In which jurisdictions does the company process personal data of customers or employees?

**Applicable privacy regimes:** `<e.g., LGPD (Brazil), GDPR (EU), CCPA (California), other>`

- Customer personal data is collected only with valid legal basis as defined in the company's Privacy Policy
- Personal data is not shared with third parties without a signed data processing agreement
- Data subject rights requests (access, deletion, correction) are handled by the CDO within `<NEEDS_DECISION: days, per applicable law>`
- Data retention periods by category: `<NEEDS_DECISION: define per category>`

---

## 7. Incident Response

> NEEDS_DECISION: What constitutes a reportable data incident?

A data incident includes unauthorized access, disclosure, loss, or destruction of Tier 1 or Tier 2 data.

**Incident reporting chain:**
1. Discoverer notifies CISO and CDO within `<NEEDS_DECISION: hours>`
2. CISO performs initial triage and severity classification within `<hours>`
3. CEO is notified within `<hours>` for all Tier 1 incidents
4. External notification (customers, regulators) per applicable law within `<NEEDS_DECISION: timeframe>`
5. Post-incident review completed within `<days>`

---

## 8. Audit and Monitoring

- Access logs for Restricted and Confidential data are retained for `<NEEDS_DECISION: duration>`
- CISO conducts a monthly access audit for Restricted data
- Annual data governance audit is conducted by `<NEEDS_DECISION: internal / external party>`

---

## 9. Policy Violations

Violation of this Policy is subject to disciplinary action up to and including termination, and may result in civil or criminal liability under applicable law. Violations are reported to the CISO, who escalates to the CEO for C-level violations and to the CLO for all cases requiring legal assessment.

---

## 10. Review and Updates

> NEEDS_DECISION: How often is this Policy formally reviewed and updated?

**Policy review frequency:** `<annually / on material change to data architecture or applicable law>`
**Review owner:** CDO + CISO
**Approval:** CEO

---

## Interview inputs (ask one at a time)

1. What data categories are unique to the company's product or industry that need a custom classification tier?
2. Which specific Restricted data subsets may the CMO access — if any?
3. Which specific Restricted data subsets may the COO access — if any?
4. Which Restricted data may Board members see?
5. What encryption standard applies to Restricted data at rest and in transit?
6. What is the secure deletion method for Restricted data, and what is the retention schedule?
7. In which jurisdictions does the company process personal data — and which privacy laws apply?
8. What are the data retention periods for customer personal data, employee data, and financial records?
9. How quickly must access be revoked after an employee's departure?
10. What constitutes a reportable data incident, and how quickly must the CISO be notified?
11. Are external notifications to customers or regulators required on breach? Under which legal regime and timeline?
12. How long are access logs retained for Restricted data?
13. How often should this Policy be formally reviewed and updated?
