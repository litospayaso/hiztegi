import { LitElement, css, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';
import { styles } from '../../shared/styles';
import type { DictionaryEntry } from '../../shared/types';

export interface ComponentDictionaryFormInterface {
  open?: boolean;
  entry?: DictionaryEntry;
}

interface Draft {
  word: string;
  status: 'known' | 'unknown';
  translation: string;
  note: string;
}

export default class ComponentDictionaryForm extends LitElement {
  static styles = [
    styles.hostStyle,
    styles.designTokens,
    styles.themeTokens,
    styles.accentTokens,
    styles.headerStyle,
    styles.cardStyle,
    styles.buttonStyle,
    css`
      :host {
        display: none;
      }

      :host([open]) {
        display: block;
      }

      .backdrop {
        position: fixed;
        inset: 0;
        z-index: 999;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .modal {
        position: relative;
        max-width: 420px;
        width: calc(100% - 2rem);
        max-height: calc(100vh - 2rem);
        overflow-y: auto;
      }

      .entry-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1.25rem;
      }

      .entry-form h2 {
        margin-bottom: 0.25rem;
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        margin: 0;
        padding: 0;
        border: 0;
      }

      .field span,
      .field legend {
        font-size: var(--hzt-size-label);
        font-weight: 900;
        letter-spacing: var(--hzt-tracking-label);
        text-transform: uppercase;
        color: var(--hzt-muted);
      }

      input[type='text'],
      textarea {
        font-family: var(--hzt-font-body);
        font-size: var(--hzt-size-body);
        line-height: var(--hzt-line-body);
        color: var(--hzt-ink);
        background: var(--hzt-panel);
        border: var(--hzt-border-button) solid var(--hzt-ink);
        border-radius: var(--hzt-corner);
        padding: 0.5rem 0.6rem;
      }

      textarea {
        resize: vertical;
        min-height: 4.5rem;
      }

      input[type='text']:focus-visible,
      textarea:focus-visible {
        outline: var(--hzt-border-chip) solid var(--hzt-accent);
        outline-offset: 3px;
      }

      input[type='text'][aria-invalid='true'] {
        border-color: var(--hzt-error);
      }

      .status-options {
        display: flex;
        gap: 1rem;
      }

      .status-options label {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        font-size: var(--hzt-size-body);
      }

      input[type='radio'] {
        accent-color: var(--hzt-accent);
      }

      .error {
        margin: 0;
        font-size: var(--hzt-size-label);
        font-weight: 700;
        color: var(--hzt-error);
      }

      .actions {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Object })
  entry?: DictionaryEntry;

  @state()
  private draft: Draft = { word: '', status: 'unknown', translation: '', note: '' };

  @state()
  private showError = false;

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('keydown', this.onKeyDown);
  }

  disconnectedCallback(): void {
    document.removeEventListener('keydown', this.onKeyDown);
    super.disconnectedCallback();
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has('entry')) {
      this.draft = this.entry
        ? {
            word: this.entry.word,
            status: this.entry.status,
            translation: this.entry.translation ?? '',
            note: this.entry.note ?? '',
          }
        : { word: '', status: 'unknown', translation: '', note: '' };
      this.showError = false;
    }
  }

  render() {
    if (!this.open) {
      return html``;
    }
    return html`
      <div class="backdrop" @click=${this.onBackdropClick}>
        <div
          class="modal hzt-card"
          role="dialog"
          aria-label="${this.entry ? 'Editar entrada' : 'Nueva entrada'}"
          @click=${(e: Event) => e.stopPropagation()}
        >
          <form class="entry-form" @submit=${this.handleSubmit}>
            <h2>${this.entry ? 'Editar entrada' : 'Nueva entrada'}</h2>

            <label class="field">
              <span>Palabra</span>
              <input
                type="text"
                name="word"
                .value=${this.draft.word}
                aria-invalid=${this.showError}
                @input=${this.handleWordInput}
              />
            </label>

            <fieldset class="field">
              <legend>Estado</legend>
              <div class="status-options">
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="known"
                    .checked=${this.draft.status === 'known'}
                    @change=${this.selectKnown}
                  />
                  Conocida
                </label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="unknown"
                    .checked=${this.draft.status === 'unknown'}
                    @change=${this.selectUnknown}
                  />
                  Nueva
                </label>
              </div>
            </fieldset>

            <label class="field">
              <span>Traducción</span>
              <input
                type="text"
                name="translation"
                .value=${this.draft.translation}
                @input=${this.handleTranslationInput}
              />
            </label>

            <label class="field">
              <span>Nota</span>
              <textarea
                name="note"
                .value=${this.draft.note}
                @input=${this.handleNoteInput}
              ></textarea>
            </label>

            ${this.showError ? html`<p class="error" role="alert">La palabra es obligatoria</p>` : ''}

            <div class="actions">
              <button type="button" class="hzt-button hzt-button--outline" @click=${this.emitClose}>
                Cancelar
              </button>
              <button type="submit" class="hzt-button hzt-button--primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  private onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.open) {
      this.emitClose();
    }
  };

  private onBackdropClick(): void {
    this.emitClose();
  }

  private handleWordInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.draft = { ...this.draft, word: value };
    if (this.showError) {
      this.showError = false;
    }
  }

  private handleTranslationInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.draft = { ...this.draft, translation: value };
  }

  private handleNoteInput(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.draft = { ...this.draft, note: value };
  }

  private selectKnown(): void {
    this.draft = { ...this.draft, status: 'known' };
  }

  private selectUnknown(): void {
    this.draft = { ...this.draft, status: 'unknown' };
  }

  private handleSubmit(event: Event): void {
    event.preventDefault();
    const word = this.draft.word.trim();
    if (!word) {
      this.showError = true;
      return;
    }
    const translation = this.draft.translation.trim();
    const note = this.draft.note.trim();
    const entry: DictionaryEntry = {
      word,
      status: this.draft.status,
      ...(translation ? { translation } : {}),
      ...(note ? { note } : {}),
    };
    this.dispatchEvent(
      new CustomEvent<{ entry: DictionaryEntry }>('save-entry', {
        detail: { entry },
        bubbles: true,
        composed: true,
      })
    );
  }

  private emitClose(): void {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'component-dictionary-form': ComponentDictionaryForm;
  }
}
