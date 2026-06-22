# Design System

> **Owner:** design-cto + brand-strategist + art-director
> **Approver:** ceo
> **Chain role:** fixes the brand and UI fundamentals (colors, typography, spacing, components,
> accessibility) that every design and front-end IC must build to; the bar design output is reviewed against.
> **Status:** DRAFT
> **Gate:** Domain (captured before any UI/front-end execution)
> **Consistency:** must not contradict CHAIRMAN_LETTER.md or VISION.md.

## Purpose
Capture the fundamental design decisions a prior run failed to ask for — brand colors, typography,
and visual style — so design and front-end work is professional, consistent, and reviewable. This is
a required input gate, not an afterthought.

## Brand colors
- Primary: `NEEDS_DECISION: exact hex`
- Secondary: `NEEDS_DECISION: exact hex`
- Accent: `NEEDS_DECISION: exact hex`
- Neutrals (background / surface / text): `NEEDS_DECISION: hex set`
- Semantic (success / warning / danger / info): `NEEDS_DECISION: hex set`
- Contrast / accessibility target: `NEEDS_DECISION: e.g. WCAG 2.2 AA`

## Typography
- Heading family: `NEEDS_DECISION`  · Body family: `NEEDS_DECISION`  · Mono (if any): `NEEDS_DECISION`
- Type scale (sizes/weights/line-height): `NEEDS_DECISION`
- Web font source / licensing: `NEEDS_DECISION`

## Layout & spacing
- Spacing scale / base unit: `NEEDS_DECISION`
- Grid / breakpoints: `NEEDS_DECISION`
- Corner radius, elevation/shadows: `NEEDS_DECISION`

## Components & tone
- Component style (e.g. minimal, dense, playful): `NEEDS_DECISION`
- Iconography & imagery style: `NEEDS_DECISION`
- Motion/interaction principles: `NEEDS_DECISION`

## Design tokens (machine-usable)
- Token format / location (CSS vars, Tailwind config, JSON): `NEEDS_DECISION`

## Review bar
Design output is reviewed by design-cto + art-director against this document before it ships.
Front-end implementation must consume these tokens, not hard-coded values.

## Interview inputs (ask one at a time)
1. Do you already have brand colors? If yes, give the exact hex values for primary/secondary/accent.
2. What typography do you want — any existing fonts, or should we propose options (A safe / B balanced / C distinctive)?
3. What overall visual style fits the brand and audience (minimal, premium, technical, playful)?
4. What is your accessibility requirement (e.g. WCAG 2.2 AA)?
5. What platforms/surfaces must the design cover (web, mobile, both)?
6. Do you have existing assets (logo, guidelines) to align to, or are we defining from scratch?
