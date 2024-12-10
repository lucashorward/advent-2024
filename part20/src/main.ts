import * as fs from 'fs';

const inputFolder = 'part20/__input__';
const file = fs.readFileSync(`${inputFolder}/real.txt`, 'utf-8');

const lines = file.split('\n');
function createGrid(lines: string[]) {
  return lines.map((line) => line.split(''));
}

function printGrid(grid: string[][]) {
  console.log('=====================');
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(''));
  }
  console.log('=====================');
}

const grid = createGrid(lines);
let visited = new Set<string>();

function isTrail(row: number, column: number, previousValue: string) {
  if (row < 0 || row >= grid.length || column < 0 || column >= grid[0].length) {
    return 0;
  }
  const element = grid[row][column];
  if (+element === +previousValue + 1 && element === '9') {
    return 1;
  }
  if (visited.has(`${row},${column}`)) {
    return 0;
  }

  if (+element === +previousValue + 1) {
    return (
      isTrail(row, column + 1, element) +
      isTrail(row, column - 1, element) +
      isTrail(row + 1, column, element) +
      isTrail(row - 1, column, element)
    );
  }
  return 0;
}


let score = 0;
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] === '0') {
      visited = new Set<string>();
      const result = isTrail(i, j, '-1');
      console.log(`Result from ${i} ${j}`, result);
      score += result;
    }
  }
}

printGrid(grid);

console.log('Final score', score);
