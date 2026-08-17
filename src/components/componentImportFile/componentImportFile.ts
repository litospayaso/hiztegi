import { LitElement, css, html } from 'lit';
import { state } from 'lit/decorators.js';
import { styles } from '../../shared/styles';

export default class ComponentImportFile extends LitElement {
  static styles = [
    styles.hostStyle,
    styles.designTokens,
    styles.themeTokens,
    styles.accentTokens,
    css`
      .drop-zone {
        border: 2px dashed var(--hzt-ink);
        border-radius: var(--hzt-corner);
        padding: 2rem;
        text-align: center;
        background: var(--hzt-panel);
        color: var(--hzt-ink);
        cursor: pointer;
        transition:
          background-color var(--hzt-motion-card) var(--hzt-ease),
          border-color var(--hzt-motion-card) var(--hzt-ease);
      }

      .drop-zone:hover,
      .drop-zone.active {
        border-color: var(--hzt-accent);
        background-color: var(--hzt-well);
      }

      .drop-zone:focus-visible {
        outline: var(--hzt-border-chip) solid var(--hzt-accent);
        outline-offset: 2px;
      }
    `,
  ];

  @state()
  private active = false;

  private input?: HTMLInputElement;

  firstUpdated(): void {
    this.input = this.shadowRoot?.querySelector<HTMLInputElement>('input[type="file"]') ?? undefined;
  }

  render() {
    return html`
      <div
        class="${this.active ? 'drop-zone active' : 'drop-zone'}"
        role="button"
        tabindex="0"
        aria-label="Añadir archivos txt, markdown o html"
        @click=${this.openPicker}
        @keydown=${this.onKeyDown}
        @dragover=${this.onDragOver}
        @dragleave=${this.onDragLeave}
        @drop=${this.onDrop}
      >
        <slot>Arrastra los archivos txt, markdown o html aquí o haz clic para seleccionarlos</slot>
      </div>
      <input
        type="file"
        accept=".txt,.md,.markdown,.html,.htm,text/plain,text/markdown,text/html"
        multiple
        hidden
        @change=${this.onInputChange}
      />
    `;
  }

  public selectFiles(files: File[]): void {
    if (files.length === 0) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent<{ files: File[] }>('files-selected', {
        detail: { files },
        bubbles: true,
        composed: true,
      })
    );
  }

  private openPicker(): void {
    this.input?.click();
  }

  private onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.openPicker();
    }
  }

  private onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
    this.active = true;
  }

  private onDragLeave(): void {
    this.active = false;
  }

  private onDrop(event: DragEvent): void {
    event.preventDefault();
    this.active = false;
    this.selectFiles(Array.from(event.dataTransfer?.files ?? []));
  }

  private onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectFiles(Array.from(input.files ?? []));
    input.value = '';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'component-import-file': ComponentImportFile;
  }
}
