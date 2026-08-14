import { css, html } from 'lit';
import type { TemplateResult } from 'lit';
import { api } from '../../shared/api.decorator';
import Page from '../../shared/page';
import { state } from 'lit/decorators.js';

export type PageMainViewRouteName = 'library' | 'reading' | 'dictionary';

export interface PageMainViewRoute {
  name: PageMainViewRouteName;
  bookId?: string;
  path: string;
}

interface PageMainViewApi {
  getApi: (route: PageMainViewRoute) => Record<string, unknown>;
}

const DEFAULT_PAGE: PageMainViewRouteName = 'library';

@api({
  getApi: (): Record<string, unknown> => ({}),
})
export default class PageHiztegiApp extends Page<PageMainViewApi> {
  static styles = [
    ...Page.styles,
    css`
      :host {
        min-height: 100vh;
        background: var(--hzt-paper);
      }

      .nav-wrap {
        position: sticky;
        top: 0;
        z-index: 10;
      }
    `,
  ];

  @state() private currentRoute: PageMainViewRouteName = DEFAULT_PAGE;

  @state() private bookId = '';

  private get pageParam(): PageMainViewRouteName {
    const page = this.getQueryParamsURL().get('page') as PageMainViewRouteName | null;
    return page === 'reading' || page === 'dictionary' ? page : DEFAULT_PAGE;
  }

  private get routeBookId(): string {
    return this.getQueryParamsURL().get('bookId') ?? '';
  }

  onPageInit(): void {
    this.currentRoute = this.pageParam;
    this.bookId = this.routeBookId;
  }

  private onPageNavigation({ detail }: CustomEvent<{ [key: string]: string }>): void {
    const page = detail.page as PageMainViewRouteName;
    this.currentRoute = page === 'reading' || page === 'dictionary' ? page : DEFAULT_PAGE;
    this.bookId = detail.bookId ?? '';
    this.navigateToPage(detail);
  }

  private _renderPageContent(): TemplateResult<1> {
    const page = this.currentRoute;
    switch (page) {
      case 'reading':
        return html`
          <page-reading
            .bookId=${this.bookId}
            @page-navigation="${this.onPageNavigation}"
            class="page-container"
          ></page-reading>`;
      case 'dictionary':
        return html`
          <page-dictionary
            @page-navigation="${this.onPageNavigation}"
            class="page-container"
          ></page-dictionary>`;
      case 'library':
      default:
        return html`
          <page-library
            @page-navigation="${this.onPageNavigation}"
            class="page-container"
          ></page-library>`;
    }
  }

  render() {
    return html`
      <div class="nav-wrap">
        <component-nav-bar
          active="${this.currentRoute}"
          @nav-bar-navigation="${this.onPageNavigation}"
        ></component-nav-bar>
      </div>
      <div id="page-container">
        ${this._renderPageContent()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'page-hiztegi-app': PageHiztegiApp;
  }
}
