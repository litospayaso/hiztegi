import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';
import { tokenize } from '../../shared/tokenizer';
import type { Token } from '../../shared/tokenizer';
import { detectSuffixes } from '../../shared/declensions';
import { styles } from '../../shared/styles';
import type { DictionaryEntry, WordStatus } from '../../shared/types';

export interface ComponentTextReaderInterface {
  text?: string;
  dictionary?: DictionaryEntry[];
  opendataIndex?: ReadonlySet<string>;
  pageSize?: number;
  pageIndex?: number;
}

interface WordResolution {
  status: WordStatus;
  baseForm?: string;
  suffix?: string;
  cases?: string[];
}

export default class ComponentTextReader extends LitElement {
  static styles = [
    styles.hostStyle,
    styles.designTokens,
    styles.themeTokens,
    styles.accentTokens,
    styles.buttonStyle,
    css`
      .reader-text {
        margin: 0 0 1rem;
        font-family: var(--hzt-font-body);
        font-size: var(--hzt-size-title);
        line-height: 1.8;
        white-space: pre-wrap;
        overflow-wrap: break-word;
      }

      .word {
        cursor: pointer;
      }

      .word--known {
        font-weight: 700;
      }

      .word--unknown {
        background: var(--hzt-mark);
        color: var(--hzt-on-mark);
        box-shadow: 2px 2px 0 var(--hzt-shadow);
      }

      .word--opendata {
        background: var(--hzt-opendata);
        color: var(--hzt-on-opendata);
        box-shadow: 2px 2px 0 var(--hzt-shadow);
      }

      .controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
      }

      .page-info {
        font-family: var(--hzt-font-display);
        font-size: var(--hzt-size-stamp);
        letter-spacing: var(--hzt-tracking-stamp);
        text-transform: uppercase;
        color: var(--hzt-muted);
      }
    `,
  ];

  @property({ type: String })
  text = '';

  @property({ type: Array })
  dictionary: DictionaryEntry[] = [];

  @property({ type: Object })
  opendataIndex: ReadonlySet<string> = new Set();

  @property({ type: Number })
  pageSize = 100;

  @property({ type: Number })
  pageIndex = 0;

  willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('text') && !changed.has('pageIndex')) {
      this.pageIndex = 0;
    }
  }

  private get pages(): Token[][] {
    const tokens = tokenize(this.text);
    const size = Math.max(1, Math.floor(this.pageSize));
    const pages: Token[][] = [];
    let page: Token[] = [];
    let wordCount = 0;
    for (const token of tokens) {
      page.push(token);
      if (token.type === 'word') {
        wordCount += 1;
        if (wordCount >= size) {
          pages.push(page);
          page = [];
          wordCount = 0;
        }
      }
    }
    if (page.length > 0) {
      pages.push(page);
    }
    return pages.length > 0 ? pages : [[]];
  }

  private get directMap(): Map<string, WordStatus> {
    return new Map(this.dictionary.map(entry => [entry.word.toLocaleLowerCase(), entry.status]));
  }

  private resolveWord(word: string, directMap = this.directMap): WordResolution {
    const lower = word.toLocaleLowerCase();
    const personal = directMap.get(lower);
    if (personal) {
      return { status: personal };
    }

    const matches = detectSuffixes(lower);
    for (const match of matches) {
      const status = directMap.get(match.baseForm);
      if (status) {
        return {
          status,
          baseForm: match.baseForm,
          suffix: match.suffix,
          cases: match.cases.map(c => c.caseName),
        };
      }
    }

    if (this.opendataIndex.has(lower)) {
      return { status: 'opendata' };
    }
    for (const match of matches) {
      if (this.opendataIndex.has(match.baseForm)) {
        return {
          status: 'opendata',
          baseForm: match.baseForm,
          suffix: match.suffix,
          cases: match.cases.map(c => c.caseName),
        };
      }
    }

    return { status: 'none' };
  }

  private onPrevious(): void {
    if (this.pageIndex > 0) {
      this.pageIndex -= 1;
      this.emitPageChange();
    }
  }

  private onNext(): void {
    if (this.pageIndex < this.pages.length - 1) {
      this.pageIndex += 1;
      this.emitPageChange();
    }
  }

  private emitPageChange(): void {
    this.dispatchEvent(
      new CustomEvent<{ pageIndex: number; pageCount: number }>('page-change', {
        detail: { pageIndex: this.pageIndex, pageCount: this.pages.length },
        bubbles: true,
        composed: true,
      })
    );
  }

  private onWordClick(word: string, event: MouseEvent): void {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const { baseForm, suffix, cases } = this.resolveWord(word);
    this.dispatchEvent(
      new CustomEvent<{ word: string; x: number; y: number; baseForm?: string; suffix?: string; cases?: string[] }>('word-click', {
        detail: {
          word,
          x: rect.left + rect.width / 2,
          y: rect.bottom,
          ...(baseForm ? { baseForm, suffix, cases } : {}),
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const pages = this.pages;
    const pageCount = pages.length;
    const currentIndex = Math.min(this.pageIndex, pageCount - 1);
    const current = pages[currentIndex] ?? [];
    const directMap = this.directMap;

    return html`
      <div class="reader">
        <p class="reader-text">${current.map(token => {
          if (token.type !== 'word') {
            return token.text;
          }
          const status = this.resolveWord(token.text, directMap).status;
          const className = status === 'none' ? 'word' : `word word--${status}`;
          return html`<span class=${className} @click=${(event: MouseEvent) => this.onWordClick(token.text, event)}>${token.text}</span>`;
        })}</p>
        <div class="controls">
          <button class="hzt-button" ?disabled=${currentIndex === 0} @click=${this.onPrevious}>Anterior</button>
          <span class="page-info">Página ${currentIndex + 1} de ${pageCount}</span>
          <button class="hzt-button hzt-button--primary" ?disabled=${currentIndex === pageCount - 1} @click=${this.onNext}>
            Siguiente
          </button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'component-text-reader': ComponentTextReader;
  }
}
