import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GameBoard from "./GameBoard";
import HelpPage from "./HelpPage";
import Header from "./Header";
import Footer from "./Footer";
import TermsOfService from "./TermsOfService";
import PrivacyPolicy from "./PrivacyPolicy";

function App() {
  const [gameState, setGameState] = useState("game");
  const [resetGame, setResetGame] = useState(false);
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
    setShowDifficultyOverlay(true);
    setResetGame(false);
    setResetGame(true);
  };

  const showHelp = () => {
    setGameState("help");
  };

  const showTerms = () => {
    setGameState("terms");
  };

  const closePopup = () => {
    setShowDifficultyOverlay(false);
    setTimer(0);
    setResetGame(true);
    setGameState("game");
  };

  const finishGame = () => {
    setGameState("finished");
  };

  const [showDifficultyOverlay, setShowDifficultyOverlay] = useState(true);
  const [difficulty, setDifficulty] = useState("Easy");

  useEffect(() => {
    if (resetGame) {
      setResetGame(false);
    }
  }, [resetGame]);


  return (
    <Router>
      <div>
        <Header />
          <div className="button-container">
            <button onClick={startGame}>New game</button>
            <button onClick={showHelp}>Help</button>
          </div>
          {gameState === "finished" && (
            <div className="overlay">
              <div className="overlay-inner">
                <h2>Congratulations! You completed the game!</h2>
                <p>Your time: {timer} seconds</p>
                <button onClick={closePopup} data-testid="close-popup-button">Close</button>
              </div>
            </div>
          )}
          <div className="centered-container">
            <div className="App">
              <Routes>
                <Route path="/" element={<GameBoard timer={timer} setGameState={setGameState} resetGame={resetGame} difficulty={difficulty} setDifficulty={setDifficulty} showDifficultyOverlay={showDifficultyOverlay} setShowDifficultyOverlay={setShowDifficultyOverlay} />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
