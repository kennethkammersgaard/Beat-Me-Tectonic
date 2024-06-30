import React from "react";

function HelpPage() {
  const handleBackToGame = () => {
    // Navigate directly to the home page
    window.location.href = '/';
  };
  return (
    <div className="HelpPage">
      <h1>Help</h1>
      <h2>Welcome to Beat-Me-Tectonic!</h2>
      <h2>Game Rules:</h2>
      <ul>
        <li>
          The goal of the game is to fill the board with numbers from 1 to the
          size of the area they belong to.
        </li>
        <li>
          Each cell belongs to a specific area, indicated by the borders
          surrounding the cells.
        </li>
        <li>You cannot place the same number in the same area twice.</li>
        <li>
          You cannot place a number if it's adjacent to a cell with the same
          number.
        </li>
        <li>
          If you make an invalid move, the cell will turn red, and you will have
          a 10-second penalty.
        </li>
      </ul>

      <h2>How to Play:</h2>
      <ol>
        <li>
          Click on a cell to select it. The selected cell will turn yellow.
        </li>
        <li>
          Click on a number button to place that number in the selected cell.
        </li>
        <li>If the move is valid, the cell will turn green.</li>
        <li>Continue placing numbers until you complete the board.</li>
        <li>Try to complete the board in the shortest time possible!</li>
      </ol>
      <br />
      <button onClick={handleBackToGame}>Back to Game</button>
    </div>
  );
}

export default HelpPage;
