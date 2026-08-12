import './index';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { overrideApi } from '../../shared/test-helper';
import type { Book, Chapter, DictionaryEntry } from '../../shared/types';

const book: Book = {
  id: 'b1',
  title: 'Euskal liburua',
  format: 'txt',
  addedAt: '2026-08-07T00:00:00.000Z',
  chapterIds: ['c1', 'c2'],
};

const chapter1: Chapter = {
  id: 'c1',
  bookId: 'b1',
  index: 0,
  title: 'Kapitulua 1',
  text: 'Etxe handi batean bizi da familia. Liburu bat irakurtzen dute gauean.\n\nUra edaten dute goizero.',
};

const chapter2: Chapter = {
  id: 'c2',
  bookId: 'b1',
  index: 1,
  title: 'Kapitulua 2',
  text: 'Haurrek eskolara joaten dira. Irakasleak berriak kontatzen ditu.',
};

const entries: DictionaryEntry[] = [
  { word: 'etxe', status: 'known', translation: 'casa' },
  { word: 'handi', status: 'known', translation: 'grande' },
  { word: 'liburu', status: 'unknown', translation: 'libro' },
];

const api = {
  getBook: async (): Promise<Book> => book,
  getChapters: async (): Promise<Chapter[]> => [chapter1, chapter2],
  getProgress: async () => ({ bookId: 'b1', chapterIndex: 0, pageIndex: 0 }),
  saveProgress: async (): Promise<void> => undefined,
  getAllEntries: async (): Promise<DictionaryEntry[]> => entries,
  lookupWord: async (word: string): Promise<DictionaryEntry | undefined> =>
    entries.find(entry => entry.word === word.toLocaleLowerCase()),
  upsertEntry: async (entry: DictionaryEntry): Promise<DictionaryEntry> => entry,
};

const render = () => {
  const element = document.createElement('page-reading');
  overrideApi(element, api);
  element.bookId = 'b1';
  return element;
};

const meta = {
  title: 'Pages/page-reading',
  tags: ['autodocs'],
  render,
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const pageReading: Story = {
  render,
};
