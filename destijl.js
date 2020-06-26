const canvasHeight = window.innerHeight;
const canvasWidth = window.innerWidth;
const minSquareSize = 10;
const grid = [];
let count = 0;
const borderWidth = 5;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

const setRandomFill = () => {
  const primaryColorHValues = [0, 60, 240];
  let currentColor = primaryColorHValues[getRandomInt(0, 3)];

  if (getRandomInt(0, 2)) {
    fill(0, 0, 100);
  } else {
    fill(currentColor, 100, 100);
  }
};

const drawBorder = () => {
  noFill();
  rect(0, 0, canvasWidth, canvasHeight);
};

function draw() {
  if (count > 0) return;
  count++;

  const primaryColorHValues = [0, 60, 240];

  colorMode(HSB);
  strokeWeight(borderWidth);

  const rows = canvasWidth / 10;
  const cols = canvasHeight / 10;

  const grid = [];

  for (let i = 0; i < rows; i++) {
    const currentRow = [];
    for (let j = 0; j < cols; j++) {
      rect(i * 10, j * 10, 10);
      currentRow.push(null);
    }
    grid.push(currentRow);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!grid[i][j]) {
        let width = getRandomInt(1, rows);
        let height = getRandomInt(1, cols);

        // Check if height and width are okay
        let goodToGo = false;

        while (!goodToGo) {
          let okaySoFar = true;
          for (let k = 0; k < width; k++) {
            for (let l = 0; l < height; l++) {
              if (grid.length > i + k && grid[i + k].length > j + l) {
                if (grid[i + k][j + l]) {
                  //not okay
                  okaySoFar = false;
                }
              }
            }
          }
          if (!okaySoFar) {
            if (getRandomInt(0, 2)) {
              height--;
            } else {
              width--;
            }
            if (height < 1) height = 1;
            if (width < 1) width = 1;
          } else {
            goodToGo = true;
          }
        }

        setRandomFill();
        rect(i * 10, j * 10, width * 10, height * 10);
        for (let k = 0; k < width; k++) {
          for (let l = 0; l < height; l++) {
            if (grid.length > i + k && grid[i + k].length > j + l) {
              grid[i + k][j + l] = true;
            }
          }
        }
      }
    }
  }
  strokeWeight(borderWidth * 2);

  drawBorder();
}

function mouseClicked(event) {
  count = 0;
}
