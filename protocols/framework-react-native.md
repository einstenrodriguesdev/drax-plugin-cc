# React Native (framework: React Native)

React Native in 2026 runs on the New Architecture — Fabric renderer and TurboModules replace the asynchronous JS bridge. That change removes the primary performance ceiling but adds new correctness requirements around JSI, synchronous native calls, and concurrent rendering.

## Best practices

1. **New Architecture only** — enable `newArchEnabled=true` in `android/gradle.properties` and set `RCT_NEW_ARCH_ENABLED=1` in iOS; never greenfield a project on the legacy bridge; audit third-party libs for New Arch compatibility before adopting.
2. **TypeScript strictly typed** — apply the same `strict: true` tsconfig discipline as any TypeScript project; type all native module interfaces and navigation param lists explicitly; do not use `any` for native event payloads.
3. **Navigation with React Navigation 7+** — define typed route param lists via `RootStackParamList`; use `useNavigation<StackNavigationProp<...>>()` and `useRoute<RouteProp<...>>()` for type-safe navigation; never pass callbacks through navigation params.
4. **State management at the right altitude** — component-local state via `useState`/`useReducer`; cross-screen shared state via Zustand or Redux Toolkit; server state via TanStack Query (`useQuery`, `useMutation`); do not put remote data in Redux.
5. **JSI TurboModules for native bridges** — write native modules as TurboModules with a TypeScript spec (`NativeModuleSpec`); code-gen the bindings via `react-native-codegen`; never write a legacy `NativeModules.MyModule.method()` call in new code.
6. **Fabric for custom native views** — write custom native UI components as Fabric components with a JS spec; do not mix legacy `requireNativeComponent` with Fabric hosts.
7. **Performance: JS thread budget** — keep JS thread frame time under 16 ms; move heavy computation to `worklets` (Reanimated 3) or native threads; use `InteractionManager.runAfterInteractions` for deferred work post-navigation.
8. **Animations via Reanimated 3** — run animations on the UI thread with `useSharedValue`, `useAnimatedStyle`, and `withTiming`/`withSpring`; never animate with `setState` inside `requestAnimationFrame`.
9. **OTA updates with discipline** — use Expo EAS Update or Microsoft CodePush only for JS bundle changes; never OTA-update code that changes native module interfaces or requires a native binary change; version bundles and pin fallbacks.
10. **Platform-specific code explicitly** — use `Platform.OS === 'ios'` guards or `.ios.tsx` / `.android.tsx` file extensions; never use runtime heuristics to guess the platform; keep platform divergence in dedicated files, not scattered ternaries.

## Hygiene

- No `console.log` in production — strip logs with `babel-plugin-transform-remove-console` in release builds.
- No inline anonymous functions as props on frequently re-rendered components — use `useCallback` to stabilize references.
- No `StyleSheet.create` bypass — keep styles in `StyleSheet.create({})`; do not build style objects inline in render.
- No `key={index}` in lists — use stable entity IDs as keys; `FlatList` with `keyExtractor` returning the entity ID.
- Test on real devices before every release — iOS Simulator and Android Emulator do not reproduce thermal throttling, 60 Hz display jitter, or low-memory kills.
- Separate business logic into plain TypeScript modules with no React imports — they must be unit-testable with Jest without mounting components.

## Mastery markers

- Can profile a dropped-frame incident using Flipper, the Hermes profiler, and React DevTools Profiler to isolate the JS vs. UI thread cause.
- Correctly writes a TurboModule spec and validates that code-gen produces matching C++ and Java/ObjC stubs.
- Understands Hermes bytecode compilation, bundle splitting, and inline requires for startup time reduction.
- Knows the difference between `useNativeDriver: true` animations (UI thread) and JS-thread-driven animations and never conflates them.
- Can set up EAS Build with separate development/staging/production profiles and manage native secrets correctly.

## Failure signals

- `NativeModules.MyModule` used instead of TurboModule — legacy bridge pattern in a New Arch project.
- `useEffect` with no dependency array used for data fetching, causing infinite loops or stale closures.
- `FlatList` with `renderItem` that mounts a heavy component unconditionally — no `memo`, no `getItemLayout`.
- `Animated.Value` from the legacy Animated API mixed with Reanimated `useSharedValue` in the same component.
- OTA update pushed that changes a TurboModule interface without a binary release.
- App bundle size unaudited — no Metro bundle analyzer run before launch.
- Navigation params used to pass functions or large objects — causes serialization errors or stale captures.
