import './index';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta = {
  title: 'Components/component-import-file',
  tags: ['autodocs'],
  render: () => html`<component-import-file></component-import-file>`,
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const componentImportFile: Story = {
  render: () => html`<component-import-file></component-import-file>`,
};
