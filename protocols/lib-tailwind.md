# Tailwind CSS (library/tooling: Tailwind v4)

Tailwind v4 replaces the JavaScript config file with CSS-first configuration via `@theme` inside a CSS file. The Oxide engine (written in Rust) scans faster and the `@tailwindcss/vite` plugin bypasses PostCSS entirely for the fastest possible build.

## Best practices

1. **`@import "tailwindcss"` is the single entry point** — replaces v3's three-line `@tailwind base/components/utilities` directives; one import activates all layers.
2. **`@tailwindcss/vite` plugin, not PostCSS** — add the Vite plugin in `vite.config.ts`; do not add Tailwind to the PostCSS config when using Vite; the plugin is faster and handles HMR correctly.
3. **`@theme` for all design tokens** — define custom colors, spacing, fonts, radii inside `@theme { --color-brand: oklch(55% 0.2 250); }` in the main CSS file; these become Tailwind utilities automatically.
4. **Three token layers** — base tokens (`--color-*`, `--spacing-*`): raw design values; semantic tokens (`--color-surface`, `--color-text-primary`): purpose-named aliases that reference base tokens; component tokens (`--button-bg`): component-scoped aliases; utilities use component or semantic tokens, never base tokens directly.
5. **Convert repeated raw values to tokens on second or third reuse** — the moment you write the same hex code or pixel value three times, it becomes a token.
6. **`@apply` is a last resort** — use `@apply` only in global base styles or when a third-party library needs to be styled and there is no component abstraction available; prefer explicit CSS or component-level class composition.
7. **Variant composition** — `hover:`, `focus-visible:`, `dark:`, `group-*`, `peer-*` are composable; avoid duplicating class lists by using `group` on the parent and `group-hover:` on children.
8. **Oxide engine scan config** — Tailwind v4 auto-detects source files; if you have unusual paths (generated files, monorepo packages), add `@source "../packages/**/*.tsx"` in the CSS entry.

## Hygiene

- No JavaScript `tailwind.config.js` in new v4 projects — the JS config is legacy; all config lives in CSS.
- Do not use arbitrary values (`w-[347px]`) for values that recur — extract to a token instead.
- Do not use `@apply` to recreate component classes that belong in a framework component.
- Keep utility classes in JSX/HTML, not in CSS files (defeats the purpose of utility-first).
- Purge does not need manual configuration — Oxide's content scanner handles it; do not add manual `content` paths unless the scanner misses a source.
- Do not mix v3 and v4 syntax in the same project — `@tailwind base` in a v4 project produces no output and signals a migration was abandoned midway.

## Mastery markers

- Defines a full semantic token layer in `@theme` that enables dark mode by swapping `--color-surface` values in a `@media (prefers-color-scheme: dark)` block — no class-based dark mode toggling needed.
- Uses `@tailwindcss/vite` with SSR frameworks (Astro, SvelteKit) correctly, understanding which transform happens at build time vs dev time.
- Composes multi-state variants (`dark:focus-visible:ring-brand`) with confidence.
- Audits a bundle with the Tailwind CSS IntelliSense VS Code extension and removes unused custom theme entries.
- Migrates a v3 project to v4: replaces JS config with `@theme`, removes `@tailwind` directives, switches to Vite plugin.

## Failure signals

- `tailwind.config.js` with `theme.extend` in a v4 project — JS config is silently ignored.
- `@tailwind base; @tailwind components; @tailwind utilities;` in a v4 CSS file.
- Arbitrary values used for standard spacing because the token was not defined (`p-[24px]` instead of `p-6`).
- `@apply` used to build every reusable class — treating Tailwind as a CSS preprocessor.
- PostCSS config with `tailwindcss` plugin while also using `@tailwindcss/vite` — double transformation, unpredictable output.
- Raw hex colors in utilities (`bg-[#1a2b3c]`) appearing more than once in the codebase.
