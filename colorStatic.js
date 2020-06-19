const canvasHeight = window.innerHeight;
const canvasWidth = window.innerWidth;
const minSquareSize = 10;
const grid = [];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

const drawRectangle = () => {
  const primaryColorHValues = [0, 120, 240];
  const currentColor = primaryColorHValues[getRandomInt(0, 3)];
  fill(currentColor, 100, 100);
  rect(getRandomInt(0, canvasWidth), getRandomInt(0, canvasWidth), 100, 100);
};

function draw() {
  const primaryColorHValues = [0, 120, 240];

  colorMode(HSB);

  // drawRectangle();

  const rows = canvasWidth / 10;
  const cols = canvasHeight / 10;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const currentColor = primaryColorHValues[getRandomInt(0, 3)];
      fill(currentColor, 100, 100);
      rect(i * 10, j * 10, 10);
    }
  }
}
