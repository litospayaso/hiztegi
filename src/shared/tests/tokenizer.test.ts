import { expect } from '@esm-bundle/chai';
import { tokenize } from '../tokenizer';

const types = (tokens: ReturnType<typeof tokenize>): string[] => tokens.map(token => token.type);
const texts = (tokens: ReturnType<typeof tokenize>): string[] => tokens.map(token => token.text);

describe('tokenizer Spec:', () => {
  it('returns no tokens for an empty string', () => {
    expect(tokenize('')).to.have.length(0);
  });

  it('splits text into word, space and punct tokens', () => {
    const tokens = tokenize('Kaixo, mundua!');
    expect(tokens).to.deep.equal([
      { type: 'word', text: 'Kaixo' },
      { type: 'punct', text: ',' },
      { type: 'space', text: ' ' },
      { type: 'word', text: 'mundua' },
      { type: 'punct', text: '!' },
    ]);
  });

  it('preserves whitespace runs as single tokens', () => {
    const tokens = tokenize('a   b');
    expect(types(tokens)).to.deep.equal(['word', 'space', 'word']);
    expect(texts(tokens)).to.deep.equal(['a', '   ', 'b']);
  });

  it('preserves newlines in space tokens', () => {
    const tokens = tokenize('a\n\nb');
    expect(texts(tokens)).to.deep.equal(['a', '\n\n', 'b']);
  });

  it('groups consecutive punctuation', () => {
    const tokens = tokenize('zer?...');
    expect(types(tokens)).to.deep.equal(['word', 'punct']);
    expect(tokens[1].text).to.equal('?...');
  });

  it('treats Unicode letters as word characters', () => {
    const tokens = tokenize('Añorga eta Ñorka.');
    expect(types(tokens)).to.deep.equal(['word', 'space', 'word', 'space', 'word', 'punct']);
    expect(tokens[0].text).to.equal('Añorga');
  });

  it('treats digits and symbols as punctuation', () => {
    const tokens = tokenize('a1b #3');
    expect(types(tokens)).to.deep.equal(['word', 'punct', 'word', 'space', 'punct']);
    expect(tokens[1].text).to.equal('1');
    expect(tokens[4].text).to.equal('#3');
  });

  it('handles text made only of whitespace', () => {
    const tokens = tokenize('  \n ');
    expect(tokens).to.deep.equal([{ type: 'space', text: '  \n ' }]);
  });

  it('is lossless: rejoining tokens reproduces the original text', () => {
    const samples = ['Kaixo, mundua!', 'a   b\n\nc\td', '  \n ', '', 'x\u00a0y', 'Añorga: 3-2'];
    samples.forEach(sample => {
      expect(tokenize(sample).map(token => token.text).join('')).to.equal(sample);
    });
  });
});
