import { devices, expect, test, type Page } from '@playwright/test';
import { projects } from '../src/data/projects';
import { services } from '../src/data/services';

/** Every public route in the site, plus one unknown route to exercise the 404 page. */
const routes = [
  '/',
  '/about',
  '/services',
  ...services.map((service) => `/services/${service.slug}`),
  '/projects',
  '/industries',
  '/projects?voltage=220%20kV',
  ...[projects[0], projects.find((p) => p.category === 'busway'), projects.find((p) => p.voltage === '220 kV')]
    .filter((p): p is (typeof projects)[number] => p !== undefined)
    .map((project) => `/projects/${project.slug}`),
  '/certifications',
  '/clients',
  '/careers',
  '/contact',
  '/rfq',
  '/no-such-page',
];

/** Strips browser-engine selection: only Chromium is installed here, and viewport/touch emulation is what matters for layout. */
function emulate(descriptor: (typeof devices)[string]): Parameters<typeof test.use>[0] {
  const { defaultBrowserType: _browser, ...rest } = descriptor as typeof descriptor & { defaultBrowserType?: string };
  return rest;
}

/** Device profiles spanning the sizes the brief lists, plus a 320px floor. */
const profiles: Array<{ name: string; use: Parameters<typeof test.use>[0] }> = [
  { name: 'Small phone 320px', use: { viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true } },
  { name: 'iPhone SE', use: emulate(devices['iPhone SE']) },
  { name: 'Pixel 7', use: emulate(devices['Pixel 7']) },
  { name: 'Galaxy S9+ (360px)', use: emulate(devices['Galaxy S9+']) },
  { name: 'iPhone 14 Pro Max (430px)', use: emulate(devices['iPhone 14 Pro Max']) },
  { name: 'iPad Mini (768px)', use: emulate(devices['iPad Mini']) },
  { name: 'iPad Pro 11 landscape', use: emulate(devices['iPad Pro 11 landscape']) },
  { name: 'Laptop 1280px', use: { viewport: { width: 1280, height: 800 } } },
  { name: 'Desktop 1440px', use: { viewport: { width: 1440, height: 900 } } },
  { name: 'Full HD 1920px', use: { viewport: { width: 1920, height: 1080 } } },
  { name: 'Ultrawide 2560px', use: { viewport: { width: 2560, height: 1440 } } },
];

async function horizontalOverflow(page: Page): Promise<number> {
  return page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
}

for (const profile of profiles) {
  test.describe(`${profile.name}`, () => {
    test.use(profile.use);

    for (const route of routes) {
      test(`no horizontal overflow on ${route}`, async ({ page }) => {
        await page.goto(route);
        await page.waitForLoadState('networkidle');
        await expect(page.locator('main')).toBeVisible();
        expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
      });
    }

    test('primary navigation matches the breakpoint', async ({ page }) => {
      await page.goto('/');
      const width = page.viewportSize()?.width ?? 0;
      const desktopNav = page.getByRole('navigation', { name: 'Primary' });
      const menuButton = page.getByRole('button', { name: 'Menu' });
      if (width >= 1024) {
        await expect(desktopNav).toBeVisible();
        await expect(menuButton).toBeHidden();
      } else {
        await expect(desktopNav).toBeHidden();
        await expect(menuButton).toBeVisible();
      }
    });
  });
}
