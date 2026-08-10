import './index';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { Book, ReadingProgress } from '../../shared/types';

const book: Book = {
  id: 'b1',
  title: 'Euskal liburua',
  format: 'txt',
  addedAt: '2026-08-07T00:00:00.000Z',
  chapterIds: ['c1', 'c2'],
};

const progress: ReadingProgress = { bookId: 'b1', chapterIndex: 1, pageIndex: 0 };

const meta = {
  title: 'Components/component-library-book-card',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const withProgress: Story = {
  render: () => html`<component-library-book-card .book=${book} .progress=${progress}></component-library-book-card>`,
};

export const withoutProgress: Story = {
  render: () => html`<component-library-book-card .book=${book}></component-library-book-card>`,
};
