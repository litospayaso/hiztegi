import { LitElement, css, html } from 'lit';
import { state } from 'lit/decorators.js';

export default class ComponentImportFile extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .drop-zone {
      border: 2px dashed #8f9bb3;
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
      color: #4a5568;
      cursor: pointer;
      transition: background-color 0.15s ease, border-color 0.15s ease;
    }

    .drop-zone:hover,
    .drop-zone.active {
      border-color: #2f80ed;
      background-color: #eaf2ff;
    }

    .drop-zone:focus-visible {
      outline: 3px solid #2f80ed;
      outline-offset: 2px;
    }
  `;

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
        aria-label="Añadir archivos txt"
        @click=${this.openPicker}
        @keydown=${this.onKeyDown}
        @dragover=${this.onDragOver}
        @dragleave=${this.onDragLeave}
        @drop=${this.onDrop}
      >
        <slot>Arrastra los archivos txt aquí o haz clic para seleccionarlos</slot>
      </div>
      <input type="file" accept=".txt,text/plain" multiple hidden @change=${this.onInputChange} />
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
