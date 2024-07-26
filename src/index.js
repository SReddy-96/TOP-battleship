import "./style.css";
import Gameboard from "./gameboard/gameboard.js";
import Ship from "./ship/ship.js";
import Player from "./player/player.js";
import fillGame from "./fillGame.js";
import GameFlow from "./gameFlow.js";

document.addEventListener("DOMContentLoaded", () => {
  let realPlayer = new Player("real");
  let comPlayer = new Player("computer");
  GameFlow(realPlayer, comPlayer);

  const restartButton = document.getElementById("restartButton");
  restartButton.addEventListener("click", () =>
    restartGame(realPlayer, comPlayer)
  );
});

function clearBoard() {
  const allTD = document.querySelectorAll("td");
  allTD.forEach((td) => {
    td.textContent = "";
  });
}

function restartGame(realPlayer, comPlayer) {
  const winnerDialog = document.getElementById("winnerDialog");
  clearBoard();
  realPlayer.reset();
  comPlayer.reset();
  GameFlow(realPlayer, comPlayer);
  winnerDialog.close();
}
