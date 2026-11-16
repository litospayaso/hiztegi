import { expect } from '@esm-bundle/chai';
import { loadVerbIndex, lookupVerb, resetVerbCache } from './verbStore';
import type { VerbAnalysis, VerbEntry } from './types';

const analysis: VerbAnalysis = {
  lemma: 'edun',
  kind: 'auxiliary',
  paradigm: 'nor-nork',
  tense: 'orain',
  mode: 'ahala',
  persons: { nor: 'hura', nork: 'nik' },
  meaning: 'tener/haber',
  source: { page: 47, table: 'A-1' },
};

const json = (value: unknown): Response => new Response(JSON.stringify(value));
const notFound = (): Response => new Response('', { status: 404 });

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

  const isBaseLetter = (url: string, letter: string): boolean =>
    url.endsWith(`/opendata/verbs/${letter}.json`);
  const isDerivedLetter = (url: string, letter: string): boolean =>
    url.endsWith(`/opendata/verbs/derived/${letter}.json`);

  it('loads, normalizes and deduplicates the compact index', async () => {
    mockFetch(() => json([' Dut ', 'dut', 'NAIZ']));
    const index = await loadVerbIndex();

    expect(index.size).to.equal(2);
    expect(index.has('dut')).to.be.true;
    expect(index.has('naiz')).to.be.true;
  });

  it('unions the base and derived indexes', async () => {
    mockFetch(url => {
      if (url.endsWith('/derived/index.json')) {
        return json(['etorriko']);
      }
      if (url.endsWith('/verbs/index.json')) {
        return json(['dut']);
      }
      return notFound();
    });
    const index = await loadVerbIndex();

    expect(index.size).to.equal(2);
    expect(index.has('dut')).to.be.true;
    expect(index.has('etorriko')).to.be.true;
  });

  it('caches the indexes after the first request', async () => {
    const requested = mockFetch(() => json(['dut']));

    await loadVerbIndex();
    await loadVerbIndex();

    expect(requested.length).to.equal(2);
    expect(requested.some(url => url.includes('/derived/index.json'))).to.be.true;
  });

  it('loads a letter file lazily and normalizes the entry', async () => {
    const requested = mockFetch(url => {
      if (isBaseLetter(url, 'd')) {
        return json([{ word: ' DUT ', analyses: [analysis] }]);
      }
      return notFound();
    });

    const entry = await lookupVerb('DUT');

    expect(requested.length).to.equal(2);
    expect(requested.some(url => url.includes('/opendata/verbs/d.json'))).to.be.true;
    expect(requested.some(url => url.includes('/opendata/verbs/derived/d.json'))).to.be.true;
    expect(entry?.word).to.equal('dut');
    expect(entry?.analyses).to.deep.equal([analysis]);
  });

  it('caches letter files after the first request', async () => {
    const requested = mockFetch(url => {
      if (isBaseLetter(url, 'd')) {
        return json([{ word: 'dut', analyses: [analysis] }]);
      }
      return notFound();
    });

    await lookupVerb('dut');
    await lookupVerb('DUT');

    expect(requested.length).to.equal(2);
  });

  it('returns undefined when the word is not in the letter file', async () => {
    mockFetch(() => json([{ word: 'dut', analyses: [analysis] }]));
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
      if (isBaseLetter(url, 'd')) {
        return json([
          null,
          { word: 'dut' },
          { word: 'dut', analyses: [{ lemma: 'edun' }] },
          { word: 'dut', analyses: [analysis] },
        ]);
      }
      return notFound();
    });

    const entry = await lookupVerb('dut');

    expect(entry?.analyses.length).to.equal(1);
  });

  it('accepts named sources without page and table', async () => {
    const namedAnalysis = {
      ...analysis,
      source: { name: 'SEG', url: 'https://www.ehu.eus/seg/' },
    };
    mockFetch(url => {
      if (isBaseLetter(url, 'd')) {
        return json([{ word: 'dabil', analyses: [namedAnalysis] }]);
      }
      return notFound();
    });

    const entry = await lookupVerb('dabil');

    expect(entry?.analyses[0].source).to.deep.equal(namedAnalysis.source);
  });

  it('rejects incomplete page and table sources without a name or URL', async () => {
    const invalidAnalyses = [
      { ...analysis, source: { page: 1 } },
      { ...analysis, source: { table: 'A-1' } },
      { ...analysis, source: {} },
    ];
    mockFetch(url => {
      if (isBaseLetter(url, 'd')) {
        return json([{ word: 'dut', analyses: invalidAnalyses }]);
      }
      return notFound();
    });

    expect(await lookupVerb('dut')).to.be.undefined;
  });

  it('merges base analyses with derived metadata', async () => {
    const baseEntry: VerbEntry = { word: 'datorrela', analyses: [analysis] };
    const derivedEntry: VerbEntry = {
      word: 'datorrela',
      analyses: [],
      derivations: [
        { type: 'completive-la', from: 'dator', lemma: 'etorri', meaning: 'venir' },
      ],
    };
    mockFetch(url => {
      if (isBaseLetter(url, 'd')) {
        return json([baseEntry, { word: 'dator', analyses: [{ ...analysis, lemma: 'etorri' }] }]);
      }
      if (isDerivedLetter(url, 'd')) {
        return json([derivedEntry]);
      }
      return notFound();
    });

    const entry = await lookupVerb('datorrela');

    expect(entry?.analyses).to.deep.equal([analysis]);
    expect(entry?.derivations?.length).to.equal(1);
    expect(entry?.derivations?.[0].type).to.equal('completive-la');
    expect(entry?.derivations?.[0].baseAnalysis?.lemma).to.equal('etorri');
  });

  it('resolves the base analysis for completive derivations', async () => {
    mockFetch(url => {
      if (isBaseLetter(url, 'z')) {
        return json([
          {
            word: 'zenekien',
            analyses: [
              {
                ...analysis,
                lemma: 'jakin',
                paradigm: 'nor-nork',
                tense: 'iragan',
                persons: { nor: 'hura', nork: 'zu' },
                meaning: 'saber',
              },
            ],
          },
        ]);
      }
      if (isDerivedLetter(url, 'z')) {
        return json([
          {
            word: 'zenekiela',
            analyses: [],
            derivations: [
              {
                type: 'completive-la',
                from: 'zenekien',
                lemma: 'jakin',
                meaning: 'saber',
              },
            ],
          },
        ]);
      }
      return notFound();
    });

    const entry = await lookupVerb('zenekiela');

    expect(entry?.analyses).to.deep.equal([]);
    expect(entry?.derivations?.[0].from).to.equal('zenekien');
    expect(entry?.derivations?.[0].baseAnalysis?.tense).to.equal('iragan');
    expect(entry?.derivations?.[0].baseAnalysis?.persons.nork).to.equal('zu');
  });

  it('annotates safe -n forms as completive -en', async () => {
    mockFetch(url => {
      if (isBaseLetter(url, 'd')) {
        return json([
          {
            word: 'datorren',
            analyses: [{ ...analysis, lemma: 'etorri', paradigm: 'nor', persons: { nor: 'hura' } }],
          },
        ]);
      }
      return notFound();
    });

    const entry = await lookupVerb('datorren');

    expect(entry?.derivations?.length).to.equal(1);
    expect(entry?.derivations?.[0]).to.include({
      type: 'completive-en',
      from: 'datorren',
      lemma: 'etorri',
    });
    expect(entry?.derivations?.[0].baseAnalysis?.lemma).to.equal('etorri');
  });

  it('does not annotate unsafe -n forms as completive -en', async () => {
    mockFetch(url => {
      if (isBaseLetter(url, 'b')) {
        return json([
          {
            word: 'bagen',
            analyses: [{ ...analysis, tense: 'alegiazko', subtype: 'conditional-ba' }],
          },
        ]);
      }
      return notFound();
    });

    const entry = await lookupVerb('bagen');

    expect(entry?.derivations ?? []).to.deep.equal([]);
  });

  it('ignores malformed derivations', async () => {
    mockFetch(url => {
      if (isDerivedLetter(url, 'e')) {
        return json([
          {
            word: 'etorriko',
            analyses: [],
            derivations: [
              null,
              { type: 'unknown', from: 'etorri', lemma: 'etorri' },
              { type: 'future', from: 'etorri', lemma: 'etorri', meaning: 'venir' },
            ],
          },
        ]);
      }
      return notFound();
    });

    const entry = await lookupVerb('etorriko');

    expect(entry?.derivations?.length).to.equal(1);
    expect(entry?.derivations?.[0].type).to.equal('future');
  });
});
