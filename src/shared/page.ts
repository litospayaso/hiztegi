/* eslint-disable @typescript-eslint/unbound-method */
import { type CSSResultGroup, css, LitElement } from 'lit';
import { styles } from './styles';

/**
 * Base class for every page in the app.
 *
 * Navigation contract (IMPORTANT):
 * - Pages extend this class and get the shared navigation helpers below.
 * - Only the app entry (`pageHiztegiApp`) is allowed to write the URL: it
 *   calls `navigateToPage(queryParams)`, which sets the query params
 *   (`?page=library&bookId=...`) via `history.replaceState`.
 * - Any other page/component must NOT touch `window.location`. To move to
 *   another page it calls `triggerPageNavigation(queryParams)`, which bubbles
 *   a `page-navigation` event up to `pageHiztegiApp`.
 * - `navigate()` performs a full page load and is only meant for external
 *   links; it must never be used for internal navigation.
 * - Tests mock every URL-changing helper (via `createComponent`'s `mock`
 *   option) so no real navigation happens in tests — that is why they are all
 *   centralized here.
 */
export default class Page<api = {}> extends LitElement {
  /**
   * It will be overrided with api decorator.
   */
  api!: api;

  constructor() {
    super();
  }

  static styles = [
    styles.hostStyle,
    styles.designTokens,
    styles.themeTokens,
    styles.accentTokens,
    css`
      :host {
        display: block;
        min-height: 100vh;
        background: var(--hzt-paper);
        color: var(--hzt-ink);
      }
    `,
  ] as CSSResultGroup[];

  /**
   * Full page load to another url (external links only, never internal nav).
   * If the string starts with / will concat string to the current url.
   * If it starts with http the whole location will be replaced.
   * Other case it will use the same origin to concat the url.
   * @param {string} url location to navigate
   */
  navigate(url: string): void {
    if (url.startsWith('/')) {
      window.location.href = window.location.href.concat(url);
    } else if (url.startsWith('http')) {
      window.location.href = url;
    } else {
      window.location.href = `${window.location.origin}/${url}`;
    }
  }

  /**
   * Request a navigation to another page. Dispatches a `page-navigation`
   * CustomEvent with the given query params; the app entry
   * (`pageHiztegiApp`) listens for it and updates the URL.
   * @param queryParams object with key value pairs
   */
  triggerPageNavigation(queryParams: { [key: string]: string }) {
    this.dispatchEvent(new CustomEvent('page-navigation', {
      detail: { ...queryParams },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Navigate to another page replacing the current query params.
   * ONLY the app entry (`pageHiztegiApp`) is allowed to call this.
   * @param queryParams object with key value pairs
   */
  navigateToPage(queryParams: { [key: string]: string }) {
    const url = new URL(window.location.href);
    url.search = '';
    Object.entries(queryParams).forEach(([key, value]) => url.searchParams.set(key, value));
    window.history.replaceState({}, '', url.toString());
  }

  /**
   * Function to open a url in a new tab.
   * @param {string} url to open in a new tab
   */
  openNewTab(url: string): void {
    window.open(url, '_blank');
  }

  /**
   * Function to get current url where the webcomponent is located
   * @returns window.location.href
   */
  getHref(): string {
    return window.location.href;
  }

  /**
   * Function to get the current query params as a plain object
   * (e.g. `?page=reading&bookId=b1` -> `{ page: 'reading', bookId: 'b1' }`).
   * Prefer `getQueryParamsURL()` when you need a typed `URLSearchParams`.
   * @returns query params of the current url
   */
  getHash(): Record<string, string> {
    const search = location.search.substring(1);
    if (search && search.length > 0)
      return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
    return {};
  }

  /**
   * Function to get hostname of current url
   * @returns window.location.hostname
   */
  getHostname(): string {
    return window.location.hostname;
  }

  /**
   * Function to get queryparams from current url
   * @returns url.searchParams: URLSearchParams
   */
  getQueryParamsURL(): URLSearchParams {
    const url: URL = new URL(this.getHref());
    return url.searchParams;
  }

  connectedCallback() {
    super.connectedCallback();
    this.onPageInit();
  }

  /**
   * It will be called after the Page component is loaded.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onPageInit(): void {}
}
