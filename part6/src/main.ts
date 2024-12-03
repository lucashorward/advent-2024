import * as fs from 'fs';

const inputFolder = 'part6/__input__';
const file = fs.readFileSync(`${inputFolder}/real.txt`, 'utf-8');

const lines = file.split('\n');
let total = 0;
let enabled = true;
for (const line of lines) {
  const regex = /mul\((\d+),(\d+)\)/g;
  const matches = [...line.matchAll(regex)];
  for (const match of matches) {
    console.log(match);
    console.log(match[1]);
    console.log(match[2]);
    const index = match.index;
    let capturedString = '';
    for (let i = index; i > 0; i--) {
      capturedString = line[i] + capturedString;
      // console.log(capturedString)
      if (capturedString.includes('don\'t()')) {
        enabled = false;
        break;
      }
      if (capturedString.includes('do()')) {
        enabled = true;
        break;
      }
    }
    if (!enabled) {
      console.log('Skipping match index %s because it is disabled', index);
      continue;
    }

    // console.log(capturedString);
    const left = +match[1];
    const right = +match[2];
    console.log(left, right);
    const result = left * right;
    total += result;
  }
}

console.log('Final score', total);
