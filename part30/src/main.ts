import * as fs from 'fs';

const inputFolder = 'part30/__input__';
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

function getBuddyDirection(element: GridElement) {
  if (element.value === '[') {
    return { x: 1, y: 0 };
  }
  if (element.value === ']') {
    return { x: -1, y: 0 };
  }
}

class GridElement {
  constructor(public value: string, public x: number, public y: number) {}

  public canMove(direction: string, callBuddy = true) {
    if (this.value === '.') {
      return true;
    }
    if (this.value === '#') {
      return false;
    }
    const delta = getDirection(direction);
    const nextX = this.x + delta.x;
    const nextY = this.y + delta.y;
    if (
      nextX < 0 ||
      nextY < 0 ||
      nextY >= grid.length ||
      nextX >= grid[nextY].length
    ) {
      return;
    }
    let canMoveBuddy = true;
    const buddyDelta = getBuddyDirection(this);
    if (buddyDelta) {
      const buddy = grid[this.y + buddyDelta.y][this.x + buddyDelta.x];
      canMoveBuddy =
        callBuddy && nextY !== this.y ? buddy.canMove(direction, false) : true;
    }
    return canMoveBuddy && grid[nextY][nextX].canMove(direction);
  }

  public move(direction: string, previous: GridElement, callBuddy = true) {
    if (this.value === '.') {
      this.value = previous.value;
      return;
    }
    const delta = getDirection(direction);
    const nextX = this.x + delta.x;
    const nextY = this.y + delta.y;
    if (
      nextX < 0 ||
      nextY < 0 ||
      nextY >= grid.length ||
      nextX >= grid[nextY].length
    ) {
      return;
    }
    if (this.x === 7 && this.y === 3) {
      console.log('Move', direction, this.value, nextX, nextY);
    }
    const buddyDelta = getBuddyDirection(this);
    if (delta.y !== 0 && callBuddy && buddyDelta) {
      const buddy = grid[this.y + buddyDelta.y][this.x + buddyDelta.x];
      grid[buddy.y][buddy.x].move(direction, { value: '.' } as GridElement, false);
    }

    const oldValue = this.value;
    this.value = previous.value;
    // this.buddyDelta = previous.buddyDelta;
    // previous.buddyDelta = undefined;
    // if (!callBuddy && this.value !== '.') {
    //   return grid[nextY][nextX];
    // }
    // printGrid(grid)
    return grid[nextY][nextX].move(direction, {
      value: oldValue,
    } as GridElement);
  }

  public gpsValue() {
    if (this.value === '[') {
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
    let xOffset = 0;
    for (let inner = 0; inner < line.length; inner++) {
      const gridElement = new GridElement(line[inner], inner + xOffset, outer);
      const extraGridElement = new GridElement(
        line[inner],
        inner + 1 + xOffset,
        outer
      );
      xOffset++;
      if (line[inner] === '@') {
        robotPosition = gridElement;
        extraGridElement.value = '.';
      }
      if (line[inner] === 'O') {
        gridElement.value = '[';
        extraGridElement.value = ']';
      }
      if (lines[inner] === '#') {
        gridElement.value = '#';
        extraGridElement.value = '#';
      }
      if (lines[inner] === '.') {
        gridElement.value = '.';
        extraGridElement.value = '.';
      }
      row.push(gridElement);
      row.push(extraGridElement);
    }
    grid.push(row);
  } else {
    moves.push(...line.split(''));
  }
}
printGrid(grid);
for (const move of moves) {
  console.log('Move', move);
  const direction = getDirection(move);
  const nextX = robotPosition.x + direction.x;
  const nextY = robotPosition.y + direction.y;
  if (
    nextX < 0 ||
    nextY < 0 ||
    nextY >= grid.length ||
    nextX >= grid[nextY].length
  ) {
    continue;
  }
  if (grid[robotPosition.y][robotPosition.x].canMove(move, false)) {
    grid[robotPosition.y][robotPosition.x].move(
      move,
      { value: '.' } as GridElement,
      false
    );
    robotPosition = { x: nextX, y: nextY };
  }
  printGrid(grid);
}

let total = 0;
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    total += grid[i][j].gpsValue();
  }
}

console.log('Final score', total);
