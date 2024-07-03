import { test, expect } from '@playwright/test';

test('Vis overlay når hele boardet er blevet fyldt ud', async ({ page }) => {
  // Navigate to the home page
  await page.goto('http://localhost:5173');

  const BOARDS = {
    test: [
      {
        initial: [
          [0, 0, 0, 0],
          [3, 0, 0, 5],
          [0, 0, 3, 2],
          [5, 0, 0, 0],
          [0, 0, 0, 4],
        ],
        end: [
          [1, 2, 3, 4],
          [3, 4, 1, 5],
          [1, 2, 3, 2],
          [5, 4, 5, 1],
          [3, 1, 2, 4],
        ],
      },
    ],
  };

  const { end: endBoard, initial: initialBoard } = BOARDS['test'][0];

  for (let row = 0; row < endBoard.length; row++) {
    for (let col = 0; col < endBoard[row].length; col++) {
      if (initialBoard[row][col] === 0) {
        await page.click(`[data-testid="cell-${row}-${col}"]`);
        await page.keyboard.press(`${endBoard[row][col]}`);
        await page.waitForTimeout(100); // Giv tid til at opdatere
      }
    }
  }

  // Vent på, at overlayet bliver synligt
  await page.waitForSelector('.overlay-inner', { state: 'visible', timeout: 5000 });

  // Tjek om overlayet med Congratulations vises
  const overlay = await page.locator('.overlay-inner');
  await expect(overlay).toHaveText(/Congratulations! You completed the game!/);
});
