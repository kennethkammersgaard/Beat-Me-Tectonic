import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import NumberButtons from "./NumberButtons";
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  INITIAL_BOARD,
  END_BOARD,
  AREAS,
} from "./Constants";
import { isValidMove, isBoardComplete, getCellBorderStyle } from "./GameLogic";
import "./App.css";

function GameBoard({ timer, setGameState, resetGame }) {
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [invalidCells, setInvalidCells] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (isBoardComplete(board)) {
      setGameState("finished");
    }
  }, [board, setGameState]);




  useEffect(() => {
    if (resetGame || timer >= 120) {
      setBoard(INITIAL_BOARD);
      setGameOver(false);
      setSelectedCell(null);
      setSelectedNumber(null);
      setInvalidCells([]);
    }
  }, [resetGame]);

  const handleCellClick = (row, col) => {
    if (gameOver) return;
    if (
      board[row][col] !== 0 &&
      !invalidCells.some((cell) => cell.row === row && cell.col === col)
    ) {
      // Grønne felter kan ikke vælges igen
      return;
    }
    setSelectedCell({ row, col });
  };

  const handleNumberClick = (number) => {
    if (!selectedCell || gameOver) return;
    const { row, col } = selectedCell;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = number;

    if (isValidMove(newBoard, row, col) && number === END_BOARD[row][col]) {
      setBoard(newBoard);
      setSelectedCell(null);
      setSelectedNumber(null);
      setInvalidCells(
        invalidCells.filter((cell) => cell.row !== row || cell.col !== col),
      );
      if (isBoardComplete(newBoard)) {
        setGameOver(true);
        setGameOver(true);
        setGameState("finished");
      }
    } else {
      setBoard(newBoard);
      setInvalidCells([
        ...invalidCells.filter((cell) => cell.row !== row || cell.col !== col),
        { row, col },
      ]);
      // 10 second penalty
    }
  };

  const isNumberAvailable = (number) => {
    if (!selectedCell) return false;
    const { row, col } = selectedCell;
    const area = AREAS[row][col];
    const areaSize = board
      .flat()
      .filter(
        (_, index) =>
          AREAS[Math.floor(index / BOARD_WIDTH)][index % BOARD_WIDTH] === area,
      ).length;
    if (number > areaSize) return false;

    // Find tal der allerede er i grønne felter i området
    const numbersInArea = board
      .flatMap((r, rowIndex) =>
        r.map((cell, colIndex) => ({
          value: cell,
          area: AREAS[rowIndex][colIndex],
          isInvalid: invalidCells.some(
            (c) => c.row === rowIndex && c.col === colIndex,
          ),
        })),
      )
      .filter(
        (cell) => cell.area === area && cell.value !== 0 && !cell.isInvalid,
      )
      .map((cell) => cell.value);

    // Hvis nummeret allerede er i et grønt felt, er det ikke tilgængeligt
    return !numbersInArea.includes(number);
  };


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };


  return (
    <div className="GameBoard">
      <h1>Beat Me Tectonic</h1>
      <div className="button-container">
        <button onClick={() => setGameState("game")}>New Game</button>
        <button onClick={() => setGameState("help")}>Help</button>
      </div>
      <div className="board" style={{ maxWidth: "240px", margin: "20px auto" }}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const style = getCellBorderStyle(rowIndex, colIndex);
            const isInvalid = invalidCells.some(
              (c) => c.row === rowIndex && c.col === colIndex,
            );
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`cell ${style.borderTop ? "border-top" : ""} ${
                  style.borderRight ? "border-right" : ""
                } ${style.borderBottom ? "border-bottom" : ""} ${
                  style.borderLeft ? "border-left" : ""
                }`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                style={{
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  backgroundColor: isInvalid
                    ? "red"
                    : cell === 0
                      ? selectedCell &&
                        selectedCell.row === rowIndex &&
                        selectedCell.col === colIndex
                        ? "yellow"
                        : "white"
                      : "lightgreen",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                {cell !== 0 ? cell : ""}
              </div>
            );
          }),
        )}
      </div>
      <NumberButtons
        selectedNumber={selectedNumber}
        onClick={handleNumberClick}
        isNumberAvailable={isNumberAvailable}
      />
      <div className="progress-bar" style={{ position: 'relative' }}>
        <div className="progress-bar-inner" style={{ width: `${Math.min((timer / 240) * 100, 100)}%` }}></div>
        <div className="progress-bar-marker" style={{ left: `${Math.min((timer / 240) * 100, 100)}%` }}></div>
      </div>
      <div className="Timer">Time: {formatTime(timer)}</div>
    </div>
  );
}

export default GameBoard;
