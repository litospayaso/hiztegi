import { css, html } from 'lit';
import { state } from 'lit/decorators.js';
import { api } from '../../shared/api.decorator';
import { getAllEntries, removeEntry, upsertEntry } from '../../shared/dictionaryStore';
import { styles } from '../../shared/styles';
import type { DictionaryEntry } from '../../shared/types';
import Page from '../../shared/page';
import '../componentDictionaryEntryRow/index';
import '../componentDictionaryForm/index';

interface PageDictionaryApi {
  getEntries: typeof getAllEntries;
  upsertEntry: typeof upsertEntry;
  deleteEntry: typeof removeEntry;
}

@api({ getEntries: getAllEntries, upsertEntry, deleteEntry: removeEntry })
export default class PageDictionary extends Page<PageDictionaryApi> {
  static styles = [
    ...Page.styles,
    styles.headerStyle,
    styles.buttonStyle,
    css`
      :host {
        padding: 1rem;
      }

      h1 {
        margin-bottom: 0.75rem;
      }

      .toolbar {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        margin-bottom: 1rem;
      }

      .search {
        flex: 1;
        min-width: 0;
        font-family: var(--hzt-font-body);
        font-size: var(--hzt-size-body);
        color: var(--hzt-ink);
        background: var(--hzt-panel);
        border: var(--hzt-border-button) solid var(--hzt-ink);
        border-radius: var(--hzt-corner);
        padding: 0.5rem 0.6rem;
      }

      .search:focus-visible {
        outline: var(--hzt-border-chip) solid var(--hzt-accent);
        outline-offset: 3px;
      }

      .entries {
        display: grid;
        gap: 0.75rem;
      }

      .empty {
        color: var(--hzt-muted);
      }
    `,
  ];

  @state()
  private entries: DictionaryEntry[] = [];

  @state()
  private search = '';

  @state()
  private showForm = false;

  @state()
  private editing?: DictionaryEntry;

  async onPageInit(): Promise<void> {
    await this.loadEntries();
  }

  private async loadEntries(): Promise<void> {
    this.entries = await this.api.getEntries();
  }

  private get filteredEntries(): DictionaryEntry[] {
    const query = this.search.trim().toLocaleLowerCase();
    if (!query) {
      return this.entries;
    }
    return this.entries.filter(
      entry =>
        entry.word.toLocaleLowerCase().includes(query) ||
        (entry.translation ?? '').toLocaleLowerCase().includes(query) ||
        (entry.note ?? '').toLocaleLowerCase().includes(query)
    );
  }

  private onSearchInput(event: Event): void {
    this.search = (event.target as HTMLInputElement).value;
  }

  private onAddClick(): void {
    this.editing = undefined;
    this.showForm = true;
  }

  private onEditEntry(event: Event): void {
    const { word } = (event as CustomEvent<{ word: string }>).detail;
    this.editing = this.entries.find(entry => entry.word === word);
    this.showForm = true;
  }

  private async onDeleteEntry(event: Event): Promise<void> {
    const { word } = (event as CustomEvent<{ word: string }>).detail;
    if (!window.confirm('¿Seguro que quieres eliminar la entrada?')) {
      return;
    }
    await this.api.deleteEntry(word);
    await this.loadEntries();
  }

  private async onSaveEntry(event: Event): Promise<void> {
    const { entry } = (event as CustomEvent<{ entry: DictionaryEntry }>).detail;
    await this.api.upsertEntry(entry);
    this.showForm = false;
    this.editing = undefined;
    await this.loadEntries();
  }

  private onCancelEntry(): void {
    this.showForm = false;
    this.editing = undefined;
  }

  render() {
    const entries = this.filteredEntries;
    return html`
      <div>
        <h1>Diccionario</h1>
        <div class="toolbar">
          <input
            type="search"
            class="search"
            placeholder="Buscar palabra..."
            aria-label="Buscar palabra"
            .value=${this.search}
            @input=${this.onSearchInput}
          />
          <button class="hzt-button hzt-button--primary" @click=${this.onAddClick}>Añadir</button>
        </div>

        <component-dictionary-form
          .open=${this.showForm}
          .entry=${this.editing}
          @save-entry=${this.onSaveEntry}
          @close=${this.onCancelEntry}
        ></component-dictionary-form>

        <div class="entries">
          ${entries.length === 0
            ? html`
                <p class="empty">
                  ${this.entries.length === 0
                    ? 'Aún no hay entradas.'
                    : 'No hay resultados para tu búsqueda.'}
                </p>
              `
            : entries.map(
                entry => html`
                  <component-dictionary-entry-row
                    .entry=${entry}
                    @edit-entry=${this.onEditEntry}
                    @delete-entry=${this.onDeleteEntry}
                  ></component-dictionary-entry-row>
                `
              )}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'page-dictionary': PageDictionary;
  }
}
