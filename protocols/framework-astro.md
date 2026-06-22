# Astro (framework: Astro 6)

Astro 6 ships zero JavaScript by default — every component is static HTML unless explicitly hydrated. The defining discipline is restraint: hydrate the minimum surface, validate content at build time, and reach Lighthouse 95–100 on cold load.

## Best practices

1. **Static HTML is the default** — `.astro` components output pure HTML; add interactivity only by embedding a framework component (React, Vue, Svelte, Solid) with an explicit hydration directive.
2. **Islands hydration directives by intent** — `client:load` for above-the-fold critical UI; `client:idle` for non-critical widgets loaded after main thread is idle; `client:visible` for below-the-fold components (lazy intersection-observer); `client:media` for viewport-conditional UI; `client:only` when SSR is impossible (canvas, WebGL).
3. **Content Collections with schema** — define all content types in `src/content/config.ts` using Zod schemas; Astro validates every file at build time; type-safe frontmatter is guaranteed before deployment.
4. **Server Islands for dynamic fragments** — use `server:defer` on components that need per-request data (user session, live prices) without blocking the static shell; the shell streams first, the island hydrates from the server after.
5. **SSG-first, SSR per-route** — default output is `static`; add `export const prerender = false` only on routes that genuinely need request-time data; mixing is supported via hybrid output mode.
6. **Asset pipeline** — use `<Image>` from `astro:assets` for automatic WebP conversion, responsive `srcset`, and lazy loading; never `<img>` raw for above-the-fold images.
7. **View Transitions API** — `<ViewTransitions />` in the layout enables MPA navigation with CSS-based transitions; pair with `data-astro-prefetch` for instant perceived navigation.
8. **Middleware for request-scoped logic** — authentication checks, locale detection, and A/B flags belong in `src/middleware.ts`, not inside page components.

## Hygiene

- Do not hydrate a component that has no event handlers or reactive state — it adds JS weight with zero UX benefit.
- Do not import framework components into other framework components across Islands boundaries — pass serializable props only.
- Content Collections are the only sanctioned way to load local Markdown/MDX — never use `fs.readdir` in a page component.
- No `client:load` on components that appear only below the fold — use `client:visible`.
- Keep `src/pages/` as thin routing shells; all logic in `src/components/` or `src/lib/`.
- Validate environment variables in `src/env.d.ts` using Astro's `envField` schema; never read `process.env` raw.

## Mastery markers

- Achieves Lighthouse 100 on Performance, Accessibility, Best Practices, SEO on a content page with an interactive Island.
- Uses Server Islands to inject authenticated user data into a fully cacheable static page.
- Writes a Content Collection loader for an external API (CMS, headless) using the Astro Loader API.
- Configures View Transitions with custom enter/exit animations scoped to specific elements via `transition:name`.
- Sets up hybrid output with per-route ISR (stale-while-revalidate) using Astro adapters.

## Failure signals

- `client:load` on every component — treating Astro as an SPA with extra steps (the core anti-pattern).
- Raw Markdown files parsed with `remark` in a page script instead of Content Collections.
- No schema validation on frontmatter — typos cause silent runtime failures instead of build-time errors.
- Framework components nested three levels deep inside `.astro` files, all hydrated independently.
- Importing Node.js-only modules (`fs`, `path`) in components without checking `import.meta.env.SSR`.
- Page components with 200+ lines mixing data fetching, layout, and business logic.
