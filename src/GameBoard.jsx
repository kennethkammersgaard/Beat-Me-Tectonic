import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import NumberButtons from "./NumberButtons";
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  BOARDS,
} from "./Boards";
import { isValidMove, isBoardComplete, getCellBorderStyle } from "./GameLogic.jsx";
import "./App.css";

function GameBoard({ timer, setGameState, resetGame, difficulty = "Easy", setDifficulty, showDifficultyOverlay, setShowDifficultyOverlay }) {
  const [board, setBoard] = useState(BOARDS[difficulty.toLowerCase()][0].initial);
  const [boardHeight, setBoardHeight] = useState(BOARDS[difficulty.toLowerCase()][0].initial.length);
  const [boardWidth, setBoardWidth] = useState(BOARDS[difficulty.toLowerCase()][0].initial[0].length);
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
    if (resetGame) {
      const selectedBoard = BOARDS[difficulty.toLowerCase()][0];
      setBoard(selectedBoard.initial);
      setBoardHeight(selectedBoard.initial.length);
      setBoardWidth(selectedBoard.initial[0].length);
      setBoardHeight(selectedBoard.initial.length);
      setBoardWidth(selectedBoard.initial[0].length);
      setGameOver(false);
      setSelectedCell(null);
      setSelectedNumber(null);
      setInvalidCells([]);
      setGameState("game");
    }
  }, [resetGame, setGameState, difficulty]);

  useEffect(() => {
    if (resetGame || timer >= 120) {
      const selectedBoard = BOARDS[difficulty.toLowerCase()][0];
      setBoard(selectedBoard.initial);
      setGameOver(false);
      setSelectedCell(null);
      setSelectedNumber(null);
      setInvalidCells([]);
    }
  }, [resetGame, difficulty, timer]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = parseInt(event.key);
      if (key >= 1 && key <= 5) {
        handleNumberClick(key, boardWidth, boardHeight);
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [selectedCell, board]);

  useEffect(() => {
    const selectedBoard = BOARDS[difficulty.toLowerCase()][0];
    setBoard(selectedBoard.initial);
    setBoardHeight(selectedBoard.initial.length);
    setBoardWidth(selectedBoard.initial[0].length);
  }, [difficulty]);
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

  const handleNumberClick = (number, boardWidth, boardHeight) => {
    if (!selectedCell || gameOver) return;
    const { row, col } = selectedCell;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = number;

    const selectedBoard = BOARDS[difficulty.toLowerCase()][0];
    if (isValidMove(newBoard, row, col, boardWidth, boardHeight)) {
      setBoard(newBoard);
      setSelectedCell(null);
      setSelectedNumber(null);
      setInvalidCells(
        invalidCells.filter((cell) => cell.row !== row || cell.col !== col)
      );
      if (isBoardComplete(newBoard)) {
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
    const area = BOARDS[difficulty.toLowerCase()][0].areas[row][col];
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
      {showDifficultyOverlay && (
        <div className="overlay">
          <div className="overlay-inner">
            <h2>Vælg sværhedsgrad</h2>
            <p>When you click start, you begin straight away, and remember you go for the fastest time!</p>
            <select onChange={(e) => setDifficulty(e.target.value)} data-testid="difficulty-select">
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <button onClick={() => {
              setShowDifficultyOverlay(false);
              setGameState("game");
              setTimer(0);
            }} data-testid="start-button">Start</button>
          </div>
        </div>
      )}
      <div className="board" style={{ maxWidth: `${boardWidth * 60}px`, margin: "20px auto" }} data-testid="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const style = getCellBorderStyle(rowIndex, colIndex, boardWidth, boardHeight);
            const isInvalid = invalidCells.some(
              (c) => c.row === rowIndex && c.col === colIndex,
            );
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                data-testid={`cell-${rowIndex}-${colIndex}`}
                className={`cell ${style.borderTop ? "border-top" : ""} ${
                  style.borderRight ? "border-right" : ""
                } ${style.borderBottom ? "border-bottom" : ""} ${
                  style.borderLeft ? "border-left" : ""
                } ${isInvalid ? "incorrect" : cell === 0 ? selectedCell &&
                  selectedCell.row === rowIndex &&
                  selectedCell.col === colIndex
                  ? "selected"
                  : ""
                : "correct"}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                style={{
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
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
      <div className="progress-bar" style={{ position: 'relative' }} data-testid="progress-bar">
        <div className="progress-bar-inner" style={{ width: `${Math.min((timer / 240) * 100, 100)}%` }}></div>
        <div className="progress-bar-marker" style={{ left: `${Math.min((timer / 240) * 100, 100)}%` }}></div>
      </div>
      <div className="Timer" data-testid="timer">Time: {formatTime(timer)} <br /> Sværhedsgrad: {difficulty}</div>
    </div>
  );
}

export default GameBoard;
