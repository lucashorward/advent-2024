import * as fs from 'fs';

const inputFolder = 'part25/__input__';
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
        new Coordinate(+gameSoFar[2][0], +gameSoFar[2][1])
      )
    );
    // Push to games
    gameSoFar = [];
  }
}

let total = 0;
for (const game of games) {
  inner: for (let i = 100; i > 0; i--) {
    const aX = game.b.x * i;
    const aY = game.b.y * i;
    const xDiff = game.prize.x - aX;
    const yDiff = game.prize.y - aY;
    if (xDiff < 0 || yDiff < 0) {
      continue inner;
    }
    if (xDiff % game.a.x === 0 && yDiff % game.a.y === 0) {
      const timesX = xDiff / game.a.x;
      const timesY = yDiff / game.a.y;
      if (timesX !== timesY) {
        console.log('Not equal', game.prize, i, timesX, timesY);
      }
      if (timesX > 100 || timesY > 100 || timesX !== timesY) {
        continue inner;
      }
      const finalX = aX + (timesX * game.a.x);
      const finalY = aY + (timesY * game.a.y);
      if (finalX !== +game.prize.x || finalY !== +game.prize.y) {
        console.log(finalX, finalY);
        console.log('Not right', game.prize, i, timesX, timesY);
        continue inner;
      }
      const cost = (i * BCost) + (timesX * ACost);
      total += cost;
    }
  }
}

console.log('Final score', total);
