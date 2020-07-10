// Inspired by Georg Nees' gravel

const urlParams = new URLSearchParams(window.location.search);
const canvasHeight = window.innerHeight;
const canvasWidth = window.innerWidth;
const squareSize = Number.parseInt(urlParams.get("squareSize"), 10) || 45;

let hasDrawn = false;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  if (hasDrawn) return;

  const squareRowCount = Math.floor(
    (canvasWidth - squareSize) / (squareSize * 2)
  );
  const squareColCount = Math.floor(
    (canvasHeight - squareSize) / (squareSize * 2)
  );

  for (let j = 0; j < squareColCount; j++) {
    for (let i = 0; i < squareRowCount; i++) {
      let x1 = squareSize + i * (squareSize * 2);
      let y1 = squareSize + j * (squareSize * 2);

      let jitterMin = -1;
      let jitterMax = 2;
      jitterMin *= j;
      jitterMax *= j;
      let jitter = getRandomInt(jitterMin, jitterMax);
      x1 += jitter;
      y1 += jitter;

      quad(
        x1,
        y1,
        x1 + squareSize,
        y1,
        x1 + squareSize,
        y1 + squareSize,
        x1,
        y1 + squareSize
      );
    }
  }

  hasDrawn = true;
}
