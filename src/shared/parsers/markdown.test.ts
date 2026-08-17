import { expect } from '@esm-bundle/chai';
import { parseMarkdown } from './markdown';

const FIXTURE_URL = new URL('./__fixtures__/sample.md', import.meta.url);

const makeFile = (name: string, text: string): File =>
  new File([text], name, { type: 'text/markdown' });

const loadFixture = async (): Promise<string> => {
  const response = await fetch(FIXTURE_URL);
  expect(response.ok).to.equal(true);
  return response.text();
};

describe('markdown parser Spec:', () => {
  it('splits the sample fixture into chapters from #/## headings', async () => {
    const text = await loadFixture();
    const book = await parseMarkdown(makeFile('sample.md', text));

    expect(book.chapters.map(chapter => chapter.title)).to.deep.equal([
      'Lehenengo kapitulua',
      'Bigarren kapitulua',
      'Hirugarren kapitulua',
    ]);
  });

  it('strips emphasis, links and inline code from the text', async () => {
    const book = await parseMarkdown(
      makeFile('inline.md', '# Tituloa\n\n**Lodia** eta *etzana* eta `kodea` eta [esteka](https://x.eus).')
    );

    expect(book.chapters[0].text).to.equal('Lodia eta etzana eta kodea eta esteka.');
  });

  it('strips list markers and blockquote prefixes', async () => {
    const book = await parseMarkdown(
      makeFile('lista.md', '# Tituloa\n\n- Zerrenda a\n- Zerrenda b\n\n> Aipua bat.')
    );

    expect(book.chapters[0].text).to.include('Zerrenda a\nZerrenda b');
    expect(book.chapters[0].text).to.include('Aipua bat.');
  });

  it('drops images and horizontal rules', async () => {
    const book = await parseMarkdown(
      makeFile('irudia.md', '# Tituloa\n\n![irudia](irudi.png)\n\nParagrafoa.\n\n---\n\nBukaera.')
    );

    expect(book.chapters[0].text).to.equal('Paragrafoa.\n\nBukaera.');
  });

  it('keeps the body of fenced code blocks', async () => {
    const book = await parseMarkdown(
      makeFile('kodea.md', '# Tituloa\n\n```ts\nconst x: number = 1;\n```\n\nParagrafoa.')
    );

    expect(book.chapters[0].text).to.include('const x: number = 1;');
  });

  it('treats level 3+ headings as content, not chapters', async () => {
    const book = await parseMarkdown(
      makeFile('azpititulua.md', '# Kapitulua\n\n### Azpititulua\n\nParagrafoa.')
    );

    expect(book.chapters).to.have.length(1);
    expect(book.chapters[0].title).to.equal('Kapitulua');
    expect(book.chapters[0].text).to.include('Azpititulua');
  });

  it('falls back to 15-paragraph chapters when there are no headings', async () => {
    const paragraphs = Array.from(
      { length: 32 },
      (_, index) => `Paragrafoa ${String(index + 1).padStart(2, '0')}`
    );
    const book = await parseMarkdown(makeFile('plano.md', paragraphs.join('\n\n')));

    expect(book.chapters).to.have.length(3);
    expect(book.chapters[0].text.split('\n\n')).to.have.length(15);
    expect(book.chapters[2].text.split('\n\n')).to.have.length(2);
  });

  it('derives the title from the file name without the extension', async () => {
    const book = await parseMarkdown(makeFile('Nire Liburua.md', 'Paragrafoa bat.'));
    expect(book.title).to.equal('Nire Liburua');
  });

  it('handles an empty file as a single empty chapter', async () => {
    const book = await parseMarkdown(makeFile('hutsa.md', ''));
    expect(book.chapters).to.have.length(1);
    expect(book.chapters[0].text).to.equal('');
  });
});
