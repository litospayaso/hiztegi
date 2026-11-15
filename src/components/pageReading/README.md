# page-reading

Reading page container: loads a book/chapter, persists progress and coordinates word
lookups.

## Lookup flow

1. Personal dictionary direct match.
2. Auxiliary verb direct match.
3. Open Data Basque → Spanish direct match.
4. Personal dictionary declined form (via `detectSuffixes`).
5. Open Data declined form.
6. No entry: the tooltip offers adding the word to the personal dictionary.

The page loads the compact Open Data and verb indexes with the personal dictionary and
passes them to `component-text-reader` for orange/teal highlighting. Definitions are
fetched lazily when a word is clicked. Open Data words can be added to the personal
dictionary with the first translation pre-filled; verb words show structured analyses.
