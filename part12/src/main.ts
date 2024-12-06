import * as fs from 'fs';

const inputFolder = 'part12/__input__';
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

function wouldWeLoopIfWePutUpABlock(originalX: number, originalY: number) {
  const originalNextStepX = nextStepX;
  const originalNextStepY = nextStepY;
  // let firstLoop = true;
  // const blockedVisited = new Map<string, boolean>(visited);

  while (
    currentX + nextStepX >= 0 &&
    currentX + nextStepX < grid[0].length &&
    currentY + nextStepY >= 0 &&
    currentY + nextStepY < grid.length
  ) {
    while (grid[currentY + nextStepY][currentX + nextStepX] === '#') {
      // firstLoop = false;
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

    if (currentX === originalX && currentY === originalY) {
      currentX = originalX;
      currentY = originalY;
      nextStepY = originalNextStepY;
      nextStepX = originalNextStepX;
      return true;
    }

    // if (blockedVisited.has(`${currentX},${currentY}`)) {
    //   currentX = originalX;
    //   currentY = originalY;
    //   nextStepY = originalNextStepY;
    //   nextStepX = originalNextStepX;
    //   return true;
    // }

    currentY += nextStepY;
    currentX += nextStepX;
    // blockedVisited.set(`${currentX},${currentY}`, true);
  }
  
  currentX = originalX;
  currentY = originalY;
  nextStepY = originalNextStepY;
  nextStepX = originalNextStepX;
  return false;
}

while (
  currentX + nextStepX >= 0 &&
  currentX + nextStepX < grid[0].length &&
  currentY + nextStepY >= 0 &&
  currentY + nextStepY < grid.length
) {
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
  if (wouldWeLoopIfWePutUpABlock(currentX, currentY)) {
    blockingPositions++;
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
