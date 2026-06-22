# Kotlin (language: Kotlin)

Kotlin is the required language for new Android development in 2026 and the preferred choice for Kotlin Multiplatform shared logic. Its null-safety system and coroutines model eliminate entire classes of runtime crashes — but only when used as designed, not worked around.

## Best practices

1. **Null safety without `!!`** — use `?.let {}`, `?:` Elvis, and `requireNotNull()` / `checkNotNull()` with messages; ban `!!` in production paths; treat every `!!` in review as a bug to resolve.
2. **Sealed classes for exhaustive state** — model UI or domain state as `sealed class`/`sealed interface`; use `when` on the sealed type and let the compiler enforce exhaustiveness; never add a default branch that swallows unhandled cases.
3. **Data classes for value objects** — use `data class` for DTOs and value objects; do not override `equals`/`hashCode` manually; use `copy()` for immutable updates.
4. **Coroutines and structured concurrency** — launch coroutines from a `CoroutineScope` tied to lifecycle (`viewModelScope`, `lifecycleScope`); never use `GlobalScope` in production; use `Dispatchers.IO` for blocking I/O, `Dispatchers.Default` for CPU-bound work.
5. **Flow for reactive streams** — prefer `StateFlow` / `SharedFlow` over `LiveData` on new code; use `callbackFlow` to bridge legacy callback APIs; collect flows inside `repeatOnLifecycle(Lifecycle.State.STARTED)` to avoid background collection leaks.
6. **Extension functions with restraint** — extend types you don't own for genuine utility, not cosmetic sugar; keep extensions in files named `<Type>Extensions.kt`; do not use extensions to bypass encapsulation.
7. **Jetpack Compose as UI layer (2026 default)** — build stateless `@Composable` functions that take data and callbacks; hoist state to `ViewModel`; use `remember` / `rememberSaveable` correctly; avoid business logic inside `@Composable` bodies.
8. **`ViewModel` + `UiState` pattern** — expose a single `StateFlow<UiState>` from `ViewModel`; never expose `MutableStateFlow` to the UI layer; UI observes, dispatches intent events, never mutates state directly.
9. **Kotlin Multiplatform (KMP) boundary discipline** — keep `commonMain` free of platform types; use `expect`/`actual` only for genuine platform divergence; test `commonMain` logic in `commonTest` with kotlin.test, not JUnit directly.
10. **Dependency injection via Hilt (Android) or Koin (KMP)** — inject dependencies at construction time; never use `companion object` as a service locator; test classes by injecting fakes.

## Hygiene

- No `var` where `val` works — mutability must be justified.
- No `lateinit var` outside of Android lifecycle-owned fields (`@Inject` fields, `View` references); initialize properly or use nullable types.
- No `runBlocking` on the main thread — use `launchWhenStarted` / `lifecycleScope.launch` for Android; `runBlocking` belongs only in test harnesses or true blocking main functions.
- Keep `@Composable` functions under ~40 lines; extract to named composables when composing more than 3 children.
- No raw `Thread` or `Handler`/`Looper` in new code — use coroutines.
- `Parcelable` via `@Parcelize` annotation; never hand-write `Parcelable` implementations.

## Mastery markers

- Writes `Flow` operators (`flatMapLatest`, `combine`, `zip`, `debounce`) without reaching for manual coroutine management.
- Correctly scopes coroutines so cancellation propagates; cancels parent scope cleanly without leaks.
- Understands recomposition scope in Compose and writes composables that minimize unnecessary recompositions.
- Uses `inline` functions and reified generics to avoid runtime type erasure when appropriate.
- Can structure a KMP module with `commonMain`, `androidMain`, and `iosMain` source sets and knows which Kotlin stdlib APIs are available in each.

## Failure signals

- `!!` throughout a codebase — null safety is being suppressed rather than modeled.
- `GlobalScope.launch` for "fire and forget" operations that will outlive the screen.
- `LiveData` used in new `ViewModel` code when `StateFlow` is the current standard.
- Business logic inside `@Composable` body functions — network calls, repository reads.
- `runBlocking` on `Dispatchers.Main` causing ANRs under load.
- `data class` with mutable `var` fields used as domain state, bypassing immutability.
- Platform-specific Android types imported directly into `commonMain`, breaking KMP portability.
