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

  const closePopup = () => {
    setGameState("game");
    setTimer(0);
  };

  const finishGame = () => {
    setGameState("finished");
  };

  return (
    <div>
      {gameState === "finished" && (
        <div className="overlay">
          <div className="overlay-inner">
            <h2>Congratulations! You completed the game!</h2>
            <p>Your time: {timer} seconds</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    <div className="centered-container">
      <div className="App">
        {gameState === "game" || gameState === "finished" ? (
          <GameBoard timer={timer} setGameState={setGameState} />
        ) : (
          <HelpPage setGameState={setGameState} />
        )}
      </div>
    </div>
  </div>
  );
}

export default App;
