import { render, fireEvent } from '@testing-library/react';
import GameBoard from '../GameBoard';
import React from 'react';

test('resets timer when New Game button is clicked', () => {
  const { getByTestId } = render(<GameBoard timer={120} setGameState={() => {}} resetGame={false} />);
  const newGameButton = getByTestId('new-game-button');
  fireEvent.click(newGameButton);
  const timer = getByTestId('timer');
  expect(timer.textContent).toBe('Time: 0:00');
});
