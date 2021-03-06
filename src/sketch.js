let target;
let populations;
let obstacles;
let tick = 0;
const generationLifespan = 100;
let darkTheme = false;

// P5.setup function.
setup = () => {
  createEnvironment();
  createObstacles("PRESET_3");
  createPopulations("PRESET_2");
  createTarget("PRESET_1");
}

// P5.draw function.
draw = () => {
  // Move and show every object.
  if(tick < generationLifespan) {
    showObstacles();
    showPopulations();
    showTarget();
    moveObstacles();
    movePopulation();
    evaluatePopulation();
    tick++;

  // Freeze canvas before fading to reset.
  }else if(tick < generationLifespan + 10) {
    freezeEnvironment();
    tick++;

  // Fade canvas before reset.
  }else if(tick < generationLifespan + 30) {
    fadeEnvironment();
    tick++;

  // Reset environment and create new generation.
  }else {
    resetEnvironment();
    tick = 0;
  }
}

///////////////////////////////////////////////////////////////////

// Creating canvas, background, framerate etc.
createEnvironment = () => {
  const fpsCap = 30;
  frameRate(fpsCap);
  createCanvas(windowWidth, windowHeight);
  if(darkTheme) {
    background(20);
  }else{
    background(235);
  }
}

// Create obstacles. Presets are provided as inner functions.
createObstacles = (presetSelect) => {
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
      newObstacle.setJitter(0.5);
      newObstacle.setBottomBorder(height * 0.9);
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
      newObstacle.setBottomBorder(height * 0.9);
      tempObstaclesList.push(newObstacle);
    }
    return tempObstaclesList;
  }

  // Preset3: High number of obstacles, low jitter, small size.
  preset3 = () => {
    const tempObstaclesList = [];
    const nrOfObstacles = 40;
    for(let i = 0; i < nrOfObstacles; i++) {
      let newObstacle = new Obstacle();
      newObstacle.setPosition(
        random(width * 0.1, width * 0.9),
        random(height * 0.2, height * 0.7)
      );
      newObstacle.setSize(width * 0.06);
      newObstacle.setJitter(0.75);
      newObstacle.setBottomBorder(height * 0.9);
      tempObstaclesList.push(newObstacle);
    }
    return tempObstaclesList;
  }

  // Preset selector.
  switch(presetSelect) {
    case 'PRESET_1':
      obstacles = preset1();
      break;

    case 'PRESET_2':
      obstacles = preset2();
      break;

    case 'PRESET_3':
      obstacles = preset3();
      break;

    default:
      obstacles = [];
  }
}

// Create populations. Presets are provided as inner functions.
createPopulations = (presetSelect) => {
  // Creature preset 1.
  creaturePreset1 = () => {
    let defaultCreature = new Creature();
    // defaultCreature.setMaxVelocity(3);
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
    newPopulations.push(new Population());
    for (let i = 0; i < newPopulations.length; i++) {
      newPopulations[i].setSpawnPoint(width * 0.5, height * 0.95);
      newPopulations[i].setMutationRate(0.03);
      newPopulations[i].setMaxForce(1);
    }
    newPopulations[0].colorCode = color('#BE475020');
    newPopulations[1].colorCode = color('#76A0AE20');
    newPopulations[2].colorCode = color('#D1A44820');

    return newPopulations;
  }

  // Wrap up and set population.
  let newPopulations;

  // Select population preset.
  switch(presetSelect) {
    case 'PRESET_1':
    newPopulations = populationsPreset1();
    break;

    case 'PRESET_2':
    newPopulations = populationsPreset2();
    break;

    case 'PRESET_3':
    newPopulations = populationsPreset3();
    break;

    default:
    newPopulations = [];
  }

  for(let i in newPopulations) {
    for(let j = 0; j < 100; j++) {
      newPopulations[i].insertCreature(creaturePreset1());
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
  // Function: Limit velocity on every creature.
  limitVelocity = () => {
    for(let i in populations) {
      populations[i].limitVelocity();
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
  limitVelocity();
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
