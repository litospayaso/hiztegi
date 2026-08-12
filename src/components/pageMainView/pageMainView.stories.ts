import './index';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { overrideApi } from '../../shared/test-helper';
import type { PageMainViewRoute } from './pageMainView';
import type { Book, Chapter, DictionaryEntry } from '../../shared/types';

const book: Book = {
  id: 'b1',
  title: 'Euskal liburua',
  format: 'txt',
  addedAt: '2026-08-07T00:00:00.000Z',
  chapterIds: ['c1'],
};

const chapter: Chapter = {
  id: 'c1',
  bookId: 'b1',
  index: 0,
  title: 'Kapitulua 1',
  text: 'Etxe handi batean bizi da familia. Liburu bat irakurtzen dute gauean.',
};

const entries: DictionaryEntry[] = [
  { word: 'etxe', status: 'known', translation: 'casa' },
  { word: 'liburu', status: 'unknown', translation: 'libro' },
];

const api = {
  getApi: (route: PageMainViewRoute): Record<string, unknown> => {
    if (route.name === 'reading') {
      return {
        getBook: async (): Promise<Book> => book,
        getChapters: async (): Promise<Chapter[]> => [chapter],
        getProgress: async (): Promise<void> => undefined,
        saveProgress: async (): Promise<void> => undefined,
        getAllEntries: async (): Promise<DictionaryEntry[]> => entries,
        lookupWord: async (): Promise<void> => undefined,
        upsertEntry: async (entry: DictionaryEntry): Promise<DictionaryEntry> => entry,
      };
    }
    if (route.name === 'dictionary') {
      return {
        getEntries: async (): Promise<DictionaryEntry[]> => entries,
        upsertEntry: async (entry: DictionaryEntry): Promise<DictionaryEntry> => entry,
        deleteEntry: async (): Promise<void> => undefined,
      };
    }
    return {
      getBooks: async (): Promise<Book[]> => [book],
      getProgress: async (): Promise<void> => undefined,
      importBook: async (parsed: { title: string }): Promise<Book> => ({
        ...book,
        id: 'b2',
        title: parsed.title,
      }),
      deleteBook: async (): Promise<void> => undefined,
      parseBook: async (): Promise<{ title: string; chapters: { title: string; text: string }[] }> => ({
        title: 'Fitxategia',
        chapters: [{ title: '1', text: 'Kaixo mundua!' }],
      }),
    };
  },
};

const renderRoute = (hash: string) => () => {
  window.location.hash = hash;
  const element = document.createElement('page-main-view');
  overrideApi(element, api);
  return element;
};

const meta = {
  title: 'Pages/page-main-view',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const library: Story = {
  render: renderRoute('#/library'),
};

export const dictionary: Story = {
  render: renderRoute('#/dictionary'),
};

export const reading: Story = {
  render: renderRoute('#/read/b1'),
};
