import * as fs from 'fs';

const inputFolder = 'part9/__input__';
const file = fs.readFileSync(`${inputFolder}/real.txt`, 'utf-8');


const lines = file.split('\n');
const rulesForward = new Map<string, string[]>();
const rulesBackward = new Map<string, string[]>();
let previouslyVisited = new Map<string, boolean>();
let isReadingPages = false;
let total = 0;
for (const line of lines) {
  console.log(line);
  if (!isReadingPages) {
    const [left, right] = line.split('|');
    console.log(left);
    console.log(right);
    if (!rulesForward.has(left)) {
      rulesForward.set(left, [right]);
    } else {
      rulesForward.set(left, [...rulesForward.get(left), right]);
    }
    if (!rulesBackward.has(right)) {
      rulesBackward.set(right, [left]);
    } else {
      rulesBackward.set(right, [...rulesBackward.get(right), left]);
    }
  }
  // TODO code goes here

  if (line === '' || line === '\n') {
    console.log('Empty line');
    isReadingPages = true;
    continue;
  }
  previouslyVisited = new Map<string, boolean>();
  if (isReadingPages) {
    const numbers = line.split(',');
    console.log(numbers);
    let isvalid = true;
    for (const number of numbers) {
      if (!rulesBackward.has(number)) {
        console.log('No rule');
        previouslyVisited.set(number, true);
        continue;
      }
      const rules = rulesBackward.get(number);
      for (const rule of rules) {
        if (!previouslyVisited.has(rule) && numbers.includes(rule)) {
          console.log('Line invalid, could not find', number);
          isvalid = false;
          break;
        }
      }
      previouslyVisited.set(number, true);
    }
    if (isvalid) {
      const middle = Math.ceil(numbers.length / 2);
      const number = numbers[middle - 1];
      console.log(middle);
      console.log(number);
      total += +number;
      console.log('Line valid', number);
    }
  }
}

console.log('Final score', total);
