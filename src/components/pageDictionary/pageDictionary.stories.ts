import './index';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { overrideApi } from '../../shared/test-helper';
import type { DictionaryEntry } from '../../shared/types';

const sampleEntries: DictionaryEntry[] = [
  { word: 'etxe', status: 'known', translation: 'Casa', note: 'Vive en una casa grande.' },
  { word: 'liburu', status: 'unknown', translation: 'Libro' },
  { word: 'ura', status: 'unknown', translation: 'Agua' },
];

const api = {
  getEntries: async (): Promise<DictionaryEntry[]> => sampleEntries,
  upsertEntry: async (entry: DictionaryEntry): Promise<DictionaryEntry> => entry,
  deleteEntry: async (): Promise<void> => undefined,
};

const render = () => {
  const element = document.createElement('page-dictionary');
  overrideApi(element, api);
  return element;
};

const meta = {
  title: 'Pages/page-dictionary',
  tags: ['autodocs'],
  render,
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const pageDictionary: Story = {
  render,
};
