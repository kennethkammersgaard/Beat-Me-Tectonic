import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GameBoard from "./GameBoard";
import HelpPage from "./HelpPage";
import TermsOfService from "./TermsOfService";

function App() {
  const [gameState, setGameState] = useState("game");
  const [user, setUser] = useState(null);
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

  const showTerms = () => {
    setGameState("terms");
  };

  const closePopup = () => {
    setGameState("game");
    setTimer(0);
    setResetGame(true);
    setGameState("game");
  };

  const finishGame = () => {
    setGameState("finished");
  };

  const [resetGame, setResetGame] = useState(false);

  useEffect(() => {
    if (resetGame) {
      setResetGame(false);
    }
  }, [resetGame]);

  const responseFacebook = (response) => {
    setUser({
      name: response.name,
      city: response.location?.name || "Unknown",
    });
  };

  return (
    <Router>
      <div>
        {!user && (
          <FacebookLogin
            appId="993897072203300"
            autoLoad={true}
            fields="name,location"
            callback={responseFacebook}
            render={renderProps => (
              <button onClick={renderProps.onClick}>Login with Facebook</button>
            )}
          />
        )}
        {user && (
          <div>
            <h2>Welcome, {user.name} from {user.city}</h2>
          </div>
        )}
        <div>
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
                <Route path="/" element={<GameBoard timer={timer} setGameState={setGameState} resetGame={resetGame} />} />
                <Route path="/help" element={<HelpPage setGameState={setGameState} />} />
                <Route path="/terms" element={<TermsOfService setGameState={setGameState} />} />
              </Routes>
            </div>
          </div>
          <div className="footer" style={{ textAlign: 'center' }}>
            <Link to="/terms">Vilkår for brug</Link>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
