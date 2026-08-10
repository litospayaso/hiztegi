import { expect } from '@esm-bundle/chai';
import {
  deleteBook,
  getBook,
  getBooks,
  getChapter,
  getChapters,
  getProgress,
  importBook,
  saveProgress,
} from '../bookStore';
import { deleteDatabase } from '../storage';
import type { ParsedBook } from '../types';

const parsed: ParsedBook = {
  title: 'Test book',
  chapters: [
    { title: '1', text: 'lehen kapitulua' },
    { title: '2', text: 'bigarren kapitulua' },
    { title: '3', text: 'hirugarren kapitulua' },
  ],
};

describe('bookStore Spec:', () => {
  beforeEach(async () => {
    await deleteDatabase();
  });

  afterEach(async () => {
    await deleteDatabase();
  });

  it('imports a book together with its chapters', async () => {
    const book = await importBook(parsed, 'txt');
    expect(book.title).to.be.equal('Test book');
    expect(book.format).to.be.equal('txt');
    expect(book.chapterIds).to.have.length(3);
    expect(book.id).to.not.be.empty;

    const chapters = await getChapters(book.id);
    expect(chapters).to.have.length(3);
    expect(chapters[0].text).to.be.equal('lehen kapitulua');
    expect(chapters[0].bookId).to.be.equal(book.id);
  });

  it('returns all books', async () => {
    await importBook(parsed, 'txt');
    await importBook({ title: 'Big', chapters: [{ title: 'x', text: 'y' }] }, 'epub');
    const books = await getBooks();
    expect(books).to.have.length(2);
  });

  it('gets a single book by id', async () => {
    const book = await importBook(parsed, 'txt');
    expect((await getBook(book.id))?.title).to.be.equal('Test book');
  });

  it('returns chapters sorted by their index', async () => {
    const book = await importBook(parsed, 'txt');
    const chapters = await getChapters(book.id);
    expect(chapters.map(chapter => chapter.index)).to.deep.equal([0, 1, 2]);
    expect(chapters.map(chapter => chapter.title)).to.deep.equal(['1', '2', '3']);
  });

  it('gets a single chapter by id', async () => {
    const book = await importBook(parsed, 'txt');
    const chapters = await getChapters(book.id);
    const chapter = await getChapter(chapters[1].id);
    expect(chapter?.title).to.be.equal('2');
  });

  it('saves and retrieves the reading progress', async () => {
    const book = await importBook(parsed, 'txt');
    await saveProgress({ bookId: book.id, chapterIndex: 1, pageIndex: 4 });
    expect(await getProgress(book.id)).to.deep.equal({ bookId: book.id, chapterIndex: 1, pageIndex: 4 });
  });

  it('deletes a book cascading chapters and progress', async () => {
    const book = await importBook(parsed, 'txt');
    await saveProgress({ bookId: book.id, chapterIndex: 0, pageIndex: 0 });
    await deleteBook(book.id);
    expect(await getBook(book.id)).to.be.equal(undefined);
    expect(await getChapters(book.id)).to.have.length(0);
    expect(await getProgress(book.id)).to.be.equal(undefined);
  });
});
