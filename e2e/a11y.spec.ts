import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { projects } from '../src/data/projects';
import { services } from '../src/data/services';

const routes = [
  '/',
  '/about',
  '/services',
  ...services.map((service) => `/services/${service.slug}`),
  '/projects',
  '/industries',
  `/projects/${projects[0]?.slug ?? ''}`,
  '/certifications',
  '/clients',
  '/careers',
  '/contact',
  '/rfq',
  '/no-such-page',
];

for (const route of routes) {
  test(`WCAG 2.2 AA scan: ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState('networkidle');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    const summary = results.violations.flatMap((v) => [
      `${v.id} (${v.impact}): ${v.nodes.length} node(s) — ${v.help}`,
      ...v.nodes.map((n) => `    ${n.target.join(' ')} :: ${n.html.slice(0, 140)}`),
    ]);
    expect(summary, summary.join('\n')).toEqual([]);
  });
}
