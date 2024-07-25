import DisplayBoard from "./displayBoard";
import fillGame from "./fillGame";

export default function GameFlow(realPlayer, computerPlayer) {
  // start the game
  fillGame(realPlayer, computerPlayer);

  // populate the grids
  DisplayBoard(realPlayer);

  // set activePlayer as realPlayer
  const players = [realPlayer, computerPlayer];
  let activePlayer = players[0];
  let opponent = players[1];

  // create a conditional statement to switch players after the turn, so once something has been clicked or receiveHit has been run.
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const switchOpponentTurn = () => {
    opponent = opponent === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  // play the round.
  // add eventlistener to each cell in the table.
  const TD = document.querySelectorAll("td");
  TD.forEach((cell) => {
    cell.addEventListener("click", () => {
      let index = cell.id;
      let last3Char = index.substring(index.length - 3); // get the id's co-ordinates
      let col = last3Char.charAt(2);
      let row = last3Char.charAt(0);
      playRound(activePlayer, opponent, row, col); // play round when cell clicked
    });
  });

  // make no playing players grid opacity and disable clicking. `${type}PlayerBoard` or have an active class and set it in CSS
  document.querySelector(".realPlayerBoard").classList.toggle("activeGrid");
  document.querySelector(".computerPlayerBoard").classList.toggle("activeGrid");

  // then run switchPlayer
  switchPlayerTurn();
}

//  play round, takes opposite player
function playRound(activePlayer, opponent, row, col) {
  // if cell is populated then playRound again
  const hit = opponent.gameboard.receiveAttack([row, col]);

  // check to see if the document has something in it.
  const cell = document.getElementById(`${opponent.type}-${row}-${col}`);
  if (cell.innerHTML !== "") {
    return 'already hit'
  }
  if (hit === true) {
    console.log("hit");
    cell.textContent = "O";

    // check if isBoatsSunk on each turn
    const hasPlayerWon = opponent.gameboard.isBoatsSunk();
    if (hasPlayerWon == true) {
      console.log("player won");
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

  // populate the grid cell with a 'X' if it miss or an Icon if a hit
  // if hit then display icon then playRound again
  // if miss display 'X' and then return.
}
