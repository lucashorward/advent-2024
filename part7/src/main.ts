import * as fs from 'fs';

const inputFolder = 'part7/__input__';
const file = fs.readFileSync(`${inputFolder}/real.txt`, 'utf-8');

const lines = file.split('\n');
const keyword = /XMAS/g;
const keywordBackwards = /SAMX/g;
let xmasCount = 0;
const twoDArray = [];
for (const line of lines) {
  // TODO code goes here
  const chars = line.split('');
  twoDArray.push(chars);
}

// Forwards and backwards in the horizontal direction
for (let outer = 0; outer < twoDArray.length; outer++) {
  let string = '';
  for (let inner = 0; inner < twoDArray[outer].length; inner++) {
    const current = twoDArray[outer][inner];
    string += current;
  }
  xmasCount += (string.match(keyword)||[])?.length;
  xmasCount += (string.match(keywordBackwards)||[])?.length;
}

// Vertical direction
for (let outer = 0; outer < twoDArray[0].length; outer++) {
  let string = '';
  for (let inner = 0; inner < twoDArray.length; inner++) {
    const current = twoDArray[inner][outer];
    string += current;
  }
  xmasCount += (string.match(keyword)||[])?.length;
  xmasCount += (string.match(keywordBackwards)||[])?.length;
}


// Diagonal direction
for (let outer = 0; outer < twoDArray.length; outer++) {
  for (let inner = 0; inner <= twoDArray[outer].length; inner++) {
    let string = '';
    for (let offset = 0; offset < twoDArray.length; offset++) {
      if (
        outer + offset >= twoDArray.length ||
        inner + offset >= twoDArray[outer].length
      ) {
        break;
      }
      const current = twoDArray[outer + offset][inner + offset];
      string += current;
    }
    if (string.startsWith('XMAS') || string.startsWith('SAMX')) {
      xmasCount++;
    }
    // console.log(string);
    // console.log(xmasCount);
    // xmasCount += (string.match(keyword)||[])?.length;
    // xmasCount += (string.match(keywordBackwards)||[])?.length;
    // console.log(string);
    // break;
  }
}

for (let outer = 0; outer < twoDArray.length; outer++) {
  for (let inner = twoDArray[outer].length -1; inner > 0; inner--) {
    let string = '';
    for (let offset = 0; offset < twoDArray.length; offset++) {
      if (
        outer + offset >= twoDArray.length  ||
        inner - offset < 0
      ) {
        break;
      }
      const current = twoDArray[outer + offset][inner - offset];
      string += current;
    }
    if (string.startsWith('XMAS') || string.startsWith('SAMX')) {
      xmasCount++;
    }
    console.log(string);
    console.log(xmasCount);
    // xmasCount += (string.match(keyword)||[])?.length;
    // xmasCount += (string.match(keywordBackwards)||[])?.length;
    // console.log(string);
    // break;
  }
}

console.log('Final score', xmasCount);
