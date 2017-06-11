var target;
var populations;
var obstacles;
var tick;

function setup() {
  createEnvironment();
  createObstacles();
  createPopulations();
  createTarget();
}

function draw() {
  if(tick < generationLifespan) {
    step();
  }else if(tick < generationLifespan + 10) {
    freeze();
  }else if(tick < generationLifespan + 30) {
    fade();
  }else {
    reset();
  }
}
