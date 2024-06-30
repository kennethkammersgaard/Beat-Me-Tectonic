import { test, expect } from '@playwright/test';
import {
  isValidMove,
  isBoardComplete,
  getCellBorderStyle,
} from "../src/GameLogic.jsx";
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  AREAS,
  INITIAL_BOARD,
  END_BOARD,
} from "../src/Constants";

test.describe("Game Logic Tests", () => {
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

  test.describe("isValidMove", () => {
    test("should return true for a valid move", () => {
      const board = emptyBoard.map((row) => [...row]);
      board[0][0] = 1;
      expect(isValidMove(board, 0, 0)).toBe(true);
    });

    test("should return false for a move with value greater than area size", () => {
      const board = emptyBoard.map((row) => [...row]);
      board[0][0] = 5; // Assuming the area size is less than 5
      expect(isValidMove(board, 0, 0)).toBe(false);
    });

    test("should return false for a move with non-unique value in area", () => {
      const board = emptyBoard.map((row) => [...row]);
      board[0][0] = 1;
      board[1][0] = 1; // Insert the same value in another cell in the same area
      expect(isValidMove(board, 0, 0)).toBe(false);
    });

    test("should return false for a move with value in adjacent cell", () => {
      const board = emptyBoard.map((row) => [...row]);
      board[0][1] = 1; // Insert the same value in an adjacent cell
      expect(isValidMove(board, 0, 0)).toBe(false);
    });
  });

  test.describe("isBoardComplete", () => {
    test("should return true for a complete board", () => {
      expect(isBoardComplete(END_BOARD)).toBe(true);
    });

    test("should return false for an incomplete board", () => {
      const board = emptyBoard.map((row, rowIndex) =>
        row.map((cell, colIndex) => (rowIndex === 0 && colIndex === 0 ? 0 : 1)),
      );
      expect(isBoardComplete(board)).toBe(false);
    });
  });
});
