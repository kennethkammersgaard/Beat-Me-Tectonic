import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('displays end time in popup when game is finished', () => {
  render(<App />);

  // Simulate finishing the game by setting gameState to "finished"
  fireEvent.click(screen.getByText('Finish Game'));

  // Check if the popup is displayed with the correct time
  expect(screen.getByText(/Congratulations! You completed the game!/)).toBeInTheDocument();
  expect(screen.getByText(/Your time: \d+ seconds/)).toBeInTheDocument();
});
