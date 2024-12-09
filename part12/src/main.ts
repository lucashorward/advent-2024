import * as fs from 'fs';

const inputFolder = 'part12/__input__';
const file = fs.readFileSync(`${inputFolder}/real.txt`, 'utf-8');

const lines = file.split('\n');
const grid = [];
const initialPosition = { x: undefined, y: undefined };
for (let i = 0; i < lines.length; i++) {
  grid.push(lines[i].split(''));
  const initialIndex = lines[i].indexOf('^');
  if (initialIndex !== -1) {
    initialPosition.x = initialIndex;
    initialPosition.y = i;
  }
  console.log(lines[i]);
}

function printGrid(grid: string[][]) {
  console.log('=====================');
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(''));
  }
  console.log('=====================');
}

let blockingPositions = 0;

function wouldWeLoopIfWePutUpABlock(originalX: number, originalY: number) {
  let nextStepX = 0;
  let nextStepY = -1;
  let currentX = initialPosition.x;
  let currentY = initialPosition.y;

  const originalGridValue = grid[originalY][originalX];
  if (originalGridValue === '#' || originalGridValue === '^') {
    return false;
  }
  grid[originalY][originalX] = 'O';
  const visitedMap = new Map<string, number>();

  while (
    currentX + nextStepX >= 0 &&
    currentX + nextStepX < grid[0].length &&
    currentY + nextStepY >= 0 &&
    currentY + nextStepY < grid.length
  ) {
    while (
      grid[currentY + nextStepY][currentX + nextStepX] === '#' ||
      grid[currentY + nextStepY][currentX + nextStepX] === 'O'
    ) {
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

    // Mark, have we been going in _fucking_ circles?
    if (
      visitedMap.has(`${currentX},${currentY},${nextStepX},${nextStepY}`)
    ) {
      grid[originalY][originalX] = originalGridValue;
      return true;
    }


    if (visitedMap.has(`${currentX},${currentY},${nextStepX},${nextStepY}`)) {
      visitedMap.set(
        `${currentX},${currentY},${nextStepX},${nextStepY}`,
        visitedMap.get(`${currentX},${currentY},${nextStepX},${nextStepY}`) + 1
      );
    } else {
      visitedMap.set(`${currentX},${currentY},${nextStepX},${nextStepY}`, 1);
    }

    currentY += nextStepY;
    currentX += nextStepX;
  }
  grid[originalY][originalX] = originalGridValue;
  return false;
}

printGrid(grid);
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (wouldWeLoopIfWePutUpABlock(j, i)) {
      blockingPositions++;
    }
  }
}

let secondCount = 1;
for (let i = 0; i < grid.length; i++) {
  secondCount += grid[i].filter((cell) => cell === 'X').length;
}

console.log(secondCount);

console.log('Final score', blockingPositions);
