export type TokenType = 'word' | 'space' | 'punct';

export interface Token {
  type: TokenType;
  text: string;
}

const isLetter = (char: string): boolean => /^\p{L}$/u.test(char);

const isSpace = (char: string): boolean => /\s/.test(char);

export const tokenize = (text: string): Token[] => {
  const tokens: Token[] = [];
  let index = 0;
  while (index < text.length) {
    const start = index;
    if (isSpace(text[index])) {
      while (index < text.length && isSpace(text[index])) index += 1;
      tokens.push({ type: 'space', text: text.slice(start, index) });
    } else if (isLetter(text[index])) {
      while (index < text.length && isLetter(text[index])) index += 1;
      tokens.push({ type: 'word', text: text.slice(start, index) });
    } else {
      while (index < text.length && !isSpace(text[index]) && !isLetter(text[index])) index += 1;
      tokens.push({ type: 'punct', text: text.slice(start, index) });
    }
  }
  return tokens;
};
