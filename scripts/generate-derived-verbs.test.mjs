import assert from 'node:assert/strict';
import test from 'node:test';
import { buildDerivedEntries } from './generate-derived-verbs.mjs';

const analysis = (lemma, overrides = {}) => ({
  lemma,
  kind: 'synthetic',
  paradigm: 'nor',
  tense: 'orain',
  mode: 'ahala',
  persons: { nor: 'hura' },
  meaning: 'significado',
  ...overrides,
});

const run = (overrides = {}) => {
  const lexicalVerbs = new Map([
    ['etorri', 'venir'],
    ['gustatu', 'gustar'],
    ['joan', 'ir'],
    ['izan', 'ser'],
    ['egin', 'hacer'],
  ]);
  const baseEntries = new Map([
    ['zenekien', [analysis('jakin', { tense: 'iragan', meaning: 'saber' })]],
    ['dator', [analysis('etorri', { meaning: 'venir' })]],
  ]);
  return buildDerivedEntries({
    lexicalVerbs,
    baseEntries,
    baseIndex: new Set(baseEntries.keys()),
    openIndex: new Set(),
    ...overrides,
  });
};

test('builds future, habitual, root and completive derivations', () => {
  const { derived } = run();

  assert.deepEqual(derived.get('etor')?.derivations, [
    { type: 'root', from: 'etorri', lemma: 'etorri', meaning: 'venir' },
  ]);
  assert.deepEqual(derived.get('etorriko')?.derivations, [
    { type: 'future', from: 'etorri', lemma: 'etorri', meaning: 'venir' },
  ]);
  assert.deepEqual(derived.get('etortzen')?.derivations, [
    { type: 'habitual', from: 'etorri', lemma: 'etorri', meaning: 'venir' },
  ]);
  assert.deepEqual(derived.get('joan')?.derivations, [
    { type: 'root', from: 'joan', lemma: 'joan', meaning: 'ir' },
  ]);
  assert.deepEqual(derived.get('izango')?.derivations, [
    { type: 'future', from: 'izan', lemma: 'izan', meaning: 'ser' },
  ]);
  assert.deepEqual(derived.get('egingo')?.derivations, [
    { type: 'future', from: 'egin', lemma: 'egin', meaning: 'hacer' },
  ]);
  assert.deepEqual(derived.get('zenekiela')?.derivations, [
    { type: 'completive-la', from: 'zenekien', lemma: 'jakin', meaning: 'saber' },
  ]);
  assert.deepEqual(derived.get('zenekienik')?.derivations, [
    { type: 'completive-enik', from: 'zenekien', lemma: 'jakin', meaning: 'saber' },
  ]);
  assert.deepEqual(derived.get('datorrela')?.derivations, [
    { type: 'completive-la', from: 'dator', lemma: 'etorri', meaning: 'venir' },
  ]);
});

test('skips roots that collide with non-verb Open Data words', () => {
  const { derived, skipped } = run({
    lexicalVerbs: new Map([['abadetu', 'abandonar']]),
    baseEntries: new Map(),
    baseIndex: new Set(),
    openIndex: new Set(['abade']),
  });

  assert.equal(derived.has('abade'), false);
  assert.deepEqual(skipped.root, ['abade']);
});

test('keeps derivations when the form already exists in the base verb data', () => {
  const { derived } = run({
    lexicalVerbs: new Map([['etorri', 'venir']]),
    baseEntries: new Map([
      ['dator', [analysis('etorri')]],
    ]),
    baseIndex: new Set(['etorriko', 'dator', 'datorrela']),
    openIndex: new Set(['etorriko', 'datorrela']),
  });

  assert.equal(derived.get('etorriko')?.derivations[0].type, 'future');
  assert.equal(derived.get('datorrela')?.derivations[0].type, 'completive-la');
});

test('does not generate completives from unsafe analyses', () => {
  const { derived } = run({
    lexicalVerbs: new Map(),
    baseEntries: new Map([
      ['datorren', [analysis('etorri', { tense: 'alegiazko' })]],
      ['duen', [analysis('edun', { subtype: 'conditional-ba' })]],
    ]),
    baseIndex: new Set(['datorren', 'duen']),
    openIndex: new Set(),
  });

  assert.equal(derived.has('datorrela'), false);
  assert.equal(derived.has('duela'), false);
  assert.equal(derived.has('datorrenik'), false);
  assert.equal(derived.has('duenik'), false);
});
