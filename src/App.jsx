import { useEffect, useState } from "react";
import CellComponent from "./components/CellComponent";

function App() {
  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]);
  const [playerTurn, setPlayerTurn] = useState("cross");
  const [winner, setWinner] = useState(null);
  const [results, setResults] = useState({
    cross: 0,
    circle: 0,
  });

  let checkAllCells = cells.every((cell) => cell !== "");

  useEffect(() => {
    checkWinner();
  }, [cells]);

  function checkWinner() {
    let winnerCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winnerCombinations.forEach((combination) => {
      let crossWin = combination.every((comb) => cells[comb] === "cross");
      let circleWin = combination.every((comb) => cells[comb] === "circle");

      if (crossWin) {
        setWinner("The winner is cross!");
        setResults({ ...results, cross: results.cross + 1 });
      } else if (circleWin) {
        setWinner("The winner is circle!");
        setResults({ ...results, circle: results.circle + 1 });
      } else if (checkAllCells) {
        setWinner("There isn't a winner!");
      }
    });
    console.log(results);
  }

  function resetGame() {
    let emptyCells = new Array(9).fill("");
    setWinner(null);
    setCells(emptyCells);
    setPlayerTurn("cross");
  }

  return (
    <div className="app">
      <h1 className="title">X/O Game</h1>
      <div className="squareContainer">
        {cells.map((cell, index) => {
          return (
            <CellComponent
              key={index}
              id={index}
              cell={cell}
              cells={cells}
              setCells={setCells}
              playerTurn={playerTurn}
              setPlayerTurn={setPlayerTurn}
              winner={winner}
            />
          );
        })}
      </div>
      <h2 className="result">
        <span className="resultCross">Cross {results.cross}</span> :{" "}
        <span className="resultCircle">Circle {results.circle}</span>
      </h2>
      <button className="resetBtn" onClick={resetGame} disabled={!winner}>
        Reset Game
      </button>
      {winner && <h2 className="winnerHeader">{winner}</h2>}
    </div>
  );
}

export default App;
