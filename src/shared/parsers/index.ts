import type { ParsedBook } from '../types';
import { parseTxt } from './txt';

const getExtension = (name: string): string => name.split('.').pop()?.toLocaleLowerCase() ?? '';

export const parseBook = async (file: File): Promise<ParsedBook> => {
  const extension = getExtension(file.name);
  switch (extension) {
    case 'txt':
      return parseTxt(file);
    case 'epub':
    case 'pdf':
      throw new Error(`Parser for "${extension}" is not implemented yet`);
    default:
      throw new Error(`Unsupported file format: "${extension}"`);
  }
};
