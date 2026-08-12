import ComponentNavBar from './componentNavBar';
import { accessibilityCheck, createComponent } from '../../shared/test-helper';
import { expect } from '@esm-bundle/chai';

describe('component-nav-bar Component Spec:', () => {
  let element: HTMLElement;
  let shadow: ShadowRoot;

  afterEach(() => {
    if (element?.isConnected) {
      document.body.removeChild(element);
    }
  });

  const createNavBar = async (active = ''): Promise<ComponentNavBar> => {
    const component = await createComponent({
      class: ComponentNavBar,
      name: 'component-nav-bar',
    });
    shadow = component.shadow;
    element = component.element;
    const navBar = element as unknown as ComponentNavBar;
    navBar.active = active;
    await navBar.updateComplete;
    return navBar;
  };

  const links = (): NodeListOf<HTMLAnchorElement> => shadow.querySelectorAll('a.nav-link');
  const linkByLabel = (label: string): HTMLAnchorElement | undefined =>
    Array.from(links()).find(link => link.textContent?.trim() === label);

  it('should contain shadow root', async () => {
    await createNavBar();
    expect(shadow).to.not.be.undefined;
  });

  it('should be accessible', async () => {
    await createNavBar('/library');
    const result = await accessibilityCheck(element);
    expect(result.length).to.be.equal(0);
  });

  it('renders hash links to home, library and dictionary', async () => {
    await createNavBar();
    expect(links().length).to.equal(3);
    expect(linkByLabel('Inicio')?.getAttribute('href')).to.equal('#/');
    expect(linkByLabel('Biblioteca')?.getAttribute('href')).to.equal('#/library');
    expect(linkByLabel('Diccionario')?.getAttribute('href')).to.equal('#/dictionary');
  });

  it('marks the active link for the given route', async () => {
    await createNavBar('/library');
    const active = linkByLabel('Biblioteca') as HTMLAnchorElement;
    expect(active.classList.contains('nav-link--active')).to.be.true;
    expect(active.getAttribute('aria-current')).to.equal('page');
    expect(linkByLabel('Inicio')?.getAttribute('aria-current')).to.equal('false');
    expect(linkByLabel('Diccionario')?.getAttribute('aria-current')).to.equal('false');
  });

  it('treats an empty active route as home', async () => {
    await createNavBar('');
    expect(linkByLabel('Inicio')?.classList.contains('nav-link--active')).to.be.true;
  });

  it('marks no link active for an unknown route', async () => {
    await createNavBar('/read/b1');
    Array.from(links()).forEach(link => {
      expect(link.classList.contains('nav-link--active')).to.be.false;
    });
  });

  it('updates the active link when the route changes', async () => {
    const navBar = await createNavBar('/library');
    expect(linkByLabel('Biblioteca')?.classList.contains('nav-link--active')).to.be.true;
    navBar.active = '/dictionary';
    await navBar.updateComplete;
    expect(linkByLabel('Diccionario')?.classList.contains('nav-link--active')).to.be.true;
    expect(linkByLabel('Biblioteca')?.classList.contains('nav-link--active')).to.be.false;
  });
});
