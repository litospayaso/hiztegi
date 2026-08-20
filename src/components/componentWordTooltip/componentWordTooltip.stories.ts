import './index';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { DictionaryEntry } from '../../shared/types';

const knownEntry: DictionaryEntry = {
  word: 'etxe',
  status: 'known',
  translation: 'casa',
  note: 'Casa. Vive en una casa grande.',
};

const unknownEntry: DictionaryEntry = {
  word: 'liburu',
  status: 'unknown',
  translation: 'libro',
  note: 'Libro. Estoy leyendo un libro en euskera.',
};

const meta = {
  title: 'Components/component-word-tooltip',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const withKnownEntry: Story = {
  render: () => html`
    <component-word-tooltip
      word="etxe"
      .entry=${knownEntry}
      x=${120}
      y=${80}
    ></component-word-tooltip>
  `,
};

export const withUnknownEntry: Story = {
  render: () => html`
    <component-word-tooltip
      word="liburu"
      .entry=${unknownEntry}
      x=${120}
      y=${80}
    ></component-word-tooltip>
  `,
};

export const withoutEntry: Story = {
  render: () => html`
    <component-word-tooltip word="mendi" x=${120} y=${80}></component-word-tooltip>
  `,
};

export const nearBottomEdge: Story = {
  render: () => html`
    <component-word-tooltip word="liburu" .entry=${unknownEntry} x=${700} y=${500}></component-word-tooltip>
  `,
};

export const withDeclinedEntry: Story = {
  render: () => html`
    <component-word-tooltip
      word="etxera"
      .entry=${{
        word: 'etxera',
        status: 'known',
        translation: 'a la casa',
      }}
      baseForm="etxe"
      suffix="-ra"
      .cases=${['Adlativo']}
      x=${120}
      y=${80}
    ></component-word-tooltip>
  `,
};
