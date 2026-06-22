# HTML (language: HTML)

HTML is the accessibility contract between your content and every user agent — browser, screen reader, search crawler, and voice interface. Semantic markup first; ARIA only to fill gaps the native element cannot cover.

## Best practices

1. **Landmark structure always** — every page has exactly one `<main>`; `<header>`, `<nav>`, `<aside>`, `<footer>` as landmarks; never use `<div>` where a landmark element fits.
2. **Heading hierarchy is document outline** — one `<h1>` per page (the page title, not the site name); `<h2>`–`<h6>` in order; never skip levels for visual sizing.
3. **All form controls labeled** — every `<input>`, `<select>`, `<textarea>` has an associated `<label for="id">`; `aria-label` only when no visible text is possible.
4. **Interactive elements are focusable natively** — use `<button>` for actions, `<a href>` for navigation; never `<div onclick>`; never `tabindex` above 0.
5. **Images have meaningful alt text** — decorative images get `alt=""`; informative images get concise description; complex charts get a visible text alternative or `aria-describedby`.
6. **Forms convey errors inline** — associate error messages with the field via `aria-describedby`; set `aria-invalid="true"` on invalid fields; do not rely on color alone.
7. **Language declared** — `<html lang="pt-BR">` (or the appropriate BCP-47 code); inline language changes use `lang` attribute on the element.
8. **Viewport meta is correct** — `<meta name="viewport" content="width=device-width, initial-scale=1">`; never set `user-scalable=no` (breaks zoom accessibility).

## Hygiene

- No `<table>` for layout — tables are for tabular data; complex layouts use CSS grid.
- No empty `href="#"` — use `<button>` or `javascript:void(0)` is obsolete; use real destinations.
- No ARIA roles that duplicate the native element (`role="button"` on `<button>` is redundant).
- Do not add ARIA to fix a broken HTML structure — fix the HTML.
- `<section>` and `<article>` require a heading; a `<div>` with `role="region"` requires `aria-label`.
- Script tags at end of `<body>` or with `defer`/`async`; never blocking in `<head>` without reason.

## Mastery markers

- Knows when `aria-live` regions are appropriate and which politeness level (`polite` vs `assertive`) to use.
- Implements a skip-navigation link correctly (visible on focus, links to `<main>`).
- Understands the difference between `<button type="button">` and `<button type="submit">` inside forms.
- Can write a fully accessible modal dialog: focus trap, `role="dialog"`, `aria-modal="true"`, focus restoration on close.
- Uses `<details>`/`<summary>` for native disclosure without JavaScript.

## Failure signals

- Headings chosen by visual size, not semantic level (using `<h4>` because it "looks right").
- Click handlers on `<div>` or `<span>` without `tabindex="0"` and `role`.
- Form inputs with placeholder text as the only label.
- Missing `alt` attributes on `<img>` (not even `alt=""`).
- `<br><br>` used for paragraph spacing instead of `<p>`.
- ARIA attributes added without understanding what the browser's accessibility tree already provides.
