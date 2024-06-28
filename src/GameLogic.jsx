import { BOARD_WIDTH, BOARD_HEIGHT, AREAS } from "./Constants";

export const isValidMove = (board, row, col) => {
    const value = board[row][col];
    const area = AREAS[row][col];

    // Check area size and value
    const areaSize = board
        .flat()
        .filter(
            (_, index) =>
                AREAS[Math.floor(index / BOARD_WIDTH)][index % BOARD_WIDTH] === area,
        ).length;
    if (value > areaSize) return false;

    // Check area uniqueness
    const areaValues = board
        .flatMap((r, i) => r.map((cell, j) => (AREAS[i][j] === area ? cell : null)))
        .filter((v) => v !== null);
    if (areaValues.filter((v) => v === value).length > 1) return false;

    // Check adjacent cells
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

export const getCellBorderStyle = (row, col) => {
  const borderStyle = "1px solid #ccc";
  const thickBorderStyle = "2px solid black";

  let borderTop = false;
  let borderRight = false;
  let borderBottom = false;
  let borderLeft = false;

  if (row === 0 || AREAS[row][col] !== AREAS[row - 1][col]) borderTop = true;
  if (col === BOARD_WIDTH - 1 || AREAS[row][col] !== AREAS[row][col + 1]) borderRight = true;
  if (row === BOARD_HEIGHT - 1 || AREAS[row][col] !== AREAS[row + 1][col]) borderBottom = true;
  if (col === 0 || AREAS[row][col] !== AREAS[row][col - 1]) borderLeft = true;

  return { borderTop, borderRight, borderBottom, borderLeft };
};
