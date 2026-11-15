import { cpSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const target = process.argv[2];
if (!target) {
  console.error('Usage: node scripts/copy-opendata.mjs <target-dir>');
  process.exit(1);
}

for (const source of ['eu-esp', 'verbs']) {
  const destination = join(target, 'opendata', source);
  mkdirSync(destination, { recursive: true });
  cpSync(`opendata/${source}`, destination, { recursive: true });
  console.log(`[copy-opendata] opendata/${source} -> ${destination}`);
}
