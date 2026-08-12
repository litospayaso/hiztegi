import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { styles } from '../../shared/styles';
import type { DictionaryEntry } from '../../shared/types';

export interface ComponentDictionaryEntryRowInterface {
  entry?: DictionaryEntry;
}

export default class ComponentDictionaryEntryRow extends LitElement {
  static styles = [
    styles.hostStyle,
    styles.designTokens,
    styles.themeTokens,
    styles.accentTokens,
    styles.headerStyle,
    styles.cardStyle,
    styles.buttonStyle,
    css`
      .entry-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
      }

      .entry-info {
        min-width: 0;
      }

      .entry-info h2 {
        margin-bottom: 0.25rem;
      }

      .badge {
        display: inline-block;
        padding: 0.1rem 0.5rem;
        border: var(--hzt-border-chip) solid var(--hzt-ink);
        font-size: var(--hzt-size-label);
        font-weight: 900;
        letter-spacing: var(--hzt-tracking-stamp);
        text-transform: uppercase;
      }

      .badge--known {
        background: var(--hzt-ink);
        color: var(--hzt-panel);
      }

      .badge--unknown {
        background: var(--hzt-well);
        color: var(--hzt-ink);
      }

      .note {
        margin: 0.25rem 0 0;
        color: var(--hzt-muted);
      }

      .actions {
        display: flex;
        gap: 0.5rem;
        flex-shrink: 0;
      }
    `,
  ];

  @property({ type: Object })
  entry?: DictionaryEntry;

  render() {
    const status = this.entry?.status ?? 'unknown';
    const statusText = status === 'known' ? 'Conocida' : 'Nueva';

    return html`
      <article class="entry-row hzt-card">
        <div class="entry-info">
          <h2>${this.entry?.word ?? ''}</h2>
          <span class="badge badge--${status}">${statusText}</span>
          ${this.entry?.note ? html`<p class="note">${this.entry.note}</p>` : ''}
        </div>
        <div class="actions">
          <button class="hzt-button hzt-button--outline" @click=${this.emitEdit}>Editar</button>
          <button class="hzt-button hzt-button--destructive" @click=${this.emitDelete}>Eliminar</button>
        </div>
      </article>
    `;
  }

  private emitEdit(): void {
    if (!this.entry) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent<{ word: string }>('edit-entry', {
        detail: { word: this.entry.word },
        bubbles: true,
        composed: true,
      })
    );
  }

  private emitDelete(): void {
    if (!this.entry) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent<{ word: string }>('delete-entry', {
        detail: { word: this.entry.word },
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'component-dictionary-entry-row': ComponentDictionaryEntryRow;
  }
}
