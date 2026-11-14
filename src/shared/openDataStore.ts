import type { OpenDataEntry } from './types';

const BASE_DIR = 'opendata/eu-esp';
const INDEX_FILE = `${BASE_DIR}/index.json`;

const normalize = (word: string): string =>
  word.trim().normalize('NFC').toLocaleLowerCase();

const assetUrl = (path: string): string =>
  new URL(path, typeof document === 'undefined' ? 'http://localhost/' : document.baseURI).href;

const letterFor = (word: string): string => {
  const initial = normalize(word).normalize('NFD').charAt(0);
  return /^[a-z]$/.test(initial) ? initial : 'otros';
};

const parseDomains = (value: string | undefined): string[] => {
  const trimmed = (value ?? '').trim();
  if (!trimmed) {
    return [];
  }
  return trimmed
    .replace(/^\[|\]$/g, '')
    .split(/[;,]\s*/)
    .map(domain => domain.trim())
    .filter(Boolean);
};

const parseLine = (line: string): OpenDataEntry | undefined => {
  const parts = line.split(' :_: ');
  if (parts.length < 2) {
    return undefined;
  }
  const word = normalize(parts[0]);
  const translation = parts[1]?.trim();
  if (!word || !translation) {
    return undefined;
  }
  const partOfSpeech = parts[2]?.trim() || undefined;
  return {
    word,
    translations: [translation],
    ...(partOfSpeech ? { partOfSpeech } : {}),
    domains: parseDomains(parts[3]),
  };
};

const addEntry = (entries: Map<string, OpenDataEntry>, entry: OpenDataEntry): void => {
  const existing = entries.get(entry.word);
  if (!existing) {
    entries.set(entry.word, entry);
    return;
  }
  if (!existing.translations.includes(entry.translations[0])) {
    existing.translations.push(entry.translations[0]);
  }
  if (!existing.partOfSpeech && entry.partOfSpeech) {
    existing.partOfSpeech = entry.partOfSpeech;
  }
  for (const domain of entry.domains) {
    if (!existing.domains.includes(domain)) {
      existing.domains.push(domain);
    }
  }
};

let indexPromise: Promise<ReadonlySet<string>> | undefined;
let indexCache: ReadonlySet<string> | undefined;

const letterPromises = new Map<string, Promise<Map<string, OpenDataEntry>>>();

const loadLetter = (letter: string): Promise<Map<string, OpenDataEntry>> => {
  const cached = letterPromises.get(letter);
  if (cached) {
    return cached;
  }
  const promise = fetch(assetUrl(`${BASE_DIR}/${letter}.json`))
    .then(async response => {
      if (!response.ok) {
        throw new Error(`Open Data letter ${letter} returned ${response.status}`);
      }
      const raw = (await response.json()) as unknown;
      if (!Array.isArray(raw)) {
        throw new Error(`Open Data letter ${letter} is not an array`);
      }
      const entries = new Map<string, OpenDataEntry>();
      for (const line of raw) {
        const entry = parseLine(String(line));
        if (entry) {
          addEntry(entries, entry);
        }
      }
      return entries;
    })
    .catch(error => {
      letterPromises.delete(letter);
      console.warn(`[opendata] could not load ${letter}.json`, error);
      return new Map<string, OpenDataEntry>();
    });
  letterPromises.set(letter, promise);
  return promise;
};

export const loadOpenDataIndex = async (): Promise<ReadonlySet<string>> => {
  if (indexCache) {
    return indexCache;
  }
  if (!indexPromise) {
    indexPromise = fetch(assetUrl(INDEX_FILE))
      .then(async response => {
        if (!response.ok) {
          throw new Error(`Open Data index returned ${response.status}`);
        }
        const raw = (await response.json()) as unknown;
        if (!Array.isArray(raw)) {
          throw new Error('Open Data index is not an array');
        }
        return new Set(raw.map(word => normalize(String(word))).filter(Boolean));
      })
      .catch(error => {
        indexPromise = undefined;
        console.warn('[opendata] could not load index.json', error);
        return new Set<string>();
      });
  }
  indexCache = await indexPromise;
  return indexCache;
};

export const lookupOpenData = async (word: string): Promise<OpenDataEntry | undefined> => {
  const normalized = normalize(word);
  if (!normalized) {
    return undefined;
  }
  const entries = await loadLetter(letterFor(normalized));
  return entries.get(normalized);
};

export const resetOpenDataCache = (): void => {
  indexPromise = undefined;
  indexCache = undefined;
  letterPromises.clear();
};
