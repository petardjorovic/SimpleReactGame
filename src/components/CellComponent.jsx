import React from "react";

function CellComponent({
  cell,
  cells,
  setCells,
  playerTurn,
  setPlayerTurn,
  id,
  winner,
}) {
  function playerMove(event) {
    let chosenCell =
      event.target.firstChild.classList.contains("cross") ||
      event.target.firstChild.classList.contains("circle");
    if (!chosenCell) {
      if (playerTurn === "cross") {
        event.target.firstChild.classList.add("cross");
        handleChangedCell("cross");
        setPlayerTurn("circle");
      } else if (playerTurn === "circle") {
        event.target.firstChild.classList.add("circle");
        handleChangedCell("circle");
        setPlayerTurn("cross");
      }
    }
  }

  function handleChangedCell(classList) {
    let updatedCellsArray = cells.map((cell, index) => {
      if (id === index) {
        return classList;
      } else {
        return cell;
      }
    });
    setCells(updatedCellsArray);
  }

  return (
    <div className="square" id={id} onClick={!winner ? playerMove : null}>
      <div className={cell}></div>
    </div>
  );
}

export default CellComponent;
