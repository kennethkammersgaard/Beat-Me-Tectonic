import React, { useState, useEffect } from "react";
import GameBoard from "./GameBoard";
import HelpPage from "./HelpPage";

function App() {
  const [gameState, setGameState] = useState("game"); // Changed initial state to "game"
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval = null;
    if (gameState === "game") {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  const startGame = () => {
    setGameState("game");
    setTimer(0);
  };

  const showHelp = () => {
    setGameState("help");
  };

  return (
    <div className="centered-container">
      <div className="App">
        {gameState === "game" ? (
          <GameBoard timer={timer} setGameState={setGameState} />
        ) : (
          <HelpPage setGameState={setGameState} />
        )}
      </div>
    </div>
  );
}

export default App;
