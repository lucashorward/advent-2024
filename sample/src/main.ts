import * as fs from 'fs';

const inputFolder = 'sample/__input__';
const file = fs.readFileSync(`${inputFolder}/real.txt`, 'utf-8');

const lines = file.split('\n');

for (const line of lines) {
  // TODO code goes here
}

console.log('Final score');
