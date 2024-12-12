import * as fs from 'fs';

const inputFolder = 'part23/__input__';
const file = fs.readFileSync(`${inputFolder}/real.txt`, 'utf-8');

const lines = file.split('\n');

function printGrid(grid: GridElement[][]) {
  console.log('=====================');
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].map((element) => element.value).join(''));
  }
  console.log('=====================');
}

class GridElement {
  constructor(public value: string, public row: number, public col: number) {}

  public hasBeenVisitedBy: Set<string> = new Set();

  public visited = false;
}

const grid: GridElement[][] = [];

for (let i = 0; i < lines.length; i++) {
  const row: GridElement[] = [];
  for (let j = 0; j < lines[i].length; j++) {
    row.push(new GridElement(lines[i][j], i, j));
  }
  grid.push(row);
}

const regions = new Map<string, number>();

function calculateValue(element: GridElement) {
  // Defaults to 1 to account for the area cost
  if (element.visited) {
    return 0;
  }
  element.visited = true;
  let total = 0;
  if (element.row === 0) {
    total++;
  }
  if (element.row === grid.length - 1) {
    total++;
  }
  if (element.col === 0) {
    total++;
  }
  if (element.col === grid[element.row].length - 1) {
    total++;
  }
  // Look around for neighbours that have a different value, that have not been visited by this element
  // If found, add 1 to total and mark the neighbour as visited by this element
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      // Skip the current element
      if (i === 0 && j === 0) {
        continue;
      }
      // Skip diagonals
      if (i !== 0 && j !== 0) {
        continue;
      }
      const neighbourRow = element.row + i;
      const neighbourCol = element.col + j;
      if (
        neighbourRow < 0 ||
        neighbourRow >= grid.length ||
        neighbourCol < 0 ||
        neighbourCol >= grid[neighbourRow].length
      ) {
        continue;
      }
      const neighbour = grid[neighbourRow][neighbourCol];
      if (
        neighbour.value !== element.value &&
        !neighbour.hasBeenVisitedBy.has(
          `${element.value}-${element.row}-${element.col}`
        )
      ) {
        total++;
        neighbour.hasBeenVisitedBy.add(
          `${element.value}-${element.row}-${element.col}`
        );
      }
    }
  }

  return total;
}

function visitRegion(col: number, row: number, previous: GridElement) {
  if (row < 0 || row >= grid.length || col < 0 || col >= grid[row].length) {
    return { perimeter: 0, area: 0 };
  }
  const element = grid[row][col];
  if (previous.value !== element.value) {
    return { perimeter: 0, area: 0 };
  }
  if (element.visited) {
    return { perimeter: 0, area: 0 };
  }
  const score = calculateValue(element);
  const upValue = visitRegion(col, row - 1, element);
  const downValue = visitRegion(col, row + 1, element);
  const leftValue = visitRegion(col - 1, row, element);
  const rightValue = visitRegion(col + 1, row, element);
  return {
    perimeter:
      score +
      upValue.perimeter +
      downValue.perimeter +
      leftValue.perimeter +
      rightValue.perimeter,
    area: 1 + upValue.area + downValue.area + leftValue.area + rightValue.area,
  };
}

// const amountPerType = new Map<string, number>();
let totalScore = 0;
for (let outer = 0; outer < grid.length; outer++) {
  for (let inner = 0; inner < grid[outer].length; inner++) {
    const value = visitRegion(inner, outer, grid[outer][inner]);
    console.log(
      `Region ${grid[outer][inner].value} has a boundary of ${value.perimeter} and area of ${value.area}`
    );
    totalScore += value.perimeter * value.area;
  }
}

// let totalScore = 0;
// for (const [key, value] of regions.entries()) {
//   console.log(`Region ${key} has a boundary of ${value}`);
//   const amount = amountPerType.get(key);
//   const score = value * amount;
//   totalScore += score;
// }

printGrid(grid);
console.log(regions);

console.log('Final score', totalScore);
