# Visual Design Mastery (design: visual)

Visual design is the translation of hierarchy, meaning, and brand into space, weight, and color. The difference between professional and amateur is not taste — it is command of the underlying rules and deliberate choice of when to break them.

## Apply

1. **Type scale** — use a ratio-based modular scale (1.25 Minor Third or 1.333 Perfect Fourth). Never invent arbitrary sizes. Heading → subheading → body → caption must each live on scale steps. Apply `font-size` and `line-height` as paired tokens, not isolated values.
2. **Pairing** — pair a geometric/humanist sans (display) with a neutral grotesk (body), or serif (editorial) with a clean sans (UI). Never pair two decorative fonts. Limit to 2 typefaces per surface; weight variation replaces a third face.
3. **Measure** — body text: 60–75 characters per line. Below 45 = too narrow (fragmented reading). Above 85 = too wide (eye loses return). Control via `max-width` tied to `ch` units, not arbitrary `px`.
4. **Rhythm** — vertical spacing is a multiple of base line-height (e.g., 24px base → spacing in 8px increments). Everything sits on the grid. One rogue margin breaks the rhythm for the whole page.
5. **Color palette construction** — start with one primary hue, derive its tints and shades at fixed lightness steps (HSL L: 95/80/60/40/20). Add one neutral ramp (true gray or slightly warm/cool). Add one accent used exclusively for calls to action and state change. Never exceed 3 hue families.
6. **Semantic color** — every color must carry meaning: primary = action, danger = destructive, success = confirmation, warning = caution, neutral = informational. Meaning is broken the moment red is used decoratively.
7. **Contrast** — text on background minimum 4.5:1 (AA). Large text (18px+ or 14px+ bold) minimum 3:1. UI components and focus indicators minimum 3:1. Verify with exact ratios, not visual approximation.
8. **Visual hierarchy** — one primary focal point per screen. Establish it through size, weight, or color — never all three simultaneously. Secondary content at reduced weight or muted color. Tertiary content invisible until needed.
9. **Layout and grid** — 12-column grid with 16–24px gutters on desktop; 4-column on mobile. Never place content outside the grid unless intentionally breaking it for editorial emphasis. Auto Layout in Figma must mirror the CSS Flexbox model that will render it.
10. **Spacing system** — 4-point or 8-point base. Inner padding is always a multiple of the base unit. Outer margin scale doubles: 8 / 16 / 24 / 32 / 48 / 64 / 96. No "eyeballed" gaps.
11. **Balance** — asymmetric balance (weight distributed, not mirrored) reads as designed; symmetric balance reads as default. Use asymmetry intentionally and anchor it with a strong visual weight on one side.
12. **When to break rules** — break a rule only to create emphasis, never from uncertainty. Breaking measure for a pull quote = intentional. Breaking the grid for a hero image bleed = intentional. Breaking contrast for decoration = failure.

## Hygiene

- DO: Define all color, type, and spacing values as tokens before designing a single component.
- DO: Check every text layer against its background at the exact hex value, not the swatch name.
- DO: Audit line-height on every heading; Figma's default 120% is rarely correct for body text.
- DO NOT: Use more than 3 font weights in a single design system unless editorially justified.
- DO NOT: Place text over images without a scrim, overlay, or text-shadow providing measurable contrast.
- DO NOT: Use color alone to convey state (error, success, disabled) — always pair with icon or label.
- DO NOT: Mix px, rem, and em units without a documented conversion system.

## Mastery markers

- The grid is invisible — content flows naturally and the structure is felt, not seen.
- Color palette holds at 5-step tints, semantic mapping is complete, and no "one-off" colors exist in the file.
- Type scale is applied without exception; heading sizes, weights, and line-heights are all tokenized.
- The hierarchy is readable in a 5-second glance test: primary CTA, primary message, secondary content — in that order.
- Spacing is consistent to the point that removing any element leaves a predictable hole.
- Breaking rules is documented with intent ("pulled quote bleeds beyond grid to signal editorial break").

## Failure signals

- Multiple heading sizes that are close but not on scale (e.g., 28px, 30px, 32px used interchangeably).
- Color contrast passes visually but fails ratio check — or was never checked.
- Spacing is "about 16px" instead of exactly 16px — measurements drift across components.
- Three or more accent colors used without semantic differentiation.
- Text sits on a hero image with no contrast layer; it "looks fine" on one monitor.
- Hierarchy is established entirely by proximity — no weight, size, or color differentiation.
- The grid exists in Figma but components are nudged off-grid "just a little."
