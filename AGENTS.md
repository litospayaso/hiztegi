# Hiztegi — project conventions

Basque reading app (lute-v3-style, readest-like reader) built with TypeScript + Lit
web components, Storybook, and Web Test Runner. See `PLAN.md` for the implementation plan.

## Folder & naming convention (IMPORTANT)

Every UI piece lives in `src/components/` in its own folder:

- Pages: `src/components/page<Name>/` — class `Page<Name>`, tag `page-<name>`
  - e.g. `pageLibrary/` → class `PageLibrary`, tag `page-library`
- Components: `src/components/component<Name>/` — class `Component<Name>`, tag `component-<name>`
  - e.g. `componentImportFile/` → class `ComponentImportFile`, tag `component-import-file`

Each folder contains exactly these files (mirror `pageExample`/`componentExample`):

- `<folderName>.ts` — the Lit class (also exports the props interface, e.g. `PageExampleInterface`)
- `index.ts` — imports the class and calls `register('<tag>', Class)` from `src/shared/functions.ts`
- `<folderName>.stories.ts` — Storybook story (`Meta`/`StoryObj` from `@storybook/web-components-vite`)
- `<folderName>.test.ts` — WTR tests
- `package.json` — `name` = the kebab-case tag, `private: true`, version `0.0.1`, author "Angel Hita"
- `README.md` — one line: `# <tag>`

Non-UI logic lives in `src/shared/` (`types.ts`, `storage.ts`, `bookStore.ts`,
`dictionaryStore.ts`, `parsers/`, `tokenizer.ts`, `page.ts`). Base page `Page` is in
`src/shared/page.ts`.

## Pages

- Every page extends `Page` (`src/shared/page.ts`) — NOT a `PageApp` subclass (the old
  `pageApp` was removed; the app shell is `pageHiztegiApp`).
- `pageHiztegiApp` (`src/components/pageHiztegiApp/`, tag `page-hiztegi-app`) is the
  **entry point / router** of the whole app. It is the only component allowed to change
  the URL (it writes query params via `navigateToPage`). `src/app.ts` + `index.html`
  mount it for the vite app build; the `gh-pages/` web version mounts the same tag.
- Pages get API access via the `@api({...})` decorator
  (`src/shared/api.decorator.ts`); the class generic carries the api type, e.g.
  `PageLibrary extends Page<PageLibraryApi>`. The api object wires real store/parser
  functions (mockable in tests/stories).
- `onPageInit()` (async) is called on connect.
- Import child component indexes in the page file to register their tags
  (e.g. `import '../componentImportFile/index';`).

### Routing & navigation (query params, event-driven)

- Navigation is done through **query params**, e.g. the home page is
  `localhost:6060?page=library`, the reader is `localhost:6060?page=reading&bookId=b1`.
  Supported values: `library` (default/home), `dictionary`, `reading`.
- **Only `pageHiztegiApp` changes the URL**, via `navigateToPage(queryParams)`
  (`history.replaceState`). It reads the active route with
  `getQueryParamsURL()` / `getHash()` and re-renders the matching page.
- **Every other page/component must NOT touch `window.location`.** To navigate it calls
  `this.triggerPageNavigation({ page, bookId? })`, which bubbles a `page-navigation`
  event up to `pageHiztegiApp`; the router then updates the URL and swaps the page.
  Dumb components (e.g. `componentNavBar`) dispatch their own `*-navigation` events
  (`nav-bar-navigation`) with the same shape.
- `navigate()` performs a full page load and is only for external links — never for
  internal navigation.
- Pages read route params (`page`, `bookId`) from the URL with the helpers on `Page`
  (`getQueryParamsURL`, `getHash`, `getHostname`, `getHref`).

### Testing navigation

- Tests **mock every URL-changing function** from `src/shared/page.ts` (`navigate`,
  `navigateToPage`, `openNewTab`) via `createComponent`'s `mock` option — that is why
  they all live in that one file. Assert that a `page-navigation` (or `nav-bar-*`)
  event was dispatched instead of checking `window.location`.

## Components

- Dumb components: props via `@property()`, state via `@state()`, events dispatched as
  `CustomEvent` with `bubbles: true, composed: true` (e.g. `files-selected`, `read-book`).
- End every class file with the `declare global { interface HTMLElementTagNameMap { ... } }` block.

## Styles (M3.1) — comic "Manga" skin

The app follows the **Manga** personality of
[komi-store v1.9.2](https://github.com/kurikomi-labs/komi-store/releases/tag/v1.9.2):
bold, inked, comic-panel look — warm paper pages, pure-ink outlines, zero-blur hard
"printed" shadows, sharp 0px corners, loud display type (Anton), and stamp-style
pressed buttons. App UI strings stay in Spanish; only book *content* is Basque.

**Single source of truth:** `src/shared/styles.ts` exports a `styles` object where every
entry is an individual `CSSResult` — import ONLY the pieces each component uses:

- Base (every component): `styles.hostStyle` (base `:host` typography),
  `styles.designTokens` (type/shape/shadow/motion tokens), `styles.themeTokens`
  (palette + `data-theme` overrides), `styles.accentTokens` (accent + `data-accent`).
- Element styles (only what you render): `styles.headerStyle` (h1–h3, `.hzt-title`),
  `styles.cardStyle` (`.hzt-card`), `styles.buttonStyle` (`.hzt-button` + modifiers).

```ts
import { styles } from '../../shared/styles';

static styles = [
  styles.hostStyle,
  styles.designTokens,
  styles.themeTokens,
  styles.accentTokens,
  styles.buttonStyle, // only if the component renders .hzt-button
  css`
    /* component-specific rules */
  `,
];
```

Do NOT import `styles` entries the component never renders — unused CSS ships into its
bundle. Pages inherit the base from `Page.styles` (shared/page.ts: host typography,
design/theme/accent tokens + paper background) and add only what they need on top.

Do NOT hard-code colors, fonts, radii or shadows in component styles — always reference
tokens (`var(--hzt-*)`).

### Element classes provided (shadow-safe)

- Titles: `h1`, `h2`, `h3` (or `.hzt-title`) — Anton display font, uppercase, tracked.
- Card/panel: `.hzt-card` — `--hzt-panel` background, 3px ink border, hard offset shadow.
- Buttons: `.hzt-button` + modifier `hzt-button--primary` (accent), `--destructive`
  (error), `--outline` (transparent), `--text` (borderless). Stamp press: hover lifts,
  `:active` stamps down 4px onto a collapsed shadow. No ripple.

### Design tokens (Day default)

| Token | Value | Token | Value |
| --- | --- | --- | --- |
| `--hzt-paper` | `#f1eadc` | `--hzt-accent` | `#d8202a` |
| `--hzt-panel` | `#faf5ea` | `--hzt-on-accent` | `#ffffff` |
| `--hzt-well` | `#e7dec9` | `--hzt-error` | `#b3261e` |
| `--hzt-ink` | `#1b150d` | `--hzt-on-error` | `#ffffff` |
| `--hzt-muted` | `#695f50` | `--hzt-shadow` | `#1b150d` |
| `--hzt-mark` | `#ffd60a` | `--hzt-on-mark` | `#1b150d` |

Fonts: `--hzt-font-display` (Anton), `--hzt-font-body` (Noto Sans), `--hzt-font-mono`
(JetBrains Mono). Scale: display 28px / title 22px / stamp 15px / body 14px / label 12px.
Shapes: `--hzt-corner: 0px` (sharp), `--hzt-border-panel: 3px`, `--hzt-border-button: 2.5px`,
`--hzt-shadow-card: 6px 6px 0`, `--hzt-shadow-button: 4px 4px 0` (no blur),
`--hzt-press-translate: 4px`. Motion: `--hzt-motion-press: 100ms`, `--hzt-motion-card: 240ms`.

### Themes & accents

Theme = paper: Day (`data-theme="day"`, default), Night (`data-theme="night"`),
Nord (`data-theme="nord"`). Accent = ink: crimson (default), cobalt, sun, frost, mono.
Set on `:root`/`<html>` (or per-component on the host element): tokens cascade into shadow
DOM. E.g. `document.documentElement.dataset.theme = 'night'`.

The fonts (Anton, Noto Sans, JetBrains Mono) are loaded by the app entry (`index.html` in
M6) via Google Fonts; token stacks include fallbacks so tests/stories never depend on them.

## Testing (WTR)

- Run: `npm test` (chromium + firefox, with coverage). Watch: `npm run test:watch`.
- Component/page tests use `createComponent` + `accessibilityCheck` from
  `src/shared/test-helper.ts`; mock page APIs via the `api` option and the
  URL-changing helpers (`navigate`, `navigateToPage`, `openNewTab`) via the `mock`
  option (they live together in `src/shared/page.ts` so tests can override them).
- Children render inside their own shadow roots — query their `shadowRoot` for assertions.
- Shared-logic tests live in `src/shared/tests/` (or colocated, e.g. `parsers/txt.test.ts`).
- Async DOM updates: poll with a small `waitFor` helper rather than fixed timers.
- axe color-contrast is enforced — keep text colors ≥ 4.5:1 on their backgrounds.

## Verification before finishing a task

1. `npx tsc --noEmit` (strict; no unused locals/params)
2. `npm test` — all green
3. `npm run build` — builds every component bundle into `dist/`

## Current state / constraints

- Parsers: txt is implemented + tested; epub/pdf are stubbed (`parseBook` throws
  "not implemented yet") — pending M2.3/M2.4.
- **App UI strings are in Spanish** (the learner's language), e.g. "Biblioteca",
  "Importando...", "Leer", "Eliminar". Only the book *content* is Basque — the app
  teaches Basque to beginners, so UI chrome must not add extra friction.
- Routing is query-param based (see above): `?page=library|dictionary|reading`,
  plus `&bookId=` for the reader. `pageHiztegiApp` is the single entry point.

## Build & GitHub Pages

- `npm run build` (esbuild) builds **every component bundle** into `dist/` (versioned
  folders) and then copies the entry-point bundle to `gh-pages/pageHiztegiApp.js`.
- `gh-pages/` is the self-contained **web version of the app** (`index.html` +
  manifest/ + the copied bundle) and is what GitHub Pages serves.
- `.github/workflows/deploy.yaml` publishes `./gh-pages` on push to `main`
  (`npm ci` → `npm run build` → `actions/deploy-pages`).
