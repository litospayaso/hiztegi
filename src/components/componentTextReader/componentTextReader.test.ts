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
    pageSize = 2,
    opendataIndex: ReadonlySet<string> = new Set(),
    verbIndex: ReadonlySet<string> = new Set()
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
    reader.opendataIndex = opendataIndex;
    reader.verbIndex = verbIndex;
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

  it('marks verb forms and prefers them over Open Data', async () => {
    await createReader(
      'dut etxe da',
      [
        { word: 'etxe', status: 'known' },
        { word: 'da', status: 'known' },
      ],
      3,
      new Set(['da']),
      new Set(['dut', 'da'])
    );
    expect(words()[0].classList.contains('word--verb')).to.be.true;
    expect(words()[1].classList.contains('word--known')).to.be.true;
    expect(words()[2].classList.contains('word--known')).to.be.true;
    expect(words()[2].classList.contains('word--verb')).to.be.false;
  });

  it('marks exact verb forms before declined Open Data words', async () => {
    await createReader('etxean da', [], 2, new Set(['etxe']), new Set(['etxean']));
    expect(words()[0].classList.contains('word--verb')).to.be.true;
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

  it('highlights declined forms via suffix detection', async () => {
    await createReader(
      'etxe etxean ura',
      [{ word: 'etxe', status: 'known' }],
      3
    );
    expect(words()[0].classList.contains('word--known')).to.be.true;
    expect(words()[1].classList.contains('word--known')).to.be.true;
    expect(words()[2].className).to.equal('word');
  });

  it('detects declined forms for unknown base forms', async () => {
    await createReader(
      'etxe etxean liburuan',
      [
        { word: 'etxe', status: 'known' },
        { word: 'liburu', status: 'unknown' },
      ],
      3
    );
    expect(words()[0].classList.contains('word--known')).to.be.true;
    expect(words()[1].classList.contains('word--known')).to.be.true;
    expect(words()[2].classList.contains('word--unknown')).to.be.true;
  });

  it('emits word-click with baseForm and cases for declined forms', async () => {
    await createReader(
      'etxe etxean ura',
      [{ word: 'etxe', status: 'known' }],
      3
    );
    let detail: { word: string; baseForm?: string; cases?: string[] } | undefined;
    element.addEventListener('word-click', (event: Event) => {
      detail = (event as CustomEvent<{ word: string; baseForm?: string; cases?: string[] }>).detail;
    });
    words()[1].click();
    await (element as unknown as ComponentTextReader).updateComplete;
    expect(detail?.word).to.equal('etxean');
    expect(detail?.baseForm).to.equal('etxe');
    expect(detail?.cases).to.include('Inesivo');
  });

  it('emits word-click without baseForm for direct matches', async () => {
    await createReader(
      'etxe etxean ura',
      [{ word: 'etxe', status: 'known' }],
      3
    );
    let detail: { word: string; baseForm?: string; cases?: string[] } | undefined;
    element.addEventListener('word-click', (event: Event) => {
      detail = (event as CustomEvent<{ word: string; baseForm?: string; cases?: string[] }>).detail;
    });
    words()[0].click();
    await (element as unknown as ComponentTextReader).updateComplete;
    expect(detail?.word).to.equal('etxe');
    expect(detail?.baseForm).to.be.undefined;
  });

  it('marks words found in Open Data with the opendata class', async () => {
    await createReader('etxe mendi ura', [], 3, new Set(['etxe', 'ura']));
    expect(words()[0].classList.contains('word--opendata')).to.be.true;
    expect(words()[1].className).to.equal('word');
    expect(words()[2].classList.contains('word--opendata')).to.be.true;
  });

  it('gives personal dictionary entries precedence over Open Data', async () => {
    await createReader(
      'etxe liburu',
      [
        { word: 'etxe', status: 'known' },
        { word: 'liburu', status: 'unknown' },
      ],
      2,
      new Set(['etxe', 'liburu'])
    );
    expect(words()[0].classList.contains('word--known')).to.be.true;
    expect(words()[1].classList.contains('word--unknown')).to.be.true;
  });

  it('highlights declined forms found in Open Data via suffix detection', async () => {
    await createReader('etxean mendira', [], 2, new Set(['etxe', 'mendi']));
    expect(words()[0].classList.contains('word--opendata')).to.be.true;
    expect(words()[1].classList.contains('word--opendata')).to.be.true;
  });

  it('emits word-click with the Open Data baseForm for declined forms', async () => {
    await createReader('etxean ura', [], 2, new Set(['etxe']));
    let detail: { word: string; baseForm?: string; suffix?: string; cases?: string[] } | undefined;
    element.addEventListener('word-click', (event: Event) => {
      detail = (event as CustomEvent<{ word: string; baseForm?: string; suffix?: string; cases?: string[] }>).detail;
    });
    words()[0].click();
    await (element as unknown as ComponentTextReader).updateComplete;
    expect(detail?.word).to.equal('etxean');
    expect(detail?.baseForm).to.equal('etxe');
    expect(detail?.suffix).to.equal('-an');
    expect(detail?.cases).to.include('Inesivo');
  });
});
