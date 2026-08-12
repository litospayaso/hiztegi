import './index';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta = {
  title: 'Components/component-nav-bar',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const defaultView: Story = {
  render: () => html`<component-nav-bar></component-nav-bar>`,
};

export const activeLibrary: Story = {
  render: () => html`<component-nav-bar active="/library"></component-nav-bar>`,
};

export const activeDictionary: Story = {
  render: () => html`<component-nav-bar active="/dictionary"></component-nav-bar>`,
};
