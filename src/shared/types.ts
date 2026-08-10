export type BookFormat = 'txt' | 'epub' | 'pdf';

export type WordStatus = 'known' | 'unknown' | 'none';

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

export interface ParsedChapter {
  title: string;
  text: string;
}

export interface ParsedBook {
  title: string;
  chapters: ParsedChapter[];
}
