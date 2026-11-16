import ComponentWordTooltip from './componentWordTooltip';
import { accessibilityCheck, createComponent } from '../../shared/test-helper';
import { expect } from '@esm-bundle/chai';
import type { DictionaryEntry, OpenDataEntry, VerbEntry } from '../../shared/types';

const knownEntry: DictionaryEntry = {
  word: 'etxe',
  status: 'known',
  translation: 'casa',
  note: 'Casa. Vive en una casa grande.',
};

const verbEntry: VerbEntry = {
  word: 'dut',
  analyses: [
    {
      lemma: 'edun',
      kind: 'auxiliary',
      paradigm: 'nor-nork',
      tense: 'orain',
      mode: 'ahala',
      persons: { nor: 'hura', nork: 'nik' },
      meaning: 'tener/haber',
      source: { page: 47, table: 'A-1' },
    },
  ],
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
    y = 40,
    baseForm?: string,
    suffix?: string,
    cases?: string[],
    openDataEntry?: OpenDataEntry,
    verbEntry?: VerbEntry
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
    tooltip.openDataEntry = openDataEntry;
    tooltip.verbEntry = verbEntry;
    tooltip.x = x;
    tooltip.y = y;
    tooltip.baseForm = baseForm;
    tooltip.suffix = suffix;
    tooltip.cases = cases;
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

  it('renders both words with arrow when baseForm is present', async () => {
    await createTooltip('ospitalera', knownEntry, 40, 40, 'ospital', '-era', ['Adlativo']);
    const h3 = shadow.querySelector('h3');
    expect(h3?.textContent).to.include('ospitalera');
    expect(h3?.textContent).to.include('→');
    expect(h3?.textContent).to.include('ospital');
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

  it('emits open-add-modal with the baseForm when adding a declined word', async () => {
    await createTooltip('mendira', undefined, 40, 40, 'mendi', '-ra', ['Adlativo']);
    let detail: { word: string } | undefined;
    element.addEventListener('open-add-modal', (event: Event) => {
      detail = (event as CustomEvent<{ word: string }>).detail;
    });
    buttonByText('Añadir al diccionario')?.click();
    await (element as unknown as ComponentWordTooltip).updateComplete;
    expect(detail?.word).to.equal('mendi');
  });

  it('emits open-add-modal with the word when no baseForm', async () => {
    await createTooltip('Mendi');
    let detail: { word: string } | undefined;
    element.addEventListener('open-add-modal', (event: Event) => {
      detail = (event as CustomEvent<{ word: string }>).detail;
    });
    buttonByText('Añadir al diccionario')?.click();
    await (element as unknown as ComponentWordTooltip).updateComplete;
    expect(detail?.word).to.equal('mendi');
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

  it('shows the base form in the header when present', async () => {
    await createTooltip('etxean', { word: 'etxean', status: 'known' }, 40, 40, 'etxe');
    expect(shadow.querySelector('h3')?.textContent).to.include('etxe');
  });

  it('does not show base form when absent', async () => {
    await createTooltip('etxe', knownEntry);
    expect(shadow.querySelector('.base-form')).to.equal(null);
  });

  it('renders the Open Data badge, translations, metadata and attribution', async () => {
    await createTooltip(
      'etxe',
      undefined,
      40,
      40,
      undefined,
      undefined,
      undefined,
      {
        word: 'etxe',
        translations: ['casa', 'hogar'],
        partOfSpeech: 'noun',
        domains: ['General Vocabulary'],
      }
    );
    expect(shadow.querySelector('.badge')?.textContent).to.equal('Open Data');
    expect(shadow.querySelector('.badge')?.classList.contains('badge--opendata')).to.be.true;
    expect(shadow.querySelector('.translations')?.textContent).to.include('casa');
    expect(shadow.querySelector('.translations')?.textContent).to.include('hogar');
    expect(shadow.querySelector('.note')?.textContent).to.include('noun');
    expect(shadow.querySelector('.opendata-source')?.textContent).to.include('CC BY 4.0');
    expect(shadow.querySelector('.no-entry')).to.equal(null);
  });

  it('renders the verb badge, analysis tags and source', async () => {
    await createTooltip(
      'dut',
      undefined,
      40,
      40,
      undefined,
      undefined,
      undefined,
      undefined,
      verbEntry
    );
    expect(shadow.querySelector('.badge')?.textContent).to.equal('Verbo');
    expect(shadow.querySelector('.badge')?.classList.contains('badge--verb')).to.be.true;
    expect(shadow.querySelector('.verb-lemma')?.textContent).to.include('edun');
    expect(shadow.querySelector('.verb-lemma')?.textContent).to.include('tener/haber');
    const tags = shadow.querySelector('.verb-tags')?.textContent ?? '';
    expect(tags).to.include('nor-nork');
    expect(tags).to.include('presente');
    expect(tags).to.include('nor: hura');
    expect(tags).to.include('nork: nik');
    expect(shadow.querySelector('.verb-source')?.textContent).to.include('p. 47');
    expect(shadow.querySelector('.no-entry')).to.equal(null);
  });

  it('renders a linked named verb source without page metadata', async () => {
    const namedVerbEntry: VerbEntry = {
      word: 'dabil',
      analyses: [
        {
          ...verbEntry.analyses[0],
          lemma: 'ibili',
          meaning: 'andar',
          source: { name: 'SEG', url: 'https://www.ehu.eus/seg/' },
        },
      ],
    };
    await createTooltip(
      'dabil',
      undefined,
      40,
      40,
      undefined,
      undefined,
      undefined,
      undefined,
      namedVerbEntry
    );
    const source = shadow.querySelector('.verb-source');
    expect(source?.textContent).to.include('SEG');
    expect(source?.textContent).not.to.include('p.');
    expect(source?.querySelector('a')?.getAttribute('href')).to.equal('https://www.ehu.eus/seg/');
  });

  it('prefers a personal entry over a verb entry', async () => {
    await createTooltip(
      'dut',
      knownEntry,
      40,
      40,
      undefined,
      undefined,
      undefined,
      undefined,
      verbEntry
    );
    expect(shadow.querySelector('.badge')?.textContent).to.equal('Conocida');
    expect(shadow.querySelector('.verb-analyses')).to.equal(null);
  });

  it('prefers a personal entry over an Open Data entry', async () => {
    await createTooltip(
      'etxe',
      knownEntry,
      40,
      40,
      undefined,
      undefined,
      undefined,
      { word: 'etxe', translations: ['casa'], domains: [] }
    );
    expect(shadow.querySelector('.badge')?.textContent).to.equal('Conocida');
    expect(shadow.querySelector('.translations')).to.equal(null);
  });

  it('emits open-add-modal with the first Open Data translation', async () => {
    await createTooltip(
      'etxera',
      undefined,
      40,
      40,
      'etxe',
      '-ra',
      ['Adlativo'],
      { word: 'etxe', translations: ['casa', 'hogar'], domains: [] }
    );
    let detail: { word: string; translation?: string } | undefined;
    element.addEventListener('open-add-modal', (event: Event) => {
      detail = (event as CustomEvent<{ word: string; translation?: string }>).detail;
    });
    buttonByText('Añadir al diccionario')?.click();
    await (element as unknown as ComponentWordTooltip).updateComplete;
    expect(detail).to.deep.equal({ word: 'etxe', translation: 'casa' });
  });

  it('shows suffix and case info with base form', async () => {
    await createTooltip(
      'etxera',
      { word: 'etxe', status: 'known' },
      40, 40,
      'etxe', '-ra', ['Adlativo']
    );
    const baseFormEl = shadow.querySelector('.base-form');
    expect(baseFormEl?.textContent).to.include('-ra');
    expect(baseFormEl?.textContent).to.include('Adlativo');
  });

  it('shows base form without suffix info when suffix is absent', async () => {
    await createTooltip('etxean', { word: 'etxe', status: 'known' }, 40, 40, 'etxe');
    const baseFormEl = shadow.querySelector('.base-form');
    expect(baseFormEl).to.equal(null);
  });

  it('does not show base form when word equals baseForm', async () => {
    await createTooltip('etxe', knownEntry, 40, 40, 'etxe');
    const baseFormEl = shadow.querySelector('.base-form');
    expect(baseFormEl).to.equal(null);
  });
});
