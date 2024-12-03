import * as fs from 'fs';

const inputFolder = 'part5/__input__';
const file = fs.readFileSync(`${inputFolder}/real.txt`, 'utf-8');

const lines = file.split('\n');
let total = 0;

for (const line of lines) {
  // TODO code goes here
  const regex = /mul\((\d+),(\d+)\)/g;
  const matches = [...line.matchAll(regex)];
  for (const match of matches) {
    console.log(match[1]);
    console.log(match[2]);
    const left = +match[1];
    const right = +match[2];
    console.log(left, right);
    const result = left * right;
    total += result;
  }
}

console.log('Final score', total);
