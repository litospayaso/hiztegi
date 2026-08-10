import { getDocument } from 'pdfjs-dist';
import { WorkerMessageHandler } from 'pdfjs-dist/build/pdf.worker.mjs';
import type { ParsedBook, ParsedChapter } from '../types';

const setupMainThreadWorker = (): void => {
  (globalThis as { pdfjsWorker?: { WorkerMessageHandler: unknown } }).pdfjsWorker = {
    WorkerMessageHandler,
  };
};

export const parsePdf = async (file: File): Promise<ParsedBook> => {
  setupMainThreadWorker();
  const data = await file.arrayBuffer();
  const pdf = await getDocument({ data: new Uint8Array(data) }).promise;

  const chapters: ParsedChapter[] = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    let text = '';
    for (const item of content.items) {
      const partial = item as { str?: string; hasEOL?: boolean };
      if (!partial.str) {
        continue;
      }
      text += partial.str;
      text += partial.hasEOL ? '\n' : ' ';
    }
    chapters.push({
      title: String(chapters.length + 1),
      text: text.trim(),
    });
  }

  const metadata = await pdf.getMetadata().catch(() => null);
  const info = metadata?.info as { Title?: unknown } | undefined;
  const metaTitle = typeof info?.Title === 'string' ? info.Title.trim() : '';
  const title =
    metaTitle || file.name.replace(/\.[^.]+$/, '').trim() || 'Untitled';

  await pdf.destroy();

  return { title, chapters };
};
