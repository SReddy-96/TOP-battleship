import fillGame from "./fillGame";

class GameFlow {
  constructor(realPlayer, computerPlayer) {
    this.players = [realPlayer, computerPlayer];
    this.activePlayer = this.players[0];
    this.opponent = this.players[1];
  }

  initialize() {
    this.activePlayer.randomize();
    this.opponent.randomize();
    this.activePlayer.DisplayBoard();
  }

  switchPlayerTurn() {
    this.activePlayer =
      this.activePlayer === this.players[0] ? this.players[1] : this.players[0];

    if (this.activePlayer.type === "computer") {
      this.computerRound();
    }
  }

  switchOpponentTurn() {
    this.opponent =
      this.opponent === this.players[0] ? this.players[1] : this.players[0];
  }

  computerRound() {
    let continuesTurn = true;
    while (continuesTurn === true) {
      // loop until miss
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      continuesTurn = this.playRound(row, col); // play round
    }
    // toggle which grid to display after turn.
    document.querySelector(".realPlayerBoard").classList.toggle("activeGrid");
    document
      .querySelector(".computerPlayerBoard")
      .classList.toggle("activeGrid");

    // then run switchPlayer
    this.switchOpponentTurn();
    this.switchPlayerTurn();
  }

  playRound(row, col) {
    // if cell is populated then playRound again
    const hit = this.opponent.gameboard.receiveAttack([row, col]);

    // check to see if the document has something in it.
    const cell = document.getElementById(`${this.opponent.type}-${row}-${col}`);
    if (hit === true) {
      cell.textContent = "💣";

      // check if isBoatsSunk on each turn
      const hasPlayerWon = this.opponent.gameboard.isBoatsSunk();
      if (hasPlayerWon == true) {
        const winnerHeading = document.getElementById("winnerHeading");
        const winnerDialog = document.getElementById("winnerDialog");

        winnerHeading.textContent = `${this.activePlayer.type} Player Wins!!!`;
        winnerDialog.showModal();
      } 
      return true;
    } else if (hit === false) {
      cell.textContent = "◼";
      return false;
    } else if (hit === null) {
      console.log("ERROR");
      return false;
    }
  }

  restartGame() {
    const winnerDialog = document.getElementById("winnerDialog");
    this.clearBoard();
    this.players.forEach((player) => player.reset());
    this.initialize();
    winnerDialog.close();
  }

  clearBoard() {
    const allTD = document.querySelectorAll("td");
    allTD.forEach((td) => {
      td.textContent = "";
      td.style.backgroundColor = "white";
    });
  }
}

export default GameFlow;
