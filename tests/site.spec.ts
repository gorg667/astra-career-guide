import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { parseGuide } from '../src/logic';
import { phases } from '../src/data';
const base = process.env.SITE_URL || 'http://localhost:3000/';
const go = (path = '') => `${base}#/${path}`;
test.use({ viewport: { width: 1440, height: 1000 } });

test('overview, full Markdown download and chapter filter', async ({
  page,
}) => {
  await page.goto(go());
  await expect(page.locator('h1')).toContainText('A clearer path');
  const pending = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download the full guide' }).click();
  const file = await pending;
  expect(readFileSync((await file.path())!, 'utf8')).toBe(
    readFileSync('CS_CE_Career_Guide_2027.md', 'utf8'),
  );
  await page.goto(go('guide'));
  await expect(page.locator('.chapter-row')).toHaveCount(23);
  await page
    .getByRole('textbox', { name: 'Filter chapter titles' })
    .fill('money');
  await expect(page.locator('.chapter-row')).toHaveCount(1);
});
test('all 23 chapters preserve headings, reference anchors and routed citations', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(err.message));
  for (const chapter of parseGuide(
    readFileSync('CS_CE_Career_Guide_2027.md', 'utf8'),
  )) {
    await page.goto(go(`guide/${chapter.id}`));
    await expect(page.locator('.reader-header h1')).toHaveText(chapter.title);
    await expect(page.locator('.prose h3')).toHaveCount(
      chapter.subsections.length,
    );
    expect(
      await page.locator('.prose a[href^="#"]:not([href^="#/guide/"])').count(),
    ).toBe(0);
    for (const anchor of chapter.anchors)
      await expect(page.locator(`[id="${anchor}"]`)).toHaveCount(1);
  }
  expect(errors).toEqual([]);
});
test('reader persistence, citations, back navigation and print', async ({
  page,
}) => {
  await page.goto(go('guide/verdict'));
  await page.getByRole('button', { name: 'Save chapter', exact: true }).click();
  await page.getByRole('button', { name: 'Larger text' }).click();
  await page.getByRole('button', { name: 'Mark as read' }).click();
  await page.reload();
  await expect(
    page.getByRole('button', { name: 'Saved', exact: true }),
  ).toBeVisible();
  await expect(page.locator('.prose')).toHaveClass(/large-text/);
  await expect(page.locator('.reading-progress')).toContainText('1 of 23');
  await page.goto(go('saved'));
  await expect(page.locator('.chapter-row')).toHaveCount(1);
  await page.goto(go('guide/evidence'));
  const citation = page.locator('.prose a[href*="/references/ref-"]').first();
  const href = await citation.getAttribute('href');
  await citation.click();
  await expect(page).toHaveURL(new RegExp(href!.replace('#', '\\#') + '$'));
  const id = href!.split('/').pop()!;
  await expect
    .poll(() =>
      page.evaluate(
        (id) => document.getElementById(id)!.getBoundingClientRect().top,
        id,
      ),
    )
    .toBeLessThan(200);
  await page.goBack();
  await expect(page.locator('h1')).toContainText('labor-market evidence');
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.sidebar')).not.toBeVisible();
  await expect(page.locator('.prose')).toBeVisible();
});
test('search shortcut, subsection destination and empty state', async ({
  page,
}) => {
  await page.goto(go());
  await page.keyboard.press('Control+k');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page
    .getByRole('textbox', { name: 'Search all 23 chapters' })
    .fill('Parent PLUS');
  await page.locator('.search-result[href*="/money/"]').click();
  await expect(page).toHaveURL(/guide\/money\/109-/);
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await page
    .getByRole('button', { name: 'Search the guide', exact: true })
    .click();
  await page
    .getByRole('textbox', { name: 'Search all 23 chapters' })
    .fill('nomatchzzzz');
  await expect(
    page.getByRole('heading', { name: 'No matching chapters' }),
  ).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
});
test('career filters, comparison limits and saved comparison', async ({
  page,
}) => {
  await page.goto(go('careers'));
  await expect(page.locator('.career-card')).toHaveCount(12);
  await page
    .getByRole('button', { name: 'Hardware & physical', exact: true })
    .click();
  await expect(page.locator('.career-card')).toHaveCount(3);
  await page.getByRole('button', { name: 'All paths', exact: true }).click();
  for (const name of [
    'Software engineering',
    'Systems & infrastructure',
    'Security engineering',
  ])
    await page
      .getByRole('button', { name: `Add ${name} to comparison`, exact: true })
      .click();
  await page
    .getByRole('button', {
      name: 'Add Data engineering to comparison',
      exact: true,
    })
    .click();
  await expect(page.getByRole('alert')).toContainText('up to three');
  await page
    .locator('.comparison-tray')
    .getByRole('link', { name: 'Compare paths' })
    .click();
  await expect(page.locator('.comparison-table thead th')).toHaveCount(4);
  await page.reload();
  await expect(page.locator('.comparison-table thead th')).toHaveCount(4);
  await page.getByLabel('Comparison path 3').selectOption('embedded');
  await expect(page.locator('.comparison-table thead')).toContainText(
    'Embedded & firmware',
  );
});
test('roadmap milestone persistence and all stage links', async ({ page }) => {
  await page.goto(go('roadmap'));
  await page.getByRole('checkbox').first().check();
  await page.reload();
  await expect(page.getByRole('checkbox').first()).toBeChecked();
  await expect(page.locator('.roadmap-summary')).toContainText('1 of 20');
  for (let i = 0; i < phases.length; i++) {
    await page.locator(`#phase-tab-${i}`).click();
    await expect(
      page.getByRole('link', { name: 'Read this stage in detail' }),
    ).toHaveAttribute('href', `#/guide/roadmap/${phases[i].anchor}`);
  }
  await page.getByRole('link', { name: 'Read this stage in detail' }).click();
  await expect(page.locator(`[id="${phases[4].anchor}"]`)).toBeFocused();
});
test('worksheet persistence, actual export and safe reset', async ({
  page,
}) => {
  await page.goto(go('plan'));
  await page
    .getByLabel('My provisional direction')
    .fill('Embedded firmware, with systems as an adjacent path.');
  await page.reload();
  await expect(page.getByLabel('My provisional direction')).toHaveValue(
    'Embedded firmware, with systems as an adjacent path.',
  );
  const pending = page.waitForEvent('download');
  await page
    .getByRole('button', { name: 'Export my plan (.md)', exact: true })
    .click();
  const file = await pending;
  expect(readFileSync((await file.path())!, 'utf8')).toContain(
    'Embedded firmware, with systems as an adjacent path.',
  );
  await page
    .getByRole('button', { name: 'Clear worksheet answers', exact: true })
    .click();
  await page.getByRole('button', { name: 'Cancel', exact: true }).click();
  await expect(page.getByLabel('My provisional direction')).not.toHaveValue('');
  await page
    .getByRole('button', { name: 'Clear worksheet answers', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Yes, clear answers', exact: true })
    .click();
  await expect(page.getByLabel('My provisional direction')).toHaveValue('');
});
test('calculator presets, zero interest and invalid input', async ({
  page,
}) => {
  await page.goto(go('calculator'));
  await expect(page.locator('.payment-amount')).toContainText('$348');
  await page.getByRole('button', { name: '$80,000', exact: true }).click();
  await expect(page.locator('.payment-amount')).toContainText('$929');
  await page.getByLabel('Annual fixed rate (%)').fill('0');
  await expect(page.locator('.payment-amount')).toContainText('$667');
  await page.getByLabel('Starting repayment balance ($)').fill('');
  await expect(
    page.getByRole('heading', { name: 'Check your assumptions' }),
  ).toBeVisible();
  await expect(page.locator('.cost-answer')).toContainText('$128,000');
  await page.getByLabel('Program A annual net cost').fill('60000');
  await expect(page.locator('.cost-answer')).toContainText('$0');
});
test('mobile focus trap, Escape and navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(go());
  const menu = page.getByRole('button', { name: 'Open navigation menu' });
  await menu.click();
  await expect(
    page.getByRole('button', { name: 'Close site navigation' }),
  ).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(
    page.getByRole('button', { name: 'Download the full guide' }),
  ).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('button', { name: 'Close site navigation' }),
  ).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await menu.click();
  await page
    .getByRole('link', { name: 'Explore careers', exact: true })
    .first()
    .click();
  await expect(page.locator('h1')).toContainText('Find work');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
});
test('five viewport widths have no page-wide overflow', async ({ page }) => {
  test.setTimeout(90000);
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      '',
      'guide/evidence',
      'guide/references',
      'careers',
      'compare',
      'roadmap',
      'plan',
      'calculator',
    ]) {
      await page.goto(go(path));
      await expect(page.locator('main h1')).toBeVisible();
      const s = await page.evaluate(() => ({
        w: document.documentElement.clientWidth,
        s: document.documentElement.scrollWidth,
      }));
      expect(s.s, `${path} at ${width}`).toBeLessThanOrEqual(s.w + 1);
    }
  }
});
test('unavailable storage fails gracefully', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = function () {
      throw new Error('Storage unavailable');
    };
  });
  await page.goto(go('plan'));
  await expect(page.getByRole('alert')).toContainText(
    'Browser storage is unavailable',
  );
  await page.getByLabel('My provisional direction').fill('Works in memory');
  await expect(page.getByLabel('My provisional direction')).toHaveValue(
    'Works in memory',
  );
});
