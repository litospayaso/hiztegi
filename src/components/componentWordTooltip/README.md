# component-word-tooltip

Popup shown when a reader word is clicked.

## Properties

- `word` — clicked word.
- `entry` — personal dictionary entry, when present.
- `openDataEntry` — fallback definition from the bundled Basque → Spanish Open Data
  lexicon, when the word is not in the personal dictionary.
- `verbEntry` — auxiliary verb analyses from the bundled Basque verb tables, when the
  word is not in the personal dictionary.
- `x`, `y` — click coordinates.
- `baseForm`, `suffix`, `cases` — declension information for declined forms.

## Events

- `save-entry` — mark the word as known/unknown.
- `open-add-modal` — add the word to the personal dictionary. When an Open Data entry is
  available its first translation is included in the event detail.
- `close` — close the tooltip.

Open Data definitions show an orange badge and the attribution
“Fuente: Open Data Euskadi (CC BY 4.0)”. Verb entries show a teal badge plus structured
analysis tags (lemma, paradigm, tense, mode, persons, allocutive) and the source table.
