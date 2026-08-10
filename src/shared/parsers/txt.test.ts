import { expect } from '@esm-bundle/chai';
import { parseBook } from './index';
import { parseTxt } from './txt';

const FIXTURE_URL = new URL('./__fixtures__/sample.txt', import.meta.url);

const makeFile = (name: string, text: string): File =>
  new File([text], name, { type: 'text/plain' });

const loadFixture = async (): Promise<string> => {
  const response = await fetch(FIXTURE_URL);
  expect(response.ok).to.equal(true);
  return response.text();
};

describe('txt parser Spec:', () => {
  it('splits the sample fixture into chapters of 15 paragraphs', async () => {
    const text = await loadFixture();
    const book = await parseTxt(makeFile('sample.txt', text));

    expect(book.chapters).to.have.length(3);
    expect(book.chapters[0].text.split('\n\n')).to.have.length(15);
    expect(book.chapters[1].text.split('\n\n')).to.have.length(15);
    expect(book.chapters[2].text.split('\n\n')).to.have.length(2);
  });

  it('preserves paragraph order and content across chapters', async () => {
    const text = await loadFixture();
    const book = await parseTxt(makeFile('sample.txt', text));

    expect(book.chapters[0].text).to.include('Paragrafoa 01');
    expect(book.chapters[2].text).to.include('Paragrafoa 31');
    expect(book.chapters[2].text).to.include('Paragrafoa 32');

    const all = book.chapters.map(chapter => chapter.text).join('\n\n');
    for (let index = 1; index <= 32; index += 1) {
      expect(all).to.include(`Paragrafoa ${String(index).padStart(2, '0')}`);
    }
  });

  it('derives the title from the file name without the extension', async () => {
    const book = await parseTxt(makeFile('Mi Libro.txt', 'Paragrafoa bat.'));
    expect(book.title).to.equal('Mi Libro');
  });

  it('handles an empty file as a single empty chapter', async () => {
    const book = await parseTxt(makeFile('empty.txt', ''));
    expect(book.chapters).to.have.length(1);
    expect(book.chapters[0].text).to.equal('');
  });

  it('treats text without blank lines as a single chapter', async () => {
    const lines = Array.from({ length: 20 }, (_, index) => `Lerroa ${index + 1}`);
    const book = await parseTxt(makeFile('plain.txt', lines.join('\n')));

    expect(book.chapters).to.have.length(1);
    expect(book.chapters[0].text.split('\n')).to.have.length(20);
    expect(book.chapters[0].text).to.include('Lerroa 1');
    expect(book.chapters[0].text).to.include('Lerroa 20');
  });

  it('trims paragraphs and collapses blank-line runs', async () => {
    const book = await parseTxt(makeFile('messy.txt', '\n\n  Paragrafoa A  \n\n\n\n  Paragrafoa B  \n\n'));
    expect(book.chapters).to.have.length(1);
    expect(book.chapters[0].text).to.equal('Paragrafoa A\n\nParagrafoa B');
  });
});

describe('parseBook Spec:', () => {
  it('parses txt files', async () => {
    const book = await parseBook(makeFile('book.txt', 'Kaixo mundua!'));
    expect(book.title).to.equal('book');
    expect(book.chapters).to.have.length(1);
    expect(book.chapters[0].text).to.equal('Kaixo mundua!');
  });

  it('rejects epub as not implemented yet', async () => {
    let error: Error | undefined;
    try {
      await parseBook(makeFile('book.epub', ''));
    } catch (err) {
      error = err as Error;
    }
    expect(error?.message).to.match(/not implemented yet/);
  });

  it('rejects pdf as not implemented yet', async () => {
    let error: Error | undefined;
    try {
      await parseBook(makeFile('book.pdf', ''));
    } catch (err) {
      error = err as Error;
    }
    expect(error?.message).to.match(/not implemented yet/);
  });

  it('rejects unsupported extensions', async () => {
    let error: Error | undefined;
    try {
      await parseBook(makeFile('book.doc', ''));
    } catch (err) {
      error = err as Error;
    }
    expect(error?.message).to.match(/Unsupported file format/);
  });
});
