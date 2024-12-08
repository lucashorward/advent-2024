import * as fs from 'fs';

const inputFolder = 'part13/__input__';
const file = fs.readFileSync(`${inputFolder}/real.txt`, 'utf-8');

const lines = file.split('\n');

function isLineValid(key: number, puzzle: number[], index, value: number) {
  if (index === puzzle.length) {
    return value === key;
  }
  if (value > key) {
    return false;
  }
  return (
    isLineValid(key, puzzle, index + 1, value + puzzle[index]) ||
    isLineValid(key, puzzle, index + 1, value * puzzle[index])
  );
}
let total = 0;
for (const line of lines) {
  console.log(line);
  const keyAndPuzzle = line.split(':').map((item) => item.trim());
  const key = +keyAndPuzzle[0];
  const puzzle = keyAndPuzzle[1].split(' ').map((item) => +item);
  console.log(key, puzzle);
  if (isLineValid(key, puzzle, 1, puzzle[0])) {
    console.log('Valid');
    total += key;
  }
}

console.log('Final score', total);
