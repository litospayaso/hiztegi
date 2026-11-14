# Hiztegi

A Basque reading app in the spirit of [lute-v3](https://github.com/LuteOrg/lute-v3),
with a reader experience similar to [readest](https://github.com/readest/readest):
per-word highlighting, click-to-lookup local dictionary, and declension detection for
Basque.

The application UI is in Spanish (the learner's language); only the book content is
Basque.

## Features

- Import books from `.txt`, `.md`, `.markdown`, `.html` and `.htm` files.
- Read books paginated word by word, with **known** / **unknown** / **not in dictionary**
  highlighting.
- Click a word to look it up; declined forms are matched back to their base form using
  the 14 Basque cases (`src/shared/declensions.ts`).
- Add and edit dictionary entries (base form, status, translation, note) and mark words
  as known/unknown.
- Itzuli side panel (`componentIframePanel`) for external lookups.
- Library and dictionary views with progress tracking.
- Local-first storage in IndexedDB (`hiztegi-db`).
- Comic "Manga" theme with Day / Night / Nord themes and multiple accents.
- Storybook documentation and Web Test Runner tests for every page/component.

## Tech stack

- [TypeScript](https://www.typescriptlang.org/)
- [Lit](https://lit.dev/) web components
- [esbuild](https://esbuild.github.io/) (component bundles) and [Vite](https://vite.dev/)
  (application build)
- [Storybook](https://storybook.js.org/)
- [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/) +
  [Playwright](https://playwright.dev/)

## Project structure

The interface is split into **Pages** (containers that own data access and navigation)
and **Components** (dumb, props + events). Every page/component lives in its own folder
under `src/components/` and follows the `page<Name>` / `component<Name>` naming
convention. Each folder contains the Lit class, `index.ts` (tag registration),
a Storybook story, a WTR test, a `package.json` and a `README.md`.

```text
hiztegi/
├── opendata/                  # Bundled Basque–Spanish lexicons (see "Data sources")
│   ├── esp-eu/                # Spanish → Basque (a.json … z.json + otros.json)
│   └── eu-esp/                # Basque → Spanish (a.json … z.json + otros.json)
├── exampleData/               # Sample books for manual testing
│   ├── html/
│   ├── md/
│   └── txt/
├── src/
│   ├── app.ts                 # Application entry: mounts <page-hiztegi-app>
│   ├── index.css
│   ├── components/
│   │   ├── pageHiztegiApp/    # Entry point and query-param router
│   │   ├── pageLibrary/       # Book library (import, delete, open)
│   │   ├── pageReading/       # Reader (chapters, progress, lookups)
│   │   ├── pageDictionary/    # Dictionary management
│   │   ├── componentNavBar/
│   │   ├── componentImportFile/
│   │   ├── componentLibraryBookCard/
│   │   ├── componentTextReader/
│   │   ├── componentWordTooltip/
│   │   ├── componentDictionaryEntryRow/
│   │   ├── componentDictionaryForm/
│   │   └── componentIframePanel/   # Itzuli side panel
│   └── shared/
│       ├── api.decorator.ts   # @api decorator for mockable page data access
│       ├── bookStore.ts       # Book/chapter/progress CRUD
│       ├── dictionaryStore.ts # Dictionary entry CRUD and lookup
│       ├── declensions.ts     # Basque case table + suffix detection
│       ├── page.ts            # Base Page class and navigation helpers
│       ├── storage.ts         # Promisified IndexedDB wrapper
│       ├── tokenizer.ts       # Lossless word/space/punct tokenizer
│       ├── styles.ts          # Design tokens and shared component styles
│       ├── styles/global.css
│       ├── types.ts
│       └── parsers/           # txt, markdown and html implemented
│                              # (epub/pdf are still stubs)
├── scripts/release.js
├── gh-pages/                  # Self-contained web build served by GitHub Pages
├── .docs/                     # AGENTS.md, PLAN.md, TODO.md, declinations.html
├── esbuild.js                 # Builds every component bundle into dist/
├── vite.config.mts            # App build (dist-app/)
├── wtr.config.mjs             # Web Test Runner configuration
└── package.json
```

### Routing

Routing is query-param based so it works on GitHub Pages, Vite and Storybook without
server rewrites:

- `?page=library` (default/home)
- `?page=dictionary`
- `?page=reading&bookId=<id>`

Only `pageHiztegiApp` writes the URL; every other page/component dispatches a
`page-navigation` (or `nav-bar-navigation`) event.

## Data sources and attribution

### Bundled Basque–Spanish lexicons (`opendata/`)

The offline lexicons in `opendata/` come from the **Bilingual lexicons of the Basque
Government's automatic translator** dataset published on Open Data Euskadi. They are
provided in two directions:

- `opendata/esp-eu/` — Spanish → Basque (27 files, 68,033 entries)
- `opendata/eu-esp/` — Basque → Spanish (27 files, 67,508 entries)

Each directory is split by initial letter (`a.json` … `z.json`, plus `otros.json` for
entries that do not start with a–z). Files are JSON arrays of strings in the original
TBX field order:

```text
source term :_: target term :_: part of speech :_: [domain; ...]

"traductor :_: itzultzaile :_: noun :_: [General Vocabulary]"
```

The source TBX files were converted to this JSON layout without changing the entries.

> **Attribution required.** The lexicons are published by the **Basque Government /
> Eusko Jaurlaritza** (Cultura y Política Lingüística) under the **Creative Commons
> Attribution (CC BY 4.0)** license.
>
> - Dataset: *Léxicos bilingües del traductor automático del Gobierno Vasco*
>   (*Eusko Jaurlaritzaren itzultzaile automatikoaren lexiko elebidunak*)
> - Publisher: Eusko Jaurlaritza / Gobierno Vasco
> - Source: <https://opendata.euskadi.eus/catalogo/-/lexicos-bilingues-del-traductor-automatico-del-gobierno-vasco/>
> - Downloaded files:
>   - Spanish → Basque: <https://opendata.euskadi.eus/contenidos/ds_recursos_linguisticos/itzultzaile_automatikoa_lexiko/opendata/es-eu.tbx>
>   - Basque → Spanish: <https://opendata.euskadi.eus/contenidos/ds_recursos_linguisticos/itzultzaile_automatikoa_lexiko/opendata/eu-es.tbx>
> - Dataset last updated: 2016-05-16
> - License: [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/)

The CC BY attribution applies to the dictionary data under `opendata/`. The application
source code is distributed under the project's own license (ISC, see `package.json`).

### Sample books

`exampleData/` contains sample Basque texts in `txt`, `md` and `html` format for manual
testing of the import and reading flows.

## Getting started

Install dependencies and run Storybook:

```bash
npm install
npm start
```

Run the application in development mode with Vite:

```bash
npm run dev
```

## Testing

Tests run with [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/)
through Playwright (Chromium + Firefox), with coverage thresholds enforced.

Component and page tests use `createComponent` + `accessibilityCheck` from
`src/shared/test-helper.ts`; page APIs and URL-changing helpers are mocked so tests do
not touch the real network or `window.location`.

```bash
npm test          # run once with coverage
npm run test:watch
```

## Build the components

```bash
npm run build
```

The build writes every component bundle (ES module + IIFE, with TypeScript declaration
files) and the web components polyfills into `dist/`. The entry-point bundle is also
copied to `gh-pages/pageHiztegiApp.js`.

The full application can be built with Vite:

```bash
npm run build:app
```

Output goes to `dist-app/`.

## Publish component to NPM

Each component folder contains its own `README.md` and `package.json`, so it can be
published to the NPM registry independently. Adjust the `package.json` of the component
you want to publish.

## Publish storybook

```bash
npm run build-storybook
```

## Deploy to GitHub Pages

`gh-pages/` is the self-contained web version of the app. The workflow in
`.github/workflows/deploy.yaml` builds the project and publishes `./gh-pages` on every
push to `main`.

See `.docs/PLAN.md` for the implementation plan and milestones, and `.docs/AGENTS.md`
for the project conventions.
