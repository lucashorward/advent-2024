import * as fs from 'fs';

const inputFolder = 'part16/__input__';
const file = fs.readFileSync(`${inputFolder}/real.txt`, 'utf-8');

const lines = file.split('\n');

class GridElement {
  constructor(
    public value: string,
    public row: number,
    public col: number,
    public isAntiNode: boolean
  ) {}
}

function printGrid(grid: GridElement[][]) {
  console.log('=====================');
  for (let i = 0; i < grid.length; i++) {
    console.log(
      grid[i]
        .map((element) => (element.isAntiNode ? '#' : element.value))
        .join('')
    );
  }
  console.log('=====================');
}

const grid = [];

for (let i = 0; i < lines.length; i++) {
  const elements = lines[i].split('');
  grid.push(
    elements.map((element, index) => new GridElement(element, i, index, false))
  );
}

printGrid(grid);

function findNearbyNodes(row: number, col: number, value: string) {
  const radius = grid.length / 2;
  const nearbyNodes: GridElement[] = [];
  const rowStart = row - radius >= 0 ? row - radius : 0;
  const rowEnd = row + radius < grid.length ? row + radius : grid.length - 1;
  const colStart = col - radius >= 0 ? col - radius : 0;
  const colEnd =
    col + radius < grid[row].length ? col + radius : grid[row].length - 1;
  for (let i = rowStart; i <= rowEnd; i++) {
    for (let j = colStart; j <= colEnd; j++) {
      if (grid[i][j].value === value && (i !== row || j !== col)) {
        nearbyNodes.push(grid[i][j]);
      }
    }
  }
  return nearbyNodes;
}

function setAntiNode(left: GridElement, right: GridElement) {
  const colOffset = left.col - right.col;
  let antiNodeColOffset = 0;
  let antiNodeRowOffset = 0;
  let incrementer = 2;
  while (
    left.col + antiNodeColOffset >= 0 &&
    left.row + antiNodeRowOffset >= 0 &&
    left.col + antiNodeColOffset < grid[0].length &&
    left.row + antiNodeRowOffset < grid.length
  ) {
    if (colOffset > 0) {
      antiNodeColOffset = -Math.abs(colOffset) * incrementer;
    } else {
      antiNodeColOffset = Math.abs(colOffset) * incrementer;
    }
    const rowOffset = left.row - right.row;
    if (rowOffset > 0) {
      antiNodeRowOffset = -Math.abs(rowOffset) * incrementer;
    } else {
      antiNodeRowOffset = Math.abs(rowOffset) * incrementer;
    }
    incrementer++;
    if (
      left.col + antiNodeColOffset >= 0 &&
      left.row + antiNodeRowOffset >= 0 &&
      left.col + antiNodeColOffset < grid[0].length &&
      left.row + antiNodeRowOffset < grid.length
    ) {
      console.log(
        'Set antinode',
        left.row + antiNodeRowOffset,
        left.col + antiNodeColOffset
      );
      grid[left.row + antiNodeRowOffset][
        left.col + antiNodeColOffset
      ].isAntiNode = true;
    }
  }
  console.log(antiNodeRowOffset, antiNodeColOffset);
}

for (let outer = 0; outer < lines.length; outer++) {
  for (let inner = 0; inner < lines[outer].length; inner++) {
    // Look around for nodes with the same value within a 2 block radius (??)
    const currentElement = grid[outer][inner];
    if (currentElement.value === '.') {
      continue;
    }
    console.log('Current element', currentElement);
    const nearbyNodes = findNearbyNodes(outer, inner, currentElement.value);
    if (nearbyNodes.length > 0) {
      currentElement.isAntiNode = true;
      for (const node of nearbyNodes) {
        console.log(node);
        setAntiNode(currentElement, node);
      }
      // console.log(nearbyNodes);
    }
  }
}

printGrid(grid);

let total = 0;
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j].isAntiNode) {
      total++;
    }
  }
}

console.log('Final score', total);
