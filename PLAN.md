# Hiztegi — Basque reading app: implementation plan

A copy of [lute-v3](https://github.com/LuteOrg/lute-v3) in TypeScript + web components,
with a reader experience similar to [readest](https://github.com/readest/readest) but
supporting per-word highlighting and a click-to-lookup local dictionary.

## Architecture (follows the template's Page/Component convention)

- **Pages** (containers, data access via `@api` decorator, mockable in stories/tests):
  `pageHiztegiApp` (entry point / router), `pageLibrary`, `pageReading`, `pageDictionary`
- **Components** (dumb, props + events): `componentNavBar`, `componentImportFile`,
  `componentLibraryBookCard`, `componentTextReader`, `componentWordTooltip`,
  `componentDictionaryEntryRow`, `componentDictionaryForm`
- **Shared services** (no UI): `types`, `storage` (IndexedDB), `bookStore`,
  `dictionaryStore`, `parsers` (txt/epub/pdf), `tokenizer`, `page` (base page class
  with the navigation helpers)
- **Convention**: every page/component lives in `src/components/<page|component><Name>/`
  with `index.ts` (register), `<name>.ts`, `<name>.stories.ts`, `<name>.test.ts`,
  `package.json`, `README.md` — mirroring `pageExample`/`componentExample`

## Storage (IndexedDB)

DB `hiztegi-db`, object stores:

- `books` (keyPath `id`): title, author, format, addedAt, chapterIds[]
- `chapters` (keyPath `id`): bookId, index, title, text (plain text, original binaries discarded)
- `progress` (keyPath `bookId`): chapterIndex, pageIndex
- `dictionary` (keyPath `word` lowercased): status `'known'|'unknown'`, note, translation

`shared/storage.ts`: small promisified wrapper (`open`, `getAll`, `get`, `put`, `delete`,
`getByIndex`) — hand-rolled (~100 lines) to keep deps minimal (alternative: `idb` package).
`bookStore.ts` / `dictionaryStore.ts` on top for CRUD.

## Parsers (in `shared/parsers/`)

Common output: `{ title, chapters: {title, text}[] }`:

- **txt.ts** — read text, split into chapters by paragraph blocks
- **epub.ts** — `jszip` to unzip, `container.xml` -> OPF -> spine order -> parse each
  XHTML with `DOMParser`, extract body text
- **pdf.ts** — `pdfjs-dist` `getTextContent()` per page; each PDF page becomes a chapter.
  **Known risk:** pdf.js worker bundling with esbuild -> use legacy build + main-thread
  worker strategy (resolved during implementation)

New deps: `pdfjs-dist`, `jszip` (both npm, bundle fine with esbuild).

## Reading view (highlighting + word click)

- `shared/tokenizer.ts` — lossless split of text into tokens (word/space/punct) so
  re-joining is byte-identical
- `componentTextReader` component — receives text + dictionary map, paginates tokens (N words/page,
  Readest-style), renders current page as word `<span>`s: **known** = green,
  **unknown** = yellow, **not in dictionary** = default. Word click -> `word-click` event
- `componentWordTooltip` component — popup at click position with the dictionary entry + note +
  "Mark known"/"Mark unknown" buttons -> emits update/add events
- `pageReading` — loads book/chapter via api, page & chapter navigation, persists progress
  to IndexedDB, re-renders highlights when dictionary changes

## Library & Dictionary views

- `pageLibrary` — lists books, import (`componentImportFile`: drag&drop + `<input type=file
  accept=".txt">` for now, extended to `.epub,.pdf` with M2.3/M2.4), delete, open to read
  (`componentLibraryBookCard`)
- `pageDictionary` — searchable list of entries, add/edit/delete via
  `componentDictionaryEntryRow` + `componentDictionaryForm`

## Router: `pageHiztegiApp` (entry point)

Query-param routing (works in GitHub Pages / vite / storybook, no server rewrites):

- `?page=library` (default/home) -> pageLibrary
- `?page=reading&bookId=<id>` -> pageReading (bookId passed as property)
- `?page=dictionary` -> pageDictionary

Only `pageHiztegiApp` writes the URL (`navigateToPage` -> `history.replaceState` with
query params). Every other page/component dispatches a `page-navigation` (or
`nav-bar-navigation`) event via `Page.triggerPageNavigation`; the router swaps the page
and re-renders. Tests mock the URL helpers from `src/shared/page.ts`.

## App shell + GitHub Pages

- Root `index.html` mounts `<page-hiztegi-app>` + `src/app.ts` (vite app build
  `npm run build:app` -> `dist-app`).
- `npm run build` (esbuild) builds every component bundle into `dist/` and copies the
  entry-point bundle to `gh-pages/pageHiztegiApp.js`. `gh-pages/` (index.html +
  manifest/ + bundle) is the self-contained web version served by GitHub Pages.
- `.github/workflows/deploy.yaml` publishes `./gh-pages` on push to `main`.

## Testing

- Every component/page gets `.test.ts` using `createComponent` + `accessibilityCheck`
  (WTR runs chromium/firefox/webkit, coverage thresholds 80/70/70/80)
- Parser/storage/tokenizer tests under `src/shared/**/*.test.ts` — requires extending
  `wtr.config.mjs` `files` glob and coverage `include` (currently shared is excluded)
- Sample fixtures: small `.txt`, a `.epub` generated in-test with jszip, minimal `.pdf`

## Milestones

1. **M1** Foundation: `types`, IndexedDB `storage`, `bookStore`, `dictionaryStore` + tests
2. **M2** Parsers: txt/epub/pdf + fixtures/tests (+ `pageApp`, `tokenizer`)
3. **M3** Library view: `componentImportFile`, `componentLibraryBookCard`, `pageLibrary`
4. **M4** Dictionary view: `componentDictionaryEntryRow`, `componentDictionaryForm`, `pageDictionary`
5. **M5** Reading view: `componentTextReader`, `componentWordTooltip`, `pageReading`
6. **M6** `pageMainView` router + `componentNavBar` + `index.html`/vite app build
7. **M7** Capacitor Android packaging + docs (README)

## Action Plan

### M1 — Foundation (types, storage, stores)

- [x] **`src/shared/types.ts`** — define `Book`, `Chapter`, `ReadingProgress`, `DictionaryEntry` (`status: 'known'|'unknown'`), `WordStatus` (`'known'|'unknown'|'none'`), `ParsedBook`.
- [x] **`src/shared/storage.ts`** — promisified IndexedDB wrapper: `open()` (DB `hiztegi-db` v1, stores `books`, `chapters`, `progress`, `dictionary`), `getAll`, `get`, `put`, `delete`, `clear`, `transaction`.
- [x] **`src/shared/bookStore.ts`** — `importBook(ParsedBook)`, `getBooks`, `getBook`, `getChapters`, `getChapter`, `deleteBook` (cascade), `saveProgress`, `getProgress`.
- [x] **`src/shared/dictionaryStore.ts`** — `getAll`, `get`, `upsert`, `remove`, `lookup` (lowercase/trim normalization).
- [x] **Tests** — `storage.test.ts`, `bookStore.test.ts`, `dictionaryStore.test.ts` in `src/shared/`.
- [x] **Config tweak** — extend `wtr.config.mjs` `files` glob to `['src/components/**/*.test.ts', 'src/shared/**/*.test.ts']` and coverage `include` to include `src/shared/**/*.ts` (still excluding tests).
- [x] **Verify** — `npm test` passes on chromium/firefox/webkit.

### M2 — Parsers + tokenizer + pageApp (incremental: txt → epub → pdf)

- [x] Install deps: `npm i pdfjs-dist jszip`.

**M2.1 — txt-only pipeline**
- [x] **`src/shared/parsers/txt.ts`** — read as text, split into chapters by paragraph blocks.
- [x] **`src/shared/parsers/index.ts`** — `parseBook(File)` dispatching by extension; `.txt` wired, `.epub`/`.pdf` throw "not implemented yet".
- [x] **Fixtures + tests** — `__fixtures__/sample.txt` + `txt.test.ts` (chapters, empty file, malformed).
- [x] **Verify** — `npm test` green on chromium/firefox, `npm run build`.

**M2.2 — tokenizer + pageApp** (independent of parsers)
- [x] **`src/shared/tokenizer.ts`** — lossless `tokenize(text)` → `{type:'word'|'space'|'punct', text}[]` + tests.
- [x] **`src/components/pageApp/`** — `PageApp extends Page`, override `navigate()` to set `location.hash` (SPA), with `index.ts`/`package.json`/`stories`/`test`/`README` + test.
- [x] **Verify** — `npm test`, `npm run build`.

**M2.3 — epub parser** (only after txt is green)
- [ ] **`src/shared/parsers/epub.ts`** — jszip unzip → `META-INF/container.xml` → OPF → spine order → `DOMParser` body `textContent` per chapter.
- [ ] **WTR fix** — verify `@rollup/plugin-commonjs` jszip CJS interop in `wtr.config.mjs` (installed + wired, awaiting confirmation).
- [ ] Wire `.epub` in `parsers/index.ts`. No automated parser test (manual verification).
- [ ] **Verify** — `npm test`, `npm run build`.

**M2.4 — pdf parser** (only after epub is green)
- [ ] **`src/shared/parsers/pdf.ts`** — pdfjs-dist legacy build, main-thread worker, `getTextContent()` per page → chapter. **Resolve worker bundling here.**
- [ ] Wire `.pdf` in `parsers/index.ts`. No automated parser test (manual verification).
- [ ] **Verify** — `npm test`, `npm run build`.

Note: `smoke.test.ts` (epub/pdf) is deleted; only `txt.test.ts` covers parsers (epub/pdf verified manually in their milestones).

### M3 — Library view (txt only for now)

- [x] **`componentImportFile`** component — hidden `<input type=file accept=".txt" multiple>`, drag&drop zone, emits `files-selected`.
- [x] **`componentLibraryBookCard`** component — props `book`, `progress`; title/format/progress; emits `read-book`, `delete-book`.
- [x] **`pageLibrary`** page — api: `getBooks`, `importBook`, `deleteBook`, `getProgress`, `parseBook`; book list, txt import flow, delete confirm, navigate to `#/read/:id`.
- [x] Stories + tests (mock api via `createComponent`) for all three.
- [x] **Verify** — `npm test`, `npm run build`. Note: `accept=".txt"` only; epub/pdf support lands with M2.3/M2.4.

### M3.1 — update styles

- [x] adding to `agents.md` the styles for the app, so next views will be displayed under those styles.
- [x] `src/shared/styles.ts` — exports `globalStyles` (CSSResultGroup): Manga design tokens + title/card/button styles; imported by `componentLibraryBookCard` and `pageLibrary`

### M3.2 — Fixes storybook

- [x] Review why takes so long to execute `npm start` (takes more than 100 seconds to execute) — Storybook blocks readiness on an awaited `updateCheck()` network call (npm/AWS endpoint) that hangs ~120s in this network; fixed with `--no-version-updates --disable-telemetry` in the `storybook` npm script (`npm start` now ready in ~2-6s). Removed the `@chromatic-com/storybook` addon from `.storybook/main.ts` (was the top CPU consumer at startup).
- [x] Fix css import in preview.ts — added `.storybook/**/*` to `tsconfig.json` `include` so the CSS side-effect import type-checks (`vite/client` declares `*.css`); `.storybook` files were outside the project and got no ambient types (ts(2882))
- [x] Fix issues with pipelines build in github

### M4 — Dictionary view

- [x] **`componentDictionaryEntryRow`** component — word, status badge, note; emits `edit-entry`, `delete-entry`.
- [x] **`componentDictionaryForm`** component — word/status/translation/note fields, validation; emits `save-entry`, `cancel-entry`.
- [x] **`pageDictionary`** page — api: `getEntries`, `upsertEntry`, `deleteEntry`; search filter, list, add/edit form handling.
- [x] Stories + tests.
- [x] **Verify** — `npm test`, `npm run build`.

### M5 — Reading view

- [x] **`componentTextReader`** component — props `text`, `dictionary`, `pageSize`; paginate tokens; render word spans with `known`/`unknown`/plain classes; click → `word-click` (word + coords); prev/next controls; emits `page-change`.
- [x] **`componentWordTooltip`** component — props `word`, `entry?`, `x`, `y`; fixed-position popup (viewport-clamped) with entry + note/translation, "Marcar conocida"/"Marcar nueva"/"Añadir al diccionario"; emits `save-entry`, `close`.
- [x] **`pageReading`** page — api: `getBook`, `getChapters`, `getProgress`, `saveProgress`, `getAllEntries`, `lookupWord`, `upsertEntry`; parses `#/read/:id` (or `bookId` prop), loads book/chapter, restores saved progress, wires `componentTextReader` + `componentWordTooltip`, persists progress, refreshes highlight colors after dictionary changes.
- [x] Stories + tests.
- [x] **Verify** — `npm test`, `npm run build`.

### M6 — `pageHiztegiApp` router + app shell + GitHub Pages

- [x] **`componentNavBar`** component — buttons to library/dictionary (Inicio/Diccionario), dispatches `nav-bar-navigation` events, highlights the active page via `active` prop.
- [x] **`pageHiztegiApp`** page — query-param router: `?page=library|dictionary|reading&bookId=`; renders active page + `componentNavBar`; handles `page-navigation`/`nav-bar-navigation` events and writes the URL via `navigateToPage`.
- [x] **`shared/page.ts`** — base `Page` with all navigation helpers (`triggerPageNavigation`, `navigateToPage`, `navigate`, `openNewTab`, `getQueryParamsURL`, `getHash`, ...); only `pageHiztegiApp` changes the URL.
- [x] **Root `index.html`** — mounts `<page-hiztegi-app>`, imports `pageHiztegiApp` index + base CSS.
- [x] **`vite.config.ts`** — app build (`dist-app`).
- [x] **`package.json`** — add `build:app`: `vite build`.
- [x] **`esbuild.js`** — copies the entry bundle to `gh-pages/pageHiztegiApp.js`.
- [x] **`.github/workflows/deploy.yaml`** — publishes `./gh-pages` to GitHub Pages on push to `main`.
- [x] Stories + tests.
- [x] **Verify** — `npm run build:app` produces a working bundle; manual check in browser.

### M7 — Capacitor Android packaging

- [ ] Install `@capacitor/core`, `@capacitor/cli`, `@capacitor/android`.
- [ ] **`capacitor.config.ts`** — `appId`, `appName`, `webDir: 'dist-app'`.
- [ ] `npx cap add android` + `npx cap sync`.
- [ ] **README** — document `npm run build:app && npx cap sync && npx cap open android`.
- [ ] **Device verification** — IndexedDB persistence under WebView `https://` scheme.

## Risks

- pdf.js worker bundling under esbuild (mitigation: main-thread legacy build)
- EPUB format variations (handle via OPF spine; ignore ncx/toc complexities)
- Word-span rendering performance on long chapters (mitigated by pagination)
- IndexedDB persistence in Capacitor WebView (works under `https://` scheme; verify on device)
