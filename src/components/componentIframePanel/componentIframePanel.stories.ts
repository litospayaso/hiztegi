import type { Meta, StoryObj } from '@storybook/web-components-vite';
import './componentIframePanel';

const meta: Meta = {
  title: 'Components/componentIframePanel',
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    word: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

export const Closed: Story = {
  args: {
    open: false,
    word: '',
  },
  render: (args) => `
    <div style="height: 400px; width: 350px; position: relative;">
      <button
        id="toggle-btn"
        style="position: absolute; top: 0; left: 0; z-index: 10;"
        onclick="document.querySelector('component-iframe-panel').open = true;"
      >
        Abrir panel
      </button>
      <component-iframe-panel
        .open=${args.open}
        .word=${args.word}
        @toggle=${(e: CustomEvent) => {
          const panel = document.querySelector('component-iframe-panel');
          if (panel) panel.open = e.detail.open;
        }}
      ></component-iframe-panel>
    </div>
  `,
};

export const Open: Story = {
  args: {
    open: true,
    word: '',
  },
  render: (args) => `
    <div style="height: 400px; width: 350px;">
      <component-iframe-panel
        .open=${args.open}
        .word=${args.word}
        @toggle=${(e: CustomEvent) => {
          const panel = document.querySelector('component-iframe-panel');
          if (panel) panel.open = e.detail.open;
        }}
      ></component-iframe-panel>
    </div>
  `,
};

export const WithWord: Story = {
  args: {
    open: true,
    word: 'etxe',
  },
  render: (args) => `
    <div style="height: 400px; width: 350px;">
      <component-iframe-panel
        .open=${args.open}
        .word=${args.word}
        @toggle=${(e: CustomEvent) => {
          const panel = document.querySelector('component-iframe-panel');
          if (panel) panel.open = e.detail.open;
        }}
      ></component-iframe-panel>
    </div>
  `,
};
