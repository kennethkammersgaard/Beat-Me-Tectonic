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
  const cellBelow = await page.locator('.cell').nth(4); // The cell below is at index 4 (4x5 grid)
  await expect(cellBelow).toHaveText('3');
});

test('Cell turns red when incorrect number is entered', async ({ page }) => {
  // Navigate to the home page
  await page.goto('http://localhost:5173');

  // Click the New game button
  await page.click('button:has-text("New game")');

  // Get the first cell
  const firstCell = await page.locator('.cell').first();

  // Enter an incorrect number (2) into the first cell
  await firstCell.click();
  await page.keyboard.press('2');

  // Check if the cell has the 'incorrect' class (which should make it red)
  await expect(firstCell).toHaveClass(/incorrect/);
});
