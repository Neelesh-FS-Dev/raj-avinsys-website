import { expect, test } from '@playwright/test';

test.describe('Homepage and navigation', () => {
  test('homepage loads with a single H1 and primary navigation', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Reliable power for Gujarat');
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
    await expect(page).toHaveTitle(/Raj Avinsys/);
  });

  test('services dropdown opens a service page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /^Services/ }).click();
    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Switchyard Works up to 220 kV' }).click();
    await expect(page).toHaveURL(/\/services\/switchyard-works$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Switchyard Works up to 220 kV');
    await expect(page.getByRole('table')).toBeVisible();
  });

  test('invalid routes show a 404 page with noindex', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  });

  test('unknown service slug renders the 404 page', async ({ page }) => {
    await page.goto('/services/not-a-service');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found');
  });
});

test.describe('Projects', () => {
  test('voltage filter in the URL narrows the list', async ({ page }) => {
    await page.goto('/projects?voltage=220%20kV');
    await expect(page.getByText(/Showing \d+ of \d+ projects/)).toBeVisible();
    const text = await page.getByText(/Showing \d+ of \d+ projects/).textContent();
    expect(text).toMatch(/Showing [1-9]\d* of/);
    await expect(page.getByRole('link', { name: /Switchyard works/ }).first()).toBeVisible();
  });

  test('a project detail page loads and does not show a client name', async ({ page }) => {
    await page.goto('/projects');
    await page.locator('ul a[href^="/projects/"]').first().click();
    await expect(page).toHaveURL(/\/projects\/.+/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('Alkyl Amines')).toHaveCount(0);
  });
});

test.describe('RFQ form (dev server with mock enabled)', () => {
  test('empty submit shows validation errors and sends nothing', async ({ page }) => {
    await page.goto('/rfq');
    await page.getByRole('button', { name: 'Submit RFQ' }).click();
    await expect(page.getByText('Full name must be at least 2 characters.')).toBeVisible();
    await expect(page.getByText('Describe the scope in at least 20 characters.')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Thank you/ })).toHaveCount(0);
  });

  test('disallowed attachment types are rejected', async ({ page }) => {
    await page.goto('/rfq');
    await page.locator('#attachments').setInputFiles({
      name: 'payload.exe',
      mimeType: 'application/octet-stream',
      buffer: Buffer.from('MZ'),
    });
    await expect(page.getByText(/only PDF, XLS and XLSX files are accepted/)).toBeVisible();
  });

  test('a valid enquiry shows a confirmation with a reference', async ({ page }) => {
    await page.goto('/rfq?service=switchyard-works');
    await page.getByLabel('Full name').fill('Test Engineer');
    await page.getByLabel('Designation').fill('Project Engineer');
    await page.getByLabel('Company name').fill('Test Company');
    await page.getByLabel('Work email').fill('engineer@example.com');
    await page.getByLabel('Phone number').fill('+91 261 2551273');
    await page.getByLabel('Project location').fill('Dahej, Gujarat');
    await page.getByLabel('Scope of work').fill('Design and supply of a 66 kV single-bay switchyard.');
    await page.getByLabel(/I agree that Raj Avinsys/).check();
    await page.getByRole('button', { name: 'Submit RFQ' }).click();
    await expect(page.getByText('Reference: DEV-MOCK-0001')).toBeVisible();
  });
});

test.describe('Responsive behaviour', () => {
  for (const width of [320, 390, 768, 1280]) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test('mobile navigation opens and lists services', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.getByRole('button', { name: 'Menu' }).click();
    const mobileNav = page.getByRole('navigation', { name: 'Mobile' });
    await expect(mobileNav).toBeVisible();
    await expect(mobileNav.getByRole('link', { name: 'Sandwich Busways' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(mobileNav).toHaveCount(0);
  });
});
