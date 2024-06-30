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

test('Overlay with Congratulations is shown when the game is completed', async ({ page }) => {
  // Navigate to the home page
  await page.goto('http://localhost:5173');

  // Set the initial board to INITIAL_BOARD_ALMOST_FINISHED
  await page.evaluate(() => {
    window.localStorage.setItem('initialBoard', JSON.stringify([
      [0, 2, 3, 4],
      [3, 4, 1, 5],
      [1, 2, 3, 2],
      [5, 4, 5, 1],
      [3, 1, 2, 4],
    ]));
  });

  // Reload the page to apply the initial board
  await page.reload();

  // Enter the number 1 into the first cell
  const firstCell = await page.locator('.cell').first();
  await firstCell.click();
  await page.keyboard.press('1');

  // Check if the overlay with Congratulations is shown
  const overlay = await page.locator('.overlay-inner');
  await expect(overlay).toBeVisible();
  await expect(overlay).toHaveText(/Congratulations! You completed the game!/);
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
