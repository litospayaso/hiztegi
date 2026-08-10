import JSZip from 'jszip';
import type { ParsedBook, ParsedChapter } from '../types';

const CONTENT_MEDIA_TYPES = new Set(['application/xhtml+xml', 'text/html', 'text/xml', 'application/xml']);
const BLOCK_TAGS = new Set([
  'P',
  'DIV',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'LI',
  'BLOCKQUOTE',
  'SECTION',
  'ARTICLE',
  'BR',
  'UL',
  'OL',
  'TABLE',
  'TR',
]);

const resolveZipPath = (baseDir: string, href: string): string => {
  const url = new URL(href, `https://base.local/${baseDir}/`);
  return decodeURIComponent(url.pathname).replace(/^\/+/, '');
};

const isContentDocument = (mediaType: string, href: string): boolean =>
  CONTENT_MEDIA_TYPES.has(mediaType) || /\.(x?html?|xml)$/i.test(href);

const extractNodeText = (node: Node): string => {
  let result = '';
  node.childNodes.forEach(child => {
    if (child.nodeType === Node.TEXT_NODE) {
      result += child.textContent;
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      const element = child as HTMLElement;
      result += extractNodeText(element);
      if (BLOCK_TAGS.has(element.tagName)) {
        result += '\n';
      }
    }
  });
  return result;
};

const normalizeText = (text: string): string =>
  text
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const parseContentDocument = (content: string): { title: string; text: string } => {
  const doc = new DOMParser().parseFromString(content, 'text/html');
  const body = doc.body;
  if (!body) {
    return { title: '', text: content.trim() };
  }
  body.querySelectorAll('script, style, nav').forEach(element => element.remove());
  const heading = body.querySelector('h1, h2, h3')?.textContent?.trim() ?? '';
  return { title: heading, text: normalizeText(extractNodeText(body)) };
};

export const parseEpub = async (file: File): Promise<ParsedBook> => {
  const zip = await JSZip.loadAsync(await file.arrayBuffer());

  const containerXml = await zip.file('META-INF/container.xml')?.async('string');
  if (!containerXml) {
    throw new Error('Invalid EPUB: missing META-INF/container.xml');
  }
  const containerDoc = new DOMParser().parseFromString(containerXml, 'application/xml');
  const rootfilePath = Array.from(containerDoc.getElementsByTagName('rootfile'))
    .map(rootfile => rootfile.getAttribute('full-path'))
    .find(Boolean);
  if (!rootfilePath) {
    throw new Error('Invalid EPUB: no rootfile found in container.xml');
  }

  const opfXml = await zip.file(rootfilePath)?.async('string');
  if (!opfXml) {
    throw new Error(`Invalid EPUB: missing OPF file "${rootfilePath}"`);
  }
  const opfDoc = new DOMParser().parseFromString(opfXml, 'application/xml');
  const opfDir = rootfilePath.split('/').slice(0, -1).join('/');

  const title =
    opfDoc.getElementsByTagNameNS('http://purl.org/dc/elements/1.1/', 'title')[0]?.textContent?.trim() ||
    file.name.replace(/\.[^.]+$/, '').trim() ||
    'Untitled';

  const manifest = new Map<string, { href: string; mediaType: string }>();
  Array.from(opfDoc.getElementsByTagName('item')).forEach(item => {
    const id = item.getAttribute('id');
    const href = item.getAttribute('href');
    const mediaType = item.getAttribute('media-type') ?? '';
    if (id && href) {
      manifest.set(id, { href, mediaType });
    }
  });

  const spine: { href: string; mediaType: string }[] = [];
  Array.from(opfDoc.getElementsByTagName('itemref')).forEach(itemref => {
    const idref = itemref.getAttribute('idref');
    const item = idref ? manifest.get(idref) : undefined;
    if (item) {
      spine.push(item);
    }
  });

  const chapters: ParsedChapter[] = [];
  for (const { href, mediaType } of spine) {
    if (!isContentDocument(mediaType, href)) {
      continue;
    }
    const path = resolveZipPath(opfDir, href);
    const content = await zip.file(path)?.async('string');
    if (content === undefined) {
      continue;
    }
    const parsed = parseContentDocument(content);
    chapters.push({
      title: parsed.title || String(chapters.length + 1),
      text: parsed.text,
    });
  }

  return { title, chapters };
};
