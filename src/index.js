import "./style.css";
import Player from "./player/player.js";
import GameFlow from "./gameFlow/gameFlow.js";

document.addEventListener("DOMContentLoaded", () => {
  // start first game
  let realPlayer = new Player("real");
  let comPlayer = new Player("computer");
  let newGame = new GameFlow(realPlayer, comPlayer);
  newGame.initialize();

  // restart game
  const restartButton = document.getElementById("restartButton");
  restartButton.addEventListener("click", () => newGame.restartGame());

  // play the round.
  // add eventlistener to each cell in the table. The real player opponent grid has the event listeners
  const TD = document.querySelectorAll(".computerPlayerBoard>tbody>tr>td");
  TD.forEach((cell) => {
    cell.removeEventListener("click", () => tdEventHandler(cell, newGame));
    cell.addEventListener("click", () => tdEventHandler(cell, newGame)),
      { once: true };
  });
});

// handle the adding and removing of <td>
function tdEventHandler(cell, newGame) {
  let index = cell.id;
  let last3Char = index.substring(index.length - 3); // get the id's co-ordinates
  let col = last3Char.charAt(2);
  let row = last3Char.charAt(0);
  const playerResult = newGame.playRound(row, col); // play round when cell clicked

  // only if the player misses
  if (playerResult === false) {
    // toggle which grid to display after turn.
    document.querySelector(".realPlayerBoard").classList.toggle("activeGrid");
    document
      .querySelector(".computerPlayerBoard")
      .classList.toggle("activeGrid");

    // then run switchPlayer
    newGame.switchOpponentTurn();
    newGame.switchPlayerTurn();
  }
}
