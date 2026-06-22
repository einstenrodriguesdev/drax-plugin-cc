# JavaScript (language: JavaScript)

Modern JavaScript is ESM-first, async-native, and immutable-by-default. The language has sharp edges — coercion, equality, and iterator protocol — that separate disciplined from careless code.

## Best practices

1. **ESM everywhere** — use `import`/`export`; never `require()` in new code; set `"type": "module"` in `package.json`.
2. **Async/await over raw Promises** — chains hide errors; use `await` with explicit `try/catch`; never swallow rejections.
3. **Immutability first** — prefer `const`; use spread/`Object.assign` for copies; treat arrays as append-only; reach for `structuredClone` for deep copies.
4. **Strict equality always** — `===` everywhere; the only time `==` is acceptable is `x == null` (catches both `null` and `undefined`).
5. **Iterators and generators** — use `for...of` over index loops; expose lazy sequences via generator functions instead of building full arrays.
6. **Optional chaining and nullish coalescing** — `?.` and `??` replace defensive ternaries; never use `||` as a null guard (it swallows `0`, `false`, `""`).
7. **Error subclasses** — throw typed errors (`class NotFoundError extends Error`); always set `name` in the constructor; never throw plain strings.
8. **Module boundary discipline** — one default export per module; named exports for utilities; avoid barrel files that pull in the whole tree.

## Hygiene

- Do not mutate function arguments — clone first.
- Do not rely on `arguments`; use rest parameters (`...args`).
- No `var` — ever. No implicit globals.
- No floating Promises — every async call must be `await`ed or `.catch()`-handled.
- No `delete` on hot objects (forces de-optimization in V8).
- Keep functions under 30 lines; extract when a function needs a comment to explain what it does.
- No `eval`, `Function()` constructor, or `with`.

## Mastery markers

- Understands the event loop: macrotask queue, microtask queue, `queueMicrotask`, `setTimeout` ordering.
- Correctly uses `WeakMap`/`WeakRef` for caches that should not prevent GC.
- Implements custom iterables (`[Symbol.iterator]`) and async iterables (`[Symbol.asyncIterator]`).
- Knows when `Promise.all` vs `Promise.allSettled` vs `Promise.race` vs `Promise.any` is the right combinator.
- Uses `structuredClone` vs JSON round-trip vs `_.cloneDeep` with awareness of their trade-offs.

## Failure signals

- `==` in conditionals other than `== null`.
- Unhandled promise rejection warnings in logs.
- Mutating function arguments and discovering bugs when callers inspect their original data.
- Using `||` as a default value guard on numbers or booleans.
- `require()` in a file that has `import` statements (CJS/ESM interop bombs).
- Deep nested `.then().then().catch()` chains in new code.
