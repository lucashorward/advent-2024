import * as fs from 'fs';

const inputFolder = 'part29/__input__';
const file = fs.readFileSync(`${inputFolder}/real.txt`, 'utf-8');

const lines = file.split('\n');

const grid: GridElement[][] = [];

function getDirection(move: string) {
  if (move === '^') {
    return { x: 0, y: -1 };
  }
  if (move === 'v') {
    return { x: 0, y: 1 };
  }
  if (move === '<') {
    return { x: -1, y: 0 };
  }
  if (move === '>') {
    return { x: 1, y: 0 };
  }
}

class GridElement {
  constructor(public value: string, public x: number, public y: number) {}

  public canMove(direction: string) {
    if (this.value === '.') {
      return true;
    }
    if (this.value === '#') {
      return false;
    }
    const delta = getDirection(direction);
    const nextX = this.x + delta.x;
    const nextY = this.y + delta.y;
    return grid[nextY][nextX].canMove(direction);
  }

  public move(direction: string, previous: GridElement) {
    if (this.value === '.') {
      this.value = previous.value;
      return;
    }
    const oldValue = this.value;
    this.value = previous.value;
    const delta = getDirection(direction);
    const nextX = this.x + delta.x;
    const nextY = this.y + delta.y;
    return grid[nextY][nextX].move(direction, { value: oldValue } as GridElement);
  }

  public gpsValue() {
    if (this.value === 'O') {
      return 100 * this.y + this.x;
    }
    return 0;
  }
}

const moves = [];

function printGrid(grid: GridElement[][]) {
  console.log('=====================');
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].map((element) => element.value).join(''));
  }
  console.log('=====================');
}

let robotPosition = { x: 0, y: 0 };

for (let outer = 0; outer < lines.length; outer++) {
  const line = lines[outer];
  if (line === '') {
    continue;
  }
  if (line.startsWith('#')) {
    // Grid
    const row = [];
    for (let inner = 0; inner < line.length; inner++) {
      if (line[inner] === '@') {
        robotPosition = { x: inner, y: outer };
      }
      row.push(new GridElement(line[inner], inner, outer));
    }
    grid.push(row);
  } else {
    // Movement
    moves.push(...line.split(''));
  }
}

for (const move of moves) {
  console.log('Move', move);
  const direction = getDirection(move);
  const nextX = robotPosition.x + direction.x;
  const nextY = robotPosition.y + direction.y;
  if (nextX < 0 || nextY < 0 || nextY >= grid.length || nextX >= grid[nextY].length) {
    continue;
  }
  if (grid[robotPosition.y][robotPosition.x].canMove(move)) {
    grid[robotPosition.y][robotPosition.x].move(move, { value: '.' } as GridElement);
    robotPosition = { x: nextX, y: nextY };
  }
  printGrid(grid)
}

let total = 0;
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    total += grid[i][j].gpsValue();
  }
}

console.log('Final score', total);
