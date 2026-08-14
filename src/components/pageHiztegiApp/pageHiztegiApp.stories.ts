import './index';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

const render = () => document.createElement('page-hiztegi-app');

const meta = {
  title: 'Pages/page-hiztegi-app',
  tags: ['autodocs'],
  render,
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const pageHiztegiApp: Story = {
  render,
};
