let target;
let populations;
let obstacles;
let tick = 0;
const generationLifespan = 100;

// P5.setup function.
setup = () => {
  createEnvironment();
  // createObstacles("PRESET_1");
  createPopulations("PRESET_1");
  createTarget("PRESET_1");
}

// P5.draw function.
draw = () => {
  // Move and show every object.
  if(tick < generationLifespan) {
    console.log("Move");
    showObstacles();
    showPopulations();
    showTarget();
    stepObstacles();
    stepPopulation();
    tick++;

  // Freeze canvas before fading to reset.
  }else if(tick < generationLifespan + 10) {
    console.log("Freeze");
    freezeEnvironment();
    tick++;

  // Fade canvas before reset.
  }else if(tick < generationLifespan + 30) {
    console.log("Fade");
    fadeEnvironment();
    tick++;

  // Reset environment and create new generation.
  }else {
    console.log("Reset");
    createNewGeneration();
    resetEnvironment();
    tick = 0;
  }
}

///////////////////////////////////////////////////////////////////

// Creating canvas, background, framerate etc.
createEnvironment = () => {
  console.log("Creating environment...");
  const fpsCap = 30;
  frameRate(fpsCap);
  createCanvas(windowWidth, windowHeight);
  background(255);
  console.log("fpsCap = " + fpsCap);
}

// Create obstacles. Presets are provided as inner functions.
createObstacles = () => {
  // Preset1: Obstacles at random position within canvas.
  preset1 = () => {
    let tempObstaclesList = [];

    for(let i = 0; i < 10; i++) {
      let newObstacle = new Obstacle();
      newObstacle.setPosition(random(width), random(height));
      tempObstaclesList.push(newObstacle);
    }

    return tempObstaclesList;
  }

  obstacles = preset1();
}

// Create populations. Presets are provided as inner functions.
createPopulations = () => {
  // Creature preset 1.
  creaturePreset1 = () => {
    let defaultCreature = new Creature();
    defaultCreature.setMutationRate(100);
    defaultCreature.setMaxThrottle(100);
    defaultCreature.setMaxSpeed(100);
    return defaultCreature;
  }

  // Population preset 1.
  populationsPreset1 = () => {
    // Insert creatures to newPopulation.
    let newPopulation = new Population();

    // Insert newPopulation to newPopulations.
    let newPopulations = [];
    newPopulation.setSpawnPoint(width * 0.5, height * 0.6);
    newPopulations.push(newPopulation);

    return newPopulations;
  }

  // Population preset 2.
  populationsPreset2 = () => {
    let population1 = new Population();
    population1.setSpawnPoint(width * 0.1, height * 0.9);

    let population2 = new Population();
    population2.setSpawnPoint(width * 0.9, height * 0.9);

    let newPopulations = [];
    newPopulations.push(population1);
    newPopulations.push(population2);

    return newPopulations;
  }

  // Wrap up and return presets.
  let newPopulations = populationsPreset2();
  for(let i in newPopulations){
    for(let j = 0; j < 100; j++) {
      newPopulations[i].insertCreature(creaturePreset1());
    }
  }

  populations = newPopulations;
}

createTarget = () => {
  target = new Target(width * 0.5, height * 0.1);
}

// Display all obstacles.
showObstacles = () => {
  for(i in obstacles) {
    obstacles[i].show();
  }
}

showPopulations = () => {
  for(let i in populations) {
    populations[i].show();
  }
}

showTarget = () => {
  target.show();
}

stepObstacles = () => {
  // Preset: Step in random direction.
  stepRandom = (stepSize) => {
    for(let i in obstacles) {
      let randomVector = p5.Vector.random2D();
      randomVector.mult(stepSize);
      obstacles[i].moveRelative(randomVector);
    }
  }

  // Preset selector.
  stepRandom(2);
}

stepPopulation = () => {
  // Preset: Step in random direction.
  stepRandom = (stepSize) => {
    for(let i in populations) {
      populations[i].stepRandom(stepSize);
    }
  }

  // Preset: Apply force in random direction.
  applyRandomForce = (force) => {
    for(let i in populations) {
      populations[i].applyRandomForce(force);
      populations[i].move();
    }
  }

  // Preset: Move according to dna.
  moveAccordingToDNA = () => {
    for(let i in populations) {
      populations[i].moveAccordingToDNA(tick);
    }
  }

  // Preset selector.
  moveAccordingToDNA(tick);
  // applyRandomForce(2);
}

fadeEnvironment = () => {
  push();
  fill(255, 20);
  noStroke();
  rect(0, 0, width, height);
  pop();
}

createNewGeneration = () => {
  for(let i in populations) {
    populations[i].createNewGeneration();
  }
}

freezeEnvironment = () => {}
resetEnvironment = () => {}
