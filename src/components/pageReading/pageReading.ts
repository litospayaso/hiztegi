import { css, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';
import { api } from '../../shared/api.decorator';
import { getBook, getChapters, getProgress, saveProgress } from '../../shared/bookStore';
import { getAllEntries, lookup, upsertEntry } from '../../shared/dictionaryStore';
import { styles } from '../../shared/styles';
import type { Book, Chapter, DictionaryEntry } from '../../shared/types';
import PageApp from '../pageApp/pageApp';
import '../componentTextReader/index';
import '../componentWordTooltip/index';

interface PageReadingApi {
  getBook: typeof getBook;
  getChapters: typeof getChapters;
  getProgress: typeof getProgress;
  saveProgress: typeof saveProgress;
  getAllEntries: typeof getAllEntries;
  lookupWord: typeof lookup;
  upsertEntry: typeof upsertEntry;
}

interface WordTooltipData {
  word: string;
  x: number;
  y: number;
}

@api({
  getBook,
  getChapters,
  getProgress,
  saveProgress,
  getAllEntries,
  lookupWord: lookup,
  upsertEntry,
})
export default class PageReading extends PageApp<PageReadingApi> {
  static styles = [
    ...PageApp.styles,
    styles.headerStyle,
    styles.buttonStyle,
    css`
      :host {
        padding: 1rem;
      }

      header {
        margin-bottom: 1rem;
      }

      .toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        margin-bottom: 0.25rem;
      }

      .toolbar h1 {
        margin: 0;
      }

      .chapter-title {
        margin: 0 0 0.75rem;
        font-family: var(--hzt-font-display);
        font-size: var(--hzt-size-stamp);
        font-weight: 400;
        letter-spacing: var(--hzt-tracking-stamp);
        text-transform: uppercase;
        color: var(--hzt-muted);
      }

      .chapter-controls {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .chapter-info {
        font-family: var(--hzt-font-display);
        font-size: var(--hzt-size-stamp);
        letter-spacing: var(--hzt-tracking-stamp);
        text-transform: uppercase;
        color: var(--hzt-muted);
      }

      .empty {
        color: var(--hzt-muted);
      }

      .error {
        color: var(--hzt-error);
      }
    `,
  ];

  @property({ type: String })
  bookId = '';

  @state()
  private book?: Book;

  @state()
  private chapters: Chapter[] = [];

  @state()
  private chapterIndex = 0;

  @state()
  private pageIndex = 0;

  @state()
  private dictionary: DictionaryEntry[] = [];

  @state()
  private tooltip?: WordTooltipData;

  @state()
  private tooltipEntry?: DictionaryEntry;

  @state()
  private loading = true;

  @state()
  private error = '';

  private loadStarted = false;

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('hashchange', this.onHashChange);
  }

  disconnectedCallback(): void {
    window.removeEventListener('hashchange', this.onHashChange);
    super.disconnectedCallback();
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has('bookId') && this.bookId) {
      void this.ensureLoaded();
    }
  }

  async onPageInit(): Promise<void> {
    await this.ensureLoaded();
  }

  private async ensureLoaded(): Promise<void> {
    if (this.loadStarted) {
      return;
    }
    this.loadStarted = true;
    try {
      const id = this.bookId || this.getBookIdFromHash();
      await this.loadBook(id);
    } finally {
      this.loadStarted = false;
    }
  }

  private getBookIdFromHash(): string {
    const match = /^#\/read\/([^/?#]+)/.exec(window.location.hash);
    return match ? decodeURIComponent(match[1]) : '';
  }

  private onHashChange = (): void => {
    const id = this.getBookIdFromHash();
    if (id && id !== this.bookId) {
      this.bookId = id;
    }
  };

  private async loadBook(id: string): Promise<void> {
    if (!id) {
      this.error = 'No se ha indicado ningún libro.';
      this.loading = false;
      return;
    }
    this.loading = true;
    this.error = '';
    this.tooltip = undefined;
    this.tooltipEntry = undefined;
    const book = await this.api.getBook(id);
    if (!book) {
      this.error = 'Libro no encontrado.';
      this.loading = false;
      return;
    }
    const [chapters, progress, entries] = await Promise.all([
      this.api.getChapters(id),
      this.api.getProgress(id),
      this.api.getAllEntries(),
    ]);
    const lastChapter = Math.max(0, chapters.length - 1);
    this.book = book;
    this.chapters = chapters;
    this.dictionary = entries;
    this.chapterIndex = Math.min(progress?.chapterIndex ?? 0, lastChapter);
    this.pageIndex = progress?.pageIndex ?? 0;
    this.loading = false;
  }

  private async persistProgress(): Promise<void> {
    await this.api.saveProgress({
      bookId: this.bookId || this.getBookIdFromHash(),
      chapterIndex: this.chapterIndex,
      pageIndex: this.pageIndex,
    });
  }

  private async onPageChange(event: Event): Promise<void> {
    const { pageIndex } = (event as CustomEvent<{ pageIndex: number }>).detail;
    this.pageIndex = pageIndex;
    await this.persistProgress();
  }

  private async onPreviousChapter(): Promise<void> {
    if (this.chapterIndex > 0) {
      await this.loadChapter(this.chapterIndex - 1);
    }
  }

  private async onNextChapter(): Promise<void> {
    if (this.chapterIndex < this.chapters.length - 1) {
      await this.loadChapter(this.chapterIndex + 1);
    }
  }

  private async loadChapter(index: number): Promise<void> {
    this.chapterIndex = index;
    this.pageIndex = 0;
    await this.persistProgress();
  }

  private async onWordClick(event: Event): Promise<void> {
    const { word, x, y } = (event as CustomEvent<{ word: string; x: number; y: number }>).detail;
    const entry = await this.api.lookupWord(word);
    this.tooltip = { word, x, y };
    this.tooltipEntry = entry;
  }

  private onTooltipClose(): void {
    this.tooltip = undefined;
    this.tooltipEntry = undefined;
  }

  private async onTooltipSave(event: Event): Promise<void> {
    const { entry } = (event as CustomEvent<{ entry: DictionaryEntry }>).detail;
    const saved = await this.api.upsertEntry(entry);
    this.tooltipEntry = saved;
    this.dictionary = await this.api.getAllEntries();
  }

  render() {
    if (this.error) {
      return html`
        <div>
          <p class="error" role="alert">${this.error}</p>
          <button class="hzt-button" @click=${() => this.navigate('/library')}>
            Volver a la biblioteca
          </button>
        </div>
      `;
    }
    if (this.loading) {
      return html`<p class="empty" aria-live="polite">Cargando...</p>`;
    }
    const chapter = this.chapters[this.chapterIndex];
    if (!this.book || this.chapters.length === 0 || !chapter) {
      return html`<p class="empty">Este libro no tiene capítulos.</p>`;
    }
    const isFirst = this.chapterIndex === 0;
    const isLast = this.chapterIndex === this.chapters.length - 1;

    return html`
      <div>
        <header>
          <div class="toolbar">
            <h1>${this.book.title}</h1>
            <button class="hzt-button hzt-button--text" @click=${() => this.navigate('/library')}>
              Volver a la biblioteca
            </button>
          </div>
          <p class="chapter-title">${chapter.title}</p>
          <div class="chapter-controls">
            <button class="hzt-button" ?disabled=${isFirst} @click=${this.onPreviousChapter}>
              Capítulo anterior
            </button>
            <span class="chapter-info"
              >Capítulo ${this.chapterIndex + 1} de ${this.chapters.length}</span
            >
            <button
              class="hzt-button hzt-button--primary"
              ?disabled=${isLast}
              @click=${this.onNextChapter}
            >
              Capítulo siguiente
            </button>
          </div>
        </header>

        <component-text-reader
          .text=${chapter.text}
          .dictionary=${this.dictionary}
          .pageIndex=${this.pageIndex}
          @page-change=${this.onPageChange}
          @word-click=${this.onWordClick}
        ></component-text-reader>

        ${this.tooltip
          ? html`
              <component-word-tooltip
                .word=${this.tooltip.word}
                .entry=${this.tooltipEntry}
                .x=${this.tooltip.x}
                .y=${this.tooltip.y}
                @save-entry=${this.onTooltipSave}
                @close=${this.onTooltipClose}
              ></component-word-tooltip>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'page-reading': PageReading;
  }
}
