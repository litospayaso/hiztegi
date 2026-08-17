import type { ParsedBook, ParsedChapter } from '../types';
import { chaptersFromParagraphs, titleFromFileName } from './txt';

const HEADING_RE = /^(#{1,6})\s+(.*)$/;
const FENCE_RE = /^(?:```|~~~)/;
const BLOCKQUOTE_RE = /^>\s?/;
const LIST_MARKER_RE = /^\s*(?:[-*+]|\d+[.)])\s+/;
const HR_RE = /^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/;

const stripInline = (line: string): string =>
  line
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/~~([^~]+)~~/g, '$1')
    .trim();

const paragraphsFromLines = (lines: string[]): string[] => {
  const paragraphs: string[] = [];
  let buffer: string[] = [];
  for (const line of lines) {
    if (line === '') {
      if (buffer.length > 0) {
        paragraphs.push(buffer.join('\n'));
        buffer = [];
      }
    } else {
      buffer.push(line);
    }
  }
  if (buffer.length > 0) {
    paragraphs.push(buffer.join('\n'));
  }
  return paragraphs;
};

export const parseMarkdown = async (file: File): Promise<ParsedBook> => {
  const text = await file.text();
  const lines = text.split('\n');

  const chapters: ParsedChapter[] = [];
  let currentTitle: string | null = null;
  let buffer: string[] = [];
  let inFence = false;

  const flushChapter = (): void => {
    if (currentTitle === null) {
      return;
    }
    chapters.push({
      title: currentTitle,
      text: paragraphsFromLines(buffer).join('\n\n'),
    });
    currentTitle = null;
    buffer = [];
  };

  const startChapter = (title: string): void => {
    if (currentTitle !== null) {
      flushChapter();
    }
    currentTitle = title;
  };

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();

    if (!inFence && FENCE_RE.test(trimmed)) {
      inFence = true;
      continue;
    }
    if (inFence) {
      if (FENCE_RE.test(trimmed)) {
        inFence = false;
      } else {
        buffer.push(rawLine);
      }
      continue;
    }

    if (trimmed === '') {
      if (buffer.length > 0) {
        buffer.push('');
      }
      continue;
    }

    const heading = HEADING_RE.exec(rawLine);
    if (heading !== null) {
      const level = heading[1].length;
      if (level <= 2) {
        startChapter(stripInline(heading[2]));
      } else {
        const content = stripInline(heading[2]);
        if (content !== '') {
          buffer.push(content);
        }
      }
      continue;
    }

    if (HR_RE.test(trimmed)) {
      continue;
    }

    let content = stripInline(rawLine.replace(BLOCKQUOTE_RE, '').replace(LIST_MARKER_RE, ''));
    if (content !== '') {
      buffer.push(content);
    }
  }

  flushChapter();

  return {
    title: titleFromFileName(file.name),
    chapters:
      chapters.length > 0
        ? chapters
        : chaptersFromParagraphs(paragraphsFromLines(buffer)),
  };
};
