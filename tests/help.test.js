import { test, expect } from '@playwright/test';

test('Help page opens when Help button is clicked', async ({ page }) => {
  // Navigate to the home page
  await page.goto('http://localhost:5173');

  // Find and click the Help button
  await page.click('text=Help');

  // Check if the URL has changed to the help page
  await expect(page).toHaveURL('http://localhost:5173/help');

  // Check if the help page content is visible
  await expect(page.locator('h1:has-text("Help")')).toBeVisible();
});
