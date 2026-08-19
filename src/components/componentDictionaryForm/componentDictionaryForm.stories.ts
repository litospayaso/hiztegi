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

const closeModal = (id: string): void => {
  const form = document.getElementById(id) as HTMLElement & { open: boolean };
  if (form) {
    form.open = false;
  }
};

const openForm = (id: string): void => {
  const form = document.getElementById(id) as HTMLElement & { open: boolean };
  if (!form) {
    return;
  }
  form.open = true;
  form.addEventListener('close', () => closeModal(id), { once: true });
  form.addEventListener('save-entry', () => closeModal(id), { once: true });
};

export const newEntry: Story = {
  render: () => html`
    <button class="hzt-button" @click=${() => openForm('new-form')}>Abrir formulario</button>
    <component-dictionary-form id="new-form"></component-dictionary-form>
  `,
};

export const editEntry: Story = {
  render: () => html`
    <button class="hzt-button" @click=${() => openForm('edit-form')}>Abrir formulario</button>
    <component-dictionary-form id="edit-form" .entry=${existingEntry}></component-dictionary-form>
  `,
};
