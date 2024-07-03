import { BOARD_WIDTH, BOARD_HEIGHT } from "./Boards";

export const isValidMove = (board, row, col, areas) => {
    const value = board[row][col];
    const area = areas[row][col];

    // Check area size and value
    const areaSize = board
        .flat()
        .filter(
            (_, index) =>
                areas[Math.floor(index / board[0].length)][index % board[0].length] === area,
        ).length;
    if (value > areaSize) return false;

    // Check area uniqueness
    const areaValues = board
        .flatMap((r, i) => r.map((cell, j) => (AREAS[i][j] === area ? cell : null)))
        .filter((v) => v !== null);
    if (areaValues.filter((v) => v === value).length > 1) return false;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newRow = row + i;
            const newCol = col + j;
            if (
                newRow >= 0 &&
                newRow < BOARD_HEIGHT &&
                newCol >= 0 &&
                newCol < BOARD_WIDTH
            ) {
                if (board[newRow][newCol] === value) return false;
            }
        }
    }

    return true;
};

export const isBoardComplete = (board) => {
  return board.every((row) => row.every((cell) => cell !== 0));
};

export const getCellBorderStyle = (row, col, areas, boardWidth, boardHeight) => {
  const borderStyle = "1px solid #ccc";
  const thickBorderStyle = "2px solid black";

  let borderTop = false;
  let borderRight = false;
  let borderBottom = false;
  let borderLeft = false;

  if (row === 0 || areas[row][col] !== areas[row - 1][col]) borderTop = true;
  if (col === boardWidth - 1 || areas[row][col] !== areas[row][col + 1]) borderRight = true;
  if (row === boardHeight - 1 || areas[row][col] !== areas[row + 1][col]) borderBottom = true;
  if (col === 0 || areas[row][col] !== areas[row][col - 1]) borderLeft = true;

  return { borderTop, borderRight, borderBottom, borderLeft };
};
