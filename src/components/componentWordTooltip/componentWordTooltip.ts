import { LitElement, css, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';
import { styles } from '../../shared/styles';
import type { DictionaryEntry, WordStatus } from '../../shared/types';

export interface ComponentWordTooltipInterface {
  word?: string;
  entry?: DictionaryEntry;
  x?: number;
  y?: number;
}

const EDGE_MARGIN = 8;
const BELOW_OFFSET = 8;

export default class ComponentWordTooltip extends LitElement {
  static styles = [
    styles.hostStyle,
    styles.designTokens,
    styles.themeTokens,
    styles.accentTokens,
    styles.headerStyle,
    styles.buttonStyle,
    css`
      .tooltip {
        position: fixed;
        z-index: 1000;
        min-width: 220px;
        max-width: 320px;
        padding: 1rem 1.25rem;
        background: var(--hzt-panel);
        border: var(--hzt-border-panel) solid var(--hzt-ink);
        border-radius: var(--hzt-corner);
        box-shadow: var(--hzt-shadow-modal);
      }

      .tooltip:focus-visible {
        outline: var(--hzt-border-chip) solid var(--hzt-accent);
        outline-offset: 3px;
      }

      .tooltip-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        margin-bottom: 0.5rem;
      }

      .tooltip-header h3 {
        margin: 0;
      }

      .close-button {
        padding: 0.15rem 0.5rem;
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

      .no-entry,
      .translation,
      .note {
        margin: 0.5rem 0 0;
      }

      .translation {
        font-weight: 700;
      }

      .note {
        color: var(--hzt-muted);
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.75rem;
      }

      .actions .hzt-button {
        padding: 0.4rem 0.85rem;
      }
    `,
  ];

  @property({ type: String })
  word?: string;

  @property({ type: Object })
  entry?: DictionaryEntry;

  @property({ type: Number })
  x?: number;

  @property({ type: Number })
  y?: number;

  @state()
  private position = { left: 0, top: 0 };

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('click', this.onDocumentClick, true);
    document.addEventListener('keydown', this.onKeyDown, true);
  }

  disconnectedCallback(): void {
    document.removeEventListener('click', this.onDocumentClick, true);
    document.removeEventListener('keydown', this.onKeyDown, true);
    super.disconnectedCallback();
  }

  firstUpdated(): void {
    (this.renderRoot.querySelector('.tooltip') as HTMLElement | null)?.focus({ preventScroll: true });
    this.clampPosition();
  }

  protected updated(changed: PropertyValues): void {
    if (
      changed.has('x') ||
      changed.has('y') ||
      changed.has('word') ||
      changed.has('entry')
    ) {
      this.clampPosition();
    }
  }

  private clampPosition(): void {
    const tooltip = this.renderRoot.querySelector('.tooltip') as HTMLElement | null;
    if (!tooltip) {
      return;
    }
    const width = tooltip.offsetWidth;
    const height = tooltip.offsetHeight;
    const left = Math.max(
      EDGE_MARGIN,
      Math.min(this.x ?? 0, window.innerWidth - width - EDGE_MARGIN)
    );
    const top = Math.max(
      EDGE_MARGIN,
      Math.min((this.y ?? 0) + BELOW_OFFSET, window.innerHeight - height - EDGE_MARGIN)
    );
    if (left !== this.position.left || top !== this.position.top) {
      this.position = { left, top };
    }
  }

  private onDocumentClick = (event: Event): void => {
    if (!event.composedPath().includes(this)) {
      this.emitClose();
    }
  };

  private onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      this.emitClose();
    }
  };

  private emitSave(status: WordStatus): void {
    const word = this.normalizeWord();
    if (!word) {
      return;
    }
    const entry: DictionaryEntry = {
      word,
      status: status === 'known' ? 'known' : 'unknown',
      ...(this.entry?.translation ? { translation: this.entry.translation } : {}),
      ...(this.entry?.note ? { note: this.entry.note } : {}),
    };
    this.dispatchEvent(
      new CustomEvent<{ entry: DictionaryEntry }>('save-entry', {
        detail: { entry },
        bubbles: true,
        composed: true,
      })
    );
  }

  private emitAdd(): void {
    const word = this.normalizeWord();
    if (!word) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent<{ word: string }>('open-add-modal', {
        detail: { word },
        bubbles: true,
        composed: true,
      })
    );
  }

  private emitClose(): void {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private normalizeWord(): string {
    return (this.word ?? '').trim().toLocaleLowerCase();
  }

  render() {
    const status = this.entry?.status ?? 'unknown';
    const statusText = status === 'known' ? 'Conocida' : 'Nueva';

    return html`
      <div
        class="tooltip"
        role="dialog"
        aria-label="Detalle de la palabra ${this.word ?? ''}"
        tabindex="-1"
        style="left: ${this.position.left}px; top: ${this.position.top}px;"
      >
        <header class="tooltip-header">
          <h3>${this.word ?? ''}</h3>
          <button
            class="hzt-button hzt-button--text close-button"
            aria-label="Cerrar"
            @click=${this.emitClose}
          >
            ×
          </button>
        </header>

        ${this.entry
          ? html`<span class="badge badge--${status}">${statusText}</span>`
          : html`<p class="no-entry">Esta palabra no está en el diccionario.</p>`}
        ${this.entry?.translation ? html`<p class="translation">${this.entry.translation}</p>` : ''}
        ${this.entry?.note ? html`<p class="note">${this.entry.note}</p>` : ''}

        <div class="actions">
          ${this.entry
            ? html`
                <button
                  class="hzt-button hzt-button--${status === 'known' ? 'primary' : 'outline'}"
                  @click=${() => this.emitSave('known')}
                >
                  Marcar conocida
                </button>
                <button
                  class="hzt-button hzt-button--${status === 'unknown' ? 'primary' : 'outline'}"
                  @click=${() => this.emitSave('unknown')}
                >
                  Marcar nueva
                </button>
              `
            : html`
                <button class="hzt-button hzt-button--primary" @click=${this.emitAdd}>
                  Añadir al diccionario
                </button>
              `}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'component-word-tooltip': ComponentWordTooltip;
  }
}
