export interface SuffixCase {
  caseId: string;
  caseName: string;
  meaning: string;
}

export interface SuffixEntry {
  suffix: string;
  cases: SuffixCase[];
}

export interface SuffixMatch {
  baseForm: string;
  suffix: string;
  cases: SuffixCase[];
}

export interface CaseInfo {
  id: string;
  name: string;
  meaning: string;
}

export const CASES: CaseInfo[] = [
  { id: 'nominativo', name: 'Nominativo', meaning: 'sujeto' },
  { id: 'ergativo', name: 'Ergativo', meaning: 'agente (transitivo)' },
  { id: 'dativo', name: 'Dativo', meaning: 'a quién' },
  { id: 'genitivo', name: 'Genitivo Posesivo', meaning: 'posesión' },
  { id: 'asociativo', name: 'Asociativo', meaning: 'con' },
  { id: 'destinativo', name: 'Destinativo', meaning: 'para' },
  { id: 'instrumental', name: 'Instrumental', meaning: 'con qué / de qué' },
  { id: 'inesivo', name: 'Inesivo', meaning: 'en' },
  { id: 'gen_locativo', name: 'Genitivo Locativo', meaning: 'de (lugar)' },
  { id: 'adlativo', name: 'Adlativo', meaning: 'a (dirección)' },
  { id: 'adl_terminal', name: 'Adlativo Terminal', meaning: 'hasta' },
  { id: 'ablativo', name: 'Ablativo', meaning: 'de/desde/por' },
  { id: 'partitivo', name: 'Partitivo', meaning: 'algún' },
  { id: 'prolativo', name: 'Prolativo', meaning: 'por (considerar)' },
];

// One entry per unique suffix string. Each entry lists all possible cases
// that suffix can represent (e.g. "-a" → Nominativo or Adlativo).
// Sorted by suffix length descending for longest-match-first detection.
export const SUFFIX_TABLE: SuffixEntry[] = [
  // ─── Long suffixes (10+) ─────────────────────────────────────────
  {
    suffix: '-enganaino',
    cases: [{ caseId: 'adl_terminal', caseName: 'Adlativo Terminal', meaning: 'hasta donde (los/las)' }],
  },
  {
    suffix: '-anganaino',
    cases: [{ caseId: 'adl_terminal', caseName: 'Adlativo Terminal', meaning: 'hasta donde (el/la)' }],
  },
  {
    suffix: '-rengandik',
    cases: [{ caseId: 'ablativo', caseName: 'Ablativo', meaning: 'de/desde (los/las)' }],
  },
  {
    suffix: '-rangandik',
    cases: [{ caseId: 'ablativo', caseName: 'Ablativo', meaning: 'de/desde (el/la)' }],
  },
  {
    suffix: '-eganaino',
    cases: [{ caseId: 'adl_terminal', caseName: 'Adlativo Terminal', meaning: 'hasta donde (hombre)' }],
  },
  {
    suffix: '-regandik',
    cases: [{ caseId: 'ablativo', caseName: 'Ablativo', meaning: 'de/desde (hijo/hombre)' }],
  },
  {
    suffix: '-engandik',
    cases: [{ caseId: 'ablativo', caseName: 'Ablativo', meaning: 'de/desde (los/las)' }],
  },
  {
    suffix: '-arentzat',
    cases: [{ caseId: 'destinativo', caseName: 'Destinativo', meaning: 'para el/la' }],
  },
  {
    suffix: '-etaraino',
    cases: [{ caseId: 'adl_terminal', caseName: 'Adlativo Terminal', meaning: 'hasta (los/las / valle)' }],
  },
  {
    suffix: '-angandik',
    cases: [{ caseId: 'ablativo', caseName: 'Ablativo', meaning: 'de/desde (el/la)' }],
  },
  {
    suffix: '-rentzat',
    cases: [{ caseId: 'destinativo', caseName: 'Destinativo', meaning: 'para (alguien)' }],
  },
  {
    suffix: '-ganaino',
    cases: [{ caseId: 'adl_terminal', caseName: 'Adlativo Terminal', meaning: 'hasta donde (hijo)' }],
  },
  {
    suffix: '-rekin',
    cases: [{ caseId: 'asociativo', caseName: 'Asociativo', meaning: 'con (alguien)' }],
  },
  {
    suffix: '-arekin',
    cases: [{ caseId: 'asociativo', caseName: 'Asociativo', meaning: 'con el/la' }],
  },
  {
    suffix: '-angana',
    cases: [{ caseId: 'adlativo', caseName: 'Adlativo', meaning: 'a donde (el/la)' }],
  },
  {
    suffix: '-taraino',
    cases: [{ caseId: 'adl_terminal', caseName: 'Adlativo Terminal', meaning: 'hasta (monte)' }],
  },
  {
    suffix: '-engana',
    cases: [{ caseId: 'adlativo', caseName: 'Adlativo', meaning: 'a donde (los/las)' }],
  },
  {
    suffix: '-entzat',
    cases: [{ caseId: 'destinativo', caseName: 'Destinativo', meaning: 'para (los/las / valle / hombre)' }],
  },
  {
    suffix: '-gandik',
    cases: [{ caseId: 'ablativo', caseName: 'Ablativo', meaning: 'de/desde (hijo/hombre)' }],
  },
  {
    suffix: '-eraino',
    cases: [{ caseId: 'adl_terminal', caseName: 'Adlativo Terminal', meaning: 'hasta (el/la / Gasteiz)' }],
  },
  {
    suffix: '-retatik',
    cases: [{ caseId: 'ablativo', caseName: 'Ablativo', meaning: 'de/desde (palabra en -r)' }],
  },
  {
    suffix: '-etatik',
    cases: [{ caseId: 'ablativo', caseName: 'Ablativo', meaning: 'de/desde (los/las / valle)' }],
  },
  {
    suffix: '-egana',
    cases: [{ caseId: 'adlativo', caseName: 'Adlativo', meaning: 'a donde (hombre)' }],
  },
  {
    suffix: '-etara',
    cases: [{ caseId: 'adlativo', caseName: 'Adlativo', meaning: 'a (los/las / valle)' }],
  },
  {
    suffix: '-era',
    cases: [{ caseId: 'adlativo', caseName: 'Adlativo', meaning: 'al/la / a (Gasteiz)' }],
  },
  {
    suffix: '-ekin',
    cases: [{ caseId: 'asociativo', caseName: 'Asociativo', meaning: 'con (los/las / valle / hombre)' }],
  },
  {
    suffix: '-etako',
    cases: [{ caseId: 'gen_locativo', caseName: 'Genitivo Locativo', meaning: 'de (los/las / valle)' }],
  },
  {
    suffix: '-tako',
    cases: [{ caseId: 'gen_locativo', caseName: 'Genitivo Locativo', meaning: 'de (monte)' }],
  },
  {
    suffix: '-tatik',
    cases: [{ caseId: 'ablativo', caseName: 'Ablativo', meaning: 'de/desde (monte)' }],
  },
  {
    suffix: '-etan',
    cases: [{ caseId: 'inesivo', caseName: 'Inesivo', meaning: 'en (los/las / valle / hombre)' }],
  },
  {
    suffix: '-tara',
    cases: [{ caseId: 'adlativo', caseName: 'Adlativo', meaning: 'a (monte)' }],
  },
  {
    suffix: '-raino',
    cases: [{ caseId: 'adl_terminal', caseName: 'Adlativo Terminal', meaning: 'hasta (el/la / Donostia)' }],
  },

  // ─── Medium suffixes (3–5) ───────────────────────────────────────
  {
    suffix: '-egan',
    cases: [{ caseId: 'inesivo', caseName: 'Inesivo', meaning: 'en (hombre)' }],
  },
  {
    suffix: '-gana',
    cases: [{ caseId: 'adlativo', caseName: 'Adlativo', meaning: 'a donde (hijo)' }],
  },
  {
    suffix: '-ean',
    cases: [{ caseId: 'inesivo', caseName: 'Inesivo', meaning: 'en (el/la / Gasteiz)' }],
  },
  {
    suffix: '-aren',
    cases: [{ caseId: 'genitivo', caseName: 'Genitivo Posesivo', meaning: 'del/la' }],
  },
  {
    suffix: '-gan',
    cases: [{ caseId: 'inesivo', caseName: 'Inesivo', meaning: 'en (hijo)' }],
  },
  {
    suffix: '-retik',
    cases: [{ caseId: 'ablativo', caseName: 'Ablativo', meaning: 'de/desde (el/la / palabra en -r)' }],
  },
  {
    suffix: '-etik',
    cases: [{ caseId: 'ablativo', caseName: 'Ablativo', meaning: 'de/desde (el/la)' }],
  },
  {
    suffix: '-tzat',
    cases: [{ caseId: 'prolativo', caseName: 'Prolativo', meaning: 'por (considerar)' }],
  },
  {
    suffix: '-ari',
    cases: [{ caseId: 'dativo', caseName: 'Dativo', meaning: 'al/la' }],
  },

  // ─── Short suffixes (1–2) ────────────────────────────────────────
  {
    suffix: '-ak',
    cases: [
      { caseId: 'nominativo', caseName: 'Nominativo', meaning: 'el/la/las/los' },
      { caseId: 'ergativo', caseName: 'Ergativo', meaning: 'el/la (agente)' },
    ],
  },
  {
    suffix: '-ek',
    cases: [{ caseId: 'ergativo', caseName: 'Ergativo', meaning: 'los/las (agente)' }],
  },
  {
    suffix: '-ei',
    cases: [{ caseId: 'dativo', caseName: 'Dativo', meaning: 'a los/las' }],
  },
  {
    suffix: '-ri',
    cases: [{ caseId: 'dativo', caseName: 'Dativo', meaning: 'a (alguien)' }],
  },
  {
    suffix: '-ko',
    cases: [{ caseId: 'gen_locativo', caseName: 'Genitivo Locativo', meaning: 'del/la / de (lugar)' }],
  },
  {
    suffix: '-ra',
    cases: [{ caseId: 'adlativo', caseName: 'Adlativo', meaning: 'al/la / a (Donostia)' }],
  },
  {
    suffix: '-rik',
    cases: [{ caseId: 'partitivo', caseName: 'Partitivo', meaning: 'algún' }],
  },
  {
    suffix: '-ik',
    cases: [{ caseId: 'partitivo', caseName: 'Partitivo', meaning: 'algún' }],
  },
  {
    suffix: '-az',
    cases: [{ caseId: 'instrumental', caseName: 'Instrumental', meaning: 'con el/la' }],
  },
  {
    suffix: '-en',
    cases: [
      { caseId: 'genitivo', caseName: 'Genitivo Posesivo', meaning: 'de (los/las / valle / hombre)' },
      { caseId: 'inesivo', caseName: 'Inesivo', meaning: 'en (Gasteiz)' },
    ],
  },
  {
    suffix: '-an',
    cases: [{ caseId: 'inesivo', caseName: 'Inesivo', meaning: 'en el/la' }],
  },
  {
    suffix: '-tan',
    cases: [{ caseId: 'inesivo', caseName: 'Inesivo', meaning: 'en (monte)' }],
  },
  {
    suffix: '-tik',
    cases: [{ caseId: 'ablativo', caseName: 'Ablativo', meaning: 'de/desde (el/la / Donostia / Gasteiz)' }],
  },
  {
    suffix: '-ren',
    cases: [{ caseId: 'genitivo', caseName: 'Genitivo Posesivo', meaning: 'de (alguien)' }],
  },
  {
    suffix: '-eko',
    cases: [{ caseId: 'gen_locativo', caseName: 'Genitivo Locativo', meaning: 'del/la' }],
  },
  {
    suffix: '-aino',
    cases: [{ caseId: 'adl_terminal', caseName: 'Adlativo Terminal', meaning: 'hasta (Gasteiz)' }],
  },
  {
    suffix: '-ez',
    cases: [{ caseId: 'instrumental', caseName: 'Instrumental', meaning: 'con (los/las / valle / hombre)' }],
  },
  {
    suffix: '-k',
    cases: [{ caseId: 'ergativo', caseName: 'Ergativo', meaning: 'monte/hijo/Donostia (agente)' }],
  },
  {
    suffix: '-i',
    cases: [{ caseId: 'dativo', caseName: 'Dativo', meaning: 'a (valle/hombre/Gasteiz)' }],
  },
  {
    suffix: '-a',
    cases: [
      { caseId: 'nominativo', caseName: 'Nominativo', meaning: 'el/la' },
      { caseId: 'adlativo', caseName: 'Adlativo', meaning: 'a (Gasteiz)' },
    ],
  },
  {
    suffix: '-z',
    cases: [{ caseId: 'instrumental', caseName: 'Instrumental', meaning: 'con (monte/hijo/Donostia)' }],
  },
  {
    suffix: '-n',
    cases: [{ caseId: 'inesivo', caseName: 'Inesivo', meaning: 'en (Donostia)' }],
  },
];

// Pre-sorted by suffix length descending for longest-match-first detection.
const SORTED_SUFFIX_TABLE: SuffixEntry[] = [...SUFFIX_TABLE].sort(
  (a, b) => b.suffix.length - a.suffix.length
);

const MIN_BASE_LENGTH = 2;

/**
 * Detect all possible declension suffix matches for a given word.
 * Returns matches sorted by suffix length descending (longest/most specific first).
 * The caller should present all matches and let the user pick the correct one.
 */
export function detectSuffixes(word: string): SuffixMatch[] {
  const lower = word.trim().toLocaleLowerCase();
  const matches: SuffixMatch[] = [];

  for (const entry of SORTED_SUFFIX_TABLE) {
    const rawSuffix = entry.suffix.slice(1);
    if (!lower.endsWith(rawSuffix)) {
      continue;
    }
    const baseForm = lower.slice(0, lower.length - rawSuffix.length);
    if (baseForm.length < MIN_BASE_LENGTH) {
      continue;
    }
    const key = `${baseForm}|${entry.suffix}`;
    const existing = matches.find(m => `${m.baseForm}|${m.suffix}` === key);
    if (existing) {
      for (const c of entry.cases) {
        if (!existing.cases.some(ec => ec.caseId === c.caseId)) {
          existing.cases.push(c);
        }
      }
      continue;
    }
    matches.push({
      baseForm,
      suffix: entry.suffix,
      cases: entry.cases,
    });
  }

  return matches;
}
