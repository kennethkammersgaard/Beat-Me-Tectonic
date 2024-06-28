import React, { useEffect } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { INITIAL_BOARD } from '../Constants';

test('displays end time in popup when game is finished', () => {
  render(<App />);

  fireEvent.click(screen.getByText('Finish Game'));

  // Check if the popup is displayed with the correct time
  expect(screen.getByText(/Congratulations! You completed the game!/)).toBeInTheDocument();
  expect(screen.getByText(/Your time: \d+ seconds/)).toBeInTheDocument();
});

test('fills cell 2,3 with 1 (red) and cell 3,3 with 1 (green)', () => {
  render(<App />);

  // Check initial board state
  INITIAL_BOARD.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = screen.getByTestId(`cell-${rowIndex}-${colIndex}`);
      expect(cellElement).toHaveStyle('background-color: white');
    });
  });

  // Fill cell 2,3 with 1
  fireEvent.click(screen.getByTestId('cell-2-3'));
  fireEvent.click(screen.getByText('1'));

  // Check if cell 2,3 is red
  expect(screen.getByTestId('cell-2-3')).toHaveStyle('background-color: red');

  // Fill cell 3,3 with 1
  fireEvent.click(screen.getByTestId('cell-3-3'));
  fireEvent.click(screen.getByText('1'));

  // Check if cell 3,3 is green
  expect(screen.getByTestId('cell-3-3')).toHaveStyle('background-color: lightgreen');
});
