// board should be 10x10
function createGameboard() {
  const array = new Array(10).fill(new Array(10).fill(null));
  return array;
}

// takes a 2-d array
function isInBounds(array) {
  return array[0] >= 0 && array[0] <= 10 && array[1] >= 0 && array[1] <= 10;
}

class Gameboard {
  constructor() {
    this.board = createGameboard();
    this.missedShots = new Array();
  }

  placeBoat(boat, index, axis) {
    if (!boat || !index || !axis) {
      return false;
    }
    if (!Array.isArray(index)) {
      return false;
    }
    if (!isInBounds(index)) {
      return false;
    }
    // divide between x and y axis
    const length = boat.length;
    if (axis === "x") {
      if (!isInBounds([index[0], index[1] + length])) {
        return false;
      }
      for (let i = 0; i < length; i++) {
        this.board[index[0]][index[1] + i] = boat; // correspond to across the gameboard
      }
      return true;
    } else if (axis === "y") {
      if (!isInBounds([index[0] + length, index[1]])) {
        return false;
      }
      for (let i = 0; i < length; i++) {
        this.board[index[0] + i][index[1]] = boat; // correspond to down the gameboard
      }
      return true;
    } else {
      return false;
    }
  }
  // received attack
  receiveAttack(index) {
    if (!index || !Array.isArray(index)) {
      return null;
    }
    if (!isInBounds(index)) {
      return null;
    }
    let co_ordinates = this.board[index[0]][index[1]];
    if (!co_ordinates) {
      this.missedShots.push(index);
      co_ordinates = "MISS";
      return false;
    } else if (co_ordinates.Sunk) {
      return "Already Sunk";
    } else if (typeof co_ordinates === "object") {
      co_ordinates.hit();
      return true;
    }
  }
}

export default Gameboard;
