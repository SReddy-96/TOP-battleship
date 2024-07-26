import fillGame from "./fillGame";

export default function GameFlow(realPlayer, computerPlayer) {
  // start the game
  fillGame(realPlayer, computerPlayer);

  // populate the grids
  realPlayer.DisplayBoard();

  // set activePlayer as realPlayer
  const players = [realPlayer, computerPlayer];
  let activePlayer = players[0];
  let opponent = players[1];

  // create a conditional statement to switch players after the turn, so once something has been clicked or receiveHit has been run.
  const switchOpponentTurn = () => {
    opponent = opponent === players[0] ? players[1] : players[0];
  };
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];

    // call the computer's turn function
    if (activePlayer === players[1]) {
      computerRound(players[0]);
    }
  };

  const getActivePlayer = () => activePlayer;

  // handle the adding and removing of <td>
  function tdEventHandler(cell) {
    let index = cell.id;
    let last3Char = index.substring(index.length - 3); // get the id's co-ordinates
    let col = last3Char.charAt(2);
    let row = last3Char.charAt(0);
    const playerResult = playRound(activePlayer, opponent, row, col); // play round when cell clicked

    // only if the player misses
    if (playerResult === false) {
      // toggle which grid to display after turn.
      document.querySelector(".realPlayerBoard").classList.toggle("activeGrid");
      document
        .querySelector(".computerPlayerBoard")
        .classList.toggle("activeGrid");
      // then run switchPlayer
      switchPlayerTurn();
      // switch opponent
      switchOpponentTurn();
    }
  }

  // play the round.
  // add eventlistener to each cell in the table. The real player opponent grid has the event listeners
  const TD = document.querySelectorAll(".computerPlayerBoard>tbody>tr>td");
  TD.forEach((cell) => {
    cell.removeEventListener("click", () => tdEventHandler);
    cell.addEventListener("click", () => tdEventHandler(cell)), {once: true};
  });

  // run if computers turn.
  function computerRound(opponent) {
    let continuesTurn = true;
    while (continuesTurn === true) {
      // loop until miss
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      continuesTurn = playRound(activePlayer, opponent, row, col); // play round
    }
    // toggle which grid to display after turn.
    document.querySelector(".realPlayerBoard").classList.toggle("activeGrid");
    document
      .querySelector(".computerPlayerBoard")
      .classList.toggle("activeGrid");

    // then run switchPlayer
    switchPlayerTurn();
    switchOpponentTurn();
  }
}

//  play round, takes opposite player
function playRound(activePlayer, opponent, row, col) {
  // if cell is populated then playRound again
  const hit = opponent.gameboard.receiveAttack([row, col]);

  // check to see if the document has something in it.
  const cell = document.getElementById(`${opponent.type}-${row}-${col}`);
  if (hit === true) {
    console.log("hit");
    cell.textContent = "O";

    // check if isBoatsSunk on each turn
    const hasPlayerWon = opponent.gameboard.isBoatsSunk();
    if (hasPlayerWon == true) {
      const winnerHeading = document.getElementById("winnerHeading");
      const winnerDialog = document.getElementById("winnerDialog");

      winnerHeading.textContent = `${activePlayer.type} Player Wins!!!`;
      winnerDialog.showModal();
    } else {
      console.log("player not won");
    }
    return true;
  } else if (hit === false) {
    console.log("miss");
    cell.textContent = "X";
    return false;
  } else if (hit === null) {
    console.log("ERROR");
    return false;
  }
}
