# Accessible & Inclusive Design (design: accessibility)

Accessibility is not a compliance checkbox — it is the baseline of craft. A product that excludes users with disabilities has not been fully designed. WCAG 2.2 AA is the floor; treat it as the minimum, not the target.

## Apply

1. **Color contrast ratios** — Normal text (< 18px or < 14px bold): minimum 4.5:1 against background. Large text (18px+ or 14px+ bold): minimum 3:1. UI components (input borders, focus rings, icon-only buttons): minimum 3:1. Decorative elements: no requirement. Verify with tooling (Figma Contrast plugin, Stark, or `color-contrast()` in browser DevTools) — never eyeball.
2. **Color independence** — Every state communicated by color must also be communicated by shape, pattern, label, or icon. Error fields: red border + error icon + text message. Required fields: asterisk + label text, not just red color. Charts: patterns or labels alongside hue differences.
3. **Semantic HTML structure** — `<h1>` through `<h6>` form a logical document outline. Landmark elements (`<main>`, `<nav>`, `<aside>`, `<footer>`) are present and singular where required. Lists use `<ul>`/`<ol>`. Tables have `<th scope>`. Never use `<div>` or `<span>` where a semantic element exists.
4. **Keyboard support** — Every interactive element is reachable and operable via keyboard alone. Tab order follows visual reading order. Custom components (dropdowns, modals, date pickers) implement the ARIA Authoring Practices Guide (APG) keyboard patterns exactly — not approximately.
5. **Focus management** — Focus ring must be visible at all times. Do not suppress with `outline: none` without providing a custom `:focus-visible` replacement at minimum 3:1 contrast. On modal open, move focus to the first interactive element inside. On modal close, return focus to the trigger element.
6. **ARIA usage** — Use ARIA to describe what HTML cannot. Add `aria-label` when visible text is absent (icon buttons). Add `aria-describedby` to link helper text to inputs. Use `role` only when overriding implicit semantics. ARIA does not fix broken HTML structure — semantic HTML first, ARIA second.
7. **ARIA anti-patterns** — Never use `role="button"` on a `<div>` when `<button>` is available. Never set `aria-hidden="true"` on a focusable element. Never apply `aria-required` without also setting the native `required` attribute on form inputs. Never use `aria-label` to override meaningful visible text unless the override is intentional and superior.
8. **Readable typography for accessibility** — Body text minimum 16px (1rem) for primary reading surfaces. Line-height minimum 1.5 for body. Letter-spacing not tightened below font defaults. Paragraph spacing at least 2× line-height. Text must reflow without horizontal scrolling at 400% zoom (WCAG 1.4.10 Reflow).
9. **Reduced motion** — Wrap all transitions and animations in `@media (prefers-reduced-motion: reduce)`. Disable or minimize animation for users who have flagged motion sensitivity. Autoplay video and parallax effects must respect this preference. In Figma, document which animations are motion-sensitive and must have reduced-motion variants.
10. **Touch target sizing** — Interactive elements minimum 44×44px touch target (WCAG 2.5.5). On mobile, spacing between adjacent targets must prevent mis-taps. Decorative or non-interactive elements do not need targets.
11. **Images and icons** — Informative images require descriptive `alt` text. Decorative images use `alt=""`. Icon-only buttons require `aria-label` or visually hidden text. SVGs that convey meaning use `<title>` and `aria-labelledby`.
12. **Error identification** — Errors must be identified in text, not only by color or icon. Error messages must be associated with the input via `aria-describedby` or `aria-errormessage`. Inline validation must not fire on first keystroke — validate on blur or submit.

## Hygiene

- DO: Run automated accessibility checks (axe-core, Lighthouse) in CI — catch ~30–40% of issues automatically.
- DO: Test with a keyboard only, no mouse, before any feature ships.
- DO: Test with VoiceOver (macOS/iOS) and NVDA/JAWS (Windows) on critical paths (checkout, onboarding, auth).
- DO NOT: Remove focus outlines without providing a replacement that passes 3:1 contrast.
- DO NOT: Use placeholder text as the only label for an input — it disappears on focus.
- DO NOT: Trap keyboard focus anywhere except modals and dialogs (and release it on Escape).
- DO NOT: Set `aria-hidden` on a container that holds focusable children.

## Mastery markers

- Every color in the system was contrast-checked at point of creation, not at point of audit.
- Custom interactive components pass APG pattern tests before design handoff — keyboard behavior is specified.
- Reduced-motion variants are designed alongside animated variants, not added later.
- The component library documents accessibility annotations for every component: role, ARIA attributes, keyboard interactions, focus behavior.
- Automated a11y CI gate blocks merge on new violations.

## Failure signals

- Error states communicate only through red color — no icon, no text message.
- Focus styles are `outline: none` with no replacement — keyboard users are navigating blind.
- `<div onclick>` used for buttons and links throughout the codebase.
- Modals trap focus or don't move focus on open — screen reader users cannot find modal content.
- Accessibility is addressed in a "final pass" review, not during design and component authoring.
- Alt text is missing from images, or set to the filename (`image-final-v3.png`).
- Animations play at full intensity for users with `prefers-reduced-motion` enabled.
