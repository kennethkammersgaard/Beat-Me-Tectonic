import { test, expect } from '@playwright/test';

test('New game starts with correct board setup', async ({ page }) => {
  // Navigate to the home page
  await page.goto('http://localhost:5173');

  // Click the New game button
  await page.click('button:has-text("New game")');

  // Check if the first cell (top-left) is empty
  const firstCell = await page.locator('.cell').first();
  await expect(firstCell).toHaveText('');

  // Check if the cell below the first one contains '3'
  const cellBelow = await page.locator('.cell').nth(5); // The cell below is at index 5 (5x4 grid)
  await expect(cellBelow).toHaveText('3');
});
