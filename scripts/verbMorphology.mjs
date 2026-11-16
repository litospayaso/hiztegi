export const normalizeWord = word =>
  String(word).trim().normalize('NFC').toLocaleLowerCase();

export const isSingleWord = word => /^[a-zñüç]+$/u.test(normalizeWord(word));

export const SAME_FORM_ROOTS = new Set(['joan', 'izan']);

const ROOT_OVERRIDES = new Map([
  ['joan', 'joan'],
  ['izan', 'izan'],
]);

export const rootFor = lemma => {
  const word = normalizeWord(lemma);
  if (ROOT_OVERRIDES.has(word)) {
    return ROOT_OVERRIDES.get(word);
  }
  if (word.length < 4) {
    return undefined;
  }
  if (word.endsWith('tu') || word.endsWith('du')) {
    return word.slice(0, -2);
  }
  if (word.endsWith('i')) {
    let root = word.slice(0, -1);
    if (root.length > 1 && root.at(-1) === root.at(-2)) {
      root = root.slice(0, -1);
    }
    return root.length >= 2 ? root : undefined;
  }
  return undefined;
};

export const futureFor = lemma => {
  const word = normalizeWord(lemma);
  return `${word}${/[aeiou]$/.test(word) ? 'ko' : 'go'}`;
};

const HABITUAL_EXCEPTIONS = new Map([
  ['izan', 'izaten'],
  ['egon', 'egoten'],
  ['joan', 'joaten'],
  ['egin', 'egiten'],
  ['esan', 'esaten'],
  ['eman', 'ematen'],
  ['edan', 'edaten'],
  ['jakin', 'jakiten'],
  ['jan', 'jaten'],
  ['eduki', 'edukitzen'],
  ['ekarri', 'ekartzen'],
  ['eraman', 'eramaten'],
  ['erabili', 'erabiltzen'],
  ['ibili', 'ibiltzen'],
  ['etorri', 'etortzen'],
  ['ikusi', 'ikusten'],
  ['utzi', 'uzten'],
  ['hasi', 'hasten'],
  ['hartu', 'hartzen'],
  ['agindu', 'agintzen'],
]);

export const habitualFor = lemma => {
  const word = normalizeWord(lemma);
  if (HABITUAL_EXCEPTIONS.has(word)) {
    return HABITUAL_EXCEPTIONS.get(word);
  }
  if (word.endsWith('tu') || word.endsWith('du')) {
    return `${word.slice(0, -2)}tzen`;
  }
  if (word.endsWith('n')) {
    return `${word.slice(0, -1)}ten`;
  }
  if (word.endsWith('i')) {
    let root = word.slice(0, -1);
    if (root.length > 1 && root.at(-1) === root.at(-2)) {
      root = root.slice(0, -1);
    }
    return `${root}${/(?:ts|tz|tx|[sxz])$/.test(root) ? 'ten' : 'tzen'}`;
  }
  if (/[aeo]$/.test(word)) {
    return `${word}tzen`;
  }
  if (word.endsWith('l')) {
    return `${word}tzen`;
  }
  return undefined;
};

export const isCompletiveSourceSafe = analysis =>
  Boolean(analysis) &&
  analysis.tense !== 'agintera' &&
  analysis.tense !== 'alegiazko' &&
  analysis.subtype !== 'conditional-ba' &&
  analysis.subtype !== 'subjunctive-la' &&
  analysis.subtype !== 'agintera';

const COMPLETIVE_LA_OVERRIDES = new Map([
  ['da', 'dela'],
  ['dira', 'direla'],
  ['zara', 'zarela'],
  ['zarete', 'zaretela'],
  ['gara', 'garela'],
  ['gira', 'girela'],
  ['doa', 'doala'],
  ['doaz', 'doazela'],
  ['dauka', 'daukala'],
  ['daukagu', 'daukagula'],
  ['daukazu', 'daukazula'],
  ['daukate', 'daukatela'],
  ['dauzkagu', 'dauzkagula'],
  ['dauzkazu', 'dauzkazula'],
  ['dauzkate', 'dauzkatela'],
  ['du', 'duela'],
  ['ditu', 'dituela'],
  ['duzu', 'duzula'],
  ['dugu', 'dugula'],
  ['duzue', 'duzuela'],
  ['dute', 'dutela'],
  ['dituzu', 'dituzula'],
  ['dituzue', 'dituzuela'],
  ['dituzte', 'dituztela'],
  ['naiz', 'naizela'],
  ['zait', 'zaidala'],
  ['zaizkit', 'zaizkidala'],
  ['dago', 'dagoela'],
  ['nago', 'nagoela'],
  ['daki', 'dakiela'],
  ['dakit', 'dakidala'],
  ['dabil', 'dabilela'],
  ['dator', 'datorrela'],
  ['dakar', 'dakarrela'],
  ['daiteke', 'daitekeela'],
  ['daitezke', 'daitezkeela'],
]);

export const completiveLaFor = form => {
  const word = normalizeWord(form);
  if (COMPLETIVE_LA_OVERRIDES.has(word)) {
    return COMPLETIVE_LA_OVERRIDES.get(word);
  }
  if (word.endsWith('n')) {
    return `${word.slice(0, -1)}la`;
  }
  if (word.endsWith('t')) {
    return `${word.slice(0, -1)}dala`;
  }
  if (word.endsWith('ke')) {
    return `${word}ela`;
  }
  if (word.endsWith('r')) {
    return `${word}rela`;
  }
  return undefined;
};

export const completiveEnikFor = form => {
  const word = normalizeWord(form);
  return word.endsWith('n') ? `${word}ik` : undefined;
};
