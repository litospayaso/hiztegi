import { cpSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const target = process.argv[2];
if (!target) {
  console.error('Usage: node scripts/copy-opendata.mjs <target-dir>');
  process.exit(1);
}

const destination = join(target, 'opendata', 'eu-esp');
mkdirSync(destination, { recursive: true });
cpSync('opendata/eu-esp', destination, { recursive: true });

console.log(`[copy-opendata] opendata/eu-esp -> ${destination}`);
