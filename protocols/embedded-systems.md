# Embedded Systems (craft: embedded)

Firmware runs on hardware that cannot be patched mid-flight, has no operating system safety net, and fails silently when memory corrupts. Every design decision is a permanence decision — write code that is correct before it is clean.

## Best practices

1. **No dynamic allocation in hot paths** — no `malloc`/`free` after initialization; use static pools, ring buffers, and pre-allocated structs; fragmentation on a 64 KB heap is a production defect, not a tuning problem.
2. **ISR discipline** — keep ISR bodies minimal: set a flag or push to a ring buffer, return; never call blocking functions, `printf`, or dynamic allocators from an ISR; mark ISR-shared variables `volatile` and protect multi-byte reads with critical sections.
3. **RTOS task design** — assign priorities based on deadline, not importance; use the lowest priority that meets timing requirements; give each task a bounded stack and verify headroom with stack watermark APIs (`uxTaskGetStackHighWaterMark`).
4. **Deterministic timing** — use hardware timers for precise intervals; never use `for`-loop spin-delays as timing primitives in production; characterize worst-case execution time (WCET) for every ISR and time-critical task.
5. **Peripheral register access via named macros** — define register addresses and bit masks as named `#define` or `static const` — never hardcode magic numbers inline; use bit-field structs only when the compiler is verified to produce correct packing for the target ABI.
6. **Power state transitions explicitly modeled** — define a power state machine (`ACTIVE`, `SLEEP`, `DEEP_SLEEP`, `OFF`); never enter low-power modes without disabling peripherals in the correct sequence; document wake sources for every sleep mode used.
7. **Watchdog unconditionally enabled** — configure and feed the hardware watchdog on every execution path; never disable the watchdog in production builds; treat a watchdog reset as a first-class fault to diagnose, not a recovery mechanism to rely on.
8. **Error propagation without exceptions** — return error codes or use `errno`-style globals; define a project-wide error enum; never use C++ exceptions on bare-metal targets with no exception handling infrastructure.
9. **Memory layout owned by the linker script** — place critical sections (.isr_vector, .noinit, fast-path code in SRAM) explicitly in the linker script; never rely on default section placement for anything timing- or safety-critical.
10. **Static analysis as a build gate** — run `cppcheck`, `PC-lint`, or the compiler's `-Wall -Wextra -Werror -pedantic` on every build; treat warnings as build failures; misra-c compliance where safety certification is required.

## Hygiene

- No `printf` in time-critical paths — use DMA-backed UART ring buffers or a dedicated low-priority logging task.
- No unchecked return values from HAL or RTOS calls — check every return code; assert on impossible states with a project-wide `ASSERT(cond)` macro that captures file/line before halting.
- No global mutable state outside of explicitly owned modules — namespace all globals with a module prefix (`uart_rx_buf`, not `rx_buf`).
- No implicit integer promotions in bit manipulation — cast explicitly: `(uint32_t)(reg & MASK) >> SHIFT`, never `reg & MASK >> SHIFT`.
- Keep stack depth bounded — no recursion unless the maximum call depth is proven; instrument stack with canary patterns in debug builds.
- No floating-point in ISRs unless the MCU has an FPU and the context save/restore includes FPU registers.

## Mastery markers

- Reads a disassembly listing and verifies that a critical section compiles to the exact load-modify-store sequence expected.
- Identifies a priority-inversion scenario in a task/mutex design and resolves it with priority inheritance or a lock-free structure.
- Uses a logic analyzer or oscilloscope to validate ISR latency against timing requirements.
- Correctly configures DMA transfers with cache coherency in mind on Cortex-M7 (D-cache invalidation before DMA read, clean before DMA write).
- Can trace a hard fault to the offending instruction using the fault status registers (`CFSR`, `HFSR`, `MMFAR`, `BFAR`).

## Failure signals

- `malloc` called inside a task loop that runs indefinitely — heap fragmentation will crash the device after hours or days.
- `delay_ms(100)` spin-loop blocking a task that shares a mutex with an ISR — creates priority inversion and timing jitter.
- Watchdog disabled with a comment like "re-enable before shipping" — it will not be re-enabled before shipping.
- Peripheral init sequence copied from a forum post with no reference to the datasheet — undefined behavior on the actual silicon revision.
- Stack sizes set to round numbers (512, 1024) with no watermark measurement — the task will overflow under edge-case input.
- `volatile` missing on ISR-shared flag variables — the optimizer will cache the value in a register and the flag will never be seen.
- No test harness for pure logic modules — hardware dependency is an excuse, not a reason; extract business logic and unit-test it on the host.
