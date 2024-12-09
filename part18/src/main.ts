import * as fs from 'fs';

const inputFolder = 'part18/__input__';
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
  console.log(blocks.join(''));
  // Let's move shit back
  for (let i = blocks.length -1; i >= 0; i--) {
    if (blocks[i] === '.') {
      continue;
    }
    const lastIndexOfFile = blocks.lastIndexOf(blocks[i]);
    const filesize = lastIndexOfFile - blocks.indexOf(blocks[i]) + 1;
    const firstIndexOfFile = blocks.indexOf(blocks[i]);
    for (let j = 0; j < blocks.length; j++) {
      if (j > firstIndexOfFile) {
        continue;
      }
      if (blocks[j] === '.') {
        let space = 0;
        for (let f = j; f < blocks.length; f++) {
          if (blocks[f] === '.') {
            space++;

          } else {
            break;
          }
        }
        if (filesize <= space) {
          for (let offset = 0; offset < filesize; offset++) {
            blocks[j + offset] = blocks[firstIndexOfFile + offset];
            blocks[firstIndexOfFile + offset] = '.'
          }
          break;
        }
      }
    }
  }

  // Calculate checksum
  let checksum = 0;
  for (let index = 0; index < blocks.length; index++) {
    if (blocks[index] === '.') {
      continue;
    }
    const sum = +blocks[index] * index;
    checksum += sum;
  }
  console.log('Final score', checksum);
}
