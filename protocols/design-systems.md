# Design Systems (design: systems)

A design system is a single source of truth that makes design decisions once and propagates them everywhere. Without it, every component is a snowflake; with it, product velocity compounds because decisions are already made.

## Apply

1. **Three-layer token architecture** — Base tokens define raw values (`--color-blue-500: #3B82F6`). Semantic tokens map intent to base (`--color-action-primary: var(--color-blue-500)`). Component tokens scope to context (`--button-background: var(--color-action-primary)`). Never let a component reference a base token directly; it bypasses the semantic layer and breaks theming.
2. **Token naming convention** — `{category}-{property}-{variant}-{state}`. Examples: `color-text-primary`, `color-text-primary-hover`, `space-inset-md`, `radius-button-default`. Avoid names encoding values (`blue-500` leaks into semantic layer). Names must survive a theme swap.
3. **Figma Variables** — Mirror the three layers using Figma Variable collections: Base / Semantic / Component. Use `color` mode Variables for light/dark theming. Use `number` Variables for spacing and radius. Use `boolean` Variables for component states (e.g., `is-disabled`). Use `string` Variables sparingly — primarily for brand copy tokens (e.g., `brand-name`). Bind every design token in Figma to its Variable; no hardcoded hex or pixel values in components.
4. **Auto Layout parity** — Every Figma frame using Auto Layout must have a 1:1 mapping to CSS Flexbox. Direction, gap, padding, alignment, and wrapping set in Figma are the specification, not a reference. Handoff friction is zero when the structure is already CSS.
5. **Component library** — Atomic structure: atoms (button, input, icon, badge) → molecules (form field, card, nav item) → organisms (header, modal, data table). Each component has: all states documented (default / hover / focus / active / disabled / loading / error), all slots labeled, and responsive behavior defined.
6. **Tailwind v4 integration** — Design tokens map directly to CSS variables consumed by Tailwind v4 (`@theme` directive). Token changes in the design file propagate to a `tokens.css` export; engineering imports it. This makes the design file the authority on values — not the Tailwind config, not a separate JSON file.
7. **Versioning** — Use semantic versioning for the system. Breaking changes (token renames, component API changes) = major bump. Additive changes = minor bump. Document the changelog. Components consuming deprecated tokens get a migration path, not an immediate break.
8. **Single source of truth discipline** — One Figma file is the system. Branch from it for experiments. Merge back before shipping. Shadow systems (rogue component libraries in product files) are treated as technical debt, not acceptable shortcuts.
9. **Handoff protocol** — Engineers inspect via Figma's Dev Mode. Every component exports: spacing in `rem`, colors as CSS variable names (not hex), type as `font-size`/`line-height`/`font-weight`/`font-family` mapped to tokens, not pixel values.
10. **Theme architecture** — Light/dark is Mode switching within Figma Variables, not duplicated components. Platform variants (web/mobile/email) are separate token scopes, not separate files. A single component adapts to context; it does not fork.

## Hygiene

- DO: Publish a token export script that runs on design file save; engineers never hand-transcribe values.
- DO: Name every Variable before it leaves draft; unnamed Variables are design debt.
- DO: Document which components are stable vs. experimental in the component library.
- DO NOT: Create "local styles" in product files that override system Variables — all overrides live in the system.
- DO NOT: Hardcode hex values anywhere in the component library; every color is a Variable.
- DO NOT: Let component states be implied — design every state explicitly, including error and disabled.
- DO NOT: Rename base tokens in ways that leak into component names (e.g., `--blue-button`).

## Mastery markers

- Swapping the entire product from light to dark mode requires one Variable mode change — zero repaints.
- A new engineer can identify the correct component, correct token, and correct state for any UI need within 5 minutes using only the system documentation.
- Token changes propagate end-to-end: Figma Variable update → token export → CSS variable → Tailwind → rendered UI, with no manual steps.
- The component library has no orphaned or duplicate components; the changelog shows every decision.
- Designers cannot produce off-system work because the system is the only library attached to product files.

## Failure signals

- Hex values scattered throughout Figma components instead of Variable references.
- Light mode and dark mode are implemented as separate duplicated frames, not mode-switched Variables.
- The "design system" is a style guide PDF, not a live component library.
- Engineers use different spacing values than designers because handoff is screenshots, not Variable-mapped Dev Mode.
- Token names encode visual properties (`--big-blue-button`) that break when the design language changes.
- Component states exist only for default and hover; focus, error, loading, and disabled are designed ad hoc by engineers.
