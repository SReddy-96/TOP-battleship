import Gameboard from "../gameboard/gameboard";

// type should be 'real' or 'computer'
class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard();
  }
}

export default Player;
