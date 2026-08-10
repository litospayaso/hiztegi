import Page from '../../shared/page';

/**
 * SPA base page. Overrides `navigate()` to use hash-based routing
 * instead of the full page load of `Page.navigate()`.
 */
export default class PageApp<api = {}> extends Page<api> {
  navigate(url: string): void {
    window.location.hash = url;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'page-app': PageApp;
  }
}
