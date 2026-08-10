import './index';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { overrideApi } from '../../shared/test-helper';
import type { Book, ParsedBook } from '../../shared/types';

const sampleBook: Book = {
  id: 'b1',
  title: 'Euskal liburua',
  format: 'txt',
  addedAt: '2026-08-07T00:00:00.000Z',
  chapterIds: ['c1', 'c2'],
};

const api = {
  getBooks: async (): Promise<Book[]> => [sampleBook],
  getProgress: async (): Promise<undefined> => undefined,
  importBook: async (parsed: ParsedBook): Promise<Book> => ({
    ...sampleBook,
    id: 'b2',
    title: parsed.title,
  }),
  deleteBook: async (): Promise<void> => undefined,
  parseBook: async (): Promise<ParsedBook> => ({
    title: 'Fitxategia',
    chapters: [{ title: '1', text: 'Kaixo mundua!' }],
  }),
};

const render = () => {
  const element = document.createElement('page-library');
  overrideApi(element, api);
  return element;
};

const meta = {
  title: 'Pages/page-library',
  tags: ['autodocs'],
  render,
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const pageLibrary: Story = {
  render,
};
