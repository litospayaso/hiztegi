import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  completiveEnikFor,
  completiveLaFor,
  futureFor,
  habitualFor,
  isCompletiveSourceSafe,
  isSingleWord,
  normalizeWord,
  rootFor,
  SAME_FORM_ROOTS,
} from './verbMorphology.mjs';

const EU_ESP_DIR = 'opendata/eu-esp';
const BASE_DIR = 'opendata/verbs';
const DERIVED_DIR = `${BASE_DIR}/derived`;
const BASE_INDEX_FILE = `${BASE_DIR}/index.json`;
const OPEN_INDEX_FILE = `${EU_ESP_DIR}/index.json`;
const DERIVED_INDEX_FILE = `${DERIVED_DIR}/index.json`;

const readJson = file => JSON.parse(readFileSync(file, 'utf8'));

const letterFor = word => {
  const initial = normalizeWord(word).normalize('NFD').charAt(0);
  return /^[a-z]$/.test(initial) ? initial : 'otros';
};

export const collectLexicalVerbs = () => {
  const verbs = new Map();
  const files = readdirSync(EU_ESP_DIR)
    .filter(name => name.endsWith('.json') && name !== 'index.json')
    .sort();
  for (const file of files) {
    const entries = readJson(join(EU_ESP_DIR, file));
    for (const line of entries) {
      const parts = String(line).split(' :_: ');
      if (parts.length < 3) {
        continue;
      }
      const word = normalizeWord(parts[0] ?? '');
      const partOfSpeech = String(parts[2] ?? '').trim().toLocaleLowerCase();
      if (partOfSpeech !== 'verb' || !isSingleWord(word) || verbs.has(word)) {
        continue;
      }
      const meaning = String(parts[1] ?? '').trim();
      verbs.set(word, meaning || undefined);
    }
  }
  return verbs;
};

const collectBaseEntries = () => {
  const entries = new Map();
  const files = readdirSync(BASE_DIR, { withFileTypes: true })
    .filter(item => item.isFile() && (item.name.endsWith('.json') || item.name === 'otros.json'))
    .map(item => item.name)
    .filter(name => name !== 'index.json')
    .sort();
  for (const file of files) {
    const values = readJson(join(BASE_DIR, file));
    for (const entry of values) {
      const word = normalizeWord(entry.word ?? '');
      if (!word || !Array.isArray(entry.analyses)) {
        continue;
      }
      const analyses = entries.get(word) ?? [];
      analyses.push(...entry.analyses);
      entries.set(word, analyses);
    }
  }
  return entries;
};

const addDerivation = (target, word, derivation) => {
  const entry = target.get(word) ?? { word, derivations: [] };
  const key = JSON.stringify([derivation.type, derivation.from, derivation.lemma]);
  if (!entry.derivations.some(candidate => JSON.stringify([
    candidate.type,
    candidate.from,
    candidate.lemma,
  ]) === key)) {
    entry.derivations.push(derivation);
  }
  target.set(word, entry);
};

export const buildDerivedEntries = ({
  lexicalVerbs,
  baseEntries,
  baseIndex,
  openIndex,
}) => {
  const derived = new Map();
  const skipped = {
    root: [],
    future: [],
    habitual: [],
    la: [],
    enik: [],
  };

  for (const [lemma, meaning] of lexicalVerbs) {
    const root = rootFor(lemma);
    if (root && (root !== lemma || SAME_FORM_ROOTS.has(lemma))) {
      if (openIndex.has(root) && !baseIndex.has(root) && !SAME_FORM_ROOTS.has(lemma)) {
        skipped.root.push(root);
      } else {
        addDerivation(derived, root, {
          type: 'root',
          from: lemma,
          lemma,
          ...(meaning ? { meaning } : {}),
        });
      }
    }

    const future = futureFor(lemma);
    if (future && future !== lemma) {
      if (openIndex.has(future) && !baseIndex.has(future)) {
        skipped.future.push(future);
      } else {
        addDerivation(derived, future, {
          type: 'future',
          from: lemma,
          lemma,
          ...(meaning ? { meaning } : {}),
        });
      }
    }

    const habitual = habitualFor(lemma);
    if (!habitual) {
      skipped.habitual.push(lemma);
    } else if (habitual !== lemma) {
      if (openIndex.has(habitual) && !baseIndex.has(habitual)) {
        skipped.habitual.push(habitual);
      } else {
        addDerivation(derived, habitual, {
          type: 'habitual',
          from: lemma,
          lemma,
          ...(meaning ? { meaning } : {}),
        });
      }
    }
  }

  for (const [word, analyses] of baseEntries) {
    for (const analysis of analyses) {
      if (!isCompletiveSourceSafe(analysis)) {
        continue;
      }
      const lemma = normalizeWord(analysis.lemma ?? '');
      if (!lemma) {
        continue;
      }
      const meaning = typeof analysis.meaning === 'string' ? analysis.meaning : undefined;

      const la = completiveLaFor(word);
      if (la && la !== word) {
        if (openIndex.has(la) && !baseIndex.has(la)) {
          skipped.la.push(la);
        } else {
          addDerivation(derived, la, {
            type: 'completive-la',
            from: word,
            lemma,
            ...(meaning ? { meaning } : {}),
          });
        }
      }

      const enik = completiveEnikFor(word);
      if (enik) {
        if (openIndex.has(enik) && !baseIndex.has(enik)) {
          skipped.enik.push(enik);
        } else {
          addDerivation(derived, enik, {
            type: 'completive-enik',
            from: word,
            lemma,
            ...(meaning ? { meaning } : {}),
          });
        }
      }
    }
  }

  return { derived, skipped };
};

const buildOutputs = derived => {
  const groups = new Map();
  for (const letter of [...'abcdefghijklmnopqrstuvwxyz', 'otros']) {
    groups.set(letter, []);
  }
  for (const entry of derived.values()) {
    groups.get(letterFor(entry.word)).push(entry);
  }
  const outputs = new Map();
  for (const [letter, entries] of groups) {
    entries.sort((a, b) => a.word.localeCompare(b.word, 'eu'));
    outputs.set(`${DERIVED_DIR}/${letter}.json`, `${JSON.stringify(entries, null, 2)}\n`);
  }
  const words = [...derived.keys()].sort((a, b) => a.localeCompare(b, 'eu'));
  outputs.set(DERIVED_INDEX_FILE, `${JSON.stringify(words)}\n`);
  return outputs;
};

const countTypes = derived => {
  const counts = {};
  for (const entry of derived.values()) {
    for (const derivation of entry.derivations) {
      counts[derivation.type] = (counts[derivation.type] ?? 0) + 1;
    }
  }
  return counts;
};

const writeOutputs = (outputs, check) => {
  let changed = false;
  for (const [file, content] of outputs) {
    if (check) {
      if (!existsSync(file) || readFileSync(file, 'utf8') !== content) {
        console.error(`[opendata:verbs] out of date: ${file}`);
        changed = true;
      }
      continue;
    }
    mkdirSync(resolve(file, '..'), { recursive: true });
    writeFileSync(file, content);
  }
  if (check) {
    return !changed;
  }
  return true;
};

const main = () => {
  const check = process.argv.includes('--check');
  const lexicalVerbs = collectLexicalVerbs();
  const baseEntries = collectBaseEntries();
  const baseIndex = new Set(readJson(BASE_INDEX_FILE).map(normalizeWord));
  const openIndex = new Set(readJson(OPEN_INDEX_FILE).map(normalizeWord));
  const { derived, skipped } = buildDerivedEntries({
    lexicalVerbs,
    baseEntries,
    baseIndex,
    openIndex,
  });
  const outputs = buildOutputs(derived);
  const ok = writeOutputs(outputs, check);
  const counts = countTypes(derived);
  console.log(`[opendata:verbs] lexical verbs: ${lexicalVerbs.size}`);
  console.log(`[opendata:verbs] derived words: ${derived.size}`);
  console.log(`[opendata:verbs] derivations: ${JSON.stringify(counts)}`);
  console.log(`[opendata:verbs] skipped: ${JSON.stringify({
    root: skipped.root.length,
    future: skipped.future.length,
    habitual: skipped.habitual.length,
    la: skipped.la.length,
    enik: skipped.enik.length,
  })}`);
  for (const key of ['root', 'future', 'habitual', 'la', 'enik']) {
    if (skipped[key].length > 0) {
      console.log(`[opendata:verbs] ${key} skipped sample: ${skipped[key].slice(0, 10).join(', ')}`);
    }
  }
  if (!ok) {
    process.exitCode = 1;
  }
};

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
