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

  await page.evaluateHandle(async ({ endBoard, initialBoard }) => {


    for (let row = 0; row < endBoard.length; row++) {
      for (let col = 0; col < endBoard[row].length; col++) {
        if (initialBoard[row][col] === 0) {
          const cell = document.querySelector(`.cell[data-testid="cell-${row}-${col}"]`);
          console.log(`Klikker på celle: row ${row}, col ${col}`);
          cell.click();
          console.log(`Klik på celle: row ${row}, col ${col} udført`);
          console.log(`Indtaster værdi: ${endBoard[row][col]} i celle: row ${row}, col ${col}`);
          cell.textContent = `${endBoard[row][col]}`;
          document.dispatchEvent(new KeyboardEvent('keydown', { key: `${endBoard[row][col]}` }));
          console.log(`Indtastning af værdi: ${endBoard[row][col]} i celle: row ${row}, col ${col} udført`);
          await new Promise(resolve => setTimeout(resolve, 100));
          // Vent kort tid for at sikre, at DOM'en opdateres
          await new Promise(resolve => setTimeout(resolve, 100));
        } else {
          console.log(`Celle: row ${row}, col ${col} er allerede udfyldt med værdi: ${initialBoard[row][col]}`);
        }
      }
    }

    // Vent kort tid for at sikre, at overlayet vises
    await new Promise(resolve => setTimeout(resolve, 500));
  }, BOARDS['test'][0].end, BOARDS['test'][0].initial);

  // Tjek om overlayet med Congratulations vises
  console.log('Tjekker om overlay vises');
  const overlay = await page.locator('.overlay-inner');
  const isVisible = await overlay.isVisible();
  console.log(`Overlay synlig: ${isVisible}`);
  const overlayText = await overlay.textContent();
  console.log(`Overlay tekst: ${overlayText}`);
  await expect(overlay).toHaveText(/Congratulations! You completed the game!/);
});
