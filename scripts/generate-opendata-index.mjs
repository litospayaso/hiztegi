import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const sourceDir = 'opendata/eu-esp';
const outputFile = join(sourceDir, 'index.json');
const sourceFiles = readdirSync(sourceDir)
  .filter(name => name.endsWith('.json') && name !== 'index.json')
  .sort();

const words = new Set();

for (const file of sourceFiles) {
  const entries = JSON.parse(readFileSync(join(sourceDir, file), 'utf8'));
  for (const line of entries) {
    const source = String(line).split(' :_: ')[0]?.trim().normalize('NFC').toLocaleLowerCase();
    if (source) {
      words.add(source);
    }
  }
}

const sorted = [...words].sort((a, b) => a.localeCompare(b, 'eu'));
writeFileSync(outputFile, `${JSON.stringify(sorted)}\n`);

console.log(`[opendata:index] ${sorted.length} words -> ${outputFile}`);
