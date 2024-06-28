import {
  isValidMove,
  isBoardComplete,
  getCellBorderStyle,
} from "../GameLogic.jsx";
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  AREAS,
  INITIAL_BOARD,
  END_BOARD,
} from "../Constants";

describe("Game Logic Tests", () => {
  const emptyBoard = Array.from({ length: BOARD_HEIGHT }, () =>
    Array(BOARD_WIDTH).fill(0),
  );

  test("Initial board has the correct starting condition", () => {
    const initialBoard = [
      [0, 0, 0, 0],
      [3, 0, 0, 5],
      [0, 0, 3, 2],
      [5, 0, 0, 0],
      [0, 0, 0, 4],
    ];
    expect(INITIAL_BOARD).toEqual(initialBoard);
  });

  describe("isValidMove", () => {
    it("should return true for a valid move", () => {
      const board = emptyBoard.map((row) => [...row]);
      board[0][0] = 1;
      expect(isValidMove(board, 0, 0)).toBe(true);
    });

    it("should return false for a move with value greater than area size", () => {
      const board = emptyBoard.map((row) => [...row]);
      board[0][0] = 5; // Antager, at områdets størrelse er mindre end 5
      expect(isValidMove(board, 0, 0)).toBe(false);
    });

    it("should return false for a move with non-unique value in area", () => {
      const board = emptyBoard.map((row) => [...row]);
      board[0][0] = 1;
      board[1][0] = 1; // Indsætter samme værdi i et andet felt i samme område
      expect(isValidMove(board, 0, 0)).toBe(false);
    });

    it("should return false for a move with value in adjacent cell", () => {
      const board = emptyBoard.map((row) => [...row]);
      board[0][1] = 1; // Indsætter samme værdi i en tilstødende celle
      expect(isValidMove(board, 0, 0)).toBe(false);
    });
  });

  describe("isBoardComplete", () => {
    it("should return true for a complete board", () => {
      expect(isBoardComplete(END_BOARD)).toBe(true);
    });

    it("should return false for an incomplete board", () => {
      const board = emptyBoard.map((row, rowIndex) =>
        row.map((cell, colIndex) => (rowIndex === 0 && colIndex === 0 ? 0 : 1)),
      );
      expect(isBoardComplete(board)).toBe(false);
    });
  });

  describe("getCellBorderStyle", () => {
    it("should return thick top border for cell in the first row", () => {
      const style = getCellBorderStyle(0, 1);
      expect(style.borderTop).toBe("4px solid black");
    });

    it("should return thick bottom border for cell in the last row", () => {
      const style = getCellBorderStyle(BOARD_HEIGHT - 1, 1);
      expect(style.borderBottom).toBe("4px solid black");
    });

    it("should return thick left border for cell in the first column", () => {
      const style = getCellBorderStyle(1, 0);
      expect(style.borderLeft).toBe("4px solid black");
    });

    it("should return thick right border for cell in the last column", () => {
      const style = getCellBorderStyle(1, BOARD_WIDTH - 1);
      expect(style.borderRight).toBe("4px solid black");
    });

    it("should return thick borders between different areas", () => {
      // Vi vælger celler i forskellige områder, fx (1,1) og (2,1)
      let style = getCellBorderStyle(1, 1);
      expect(style.borderBottom).toBe("4px solid black"); // Nedre grænse skal være tyk, da (2,1) er i område C

      style = getCellBorderStyle(2, 2);
      expect(style.borderRight).toBe("4px solid black"); // Højre grænse skal være tyk, da (2,3) er i område B

      style = getCellBorderStyle(4, 1);
      expect(style.borderLeft).toBe("4px solid black"); // Venstre grænse skal være tyk, da (4,0) er i område C

      style = getCellBorderStyle(3, 2);
      expect(style.borderTop).toBe("4px solid black"); // Øverste grænse skal være tyk, da (2,2) er i område D
    });
  });
});
