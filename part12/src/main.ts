import * as fs from 'fs';

const inputFolder = 'part11/__input__';
const file = fs.readFileSync(`${inputFolder}/test.txt`, 'utf-8');

const lines = file.split('\n');
const grid = [];
// const grid = lines.map((line) => line.split(''));
const initialPosition = { x: undefined, y: undefined };
// console.log(grid);
for (let i = 0; i < lines.length; i++) {
  grid.push(lines[i].split(''));
  const initialIndex = lines[i].indexOf('^');
  if (initialIndex !== -1) {
    initialPosition.x = initialIndex;
    initialPosition.y = i;
  }
  console.log(lines[i]);
}

let nextStepX = 0;
let nextStepY = -1;
let currentX = initialPosition.x;
let currentY = initialPosition.y;

function printGrid(grid: string[][]) {
  console.log('=====================');
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(''));
  }
  console.log('=====================');
}

const visited = new Map<string, boolean>();
let blockingPositions = 0;

function getRightOfCurrent() {
  if (nextStepY === -1) {
    return grid[currentY][currentX + 1];
  } else if (nextStepX === 1) {
    return grid[currentY + 1][currentX];
  } else if (nextStepY === 1) {
    return grid[currentY][currentX - 1];
  } else if (nextStepX === -1) {
    return grid[currentY - 1][currentX];
  }
}

while (
  currentX + nextStepX >= 0 &&
  currentX + nextStepX < grid[0].length &&
  currentY + nextStepY >= 0 &&
  currentY + nextStepY < grid.length
) {
  const right = getRightOfCurrent();
  if (grid[currentY - nextStepY][currentX - nextStepX] === 'X' && right === 'X') {
    blockingPositions++;
  }
  while (grid[currentY + nextStepY][currentX + nextStepX] === '#') {
    if (nextStepY === -1) {
      nextStepX = 1;
      nextStepY = 0;
    } else if (nextStepX === 1) {
      nextStepY = 1;
      nextStepX = 0;
    } else if (nextStepY === 1) {
      nextStepX = -1;
      nextStepY = 0;
    } else if (nextStepX === -1) {
      nextStepY = -1;
      nextStepX = 0;
    }
  }
  currentY += nextStepY;
  currentX += nextStepX;
  // Take step
  grid[currentY][currentX] = 'X';
  visited.set(`${currentX},${currentY}`, true);

}
printGrid(grid);

console.log(initialPosition);
let secondCount = 1;
for (let i = 0; i < grid.length; i++) {
  secondCount += grid[i].filter((cell) => cell === 'X').length;
}

console.log(secondCount);

console.log('Final score', blockingPositions);
