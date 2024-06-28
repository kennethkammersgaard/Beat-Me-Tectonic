import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { INITIAL_BOARD } from '../Constants';

jest.useFakeTimers();

test('displays end time in popup when game is finished', () => {
  render(<App />);

  // Start spillet
  fireEvent.click(screen.getByTestId('new-game-button'));

  // Simuler udfyldning af brættet
  act(() => {
    // Her skal du tilføje logik for at udfylde brættet korrekt
    // For eksempel:
    INITIAL_BOARD.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 0) {
          fireEvent.click(screen.getByTestId(`cell-${rowIndex}-${colIndex}`));
          fireEvent.click(screen.getByText('1')); // Antager at '1' altid er et gyldigt træk
        }
      });
    });
  });

  // Fremskriv tiden
  act(() => {
    jest.advanceTimersByTime(10000); // Fremskriv 10 sekunder
  });

  // Tjek om popup'en vises
  expect(screen.getByText(/Congratulations! You completed the game!/)).toBeInTheDocument();
  
  // Tjek om sluttiden vises (mere fleksibel regex)
  expect(screen.getByText(/Your time: \d+:\d{2}/)).toBeInTheDocument();
});