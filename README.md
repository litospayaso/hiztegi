# Web components storybook in lit-html

Project to create stand-alone web components with typescript.

Uses:

* [typescript](https://www.typescriptlang.org/)
* [esbuild](https://esbuild.github.io/)
* [vite](https://vite.dev/)
* [webcomponents polyfills](https://github.com/webcomponents/polyfills)
* [lit-html](https://lit-html.polymer-project.org/)
* [storybook](https://storybook.js.org/)

## Getting started

you can run the storybook in your localhost executing

``` bash
npm start
```

## Build the components

``` bash
npm run build
```

You can find your builds in the "dist" folder.

Your components will be compiled in a js file (as [ES module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)), to use them as modules in your application, and in a dist.js (as [iife](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)), to use them directly in browsers, with the same name you give to the folder in "[src/components](src/components)".

All modules include their respective [Typescript declaration files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html).

The [webcomponents polyfills](https://github.com/webcomponents/polyfills) are included as well in the "dist" folder, you can use them or load directly the code from a CDN such as unpkg: <https://unpkg.com/@webcomponents/webcomponentsjs@^2/>

## Publish component to NPM

A **README.md** and a **"package.json"** are created as well in every component folder, so you can upload them separately to the NPM registry. You can change the content in the "package.json" file inside the example components.

## Publish storybook

you can run build and publish the documentation of your components as storybook site with

``` bash
npm run build-storybook
```
