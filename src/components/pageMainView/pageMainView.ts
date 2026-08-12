import { css, html } from 'lit';
import { state } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';
import { api } from '../../shared/api.decorator';
import PageApp from '../pageApp/pageApp';
import '../componentNavBar/index';
import '../pageLibrary/index';
import '../pageReading/index';
import '../pageDictionary/index';

export type PageMainViewRouteName = 'library' | 'reading' | 'dictionary';

export interface PageMainViewRoute {
  name: PageMainViewRouteName;
  bookId?: string;
  path: string;
}

interface PageMainViewApi {
  getApi: (route: PageMainViewRoute) => Record<string, unknown>;
}

@api({
  getApi: (): Record<string, unknown> => ({}),
})
export default class PageMainView extends PageApp<PageMainViewApi> {
  static styles = [
    ...PageApp.styles,
    css`
      :host {
        display: block;
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

  @state()
  private route?: PageMainViewRoute;

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('hashchange', this.onHashChange);
  }

  disconnectedCallback(): void {
    window.removeEventListener('hashchange', this.onHashChange);
    super.disconnectedCallback();
  }

  async onPageInit(): Promise<void> {
    this.route = this.parseRoute(window.location.hash);
  }

  private onHashChange = (): void => {
    this.route = this.parseRoute(window.location.hash);
  };

  private parseRoute(hash: string): PageMainViewRoute {
    const path = hash.replace(/^#/, '').replace(/\/+$/, '') || '/';
    if (path === '/library') {
      return { name: 'library', path: '/library' };
    }
    if (path === '/dictionary') {
      return { name: 'dictionary', path: '/dictionary' };
    }
    const match = /^\/read\/([^/?#]+)/.exec(path);
    if (match) {
      return { name: 'reading', bookId: decodeURIComponent(match[1]), path };
    }
    return { name: 'library', path: '/' };
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('route') && this.route) {
      this.mountPage();
    }
  }

  private mountPage(): void {
    const container = this.renderRoot.querySelector<HTMLElement>('#page-container');
    const route = this.route;
    if (!container || !route) {
      return;
    }
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    let element: HTMLElement;
    switch (route.name) {
      case 'reading':
        element = document.createElement('page-reading');
        (element as unknown as { bookId: string }).bookId = route.bookId ?? '';
        break;
      case 'dictionary':
        element = document.createElement('page-dictionary');
        break;
      case 'library':
      default:
        element = document.createElement('page-library');
        break;
    }
    (element as unknown as { api?: Record<string, unknown> }).api = {
      ...(element as unknown as { api?: Record<string, unknown> }).api,
      ...this.api.getApi(route),
    };
    container.append(element);
  }

  render() {
    return html`
      <div class="nav-wrap">
        <component-nav-bar active=${this.route?.path ?? ''}></component-nav-bar>
      </div>
      <div id="page-container"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'page-main-view': PageMainView;
  }
}
