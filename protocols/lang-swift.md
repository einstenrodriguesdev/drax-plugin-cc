# Swift (language: Swift)

Swift's safety model is only valuable when you respect it — optionals are not a nuisance to suppress, they are a precise type-level statement about absence. Write Swift that makes illegal states unrepresentable and lets the compiler enforce the invariants.

## Best practices

1. **Optionals via optional chaining and `guard let`** — use `guard let` at function entry to unwrap and return early; avoid force-unwrap (`!`) except in tests or guaranteed contexts with a comment proving it.
2. **Value semantics by default** — prefer `struct` and `enum` over `class`; only reach for `class` when identity, inheritance, or Objective-C interop are genuinely required.
3. **Protocol-oriented design** — model capabilities as protocols, not class hierarchies; use protocol extensions for shared default behavior; constrain generics with protocols (`<T: Sendable & Identifiable>`).
4. **Actors for shared mutable state** — wrap shared state in `actor` types (Swift 5.5+); avoid `DispatchQueue` wrappers on new code; use `@MainActor` for UI-bound state.
5. **`async/await` over callbacks** — migrate `completion:` APIs to `async throws`; use `async let` for concurrent independent fetches; use `withTaskGroup` for dynamic concurrency.
6. **`Sendable` conformance** — mark types crossing actor boundaries as `Sendable`; enable `SWIFT_STRICT_CONCURRENCY = complete` in build settings; never silence `@Sendable` warnings without understanding the race.
7. **SwiftUI as the UI layer (2026 default)** — build views as pure functions of state (`@State`, `@StateObject`, `@EnvironmentObject`); lift state to the lowest common ancestor; use `@Observable` (Swift 5.9 Observation framework) over manual `ObservableObject` on new code.
8. **ARC and retain-cycle discipline** — always use `[weak self]` or `[unowned self]` in closures that are stored; never `[unowned]` unless the lifecycle is 100% guaranteed; use Instruments Allocations/Leaks on every release candidate.
9. **Error handling with typed throws** — throw domain-specific `enum` errors conforming to `Error`; never swallow errors with `try?` unless absence of a value is the correct semantic; use `Result<T, E>` for async boundaries.
10. **`Codable` with explicit `CodingKeys`** — define `CodingKeys` explicitly when server snake_case differs from Swift camelCase; add `dateDecodingStrategy` at the decoder level, not inline.

## Hygiene

- No `!` force-unwrap in production paths — document every exception with `// safe: <reason>`.
- No `DispatchQueue.main.async` in new SwiftUI code — use `@MainActor` and `Task { @MainActor in }`.
- No `Any` or `AnyObject` in new APIs — use generics or existential `any Protocol` with explicit `some`/`any` distinction.
- Keep `View` bodies thin — extract subviews when a body exceeds ~30 lines; complex layout logic belongs in a `ViewModifier` or a dedicated component.
- No `NotificationCenter` for cross-module communication in new code — use `AsyncStream`, Combine `PassthroughSubject`, or actor-based channels.
- One type per file; file name matches type name exactly.

## Mastery markers

- Correctly chooses `some Protocol` (opaque return type, one concrete type) vs. `any Protocol` (existential, type-erased) and explains the performance difference.
- Writes generic algorithms constrained by protocols rather than overloading for each concrete type.
- Reads Instruments time profiles and identifies main-thread hangs caused by synchronous URLSession or blocking actor calls.
- Correctly annotates concurrent code to satisfy `Strict Concurrency` without mass-casting to `@unchecked Sendable`.
- Knows when `@ViewBuilder` result builders are appropriate and how to author a custom one.

## Failure signals

- Force-unwraps on every optional instead of using `guard let` or `if let`.
- `class` used everywhere with no justification; value semantics ignored.
- Completion handlers mixed with `async/await` at the same layer, creating nested callback pyramids.
- `DispatchQueue.global().async {}` called from a SwiftUI `.onAppear` with no actor isolation.
- `ObservableObject` with `@Published` on every property when `@Observable` would suffice.
- Memory leaks visible in Instruments because closures capture `self` strongly in long-lived objects.
- `print()` left as the error-handling strategy in production code.
