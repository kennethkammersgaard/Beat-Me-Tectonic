
import GameBoard from '../GameBoard';

jest.mock('../Constants', () => ({
  BOARD_WIDTH: 5,
  BOARD_HEIGHT: 5,
  INITIAL_BOARD: [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0],
    [3, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 2, 0, 0, 0]
  ],
  END_BOARD: [
    [2, 4, 3, 1, 4],
    [1, 3, 4, 2, 3],
    [3, 2, 1, 4, 2],
    [1, 3, 1, 2, 4],
    [2, 1, 3, 4, 1]
  ],
  AREAS: [
    ["A", "A", "B", "B", "C"],
    ["A", "A", "B", "B", "C"],
    ["D", "D", "E", "C", "C"],
    ["D", "F", "E", "E", "G"],
    ["F", "F", "G", "G", "G"]
  ]
}));

describe('GameBoard', () => {
  test('resets game state when New Game button is clicked', () => {
    const mockSetGameState = jest.fn();
    const { getByTestId } = render(
      <GameBoard timer={120} setGameState={mockSetGameState} resetGame={false} />
    );
    
    const newGameButton = getByTestId('new-game-button');
    fireEvent.click(newGameButton);
    
    expect(mockSetGameState).toHaveBeenCalledWith('game');
    
    const timer = getByTestId('timer');
    expect(timer.textContent).toBe('Time: 2:00');
  });
});
