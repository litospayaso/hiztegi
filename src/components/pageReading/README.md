# page-reading

Reading page container: loads a book/chapter, persists progress and coordinates word
lookups.

## Lookup flow

1. Personal dictionary direct match.
2. Personal dictionary declined form (via `detectSuffixes`).
3. Open Data Basque → Spanish direct match.
4. Open Data declined form.
5. No entry: the tooltip offers adding the word to the personal dictionary.

The page loads the compact Open Data index with the personal dictionary and passes it to
`component-text-reader` for orange fallback highlighting. Definitions are fetched lazily
when a word is clicked. Open Data words can be added to the personal dictionary with the
first translation pre-filled.
