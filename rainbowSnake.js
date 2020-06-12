let lastCoords = null;
let hValue = 0;
let circleDiameter = 80;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  colorMode(HSB);
  fill(hValue, 100, 100);
  noStroke();

  hValue++;
  if (hValue === 360) {
    hValue = 0;
  }

  if (mouseIsPressed && mouseButton === LEFT) {
    circleDiameter++;
  }

  if (mouseIsPressed && mouseButton === RIGHT) {
    circleDiameter--;
  }

  if (lastCoords && lastCoords.x === mouseX && lastCoords.y === mouseY && !mouseIsPressed) {
  } else {
    ellipse(mouseX, mouseY, circleDiameter, circleDiameter);
    lastCoords = {
      x: mouseX,
      y: mouseY
    };
  }
}
