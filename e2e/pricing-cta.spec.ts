import { expect, test } from '@playwright/test';

test.describe('Pricing CTA -> demo form', () => {
  test('clicking a plan CTA preselects its operación size in the #demo form', async ({ page }) => {
    await page.goto('/');

    // Read the expected size off the CTA itself instead of hardcoding the copy:
    // what this asserts is the CTA -> form wiring, not how many sedes the plan
    // happens to quote this quarter.
    const profesionalCta = page.locator('.plan-cta[data-plan-name="Profesional"]').first();
    await profesionalCta.scrollIntoViewIfNeeded();
    const size = await profesionalCta.getAttribute('data-plan-size');
    expect(size).toBeTruthy();

    await profesionalCta.click();

    const radio = page.locator(`input[name="tamano_operacion"][value="${size}"]`);
    await expect(radio).toBeChecked();
  });
});
