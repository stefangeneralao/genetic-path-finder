function Population({ colorCode } = {}) {
  // Constructor.
  this.spawnPoint = createVector();
  this.initialVelocity = createVector();
  this.creatures = [];
  this.mutationRate = 0.001;
  this.maxForce = 1.0;
  this.colorCode = colorCode;

  // Pushes a creature to this.creatures.
  // Forces the creature to set position to spawnpoint
  // and reset velocity.
  this.insertCreature = (creature) => {
    creature.setPosition(this.spawnPoint.x, this.spawnPoint.y);
    creature.setVelocity(this.initialVelocity.x, this.initialVelocity.y);
    creature.setMaxForce(this.maxForce);
    if(this.colorCode) {
      creature.setColorCode(this.colorCode);
    }
    this.creatures.push(creature);
  }

  // Shows every creature in this.creatures.
  this.show = () => {
    for(let i in this.creatures) {
      this.creatures[i].show();
    }
  }

  // Sets spawnpoint of creatures.
  this.setSpawnPoint = (xpos, ypos) => {
    this.spawnPoint.x = xpos;
    this.spawnPoint.y = ypos;
  }

  // Set initial velocity of creatures.
  this.setInitialVelocity = (xvel, yvel) => {
    this.initialVelocity.x = xvel;
    this.initialVelocity.y = yvel;
  }

  // Creature is not moved if creature has hit the target.
  this.moveAccordingToDNA = (tick) => {
    this.creatures.forEach((creature) => {
      if(creature.isAlive){
        const distanceToTarget = creature.getDistanceToTarget();
        if(distanceToTarget == 0){
          creature.freeze();
        }else{
          creature.moveAccordingToDNA(tick);
        }
      }
    });
  }

  // Calculate and add fitness to every creature.
  this.giveFitness = () => {
    this.creatures.forEach((creature) => {
      if(creature.isAlive){
        const distanceToTarget = creature.getDistanceToTarget();
        if(distanceToTarget == 0) {
          creature.fitness += 1;
        }else{
          const calculatedFitness = map(distanceToTarget, 0, height, 1, 0);
          creature.fitness += calculatedFitness;
        }
      }
    });
  }

  // Create and replaces the old generation with a new.
  this.createNewGeneration = () => {
    // Find best creature.
    let bestCreature = this.creatures[0];
    this.creatures.forEach((creature) => {
      const creatureFitness = creature.fitness;
      const bestCreatureFitness = bestCreature.fitness;
      if(creatureFitness > bestCreatureFitness) {
        bestCreature = creature;
      }
    });

    // Create fresh generation if no creatures survived.
    if(!bestCreature.isAlive) {
      for(let i in this.creatures) {
        this.creatures[i] = bestCreature.copy();
        this.creatures[i].mutateDNA(1.0);
        if (!this.colorCode) {
          this.creatures[i].randomizeColor();
        }
      }

    // Copy the best creature and mutate.
    }else{
      for(let i in this.creatures) {
        this.creatures[i] = bestCreature.copy();
        this.creatures[i].mutateDNA(this.mutationRate);
      }
    }

  }

  // Set mutationrate.
  this.setMutationRate = (mutationRate) => {
    this.mutationRate = mutationRate;
  }

  // Set all creatures to spawnpoint.
  this.setAllCreaturesToSpawnPoint = () => {
    this.creatures.forEach((creature) => {
      creature.setPosition(this.spawnPoint.x, this.spawnPoint.y);
      creature.setVelocity(this.initialVelocity.x, this.initialVelocity.y);
    });
  }

  // Check if any creature has crashed into obstacle.
  this.checkObstacleCrash = (obstacles) => {
    this.creatures.forEach((creature) => {
      obstacles.forEach((obstacle) => {
        if(creature.isAlive){
          const creatureCrashed = obstacle.checkCrash(creature);
          if(creatureCrashed) {
            creature.kill();
          }
        }
      });
    });
  }

  // Set maxforce for the creatures.
  this.setMaxForce = (maxForce) => {
    this.maxForce = maxForce;
  }

  // Set color code for the creatures.
  this.setColorCode = (colorCode) => {
    this.colorCode = colorCode;
  }

  // Limit velocity for every creature.
  this.limitVelocity = () => {
    this.creatures.forEach((creature) => {
      creature.limitVelocity();
    })
  }
}
