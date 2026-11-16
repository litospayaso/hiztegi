import assert from 'node:assert/strict';
import test from 'node:test';
import {
  completiveEnikFor,
  completiveLaFor,
  futureFor,
  habitualFor,
  isCompletiveSourceSafe,
  isSingleWord,
  rootFor,
} from './verbMorphology.mjs';

test('normalizes words and identifies single-word lemmas', () => {
  assert.equal(isSingleWord(' Etorri '), true);
  assert.equal(isSingleWord('etorri eta'), false);
  assert.equal(isSingleWord('joan-etorri'), false);
});

test('derives high-confidence roots', () => {
  assert.equal(rootFor('etorri'), 'etor');
  assert.equal(rootFor('gustatu'), 'gusta');
  assert.equal(rootFor('hartu'), 'har');
  assert.equal(rootFor('ikusi'), 'ikus');
  assert.equal(rootFor('ibili'), 'ibil');
  assert.equal(rootFor('agindu'), 'agin');
  assert.equal(rootFor('joan'), 'joan');
  assert.equal(rootFor('izan'), 'izan');
  assert.equal(rootFor('jo'), undefined);
  assert.equal(rootFor('egin'), undefined);
});

test('derives future forms', () => {
  assert.equal(futureFor('etorri'), 'etorriko');
  assert.equal(futureFor('gustatu'), 'gustatuko');
  assert.equal(futureFor('joan'), 'joango');
  assert.equal(futureFor('izan'), 'izango');
  assert.equal(futureFor('egin'), 'egingo');
  assert.equal(futureFor('esan'), 'esango');
});

test('derives habitual forms', () => {
  assert.equal(habitualFor('etorri'), 'etortzen');
  assert.equal(habitualFor('gustatu'), 'gustatzen');
  assert.equal(habitualFor('joan'), 'joaten');
  assert.equal(habitualFor('izan'), 'izaten');
  assert.equal(habitualFor('egin'), 'egiten');
  assert.equal(habitualFor('esan'), 'esaten');
  assert.equal(habitualFor('ikusi'), 'ikusten');
  assert.equal(habitualFor('ibili'), 'ibiltzen');
  assert.equal(habitualFor('utzi'), 'uzten');
  assert.equal(habitualFor('hasi'), 'hasten');
  assert.equal(habitualFor('hartu'), 'hartzen');
  assert.equal(habitualFor('agindu'), 'agintzen');
  assert.equal(habitualFor('eduki'), 'edukitzen');
  assert.equal(habitualFor('bota'), 'botatzen');
  assert.equal(habitualFor('bete'), 'betetzen');
  assert.equal(habitualFor('jo'), 'jotzen');
  assert.equal(habitualFor('hil'), 'hiltzen');
  assert.equal(habitualFor('eraman'), 'eramaten');
  assert.equal(habitualFor('koiu'), undefined);
});

test('filters unsafe completive sources', () => {
  const base = { tense: 'orain', mode: 'ahala', subtype: 'subjunctive' };
  assert.equal(isCompletiveSourceSafe(base), true);
  assert.equal(isCompletiveSourceSafe({ ...base, tense: 'agintera' }), false);
  assert.equal(isCompletiveSourceSafe({ ...base, tense: 'alegiazko' }), false);
  assert.equal(isCompletiveSourceSafe({ ...base, subtype: 'conditional-ba' }), false);
  assert.equal(isCompletiveSourceSafe({ ...base, subtype: 'subjunctive-la' }), false);
  assert.equal(isCompletiveSourceSafe({ ...base, subtype: 'agintera' }), false);
  assert.equal(isCompletiveSourceSafe({ ...base, subtype: 'potential', mode: 'ke' }), true);
});

test('derives reliable completive -la forms', () => {
  assert.equal(completiveLaFor('zenekien'), 'zenekiela');
  assert.equal(completiveLaFor('datorren'), 'datorrela');
  assert.equal(completiveLaFor('duen'), 'duela');
  assert.equal(completiveLaFor('dut'), 'dudala');
  assert.equal(completiveLaFor('dute'), 'dutela');
  assert.equal(completiveLaFor('duzu'), 'duzula');
  assert.equal(completiveLaFor('da'), 'dela');
  assert.equal(completiveLaFor('dira'), 'direla');
  assert.equal(completiveLaFor('doa'), 'doala');
  assert.equal(completiveLaFor('dauka'), 'daukala');
  assert.equal(completiveLaFor('daki'), 'dakiela');
  assert.equal(completiveLaFor('dabil'), 'dabilela');
  assert.equal(completiveLaFor('dator'), 'datorrela');
  assert.equal(completiveLaFor('dezake'), 'dezakeela');
  assert.equal(completiveLaFor('etorri'), undefined);
  assert.equal(completiveLaFor('zela'), undefined);
});

test('derives completive -enik forms only from -n forms', () => {
  assert.equal(completiveEnikFor('zenekien'), 'zenekienik');
  assert.equal(completiveEnikFor('datorren'), 'datorrenik');
  assert.equal(completiveEnikFor('duen'), 'duenik');
  assert.equal(completiveEnikFor('etorri'), undefined);
});
