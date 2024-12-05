import * as fs from 'fs';

const inputFolder = 'part10/__input__';
const file = fs.readFileSync(`${inputFolder}/real.txt`, 'utf-8');

const lines = file.split('\n');
const rulesForward = new Map<string, string[]>();
const rulesBackward = new Map<string, string[]>();
let previouslyVisited = new Map<string, boolean>();
let isReadingPages = false;
let total = 0;

function isValidCheck(numbers: string[]) {
  previouslyVisited = new Map<string, boolean>();
  for (const number of numbers) {
    if (!rulesBackward.has(number)) {
      previouslyVisited.set(number, true);
      continue;
    }
    const rules = rulesBackward.get(number);
    for (const rule of rules) {
      if (!previouslyVisited.has(rule) && numbers.includes(rule)) {
        return false;
      }
    }
    previouslyVisited.set(number, true);
  }
  return true;
}

function fixLine(numbers: string[]) {
  const fixedNumbers = [];
  for (const number of numbers) {
    if (!rulesBackward.has(number) && !rulesForward.has(number)) {
      fixedNumbers.push(number);
      continue;
    }
    const rules = rulesBackward.get(number);
    const forwardRules = rulesForward.get(number);
    if (rules) {
      inner: for (const rule of rules) {
        if (!numbers.includes(rule)) {
          continue inner;
        }
        if (fixedNumbers.includes(rule)) {
          break inner;
        }
        if (!fixedNumbers.includes(rule) && numbers.includes(rule)) {
          fixedNumbers.push(rule);
          numbers.splice(numbers.indexOf(rule), 1);
          break inner;
        }
      }
    }
    if (forwardRules) {
      let fixed = false;
      forwardRules: for (const rule of forwardRules) {
        if (fixedNumbers.includes(rule)) {
          fixedNumbers.splice(fixedNumbers.indexOf(rule), 0, number);
          fixed = true;
          break forwardRules;
        }
      }

      if (!fixed) {
        fixedNumbers.push(number);
      }
    } else {
      fixedNumbers.push(number);
    }
  }
  return fixedNumbers;
}

for (const line of lines) {
  if (!isReadingPages) {
    const [left, right] = line.split('|');
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

  if (line === '' || line === '\n') {
    isReadingPages = true;
    continue;
  }
  previouslyVisited = new Map<string, boolean>();
  if (isReadingPages) {
    let numbers = line.split(',');
    const isvalid = isValidCheck(numbers);
    if (!isvalid) {
      while (!isValidCheck(numbers)) {
        numbers = fixLine(numbers);
      }

      const middle = Math.ceil(numbers.length / 2);
      const number = numbers[middle - 1];
      total += +number;
    }
  }
}

console.log('Final score', total);
