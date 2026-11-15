import { getDocument, Util } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const PDF_PATH = 'opendata/pdf-euskal-aditzak.pdf';
const OUT_DIR = 'opendata/verbs';
const INDEX_FILE = join(OUT_DIR, 'index.json');
const REPORT_FILE = join(OUT_DIR, 'report.md');

const NOR = ['ni', 'hi', 'hura', 'gu', 'zu', 'zuek', 'haiek'];
const NORI = ['niri', 'hiri', 'hari', 'guri', 'zuri', 'zuei', 'haiei'];
const NORK = ['nik', 'hik', 'hark', 'guk', 'zuk', 'zuek', 'haiek'];
const NORK_AGINTERA = ['hik', 'hark', 'zuk', 'zuek', 'haiek'];

const ROWS = {
  nor: NOR,
  nori: NORI,
  nork: NORK,
};

const LEMMA_MEANING = {
  izan: 'ser/estar',
  edin: 'poder (auxiliar)',
  edun: 'tener',
  ezan: 'tener (con dativo)',
};

const A_FIRST = [
  { tense: 'orain', mode: 'ahala', table: 'A-1' },
  { tense: 'iragan', mode: 'ahala', table: 'B-1' },
  { tense: 'alegiazko', mode: 'ahala', table: 'B-4' },
];

const A_SECOND = [
  { tense: 'orain', mode: 'ke', subtype: 'potential', table: 'A-2' },
  { tense: 'iragan', mode: 'ke', subtype: 'potential', table: 'B-3' },
  { tense: 'alegiazko', mode: 'ke', subtype: 'potential', table: 'B-2' },
];

const B_FIRST = [
  { tense: 'orain', mode: 'ahala', subtype: 'subjunctive', table: 'A-3' },
  { tense: 'orain', mode: 'ahala', subtype: 'conditional-ba', table: 'A-4' },
  { tense: 'orain', mode: 'ahala', subtype: 'subjunctive-la', table: 'A-3' },
  { tense: 'iragan', mode: 'ahala', subtype: 'subjunctive', table: 'B-5' },
  { tense: 'iragan', mode: 'ahala', subtype: 'subjunctive-la', table: 'B-5' },
  { tense: 'alegiazko', mode: 'ahala', subtype: 'subjunctive', table: 'B-5' },
  { tense: 'alegiazko', mode: 'ahala', subtype: 'conditional-ba', table: 'B-6' },
];

const B_FIRST_WITH_AGINTERA = [
  ...B_FIRST,
  { tense: 'agintera', mode: 'agintera', subtype: 'agintera', table: 'C' },
];

const B_SECOND = [
  { tense: 'orain', mode: 'ke', subtype: 'potential', table: 'A-5' },
  { tense: 'iragan', mode: 'ke', subtype: 'potential', table: 'B-8' },
  { tense: 'alegiazko', mode: 'ke', subtype: 'potential', table: 'B-7' },
];

const AGINTERA = { tense: 'agintera', mode: 'agintera', subtype: 'agintera', table: 'C' };

const aFirstColumns = () => A_FIRST.map(column => ({ ...column }));
const aSecondColumns = () => A_SECOND.map(column => ({ ...column }));
const bFirstColumns = () => B_FIRST.map(column => ({ ...column }));
const bFirstWithAginteraColumns = () => B_FIRST_WITH_AGINTERA.map(column => ({ ...column }));
const bSecondColumns = () => B_SECOND.map(column => ({ ...column }));

const aginteraNorColumns = () =>
  NOR.map(person => ({ ...AGINTERA, personRole: 'nor', person }));

const aginteraNorkColumns = () =>
  NORK_AGINTERA.map(person => ({ ...AGINTERA, personRole: 'nork', person }));

const pageSpec = (rowsType, chunks, paradigm, auxiliary) => ({
  rowsType,
  chunks,
  paradigm,
  auxiliary,
});

const fixedNor = nor => ({ nor });
const fixedNork = nork => ({ nork });

const pageSpecs = new Map();

pageSpecs.set(7, [
  pageSpec('nor', [{ columns: aFirstColumns(), fixed: {} }], 'nor', 'izan'),
  pageSpec('nor', [{ columns: aSecondColumns(), fixed: {} }], 'nor', 'izan'),
]);

for (let page = 10; page <= 16; page += 1) {
  const nor = NOR[page - 10];
  pageSpecs.set(page, [
    pageSpec('nori', [{ columns: aFirstColumns(), fixed: fixedNor(nor) }], 'nor-nori', 'izan'),
    pageSpec('nori', [{ columns: aSecondColumns(), fixed: fixedNor(nor) }], 'nor-nori', 'izan'),
  ]);
}

pageSpecs.set(8, [
  pageSpec('nor', [{ columns: bFirstWithAginteraColumns(), fixed: {} }], 'nor', 'izan'),
  pageSpec('nor', [{ columns: bSecondColumns(), fixed: {} }], 'nor', 'izan'),
]);

for (let page = 18; page <= 24; page += 1) {
  const nor = NOR[page - 18];
  pageSpecs.set(page, [
    pageSpec('nori', [{ columns: bFirstColumns(), fixed: fixedNor(nor) }], 'nor-nori', 'edin'),
    pageSpec('nori', [{ columns: bSecondColumns(), fixed: fixedNor(nor) }], 'nor-nori', 'edin'),
  ]);
}

pageSpecs.set(25, [
  pageSpec('nori', [{ columns: aginteraNorColumns(), fixed: {} }], 'nor-nori', 'edin'),
]);

for (let page = 27; page <= 33; page += 1) {
  const nor = NOR[page - 27];
  pageSpecs.set(page, [
    pageSpec('nork', [{ columns: aFirstColumns(), fixed: fixedNor(nor) }], 'nor-nork', 'edun'),
    pageSpec('nork', [{ columns: aSecondColumns(), fixed: fixedNor(nor) }], 'nor-nork', 'edun'),
  ]);
}

for (let page = 35; page <= 41; page += 1) {
  const nor = NOR[page - 35];
  pageSpecs.set(page, [
    pageSpec('nork', [{ columns: bFirstColumns(), fixed: fixedNor(nor) }], 'nor-nork', 'ezan'),
    pageSpec('nork', [{ columns: bSecondColumns(), fixed: fixedNor(nor) }], 'nor-nork', 'ezan'),
  ]);
}

pageSpecs.set(42, [
  pageSpec('nork', [{ columns: aginteraNorColumns(), fixed: {} }], 'nor-nork', 'ezan'),
]);

for (let page = 44; page <= 50; page += 1) {
  const nork = NORK[page - 44];
  pageSpecs.set(page, [
    pageSpec('nori', [
      { columns: aFirstColumns(), fixed: { nork, nor: 'hura' } },
      { columns: aFirstColumns(), fixed: { nork, nor: 'haiek' } },
    ], 'nor-nori-nork', 'edun'),
    pageSpec('nori', [
      { columns: aSecondColumns(), fixed: { nork, nor: 'hura' } },
      { columns: aSecondColumns(), fixed: { nork, nor: 'haiek' } },
    ], 'nor-nori-nork', 'edun'),
  ]);
}

for (let page = 52; page <= 65; page += 1) {
  const nork = NORK[page <= 58 ? page - 52 : page - 59];
  const nor = page <= 58 ? 'hura' : 'haiek';
  pageSpecs.set(page, [
    pageSpec('nori', [{ columns: bFirstColumns(), fixed: { nork, nor } }], 'zer-nori-nork', 'ezan'),
    pageSpec('nori', [{ columns: bSecondColumns(), fixed: { nork, nor } }], 'zer-nori-nork', 'ezan'),
  ]);
}

pageSpecs.set(66, [
  pageSpec('nori', [{ columns: aginteraNorkColumns(), fixed: { nor: 'hura' } }], 'zer-nori-nork', 'ezan'),
  pageSpec('nori', [{ columns: aginteraNorkColumns(), fixed: { nor: 'haiek' } }], 'zer-nori-nork', 'ezan'),
]);

const normalize = value => value.trim().normalize('NFC').toLocaleLowerCase();
const assetLetterFor = word => {
  const initial = normalize(word).normalize('NFD').charAt(0);
  return /^[a-z]$/.test(initial) ? initial : 'otros';
};

const groupRows = items => {
  const rows = [];
  for (const item of items) {
    const row = rows.find(candidate => Math.abs(candidate.y - item.y) <= 3.5);
    if (row) {
      row.items.push(item);
      row.y = (row.y * (row.items.length - 1) + item.y) / row.items.length;
    } else {
      rows.push({ y: item.y, items: [item] });
    }
  }
  rows.sort((a, b) => a.y - b.y);
  for (const row of rows) {
    row.items.sort((a, b) => a.x - b.x);
  }
  return rows;
};

const isLabel = value => /^[ABC]-\d+$/.test(value) || value === 'C';
const isMarker = value => ['-', '+', '- ahala', '+ ahala', '-ahala', '+ahala', 'ahala'].includes(value);
const isPageNumber = value => /^[–-]\s*\d+\s*[–-]$/.test(value);
const isFootnoteMarker = value => /^\(\d+\)$/.test(value);
const isBlank = value => /^[–—−-]+$/.test(value);

const isLabelItem = item =>
  isLabel(item.s) || isMarker(item.s) || isPageNumber(item.s) || isFootnoteMarker(item.s);

const clusterByX = (items, tolerance = 10) => {
  const clusters = [];
  for (const item of [...items].sort((a, b) => a.x - b.x)) {
    let cluster = clusters.find(candidate => Math.abs(candidate.x - item.x) <= tolerance);
    if (!cluster) {
      cluster = { x: item.x, items: [] };
      clusters.push(cluster);
    }
    cluster.items.push(item);
    cluster.x = (cluster.x * (cluster.items.length - 1) + item.x) / cluster.items.length;
  }
  clusters.sort((a, b) => a.x - b.x);
  return clusters;
};

const mergeColumnItems = items => {
  const sameRow = [];
  for (const item of [...items].sort((a, b) => a.y - b.y || a.x - b.x)) {
    const previous = sameRow[sameRow.length - 1];
    if (previous && Math.abs(previous.y - item.y) <= 2.5) {
      previous.s += item.s;
      previous.x = (previous.x + item.x) / 2;
    } else {
      sameRow.push({ s: item.s, x: item.x, y: item.y });
    }
  }

  const merged = [];
  for (const item of sameRow) {
    const previous = merged[merged.length - 1];
    if (previous && /[^-]-$/.test(previous.s) && item.y - previous.y <= 15) {
      previous.s = previous.s.slice(0, -1) + item.s;
    } else {
      merged.push({ ...item });
    }
  }
  return merged;
};

const cleanForm = raw => {
  let value = raw.trim();
  if (!value || isBlank(value) || isMarker(value) || isPageNumber(value)) {
    return undefined;
  }
  if (value.includes('(') || value.includes(')') || value.includes('*')) {
    return undefined;
  }
  value = value.replace(/[,;]+$/u, '').trim();
  if (!value || /\s/u.test(value)) {
    return undefined;
  }
  return value.normalize('NFC').toLocaleLowerCase();
};

const isValidForm = value => /^[a-zñüç'/-]+$/u.test(value) && value.length > 1;

const splitVariants = value => value.split('/').map(part => part.trim()).filter(Boolean);

const alignForms = (forms, baselines) => {
  const rows = Array.from({ length: 7 }, () => []);
  if (forms.length === 0) {
    return rows;
  }
  if (forms.length >= 7) {
    for (let index = 0; index < forms.length; index += 1) {
      rows[Math.min(index, 6)].push(forms[index]);
    }
    return rows;
  }

  const baselineRows = baselines.slice(0, 7).map(item => item.y);
  for (const form of forms) {
    let closest = 0;
    let distance = Infinity;
    for (let index = 0; index < baselineRows.length; index += 1) {
      const candidate = Math.abs(baselineRows[index] - form.y);
      if (candidate < distance) {
        distance = candidate;
        closest = index;
      }
    }
    if (distance <= 6) {
      rows[closest].push(form);
    }
  }
  return rows;
};

const entries = new Map();
const stats = {
  pages: 0,
  groups: 0,
  columns: 0,
  analyses: 0,
  skipped: 0,
  anomalies: [],
  knownChecks: [],
};

const addAnalysis = (form, analysis) => {
  const word = normalize(form);
  if (!isValidForm(word)) {
    stats.skipped += 1;
    return;
  }
  const key = JSON.stringify([
    analysis.lemma,
    analysis.paradigm,
    analysis.tense,
    analysis.mode,
    analysis.subtype ?? '',
    analysis.persons.nor ?? '',
    analysis.persons.nori ?? '',
    analysis.persons.nork ?? '',
    analysis.allocutive ?? '',
  ]);
  let entry = entries.get(word);
  if (!entry) {
    entry = { word, analyses: [] };
    entries.set(word, entry);
  }
  if (entry.analyses.some(existing => existing.key === key)) {
    return;
  }
  entry.analyses.push({ key, ...analysis });
  stats.analyses += 1;
};

const data = new Uint8Array(readFileSync(PDF_PATH));
const document = await getDocument({
  data,
  useWorkerFetch: false,
  isEvalSupported: false,
  useSystemFonts: true,
}).promise;

for (const [pageNumber, specs] of [...pageSpecs.entries()].sort(([a], [b]) => a - b)) {
  const page = await document.getPage(pageNumber);
  const viewport = page.getViewport({ scale: 1 });
  const textContent = await page.getTextContent();
  const items = textContent.items
    .filter(item => item.str.trim())
    .map(item => {
      const transform = Util.transform(viewport.transform, item.transform);
      return { s: item.str, x: transform[4], y: transform[5] };
    });
  const rows = groupRows(items);
  const rawLabelRows = rows.filter(row => row.items.some(item => isLabel(item.s)));
  const labelRows = [];
  for (const row of rawLabelRows) {
    const previous = labelRows[labelRows.length - 1];
    if (previous && row.y - previous.y <= 12) {
      previous.items.push(...row.items);
      previous.items.sort((a, b) => a.x - b.x);
      previous.y = Math.min(previous.y, row.y);
    } else {
      labelRows.push({ y: row.y, items: [...row.items] });
    }
  }

  if (labelRows.length !== specs.length) {
    stats.anomalies.push({
      type: 'label-rows',
      page: pageNumber,
      expected: specs.length,
      got: labelRows.length,
    });
    continue;
  }

  stats.pages += 1;

  for (let groupIndex = 0; groupIndex < specs.length; groupIndex += 1) {
    const spec = specs[groupIndex];
    const labelRow = labelRows[groupIndex];
    const nextLabelY = labelRows[groupIndex + 1]?.y ?? Number.POSITIVE_INFINITY;
    const groupItems = items.filter(
      item =>
        item.y > labelRow.y - 0.5 &&
        item.y < nextLabelY - 0.5 &&
        !isLabelItem(item)
    );

    const formColumns = [];
    for (const cluster of clusterByX(groupItems)) {
      const sorted = [...cluster.items].sort((a, b) => a.y - b.y || a.x - b.x);
      if (!sorted.length) {
        continue;
      }
      const firstY = sorted[0].y;
      if (firstY < labelRow.y + 4 || firstY > labelRow.y + 35) {
        continue;
      }
      const kept = [];
      let previousY;
      for (const item of sorted) {
        if (previousY !== undefined && item.y - previousY > 20) {
          break;
        }
        kept.push(item);
        previousY = item.y;
      }
      const forms = mergeColumnItems(kept);
      if (forms.length < 5) {
        continue;
      }
      formColumns.push({ x: cluster.x, forms });
    }

    formColumns.sort((a, b) => a.x - b.x);
    const expectedColumns = spec.chunks.reduce((total, chunk) => total + chunk.columns.length, 0);
    if (formColumns.length !== expectedColumns) {
      stats.anomalies.push({
        type: 'columns',
        page: pageNumber,
        group: groupIndex,
        expected: expectedColumns,
        got: formColumns.length,
        columns: formColumns.map(column => ({
          x: Math.round(column.x),
          forms: column.forms.map(form => form.s),
        })),
      });
    }

    let columnIndex = 0;
    for (const chunk of spec.chunks) {
      const chunkColumns = formColumns.slice(columnIndex, columnIndex + chunk.columns.length);
      columnIndex += chunk.columns.length;
      const baselineColumn = chunkColumns.find(column => column.forms.length >= 7) ?? chunkColumns[0];
      const baselines = baselineColumn?.forms ?? [];

      for (let index = 0; index < chunk.columns.length; index += 1) {
        const column = chunkColumns[index];
        if (!column) {
          continue;
        }
        const columnSpec = chunk.columns[index];
        stats.columns += 1;

        if (column.forms.length !== 7) {
          stats.anomalies.push({
            type: 'form-count',
            page: pageNumber,
            group: groupIndex,
            column: index + 1,
            x: Math.round(column.x),
            count: column.forms.length,
            forms: column.forms.map(form => form.s),
          });
        }

        const aligned = alignForms(column.forms, baselines);
        for (let rowIndex = 0; rowIndex < 7; rowIndex += 1) {
          const rowPerson = ROWS[spec.rowsType][rowIndex];
          for (const formItem of aligned[rowIndex]) {
            const cleaned = cleanForm(formItem.s);
            if (!cleaned) {
              stats.skipped += 1;
              continue;
            }
            const variants = splitVariants(cleaned);
            for (let variantIndex = 0; variantIndex < variants.length; variantIndex += 1) {
              const form = variants[variantIndex];
              const persons = { ...chunk.fixed };
              if (columnSpec.personRole) {
                persons[columnSpec.personRole] = columnSpec.person;
              }
              persons[spec.rowsType] = rowPerson;
              const allocutive = variants.length === 2 ? (variantIndex === 0 ? 'm' : 'f') : undefined;
              addAnalysis(form, {
                lemma: spec.auxiliary,
                kind: 'auxiliary',
                paradigm: spec.paradigm,
                tense: columnSpec.tense,
                mode: columnSpec.mode,
                ...(columnSpec.subtype ? { subtype: columnSpec.subtype } : {}),
                persons,
                ...(allocutive ? { allocutive } : {}),
                meaning: LEMMA_MEANING[spec.auxiliary],
                source: { page: pageNumber, table: columnSpec.table ?? 'C' },
              });
            }
          }
        }
      }
    }
    stats.groups += 1;
  }
}

const manualPatches = [
  {
    word: 'daitezke',
    analysis: {
      lemma: 'izan',
      kind: 'auxiliary',
      paradigm: 'nor',
      tense: 'orain',
      mode: 'ke',
      subtype: 'potential',
      persons: { nor: 'haiek' },
      meaning: LEMMA_MEANING.izan,
      source: {
        page: 8,
        table: 'A-5',
        note: 'Forma inferida; no aparece en el PDF (fila haiek).',
      },
    },
  },
  {
    word: 'niezazkieke',
    analysis: {
      lemma: 'ezan',
      kind: 'auxiliary',
      paradigm: 'zer-nori-nork',
      tense: 'alegiazko',
      mode: 'ahala',
      subtype: 'conditional-ba',
      persons: { nor: 'haiek', nork: 'nik', nori: 'haiei' },
      meaning: LEMMA_MEANING.ezan,
      source: {
        page: 59,
        table: 'B-7',
        note: 'Forma inferida; no aparece en el PDF (fila haiei).',
      },
    },
  },
];

for (const patch of manualPatches) {
  addAnalysis(patch.word, patch.analysis);
}

const known = [
  'naiz',
  'nintzen',
  'dut',
  'didate',
  'nauk',
  'naun',
  'zait',
  'zaik',
  'zain',
  'nazak',
  'nazan',
  'iezadak',
  'iezadan',
  'naiteke',
  'daitezke',
  'zaitezkete',
];
for (const word of known) {
  const entry = entries.get(word);
  stats.knownChecks.push({
    word,
    found: Boolean(entry),
    analyses: entry?.analyses.length ?? 0,
    sample: entry?.analyses[0],
  });
}

const sortedEntries = [...entries.values()]
  .map(entry => ({
    word: entry.word,
    analyses: entry.analyses
      .map(({ key, ...analysis }) => analysis)
      .sort((a, b) =>
        [
          a.lemma,
          a.paradigm,
          a.tense,
          a.mode,
          a.subtype ?? '',
          a.persons.nor ?? '',
          a.persons.nori ?? '',
          a.persons.nork ?? '',
          a.allocutive ?? '',
          String(a.source.page),
          a.source.table,
        ]
          .join('|')
          .localeCompare(
            [
              b.lemma,
              b.paradigm,
              b.tense,
              b.mode,
              b.subtype ?? '',
              b.persons.nor ?? '',
              b.persons.nori ?? '',
              b.persons.nork ?? '',
              b.allocutive ?? '',
              String(b.source.page),
              b.source.table,
            ].join('|'),
            'eu'
          )
      ),
  }))
  .sort((a, b) => a.word.localeCompare(b.word, 'eu'));

const byLetter = new Map();
for (const entry of sortedEntries) {
  const letter = assetLetterFor(entry.word);
  const list = byLetter.get(letter) ?? [];
  list.push(entry);
  byLetter.set(letter, list);
}

rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });

for (const [letter, list] of [...byLetter.entries()].sort(([a], [b]) => a.localeCompare(b, 'eu'))) {
  writeFileSync(join(OUT_DIR, `${letter}.json`), `${JSON.stringify(list, null, 2)}\n`);
}

writeFileSync(
  INDEX_FILE,
  `${JSON.stringify(sortedEntries.map(entry => entry.word), null, 2)}\n`
);

const countBy = selector => {
  const counts = new Map();
  for (const entry of sortedEntries) {
    for (const analysis of entry.analyses) {
      const key = selector(analysis);
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }
  return [...counts.entries()].sort(([a], [b]) => String(a).localeCompare(String(b), 'eu'));
};

const report = [
  '# Basque auxiliary verb data',
  '',
  `Source: \`${PDF_PATH}\` (Euskaltzaindia, *Aditz laguntzaile batua*, 78. araua).`,
  '',
  '## Totals',
  '',
  `- Pages parsed: ${stats.pages}`,
  `- Table groups: ${stats.groups}`,
  `- Columns: ${stats.columns}`,
  `- Entries: ${sortedEntries.length}`,
  `- Analyses: ${stats.analyses}`,
  `- Skipped fragments: ${stats.skipped}`,
  '',
  '## By auxiliary',
  '',
  ...countBy(analysis => analysis.lemma).map(([key, count]) => `- ${key}: ${count}`),
  '',
  '## By paradigm',
  '',
  ...countBy(analysis => analysis.paradigm).map(([key, count]) => `- ${key}: ${count}`),
  '',
  '## By tense',
  '',
  ...countBy(analysis => analysis.tense).map(([key, count]) => `- ${key}: ${count}`),
  '',
  '## Known checks',
  '',
  ...stats.knownChecks.map(
    check =>
      `- \`${check.word}\`: ${check.found ? 'found' : 'MISSING'} (${check.analyses} analyses)` +
      (check.sample
        ? ` — ${check.sample.lemma}, ${check.sample.paradigm}, ${check.sample.tense}, ${check.sample.mode}, ${JSON.stringify(check.sample.persons)}`
        : '')
  ),
  '',
  '## Manual patches',
  '',
  ...manualPatches.map(
    patch =>
      `- \`${patch.word}\`: ${patch.analysis.source.note} ` +
      `(${patch.analysis.lemma}, ${patch.analysis.paradigm}, ${patch.analysis.tense}, ${JSON.stringify(patch.analysis.persons)})`
  ),
  '',
  '## Anomalies',
  '',
  ...(stats.anomalies.length
    ? stats.anomalies.map(anomaly => `- \`${JSON.stringify(anomaly)}\``)
    : ['- None']),
  '',
];

writeFileSync(REPORT_FILE, report.join('\n'));

console.log(
  `[verbs] ${sortedEntries.length} entries, ${stats.analyses} analyses -> ${OUT_DIR}`
);
console.log(`[verbs] report -> ${REPORT_FILE}`);
