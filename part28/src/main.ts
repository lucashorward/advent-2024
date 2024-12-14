import * as fs from 'fs';

const inputFolder = 'part28/__input__';
const file = fs.readFileSync(`${inputFolder}/real.txt`, 'utf-8');

const lines = file.split('\n');

const WIDTH = 101; // Higher in the real puzzle
const HEIGHT = 103; // Higher in the real puzzle

class Robot {
  constructor(
    public x: number,
    public y: number,
    public xStep: number,
    public yStep: number
  ) {}
}

const robots = [];
for (const line of lines) {
  const digits = line.match(/-?\d+/g);
  const robot = new Robot(+digits[0], +digits[1], +digits[2], +digits[3]);
  robots.push(robot);
}

function moveToNext(robot: Robot) {
  // Find the next position
  let nextX = robot.x + robot.xStep;
  let nextY = robot.y + robot.yStep;
  if (nextX >= WIDTH) {
    const diff = Math.abs(nextX - WIDTH);
    nextX = diff;
  }
  if (nextX < 0) {
    const diff = Math.abs(nextX);
    nextX = WIDTH - diff;
  }
  if (nextY >= HEIGHT) {
    const diff = Math.abs(nextY - HEIGHT);
    nextY = diff;
  }
  if (nextY < 0) {
    const diff = Math.abs(nextY);
    nextY = HEIGHT - diff;
  }
  robot.x = nextX;
  robot.y = nextY;
}

let total = -1;
outer: for (let i = 0; i < 1000000; i++) {
  const locationMap = new Set<string>();
  let found = true;
  for (const robot of robots) {
    moveToNext(robot);
    const key = `${robot.x},${robot.y}`;
    if (locationMap.has(key)) {
      found = false;
    }
    locationMap.add(key);
  }
  if (found) {
    total = i + 1;
    break outer;
  }
}

for (let y = 0; y < HEIGHT; y++) {
  let line = '';
  for (let x = 0; x < WIDTH; x++) {
    let found = false;
    for (const robot of robots) {
      if (robot.x === x && robot.y === y) {
        found = true;
        break;
      }
    }
    if (found) {
      line += '#';
    } else {
      line += '.';
    }
  }
  console.log(line);
}
console.log('Final score', total);
