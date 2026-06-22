# TypeScript (language: TypeScript)

TypeScript's value is in making impossible states unrepresentable. That requires strict mode, precise types, and zero tolerance for `any` as a safety escape hatch.

## Best practices

1. **Strict mode, no exceptions** — `"strict": true` in `tsconfig.json`; also enable `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitReturns`.
2. **`unknown` over `any`** — `unknown` forces narrowing before use; `any` silently disables the type checker; ban `any` with ESLint `@typescript-eslint/no-explicit-any`.
3. **Discriminated unions** — model state as `type Result<T> = { ok: true; value: T } | { ok: false; error: string }`; exhaustive `switch` on the discriminant.
4. **Generics with constraints** — write `<T extends Record<string, unknown>>` not `<T>`; constrain at the call site, not inside the body.
5. **Conditional and mapped types** — `Extract`, `Exclude`, `ReturnType`, `Awaited`, `Parameters` before rolling your own; use `infer` inside `extends` for type-level extraction.
6. **Template-literal types** — use `type Route = \`/api/\${string}\`` to validate string shapes at the type level; combine with `as const` for enums.
7. **Type narrowing explicitly** — `instanceof`, `typeof`, `in`, and user-defined type guards (`x is Foo`) over casts; a cast (`as Foo`) documents that you stopped checking.
8. **`satisfies` operator** — use `satisfies` to validate a value against a type without widening the inferred type; replaces many `as const` + explicit annotation combos.

## Hygiene

- No `@ts-ignore` — use `@ts-expect-error` with a comment explaining why, and delete it when fixed.
- No `as any` in production code — only in test utilities with a comment.
- No `!` non-null assertions on values that could legitimately be null; narrow instead.
- Keep type utilities in a `types/` directory; do not colocate complex type algebra next to runtime code.
- Prefer `interface` for extensible object shapes; `type` for unions, intersections, and aliases.
- Use `readonly` on array and object types that must not be mutated.

## Mastery markers

- Writes mapped types that transform one type into another without manual field listing.
- Uses `infer` inside `extends` to extract sub-types from conditional types.
- Understands variance: covariance on return types, contravariance on parameter types; why `Array<Dog>` is not assignable to `Array<Animal>`.
- Can debug "type instantiation is excessively deep" errors by simplifying recursive types.
- Uses declaration merging and module augmentation to extend third-party types without forking.

## Failure signals

- `any` used to silence a type error instead of fixing the type.
- `as Foo` on every API response (runtime shape is unvalidated).
- Union types with 10+ members that could be collapsed with a discriminant.
- Type parameters named `T1`, `T2`, `T3` with no constraints and no documentation.
- `// @ts-ignore` with no explanation, committed to main.
- `object` or `{}` used as a type where a specific interface was needed.
