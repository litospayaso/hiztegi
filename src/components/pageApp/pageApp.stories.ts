import './index';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

const render = () => document.createElement('page-app');

const meta = {
  title: 'Pages/page-app',
  tags: ['autodocs'],
  render,
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const pageApp: Story = {
  render,
};
