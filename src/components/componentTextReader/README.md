# component-text-reader

Paginated, word-by-word Basque text reader.

## Properties

- `text` — chapter text.
- `dictionary` — personal dictionary entries (`DictionaryEntry[]`).
- `opendataIndex` — set of normalized Open Data source words used for orange fallback
  highlighting (`ReadonlySet<string>`).
- `verbIndex` — set of normalized verb forms, including generated roots, futures,
  habituals and completives, used for teal highlighting (`ReadonlySet<string>`).
- `pageSize` — words per page (default `100`).
- `pageIndex` — current page index.

## Word resolution

Words are highlighted in this order: personal direct match, verb direct match,
Open Data direct match, personal declined form, Open Data declined form, then plain text.
Both dictionaries use `detectSuffixes` so forms such as `etxean` resolve to `etxe`.
Generated verb forms such as `etorriko`, `etortzen`, `etor` and `zenekiela` are matched
directly through `verbIndex`.

Known words are green, personal unknown words yellow, verbs teal, and Open
Data fallback words orange. Clicking a word emits `word-click` with the word, coordinates and, for declined
forms, `baseForm`, `suffix` and `cases`.
