# Interaction & UX Craft (design: interaction)

Interaction design is the discipline of eliminating friction between intent and outcome. It is not decoration — it is the behavioral architecture of a product, expressed through states, flows, feedback, and affordance.

## Apply

1. **Information architecture first** — Before wireframing, map the full IA: primary navigation, content groupings, URL structure, and entry/exit points. Use card sorting or tree testing to validate groupings against user mental models. Navigation that matches how users think about the domain is invisible; navigation that doesn't creates a constant tax on every session.
2. **User flows** — Map every critical path from entry to goal. A flow has: trigger (what initiates it), steps (numbered, one action per step), decision points (branch labeled with conditions), and exit states (success, error, abandoned). Never design a screen without knowing which flows cross it.
3. **State design — the full set** — Design every state for every component: Default, Hover, Focus, Active, Disabled, Loading, Empty, Error, Success. Partial state design means engineers invent the missing states, usually inconsistently. Empty states are especially overlooked and are the first thing new users see.
4. **Empty states** — An empty state is not blank space. It must: communicate what the space is for, explain why it is empty, and provide a clear action to fill it. Empty state copy is not "No data found" — it is the product's first invitation to a new user.
5. **Loading states** — Never show a blank screen while content loads. Skeleton screens (layout-accurate placeholders) are preferred over spinners for page-level loads. Spinners are acceptable for inline actions (form submit, button press). Loading state must communicate progress for operations exceeding 2 seconds.
6. **Error states** — Every error has three parts: what went wrong (human language, not error codes), why it happened (if useful), and what to do next (specific action). "Something went wrong" is not an error state — it is a refusal to design.
7. **Feedback and affordance** — Users must know an action was received within 100ms (button press visual response). State changes (save, send, delete) must be confirmed visually within the interaction. Affordance — the visual quality that signals "this is clickable" — is maintained through consistent treatment: underlines for links, raised or bordered surfaces for buttons. Never make a clickable element look like static text unless the context makes intent unambiguous.
8. **Micro-interactions** — Duration: 150–300ms for most UI transitions (150ms = snappy, 300ms = intentional). Easing: ease-out for elements entering the screen (feel responsive), ease-in for elements leaving (feel resolved). Spring physics for elements dragged or released. Never animate for more than 400ms except in explicitly choreographed sequences (onboarding, celebration moments).
9. **Usability heuristics (Nielsen)** — Apply all 10, but especially: Visibility of system status (users always know what is happening), Match between system and real world (language and concepts from the user's domain, not the code's), Error prevention (constraints and confirmations before destructive actions), Recognition over recall (surface options; don't make users memorize paths), Help and documentation (embedded contextual help at the point of confusion, not in a separate docs site).
10. **Friction reduction** — Measure user effort in clicks, keystrokes, and decisions. Every required decision costs attention. Remove any decision that the system can make on behalf of the user using sensible defaults. Smart defaults are a design decision: the correct default is the choice that most users in most contexts would have made.
11. **Prototyping standard** — Prototype at the fidelity required to answer the specific question. Concept prototypes: paper or low-fi wireframes. Flow prototypes: mid-fi, enough to test navigation and IA. Usability prototypes: high-fi with real content and working states. Never use a lower fidelity than the question demands, and never build a higher fidelity than the question requires.
12. **Usability testing before shipment** — Test critical flows (onboarding, core task, payment) with minimum 5 participants before launch. Recruit from actual ICP, not convenience. Observe task completion, time-on-task, and error recovery. One round of testing with real users removes more friction than any amount of internal review.

## Hygiene

- DO: Name every frame in Figma with the screen name and state (e.g., `Dashboard / Empty State`).
- DO: Map states visually — create a states page in Figma showing every component state together.
- DO: Document the interaction spec alongside the visual spec — animation duration, easing, trigger, and exit behavior.
- DO NOT: Design only the happy path — error, empty, and loading states are required, not optional.
- DO NOT: Use hover-dependent interactions for primary actions on mobile — touch has no hover.
- DO NOT: Auto-advance carousels, auto-dismiss toasts, or impose time pressure on any action without user control.
- DO NOT: Place destructive actions (delete, cancel subscription) without confirmation dialogs and clear labeling.

## Mastery markers

- Every screen in the product has its full state set documented in Figma before engineering begins.
- IA was validated with real users before visual design began; navigation structure is not the designer's mental model.
- Micro-interaction duration and easing are specified in a motion token system, not left to engineering interpretation.
- Empty states include copy, illustration, and a CTA — they are designed to convert a blank state into a first action.
- Error messages are written with the user's perspective ("That email is already in use. Sign in instead, or reset your password."), not the system's perspective ("UniqueConstraintViolation: email").
- Usability test results are documented and tied to specific design decisions.

## Failure signals

- Flows are designed screen-by-screen without a flow map — no one knows how screens connect.
- Loading states are spinners on blank white backgrounds; skeleton screens were never considered.
- Error messages read like server logs ("Error 422: Unprocessable Entity").
- Destructive actions (delete account, remove billing method) have no confirmation step.
- The product's hover states look designed; focus states are the browser default (or absent).
- New user empty states are blank space or "No items yet." — the product fails to explain itself.
- Micro-interactions are either absent (feels unresponsive) or overdone (feels like a game, not a tool).
