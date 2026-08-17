import ComponentImportFile from './componentImportFile';
import { accessibilityCheck, createComponent } from '../../shared/test-helper';
import { expect } from '@esm-bundle/chai';

describe('component-import-file Component Spec:', () => {
  let element: HTMLElement;
  let shadow: ShadowRoot;

  const makeFile = (name = 'liburu.txt'): File =>
    new File(['Kaixo'], name, { type: 'text/plain' });

  beforeEach(async () => {
    const component = await createComponent({
      class: ComponentImportFile,
      name: 'component-import-file',
    });

    shadow = component.shadow;
    element = component.element;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should contain shadow root', () => {
    expect(shadow).to.not.be.undefined;
  });

  it('paints the panel background on the drop zone', () => {
    const zone = shadow.querySelector('.drop-zone') as HTMLElement;
    expect(getComputedStyle(zone).backgroundColor).to.equal('rgb(250, 245, 234)');
  });

  it('should be accessible', async () => {
    const result = await accessibilityCheck(element);
    expect(result.length).to.be.equal(0);
  });

  it('opens the file picker when the drop zone is clicked', () => {
    const input = shadow.querySelector('input[type="file"]') as HTMLInputElement;
    let clicked = false;
    input.click = (): void => {
      clicked = true;
    };
    (shadow.querySelector('.drop-zone') as HTMLElement).click();
    expect(clicked).to.equal(true);
  });

  it('accepts txt, markdown and html files', () => {
    const input = shadow.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.accept).to.equal('.txt,.md,.markdown,.html,.htm,text/plain,text/markdown,text/html');
  });

  it('announces the supported formats on the drop zone', () => {
    const zone = shadow.querySelector('.drop-zone') as HTMLElement;
    expect(zone.getAttribute('aria-label')).to.equal('Añadir archivos txt, markdown o html');
  });

  it('emits files-selected when files are dropped', done => {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(makeFile());
    element.addEventListener('files-selected', (event: Event) => {
      const detail = (event as CustomEvent<{ files: File[] }>).detail;
      expect(detail.files).to.have.length(1);
      expect(detail.files[0].name).to.equal('liburu.txt');
      done();
    });
    const event = new DragEvent('drop', {
      bubbles: true,
      composed: true,
      cancelable: true,
      dataTransfer,
    });
    (shadow.querySelector('.drop-zone') as HTMLElement).dispatchEvent(event);
  });

  it('emits files-selected when the input changes', done => {
    const input = shadow.querySelector('input[type="file"]') as HTMLInputElement;
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(makeFile());
    Object.defineProperty(input, 'files', { value: dataTransfer.files, configurable: true });
    element.addEventListener('files-selected', (event: Event) => {
      const detail = (event as CustomEvent<{ files: File[] }>).detail;
      expect(detail.files).to.have.length(1);
      expect(detail.files[0].name).to.equal('liburu.txt');
      done();
    });
    input.dispatchEvent(new Event('change'));
  });

  it('selectFiles ignores empty lists', () => {
    let emitted = false;
    element.addEventListener('files-selected', () => {
      emitted = true;
    });
    (element as unknown as ComponentImportFile).selectFiles([]);
    expect(emitted).to.equal(false);
  });
});
