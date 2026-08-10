import { getAll, get, put, transaction } from './storage';
import type { Book, BookFormat, Chapter, ParsedBook, ReadingProgress } from './types';

export const importBook = async (parsed: ParsedBook, format: BookFormat): Promise<Book> => {
  const id = crypto.randomUUID();
  const book: Book = {
    id,
    title: parsed.title,
    format,
    addedAt: new Date().toISOString(),
    chapterIds: [],
  };
  const chapters: Chapter[] = parsed.chapters.map((chapter, index) => ({
    id: crypto.randomUUID(),
    bookId: id,
    index,
    title: chapter.title,
    text: chapter.text,
  }));
  book.chapterIds = chapters.map(chapter => chapter.id);

  await transaction(['books', 'chapters'], 'readwrite', stores => {
    stores.books.put(book);
    chapters.forEach(chapter => stores.chapters.put(chapter));
  });

  return book;
};

export const getBooks = async (): Promise<Book[]> => {
  return getAll<Book>('books');
};

export const getBook = async (id: string): Promise<Book | undefined> => {
  return get<Book>('books', id);
};

export const getChapters = async (bookId: string): Promise<Chapter[]> => {
  const chapters = await getAll<Chapter>('chapters');
  return chapters.filter(chapter => chapter.bookId === bookId).sort((a, b) => a.index - b.index);
};

export const getChapter = async (id: string): Promise<Chapter | undefined> => {
  return get<Chapter>('chapters', id);
};

export const deleteBook = async (id: string): Promise<void> => {
  const book = await getBook(id);
  if (!book) {
    return;
  }
  await transaction(['books', 'chapters', 'progress'], 'readwrite', stores => {
    stores.books.delete(id);
    book.chapterIds.forEach(chapterId => stores.chapters.delete(chapterId));
    stores.progress.delete(id);
  });
};

export const saveProgress = async (progress: ReadingProgress): Promise<void> => {
  await put('progress', progress);
};

export const getProgress = async (bookId: string): Promise<ReadingProgress | undefined> => {
  return get<ReadingProgress>('progress', bookId);
};
