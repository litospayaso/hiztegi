# component-word-tooltip

Popup shown when a reader word is clicked.

## Properties

- `word` — clicked word.
- `entry` — personal dictionary entry, when present.
- `openDataEntry` — fallback definition from the bundled Basque → Spanish Open Data
  lexicon, when the word is not in the personal dictionary.
- `verbEntry` — verb analyses and/or derivations from the bundled Basque verb tables,
  when the word is not in the personal dictionary.
- `x`, `y` — click coordinates.
- `baseForm`, `suffix`, `cases` — declension information for declined forms.

## Events

- `save-entry` — mark the word as known/unknown.
- `open-add-modal` — add the word to the personal dictionary. When an Open Data entry is
  available its first translation is included in the event detail; for derived verbs the
  event uses the lemma and the derivation meaning.
- `close` — close the tooltip.

Open Data definitions show an orange badge and the attribution
“Fuente: Open Data Euskadi (CC BY 4.0)”. Verb entries show a teal badge plus structured
analysis tags (lemma, paradigm, tense, mode, persons, allocutive) and the source table.
Generated derivatives show labels such as “Futuro de etorri”, “Raíz de etorri” or
“Completivo -la de zenekien”, with the base form, lemma, meaning and base analysis tags.
The `-en` completive is shown as an annotation on existing finite forms ending in `-n`.
