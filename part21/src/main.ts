import * as fs from 'fs';

const inputFolder = 'part21/__input__';
const file = fs.readFileSync(`${inputFolder}/real.txt`, 'utf-8');

const lines = file.split('\n');

function trimLeadingZeroes(stone: string) {
  let i = 0;
  while (stone[i] === '0' && i < stone.length - 1) {
    i++;
  }
  return stone.slice(i);
}
let finalArray = [];
console.log(process.env.NODE_OPTIONS);
for (const line of lines) {
  let lineStones = line.split(' ');
  console.log(lineStones);
  for (let i = 0; i < 25; i++) {
    finalArray = [];
    for (const stone of lineStones) {
      if (stone === '0') {
        finalArray.push('1');
      } else if (stone.length % 2 === 0) {
        const left = stone.slice(0, Math.floor(stone.length / 2));
        const right = stone.slice(Math.ceil(stone.length / 2));
        const trimmedLeft = trimLeadingZeroes(left);
        const trimmedRight = trimLeadingZeroes(right);
        finalArray.push(trimmedLeft);
        finalArray.push(trimmedRight);
      } else {
        const multiplied = +stone * 2024;
        finalArray.push(multiplied.toString());
      }
    }
    console.log(finalArray.length);
    lineStones = finalArray;
  }
}

console.log('Final score', finalArray.length);
