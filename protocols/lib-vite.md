# Vite (library/tooling: Vite)

Vite's dev server serves native ESM — no bundle step, instant server start, sub-millisecond HMR for most changes. Production builds use Rollup with explicit code-splitting; the gap between dev and prod must be tested, not assumed away.

## Best practices

1. **`vite.config.ts` is TypeScript** — use `defineConfig()` for full type safety on every option; never use a plain `.js` config in a TypeScript project.
2. **Environment variables via `import.meta.env`** — only `VITE_*`-prefixed vars are exposed to the client bundle; use `loadEnv` in the config for server-side vars; validate required vars at startup with a schema.
3. **`optimizeDeps` for CJS dependencies** — Vite pre-bundles CJS packages to ESM; add packages that break HMR or cause "mixed module" errors to `optimizeDeps.include`; add packages that must not be pre-bundled to `optimizeDeps.exclude`.
4. **Code splitting via `build.rollupOptions`** — split vendor chunks with `manualChunks`; separate rarely-changing libraries (React, charting, rich-text) from app code; measure with `rollup-plugin-visualizer` before declaring victory.
5. **Dynamic imports for route-level splitting** — `() => import('./pages/Dashboard')` loaded via your router's lazy mechanism; pair with `<link rel="modulepreload">` for routes the user is likely to visit next.
6. **Plugins in correct order** — framework plugin first (e.g., `@vitejs/plugin-react`), then `@tailwindcss/vite`, then source maps and analysis plugins last; order affects transform pipeline.
7. **`build.sourcemap` in staging, not production** — source maps expose your source to the public; use `'hidden'` mode to send maps to your error tracker without serving them publicly.
8. **Preview server for production testing** — run `vite preview` against the built `dist/` before deploy; catches env variable, base path, and asset URL mismatches that dev mode hides.

## Hygiene

- Do not import from `node_modules` with relative paths — use bare specifiers; Vite resolves them correctly.
- Do not use `process.env` in client code — it is not automatically available; use `import.meta.env`.
- Do not use `require()` in Vite-processed files — it breaks native ESM; use dynamic `import()` for conditional loading.
- Set `base` in config when deploying to a sub-path — all asset URLs will be wrong if `base` is `/` and the app is served from `/app/`.
- Keep `vite.config.ts` imports to Vite and plugin packages only — avoid importing from `src/` (circular resolution).
- Run `vite build` in CI with `--mode production` explicitly — do not rely on environment inference.

## Mastery markers

- Writes a custom Vite plugin with `transform` and `resolveId` hooks to handle a non-standard file type (e.g., `.graphql`, `.wgsl`).
- Configures `build.lib` correctly for a library build: multiple entry points, ESM + CJS dual output, externalized peer dependencies.
- Uses `import.meta.glob` with eager/lazy modes to build a file-system-driven registry (pages, plugins, i18n).
- Diagnoses a dev/prod discrepancy caused by CJS package behavior change after pre-bundling; fixes with `optimizeDeps`.
- Sets up Vitest (Vite-native test runner) sharing the same `vite.config.ts` without a separate Jest configuration.

## Failure signals

- `VITE_SECRET_KEY` — a secret in a `VITE_*` variable is exposed in the client bundle; secrets must never have the `VITE_` prefix.
- Importing CSS files from JavaScript in production and seeing unstyled flashes — CSS extraction not configured.
- `Cannot use import statement` error in `vite.config.ts` — config file is being parsed by Node with CJS; add `"type": "module"` or rename to `.mts`.
- Bundle size regression undetected until deploy — `rollup-plugin-visualizer` not in the pipeline.
- Dev server works, production build fails silently — `vite preview` is never run before deploy.
- All application code in one chunk — no route splitting, 3 MB initial load.
