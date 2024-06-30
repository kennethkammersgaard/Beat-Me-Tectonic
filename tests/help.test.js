import { test, expect } from '@playwright/test';

test('Help page opens when Help button is clicked and closes when Back to game button is clicked', async ({ page }) => {
  // Navigate to the home page
  await page.goto('http://localhost:5173');

  // Find and click the Help button
  await page.click('text=Help');

  // Check if the URL has changed to the help page
  await expect(page).toHaveURL('http://localhost:5173/help');

  // Check if the help page content is visible
  await expect(page.locator('h1:has-text("Help")')).toBeVisible();

  // Find and click the Back to game button
  await page.click('text=Back to game');

  // Check if the URL has changed back to the home page
  await expect(page).toHaveURL('http://localhost:5173/');

  // Check if the "New game" button is visible, confirming we're back on the game page
  await expect(page.locator('button:has-text("New game")')).toBeVisible();
});

test('New game starts with correct board setup', async ({ page }) => {
  // Navigate to the home page
  await page.goto('http://localhost:5173');

  // Click the New game button
  await page.click('button:has-text("New game")');

  // Check if the first cell (top-left) is empty
  const firstCell = await page.locator('.cell').first();
  await expect(firstCell).toHaveText('');

  // Check if the cell below the first one contains '3'
  const cellBelow = await page.locator('.cell').nth(4); // Assuming 4x4 grid, the cell below is at index 4
  await expect(cellBelow).toHaveText('3');
});
