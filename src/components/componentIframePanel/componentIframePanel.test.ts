import ComponentIframePanel from './componentIframePanel';
import { createComponent } from '../../shared/test-helper';
import { expect } from '@esm-bundle/chai';

describe('component-iframe-panel Component Spec:', () => {
  let element: HTMLElement;
  let shadow: ShadowRoot;

  afterEach(() => {
    if (element?.isConnected) {
      document.body.removeChild(element);
    }
  });

  const createPanel = async (
    open = false,
    word = ''
  ): Promise<ComponentIframePanel> => {
    const component = await createComponent({
      class: ComponentIframePanel,
      name: 'component-iframe-panel',
    });
    shadow = component.shadow;
    element = component.element;
    const panel = element as unknown as ComponentIframePanel;
    panel.open = open;
    panel.word = word;
    await panel.updateComplete;
    return panel;
  };

  it('should contain shadow root', async () => {
    await createPanel();
    expect(shadow).to.not.be.undefined;
  });

  it('renders the panel header with title', async () => {
    await createPanel(true);
    expect(shadow.querySelector('h3')?.textContent).to.equal('Itzuli');
  });

  it('renders the search input', async () => {
    await createPanel(true);
    const input = shadow.querySelector('.search-input') as HTMLInputElement;
    expect(input).to.not.be.undefined;
    expect(input.placeholder).to.equal('Bilatu hitza...');
  });

  it('renders the search button', async () => {
    await createPanel(true);
    const button = shadow.querySelector('.hzt-button--primary');
    expect(button).to.not.be.undefined;
    expect(button?.textContent?.trim()).to.equal('Bilatu');
  });

  it('renders the iframe', async () => {
    await createPanel(true);
    const iframe = shadow.querySelector('iframe');
    expect(iframe).to.not.be.undefined;
    expect(iframe?.src).to.include('euskara.euskadi.eus/itzuli');
  });

  it('updates search word from property', async () => {
    await createPanel(true, 'etxe');
    const input = shadow.querySelector('.search-input') as HTMLInputElement;
    expect(input.value).to.equal('etxe');
  });

  it('emits toggle event when close button is clicked', async () => {
    await createPanel(true);
    let toggleDetail: { open: boolean } | undefined;
    element.addEventListener('toggle', (event: Event) => {
      toggleDetail = (event as CustomEvent<{ open: boolean }>).detail;
    });
    const closeButton = shadow.querySelector('[aria-label="Cerrar panel"]') as HTMLButtonElement;
    closeButton.click();
    await (element as unknown as ComponentIframePanel).updateComplete;
    expect(toggleDetail).to.not.be.undefined;
    expect(toggleDetail?.open).to.be.false;
  });
});
