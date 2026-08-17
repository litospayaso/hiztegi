import type { ParsedBook, ParsedChapter } from '../types';

const PARAGRAPHS_PER_CHAPTER = 15;

export const chaptersFromParagraphs = (paragraphs: string[]): ParsedChapter[] => {
  const chapters: ParsedChapter[] = [];
  for (let index = 0; index < paragraphs.length; index += PARAGRAPHS_PER_CHAPTER) {
    chapters.push({
      title: String(chapters.length + 1),
      text: paragraphs.slice(index, index + PARAGRAPHS_PER_CHAPTER).join('\n\n'),
    });
  }

  if (chapters.length === 0) {
    chapters.push({ title: '1', text: '' });
  }

  return chapters;
};

export const titleFromFileName = (name: string): string =>
  name.replace(/\.[^.]+$/, '').trim() || 'Untitled';

export const parseTxt = async (file: File): Promise<ParsedBook> => {
  const text = await file.text();
  const paragraphs = text
    .split(/\n\s*\n+/)
    .map(paragraph => paragraph.trim())
    .filter(paragraph => paragraph.length > 0);

  return {
    title: titleFromFileName(file.name),
    chapters: chaptersFromParagraphs(paragraphs),
  };
};
