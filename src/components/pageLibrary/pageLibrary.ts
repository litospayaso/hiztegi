import { css, html } from 'lit';
import { state } from 'lit/decorators.js';
import { api } from '../../shared/api.decorator';
import { deleteBook, getBooks, getProgress, importBook } from '../../shared/bookStore';
import { parseBook } from '../../shared/parsers';
import { styles } from '../../shared/styles';
import type { Book, ReadingProgress } from '../../shared/types';
import PageApp from '../pageApp/pageApp';
import '../componentImportFile/index';
import '../componentLibraryBookCard/index';

interface PageLibraryApi {
  getBooks: typeof getBooks;
  importBook: typeof importBook;
  deleteBook: typeof deleteBook;
  getProgress: typeof getProgress;
  parseBook: typeof parseBook;
}

@api({ getBooks, importBook, deleteBook, getProgress, parseBook })
export default class PageLibrary extends PageApp<PageLibraryApi> {
  static styles = [
    ...PageApp.styles,
    styles.headerStyle,
    css`
      :host {
        padding: 1rem;
      }

      h1 {
        margin-bottom: 0.75rem;
      }

      .books {
        display: grid;
        gap: 0.75rem;
        margin-top: 1rem;
      }

      .empty {
        color: var(--hzt-muted);
      }
    `,
  ];

  @state()
  private books: Book[] = [];

  @state()
  private progressByBook: Record<string, ReadingProgress | undefined> = {};

  @state()
  private importing = false;

  async onPageInit(): Promise<void> {
    await this.loadBooks();
  }

  private async loadBooks(): Promise<void> {
    const books = await this.api.getBooks();
    const entries = await Promise.all(
      books.map(async book => [book.id, await this.api.getProgress(book.id)] as const)
    );
    this.books = books;
    this.progressByBook = Object.fromEntries(entries);
  }

  private async onFilesSelected(event: Event): Promise<void> {
    const { files } = (event as CustomEvent<{ files: File[] }>).detail;
    this.importing = true;
    try {
      for (const file of files) {
        const parsed = await this.api.parseBook(file);
        await this.api.importBook(parsed, 'txt');
      }
      await this.loadBooks();
    } finally {
      this.importing = false;
    }
  }

  private async onDeleteBook(event: Event): Promise<void> {
    const { id } = (event as CustomEvent<{ id: string }>).detail;
    if (!window.confirm('¿Seguro que quieres eliminar el libro?')) {
      return;
    }
    await this.api.deleteBook(id);
    await this.loadBooks();
  }

  private onReadBook(event: Event): void {
    const { id } = (event as CustomEvent<{ id: string }>).detail;
    this.navigate(`/read/${id}`);
  }

  render() {
    return html`
      <div>
        <h1>Biblioteca</h1>
        <component-import-file @files-selected=${this.onFilesSelected}></component-import-file>
        ${this.importing ? html`<p class="empty" aria-live="polite">Importando...</p>` : ''}
        <div class="books">
          ${this.books.length === 0
            ? html`<p class="empty">Aún no hay ningún libro.</p>`
            : this.books.map(
                book => html`
                  <component-library-book-card
                    .book=${book}
                    .progress=${this.progressByBook[book.id]}
                    @read-book=${this.onReadBook}
                    @delete-book=${this.onDeleteBook}
                  ></component-library-book-card>
                `
              )}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'page-library': PageLibrary;
  }
}
