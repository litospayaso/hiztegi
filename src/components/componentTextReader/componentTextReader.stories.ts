import './index';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { DictionaryEntry } from '../../shared/types';

const sampleText =
  'Etxe handi batean bizi da familia. Liburu bat irakurtzen dute gauean. Ura edaten dute goizero.\n\n' +
  'Haurrek eskolara joaten dira. Irakasleak berriak kontatzen ditu. Gauzak politak dira mendian.';

const dictionary: DictionaryEntry[] = [
  { word: 'etxe', status: 'known', translation: 'casa' },
  { word: 'handi', status: 'known', translation: 'grande' },
  { word: 'ura', status: 'known', translation: 'agua' },
  { word: 'liburu', status: 'unknown', translation: 'libro' },
  { word: 'irakurtzen', status: 'unknown', translation: 'leyendo' },
];

const meta = {
  title: 'Components/component-text-reader',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const firstPage: Story = {
  render: () => html`
    <component-text-reader
      .text=${sampleText}
      .dictionary=${dictionary}
      .pageSize=${60}
    ></component-text-reader>
  `,
};

export const withSmallPages: Story = {
  render: () => html`
    <component-text-reader
      .text=${sampleText}
      .dictionary=${dictionary}
      .pageSize=${15}
    ></component-text-reader>
  `,
};

export const withoutDictionary: Story = {
  render: () => html`<component-text-reader .text=${sampleText}></component-text-reader>`,
};
