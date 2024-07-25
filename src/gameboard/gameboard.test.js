import Gameboard from "./gameboard";
import Ship from "../ship/ship.js";

test("create new Gameboard", () => {
  const gameboard = new Gameboard();
  expect(gameboard.board.length).toEqual(10);
});

test("new gameboard is an Array", () => {
  const gameboard = new Gameboard();
  expect(Array.isArray(gameboard.board[0])).toBeTruthy();
});

test("Ship at correct Co-ordinates for X ", () => {
  const gameboard = new Gameboard();
  const boat = new Ship(2);
  expect(gameboard.placeBoat(boat, [0, 2], "x")).toBeTruthy();
});

test("Ship at correct Co-ordinates for Y ", () => {
  const gameboard = new Gameboard();
  const boat = new Ship(2);
  expect(gameboard.placeBoat(boat, [0, 2], "y")).toBeTruthy();
});

test("place boat has no arguments should throw error", () => {
  const gameboard = new Gameboard();
  expect(() => gameboard.placeBoat()).toThrow();
});

test("place boat index is not an array", () => {
  const gameboard = new Gameboard();
  const boat = new Ship(2);
  expect(gameboard.placeBoat(boat, "boat", "x")).toBeFalsy();
});

test("place boat index is out of bounds", () => {
  const gameboard = new Gameboard();
  const boat = new Ship(2);
  expect(gameboard.placeBoat(boat, [-1, 11], "x")).toBeFalsy();
});

test("Ship at out of bounds Co-ordinates for X ", () => {
  const gameboard = new Gameboard();
  const boat = new Ship(2);
  expect(gameboard.placeBoat(boat, [0, 10], "x")).toBeFalsy();
});

test("Ship at out of bounds Co-ordinates for Y ", () => {
  const gameboard = new Gameboard();
  const boat = new Ship(2);
  expect(gameboard.placeBoat(boat, [10, 2], "y")).toBeFalsy();
});

test("receive shot has no argument", () => {
  const gameboard = new Gameboard();
  expect(gameboard.receiveAttack()).toBeNull();
});

test("receive shot argument is not an array", () => {
  const gameboard = new Gameboard();
  expect(gameboard.receiveAttack("Attack")).toBeNull();
});

test("receive shot argument is out of bounds", () => {
  const gameboard = new Gameboard();
  expect(gameboard.receiveAttack([-2, 11])).toBeNull();
});

test("receive shot hits a boat", () => {
  const gameboard = new Gameboard();
  const boat = new Ship(2);
  gameboard.placeBoat(boat, [0, 2], "x");
  expect(gameboard.receiveAttack([0, 3])).toBeTruthy();
});

test("receive shot misses a boat", () => {
  const gameboard = new Gameboard();
  const boat = new Ship(2);
  gameboard.placeBoat(boat, [0, 2], "x");
  expect(gameboard.receiveAttack([0, 0])).toBeFalsy();
});

test("All boats are sunk", () => {
  const gameboard = new Gameboard();
  const boat = new Ship(2);
  gameboard.placeBoat(boat, [0, 2], "x");
  gameboard.receiveAttack([0, 2]);
  gameboard.receiveAttack([0, 3]);
  expect(gameboard.isBoatsSunk()).toBeTruthy();
});
test("All boats are NOT sunk", () => {
  const gameboard = new Gameboard();
  const boat = new Ship(2);
  gameboard.placeBoat(boat, [0, 2], "x");
  expect(gameboard.isBoatsSunk()).toBeFalsy();
});
