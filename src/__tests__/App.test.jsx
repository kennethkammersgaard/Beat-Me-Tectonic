import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { INITIAL_BOARD } from '../Constants';

jest.useFakeTimers();

test('displays end time in popup when game is finished', () => {
  render(<App />);

  // Start the game
  fireEvent.click(screen.getByTestId('new-game-button'));

  // Simulate filling the board
  act(() => {
    INITIAL_BOARD.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 0) {
          fireEvent.click(screen.getByTestId(`cell-${rowIndex}-${colIndex}`));
          fireEvent.click(screen.getByText('1')); // Assuming '1' is always a valid move
        }
      });
    });
  });

  // Advance time
  act(() => {
    jest.advanceTimersByTime(10000); // Advance 10 seconds
  });

  // Check if the popup is displayed
  expect(screen.getByText(/Congratulations! You completed the game!/)).toBeInTheDocument();
  
  // Check if the end time is displayed (more flexible regex)
  expect(screen.getByText(/Your time: \d+ seconds/)).toBeInTheDocument();
});
