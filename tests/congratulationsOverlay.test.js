import { test, expect } from '@playwright/test';

test('Vis overlay når hele boardet er blevet fyldt ud', async ({ page }) => {
  // Navigate to the home page
  await page.goto('http://localhost:5173');

  // Select the test board
  await page.evaluate(() => {
    const BOARDS = {
      test: [
        {
          initial: [
            [0, 2, 3, 4],
            [3, 4, 1, 5],
            [1, 2, 3, 2],
            [5, 4, 5, 1],
            [3, 1, 2, 4],
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

    const endBoard = BOARDS['test'][0].end;
    const initialBoard = BOARDS['test'][0].initial;

    for (let row = 0; row < endBoard.length; row++) {
      for (let col = 0; col < endBoard[row].length; col++) {
        if (initialBoard[row][col] === 0) {
          const cell = document.querySelector(`.cell[data-testid="cell-${row}-${col}"]`);
          console.log(`Klikker på celle: row ${row}, col ${col}`);
          cell.click();
          console.log(`Indtaster værdi: ${endBoard[row][col]} i celle: row ${row}, col ${col}`);
          document.dispatchEvent(new KeyboardEvent('keydown', { key: `${endBoard[row][col]}` }));
        }
      }
    }
  });

  // Check if the overlay with Congratulations is shown
  console.log('Tjekker om overlay vises');
  const overlay = await page.locator('.overlay-inner');
  const isVisible = await overlay.isVisible();
  console.log(`Overlay synlig: ${isVisible}`);
  await expect(overlay).toBeVisible();
  const overlayText = await overlay.textContent();
  console.log(`Overlay tekst: ${overlayText}`);
  await expect(overlay).toHaveText(/Congratulations! You completed the game!/);
});
