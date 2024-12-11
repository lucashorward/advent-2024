import * as fs from 'fs';

const inputFolder = 'part22/__input__';
const file = fs.readFileSync(`${inputFolder}/real.txt`, 'utf-8');

const lines = file.split('\n');

function trimLeadingZeroes(stone: string) {
  let i = 0;
  while (stone[i] === '0' && i < stone.length - 1) {
    i++;
  }
  return stone.slice(i);
}

const cache = new Map<string, number>();

function blink(stone: string, depth: number) {
  if (depth === 75) {
    return 1;
  }
  if (cache.has(stone + '--' + depth.toString())) {
    return cache.get(stone + '--' + depth.toString());
  }
  let result = 0;
  if (stone === '0') {
    result = blink('1', depth + 1);
  } else if (stone.length % 2 === 0) {
    const left = stone.slice(0, Math.floor(stone.length / 2));
    const right = stone.slice(Math.ceil(stone.length / 2));
    const trimmedLeft = trimLeadingZeroes(left);
    const trimmedRight = trimLeadingZeroes(right);
    result = blink(trimmedLeft, depth + 1) + blink(trimmedRight, depth + 1);
  } else {
    const multiplied = +stone * 2024;
    result = blink(multiplied.toString(), depth + 1);
  }
  cache.set(stone + '--' + depth.toString(), result);
  return result;
}
let total = 0;
for (const line of lines) {
  const lineStones = line.split(' ');
  console.log(lineStones);
  for (const stone of lineStones) {
    total += blink(stone, 0);
  }
}

console.log('Final score', total);
