import type { VerbAnalysis, VerbEntry, VerbPersons } from './types';

const BASE_DIR = 'opendata/verbs';
const INDEX_FILE = `${BASE_DIR}/index.json`;

const normalize = (word: string): string =>
  word.trim().normalize('NFC').toLocaleLowerCase();

const assetUrl = (path: string): string =>
  new URL(path, typeof document === 'undefined' ? 'http://localhost/' : document.baseURI).href;

const letterFor = (word: string): string => {
  const initial = normalize(word).normalize('NFD').charAt(0);
  return /^[a-z]$/.test(initial) ? initial : 'otros';
};

const normalizePersons = (value: unknown): VerbPersons => {
  if (!value || typeof value !== 'object') {
    return {};
  }
  const persons = value as Record<string, unknown>;
  return {
    ...(typeof persons.nor === 'string' ? { nor: persons.nor } : {}),
    ...(typeof persons.nori === 'string' ? { nori: persons.nori } : {}),
    ...(typeof persons.nork === 'string' ? { nork: persons.nork } : {}),
  };
};

const parseAnalysis = (value: unknown): VerbAnalysis | undefined => {
  if (!value || typeof value !== 'object') {
    return undefined;
  }
  const analysis = value as Record<string, unknown>;
  if (
    typeof analysis.lemma !== 'string' ||
    typeof analysis.paradigm !== 'string' ||
    typeof analysis.tense !== 'string' ||
    typeof analysis.mode !== 'string'
  ) {
    return undefined;
  }
  const source = analysis.source;
  if (!source || typeof source !== 'object') {
    return undefined;
  }
  const sourceRecord = source as Record<string, unknown>;
  const page = typeof sourceRecord.page === 'number' ? sourceRecord.page : undefined;
  const table = typeof sourceRecord.table === 'string' ? sourceRecord.table : undefined;
  const name = typeof sourceRecord.name === 'string' ? sourceRecord.name : undefined;
  const url = typeof sourceRecord.url === 'string' ? sourceRecord.url : undefined;
  const note = typeof sourceRecord.note === 'string' ? sourceRecord.note : undefined;
  const hasPageTable = page !== undefined && table !== undefined;
  if (!hasPageTable && !name && !url) {
    return undefined;
  }
  return {
    lemma: analysis.lemma,
    kind: analysis.kind === 'synthetic' ? 'synthetic' : 'auxiliary',
    paradigm: analysis.paradigm as VerbAnalysis['paradigm'],
    tense: analysis.tense as VerbAnalysis['tense'],
    mode: analysis.mode as VerbAnalysis['mode'],
    ...(typeof analysis.subtype === 'string'
      ? { subtype: analysis.subtype as VerbAnalysis['subtype'] }
      : {}),
    persons: normalizePersons(analysis.persons),
    ...(analysis.allocutive === 'm' || analysis.allocutive === 'f'
      ? { allocutive: analysis.allocutive }
      : {}),
    ...(typeof analysis.meaning === 'string' ? { meaning: analysis.meaning } : {}),
    source: {
      ...(hasPageTable ? { page, table } : {}),
      ...(name ? { name } : {}),
      ...(url ? { url } : {}),
      ...(note ? { note } : {}),
    },
  };
};

const addEntry = (entries: Map<string, VerbEntry>, entry: VerbEntry): void => {
  const existing = entries.get(entry.word);
  if (!existing) {
    entries.set(entry.word, entry);
    return;
  }
  for (const analysis of entry.analyses) {
    const key = JSON.stringify([
      analysis.lemma,
      analysis.paradigm,
      analysis.tense,
      analysis.mode,
      analysis.subtype ?? '',
      analysis.persons.nor ?? '',
      analysis.persons.nori ?? '',
      analysis.persons.nork ?? '',
      analysis.allocutive ?? '',
    ]);
    const duplicate = existing.analyses.some(candidate =>
      JSON.stringify([
        candidate.lemma,
        candidate.paradigm,
        candidate.tense,
        candidate.mode,
        candidate.subtype ?? '',
        candidate.persons.nor ?? '',
        candidate.persons.nori ?? '',
        candidate.persons.nork ?? '',
        candidate.allocutive ?? '',
      ]) === key
    );
    if (!duplicate) {
      existing.analyses.push(analysis);
    }
  }
};

let indexPromise: Promise<ReadonlySet<string>> | undefined;
let indexCache: ReadonlySet<string> | undefined;

const letterPromises = new Map<string, Promise<Map<string, VerbEntry>>>();

const loadLetter = (letter: string): Promise<Map<string, VerbEntry>> => {
  const cached = letterPromises.get(letter);
  if (cached) {
    return cached;
  }
  const promise = fetch(assetUrl(`${BASE_DIR}/${letter}.json`))
    .then(async response => {
      if (!response.ok) {
        throw new Error(`Verb letter ${letter} returned ${response.status}`);
      }
      const raw = (await response.json()) as unknown;
      if (!Array.isArray(raw)) {
        throw new Error(`Verb letter ${letter} is not an array`);
      }
      const entries = new Map<string, VerbEntry>();
      for (const item of raw) {
        if (!item || typeof item !== 'object') {
          continue;
        }
        const record = item as Record<string, unknown>;
        const word = normalize(String(record.word ?? ''));
        if (!word || !Array.isArray(record.analyses)) {
          continue;
        }
        const analyses = record.analyses
          .map(parseAnalysis)
          .filter((analysis): analysis is VerbAnalysis => Boolean(analysis));
        if (analyses.length > 0) {
          addEntry(entries, { word, analyses });
        }
      }
      return entries;
    })
    .catch(error => {
      letterPromises.delete(letter);
      console.warn(`[verbs] could not load ${letter}.json`, error);
      return new Map<string, VerbEntry>();
    });
  letterPromises.set(letter, promise);
  return promise;
};

export const loadVerbIndex = async (): Promise<ReadonlySet<string>> => {
  if (indexCache) {
    return indexCache;
  }
  if (!indexPromise) {
    indexPromise = fetch(assetUrl(INDEX_FILE))
      .then(async response => {
        if (!response.ok) {
          throw new Error(`Verb index returned ${response.status}`);
        }
        const raw = (await response.json()) as unknown;
        if (!Array.isArray(raw)) {
          throw new Error('Verb index is not an array');
        }
        return new Set(raw.map(word => normalize(String(word))).filter(Boolean));
      })
      .catch(error => {
        indexPromise = undefined;
        console.warn('[verbs] could not load index.json', error);
        return new Set<string>();
      });
  }
  indexCache = await indexPromise;
  return indexCache;
};

export const lookupVerb = async (word: string): Promise<VerbEntry | undefined> => {
  const normalized = normalize(word);
  if (!normalized) {
    return undefined;
  }
  const entries = await loadLetter(letterFor(normalized));
  return entries.get(normalized);
};

export const resetVerbCache = (): void => {
  indexPromise = undefined;
  indexCache = undefined;
  letterPromises.clear();
};
