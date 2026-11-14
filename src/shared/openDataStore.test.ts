import { expect } from '@esm-bundle/chai';
import {
  loadOpenDataIndex,
  lookupOpenData,
  resetOpenDataCache,
} from './openDataStore';

describe('openDataStore Spec:', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    resetOpenDataCache();
  });

  const mockFetch = (
    handler: (url: string) => Response | Promise<Response>
  ): string[] => {
    const requested: string[] = [];
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      const url = String(input);
      requested.push(url);
      return handler(url);
    }) as typeof fetch;
    return requested;
  };

  it('loads, normalizes and deduplicates the compact index', async () => {
    mockFetch(() => new Response(JSON.stringify([' Etxe ', 'etxe', 'MENDI'])));
    const index = await loadOpenDataIndex();

    expect(index.size).to.equal(2);
    expect(index.has('etxe')).to.be.true;
    expect(index.has('mendi')).to.be.true;
  });

  it('caches the index after the first request', async () => {
    const requested = mockFetch(() => new Response(JSON.stringify(['etxe'])));

    await loadOpenDataIndex();
    await loadOpenDataIndex();

    expect(requested.length).to.equal(1);
  });

  it('loads a letter file lazily and groups duplicate source entries', async () => {
    const requested = mockFetch(url => {
      if (url.endsWith('/e.json')) {
        return new Response(
          JSON.stringify([
            'etxe :_: casa :_: noun :_: [General Vocabulary]',
            'etxe :_: hogar :_: noun :_: [General Vocabulary]',
            'etxebizitza :_: vivienda :_: noun :_: [Construction]',
          ])
        );
      }
      return new Response('', { status: 404 });
    });

    const entry = await lookupOpenData('ETXE');

    expect(requested.length).to.equal(1);
    expect(requested[0]).to.include('opendata/eu-esp/e.json');
    expect(entry).to.deep.equal({
      word: 'etxe',
      translations: ['casa', 'hogar'],
      partOfSpeech: 'noun',
      domains: ['General Vocabulary'],
    });
  });

  it('uses otros.json for entries that do not start with a-z', async () => {
    const requested = mockFetch(url => {
      if (url.endsWith('/otros.json')) {
        return new Response(
          JSON.stringify(['1. Mundu Gerra :_: 1ª Guerra Mundial :_: noun :_: [General Vocabulary]'])
        );
      }
      return new Response('', { status: 404 });
    });

    const entry = await lookupOpenData('1. Mundu Gerra');

    expect(requested[0]).to.include('opendata/eu-esp/otros.json');
    expect(entry?.translations).to.deep.equal(['1ª Guerra Mundial']);
  });

  it('caches letter files after the first request', async () => {
    const requested = mockFetch(url => {
      if (url.endsWith('/e.json')) {
        return new Response(JSON.stringify(['etxe :_: casa :_: noun :_: [General Vocabulary]']));
      }
      return new Response('', { status: 404 });
    });

    await lookupOpenData('etxe');
    await lookupOpenData('ETXE');

    expect(requested.length).to.equal(1);
  });

  it('returns undefined when the word is not in the letter file', async () => {
    mockFetch(() => new Response(JSON.stringify(['etxe :_: casa :_: noun :_: [General Vocabulary]'])));
    expect(await lookupOpenData('mendi')).to.be.undefined;
  });

  it('returns an empty index and missing definitions on fetch failures', async () => {
    mockFetch(() => new Response('', { status: 500 }));

    const index = await loadOpenDataIndex();
    const entry = await lookupOpenData('etxe');

    expect(index.size).to.equal(0);
    expect(entry).to.be.undefined;
  });

  it('ignores malformed lines', async () => {
    mockFetch(url => {
      if (url.endsWith('/e.json')) {
        return new Response(JSON.stringify(['solamente una palabra', 'etxe :_: casa :_: noun :_: [General Vocabulary]']));
      }
      return new Response('', { status: 404 });
    });

    const entry = await lookupOpenData('etxe');

    expect(entry?.translations).to.deep.equal(['casa']);
  });
});
