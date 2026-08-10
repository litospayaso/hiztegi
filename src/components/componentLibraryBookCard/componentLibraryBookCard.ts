import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import type { Book, ReadingProgress } from '../../shared/types';

export default class ComponentLibraryBookCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .book-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      background: #fff;
    }

    .book-info h2 {
      margin: 0 0 0.25rem;
      font-size: 1.1rem;
    }

    .format {
      margin: 0;
      font-size: 0.8rem;
      color: #4a5568;
      text-transform: uppercase;
    }

    .progress {
      margin: 0.25rem 0 0;
      font-size: 0.85rem;
      color: #2b6cb0;
    }

    .actions {
      display: flex;
      gap: 0.5rem;
    }

    button {
      border: 1px solid #2563eb;
      border-radius: 5px;
      background: #2563eb;
      color: #fff;
      padding: 0.5rem 0.9rem;
      cursor: pointer;
      font-size: 0.9rem;
    }

    button.danger {
      background: #fff;
      border-color: #c53030;
      color: #c53030;
    }
  `;

  @property({ type: Object })
  book?: Book;

  @property({ type: Object })
  progress?: ReadingProgress;

  render() {
    const totalChapters = this.book?.chapterIds.length ?? 0;
    const progressText = this.progress
      ? `Capítulo ${this.progress.chapterIndex + 1} / ${totalChapters}`
      : '';

    return html`
      <article class="book-card">
        <div class="book-info">
          <h2>${this.book?.title ?? ''}</h2>
          <p class="format">${this.book?.format ?? ''}</p>
          ${progressText ? html`<p class="progress">${progressText}</p>` : ''}
        </div>
        <div class="actions">
          <button @click=${this.emitRead}>Leer</button>
          <button class="danger" @click=${this.emitDelete}>Eliminar</button>
        </div>
      </article>
    `;
  }

  private emitRead(): void {
    if (!this.book) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent<{ id: string }>('read-book', {
        detail: { id: this.book.id },
        bubbles: true,
        composed: true,
      })
    );
  }

  private emitDelete(): void {
    if (!this.book) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent<{ id: string }>('delete-book', {
        detail: { id: this.book.id },
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'component-library-book-card': ComponentLibraryBookCard;
  }
}
