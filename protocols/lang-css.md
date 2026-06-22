# CSS (language: CSS)

Modern CSS — custom properties, logical properties, cascade layers, container queries — makes specificity wars and layout hacks obsolete. Write CSS that explains its own intent.

## Best practices

1. **Cascade layers for architecture** — declare layer order once at the top (`@layer reset, base, tokens, components, utilities`); rules in lower layers never override higher layers regardless of specificity.
2. **Custom properties as design tokens** — define all values (color, spacing, radius, type scale) as `--token-name` on `:root`; components consume tokens, never raw values.
3. **Logical properties over physical** — `margin-inline`, `padding-block`, `inset-inline-start` instead of `left`/`right`/`top`/`bottom`; supports RTL and vertical writing modes without overrides.
4. **Layout with flexbox and grid** — flexbox for one-axis alignment; grid for two-axis layout; never float for layout; `display: contents` to flatten grid wrappers.
5. **Container queries for component-level responsiveness** — `@container` instead of viewport `@media` wherever a component's behavior depends on its parent's size, not the viewport.
6. **`:is()` and `:where()` for selector simplification** — `:is()` preserves highest specificity of its arguments; `:where()` has zero specificity (safe for resets and utilities).
7. **`color-mix()` and `oklch` for color** — define palette in `oklch`; derive tints/shades with `color-mix(in oklch, ...)` rather than hand-coded variants.
8. **Transitions and animations with `prefers-reduced-motion`** — wrap all motion in `@media (prefers-reduced-motion: no-preference)`; default to no motion, opt in to motion.

## Hygiene

- No ID selectors in stylesheets — IDs have absurd specificity; use classes.
- No `!important` except in utility classes that are explicitly designed to win (`@layer utilities`).
- No magic numbers — every numeric value maps to a token or is accompanied by a comment.
- No inline styles in HTML — inline styles break cascade layers and make theming impossible.
- No `*` selectors with expensive properties (`box-shadow`, `filter`) — causes layout/paint thrashing.
- Remove unused CSS at build time (Lightning CSS, PurgeCSS, or framework tooling).

## Mastery markers

- Designs a complete token system (base → semantic → component) using only custom properties and `@layer`.
- Uses `subgrid` to align grandchild elements across sibling grid items.
- Implements a fluid type scale with `clamp()` and `vi`/`vb` viewport units, no breakpoints needed.
- Writes `@scope` rules to contain component styles without BEM naming or CSS Modules.
- Knows when `contain: layout paint` or `content-visibility: auto` meaningfully improves rendering performance.

## Failure signals

- Specificity escalation: adding `!important` to override a rule, then `!important` to override that.
- Layout using `position: absolute` or negative margins where grid/flexbox solves it cleanly.
- Breakpoints chosen by device name ("mobile", "tablet") instead of content breaking point.
- Duplicated color/spacing values across files instead of tokens.
- Unused CSS left in production bundle (renders on every page, cached per-file).
- Writing RTL overrides as a separate stylesheet instead of using logical properties.
