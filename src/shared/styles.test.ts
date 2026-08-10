import { css, html, LitElement } from 'lit';
import { styles } from './styles';
import './test-helper'; // injects /src/shared/styles/global.css into the test document
import { expect } from '@esm-bundle/chai';

class StylesProbe extends LitElement {
  static styles = [
    styles.hostStyle,
    styles.designTokens,
    styles.themeTokens,
    styles.accentTokens,
    styles.buttonStyle,
    css`
      .probe {
        color: var(--hzt-ink);
        background: var(--hzt-paper);
      }
    `,
  ];

  render() {
    return html`
      <div class="probe">probe</div>
      <button class="hzt-button hzt-button--primary">btn</button>
    `;
  }
}

customElements.define('styles-probe', StylesProbe);

const waitFor = async (fn: () => boolean, message: string, timeout = 4000): Promise<void> => {
  const start = Date.now();
  while (!fn()) {
    if (Date.now() - start > timeout) {
      throw new Error(`waitFor timed out: ${message}`);
    }
    await new Promise(resolve => setTimeout(resolve, 25));
  }
};

const waitForVar = (name: string, value: string): Promise<void> =>
  waitFor(
    () => getComputedStyle(document.documentElement).getPropertyValue(name).trim() === value,
    `${name} should resolve to ${value}`
  );

const renderProbe = async (): Promise<{ probe: HTMLElement; primaryBtn: HTMLButtonElement }> => {
  document.body.innerHTML = '';
  const host = document.createElement('styles-probe') as StylesProbe;
  document.body.append(host);
  await host.updateComplete;
  const probe = host.shadowRoot!.querySelector('.probe') as HTMLElement;
  const primaryBtn = host.shadowRoot!.querySelector('.hzt-button--primary') as HTMLButtonElement;
  return { probe, primaryBtn };
};

describe('global styles', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.removeAttribute('data-accent');
    document.body.innerHTML = '';
  });

  it('falls back to the Day palette when no theme is set', async () => {
    const { probe } = await renderProbe();
    const style = getComputedStyle(probe);
    expect(style.color).to.equal('rgb(27, 21, 13)');
    expect(style.backgroundColor).to.equal('rgb(241, 234, 220)');
  });

  it('applies Night from data-theme on the document root', async () => {
    document.documentElement.setAttribute('data-theme', 'night');
    await waitForVar('--hzt-app-paper', '#0c0a07');
    const { probe, primaryBtn } = await renderProbe();

    expect(getComputedStyle(probe).color).to.equal('rgb(240, 233, 218)');
    expect(getComputedStyle(probe).backgroundColor).to.equal('rgb(12, 10, 7)');
    expect(getComputedStyle(primaryBtn).backgroundColor).to.equal('rgb(216, 32, 42)');
  });

  it('applies Nord from data-theme on the document root', async () => {
    document.documentElement.setAttribute('data-theme', 'nord');
    await waitForVar('--hzt-app-paper', '#2e3440');
    const { probe } = await renderProbe();

    expect(getComputedStyle(probe).color).to.equal('rgb(236, 239, 244)');
    expect(getComputedStyle(probe).backgroundColor).to.equal('rgb(46, 52, 64)');
  });

  it('applies Night when the host element itself opts in', async () => {
    const host = document.createElement('styles-probe') as StylesProbe;
    host.setAttribute('data-theme', 'night');
    document.body.append(host);
    await host.updateComplete;
    const probe = host.shadowRoot!.querySelector('.probe') as HTMLElement;

    expect(getComputedStyle(probe).color).to.equal('rgb(240, 233, 218)');
    expect(getComputedStyle(probe).backgroundColor).to.equal('rgb(12, 10, 7)');
  });

  it('switches the accent from data-accent on the document root', async () => {
    document.documentElement.setAttribute('data-accent', 'cobalt');
    await waitForVar('--hzt-app-accent', '#1f4ed8');
    const { primaryBtn } = await renderProbe();

    expect(getComputedStyle(primaryBtn).backgroundColor).to.equal('rgb(31, 78, 216)');
    expect(getComputedStyle(primaryBtn).color).to.equal('rgb(255, 255, 255)');
  });
});
