import * as fs from 'fs';

const inputFolder = 'part1/__input__';
const file = fs.readFileSync(`${inputFolder}/real.txt`, 'utf-8');

const left = [];
const right = [];
const lines = file.split('\n');

for (const line of lines) {
  const parsed = line.split(' ');
  left.push(+parsed[0]);
  right.push(+parsed[parsed.length - 1]);
}

left.sort();
right.sort();

console.log(left);
console.log(right);
let total = 0;
for (let i = 0; i < lines.length; i++) {
  total += Math.abs(left[i] - right[i]);
}

console.log(total);