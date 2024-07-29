import Gameboard from "../gameboard/gameboard";
import randomPlaceBoat from "../gameFlow/randomPlaceBoat";

// type should be 'real' or 'computer'
class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard();
  }

  DisplayBoard() {
    // check player gameboard is not empty
    if (!this.gameboard) {
      return false;
    }
    // take player and get board and type
    const playerType = this.type;
    const playerBoard = this.gameboard.board;

    // iterate through board
    for (let i = 0; i < playerBoard.length; i++) {
      for (let j = 0; j < playerBoard[i].length; j++) {
        if (playerBoard[i][j] !== null) {
          document.getElementById(
            `${playerType}-${i}-${j}`
          ).style.backgroundColor = "grey"; // use index to get the cell `${type}-${row}-${col}`
        }
      }
    }
    return true;
  }

  reset() {
    this.gameboard = new Gameboard();
  }

  randomize() {
    randomPlaceBoat(this);
  }
}

export default Player;
