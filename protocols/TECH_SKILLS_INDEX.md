# Tech Skills Index — separated by type

Engineering and design skills, organized by type. Agents reference these from
`{{DRAX_ASSETS}}/protocols/`. The prefix encodes the type: `lang-`, `framework-`, `lib-`,
`design-`, `craft-`.

## Languages (`lang-`)
| Skill | Covers |
| --- | --- |
| `lang-javascript.md` | Modern JS — ESM, async/await, iterators, equality/coercion hygiene |
| `lang-typescript.md` | Strict mode, advanced types (conditional/mapped/template-literal, discriminated unions), `satisfies`, `unknown` over `any` |
| `lang-html.md` | Semantic HTML, landmarks, heading order, labeled forms, viewport meta |
| `lang-css.md` | Cascade layers, custom properties, logical properties, container queries, `oklch`, reduced-motion |

## Frameworks / runtime (`framework-`)
| Skill | Covers |
| --- | --- |
| `framework-react.md` | React 19 — Server/Client boundary, `use()`, hooks rules, state strategy, React Compiler memoization |
| `framework-astro.md` | Astro 6 — Islands hydration directives, Content Collections (Zod), Server Islands, SSG-first hybrid |
| `framework-node.md` | Node — ESM, streams, `AsyncLocalStorage`, boundary validation, graceful shutdown, no eval/sync-FS in handlers |

## Libraries / tooling (`lib-`)
| Skill | Covers |
| --- | --- |
| `lib-tailwind.md` | Tailwind v4 — CSS-first `@theme`, `@tailwindcss/vite`, 3 token layers, minimal `@apply`, Oxide |
| `lib-vite.md` | Vite — `defineConfig`, env, `optimizeDeps`, Rollup chunking, plugin order, secrets hygiene |

## Design (`design-`)
| Skill | Covers |
| --- | --- |
| `design-visual.md` | Type scale, color theory, hierarchy, grid, spacing, balance — professional craft |
| `design-systems.md` | Three-layer tokens, Figma Variables, naming, Tailwind v4 `@theme` parity, versioning |
| `design-accessibility.md` | WCAG 2.2 AA — contrast, semantics, keyboard/APG, focus, reduced-motion, touch targets |
| `design-interaction.md` | IA, flows, full state design, micro-interactions, heuristics, friction reduction |

## Engineering craft (`craft-`)
| Skill | Covers |
| --- | --- |
| `craft-code-review.md` | Reviewing/validating code (incl. AI-generated) for correctness, quality, security |
| `craft-automated-testing.md` | Test pyramid, FIRST, TDD, branch coverage, mutation testing |
| `craft-secure-coding.md` | OWASP Top 10, validation, parameterized queries, BOLA/IDOR, secrets, supply chain |
| `craft-clean-code-refactoring.md` | SOLID, KISS, YAGNI, DRY, naming, Boy Scout Rule, continuous refactoring |
| `craft-system-design.md` | CAP, SQL vs NoSQL, monolith vs services, caching, async/event-driven, fault tolerance |
| `craft-api-design.md` | REST + GraphQL, HTTP semantics, idempotency, versioning, pagination, OpenAPI, error contracts |
| `craft-performance.md` | Profiling-first, complexity, N+1, caching, Core Web Vitals, performance budgets |
| `craft-debugging-observability.md` | Systematic debugging, structured logging, RED/USE metrics, tracing, alerting |

## Separation rule
- **Frontend** agents use `lang-{ts,html,css}` + `framework-react`/`framework-astro` + `lib-{tailwind,vite}` + `design-*` + `craft-{code-review,testing,performance}`.
- **Backend** agents use `lang-typescript` + `framework-node` + `craft-{system-design,api-design,secure-coding,code-review,testing}` — **no** frontend framework or Tailwind.
- **Full-stack** spans both at a lighter depth.
