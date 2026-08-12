import './index';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { DictionaryEntry } from '../../shared/types';

const knownEntry: DictionaryEntry = {
  word: 'etxe',
  status: 'known',
  note: 'Casa. Vive en una casa grande.',
};

const unknownEntry: DictionaryEntry = {
  word: 'liburu',
  status: 'unknown',
  note: 'Libro. Estoy leyendo un libro en euskera.',
};

const meta = {
  title: 'Components/component-dictionary-entry-row',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const known: Story = {
  render: () => html`<component-dictionary-entry-row .entry=${knownEntry}></component-dictionary-entry-row>`,
};

export const unknown: Story = {
  render: () => html`<component-dictionary-entry-row .entry=${unknownEntry}></component-dictionary-entry-row>`,
};

export const withoutNote: Story = {
  render: () => html`<component-dictionary-entry-row .entry=${{
    word: 'ura',
    status: 'known',
  }}></component-dictionary-entry-row>`,
};
