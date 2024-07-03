import { test, expect } from '@playwright/test';


test('Nyt spil starter med korrekt setup', async ({ page }) => {
  // Navigate to the home page
  await page.goto('http://localhost:5173');

  const firstCell = await page.locator('.cell').first();
  await expect(firstCell).toHaveText('');

  // Check if the cell below the first one contains '3'
  const cellBelow = await page.locator('.cell').nth(4); // The cell below is at index 4 (4x5 grid)
  await expect(cellBelow).toHaveText('3');
});


test('Tjek om bruger kan vælge sværhedsgrad', async ({ page }) => {
  // Navigate to the home page
  await page.goto('http://localhost:5173');

  // Click the New game button
  await page.click('button:has-text("New game")');

  // Select the difficulty level
  await page.selectOption('select[data-testid="difficulty-select"]', 'Easy');

  // Select the medium difficulty
  await page.selectOption('select[data-testid="difficulty-select"]', 'Medium');

  // Click the Start button
  await page.click('button:has-text("Start")');

  // Wait for the game board to be visible
  await page.waitForSelector('.board', { state: 'visible' });

  // Check if the difficulty level is displayed correctly
  const difficultyText = await page.locator('.Timer').textContent();
  expect(difficultyText).toContain('Sværhedsgrad: Medium');
});


test('Første celle bliver grøn, når man indtaster det rigtige tal 1', async ({ page }) => {
  // Navigate to the home page
  await page.goto('http://localhost:5173');

  // Click the New game button
  await page.click('button:has-text("New game")');

  // Select the Easy difficulty
  await page.selectOption('select[data-testid="difficulty-select"]', 'Easy');

  // Click the Start button
  await page.click('button:has-text("Start")');

  // Wait for the game board to be visible
  await page.waitForSelector('.board', { state: 'visible' });

  // Click on the first cell
  const firstCell = await page.locator('.cell').first();
  await firstCell.click();

  // Press the '1' key
  await page.keyboard.press('1');

  // Check if the first cell has the 'correct' class
  await expect(firstCell).toHaveClass(/correct/);
});


test('Test om knapper bliver inaktive, hvis de ikke er tilgængelige', async ({ page }) => {
  // Navigate to the home page
  await page.goto('http://localhost:5173');

  // Select the first cell
  const firstCell = await page.locator('.cell').first();
  await firstCell.click();

  // Check if the button 5 is disabled
  const button5 = await page.locator('button:has-text("5")');
  await expect(button5).toBeDisabled();

  // Check if the button 3 is disabled
  const button3 = await page.locator('button:has-text("3")');
  await expect(button3).toBeDisabled();
});


test('Vis overlay når brugeren har afsluttet spil', async ({ page }) => {
  // Navigate to the home page
  await page.goto('http://localhost:5173');

  // Enter the number 1 into the first cell
  const firstCell = await page.locator('.cell').first();
  await firstCell.click();
  await page.keyboard.press('1');

  // Check if the overlay with Congratulations is shown
  const overlay = await page.locator('.overlay-inner');
  await expect(overlay).toBeVisible();
  await expect(overlay).toHaveText(/Congratulations! You completed the game!/);
});


test('Celle bliver rød, når der bliver indtastet forkert værdi', async ({ page }) => {
  // Navigate to the home page
  await page.goto('http://localhost:5173');

  // Get the first cell
  const firstCell = await page.locator('.cell').first();

  // Enter an incorrect number (2) into the first cell
  await firstCell.click();
  await page.keyboard.press('2');

  // Check if the cell has the 'incorrect' class (which should make it red)
  await expect(firstCell).toHaveClass(/incorrect/);
});


test('Cellevæg mellem to områder er tyk', async ({ page }) => {
  // Navigate to the home page
  await page.goto('http://localhost:5173');

  // Get the cells at positions 0,1 and 0,2
  const cell01 = await page.locator('.cell').nth(1);
  const cell02 = await page.locator('.cell').nth(2);

  // Check if the cells have the correct border classes
  await expect(cell01).toHaveClass(/border-right/);
  await expect(cell02).toHaveClass(/border-left/);
});


test('Cellevæg mellem to celler i et område er tynd og grå', async ({ page }) => {
  // Navigate to the home page
  await page.goto('http://localhost:5173');

  // Get the cells at positions 0,0 and 1,0
  const cell00 = await page.locator('.cell').nth(0);
  const cell10 = await page.locator('.cell').nth(4); // 4 because it's the first cell in the second row (4x5 grid)

  // Check if the cells do not have the thick border classes
  await expect(cell00).not.toHaveClass(/border-bottom/);
  await expect(cell10).not.toHaveClass(/border-top/);

  // Check if the cells have the default border style (thin and gray)
  const cell00BorderBottom = await cell00.evaluate((el) => 
    window.getComputedStyle(el).getPropertyValue('border-bottom')
  );
  const cell10BorderTop = await cell10.evaluate((el) => 
    window.getComputedStyle(el).getPropertyValue('border-top')
  );

  expect(cell00BorderBottom).toBe('1px solid rgb(204, 204, 204)');
  expect(cell10BorderTop).toBe('1px solid rgb(204, 204, 204)');
});
