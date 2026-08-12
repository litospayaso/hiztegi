import ComponentDictionaryEntryRow from './componentDictionaryEntryRow';
import { accessibilityCheck, createComponent } from '../../shared/test-helper';
import { expect } from '@esm-bundle/chai';
import type { DictionaryEntry } from '../../shared/types';

const sampleEntry: DictionaryEntry = {
  word: 'etxe',
  status: 'known',
  note: 'Casa. Vive en una casa grande.',
};

describe('component-dictionary-entry-row Component Spec:', () => {
  let element: HTMLElement;
  let shadow: ShadowRoot;

  beforeEach(async () => {
    const component = await createComponent({
      class: ComponentDictionaryEntryRow,
      name: 'component-dictionary-entry-row',
    });

    shadow = component.shadow;
    element = component.element;
    (element as unknown as ComponentDictionaryEntryRow).entry = sampleEntry;
    await (element as unknown as ComponentDictionaryEntryRow).updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should contain shadow root', () => {
    expect(shadow).to.not.be.undefined;
  });

  it('should be accessible', async () => {
    const result = await accessibilityCheck(element);
    expect(result.length).to.be.equal(0);
  });

  it('renders the word and the known status badge', () => {
    expect(shadow.querySelector('h2')?.textContent).to.equal('etxe');
    expect(shadow.querySelector('.badge')?.textContent).to.equal('Conocida');
    expect(shadow.querySelector('.badge')?.classList.contains('badge--known')).to.be.true;
  });

  it('shows the unknown status badge', async () => {
    const row = element as unknown as ComponentDictionaryEntryRow;
    row.entry = { ...sampleEntry, status: 'unknown' };
    await row.updateComplete;
    expect(shadow.querySelector('.badge')?.textContent).to.equal('Nueva');
    expect(shadow.querySelector('.badge')?.classList.contains('badge--unknown')).to.be.true;
  });

  it('renders the note when there is one', () => {
    expect(shadow.querySelector('.note')?.textContent).to.equal('Casa. Vive en una casa grande.');
  });

  it('does not render the note when there is none', async () => {
    const row = element as unknown as ComponentDictionaryEntryRow;
    row.entry = { ...sampleEntry, note: undefined };
    await row.updateComplete;
    expect(shadow.querySelector('.note')).to.equal(null);
  });

  it('emits edit-entry with the word', done => {
    element.addEventListener('edit-entry', (event: Event) => {
      expect((event as CustomEvent<{ word: string }>).detail.word).to.equal('etxe');
      done();
    });
    const buttons = shadow.querySelectorAll('button');
    (buttons[0] as HTMLButtonElement).click();
  });

  it('emits delete-entry with the word', done => {
    element.addEventListener('delete-entry', (event: Event) => {
      expect((event as CustomEvent<{ word: string }>).detail.word).to.equal('etxe');
      done();
    });
    const buttons = shadow.querySelectorAll('button');
    (buttons[buttons.length - 1] as HTMLButtonElement).click();
  });
});
