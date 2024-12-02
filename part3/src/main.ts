import * as fs from 'fs';

const inputFolder = 'part3/__input__';
const file = fs.readFileSync(`${inputFolder}/real.txt`, 'utf-8');

enum Status {
  INCREASING = 'increasing',
  DECREASING = 'decreasing',
}

enum Safety {
  SAFE = 'safe',
  UNSAFE = 'unsafe',
}

const lines = file.split('\n');
let total = 0;

for (const line of lines) {
  const parsed = line.split(' ').map(Number);
  console.log(parsed);
  let status: Status = undefined;
  let safety = Safety.UNSAFE;
  for (let i = 0; i <= parsed.length - 2; i++) {
    const current = parsed[i];
    const next = parsed[i + 1];
    console.log(current, next);
    const newStatus = current < next ? Status.INCREASING : Status.DECREASING;
    console.log(status, newStatus);
    if (!status) {
      status = newStatus;
    } else {
      if (status !== newStatus) {
        console.log('nope');
        break;

      }
    }
    if (current === next) {
      console.log('nope');
      break;
    }

    const diff = Math.abs(current - next);
    console.log(diff);
    if (diff > 3) {
      console.log('nope');
      break;
    }
    if (i === parsed.length - 2) {
      safety = Safety.SAFE;
    }
  }
  if (safety === Safety.SAFE) {
    console.log('upping total');
    total++;
  }
}

console.log(total);