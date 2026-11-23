import { devices, test } from '@playwright/test';

/** Visual QA captures for manual review. Run with: npx playwright test responsive-screenshots */
const out = process.env.SCREENSHOT_DIR ?? 'test-results/screens';
function emulate(descriptor: (typeof devices)[string]) {
  const { defaultBrowserType: _browser, ...rest } = descriptor as typeof descriptor & { defaultBrowserType?: string };
  return rest;
}

const targets = [
  { name: 'phone-320', use: { viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true } },
  { name: 'iphone-14-pro-max', use: emulate(devices['iPhone 14 Pro Max']) },
  { name: 'ipad-mini', use: emulate(devices['iPad Mini']) },
  { name: 'desktop-1440', use: { viewport: { width: 1440, height: 900 } } },
];
const pages = [
  ['home', '/'],
  ['services-switchyard', '/services/switchyard-works'],
  ['projects', '/projects'],
  ['rfq', '/rfq'],
];

for (const target of targets) {
  test.describe(target.name, () => {
    test.use(target.use);
    for (const [label, path] of pages) {
      test(`capture ${label}`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');
        await page.screenshot({ path: `${out}/${target.name}-${label}.png`, fullPage: true });
      });
    }
  });
}
