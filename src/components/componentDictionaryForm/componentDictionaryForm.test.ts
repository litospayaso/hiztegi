import ComponentDictionaryForm from './componentDictionaryForm';
import { accessibilityCheck, createComponent } from '../../shared/test-helper';
import { expect } from '@esm-bundle/chai';
import type { DictionaryEntry } from '../../shared/types';

const sampleEntry: DictionaryEntry = {
  word: 'etxe',
  status: 'known',
  translation: 'Casa',
  note: 'Vive en una casa grande.',
};

const setInput = (input: HTMLInputElement, value: string): void => {
  input.value = value;
  input.dispatchEvent(new Event('input', { bubbles: true }));
};

describe('component-dictionary-form Component Spec:', () => {
  let element: HTMLElement;
  let shadow: ShadowRoot;

  beforeEach(async () => {
    const component = await createComponent({
      class: ComponentDictionaryForm,
      name: 'component-dictionary-form',
    });

    shadow = component.shadow;
    element = component.element;
    const form = element as unknown as ComponentDictionaryForm;
    form.open = true;
    await form.updateComplete;
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

  it('renders the new-entry mode with empty fields', () => {
    expect(shadow.querySelector('h2')?.textContent).to.equal('Nueva entrada');
    expect((shadow.querySelector('input[name="word"]') as HTMLInputElement).value).to.equal('');
    expect((shadow.querySelector('textarea[name="note"]') as HTMLTextAreaElement).value).to.equal('');
    expect((shadow.querySelector('input[name="status"][value="unknown"]') as HTMLInputElement).checked).to.be.true;
  });

  it('prefills the fields in edit mode', async () => {
    const form = element as unknown as ComponentDictionaryForm;
    form.entry = sampleEntry;
    await form.updateComplete;
    expect(shadow.querySelector('h2')?.textContent).to.equal('Editar entrada');
    expect((shadow.querySelector('input[name="word"]') as HTMLInputElement).value).to.equal('etxe');
    expect((shadow.querySelector('input[name="translation"]') as HTMLInputElement).value).to.equal('Casa');
    expect((shadow.querySelector('textarea[name="note"]') as HTMLTextAreaElement).value).to.equal('Vive en una casa grande.');
    expect((shadow.querySelector('input[name="status"][value="known"]') as HTMLInputElement).checked).to.be.true;
  });

  it('renders nothing when open is false', async () => {
    const form = element as unknown as ComponentDictionaryForm;
    form.open = false;
    await form.updateComplete;
    expect(shadow.querySelector('form')).to.equal(null);
  });

  it('emits save-entry with a normalized entry', async () => {
    setInput(shadow.querySelector('input[name="word"]') as HTMLInputElement, '  etxe  ');
    setInput(shadow.querySelector('input[name="translation"]') as HTMLInputElement, 'Casa');
    (shadow.querySelector('input[name="status"][value="known"]') as HTMLInputElement).click();

    const submitted = new Promise(resolve => {
      element.addEventListener('save-entry', (event: Event) => {
        resolve((event as CustomEvent<{ entry: DictionaryEntry }>).detail.entry);
      });
    });

    (shadow.querySelector('form') as HTMLFormElement).requestSubmit();

    const entry = (await submitted) as DictionaryEntry;
    expect(entry.word).to.equal('etxe');
    expect(entry.status).to.equal('known');
    expect(entry.translation).to.equal('Casa');
  });

  it('omits empty translation and note from the emitted entry', async () => {
    setInput(shadow.querySelector('input[name="word"]') as HTMLInputElement, 'ura');

    const submitted = new Promise(resolve => {
      element.addEventListener('save-entry', (event: Event) => {
        resolve((event as CustomEvent<{ entry: DictionaryEntry }>).detail.entry);
      });
    });

    (shadow.querySelector('form') as HTMLFormElement).requestSubmit();

    const entry = (await submitted) as DictionaryEntry;
    expect(entry.word).to.equal('ura');
    expect(entry.translation).to.be.undefined;
    expect(entry.note).to.be.undefined;
  });

  it('shows an error and does not emit when the word is empty', async () => {
    let emitted = false;
    element.addEventListener('save-entry', () => {
      emitted = true;
    });

    (shadow.querySelector('form') as HTMLFormElement).requestSubmit();
    await (element as unknown as ComponentDictionaryForm).updateComplete;

    expect(shadow.querySelector('.error')?.textContent).to.equal('La palabra es obligatoria');
    expect((shadow.querySelector('input[name="word"]') as HTMLInputElement).getAttribute('aria-invalid')).to.equal('true');
    expect(emitted).to.be.false;
  });

  it('clears the error once the user types a word', async () => {
    (shadow.querySelector('form') as HTMLFormElement).requestSubmit();
    await (element as unknown as ComponentDictionaryForm).updateComplete;
    expect(shadow.querySelector('.error')).to.not.be.null;

    setInput(shadow.querySelector('input[name="word"]') as HTMLInputElement, 'etxe');
    await (element as unknown as ComponentDictionaryForm).updateComplete;

    expect(shadow.querySelector('.error')).to.equal(null);
    expect((shadow.querySelector('input[name="word"]') as HTMLInputElement).getAttribute('aria-invalid')).to.equal('false');
  });

  it('emits close when cancel is clicked', done => {
    element.addEventListener('close', () => {
      done();
    });
    const buttons = shadow.querySelectorAll('button');
    (buttons[0] as HTMLButtonElement).click();
  });

  it('emits close when Escape is pressed', done => {
    element.addEventListener('close', () => {
      done();
    });
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  });
});
