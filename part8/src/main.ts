import * as fs from 'fs';

const inputFolder = 'part8/__input__';
const file = fs.readFileSync(`${inputFolder}/real.txt`, 'utf-8');

const lines = file.split('\n');
const twoDArray = [];
let xmasCount = 0;

for (const line of lines) {
  // TODO code goes here
  const chars = line.split('');
  twoDArray.push(chars);
}

function isValidMas(outer: number, inner: number) {
  if (outer -1 < 0 || outer +1 >= twoDArray.length) {
    return false;
  }
  if (inner -1 < 0 || inner +1 >= twoDArray[outer].length) {
    return false;
  }
  const topLeft = twoDArray[outer - 1][inner - 1];
  const topRight = twoDArray[outer - 1][inner + 1];
  const bottomLeft = twoDArray[outer + 1][inner - 1];
  const bottomRight = twoDArray[outer + 1][inner + 1];
  let masCount = 0;
  if (topLeft === 'M' && bottomRight === 'S') {
    masCount++;
  }
  if (topLeft === 'S' && bottomRight === 'M') {
    masCount++;
  }
  if (topRight === 'M' && bottomLeft === 'S') {
    masCount++;
  }
  if (topRight === 'S' && bottomLeft === 'M') {
    masCount++;
  }
  return masCount === 2;
}

for (let outer = 0; outer < twoDArray.length; outer++) {
  // let string = '';
  for (let inner = 0; inner < twoDArray[outer].length; inner++) {
    const current = twoDArray[outer][inner];
    if (current === 'A') {
      if (isValidMas(outer, inner)) {
        // console.log('Found MAS at', outer, inner);
        xmasCount++;
      }
    }
    // string += current;
  }
  // xmasCount += (string.match(keyword)||[])?.length;
  // xmasCount += (string.match(keywordBackwards)||[])?.length;
}

console.log('Final score', xmasCount);
