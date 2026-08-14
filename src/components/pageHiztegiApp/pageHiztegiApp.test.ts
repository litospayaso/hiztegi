import PageHiztegiApp from './pageHiztegiApp';
import './index';
import { accessibilityCheck, createComponent } from '../../shared/test-helper';
import { expect } from '@esm-bundle/chai';

describe('page-hiztegi-app Component Spec:', () => {
  let element: HTMLElement;
  let shadow: ShadowRoot;

  afterEach(() => {
    if (element?.isConnected) {
      document.body.removeChild(element);
    }
    window.history.replaceState({}, '', window.location.pathname);
  });

  const createApp = async (overrides: { mock?: Record<string, unknown> } = {}): Promise<void> => {
    const component = await createComponent({
      class: PageHiztegiApp,
      name: 'page-hiztegi-app',
      ...overrides,
    });
    shadow = component.shadow;
    element = component.element;
  };

  const pageEl = (tag: string): HTMLElement | null => shadow.querySelector(tag);

  const navClick = (label: string): void => {
    const button = Array.from(
      shadow.querySelectorAll('component-nav-bar') as NodeListOf<HTMLElement>
    )
      .map(nav => nav.shadowRoot)
      .filter((root): root is ShadowRoot => root !== null)
      .flatMap(root => Array.from(root.querySelectorAll('button')))
      .find(button => button.textContent?.trim() === label);
    button?.click();
  };

  it('should contain shadow root', async () => {
    await createApp();
    expect(shadow).to.not.be.undefined;
  });

  it('should be accessible', async () => {
    await createApp();
    await new Promise(resolve => setTimeout(resolve, 100));
    const result = await accessibilityCheck(element);
    expect(result.length).to.be.equal(0);
  });

  it('renders the library page by default', async () => {
    await createApp();
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(pageEl('page-library')).to.not.be.null;
  });

  it('renders the page declared in the page query param', async () => {
    window.history.replaceState({}, '', `${window.location.pathname}?page=dictionary`);
    await createApp();
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(pageEl('page-dictionary')).to.not.be.null;
    expect(pageEl('page-library')).to.be.null;
  });

  it('renders the reading page passing the bookId from the query param', async () => {
    window.history.replaceState({}, '', `${window.location.pathname}?page=reading&bookId=b1`);
    await createApp();
    await new Promise(resolve => setTimeout(resolve, 100));
    const reading = pageEl('page-reading') as HTMLElement & { bookId?: string };
    expect(reading).to.not.be.null;
    expect(reading.bookId).to.equal('b1');
  });

  it('navigates by calling navigateToPage and swaps the rendered page on page-navigation', async () => {
    const navigations: Record<string, string>[] = [];
    await createApp({ mock: { navigateToPage: (params: Record<string, string>) => navigations.push(params) } });

    const library = pageEl('page-library') as HTMLElement | null;
    expect(library).to.not.be.null;
    library?.dispatchEvent(
      new CustomEvent('page-navigation', {
        detail: { page: 'dictionary' },
        bubbles: true,
        composed: true,
      })
    );
    await (element as unknown as PageHiztegiApp).updateComplete;

    expect(navigations).to.deep.equal([{ page: 'dictionary' }]);
    expect(pageEl('page-dictionary')).to.not.be.null;
    expect(pageEl('page-library')).to.be.null;
  });

  it('navigates when a nav bar button is clicked', async () => {
    const navigations: Record<string, string>[] = [];
    await createApp({ mock: { navigateToPage: (params: Record<string, string>) => navigations.push(params) } });

    navClick('Diccionario');
    await (element as unknown as PageHiztegiApp).updateComplete;

    expect(navigations).to.deep.equal([{ page: 'dictionary' }]);
    expect(pageEl('page-dictionary')).to.not.be.null;
  });

  it('inherits the Page helpers', async () => {
    await createApp();
    expect((element as unknown as PageHiztegiApp).getHostname()).to.equal(window.location.hostname);
  });

  it('paints the paper background on the host', async () => {
    await createApp();
    expect(getComputedStyle(element).backgroundColor).to.equal('rgb(241, 234, 220)');
  });
});
