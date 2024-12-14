import * as fs from 'fs';

const inputFolder = 'part27/__input__';
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
// console.log(robots);

for (let i = 0; i < 100; i++) {
  for (const robot of robots) {
    // Find the next position
    moveToNext(robot);
  }
}

// console.log(robots);
let quadrant1 = 0;
let quadrant2 = 0;
let quadrant3 = 0;
let quadrant4 = 0;

const halfWidth = WIDTH / 2;
const halfHeight = HEIGHT / 2;

for (const robot of robots) {
  if (robot.x === Math.floor(halfWidth) || robot.y === Math.floor(halfHeight)) {
    continue;
  }
  if (robot.x < WIDTH / 2 && robot.y < HEIGHT / 2) {
    quadrant1++;
  } else if (robot.x > WIDTH / 2 && robot.y < HEIGHT / 2) {
    quadrant2++;
  } else if (robot.x < WIDTH / 2 && robot.y > HEIGHT / 2) {
    quadrant3++;
  } else if (robot.x > WIDTH / 2 && robot.y > HEIGHT / 2) {
    quadrant4++;
  }
}

const total = quadrant1 * quadrant2 * quadrant3 * quadrant4;

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
console.log('Quadrants', quadrant1, quadrant2, quadrant3, quadrant4);
console.log('Final score', total);
