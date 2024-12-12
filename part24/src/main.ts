import * as fs from 'fs';

const inputFolder = 'part24/__input__';
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

function calculateCorners(element: GridElement) {
  let corners = 0;
  // Corners of the grid count as corners
  if (
    (element.row === 0 &&
      (element.col === 0 || element.col === grid[element.row].length - 1)) ||
    (element.row === grid.length - 1 &&
      (element.col === 0 || element.col === grid[element.row].length - 1))
  ) {
    corners++;
  }
  // Look for orthagonal neighbours that have a different value, and check that the up/down left/right neighbours are either all in the same region or all not in the same region
  for (let outer = -1; outer <= 1; outer++) {
    for (let inner = -1; inner <= 1; inner++) {
      const corner = grid[element.row + outer]?.[element.col + inner];
      const horizontal = grid[element.row]?.[element.col + inner];
      const vertical = grid[element.row + outer]?.[element.col];
      if (!horizontal && !vertical) {
        continue;
      }
      if (outer === 0 && inner === 0) {
        continue;
      }
      // TODO left-bottom corner for A is not counted
      if (
        (corner?.value !== element.value &&
        ((horizontal?.value === element.value &&
          vertical?.value === element.value) ||
          (horizontal?.value !== element.value &&
            vertical?.value !== element.value))) ||
        (corner?.value === element.value && horizontal?.value !== element.value && vertical?.value !== element.value)
      ) {
        corners++;
      } else if (!horizontal && vertical?.value !== element.value) {
        corners++;
      } else if (!vertical && horizontal?.value !== element.value) {
        corners++;
      }
    }
  }
  return corners;
}

function calculateValue(element: GridElement) {
  // Defaults to 1 to account for the area cost
  if (element.visited) {
    return { perimeterValue: 0, sides: 0 };
  }
  element.visited = true;
  let perimeterValue = 0;
  if (element.row === 0) {
    perimeterValue++;
  }
  if (element.row === grid.length - 1) {
    perimeterValue++;
  }
  if (element.col === 0) {
    perimeterValue++;
  }
  if (element.col === grid[element.row].length - 1) {
    perimeterValue++;
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
        perimeterValue++;
        neighbour.hasBeenVisitedBy.add(
          `${element.value}-${element.row}-${element.col}`
        );
      }
    }
  }

  return { perimeterValue, sides: 0 };
}

function visitRegion(col: number, row: number, previous: GridElement) {
  if (row < 0 || row >= grid.length || col < 0 || col >= grid[row].length) {
    return { perimeter: 0, area: 0, sides: 0 };
  }
  const element = grid[row][col];
  if (previous.value !== element.value) {
    return { perimeter: 0, area: 0, sides: 0 };
  }
  if (element.visited) {
    return { perimeter: 0, area: 0, sides: 0 };
  }
  const corners = calculateCorners(element);
  // console.log(`Element ${element.value} has ${corners} corners`);
  const score = calculateValue(element);
  const upValue = visitRegion(col, row - 1, element);
  const downValue = visitRegion(col, row + 1, element);
  const leftValue = visitRegion(col - 1, row, element);
  const rightValue = visitRegion(col + 1, row, element);
  return {
    perimeter:
      score.perimeterValue +
      upValue.perimeter +
      downValue.perimeter +
      leftValue.perimeter +
      rightValue.perimeter,
    area: 1 + upValue.area + downValue.area + leftValue.area + rightValue.area,
    sides:
      corners +
      upValue.sides +
      downValue.sides +
      leftValue.sides +
      rightValue.sides,
  };
}

let totalScore = 0;
for (let outer = 0; outer < grid.length; outer++) {
  for (let inner = 0; inner < grid[outer].length; inner++) {
    const value = visitRegion(inner, outer, grid[outer][inner]);
    if (value.perimeter !== 0) {
      console.log(
        `Region ${grid[outer][inner].value} has a boundary of ${value.perimeter} and area of ${value.area} and sides of ${value.sides}`
      );
    }
    totalScore += value.area * value.sides;
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
