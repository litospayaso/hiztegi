import { LitElement, css, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { styles } from '../../shared/styles';

const ITZULI_URL = 'https://www.euskara.euskadi.eus/itzuli/';
const STORAGE_KEY = 'hiztegi-itzuli-panel-open';

export interface ComponentIframePanelInterface {
  open?: boolean;
  word?: string;
}

export default class ComponentIframePanel extends LitElement {
  static styles = [
    styles.hostStyle,
    styles.designTokens,
    styles.themeTokens,
    styles.accentTokens,
    styles.buttonStyle,
    css`
      :host {
        display: block;
        height: 100%;
      }

      .panel {
        display: flex;
        flex-direction: column;
        height: 100%;
        border-left: var(--hzt-border-panel) solid var(--hzt-ink);
        background: var(--hzt-panel);
      }

      .panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 0.75rem;
        border-bottom: var(--hzt-border-panel) solid var(--hzt-ink);
        background: var(--hzt-well);
      }

      .panel-header h3 {
        margin: 0;
        font-size: var(--hzt-size-stamp);
      }

      .search-container {
        display: flex;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        border-bottom: var(--hzt-border-panel) solid var(--hzt-ink);
      }

      .search-input {
        flex: 1;
        padding: 0.35rem 0.5rem;
        border: var(--hzt-border-chip) solid var(--hzt-ink);
        background: var(--hzt-panel);
        font-family: var(--hzt-font-body);
        font-size: var(--hzt-size-body);
      }

      .search-input:focus {
        outline: var(--hzt-border-chip) solid var(--hzt-accent);
      }

      .iframe-container {
        flex: 1;
        overflow: hidden;
      }

      .iframe-container iframe {
        width: 100%;
        height: 100%;
        border: none;
      }
    `,
  ];

  @property({ type: Boolean })
  open = false;

  @property({ type: String })
  word = '';

  @state()
  private searchWord = '';

  @state()
  private iframeSrc = ITZULI_URL;

  connectedCallback(): void {
    super.connectedCallback();
    this.loadState();
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('word') && this.word) {
      this.searchWord = this.word;
      this.updateIframeSrc();
    }
  }

  private loadState(): void {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      this.open = saved === 'true';
    }
  }

  private saveState(): void {
    localStorage.setItem(STORAGE_KEY, String(this.open));
  }

  private togglePanel(): void {
    this.open = !this.open;
    this.saveState();
    this.dispatchEvent(
      new CustomEvent<{ open: boolean }>('toggle', {
        detail: { open: this.open },
        bubbles: true,
        composed: true,
      })
    );
  }

  private onSearchInput(event: Event): void {
    this.searchWord = (event.target as HTMLInputElement).value;
  }

  private onSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.updateIframeSrc();
    }
  }

  private onSearchClick(): void {
    this.updateIframeSrc();
  }

  private updateIframeSrc(): void {
    if (this.searchWord.trim()) {
      this.iframeSrc = `${ITZULI_URL}?q=${encodeURIComponent(this.searchWord.trim())}`;
    }
  }

  render() {
    if (!this.open) {
      return html``;
    }

    return html`
      <div class="panel">
        <header class="panel-header">
          <h3>Itzuli</h3>
          <button
            class="hzt-button hzt-button--text"
            aria-label="Cerrar panel"
            @click=${this.togglePanel}
          >
            ×
          </button>
        </header>
        <div class="search-container">
          <input
            class="search-input"
            type="text"
            placeholder="Bilatu hitza..."
            .value=${this.searchWord}
            @input=${this.onSearchInput}
            @keydown=${this.onSearchKeydown}
          />
          <button class="hzt-button hzt-button--primary" @click=${this.onSearchClick}>
            Bilatu
          </button>
        </div>
        <div class="iframe-container">
          <iframe
            src=${this.iframeSrc}
            title="Itzuli - Euskara hiztegia"
            sandbox="allow-same-origin allow-scripts allow-forms"
          ></iframe>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'component-iframe-panel': ComponentIframePanel;
  }
}
