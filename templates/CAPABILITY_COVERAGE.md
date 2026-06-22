# Capability Coverage

> **Owner:** ceo (with cto + chro + ciso)
> **Approver:** ceo
> **Chain role:** the mandatory check that the available org actually covers the chosen work —
> every required capability is mapped to an owning agent, with a quality reviewer and a security
> reviewer, and every gap is surfaced before any building starts.
> **Status:** DRAFT
> **Gate:** Coverage (runs after stack/scope are chosen, before domain execution)
> **Consistency:** must reflect the current TECH.md, PRODUCT.md, DESIGN_SYSTEM.md, and GTM.md.

## Purpose
Guarantee that what is being built is actually covered by trained, accountable agents — that the
chosen stack has ICs who can produce professional, secure code, and that design has owners who can
produce professional UI. Building does not proceed on an open gap.

## Inputs
- Stack (from `TECH.md`): `NEEDS_DECISION`
- Product surfaces (from `PRODUCT.md`): `NEEDS_DECISION`
- Design system (from `DESIGN_SYSTEM.md`): `NEEDS_DECISION`
- Scope of work this cycle: `NEEDS_DECISION`

## Coverage matrix
For each required capability: who produces it, who reviews quality, who reviews security, status.

| Required capability | Produces (agent) | Quality review | Security review | Status |
| --- | --- | --- | --- | --- |
| e.g. Frontend (React/TS) | senior-frontend-engineer | design-cto / staff-engineer | appsec-engineer | `OK / COVERAGE_GAP` |
| e.g. Backend/API | senior-backend-engineer | staff-engineer | security-engineer | `…` |
| e.g. Database/data model | senior-backend-engineer / dba | data-engineer | ciso | `…` |
| e.g. Auth & secrets | senior-backend-engineer | security-engineer | ciso | `…` |
| e.g. Payments | senior-backend-engineer | cfo | appsec-engineer / ciso | `…` |
| e.g. UI / brand design | design-cto / art-director / social-media-designer | design-cto | — | `…` |
| e.g. Copy | copywriter-performance | content-strategist | — | `…` |
| e.g. SEO | seo-manager | cmo | — | `…` |

Add a row per real capability derived from the stack and scope. Do not leave a required capability
unmapped.

## Coverage guarantees
- **Code quality:** every code capability has a named quality reviewer and a definition of "done".
- **Security:** every capability that touches data, auth, secrets, or payments has a named security
  reviewer (appsec-engineer / security-engineer / ciso) and passes review before ship.
- **Design quality:** every UI capability is reviewed by design-cto/art-director against
  `DESIGN_SYSTEM.md`.

## Gaps
List every `COVERAGE_GAP` (required capability with no owner, or no quality/security review path):
- `NEEDS_DECISION: gap → proposed resolution (activate specialist / accept risk / change stack)`

**Building does not start on an open gap.** Each gap is either closed or explicitly accepted by the
founder, recorded here with a decision id.

## Interview inputs (ask one at a time)
1. Confirm the stack and scope for this build cycle (or point to TECH.md/PRODUCT.md).
2. For any gap found, do you want to activate a specialist, change the choice, or accept the risk?
3. What is your minimum bar for "professional" and "secure" for this product (so reviewers can gate to it)?
