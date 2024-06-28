import React, { useEffect } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { INITIAL_BOARD } from '../Constants';

jest.mock('../App.css', () => ({}));

test('displays end time in popup when game is finished', () => {
  render(<App />);

  fireEvent.click(screen.getByTestId('new-game-button'));

  // Check if the popup is displayed with the correct time
  expect(screen.getByText(/Congratulations! You completed the game!/)).toBeInTheDocument();
  expect(screen.getByText(/Your time: [0-9]+ seconds/)).toBeInTheDocument();
});
