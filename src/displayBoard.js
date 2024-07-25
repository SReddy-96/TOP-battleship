export default function DisplayBoard(player) {
  // check player is not empty
  if (!player) {
    return false;
  }
  // take player and get board and type
  const playerType = player.type;
  const playerBoard = player.gameboard.board;

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
