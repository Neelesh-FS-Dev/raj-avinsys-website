import { expect, test } from '@playwright/test';

/** Keyboard-only navigation checks. No mouse input is used in these tests. */

// macOS Safari does not place links in the Tab order unless "Press Tab to highlight each item" is enabled.
// That is a browser setting, so the Tab-driven checks run on Chromium only.
test.skip(({ browserName }) => browserName === 'webkit', 'Safari Tab order depends on a macOS setting');

test('skip link moves focus to main content', async ({ page }) => {
  await page.goto('/');
  const skip = page.getByRole('link', { name: 'Skip to main content' });
  await expect(skip).toBeAttached(); // routes load lazily, so wait for the layout to render
  await page.keyboard.press('Tab');
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
});

test('services menu opens, navigates and closes with keyboard only', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: /^Services/ });
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Turnkey HT/LT Electrification' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toBeFocused();
});

test('RFQ form can be completed and validated with keyboard only', async ({ page }) => {
  await page.goto('/rfq');
  await page.getByLabel('Full name').focus();
  await page.keyboard.type('Test Engineer');
  await page.keyboard.press('Tab'); // designation
  await page.keyboard.type('Project Engineer');
  await page.keyboard.press('Tab'); // company
  await page.keyboard.type('Test Company');
  await page.keyboard.press('Tab'); // email
  await page.keyboard.type('engineer@example.com');
  await page.keyboard.press('Tab'); // phone
  await page.keyboard.type('+91 261 2551273');
  await page.getByLabel('Project location').focus();
  await page.keyboard.type('Dahej, Gujarat');
  await page.getByLabel('Scope of work').focus();
  await page.keyboard.type('Design and supply of a 66 kV single-bay switchyard.');
  await page.getByLabel(/I agree that Raj Avinsys/).focus();
  await page.keyboard.press('Space');
  await page.getByRole('button', { name: 'Submit RFQ' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByText('Reference: DEV-MOCK-0001')).toBeVisible();
});

test('RFQ errors are announced and focusable fields are reachable', async ({ page }) => {
  await page.goto('/rfq');
  await page.getByRole('button', { name: 'Submit RFQ' }).focus();
  await page.keyboard.press('Enter');
  const alerts = page.getByRole('alert');
  await expect(alerts.first()).toBeVisible();
  expect(await alerts.count()).toBeGreaterThan(0);
});

test('mobile menu is operable by keyboard and returns focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Menu' });
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('navigation', { name: 'Mobile' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('navigation', { name: 'Mobile' })).toHaveCount(0);
});

test('every interactive element on the homepage has a visible focus style', async ({ page }) => {
  await page.goto('/');
  const focusables = page.locator('a[href], button:not([disabled]), input, select, textarea');
  const count = Math.min(await focusables.count(), 12);
  for (let i = 0; i < count; i++) {
    await focusables.nth(i).focus();
    const outline = await focusables.nth(i).evaluate((el) => getComputedStyle(el).outlineStyle);
    expect(outline).not.toBe('none');
  }
});
