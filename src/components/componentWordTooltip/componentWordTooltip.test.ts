import ComponentWordTooltip from './componentWordTooltip';
import { accessibilityCheck, createComponent } from '../../shared/test-helper';
import { expect } from '@esm-bundle/chai';
import type { DictionaryEntry } from '../../shared/types';

const knownEntry: DictionaryEntry = {
  word: 'etxe',
  status: 'known',
  translation: 'casa',
  note: 'Casa. Vive en una casa grande.',
};

describe('component-word-tooltip Component Spec:', () => {
  let element: HTMLElement;
  let shadow: ShadowRoot;

  afterEach(() => {
    if (element?.isConnected) {
      document.body.removeChild(element);
    }
  });

  const createTooltip = async (
    word: string,
    entry?: DictionaryEntry,
    x = 40,
    y = 40
  ): Promise<ComponentWordTooltip> => {
    const component = await createComponent({
      class: ComponentWordTooltip,
      name: 'component-word-tooltip',
    });
    shadow = component.shadow;
    element = component.element;
    const tooltip = element as unknown as ComponentWordTooltip;
    tooltip.word = word;
    tooltip.entry = entry;
    tooltip.x = x;
    tooltip.y = y;
    await tooltip.updateComplete;
    return tooltip;
  };

  const buttons = (): NodeListOf<HTMLButtonElement> => shadow.querySelectorAll('button');
  const buttonByText = (text: string): HTMLButtonElement | undefined =>
    Array.from(buttons()).find(button => button.textContent?.trim() === text);

  it('should contain shadow root', async () => {
    await createTooltip('etxe', knownEntry);
    expect(shadow).to.not.be.undefined;
  });

  it('should be accessible', async () => {
    await createTooltip('etxe', knownEntry);
    const result = await accessibilityCheck(element);
    expect(result.length).to.be.equal(0);
  });

  it('renders the word as title', async () => {
    await createTooltip('etxe', knownEntry);
    expect(shadow.querySelector('h3')?.textContent).to.equal('etxe');
  });

  it('renders the known badge, translation and note', async () => {
    await createTooltip('etxe', knownEntry);
    expect(shadow.querySelector('.badge')?.textContent).to.equal('Conocida');
    expect(shadow.querySelector('.translation')?.textContent).to.equal('casa');
    expect(shadow.querySelector('.note')?.textContent).to.equal('Casa. Vive en una casa grande.');
  });

  it('renders the unknown badge', async () => {
    await createTooltip('liburu', { word: 'liburu', status: 'unknown' });
    expect(shadow.querySelector('.badge')?.textContent).to.equal('Nueva');
    expect(shadow.querySelector('.badge')?.classList.contains('badge--unknown')).to.be.true;
  });

  it('shows the not-in-dictionary hint and add button when there is no entry', async () => {
    await createTooltip('mendi');
    expect(shadow.querySelector('.no-entry')?.textContent).to.equal(
      'Esta palabra no está en el diccionario.'
    );
    expect(shadow.querySelector('.translation')).to.equal(null);
    expect(shadow.querySelector('.note')).to.equal(null);
    expect(buttonByText('Añadir al diccionario')).to.not.be.undefined;
  });

  it('emits save-entry with an unknown status when adding a word to the dictionary', async () => {
    await createTooltip('Mendi');
    let detail: { entry: DictionaryEntry } | undefined;
    element.addEventListener('save-entry', (event: Event) => {
      detail = (event as CustomEvent<{ entry: DictionaryEntry }>).detail;
    });
    buttonByText('Añadir al diccionario')?.click();
    await (element as unknown as ComponentWordTooltip).updateComplete;
    expect(detail?.entry).to.deep.equal({ word: 'mendi', status: 'unknown' });
  });

  it('emits save-entry with known status when marking as known', async () => {
    await createTooltip('liburu', { word: 'liburu', status: 'unknown', translation: 'libro' });
    let detail: { entry: DictionaryEntry } | undefined;
    element.addEventListener('save-entry', (event: Event) => {
      detail = (event as CustomEvent<{ entry: DictionaryEntry }>).detail;
    });
    buttonByText('Marcar conocida')?.click();
    await (element as unknown as ComponentWordTooltip).updateComplete;
    expect(detail?.entry).to.deep.equal({ word: 'liburu', status: 'known', translation: 'libro' });
  });

  it('emits save-entry with unknown status when marking as new', async () => {
    await createTooltip('etxe', knownEntry);
    let detail: { entry: DictionaryEntry } | undefined;
    element.addEventListener('save-entry', (event: Event) => {
      detail = (event as CustomEvent<{ entry: DictionaryEntry }>).detail;
    });
    buttonByText('Marcar nueva')?.click();
    await (element as unknown as ComponentWordTooltip).updateComplete;
    expect(detail?.entry).to.deep.equal({
      word: 'etxe',
      status: 'unknown',
      translation: 'casa',
      note: 'Casa. Vive en una casa grande.',
    });
  });

  it('emits close when the close button is clicked', async () => {
    await createTooltip('etxe', knownEntry);
    let closed = false;
    element.addEventListener('close', () => {
      closed = true;
    });
    (shadow.querySelector('.close-button') as HTMLButtonElement).click();
    await (element as unknown as ComponentWordTooltip).updateComplete;
    expect(closed).to.be.true;
  });

  it('emits close when clicking outside the tooltip', async () => {
    await createTooltip('etxe', knownEntry);
    let closed = false;
    element.addEventListener('close', () => {
      closed = true;
    });
    document.body.click();
    await (element as unknown as ComponentWordTooltip).updateComplete;
    expect(closed).to.be.true;
  });

  it('emits close on Escape', async () => {
    await createTooltip('etxe', knownEntry);
    let closed = false;
    element.addEventListener('close', () => {
      closed = true;
    });
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await (element as unknown as ComponentWordTooltip).updateComplete;
    expect(closed).to.be.true;
  });

  it('clamps the position inside the viewport', async () => {
    await createTooltip('etxe', knownEntry, 10000, 10000);
    const tooltip = shadow.querySelector('.tooltip') as HTMLElement;
    const left = Number.parseFloat(tooltip.style.left);
    const top = Number.parseFloat(tooltip.style.top);
    expect(left).to.be.greaterThanOrEqual(8);
    expect(left).to.be.lessThan(window.innerWidth);
    expect(top).to.be.greaterThanOrEqual(8);
    expect(top).to.be.lessThan(window.innerHeight);
  });

  it('does not emit save-entry when the word is empty', async () => {
    await createTooltip('');
    let saved = false;
    element.addEventListener('save-entry', () => {
      saved = true;
    });
    buttonByText('Añadir al diccionario')?.click();
    await (element as unknown as ComponentWordTooltip).updateComplete;
    expect(saved).to.be.false;
  });
});
