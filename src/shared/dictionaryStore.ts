import { getAll, get, put, remove } from './storage';
import type { DictionaryEntry } from './types';

const normalize = (word: string): string => word.trim().toLocaleLowerCase();

export const getAllEntries = async (): Promise<DictionaryEntry[]> => {
  return getAll<DictionaryEntry>('dictionary');
};

export const getEntry = async (word: string): Promise<DictionaryEntry | undefined> => {
  return get<DictionaryEntry>('dictionary', normalize(word));
};

export const upsertEntry = async (entry: DictionaryEntry): Promise<DictionaryEntry> => {
  const normalized: DictionaryEntry = { ...entry, word: normalize(entry.word) };
  await put('dictionary', normalized);
  return normalized;
};

export const removeEntry = async (word: string): Promise<void> => {
  await remove('dictionary', normalize(word));
};

export const lookup = async (word: string): Promise<DictionaryEntry | undefined> => {
  return getEntry(word);
};

export const resolve = async (word: string): Promise<DictionaryEntry | undefined> => {
  return getEntry(word);
};
