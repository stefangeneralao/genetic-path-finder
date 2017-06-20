let target;
let populations;
let obstacles;
let tick = 0;
const generationLifespan = 100;
let darkTheme = true;

// P5.setup function.
setup = () => {
  createEnvironment();
  createObstacles("PRESET_1");
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
    moveObstacles();
    movePopulation();
    evaluatePopulation();
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
  if(darkTheme) {
    background(20);
  }else{
    background(235);
  }
  console.log("fpsCap = " + fpsCap);
}

// Create obstacles. Presets are provided as inner functions.
createObstacles = () => {
  // Preset1: Obstacles at random position within canvas.
  preset1 = () => {
    const tempObstaclesList = [];
    for(let i = 0; i < 10; i++) {
      let newObstacle = new Obstacle();
      newObstacle.setPosition(
        random(width * 0.1, width * 0.9),
        random(height * 0.2, height * 0.7)
      );
      newObstacle.setSize(width * 0.15);
      newObstacle.setJitter(2);
      newObstacle.setBottomBorder(height * 0.8);
      tempObstaclesList.push(newObstacle);
    }
    return tempObstaclesList;
  }

  // Preset2: 10 obstacles in a horizontal line.
  preset2 = () => {
    const tempObstaclesList = [];
    const nrOfObstacles = 10;
    for(let i = 0; i < nrOfObstacles; i++) {
      let newObstacle = new Obstacle();
      newObstacle.setPosition(
        (i + 0.5) * width / nrOfObstacles,
        height * 0.5
      );
      newObstacle.setSize(width * 0.1);
      newObstacle.setJitter(1.5);
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
    const newPopulations = [];
    newPopulations.push(new Population());
    newPopulations.push(new Population());
    newPopulations[0].setSpawnPoint(width * 0.45, height * 0.95);
    newPopulations[1].setSpawnPoint(width * 0.55, height * 0.95);
    newPopulations[0].setMutationRate(0.03);
    newPopulations[1].setMutationRate(0.03);
    newPopulations[0].setMaxForce(1);
    newPopulations[1].setMaxForce(1);

    return newPopulations;
  }

  // Wrap up and return presets.
  let newPopulations = populationsPreset2();
  let defaultCreature = creaturePreset1;
  for(let i in newPopulations){
    for(let j = 0; j < 100; j++) {
      newPopulations[i].insertCreature(defaultCreature());
    }
  }

  populations = newPopulations;
}

createTarget = () => {
  target = new Target();
  target.setPosition(width * 0.5, height * 0);
  target.setSize(200);
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

moveObstacles = () => {
  // Preset: Step in random direction.
  stepRandom = (stepSize) => {
    for(let i in obstacles) {
      let randomVector = p5.Vector.random2D();
      randomVector.mult(stepSize);
      obstacles[i].moveRelative(randomVector);
    }
  }

  // Preset: Let obstacle jitter.
  jitterObstacles = () => {
    obstacles.forEach((obstacle) => {
      obstacle.move();
    });
  }

  // Preset selector.
  jitterObstacles();
}

movePopulation = () => {
  // Preset: Move according to dna.
  moveAccordingToDNA = () => {
    for(let i in populations) {
      populations[i].moveAccordingToDNA(tick);
    }
  }

  // Preset selector.
  moveAccordingToDNA(tick);
}

fadeEnvironment = () => {
  push();
  if(darkTheme) {
    fill(0, 20);
  }else{
    fill(255, 20);
  }
  noStroke();
  rect(0, 0, width, height);
  pop();
}

createNewGeneration = () => {
  populations.forEach((population) => {
    population.createNewGeneration();
  });
}

setAllCreaturesToSpawnPoint = () => {
  populations.forEach((population) => {
    population.setAllCreaturesToSpawnPoint();
  });
}

resetEnvironment = () => {
  createNewGeneration();
  setAllCreaturesToSpawnPoint();
}

evaluatePopulation = () => {
  populations.forEach((population) => {
    population.checkObstacleCrash(obstacles);
    population.giveFitness();
  });

}

freezeEnvironment = () => {}
