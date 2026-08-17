import { expect } from '@esm-bundle/chai';
import { parseHtml } from './html';

const FIXTURE_URL = new URL('./__fixtures__/sample.html', import.meta.url);

const makeFile = (name: string, text: string): File =>
  new File([text], name, { type: 'text/html' });

const loadFixture = async (): Promise<string> => {
  const response = await fetch(FIXTURE_URL);
  expect(response.ok).to.equal(true);
  return response.text();
};

describe('html parser Spec:', () => {
  it('splits the sample fixture into chapters from h1/h2 headings', async () => {
    const text = await loadFixture();
    const book = await parseHtml(makeFile('sample.html', text));

    expect(book.chapters.map(chapter => chapter.title)).to.deep.equal([
      'Lehenengo kapitulua',
      'Bigarren kapitulua',
      'Hirugarren kapitulua',
    ]);
  });

  it('preserves paragraphs and strips tags from the text', async () => {
    const text = await loadFixture();
    const book = await parseHtml(makeFile('sample.html', text));

    expect(book.chapters[0].text.split('\n\n')).to.deep.equal([
      'Paragrafoa bat da.',
      'Bigarren paragrafoa.',
    ]);
    expect(book.chapters[2].text).to.include('Laugarren paragrafoa.');
  });

  it('flattens inline tags to plain text', async () => {
    const book = await parseHtml(
      makeFile('inline.html', '<html><body><p>Kaixo <b>mundua</b> <i>handia</i></p></body></html>')
    );

    expect(book.chapters[0].text).to.equal('Kaixo mundua handia');
  });

  it('falls back to 15-paragraph chapters when there are no headings', async () => {
    const paragraphs = Array.from(
      { length: 32 },
      (_, index) => `<p>Paragrafoa ${String(index + 1).padStart(2, '0')}</p>`
    );
    const book = await parseHtml(makeFile('plano.html', `<html><body>${paragraphs.join('')}</body></html>`));

    expect(book.chapters).to.have.length(3);
    expect(book.chapters[0].text.split('\n\n')).to.have.length(15);
    expect(book.chapters[2].text.split('\n\n')).to.have.length(2);
  });

  it('derives the title from the file name without the extension', async () => {
    const book = await parseHtml(makeFile('Nire Liburua.html', '<html><body><p>Kaixo</p></body></html>'));
    expect(book.title).to.equal('Nire Liburua');
  });

  it('handles an empty file as a single empty chapter', async () => {
    const book = await parseHtml(makeFile('hutsa.html', ''));
    expect(book.chapters).to.have.length(1);
    expect(book.chapters[0].text).to.equal('');
  });
});
