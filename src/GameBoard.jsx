import React, { useState, useEffect } from "react";
import NumberButtons from "./NumberButtons";
import {
  BOARDS,
} from "./Boards";

import { isValidMove, isBoardComplete, getCellBorderStyle } from "./GameLogic.jsx";

export default function GameBoard({ setGameState, resetGame, difficulty, setDifficulty, showDifficultyOverlay, setShowDifficultyOverlay, gameState, timer, setTimer, isTest = false }) {
  const boardType = isTest ? 'test' : difficulty.toLowerCase();
  const [board, setBoard] = useState(() => {
    const boards = BOARDS[boardType];
    return boards && boards.length > 0 ? boards[0].initial : [];
  });
  const [solution, setSolution] = useState(() => {
    const boards = BOARDS[boardType];
    return boards && boards.length > 0 ? boards[0].end : [];
  });
  const [boardHeight, setBoardHeight] = useState(() => {
    const boards = BOARDS[boardType];
    return boards && boards.length > 0 ? boards[0].initial.length : 0;
  });
  const [boardWidth, setBoardWidth] = useState(() => {
    const boards = BOARDS[boardType];
    return boards && boards.length > 0 && boards[0].initial.length > 0 ? boards[0].initial[0].length : 0;
  });
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
      setGameOver(false);
      setSelectedCell(null);
      setSelectedNumber(null);
      setInvalidCells([]);
      setGameState("game");
    }
  }, [resetGame, setGameState]);

  useEffect(() => {
    if (resetGame || timer >= 120) {
      setGameOver(false);
      setSelectedCell(null);
      setSelectedNumber(null);
      setInvalidCells([]);
    }
  }, [resetGame, timer]);

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
    if (resetGame || showDifficultyOverlay) {
      const boardType = isTest ? 'test' : difficulty.toLowerCase();
      if (BOARDS[boardType] && BOARDS[boardType].length > 0) {
        const boardIndex = Math.floor(Math.random() * BOARDS[boardType].length);
        const selectedBoard = BOARDS[boardType][boardIndex];
        if (selectedBoard && selectedBoard.initial && selectedBoard.end) {
          setBoard(selectedBoard.initial);
          setSolution(selectedBoard.end);
          setBoardHeight(selectedBoard.initial.length);
          setBoardWidth(selectedBoard.initial[0] ? selectedBoard.initial[0].length : 0);
          setGameOver(false);
          setSelectedCell(null);
          setSelectedNumber(null);
          setInvalidCells([]);
        } else {
          console.error(`Invalid board structure for difficulty: ${boardType}`);
        }
      } else {
        console.error(`No boards available for difficulty: ${boardType}`);
      }
    }
  }, [resetGame, difficulty, showDifficultyOverlay, isTest]);

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

    if (isValidMove(newBoard, row, col)) {
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
    const areaSize = BOARDS[difficulty.toLowerCase()][0].areas
      .flat()
      .filter((a) => a === area).length;
    if (number > areaSize) return false;

    // Find tal der allerede er i grønne felter i området
    const numbersInArea = board
      .flatMap((r, rowIndex) =>
        r.map((cell, colIndex) => ({
          value: cell,
          area: BOARDS[difficulty.toLowerCase()][0].areas[rowIndex][colIndex],
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
      {showDifficultyOverlay ? (
        <div className="overlay">
          <div className="overlay-inner">
            <h2>Select Difficulty Level</h2>
            <p>When you click start, you begin straight away, and remember you go for the fastest time!</p>
            <select onChange={(e) => setDifficulty(e.target.value)} data-testid="difficulty-select">
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <button onClick={() => {
              const selectedBoard = BOARDS[difficulty.toLowerCase()][0];
              setBoard(selectedBoard.initial);
              setBoardHeight(selectedBoard.initial.length);
              setBoardWidth(selectedBoard.initial[0].length);
              setShowDifficultyOverlay(false);
              setGameState("game");
              setTimer(0);
              setGameOver(false);
              setSelectedCell(null);
              setSelectedNumber(null);
              setInvalidCells([]);
            }} data-testid="start-button">Start</button>
          </div>
        </div>
      ) : null}
      <div className="board" style={{ maxWidth: `${boardWidth * 60}px`, margin: "20px auto" }} data-testid="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const style = getCellBorderStyle(rowIndex, colIndex, BOARDS[difficulty.toLowerCase()][0].areas, boardWidth, boardHeight);
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
                } ${isInvalid || (cell !== 0 && cell !== solution[rowIndex][colIndex]) ? "incorrect" : ""} ${
                  cell === 0 && selectedCell &&
                  selectedCell.row === rowIndex &&
                  selectedCell.col === colIndex
                  ? "selected"
                  : ""
                } ${cell !== 0 && cell === solution[rowIndex][colIndex] ? "correct" : ""}`}
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

import "./App.css";
