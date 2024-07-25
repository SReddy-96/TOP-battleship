import "./style.css";
import Gameboard from "./gameboard/gameboard.js";
import Ship from "./ship/ship.js";
import Player from "./player/player.js";
import displayBoard from "./displayBoard.js";
import fillGame from "./fillGame.js";
import GameFlow from "./gameFlow.js";

document.addEventListener("DOMContentLoaded", () => {
  const realPlayer = new Player("real");
  const comPlayer = new Player("computer");
  GameFlow(realPlayer, comPlayer);
});
