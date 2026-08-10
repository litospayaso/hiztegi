import ComponentLibraryBookCard from './componentLibraryBookCard';
import { accessibilityCheck, createComponent } from '../../shared/test-helper';
import { expect } from '@esm-bundle/chai';
import type { Book, ReadingProgress } from '../../shared/types';

const sampleBook: Book = {
  id: 'b1',
  title: 'Euskal liburua',
  format: 'txt',
  addedAt: '2026-08-07T00:00:00.000Z',
  chapterIds: ['c1', 'c2', 'c3'],
};

const sampleProgress: ReadingProgress = { bookId: 'b1', chapterIndex: 1, pageIndex: 2 };

describe('component-library-book-card Component Spec:', () => {
  let element: HTMLElement;
  let shadow: ShadowRoot;

  beforeEach(async () => {
    const component = await createComponent({
      class: ComponentLibraryBookCard,
      name: 'component-library-book-card',
    });

    shadow = component.shadow;
    element = component.element;
    (element as unknown as ComponentLibraryBookCard).book = sampleBook;
    await (element as unknown as ComponentLibraryBookCard).updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should contain shadow root', () => {
    expect(shadow).to.not.be.undefined;
  });

  it('should be accessible', async () => {
    const result = await accessibilityCheck(element);
    expect(result.length).to.be.equal(0);
  });

  it('renders the book title and format', () => {
    expect(shadow.querySelector('h2')?.textContent).to.equal('Euskal liburua');
    expect(shadow.querySelector('.format')?.textContent).to.equal('txt');
  });

  it('does not render progress when there is none', () => {
    expect(shadow.querySelector('.progress')).to.equal(null);
  });

  it('renders the reading progress', async () => {
    const card = element as unknown as ComponentLibraryBookCard;
    card.progress = sampleProgress;
    await card.updateComplete;
    expect(shadow.querySelector('.progress')?.textContent).to.include('Capítulo 2 / 3');
  });

  it('emits read-book with the book id', done => {
    element.addEventListener('read-book', (event: Event) => {
      expect((event as CustomEvent<{ id: string }>).detail.id).to.equal('b1');
      done();
    });
    (shadow.querySelector('button') as HTMLButtonElement).click();
  });

  it('emits delete-book with the book id', done => {
    element.addEventListener('delete-book', (event: Event) => {
      expect((event as CustomEvent<{ id: string }>).detail.id).to.equal('b1');
      done();
    });
    const buttons = shadow.querySelectorAll('button');
    (buttons[buttons.length - 1] as HTMLButtonElement).click();
  });
});
