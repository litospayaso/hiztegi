import ComponentTextReader from './componentTextReader';
import { accessibilityCheck, createComponent } from '../../shared/test-helper';
import { expect } from '@esm-bundle/chai';
import type { DictionaryEntry } from '../../shared/types';

describe('component-text-reader Component Spec:', () => {
  let element: HTMLElement;
  let shadow: ShadowRoot;

  afterEach(() => {
    if (element?.isConnected) {
      document.body.removeChild(element);
    }
  });

  const createReader = async (
    text: string,
    dictionary: DictionaryEntry[] = [],
    pageSize = 2
  ): Promise<ComponentTextReader> => {
    const component = await createComponent({
      class: ComponentTextReader,
      name: 'component-text-reader',
    });
    shadow = component.shadow;
    element = component.element;
    const reader = element as unknown as ComponentTextReader;
    reader.text = text;
    reader.dictionary = dictionary;
    reader.pageSize = pageSize;
    await reader.updateComplete;
    return reader;
  };

  const words = (): NodeListOf<HTMLElement> => shadow.querySelectorAll('.word');
  const pageInfo = (): string => shadow.querySelector('.page-info')?.textContent ?? '';
  const prevButton = (): HTMLButtonElement => shadow.querySelectorAll('button')[0] as HTMLButtonElement;
  const nextButton = (): HTMLButtonElement => shadow.querySelectorAll('button')[1] as HTMLButtonElement;

  it('should contain shadow root', async () => {
    await createReader('etxe liburu');
    expect(shadow).to.not.be.undefined;
  });

  it('should be accessible', async () => {
    await createReader(
      'etxe liburu ura',
      [
        { word: 'etxe', status: 'known' },
        { word: 'liburu', status: 'unknown' },
      ],
      3
    );
    const result = await accessibilityCheck(element);
    expect(result.length).to.be.equal(0);
  });

  it('preserves the full text including whitespace', async () => {
    const text = 'etxe liburu ura';
    await createReader(text, [], 3);
    expect(shadow.querySelector('.reader-text')?.textContent).to.equal(text);
  });

  it('marks known, unknown and plain words with the right classes', async () => {
    await createReader(
      'etxe liburu ura',
      [
        { word: 'etxe', status: 'known' },
        { word: 'liburu', status: 'unknown' },
      ],
      3
    );
    expect(words()[0].classList.contains('word--known')).to.be.true;
    expect(words()[1].classList.contains('word--unknown')).to.be.true;
    expect(words()[2].className).to.equal('word');
  });

  it('paginates by word count', async () => {
    await createReader('etxe liburu ura mendi');
    expect(words().length).to.equal(2);
    expect(words()[0].textContent).to.equal('etxe');
    expect(words()[1].textContent).to.equal('liburu');
    expect(pageInfo()).to.equal('Página 1 de 2');
  });

  it('navigates to the next page and emits page-change', async () => {
    await createReader('etxe liburu ura mendi');
    let detail: { pageIndex: number; pageCount: number } | undefined;
    element.addEventListener('page-change', (event: Event) => {
      detail = (event as CustomEvent<{ pageIndex: number; pageCount: number }>).detail;
    });
    nextButton().click();
    await (element as unknown as ComponentTextReader).updateComplete;
    expect(detail).to.deep.equal({ pageIndex: 1, pageCount: 2 });
    expect(pageInfo()).to.equal('Página 2 de 2');
  });

  it('navigates back and emits page-change', async () => {
    await createReader('etxe liburu ura mendi');
    nextButton().click();
    await (element as unknown as ComponentTextReader).updateComplete;
    let detail: { pageIndex: number; pageCount: number } | undefined;
    element.addEventListener('page-change', (event: Event) => {
      detail = (event as CustomEvent<{ pageIndex: number; pageCount: number }>).detail;
    });
    prevButton().click();
    await (element as unknown as ComponentTextReader).updateComplete;
    expect(detail).to.deep.equal({ pageIndex: 0, pageCount: 2 });
    expect(pageInfo()).to.equal('Página 1 de 2');
  });

  it('disables previous on the first page and next on the last page', async () => {
    await createReader('etxe liburu ura mendi');
    expect(prevButton().disabled).to.be.true;
    expect(nextButton().disabled).to.be.false;
    nextButton().click();
    await (element as unknown as ComponentTextReader).updateComplete;
    expect(prevButton().disabled).to.be.false;
    expect(nextButton().disabled).to.be.true;
  });

  it('emits word-click with the word and click coordinates', async () => {
    await createReader('etxe liburu');
    let detail: { word: string; x: number; y: number } | undefined;
    element.addEventListener('word-click', (event: Event) => {
      detail = (event as CustomEvent<{ word: string; x: number; y: number }>).detail;
    });
    words()[0].click();
    await (element as unknown as ComponentTextReader).updateComplete;
    expect(detail?.word).to.equal('etxe');
    expect(typeof detail?.x).to.equal('number');
    expect(typeof detail?.y).to.equal('number');
  });

  it('resets to the first page when the text changes', async () => {
    const reader = await createReader('etxe liburu ura mendi');
    nextButton().click();
    await reader.updateComplete;
    expect(pageInfo()).to.equal('Página 2 de 2');
    reader.text = 'liburu etxe';
    await reader.updateComplete;
    expect(pageInfo()).to.equal('Página 1 de 1');
  });

  it('renders a single empty page for empty text', async () => {
    await createReader('');
    expect(pageInfo()).to.equal('Página 1 de 1');
    expect(shadow.querySelector('.reader-text')?.textContent).to.equal('');
    expect(prevButton().disabled).to.be.true;
    expect(nextButton().disabled).to.be.true;
  });

  it('does not paginate into a trailing empty page', async () => {
    await createReader('etxe liburu ura', [], 2);
    expect(pageInfo()).to.equal('Página 1 de 2');
    nextButton().click();
    await (element as unknown as ComponentTextReader).updateComplete;
    expect(words()[0].textContent).to.equal('ura');
    expect(pageInfo()).to.equal('Página 2 de 2');
  });
});
