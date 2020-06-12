let lastCoords = null;
let hValue = 0;
let circleDiameter = 80;
const droplets = [];
const canvasHeight = window.innerHeight;
const canvasWidth = window.innerWidth;
const maxDropletCount = 50;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const addDroplet = (x = getRandomInt(0, canvasWidth), y = getRandomInt(0, canvasHeight)) => {
  droplets.push({
    x,
    y,
    hValue: getRandomInt(0, 360),
    diameter: getRandomInt(0, Math.min(canvasWidth, canvasHeight)),
    growing: !!getRandomInt(0, 2)
  });

  timeSinceLastDroplet = 0;
  dropletInterval = getRandomInt(1, 5) * 1000;
};

const isDropletCoveringCanvas = droplet => {
  //TODO: Write a proper algorithm
  return droplet.diameter > 2 * Math.max(canvasWidth, canvasHeight);

  const diameter = droplet.diameter;
  const radius = diameter / 2;
  const x = droplet.x;
  const y = droplet.y;

  // Get coordinates for the circle's "corners"
  const topLeft = {
    x: (x - radius + x) / 2,
    y: (y + y - radius) / 2
  };
  const topRight = {
    x: (x + x + radius) / 2,
    y: (y - radius + y) / 2
  };
  const bottomRight = {
    x: (x + radius + x) / 2,
    y: (y + radius + y) / 2
  };
  const bottomLeft = {
    x: (x - radius + x) / 2,
    y: (y + y + radius) / 2
  };

  if (topLeft.x > 0 || topLeft.y > 0) {
    return false;
  }

  if (topRight.x < canvasWidth || topRight.y > 0) {
    return false;
  }

  if (bottomRight.x < canvasWidth || bottomRight.y < canvasHeight) {
    return false;
  }

  if (bottomLeft.x > 0 || bottomLeft.y < canvasHeight) {
    return false;
  }

  return true;
};

function mouseClicked(event) {
  addDroplet(mouseX, mouseY);
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  clear();
  colorMode(HSB);
  noStroke();

  const dropletsToDelete = [];

  droplets.forEach((droplet, idx) => {
    fill(droplet.hValue, 100, 100);
    ellipse(droplet.x, droplet.y, droplet.diameter);

    droplet.hValue++;
    if (droplet.hValue === 360) {
      droplet.hValue = 0;
    }

    if (droplet.growing) {
      droplet.diameter++;
    } else {
      droplet.diameter--;
    }

    //TODO: Instead of shrinking big droplets away, delete them
    if (isDropletCoveringCanvas(droplet)) {
      droplet.growing = false;
    }

    //Clean up
    if (droplet.diameter < 0) {
      dropletsToDelete.push(idx);
    }

    //TODO: Delete excess huge droplets
  });

  dropletsToDelete.forEach(idx => {
    droplets.splice(idx, 1);
  });

  if (droplets.length > maxDropletCount) {
    droplets.splice(0, 1);
  }
}
