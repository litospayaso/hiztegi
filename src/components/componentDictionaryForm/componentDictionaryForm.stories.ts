import './index';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { DictionaryEntry } from '../../shared/types';

const existingEntry: DictionaryEntry = {
  word: 'etxe',
  status: 'known',
  translation: 'Casa',
  note: 'Vive en una casa grande.',
};

const meta = {
  title: 'Components/component-dictionary-form',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const newEntry: Story = {
  render: () => html`<component-dictionary-form></component-dictionary-form>`,
};

export const editEntry: Story = {
  render: () => html`<component-dictionary-form .entry=${existingEntry}></component-dictionary-form>`,
};
