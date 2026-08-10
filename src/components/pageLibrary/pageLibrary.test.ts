import PageLibrary from './pageLibrary';
import { accessibilityCheck, createComponent } from '../../shared/test-helper';
import { expect } from '@esm-bundle/chai';
import type { Book, BookFormat, ParsedBook } from '../../shared/types';

const sampleBook: Book = {
  id: 'b1',
  title: 'Euskal liburua',
  format: 'txt',
  addedAt: '2026-08-07T00:00:00.000Z',
  chapterIds: ['c1'],
};

interface PageLibraryApi {
  getBooks: () => Promise<Book[]>;
  getProgress: () => Promise<undefined>;
  importBook: (parsed: ParsedBook, format: BookFormat) => Promise<Book>;
  deleteBook: (id: string) => Promise<void>;
  parseBook: (file: File) => Promise<ParsedBook>;
}

const defaultApi = (): PageLibraryApi => ({
  getBooks: async () => [],
  getProgress: async () => undefined,
  importBook: async (parsed: ParsedBook) => ({ ...sampleBook, title: parsed.title }),
  deleteBook: async () => undefined,
  parseBook: async () => ({ title: 'Fitxategia', chapters: [{ title: '1', text: 'Kaixo' }] }),
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

describe('page-library Component Spec:', () => {
  let element: HTMLElement;
  let shadow: ShadowRoot;
  let originalConfirm: () => boolean;

  beforeEach(() => {
    originalConfirm = window.confirm;
  });

  afterEach(() => {
    if (element?.isConnected) {
      document.body.removeChild(element);
    }
    window.confirm = originalConfirm;
    window.location.hash = '';
  });

  const createPage = async (api: PageLibraryApi = defaultApi()): Promise<void> => {
    const component = await createComponent({
      class: PageLibrary,
      name: 'page-library',
      api,
    });
    shadow = component.shadow;
    element = component.element;
  };

  const cardShadow = (): ShadowRoot | undefined => {
    const card = shadow.querySelector('component-library-book-card') as HTMLElement | null;
    return card?.shadowRoot ?? undefined;
  };

  const cardButtons = (): HTMLButtonElement[] => {
    return [...(cardShadow()?.querySelectorAll('button') ?? [])] as HTMLButtonElement[];
  };

  it('should contain shadow root', async () => {
    await createPage();
    expect(shadow).to.not.be.undefined;
  });

  it('should be accessible', async () => {
    await createPage(defaultApi());
    await waitFor(() => shadow.querySelector('.empty') !== null);
    const result = await accessibilityCheck(element);
    expect(result.length).to.be.equal(0);
  });

  it('renders the empty state when there are no books', async () => {
    await createPage();
    await waitFor(() => (shadow.querySelector('.empty')?.textContent ?? '').includes('Aún no hay'));
    expect(shadow.querySelector('.empty')?.textContent).to.include('Aún no hay');
  });

  it('paints the paper background and ink title', async () => {
    await createPage();
    await waitFor(() => shadow.querySelector('h1') !== null);
    expect(getComputedStyle(element).backgroundColor).to.equal('rgb(241, 234, 220)');
    const title = shadow.querySelector('h1') as HTMLElement;
    expect(getComputedStyle(title).color).to.equal('rgb(27, 21, 13)');
  });

  it('renders a card for every book', async () => {
    await createPage({ ...defaultApi(), getBooks: async () => [sampleBook] });
    await waitFor(() => shadow.querySelector('component-library-book-card') !== null);
    expect(cardShadow()?.querySelector('h2')?.textContent).to.equal('Euskal liburua');
  });

  it('imports txt files and refreshes the list', async () => {
    const store: Book[] = [];
    let importedFormat: BookFormat | undefined;
    const api: PageLibraryApi = {
      ...defaultApi(),
      getBooks: async () => [...store],
      importBook: async (parsed, format) => {
        importedFormat = format;
        const book: Book = { ...sampleBook, id: 'new', title: parsed.title };
        store.push(book);
        return book;
      },
    };
    await createPage(api);

    const file = new File(['Kaixo'], 'liburu.txt', { type: 'text/plain' });
    const importZone = shadow.querySelector('component-import-file') as HTMLElement;
    importZone.dispatchEvent(
      new CustomEvent('files-selected', { detail: { files: [file] }, bubbles: true, composed: true })
    );

    await waitFor(() => shadow.querySelectorAll('component-library-book-card').length === 1);
    expect(importedFormat).to.equal('txt');
    expect(cardShadow()?.querySelector('h2')?.textContent).to.equal('Fitxategia');
  });

  it('deletes a book after confirmation', async () => {
    window.confirm = () => true;
    let deleted: string | undefined;
    const api: PageLibraryApi = {
      ...defaultApi(),
      getBooks: async () => [sampleBook],
      deleteBook: async id => {
        deleted = id;
      },
    };
    await createPage(api);
    await waitFor(() => shadow.querySelector('component-library-book-card') !== null);

    const deleteButton = cardButtons().find(button => button.textContent?.includes('Eliminar')) as HTMLButtonElement;
    deleteButton.click();

    await waitFor(() => deleted !== undefined);
    expect(deleted).to.equal('b1');
  });

  it('does not delete when confirmation is cancelled', async () => {
    window.confirm = () => false;
    let deleted = false;
    const api: PageLibraryApi = {
      ...defaultApi(),
      getBooks: async () => [sampleBook],
      deleteBook: async () => {
        deleted = true;
      },
    };
    await createPage(api);
    await waitFor(() => shadow.querySelector('component-library-book-card') !== null);

    const deleteButton = cardButtons().find(button => button.textContent?.includes('Eliminar')) as HTMLButtonElement;
    deleteButton.click();

    await new Promise(resolve => setTimeout(resolve, 50));
    expect(deleted).to.equal(false);
  });

  it('navigates to the reader on read-book', async () => {
    const api: PageLibraryApi = {
      ...defaultApi(),
      getBooks: async () => [sampleBook],
    };
    await createPage(api);
    await waitFor(() => shadow.querySelector('component-library-book-card') !== null);

    const readButton = cardButtons().find(button => button.textContent?.includes('Leer')) as HTMLButtonElement;
    readButton.click();

    expect(window.location.hash).to.equal('#/read/b1');
  });
});
