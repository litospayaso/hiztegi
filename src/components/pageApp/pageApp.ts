import { css } from 'lit';
import Page from '../../shared/page';
import { styles } from '../../shared/styles';

/**
 * SPA base page. Overrides `navigate()` to use hash-based routing
 * instead of the full page load of `Page.navigate()`.
 */
export default class PageApp<api = {}> extends Page<api> {
  static styles = [
    styles.hostStyle,
    styles.designTokens,
    styles.themeTokens,
    styles.accentTokens,
    css`
      :host {
        min-height: 100vh;
        background: var(--hzt-paper);
        color: var(--hzt-ink);
      }
    `,
  ];

  navigate(url: string): void {
    window.location.hash = url;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'page-app': PageApp;
  }
}
