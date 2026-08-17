import type { BookFormat, ParsedBook } from '../types';
import { parseHtml } from './html';
import { parseMarkdown } from './markdown';
import { parseTxt } from './txt';

const getExtension = (name: string): string => name.split('.').pop()?.toLocaleLowerCase() ?? '';

export const getBookFormat = (fileName: string): BookFormat => {
  const extension = getExtension(fileName);
  switch (extension) {
    case 'txt':
      return 'txt';
    case 'md':
    case 'markdown':
      return 'md';
    case 'html':
    case 'htm':
      return 'html';
    case 'epub':
      return 'epub';
    case 'pdf':
      return 'pdf';
    default:
      throw new Error(`Unsupported file format: "${extension}"`);
  }
};

export const parseBook = async (file: File): Promise<ParsedBook> => {
  const extension = getExtension(file.name);
  switch (extension) {
    case 'txt':
      return parseTxt(file);
    case 'md':
    case 'markdown':
      return parseMarkdown(file);
    case 'html':
    case 'htm':
      return parseHtml(file);
    case 'epub':
    case 'pdf':
      throw new Error(`Parser for "${extension}" is not implemented yet`);
    default:
      throw new Error(`Unsupported file format: "${extension}"`);
  }
};
