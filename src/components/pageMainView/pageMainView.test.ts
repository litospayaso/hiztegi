import PageMainView from './pageMainView';
import type { PageMainViewRoute } from './pageMainView';
import { accessibilityCheck, createComponent } from '../../shared/test-helper';
import { expect } from '@esm-bundle/chai';
import type { Book, Chapter, DictionaryEntry, ParsedBook } from '../../shared/types';

const book: Book = {
  id: 'b1',
  title: 'Euskal liburua',
  format: 'txt',
  addedAt: '2026-08-07T00:00:00.000Z',
  chapterIds: ['c1'],
};

const chapter: Chapter = {
  id: 'c1',
  bookId: 'b1',
  index: 0,
  title: 'Kapitulua 1',
  text: 'Etxe handi bat. Liburu bat irakurtzen dute.',
};

const entry: DictionaryEntry = { word: 'etxe', status: 'known', translation: 'casa' };

const apiOverrides: Record<string, Record<string, unknown>> = {
  library: {
    getBooks: async (): Promise<Book[]> => [book],
    getProgress: async (): Promise<void> => undefined,
    importBook: async (parsed: ParsedBook): Promise<Book> => ({
      ...book,
      id: 'b2',
      title: parsed.title,
    }),
    deleteBook: async (): Promise<void> => undefined,
    parseBook: async (): Promise<ParsedBook> => ({
      title: 'Fitxategia',
      chapters: [{ title: '1', text: 'Kaixo' }],
    }),
  },
  dictionary: {
    getEntries: async (): Promise<DictionaryEntry[]> => [entry],
    upsertEntry: async (e: DictionaryEntry): Promise<DictionaryEntry> => e,
    deleteEntry: async (): Promise<void> => undefined,
  },
  reading: {
    getBook: async (id: string): Promise<Book | undefined> => (id === 'b1' ? book : undefined),
    getChapters: async (): Promise<Chapter[]> => [chapter],
    getProgress: async (): Promise<void> => undefined,
    saveProgress: async (): Promise<void> => undefined,
    getAllEntries: async (): Promise<DictionaryEntry[]> => [entry],
    lookupWord: async (): Promise<void> => undefined,
    upsertEntry: async (e: DictionaryEntry): Promise<DictionaryEntry> => e,
  },
};

interface PageMainViewApi {
  getApi: (route: PageMainViewRoute) => Record<string, unknown>;
}

const defaultApi = (): PageMainViewApi => ({
  getApi: route => apiOverrides[route.name] ?? {},
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

describe('page-main-view Component Spec:', () => {
  let element: HTMLElement;
  let shadow: ShadowRoot;

  afterEach(() => {
    if (element?.isConnected) {
      document.body.removeChild(element);
    }
    window.location.hash = '';
  });

  const createPage = async (api: PageMainViewApi = defaultApi(), hash = '#/library'): Promise<void> => {
    window.location.hash = hash;
    const component = await createComponent({
      class: PageMainView,
      name: 'page-main-view',
      api,
    });
    shadow = component.shadow;
    element = component.element;
  };

  const activePage = (tag: string): HTMLElement | null =>
    shadow.querySelector(`#page-container ${tag}`);

  it('should contain shadow root', async () => {
    await createPage();
    expect(shadow).to.not.be.undefined;
  });

  it('should be accessible', async () => {
    await createPage();
    await waitFor(() => shadow.querySelector('#page-container page-library') !== null);
    const result = await accessibilityCheck(element);
    expect(result.length).to.be.equal(0);
  });

  it('renders the nav bar and highlights the current route', async () => {
    await createPage();
    await waitFor(() => shadow.querySelector('component-nav-bar') !== null);
    const navShadow = shadow.querySelector('component-nav-bar')?.shadowRoot;
    expect(navShadow?.querySelector('.nav-link--active')?.textContent?.trim()).to.equal(
      'Biblioteca'
    );
  });

  it('renders the library page for the default and library routes', async () => {
    await createPage();
    await waitFor(() => activePage('page-library') !== null);
    expect(activePage('page-library')).to.not.be.null;
  });

  it('renders the dictionary page for #/dictionary', async () => {
    await createPage(defaultApi(), '#/dictionary');
    await waitFor(() => activePage('page-dictionary') !== null);
    expect(activePage('page-dictionary')).to.not.be.null;
  });

  it('renders the reading page for #/read/:bookId passing the bookId', async () => {
    await createPage(defaultApi(), '#/read/b1');
    await waitFor(() => activePage('page-reading') !== null);
    const reading = activePage('page-reading') as unknown as { bookId: string };
    expect(reading.bookId).to.equal('b1');
  });

  it('swaps the active page on hashchange', async () => {
    await createPage();
    await waitFor(() => activePage('page-library') !== null);
    window.location.hash = '#/dictionary';
    await waitFor(() => activePage('page-dictionary') !== null);
    expect(activePage('page-library')).to.equal(null);
  });

  it('falls back to the library page for unknown routes', async () => {
    await createPage(defaultApi(), '#/unknown');
    await waitFor(() => activePage('page-library') !== null);
    expect(activePage('page-library')).to.not.be.null;
  });

  it('passes the api overrides to the active page', async () => {
    await createPage();
    await waitFor(() => activePage('page-library') !== null);
    const cardTitle = (): string | undefined =>
      activePage('page-library')?.shadowRoot
        ?.querySelector('component-library-book-card')
        ?.shadowRoot?.querySelector('h2')?.textContent;
    await waitFor(() => cardTitle() === 'Euskal liburua');
  });

  it('loads the chapter text into the reading page via the overrides', async () => {
    await createPage(defaultApi(), '#/read/b1');
    await waitFor(() => activePage('page-reading') !== null);
    const readerText = (): string => {
      const reader = activePage('page-reading')?.shadowRoot?.querySelector(
        'component-text-reader'
      ) as unknown as { text: string } | null;
      return reader?.text ?? '';
    };
    await waitFor(() => readerText().includes('Etxe handi bat'));
  });

  it('navigates back to the library from the reading page', async () => {
    await createPage(defaultApi(), '#/read/b1');
    await waitFor(() => activePage('page-reading') !== null);
    const backButton = (): HTMLButtonElement | undefined =>
      Array.from(
        activePage('page-reading')?.shadowRoot?.querySelectorAll('button') ?? []
      ).find(button => button.textContent?.includes('Volver a la biblioteca')) as
        | HTMLButtonElement
        | undefined;
    await waitFor(() => backButton() !== undefined);
    backButton()?.click();
    await waitFor(() => activePage('page-library') !== null);
    expect(activePage('page-library')).to.not.be.null;
  });
});
