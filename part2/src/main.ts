import * as fs from 'fs';

const inputFolder = 'part2/__input__';
const file = fs.readFileSync(`${inputFolder}/real.txt`, 'utf-8');

const left = [];
const right = [];
const amountOfTimes = new Map<number, number>();
const lines = file.split('\n');

for (const line of lines) {
  const parsed = line.split(' ');
  left.push(+parsed[0]);
  const rightNumber = +parsed[parsed.length - 1];
  right.push(rightNumber);
  if (amountOfTimes.has(rightNumber)) {
    amountOfTimes.set(rightNumber, amountOfTimes.get(rightNumber) + 1);
  } else {
    amountOfTimes.set(rightNumber, 1);
  }
}

let total = 0;
for (let i = 0; i < lines.length; i++) {
  const leftNumber = left[i];
  const multiplication = amountOfTimes.get(leftNumber) || 0;
  total += leftNumber * multiplication;
}

console.log(total);