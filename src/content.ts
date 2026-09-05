import source from '../CS_CE_Career_Guide_2027.md?raw';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { parseGuide, slugify } from './logic';
export const guideSource = source;
export const chapters = parseGuide(source);
export const anchorChapter = new Map<string, string>();
chapters.forEach((chapter) => {
  anchorChapter.set(chapter.id, chapter.id);
  chapter.anchors.forEach((anchor) => anchorChapter.set(anchor, chapter.id));
  chapter.subsections.forEach((sub) => anchorChapter.set(sub.id, chapter.id));
});
const renderer = new marked.Renderer();
// Rewrite before sanitization so citations also work when opened in a new tab.
renderer.link = (token) =>
  marked.Renderer.prototype.link.call(renderer, {
    ...token,
    href: token.href.startsWith('#')
      ? guideLink(token.href.slice(1))
      : token.href,
  });
renderer.heading = ({ tokens, depth, text }) =>
  `<h${depth} id="${slugify(text)}">${renderer.parser.parseInline(tokens)}</h${depth}>`;
renderer.table = (token) =>
  `<div class="table-scroll" tabindex="0" role="region" aria-label="Scrollable data table">${marked.Renderer.prototype.table.call(renderer, token)}</div>`;
export function renderMarkdown(md: string): string {
  return DOMPurify.sanitize(
    marked.parse(md, { renderer, async: false }) as string,
    { ADD_ATTR: ['tabindex'] },
  );
}
export function guideLink(anchor: string) {
  const chapter = anchorChapter.get(anchor) || anchor;
  return `#/guide/${chapter}${chapter !== anchor ? `/${anchor}` : ''}`;
}
export const chapterNames = [
  'The short answer',
  'Define your priorities',
  'The labor-market evidence',
  'CS vs. computer engineering',
  'Compare career paths',
  'Software, data & AI',
  'Hardware & the physical world',
  'Research & adjacent paths',
  'AI & the 2031 labor market',
  'Money, cost & financial risk',
  'Choose your education',
  'Your college roadmap',
  'Build meaningful projects',
  'Internships & your first job',
  'Graduate school',
  'Location & access constraints',
  'Find your starting point',
  'Decision worksheets',
  'Myths & failure modes',
  'Your first decade',
  'When to change the plan',
  'Glossary',
  'Sources & evidence notes',
];
export const groups = [
  { title: 'Start with the fundamentals', start: 0, end: 5 },
  { title: 'Explore the work', start: 5, end: 9 },
  { title: 'Build your route in', start: 9, end: 16 },
  { title: 'Make a resilient plan', start: 16, end: 21 },
  { title: 'Keep the evidence close', start: 21, end: 23 },
];
