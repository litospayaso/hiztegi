import PageDictionary from './pageDictionary';
import { accessibilityCheck, createComponent } from '../../shared/test-helper';
import { expect } from '@esm-bundle/chai';
import type { DictionaryEntry } from '../../shared/types';

const sampleEntries: DictionaryEntry[] = [
  { word: 'etxe', status: 'known', translation: 'Casa', note: 'Vive en una casa grande.' },
  { word: 'liburu', status: 'unknown', translation: 'Libro' },
];

interface PageDictionaryApi {
  getEntries: () => Promise<DictionaryEntry[]>;
  upsertEntry: (entry: DictionaryEntry) => Promise<DictionaryEntry>;
  deleteEntry: (word: string) => Promise<void>;
}

const defaultApi = (): PageDictionaryApi => ({
  getEntries: async () => [],
  upsertEntry: async entry => entry,
  deleteEntry: async () => undefined,
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

describe('page-dictionary Component Spec:', () => {
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

  const createPage = async (api: PageDictionaryApi = defaultApi()): Promise<void> => {
    const component = await createComponent({
      class: PageDictionary,
      name: 'page-dictionary',
      api,
    });
    shadow = component.shadow;
    element = component.element;
  };

  const rowShadow = (): ShadowRoot | undefined => {
    const row = shadow.querySelector('component-dictionary-entry-row') as HTMLElement | null;
    return row?.shadowRoot ?? undefined;
  };

  const rowButtons = (): HTMLButtonElement[] => {
    return [...(rowShadow()?.querySelectorAll('button') ?? [])] as HTMLButtonElement[];
  };

  const formShadow = (): ShadowRoot | undefined => {
    const form = shadow.querySelector('component-dictionary-form') as HTMLElement | null;
    return form?.shadowRoot ?? undefined;
  };

  const setInput = (input: HTMLInputElement, value: string): void => {
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  };

  it('should contain shadow root', async () => {
    await createPage();
    expect(shadow).to.not.be.undefined;
  });

  it('should be accessible', async () => {
    await createPage({ ...defaultApi(), getEntries: async () => [...sampleEntries] });
    await waitFor(() => rowShadow() !== null);
    const result = await accessibilityCheck(element);
    expect(result.length).to.be.equal(0);
  });

  it('renders the empty state when there are no entries', async () => {
    await createPage();
    await waitFor(() => (shadow.querySelector('.empty')?.textContent ?? '').includes('Aún no hay'));
    expect(shadow.querySelector('.empty')?.textContent).to.include('Aún no hay');
  });

  it('renders a row for every entry', async () => {
    await createPage({ ...defaultApi(), getEntries: async () => [...sampleEntries] });
    await waitFor(() => shadow.querySelectorAll('component-dictionary-entry-row').length === 2);
    expect(rowShadow()?.querySelector('h2')?.textContent).to.equal('etxe');
  });

  it('filters entries by the search query', async () => {
    await createPage({ ...defaultApi(), getEntries: async () => [...sampleEntries] });
    await waitFor(() => rowShadow() !== null);

    setInput(shadow.querySelector('.search') as HTMLInputElement, 'liburu');
    await (element as unknown as PageDictionary).updateComplete;

    expect(shadow.querySelectorAll('component-dictionary-entry-row').length).to.equal(1);
    expect(rowShadow()?.querySelector('h2')?.textContent).to.equal('liburu');
  });

  it('shows a no-results message when the search matches nothing', async () => {
    await createPage({ ...defaultApi(), getEntries: async () => [...sampleEntries] });
    await waitFor(() => rowShadow() !== null);

    setInput(shadow.querySelector('.search') as HTMLInputElement, 'zzz');
    await (element as unknown as PageDictionary).updateComplete;

    expect(shadow.querySelectorAll('component-dictionary-entry-row').length).to.equal(0);
    expect(shadow.querySelector('.empty')?.textContent).to.include('No hay resultados');
  });

  it('opens the add form when clicking Añadir', async () => {
    await createPage();
    await waitFor(() => shadow.querySelector('.empty') !== null);

    (shadow.querySelector('.hzt-button--primary') as HTMLButtonElement).click();
    await waitFor(() => formShadow() !== undefined);

    expect(formShadow()?.querySelector('h2')?.textContent).to.equal('Nueva entrada');
  });

  it('adds a new entry through the form', async () => {
    const store: DictionaryEntry[] = [...sampleEntries];
    const saved: DictionaryEntry[] = [];
    const api: PageDictionaryApi = {
      ...defaultApi(),
      getEntries: async () => [...store],
      upsertEntry: async entry => {
        saved.push(entry);
        store.push(entry);
        return entry;
      },
    };
    await createPage(api);
    await waitFor(() => rowShadow() !== null);

    (shadow.querySelector('.hzt-button--primary') as HTMLButtonElement).click();
    await waitFor(() => formShadow() !== undefined);

    setInput(formShadow()?.querySelector('input[name="word"]') as HTMLInputElement, 'ura');
    setInput(formShadow()?.querySelector('input[name="translation"]') as HTMLInputElement, 'Agua');
    (formShadow()?.querySelector('form') as HTMLFormElement).requestSubmit();

    await waitFor(() => shadow.querySelectorAll('component-dictionary-entry-row').length === 3);
    expect(saved[0].word).to.equal('ura');
    expect(saved[0].status).to.equal('unknown');
    expect(shadow.querySelector('.form-wrap')).to.equal(null);
  });

  it('prefills the form when editing an entry', async () => {
    await createPage({ ...defaultApi(), getEntries: async () => [...sampleEntries] });
    await waitFor(() => rowShadow() !== null);

    const editButton = rowButtons().find(button => button.textContent?.includes('Editar')) as HTMLButtonElement;
    editButton.click();

    await waitFor(() => formShadow() !== undefined);
    expect(formShadow()?.querySelector('h2')?.textContent).to.equal('Editar entrada');
    expect((formShadow()?.querySelector('input[name="word"]') as HTMLInputElement).value).to.equal('etxe');
    expect((formShadow()?.querySelector('textarea[name="note"]') as HTMLTextAreaElement).value).to.equal(
      'Vive en una casa grande.'
    );
  });

  it('deletes an entry after confirmation', async () => {
    window.confirm = () => true;
    let deleted: string | undefined;
    const api: PageDictionaryApi = {
      ...defaultApi(),
      getEntries: async () => [...sampleEntries],
      deleteEntry: async word => {
        deleted = word;
      },
    };
    await createPage(api);
    await waitFor(() => rowShadow() !== null);

    const deleteButton = rowButtons().find(button => button.textContent?.includes('Eliminar')) as HTMLButtonElement;
    deleteButton.click();

    await waitFor(() => deleted !== undefined);
    expect(deleted).to.equal('etxe');
  });

  it('does not delete when confirmation is cancelled', async () => {
    window.confirm = () => false;
    let deleted = false;
    const api: PageDictionaryApi = {
      ...defaultApi(),
      getEntries: async () => [...sampleEntries],
      deleteEntry: async () => {
        deleted = true;
      },
    };
    await createPage(api);
    await waitFor(() => rowShadow() !== null);

    const deleteButton = rowButtons().find(button => button.textContent?.includes('Eliminar')) as HTMLButtonElement;
    deleteButton.click();

    await new Promise(resolve => setTimeout(resolve, 50));
    expect(deleted).to.equal(false);
  });
});
