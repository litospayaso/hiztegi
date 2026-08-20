import PageReading from './pageReading';
import { accessibilityCheck, createComponent } from '../../shared/test-helper';
import { expect } from '@esm-bundle/chai';
import type { Book, Chapter, DictionaryEntry, ReadingProgress } from '../../shared/types';

const book: Book = {
  id: 'b1',
  title: 'Euskal liburua',
  format: 'txt',
  addedAt: '2026-08-07T00:00:00.000Z',
  chapterIds: ['c1', 'c2'],
};

const chapter1: Chapter = {
  id: 'c1',
  bookId: 'b1',
  index: 0,
  title: 'Kapitulua 1',
  text: 'Etxe handi batean bizi da familia. Liburu bat irakurtzen dute gauean.',
};

const chapter2: Chapter = {
  id: 'c2',
  bookId: 'b1',
  index: 1,
  title: 'Kapitulua 2',
  text: 'Ura edaten dute goizero. Haurrek eskolara joaten dira.',
};

interface PageReadingApi {
  getBook: (id: string) => Promise<Book | undefined>;
  getChapters: (bookId: string) => Promise<Chapter[]>;
  getProgress: (bookId: string) => Promise<ReadingProgress | undefined>;
  saveProgress: (progress: ReadingProgress) => Promise<void>;
  getAllEntries: () => Promise<DictionaryEntry[]>;
  resolveWord: (word: string) => Promise<DictionaryEntry | undefined>;
  upsertEntry: (entry: DictionaryEntry) => Promise<DictionaryEntry>;
}

const defaultApi = (): PageReadingApi => ({
  getBook: async id => (id === book.id ? book : undefined),
  getChapters: async () => [chapter1, chapter2],
  getProgress: async () => undefined,
  saveProgress: async () => undefined,
  getAllEntries: async () => [],
  resolveWord: async () => undefined,
  upsertEntry: async entry => entry,
});

const waitFor = async (fn: () => boolean, timeout = 2000): Promise<void> => {
  const start = Date.now();
  while (!fn()) {
    if (Date.now() - start > timeout) {
      throw new Error('waitFor timed out');
    }
    await new Promise(resolve => setTimeout(resolve, 20));
  }
};

describe('page-reading Component Spec:', () => {
  let element: HTMLElement;
  let shadow: ShadowRoot;

  afterEach(() => {
    if (element?.isConnected) {
      document.body.removeChild(element);
    }
  });

  const createPage = async (api: PageReadingApi = defaultApi(), bookId = 'b1'): Promise<void> => {
    const component = await createComponent({
      class: PageReading,
      name: 'page-reading',
      api,
      properties: { bookId },
    });
    shadow = component.shadow;
    element = component.element;
  };

  const readerEl = (): HTMLElement => shadow.querySelector('component-text-reader') as HTMLElement;
  const tooltipEl = (): HTMLElement | null => shadow.querySelector('component-word-tooltip');
  const chapterInfo = (): string => shadow.querySelector('.chapter-info')?.textContent ?? '';
  const readerText = (): string =>
    (readerEl() as unknown as { text: string }).text;
  const buttonByText = (text: string): HTMLButtonElement | undefined =>
    Array.from(shadow.querySelectorAll('button')).find(button => button.textContent?.trim() === text);
  const tooltipTitle = (): string =>
    tooltipEl()?.shadowRoot?.querySelector('h3')?.textContent ?? '';

  it('should contain shadow root', async () => {
    await createPage();
    expect(shadow).to.not.be.undefined;
  });

  it('should be accessible', async () => {
    await createPage(defaultApi());
    await waitFor(() => shadow.querySelector('component-text-reader') !== null);
    const result = await accessibilityCheck(element);
    expect(result.length).to.be.equal(0);
  });

  it('renders the book title, chapter title and chapter info', async () => {
    await createPage();
    await waitFor(() => shadow.querySelector('h1') !== null);
    expect(shadow.querySelector('h1')?.textContent).to.equal('Euskal liburua');
    expect(shadow.querySelector('.chapter-title')?.textContent).to.equal('Kapitulua 1');
    expect(chapterInfo()).to.equal('Capítulo 1 de 2');
  });

  it('loads the chapter text into the reader', async () => {
    await createPage();
    await waitFor(() => shadow.querySelector('component-text-reader') !== null);
    expect(readerText()).to.include('Etxe handi batean');
  });

  it('saves progress when the page changes', async () => {
    const saved: ReadingProgress[] = [];
    const api: PageReadingApi = {
      ...defaultApi(),
      saveProgress: async progress => {
        saved.push(progress);
      },
    };
    await createPage(api);
    await waitFor(() => shadow.querySelector('component-text-reader') !== null);
    readerEl().dispatchEvent(
      new CustomEvent('page-change', { detail: { pageIndex: 1, pageCount: 2 }, bubbles: true, composed: true })
    );
    await waitFor(() => saved.length > 0);
    expect(saved[0]).to.deep.equal({ bookId: 'b1', chapterIndex: 0, pageIndex: 1 });
  });

  it('navigates to the next chapter and saves progress', async () => {
    const saved: ReadingProgress[] = [];
    const api: PageReadingApi = {
      ...defaultApi(),
      saveProgress: async progress => {
        saved.push(progress);
      },
    };
    await createPage(api);
    await waitFor(() => buttonByText('Capítulo siguiente') !== undefined);
    buttonByText('Capítulo siguiente')?.click();
    await waitFor(() => chapterInfo() === 'Capítulo 2 de 2');
    expect(readerText()).to.include('Ura edaten dute');
    expect(saved).to.deep.equal([{ bookId: 'b1', chapterIndex: 1, pageIndex: 0 }]);
  });

  it('disables chapter navigation at the first and last chapter', async () => {
    await createPage();
    await waitFor(() => buttonByText('Capítulo anterior') !== undefined);
    expect(buttonByText('Capítulo anterior')?.disabled).to.be.true;
    expect(buttonByText('Capítulo siguiente')?.disabled).to.be.false;
    buttonByText('Capítulo siguiente')?.click();
    await waitFor(() => chapterInfo() === 'Capítulo 2 de 2');
    expect(buttonByText('Capítulo anterior')?.disabled).to.be.false;
    expect(buttonByText('Capítulo siguiente')?.disabled).to.be.true;
  });

  it('restores the saved chapter from progress', async () => {
    const api: PageReadingApi = {
      ...defaultApi(),
      getProgress: async () => ({ bookId: 'b1', chapterIndex: 1, pageIndex: 0 }),
    };
    await createPage(api);
    await waitFor(() => chapterInfo() === 'Capítulo 2 de 2');
    expect(readerText()).to.include('Ura edaten dute');
  });

  it('shows an error when the book is not found', async () => {
    await createPage({ ...defaultApi(), getBook: async () => undefined });
    await waitFor(() => shadow.querySelector('.error') !== null);
    expect(shadow.querySelector('.error')?.textContent).to.equal('Libro no encontrado.');
  });

  it('shows an error when there is no book id', async () => {
    await createPage(defaultApi(), '');
    await waitFor(() => shadow.querySelector('.error') !== null);
    expect(shadow.querySelector('.error')?.textContent).to.equal('No se ha indicado ningún libro.');
  });
  it('shows an empty message when the book has no chapters', async () => {
    const api: PageReadingApi = { ...defaultApi(), getChapters: async () => [] };
    await createPage(api);
    await waitFor(() => (shadow.querySelector('.empty')?.textContent ?? '').includes('capítulos'));
    expect(shadow.querySelector('.empty')?.textContent).to.include('capítulos');
  });

  it('opens the tooltip with the dictionary entry on word-click', async () => {
    const api: PageReadingApi = {
      ...defaultApi(),
      getAllEntries: async () => [{ word: 'etxe', status: 'known', translation: 'casa' }],
      resolveWord: async () => ({ word: 'etxe', status: 'known', translation: 'casa' }),
    };
    await createPage(api);
    await waitFor(() => shadow.querySelector('component-text-reader') !== null);
    readerEl().dispatchEvent(
      new CustomEvent('word-click', { detail: { word: 'etxe', x: 100, y: 200 }, bubbles: true, composed: true })
    );
    await waitFor(() => tooltipEl() !== null);
    await waitFor(() => tooltipTitle() === 'etxe');
    expect(tooltipEl()?.shadowRoot?.querySelector('.badge')?.textContent).to.equal('Conocida');
  });

  it('opens the tooltip with the not-in-dictionary hint when there is no entry', async () => {
    await createPage();
    await waitFor(() => shadow.querySelector('component-text-reader') !== null);
    readerEl().dispatchEvent(
      new CustomEvent('word-click', { detail: { word: 'mendi', x: 100, y: 200 }, bubbles: true, composed: true })
    );
    await waitFor(() => tooltipEl() !== null);
    await waitFor(() => tooltipTitle() === 'mendi');
    expect(tooltipEl()?.shadowRoot?.querySelector('.no-entry')?.textContent).to.include(
      'no está en el diccionario'
    );
  });

  it('closes the tooltip on the close event', async () => {
    const api: PageReadingApi = {
      ...defaultApi(),
      resolveWord: async () => ({ word: 'etxe', status: 'known' }),
    };
    await createPage(api);
    await waitFor(() => shadow.querySelector('component-text-reader') !== null);
    readerEl().dispatchEvent(
      new CustomEvent('word-click', { detail: { word: 'etxe', x: 100, y: 200 }, bubbles: true, composed: true })
    );
    await waitFor(() => tooltipEl() !== null);
    tooltipEl()?.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
    await waitFor(() => tooltipEl() === null);
  });

  it('opens the dictionary form modal when the tooltip emits open-add-modal', async () => {
    await createPage();
    await waitFor(() => shadow.querySelector('component-text-reader') !== null);
    readerEl().dispatchEvent(
      new CustomEvent('word-click', { detail: { word: 'mendi', x: 100, y: 200 }, bubbles: true, composed: true })
    );
    await waitFor(() => tooltipEl() !== null);

    const tooltip = tooltipEl() as unknown as { shadowRoot: ShadowRoot };
    const addButton = Array.from(tooltip.shadowRoot.querySelectorAll('button')).find(
      btn => btn.textContent?.trim() === 'Añadir al diccionario'
    ) as HTMLButtonElement;
    addButton.click();

    await waitFor(() => {
      const form = shadow.querySelector('component-dictionary-form') as HTMLElement;
      return form?.hasAttribute('open');
    });
    const form = shadow.querySelector('component-dictionary-form') as HTMLElement;
    expect(form.hasAttribute('open')).to.be.true;
  });

  it('saves the entry from the dictionary form and refreshes the reader dictionary', async () => {
    const entries: DictionaryEntry[] = [];
    let upserted: DictionaryEntry | undefined;
    const api: PageReadingApi = {
      ...defaultApi(),
      getAllEntries: async () => [...entries],
      upsertEntry: async entry => {
        upserted = entry;
        entries.push(entry);
        return entry;
      },
    };
    await createPage(api);
    await waitFor(() => shadow.querySelector('component-text-reader') !== null);

    const form = shadow.querySelector('component-dictionary-form') as HTMLElement & {
      open: boolean;
      entry: DictionaryEntry;
      updateComplete: Promise<boolean>;
    };
    form.open = true;
    form.entry = { word: 'mendi', status: 'unknown' };
    await form.updateComplete;

    const formShadow = form.shadowRoot as ShadowRoot;
    (formShadow.querySelector('form') as HTMLFormElement).requestSubmit();

    await waitFor(() => upserted !== undefined);
    expect(upserted?.word).to.equal('mendi');
    const readerDictionary = readerEl() as unknown as { dictionary: DictionaryEntry[] };
    await waitFor(() => readerDictionary.dictionary.some(e => e.word === 'mendi'));
  });

  it('navigates back to the library', async () => {
    await createPage();
    await waitFor(() => buttonByText('Volver a la biblioteca') !== undefined);
    let navigation: { page: string } | undefined;
    element.addEventListener('page-navigation', (event: Event) => {
      navigation = (event as CustomEvent<{ page: string }>).detail;
    });
    buttonByText('Volver a la biblioteca')?.click();
    expect(navigation).to.deep.equal({ page: 'library' });
  });

  it('reloads when the bookId property changes', async () => {
    const api: PageReadingApi = {
      ...defaultApi(),
      getBook: async id => (id === 'b2' ? { ...book, id: 'b2', title: 'Bigarren liburua' } : book),
    };
    await createPage(api);
    await waitFor(() => shadow.querySelector('h1') !== null);
    expect(shadow.querySelector('h1')?.textContent).to.equal('Euskal liburua');
    (element as unknown as PageReading).bookId = 'b2';
    await waitFor(() => (shadow.querySelector('h1')?.textContent ?? '') !== 'Euskal liburua');
  });
});
