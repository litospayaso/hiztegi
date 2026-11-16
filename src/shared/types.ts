export type BookFormat = 'txt' | 'md' | 'html' | 'epub' | 'pdf';

export type WordStatus = 'known' | 'unknown' | 'opendata' | 'verb' | 'none';

export interface Book {
  id: string;
  title: string;
  author?: string;
  format: BookFormat;
  addedAt: string;
  chapterIds: string[];
}

export interface Chapter {
  id: string;
  bookId: string;
  index: number;
  title: string;
  text: string;
}

export interface ReadingProgress {
  bookId: string;
  chapterIndex: number;
  pageIndex: number;
}

export interface DictionaryEntry {
  word: string;
  status: 'known' | 'unknown';
  note?: string;
  translation?: string;
}

export interface OpenDataEntry {
  word: string;
  translations: string[];
  partOfSpeech?: string;
  domains: string[];
}

export interface ParsedChapter {
  title: string;
  text: string;
}

export interface ParsedBook {
  title: string;
  chapters: ParsedChapter[];
}

export type VerbKind = 'auxiliary' | 'synthetic';

export type VerbParadigm =
  | 'nor'
  | 'nor-nori'
  | 'nor-nork'
  | 'nor-nori-nork'
  | 'zer-nori-nork';

export type VerbTense = 'orain' | 'iragan' | 'alegiazko' | 'agintera';

export type VerbMode = 'ahala' | 'ke' | 'agintera';

export type VerbSubtype =
  | 'subjunctive'
  | 'subjunctive-la'
  | 'conditional-ba'
  | 'potential'
  | 'agintera';

export type VerbPersonRole = 'nor' | 'nori' | 'nork';

export type VerbAllocutive = 'm' | 'f';

export interface VerbPersons {
  nor?: string;
  nori?: string;
  nork?: string;
}

export interface VerbSource {
  page?: number;
  table?: string;
  name?: string;
  url?: string;
  note?: string;
}

export interface VerbAnalysis {
  lemma: string;
  kind: VerbKind;
  paradigm: VerbParadigm;
  tense: VerbTense;
  mode: VerbMode;
  subtype?: VerbSubtype;
  persons: VerbPersons;
  allocutive?: VerbAllocutive;
  meaning?: string;
  source: VerbSource;
}

export type VerbDerivationType =
  | 'root'
  | 'future'
  | 'habitual'
  | 'completive-en'
  | 'completive-enik'
  | 'completive-la';

export interface VerbDerivation {
  type: VerbDerivationType;
  from: string;
  lemma: string;
  meaning?: string;
  baseAnalysis?: VerbAnalysis;
}

export interface VerbEntry {
  word: string;
  analyses: VerbAnalysis[];
  derivations?: VerbDerivation[];
}
