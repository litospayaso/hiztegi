import { expect } from '@esm-bundle/chai';
import {
  SUFFIX_TABLE,
  CASES,
  detectSuffixes,
} from './declensions';

describe('declensions', () => {
  describe('SUFFIX_TABLE', () => {
    it('every entry has a suffix starting with -', () => {
      for (const entry of SUFFIX_TABLE) {
        expect(entry.suffix.startsWith('-')).to.be.true;
      }
    });

    it('every entry has at least one case', () => {
      for (const entry of SUFFIX_TABLE) {
        expect(entry.cases.length).to.be.greaterThan(0);
      }
    });

    it('every case within an entry has a non-empty caseId and meaning', () => {
      for (const entry of SUFFIX_TABLE) {
        for (const c of entry.cases) {
          expect(c.caseId.length).to.be.greaterThan(0);
          expect(c.meaning.length).to.be.greaterThan(0);
        }
      }
    });

    it('has no duplicate suffix strings', () => {
      const suffixes = SUFFIX_TABLE.map(e => e.suffix);
      expect(new Set(suffixes).size).to.equal(suffixes.length);
    });

    it('covers all 14 cases', () => {
      const coveredCaseIds = new Set(
        SUFFIX_TABLE.flatMap(e => e.cases.map(c => c.caseId))
      );
      for (const c of CASES) {
        expect(coveredCaseIds.has(c.id)).to.be.true;
      }
    });
  });

  describe('CASES', () => {
    it('has 14 cases', () => {
      expect(CASES.length).to.equal(14);
    });

    it('each case has a unique id', () => {
      const ids = CASES.map(c => c.id);
      expect(new Set(ids).size).to.equal(ids.length);
    });
  });

  describe('detectSuffixes', () => {
    it('detects -ra as adlativo for vowel words', () => {
      const matches = detectSuffixes('etxera');
      expect(matches.length).to.be.greaterThan(0);
      const match = matches.find(m => m.suffix === '-ra');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('etxe');
      expect(match!.cases.some(c => c.caseId === 'adlativo')).to.be.true;
    });

    it('detects -tik as ablativo for vowel words', () => {
      const matches = detectSuffixes('etxetik');
      const match = matches.find(m => m.suffix === '-tik');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('etxe');
      expect(match!.cases.some(c => c.caseId === 'ablativo')).to.be.true;
    });

    it('detects -rekin as asociativo', () => {
      const matches = detectSuffixes('etxerekin');
      const match = matches.find(m => m.suffix === '-rekin');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('etxe');
      expect(match!.cases.some(c => c.caseId === 'asociativo')).to.be.true;
    });

    it('detects -tan as inesivo', () => {
      const matches = detectSuffixes('menditan');
      const match = matches.find(m => m.suffix === '-tan');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('mendi');
      expect(match!.cases.some(c => c.caseId === 'inesivo')).to.be.true;
    });

    it('detects -etan as inesivo', () => {
      const matches = detectSuffixes('haranetan');
      const match = matches.find(m => m.suffix === '-etan');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('haran');
      expect(match!.cases.some(c => c.caseId === 'inesivo')).to.be.true;
    });

    it('detects -gan as inesivo', () => {
      const matches = detectSuffixes('semegan');
      const match = matches.find(m => m.suffix === '-gan');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('seme');
      expect(match!.cases.some(c => c.caseId === 'inesivo')).to.be.true;
    });

    it('detects -ganaino as adlativo terminal', () => {
      const matches = detectSuffixes('semeganaino');
      const match = matches.find(m => m.suffix === '-ganaino');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('seme');
      expect(match!.cases.some(c => c.caseId === 'adl_terminal')).to.be.true;
    });

    it('detects -retik as ablativo (r-doubling)', () => {
      const matches = detectSuffixes('horretik');
      const match = matches.find(m => m.suffix === '-retik');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('hor');
      expect(match!.cases.some(c => c.caseId === 'ablativo')).to.be.true;
    });

    it('detects -retatik as ablativo (r-doubling)', () => {
      const matches = detectSuffixes('horretatik');
      const match = matches.find(m => m.suffix === '-retatik');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('hor');
      expect(match!.cases.some(c => c.caseId === 'ablativo')).to.be.true;
    });

    it('detects -gandik as ablativo', () => {
      const matches = detectSuffixes('semegandik');
      const match = matches.find(m => m.suffix === '-gandik');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('seme');
      expect(match!.cases.some(c => c.caseId === 'ablativo')).to.be.true;
    });

    it('detects -ko as genitivo locativo', () => {
      const matches = detectSuffixes('mendiko');
      const match = matches.find(m => m.suffix === '-ko');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('mendi');
      expect(match!.cases.some(c => c.caseId === 'gen_locativo')).to.be.true;
    });

    it('detects -tako as genitivo locativo', () => {
      const matches = detectSuffixes('menditako');
      const match = matches.find(m => m.suffix === '-tako');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('mendi');
      expect(match!.cases.some(c => c.caseId === 'gen_locativo')).to.be.true;
    });

    it('detects -rentzat as destinativo', () => {
      const matches = detectSuffixes('mendirentzat');
      const match = matches.find(m => m.suffix === '-rentzat');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('mendi');
      expect(match!.cases.some(c => c.caseId === 'destinativo')).to.be.true;
    });

    it('detects -tzat as prolativo', () => {
      const matches = detectSuffixes('menditzat');
      const match = matches.find(m => m.suffix === '-tzat');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('mendi');
      expect(match!.cases.some(c => c.caseId === 'prolativo')).to.be.true;
    });

    it('detects -rik as partitivo', () => {
      const matches = detectSuffixes('mendirik');
      const match = matches.find(m => m.suffix === '-rik');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('mendi');
      expect(match!.cases.some(c => c.caseId === 'partitivo')).to.be.true;
    });

    it('returns empty array for short words with no suffix match', () => {
      const matches = detectSuffixes('ni');
      expect(matches.length).to.equal(0);
    });

    it('returns empty array for unknown suffixes', () => {
      const matches = detectSuffixes('etxeunder');
      expect(matches.length).to.equal(0);
    });

    it('returns matches sorted by suffix length descending', () => {
      const matches = detectSuffixes('mendirekin');
      const lengths = matches.map(m => m.suffix.length);
      for (let i = 1; i < lengths.length; i++) {
        expect(lengths[i]).to.be.lessThanOrEqual(lengths[i - 1]);
      }
    });

    it('returns multiple cases for suffixes that belong to more than one case', () => {
      const matches = detectSuffixes('mendiak');
      expect(matches.length).to.be.greaterThan(0);
      const match = matches.find(m => m.suffix === '-ak');
      expect(match).to.not.be.undefined;
      expect(match!.cases.length).to.equal(2);
      expect(match!.cases.some(c => c.caseId === 'nominativo')).to.be.true;
      expect(match!.cases.some(c => c.caseId === 'ergativo')).to.be.true;
    });

    it('detects -ari as dativo', () => {
      const matches = detectSuffixes('etxeari');
      const match = matches.find(m => m.suffix === '-ari');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('etxe');
      expect(match!.cases.some(c => c.caseId === 'dativo')).to.be.true;
    });

    it('detects -aren as genitivo', () => {
      const matches = detectSuffixes('etxearen');
      const match = matches.find(m => m.suffix === '-aren');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('etxe');
      expect(match!.cases.some(c => c.caseId === 'genitivo')).to.be.true;
    });

    it('detects -az as instrumental', () => {
      const matches = detectSuffixes('etxeaz');
      const match = matches.find(m => m.suffix === '-az');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('etxe');
      expect(match!.cases.some(c => c.caseId === 'instrumental')).to.be.true;
    });

    it('detects -raino as adlativo terminal', () => {
      const matches = detectSuffixes('mendiraino');
      const match = matches.find(m => m.suffix === '-raino');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('mendi');
      expect(match!.cases.some(c => c.caseId === 'adl_terminal')).to.be.true;
    });

    it('detects -tara as adlativo', () => {
      const matches = detectSuffixes('menditara');
      const match = matches.find(m => m.suffix === '-tara');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('mendi');
      expect(match!.cases.some(c => c.caseId === 'adlativo')).to.be.true;
    });

    it('is case-insensitive', () => {
      const matches = detectSuffixes('ETXERA');
      const match = matches.find(m => m.suffix === '-ra');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('etxe');
    });

    it('trims whitespace from input', () => {
      const matches = detectSuffixes('  etxera  ');
      const match = matches.find(m => m.suffix === '-ra');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('etxe');
    });

    it('deduplicates results when multiple suffix entries match the same base+suffix', () => {
      const matches = detectSuffixes('mendiak');
      const akMatches = matches.filter(m => m.suffix === '-ak');
      expect(akMatches.length).to.equal(1);
      expect(akMatches[0].cases.length).to.equal(2);
    });

    it('detects ospitalera as ospital + -era (user example)', () => {
      const matches = detectSuffixes('ospitalera');
      const match = matches.find(m => m.suffix === '-era');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('ospital');
      expect(match!.cases.some(c => c.caseId === 'adlativo')).to.be.true;
    });

    it('detects -etako as inesivo (-e- connector)', () => {
      const matches = detectSuffixes('haranetako');
      const match = matches.find(m => m.suffix === '-etako');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('haran');
      expect(match!.cases.some(c => c.caseId === 'gen_locativo')).to.be.true;
    });

    it('detects -etara as adlativo (-e- connector)', () => {
      const matches = detectSuffixes('haranetara');
      const match = matches.find(m => m.suffix === '-etara');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('haran');
      expect(match!.cases.some(c => c.caseId === 'adlativo')).to.be.true;
    });

    it('detects -regandik as ablativo (r-doubling + -e- connector)', () => {
      const matches = detectSuffixes('horregandik');
      const match = matches.find(m => m.suffix === '-regandik');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('hor');
      expect(match!.cases.some(c => c.caseId === 'ablativo')).to.be.true;
    });

    it('detects -rangandik as ablativo (r-doubling)', () => {
      const matches = detectSuffixes('horrangandik');
      const match = matches.find(m => m.suffix === '-rangandik');
      expect(match).to.not.be.undefined;
      expect(match!.baseForm).to.equal('hor');
      expect(match!.cases.some(c => c.caseId === 'ablativo')).to.be.true;
    });

    it('skips matches where base form would be shorter than 2 chars', () => {
      const matches = detectSuffixes('ta');
      const aMatch = matches.find(m => m.suffix === '-a');
      expect(aMatch).to.be.undefined;
    });

    it('prefers longest suffix match first', () => {
      const matches = detectSuffixes('semeganaino');
      const lengths = matches.map(m => m.suffix.length);
      expect(lengths[0]).to.be.greaterThan(lengths[1]);
      expect(matches[0].suffix).to.equal('-eganaino');
    });
  });
});
