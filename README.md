# Battleship - The Odin Project

## Objective


## Model 
### Index
|  Desktop | Mobile   | 
|----------|----------|
| ![desktop]()|![mobile]()|


## Problems Encountered


## New Skills Acquired


## Technologies Used
- HTML
- CSS
- JavaScript
- Webpack
- Jest

## Pseudo

- create the UI for the grids for real and computer player 
- populate the grid with players ships inside a separate module(make this forced to start with)
- add eventlistener to all <td> and returns the id? When clicked it runs the player.gameboard.receiveHit()
- need to address when the player clicks an already hit square and if they hit to play again 
- handle the active turns. 
- restart button create a new Gameboard and players
- when player starts, create a computer player.
- Create a play module, flow of the game, keep track of who is currentPlayer.takes argument of player
- Flow of the game:
    - populate the boards and display (random) / player able to place boats on the screen
    - start game
    - real goes first, clicks a space on the grid, display if hit or miss
    - if real hits then they go again until a miss
    - give a timeout for computer so not straight away.
    - computer goes, same as above. if hit go again.
    - check every turn if `isBoatsSunk` if true, end game and other player wins.
    - display winner and restart button
