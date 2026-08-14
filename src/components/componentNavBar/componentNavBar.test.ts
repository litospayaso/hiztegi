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

  const buttons = (): NodeListOf<HTMLButtonElement> => shadow.querySelectorAll('button.nav-link');
  const buttonByLabel = (label: string): HTMLButtonElement | undefined =>
    Array.from(buttons()).find(button => button.textContent?.trim() === label);
  const clickNavigation = (label: string): CustomEvent | undefined => {
    let received: CustomEvent | undefined;
    element.addEventListener('nav-bar-navigation', (event: Event) => {
      received = event as CustomEvent;
    });
    buttonByLabel(label)?.click();
    return received;
  };

  it('should contain shadow root', async () => {
    await createNavBar();
    expect(shadow).to.not.be.undefined;
  });

  it('should be accessible', async () => {
    await createNavBar('library');
    const result = await accessibilityCheck(element);
    expect(result.length).to.be.equal(0);
  });

  it('renders buttons for home (library) and dictionary', async () => {
    await createNavBar();
    expect(buttons().length).to.equal(2);
    expect(buttonByLabel('Inicio')).to.not.be.undefined;
    expect(buttonByLabel('Diccionario')).to.not.be.undefined;
  });

  it('dispatches a nav-bar-navigation event with the target page', async () => {
    await createNavBar();
    const event = clickNavigation('Inicio');
    expect(event).to.not.be.undefined;
    expect((event as unknown as { detail: { page: string } }).detail.page).to.equal('library');

    const event2 = clickNavigation('Diccionario');
    expect((event2 as unknown as { detail: { page: string } }).detail.page).to.equal('dictionary');
  });

  it('marks the active button for the given route', async () => {
    await createNavBar('library');
    const active = buttonByLabel('Inicio') as HTMLButtonElement;
    expect(active.classList.contains('nav-link--active')).to.be.true;
    expect(active.getAttribute('aria-current')).to.equal('page');
    expect(buttonByLabel('Diccionario')?.getAttribute('aria-current')).to.equal('false');
  });

  it('treats an empty active route as home', async () => {
    await createNavBar('');
    expect(buttonByLabel('Inicio')?.classList.contains('nav-link--active')).to.be.true;
  });

  it('marks no button active for an unknown route', async () => {
    await createNavBar('reading');
    Array.from(buttons()).forEach(button => {
      expect(button.classList.contains('nav-link--active')).to.be.false;
    });
  });

  it('updates the active button when the route changes', async () => {
    const navBar = await createNavBar('library');
    expect(buttonByLabel('Inicio')?.classList.contains('nav-link--active')).to.be.true;
    navBar.active = 'dictionary';
    await navBar.updateComplete;
    expect(buttonByLabel('Diccionario')?.classList.contains('nav-link--active')).to.be.true;
    expect(buttonByLabel('Inicio')?.classList.contains('nav-link--active')).to.be.false;
  });
});
