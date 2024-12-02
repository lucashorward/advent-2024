import * as fs from 'fs';

const inputFolder = 'part4/__input__';
const file = fs.readFileSync(`${inputFolder}/real.txt`, 'utf-8');

enum Status {
  INCREASING = 'increasing',
  DECREASING = 'decreasing',
}

enum Safety {
  SAFE = 'safe',
  UNSAFE = 'unsafe',
}

function isSafe(left: number, right: number, status: Status | undefined) {
  console.log('checking', left, right, status);
  const newStatus = left < right ? Status.INCREASING : Status.DECREASING;
  if (status !== undefined && status !== newStatus) {
    // console.log('status check bad');
    return { status: newStatus, safety: Safety.UNSAFE };
  }
  if (left === right) {
    // console.log('equals');
    return { status: newStatus, safety: Safety.UNSAFE };
  }

  const diff = Math.abs(left - right);
  console.log('diff is', diff);
  if (diff > 3) {
    // console.log('diff check');
    return { status: newStatus, safety: Safety.UNSAFE };
  }
  return { status: newStatus, safety: Safety.SAFE };
}

const lines = file.split('\n');
let total = 0;

for (const line of lines) {
  const parsed = line.split(' ').map(Number);
  console.log(parsed);
  let status: Status = undefined;
  let safety = Safety.UNSAFE;
  let skipIndex = -1;
  for (let i = 0; i < parsed.length - 1; i++) {
    console.log(skipIndex);
    if (skipIndex === i) {
      console.log('skipping', i);
      continue;
    }
    const current = parsed[i];
    let nextIndex = i + 1;
    if (i + 1 === skipIndex) {
      if (i + 2 < parsed.length) {
        nextIndex = i + 2;
      } else {
        continue;
      }
    }
    const next = parsed[nextIndex];
    const result = isSafe(current, next, status);

    status = result.status;
    console.log(status);
    if (result.safety === Safety.UNSAFE) {
      if (skipIndex === parsed.length - 1) {
        safety = result.safety;
        break;
      }
      // if (skipIndex === undefined) {
      console.log(`${current} ${next} is invalid, but a skip is allowed`);
      skipIndex++;
      status = undefined;
      i = -1;
      // status = result.status;
      // safety = Safety.SAFE;
      // } else {
      //   console.log(`Throwing out line ${line} upon checking ${current} ${next}`);
      //   safety = Safety.UNSAFE;
      //   break;
    }
    // } else {
    safety = result.safety;
    // }

    // if (safety === Safety.UNSAFE) {

    // }

    // if (i === parsed.length - 2) {
    //   safety = Safety.SAFE;
    // }
  }
  // console.log('skips', skips);
  if (safety === Safety.SAFE) {
    // console.log('upping total');
    total++;
  }
}

console.log('Final score', total);
