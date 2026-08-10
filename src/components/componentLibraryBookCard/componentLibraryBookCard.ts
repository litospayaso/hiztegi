import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { styles } from '../../shared/styles';
import type { Book, ReadingProgress } from '../../shared/types';

export default class ComponentLibraryBookCard extends LitElement {
  static styles = [
    styles.hostStyle,
    styles.designTokens,
    styles.themeTokens,
    styles.accentTokens,
    styles.headerStyle,
    styles.cardStyle,
    styles.buttonStyle,
    css`
      .book-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
      }

      .book-info {
        min-width: 0;
      }

      .book-info h2 {
        margin-bottom: 0.25rem;
      }

      .format {
        margin: 0;
        font-size: var(--hzt-size-stamp);
        color: var(--hzt-muted);
        letter-spacing: var(--hzt-tracking-stamp);
        text-transform: uppercase;
      }

      .progress {
        margin: 0.25rem 0 0;
        font-size: var(--hzt-size-body);
        color: var(--hzt-accent);
      }

      .actions {
        display: flex;
        gap: 0.5rem;
        flex-shrink: 0;
      }
    `,
  ];

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
      <article class="book-card hzt-card">
        <div class="book-info">
          <h2>${this.book?.title ?? ''}</h2>
          <p class="format">${this.book?.format ?? ''}</p>
          ${progressText ? html`<p class="progress">${progressText}</p>` : ''}
        </div>
        <div class="actions">
          <button class="hzt-button hzt-button--primary" @click=${this.emitRead}>Leer</button>
          <button class="hzt-button hzt-button--destructive" @click=${this.emitDelete}>Eliminar</button>
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
