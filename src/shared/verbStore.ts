import type {
  VerbAnalysis,
  VerbDerivation,
  VerbDerivationType,
  VerbEntry,
  VerbPersons,
} from './types';

const BASE_DIR = 'opendata/verbs';
const DERIVED_DIR = `${BASE_DIR}/derived`;
const INDEX_FILE = `${BASE_DIR}/index.json`;
const DERIVED_INDEX_FILE = `${DERIVED_DIR}/index.json`;

const DERIVATION_TYPES = new Set<VerbDerivationType>([
  'root',
  'future',
  'habitual',
  'completive-en',
  'completive-enik',
  'completive-la',
]);

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

const parseDerivation = (value: unknown): VerbDerivation | undefined => {
  if (!value || typeof value !== 'object') {
    return undefined;
  }
  const derivation = value as Record<string, unknown>;
  if (
    typeof derivation.type !== 'string' ||
    !DERIVATION_TYPES.has(derivation.type as VerbDerivationType) ||
    typeof derivation.from !== 'string' ||
    typeof derivation.lemma !== 'string'
  ) {
    return undefined;
  }
  const from = normalize(derivation.from);
  const lemma = normalize(derivation.lemma);
  if (!from || !lemma) {
    return undefined;
  }
  const baseAnalysis = parseAnalysis(derivation.baseAnalysis);
  return {
    type: derivation.type as VerbDerivationType,
    from,
    lemma,
    ...(typeof derivation.meaning === 'string' ? { meaning: derivation.meaning } : {}),
    ...(baseAnalysis ? { baseAnalysis } : {}),
  };
};

const analysisKey = (analysis: VerbAnalysis): string =>
  JSON.stringify([
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

const derivationKey = (derivation: VerbDerivation): string =>
  JSON.stringify([derivation.type, derivation.from, derivation.lemma]);

const addEntry = (entries: Map<string, VerbEntry>, entry: VerbEntry): void => {
  const existing = entries.get(entry.word);
  if (!existing) {
    entries.set(entry.word, {
      word: entry.word,
      analyses: [...entry.analyses],
      ...(entry.derivations?.length
        ? { derivations: entry.derivations.map(derivation => ({ ...derivation })) }
        : {}),
    });
    return;
  }
  for (const analysis of entry.analyses) {
    if (!existing.analyses.some(candidate => analysisKey(candidate) === analysisKey(analysis))) {
      existing.analyses.push(analysis);
    }
  }
  for (const derivation of entry.derivations ?? []) {
    const derivations = existing.derivations ?? [];
    if (!derivations.some(candidate => derivationKey(candidate) === derivationKey(derivation))) {
      derivations.push({ ...derivation });
    }
    if (derivations.length > 0) {
      existing.derivations = derivations;
    }
  }
};

const isCompletiveSafe = (analysis: VerbAnalysis): boolean =>
  analysis.tense !== 'agintera' &&
  analysis.tense !== 'alegiazko' &&
  analysis.subtype !== 'conditional-ba' &&
  analysis.subtype !== 'subjunctive-la' &&
  analysis.subtype !== 'agintera';

let indexPromise: Promise<ReadonlySet<string>> | undefined;
let indexCache: ReadonlySet<string> | undefined;

const letterPromises = new Map<string, Promise<Map<string, VerbEntry>>>();

const loadLetter = (
  directory: string,
  letter: string,
  label: string,
  optional = false
): Promise<Map<string, VerbEntry>> => {
  const cacheKey = `${directory}/${letter}`;
  const cached = letterPromises.get(cacheKey);
  if (cached) {
    return cached;
  }
  const promise = fetch(assetUrl(`${directory}/${letter}.json`))
    .then(async response => {
      if (!response.ok) {
        throw new Error(`${label} ${letter} returned ${response.status}`);
      }
      const raw = (await response.json()) as unknown;
      if (!Array.isArray(raw)) {
        throw new Error(`${label} ${letter} is not an array`);
      }
      const entries = new Map<string, VerbEntry>();
      for (const item of raw) {
        if (!item || typeof item !== 'object') {
          continue;
        }
        const record = item as Record<string, unknown>;
        const word = normalize(String(record.word ?? ''));
        if (!word) {
          continue;
        }
        const analyses = Array.isArray(record.analyses)
          ? record.analyses
              .map(parseAnalysis)
              .filter((analysis): analysis is VerbAnalysis => Boolean(analysis))
          : [];
        const derivations = Array.isArray(record.derivations)
          ? record.derivations
              .map(parseDerivation)
              .filter((derivation): derivation is VerbDerivation => Boolean(derivation))
          : [];
        if (analyses.length > 0 || derivations.length > 0) {
          addEntry(entries, { word, analyses, ...(derivations.length > 0 ? { derivations } : {}) });
        }
      }
      return entries;
    })
    .catch(error => {
      if (!optional) {
        letterPromises.delete(cacheKey);
      }
      console.warn(`[verbs] could not load ${label} ${letter}.json`, error);
      return new Map<string, VerbEntry>();
    });
  letterPromises.set(cacheKey, promise);
  return promise;
};

const loadIndexFile = async (file: string, label: string): Promise<Set<string>> => {
  try {
    const response = await fetch(assetUrl(file));
    if (!response.ok) {
      throw new Error(`${label} returned ${response.status}`);
    }
    const raw = (await response.json()) as unknown;
    if (!Array.isArray(raw)) {
      throw new Error(`${label} is not an array`);
    }
    return new Set(raw.map(word => normalize(String(word))).filter(Boolean));
  } catch (error) {
    console.warn(`[verbs] could not load ${label}`, error);
    return new Set<string>();
  }
};

export const loadVerbIndex = async (): Promise<ReadonlySet<string>> => {
  if (indexCache) {
    return indexCache;
  }
  if (!indexPromise) {
    indexPromise = Promise.all([
      loadIndexFile(INDEX_FILE, 'index.json'),
      loadIndexFile(DERIVED_INDEX_FILE, 'derived/index.json'),
    ]).then(([base, derived]) => new Set([...base, ...derived]));
  }
  indexCache = await indexPromise;
  return indexCache;
};

const loadBaseAnalysis = async (word: string): Promise<VerbAnalysis | undefined> => {
  const entries = await loadLetter(BASE_DIR, letterFor(word), 'verb letter');
  return entries.get(normalize(word))?.analyses[0];
};

const enrichEntry = async (entry: VerbEntry): Promise<VerbEntry> => {
  const analyses = [...entry.analyses];
  const derivations = (entry.derivations ?? []).map(derivation => ({ ...derivation }));

  if (entry.word.endsWith('n')) {
    for (const analysis of analyses) {
      if (!isCompletiveSafe(analysis)) {
        continue;
      }
      const exists = derivations.some(
        derivation =>
          derivation.type === 'completive-en' &&
          derivation.from === entry.word &&
          derivation.lemma === analysis.lemma
      );
      if (!exists) {
        derivations.push({
          type: 'completive-en',
          from: entry.word,
          lemma: analysis.lemma,
          ...(analysis.meaning ? { meaning: analysis.meaning } : {}),
          baseAnalysis: analysis,
        });
      }
    }
  }

  for (const derivation of derivations) {
    if (!derivation.baseAnalysis && derivation.type === 'completive-en' && derivation.from === entry.word) {
      derivation.baseAnalysis =
        analyses.find(analysis => analysis.lemma === derivation.lemma && isCompletiveSafe(analysis)) ??
        analyses.find(analysis => analysis.lemma === derivation.lemma);
    }
    if (!derivation.baseAnalysis && derivation.type.startsWith('completive-')) {
      derivation.baseAnalysis = await loadBaseAnalysis(derivation.from);
    }
    if (!derivation.meaning && derivation.baseAnalysis?.meaning) {
      derivation.meaning = derivation.baseAnalysis.meaning;
    }
  }

  return {
    word: entry.word,
    analyses,
    ...(derivations.length > 0 ? { derivations } : {}),
  };
};

export const lookupVerb = async (word: string): Promise<VerbEntry | undefined> => {
  const normalized = normalize(word);
  if (!normalized) {
    return undefined;
  }
  const letter = letterFor(normalized);
  const [baseEntries, derivedEntries] = await Promise.all([
    loadLetter(BASE_DIR, letter, 'verb letter'),
    loadLetter(DERIVED_DIR, letter, 'derived verb letter', true),
  ]);
  const merged = new Map<string, VerbEntry>();
  const baseEntry = baseEntries.get(normalized);
  if (baseEntry) {
    addEntry(merged, baseEntry);
  }
  const derivedEntry = derivedEntries.get(normalized);
  if (derivedEntry) {
    addEntry(merged, derivedEntry);
  }
  const entry = merged.get(normalized);
  return entry ? enrichEntry(entry) : undefined;
};

export const resetVerbCache = (): void => {
  indexPromise = undefined;
  indexCache = undefined;
  letterPromises.clear();
};
