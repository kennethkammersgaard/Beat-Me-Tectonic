import { test, expect } from '@playwright/test';

test('resets timer when New Game button is clicked', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const newGameButton = await page.getByTestId('new-game-button');
  await newGameButton.click();
  const timer = await page.getByTestId('timer');
  await expect(timer).toHaveText('Time: 0:00');
});
