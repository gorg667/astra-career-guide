import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  parseGuide,
  calculateLoan,
  searchChapters,
  slugify,
} from '../src/logic';
import { careers, phases } from '../src/data';

const source = readFileSync(
  new URL('../CS_CE_Career_Guide_2027.md', import.meta.url),
  'utf8',
);
const chapters = parseGuide(source);
const anchors = chapters.flatMap((c) => [
  c.id,
  ...c.anchors,
  ...c.subsections.map((s) => s.id),
]);

test('parses all 23 chapters in canonical order', () => {
  assert.equal(chapters.length, 23);
  assert.deepEqual(
    chapters.map((c) => c.number),
    Array.from({ length: 23 }, (_, i) => i + 1),
  );
  assert.equal(chapters[0].id, 'verdict');
  assert.equal(chapters.at(-1)?.id, 'references');
  assert.ok(chapters.every((c) => c.markdown.length > 100 && c.minutes > 0));
});
test('preserves every numbered chapter body and subsection', () => {
  const expected = [...source.matchAll(/^### (\d+\.\d+ .+)$/gm)];
  assert.equal(
    chapters.reduce((n, c) => n + c.subsections.length, 0),
    expected.length,
  );
  for (const heading of expected)
    assert.ok(anchors.includes(slugify(heading[1])), heading[1]);
  const renderedText = chapters.map((c) => c.markdown).join('\n');
  for (const tableRow of source
    .slice(source.indexOf('<a id="verdict">'))
    .split('\n')
    .filter((line) => line.startsWith('|')))
    assert.ok(renderedText.includes(tableRow));
});
test('all explicit anchors and guide-internal links resolve uniquely', () => {
  assert.equal(anchors.length, new Set(anchors).size);
  for (const m of source.matchAll(/<a id="([^"]+)"><\/a>/g))
    assert.ok(anchors.includes(m[1]), m[1]);
  for (const m of source.matchAll(/\]\(#([^\)]+)\)/g))
    assert.ok(anchors.includes(m[1]), m[1]);
  for (let i = 1; i <= 33; i++)
    assert.ok(chapters[22].anchors.includes(`ref-${i}`));
});
test('every curated career, roadmap and tool link resolves', () => {
  assert.equal(careers.length, 12);
  assert.equal(phases.length, 5);
  for (const item of [...careers, ...phases])
    assert.ok(anchors.includes(item.anchor), item.anchor);
  for (const file of ['tools.tsx', 'pages.tsx']) {
    const code = readFileSync(
      new URL(`../src/${file}`, import.meta.url),
      'utf8',
    );
    for (const m of code.matchAll(/guideLink\('([^']+)'\)/g))
      assert.ok(anchors.includes(m[1]), m[1]);
  }
});
test('matches the guide’s loan examples without premature rounding', () => {
  assert.ok(Math.abs(calculateLoan(30000, 7, 10)!.monthly - 348.33) < 0.01);
  assert.ok(Math.abs(calculateLoan(80000, 7, 10)!.monthly - 928.87) < 0.01);
  assert.ok(Math.abs(calculateLoan(120000, 7, 10)!.monthly - 1393.3) < 0.01);
  const loan = calculateLoan(30000, 7, 10)!;
  assert.equal(loan.total, loan.monthly * 120);
  assert.equal(loan.interest, loan.total - 30000);
});
test('handles zero-rate, zero-balance and invalid loans', () => {
  assert.equal(calculateLoan(30000, 0, 10)?.monthly, 250);
  assert.equal(calculateLoan(0, 7, 10)?.total, 0);
  for (const values of [
    [-1, 7, 10],
    [100, -1, 10],
    [100, 7, 0],
    [NaN, 7, 10],
    [Infinity, 7, 10],
    [100, 7, 0.001],
  ])
    assert.equal(calculateLoan(...(values as [number, number, number])), null);
});
test('search finds body text, has empty states and returns valid deep links', () => {
  assert.equal(searchChapters(chapters, '   ').length, 0);
  assert.equal(searchChapters(chapters, 'zzzzimpossiblesearch').length, 0);
  for (const query of [
    'internships',
    'borrowing',
    'FIFO',
    '7%',
    'CS versus CE',
    '  embedded  ',
  ]) {
    const results = searchChapters(chapters, query);
    assert.ok(results.length > 0, query);
    for (const result of results)
      if (result.anchor)
        assert.ok(anchors.includes(result.anchor), result.anchor);
  }
  const result = searchChapters(chapters, 'Parent PLUS').find(
    (r) => r.chapter.id === 'money',
  );
  assert.ok(result);
  assert.match(result.anchor, /109-/);
});
