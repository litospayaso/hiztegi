import PageApp from './pageApp';
import { accessibilityCheck, createComponent } from '../../shared/test-helper';
import { expect } from '@esm-bundle/chai';

describe('page-app Component Spec:', () => {
  let element: HTMLElement;
  let shadow: ShadowRoot;

  describe('Default page-app Component', () => {
    beforeEach(async () => {
      const component = await createComponent({
        class: PageApp,
        name: 'page-app',
      });

      shadow = component.shadow;
      element = component.element;
    });

    it('should contain shadow root', () => {
      expect(shadow).to.not.be.undefined;
    });

    it('should be accessible', async () => {
      const result = await accessibilityCheck(element);
      expect(result.length).to.be.equal(0);
    });

    it('navigates by setting the location hash', () => {
      (element as unknown as PageApp).navigate('/read/abc123');
      expect(window.location.hash).to.equal('#/read/abc123');
    });

    it('inherits the Page helpers', () => {
      expect((element as unknown as PageApp).getHostname()).to.equal(window.location.hostname);
    });

    afterEach(() => {
      document.body.removeChild(element);
      window.location.hash = '';
    });
  });
});
