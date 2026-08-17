import type { ParsedBook, ParsedChapter } from '../types';
import { chaptersFromParagraphs, titleFromFileName } from './txt';

export const parseHtml = async (file: File): Promise<ParsedBook> => {
  const text = await file.text();
  const document = new DOMParser().parseFromString(text, 'text/html');
  const body = document.body;

  const chapters: ParsedChapter[] = [];
  let currentTitle: string | null = null;
  let paragraphs: string[] = [];

  const flushChapter = (): void => {
    if (currentTitle === null) {
      return;
    }
    chapters.push({
      title: currentTitle,
      text: paragraphs.filter(paragraph => paragraph !== '').join('\n\n'),
    });
    currentTitle = null;
    paragraphs = [];
  };

  const startChapter = (title: string): void => {
    if (currentTitle !== null) {
      flushChapter();
    }
    currentTitle = title;
  };

  for (const node of Array.from(body.childNodes)) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      const tag = element.tagName.toLocaleLowerCase();
      if (tag === 'h1' || tag === 'h2') {
        startChapter(element.textContent?.trim() ?? '');
        continue;
      }
      const blockText = (element.textContent ?? '').replace(/\s*\n\s*/g, ' ').trim();
      if (blockText !== '') {
        paragraphs.push(blockText);
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      const textContent = (node.textContent ?? '').trim();
      if (textContent !== '') {
        paragraphs.push(textContent);
      }
    }
  }

  flushChapter();

  return {
    title: titleFromFileName(file.name),
    chapters: chapters.length > 0 ? chapters : chaptersFromParagraphs(paragraphs),
  };
};
