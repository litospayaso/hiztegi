import './index';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { DictionaryEntry, OpenDataEntry, VerbEntry } from '../../shared/types';

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

const openDataEntry: OpenDataEntry = {
  word: 'mendi',
  translations: ['monte'],
  partOfSpeech: 'noun',
  domains: ['General Vocabulary'],
};

const verbEntry: VerbEntry = {
  word: 'dut',
  analyses: [
    {
      lemma: 'edun',
      kind: 'auxiliary',
      paradigm: 'nor-nork',
      tense: 'orain',
      mode: 'ahala',
      persons: { nor: 'hura', nork: 'nik' },
      meaning: 'tener/haber',
      source: { page: 47, table: 'A-1' },
    },
  ],
};

const derivedVerbEntry: VerbEntry = {
  word: 'zenekiela',
  analyses: [],
  derivations: [
    {
      type: 'completive-la',
      from: 'zenekien',
      lemma: 'jakin',
      meaning: 'saber',
      baseAnalysis: {
        lemma: 'jakin',
        kind: 'synthetic',
        paradigm: 'nor-nork',
        tense: 'iragan',
        mode: 'ahala',
        persons: { nor: 'hura', nork: 'zu' },
        meaning: 'saber',
        source: { name: 'SEG', url: 'https://www.ehu.eus/seg/' },
      },
    },
  ],
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

export const withOpenDataEntry: Story = {
  render: () => html`
    <component-word-tooltip
      word="mendi"
      .openDataEntry=${openDataEntry}
      x=${120}
      y=${80}
    ></component-word-tooltip>
  `,
};

export const withVerbEntry: Story = {
  render: () => html`
    <component-word-tooltip
      word="dut"
      .verbEntry=${verbEntry}
      x=${120}
      y=${80}
    ></component-word-tooltip>
  `,
};

export const withDerivedVerbEntry: Story = {
  render: () => html`
    <component-word-tooltip
      word="zenekiela"
      .verbEntry=${derivedVerbEntry}
      x=${120}
      y=${80}
    ></component-word-tooltip>
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
