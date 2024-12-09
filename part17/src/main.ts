import * as fs from 'fs';

const inputFolder = 'part17/__input__';
const file = fs.readFileSync(`${inputFolder}/real.txt`, 'utf-8');

const lines = file.split('\n');

const enum Type {
  FILE = 'file',
  EMPTY_SPACE = 'empty_space',
}

const blocks = [];

for (const line of lines) {
  let type = Type.FILE;
  let fileId = 0;
  for (const char of line) {
    if (type === Type.FILE) {
      for (let index = 0; index < +char; index++) {
        blocks.push(fileId.toString());
      }
        fileId++;
        type = Type.EMPTY_SPACE;
    } else {
      for (let index = 0; index < +char; index++) {
        blocks.push('.')
      }
      type = Type.FILE;
    }
  }
  // Let's move shit back
  for (let i = blocks.length -1; i >= 0; i--) {
    const indexOfFirstDot = blocks.indexOf('.');
    if (indexOfFirstDot === -1 || indexOfFirstDot > i) {
      break;
    }
    blocks[indexOfFirstDot] = blocks[i];
    blocks[i] = '.';
  }

  // Calculate checksum
  let checksum = 0;
  for (let index = 0; index < blocks.length; index++) {
    if (blocks[index] === '.') {
      break;
    }
    const sum = +blocks[index] * index;
    checksum += sum;
  }
  console.log('Final score', checksum);
}
