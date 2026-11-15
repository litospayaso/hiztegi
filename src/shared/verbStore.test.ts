import { expect } from '@esm-bundle/chai';
import { loadVerbIndex, lookupVerb, resetVerbCache } from './verbStore';

const analysis = {
  lemma: 'edun',
  kind: 'auxiliary',
  paradigm: 'nor-nork',
  tense: 'orain',
  mode: 'ahala',
  persons: { nor: 'hura', nork: 'nik' },
  meaning: 'tener/haber',
  source: { page: 47, table: 'A-1' },
};

describe('verbStore Spec:', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    resetVerbCache();
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
    mockFetch(() => new Response(JSON.stringify([' Dut ', 'dut', 'NAIZ'])));
    const index = await loadVerbIndex();

    expect(index.size).to.equal(2);
    expect(index.has('dut')).to.be.true;
    expect(index.has('naiz')).to.be.true;
  });

  it('caches the index after the first request', async () => {
    const requested = mockFetch(() => new Response(JSON.stringify(['dut'])));

    await loadVerbIndex();
    await loadVerbIndex();

    expect(requested.length).to.equal(1);
  });

  it('loads a letter file lazily and normalizes the entry', async () => {
    const requested = mockFetch(url => {
      if (url.endsWith('/d.json')) {
        return new Response(JSON.stringify([{ word: ' DUT ', analyses: [analysis] }]));
      }
      return new Response('', { status: 404 });
    });

    const entry = await lookupVerb('DUT');

    expect(requested.length).to.equal(1);
    expect(requested[0]).to.include('opendata/verbs/d.json');
    expect(entry?.word).to.equal('dut');
    expect(entry?.analyses).to.deep.equal([analysis]);
  });

  it('caches letter files after the first request', async () => {
    const requested = mockFetch(url => {
      if (url.endsWith('/d.json')) {
        return new Response(JSON.stringify([{ word: 'dut', analyses: [analysis] }]));
      }
      return new Response('', { status: 404 });
    });

    await lookupVerb('dut');
    await lookupVerb('DUT');

    expect(requested.length).to.equal(1);
  });

  it('returns undefined when the word is not in the letter file', async () => {
    mockFetch(() => new Response(JSON.stringify([{ word: 'dut', analyses: [analysis] }])));
    expect(await lookupVerb('naiz')).to.be.undefined;
  });

  it('returns an empty index and missing entries on fetch failures', async () => {
    mockFetch(() => new Response('', { status: 500 }));

    const index = await loadVerbIndex();
    const entry = await lookupVerb('dut');

    expect(index.size).to.equal(0);
    expect(entry).to.be.undefined;
  });

  it('ignores malformed entries and analyses', async () => {
    mockFetch(url => {
      if (url.endsWith('/d.json')) {
        return new Response(
          JSON.stringify([
            null,
            { word: 'dut' },
            { word: 'dut', analyses: [{ lemma: 'edun' }] },
            { word: 'dut', analyses: [analysis] },
          ])
        );
      }
      return new Response('', { status: 404 });
    });

    const entry = await lookupVerb('dut');

    expect(entry?.analyses.length).to.equal(1);
  });
});
