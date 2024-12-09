export function createGrid(lines: string[]) {
  return lines.map((line) => line.split(''));
}

export function printGrid(grid: string[][]) {
  console.log('=====================');
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(''));
  }
  console.log('=====================');
}
