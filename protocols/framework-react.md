# React (framework: React 19)

React 19 is concurrent-rendering-first with stable Server Components, the `use()` hook, and compiler-assisted memoization. The architecture split is Server Components (zero bundle cost, direct data access) vs Client Components (interactivity, browser APIs, event handlers).

## Best practices

1. **Server Components by default** — every component is a Server Component unless it needs state, effects, or browser APIs; add `'use client'` only at the narrowest leaf that requires it.
2. **`use()` for async data in Server Components** — await Promises directly in component bodies on the server; `use(promise)` in Client Components to read a Suspense-wrapped resource.
3. **Hooks rules are invariant** — hooks at top level only; no hooks inside conditions, loops, or nested functions; `react-hooks` ESLint plugin enforced in CI.
4. **State strategy by scope** — local UI state: `useState`/`useReducer`; shared client state: Zustand or Jotai (atomic); server-synchronized state: React Query or SWR with stale-while-revalidate.
5. **Transitions for non-urgent updates** — wrap expensive state updates in `startTransition`; mark them as interruptible; keep input fields responsive while deferred work renders.
6. **Code splitting at route and component boundaries** — `React.lazy` + `<Suspense>` for heavy components; framework-level route splitting (Next App Router does this automatically).
7. **Memoization discipline** — React Compiler (stable in 2025) handles most memoization automatically; do not add `useMemo`/`useCallback` manually unless a profiler measurement proves it helps.
8. **Error boundaries at every async boundary** — pair every `<Suspense>` with an `<ErrorBoundary>`; never let a single fetch failure unmount the whole tree.

## Hygiene

- Do not fetch data in `useEffect` — use a data-fetching library or Server Component; `useEffect` is for side effects (subscriptions, DOM mutations), not data loading.
- No prop drilling past 2 levels — use context or state management; prop drilling past 2 levels signals a missing abstraction.
- Keep `useEffect` dependency arrays honest — ESLint `exhaustive-deps` rule catches omissions; never disable the rule.
- Do not mix Server Component logic (file system, DB) into Client Component files.
- Keys in lists must be stable, unique IDs — never `index` as key when the list can reorder or filter.

## Mastery markers

- Designs the Server/Client Component boundary to minimize the `'use client'` surface area.
- Uses `useOptimistic` to update UI before server confirmation with automatic rollback on failure.
- Knows how React's fiber reconciler schedules work: lanes, priorities, and why `startTransition` yields to user input.
- Implements a compound component pattern using context to share state between parent and children.
- Configures streaming SSR with `<Suspense>` shells so users see a skeleton before data resolves.

## Failure signals

- Fetching data in `useEffect` with an empty dependency array (the classic "componentDidMount" migration mistake).
- `'use client'` at the top of every file regardless of whether the component needs the browser.
- Uncontrolled re-renders because objects/arrays are recreated inline in JSX props.
- No error boundary wrapping async data surfaces — a single bad response whites out the page.
- `useMemo` and `useCallback` everywhere "just in case" (premature optimization, hurts readability).
