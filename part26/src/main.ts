import * as fs from 'fs';

const inputFolder = 'part26/__input__';
const file = fs.readFileSync(`${inputFolder}/real.txt`, 'utf-8');

const lines = file.split('\n');

class Coordinate {
  constructor(public x: number, public y: number) {}
}

const ACost = 3;
const BCost = 1;

class Game {
  constructor(
    public a: Coordinate,
    public b: Coordinate,
    public prize: Coordinate
  ) {}
}

let gameSoFar = [];
const games: Game[] = [];
const OFFSET = 10000000000000;

for (const line of lines) {
  if (line === '') {
    continue;
  }
  const numbers = line.match(/\d+/g);
  gameSoFar.push(numbers);
  if (line.startsWith('Prize:')) {
    games.push(
      new Game(
        new Coordinate(+gameSoFar[0][0], +gameSoFar[0][1]),
        new Coordinate(+gameSoFar[1][0], +gameSoFar[1][1]),
        new Coordinate(+gameSoFar[2][0] + OFFSET, +gameSoFar[2][1] + OFFSET)
      )
    );
    // Push to games
    gameSoFar = [];
  }
}

let total = 0;
for (const game of games) {
  const i =
    (game.b.x * game.prize.y - game.b.y * game.prize.x) /
    (game.a.y * game.b.x - game.a.x * game.b.y);
  const j = (game.prize.x - game.a.x * i) / game.b.x;
  if (
    Number.isInteger(i) &&
    Number.isInteger(j) &&
    i * game.a.x + j * game.b.x === game.prize.x &&
    i * game.a.y + j * game.b.y === game.prize.y
  ) {
    total += i * ACost + j * BCost;
  }
}

console.log('Final score', total);
