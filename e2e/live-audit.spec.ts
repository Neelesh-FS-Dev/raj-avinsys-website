import { devices, expect, test } from '@playwright/test';

/**
 * Read-only responsiveness audit of the LIVE rajgrouponline.com site, for comparison.
 * Enabled only with LIVE_AUDIT=1, so normal runs never touch the production site.
 */
const liveRoutes = [
  '#/',
  '#/about',
  '#/services',
  '#/services/turnkey-electrification',
  '#/services/switchyard-works',
  '#/services/sandwich-busways',
  '#/services/retrofitting',
  '#/services/liaising-compliance',
  '#/services/panel-manufacturing',
  '#/projects',
  '#/certificates',
  '#/clientele',
  '#/careers',
  '#/blog',
  '#/contact',
];

function emulate(descriptor: (typeof devices)[string]) {
  const { defaultBrowserType: _browser, ...rest } = descriptor as typeof descriptor & { defaultBrowserType?: string };
  return rest;
}

const profiles = [
  { name: 'iPhone SE (375px)', use: emulate(devices['iPhone SE']) },
  { name: 'Pixel 7', use: emulate(devices['Pixel 7']) },
  { name: 'iPad Mini (768px)', use: emulate(devices['iPad Mini']) },
  { name: 'Desktop 1440px', use: { viewport: { width: 1440, height: 900 } } },
];

test.skip(!process.env.LIVE_AUDIT, 'Set LIVE_AUDIT=1 to run the live-site comparison.');

for (const profile of profiles) {
  test.describe(profile.name, () => {
    test.use(profile.use as never);
    for (const route of liveRoutes) {
      test(`live overflow ${route}`, async ({ page }) => {
        const response = await page.goto(`https://www.rajgrouponline.com/${route}`, { waitUntil: 'networkidle' });
        expect(response?.status()).toBeLessThan(400);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        test.info().annotations.push({ type: 'overflow-px', description: String(overflow) });
        expect.soft(overflow, `horizontal overflow on live ${route}`).toBeLessThanOrEqual(0);
      });
    }
  });
}
