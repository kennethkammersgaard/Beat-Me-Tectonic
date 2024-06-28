import React, { useState, useEffect } from "react";
import GameBoard from "./GameBoard";
import HelpPage from "./HelpPage";

function App() {
  const [gameState, setGameState] = useState("start"); // or 'game' or 'help'
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

  const StartScreen = () => (
    <div>
      <h1>Beat Me Tectonic</h1>
      <button onClick={startGame}>Start Game</button>
      <button onClick={showHelp}>Help</button>
    </div>
  );

  return (
    <div className="App">
      {gameState === "game" ? (
        <GameBoard timer={timer} setGameState={setGameState} />
      ) : gameState === "help" ? (
        <HelpPage setGameState={setGameState} />
      ) : (
        <StartScreen />
      )}
    </div>
  );
}

export default App;
