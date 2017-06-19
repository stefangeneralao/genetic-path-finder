function Population() {
  this.spawnPoint = createVector();
  this.creatures = [];

  this.insertCreature = (creature) => {
    creature.setSpawnPoint(this.spawnPoint.x, this.spawnPoint.y);
    console.log(creature.spawnPoint);
    this.creatures.push(creature);
  }

  this.show = () => {
    for(let i in this.creatures) {
      this.creatures[i].show();
    }
  }

  this.stepRandom = (stepSize) => {
    for(let i in this.creatures) {
      let randomVector = p5.Vector.random2D();
      randomVector.mult(stepSize);
      this.creatures[i].moveRelative(randomVector);
    }
  }

  this.setSpawnPoint = (xpos, ypos) => {
    this.spawnPoint.x = xpos;
    this.spawnPoint.y = ypos;
  }

  this.applyRandomForce = (forceVector) => {
    for(let i in this.creatures) {
      let randomVector = p5.Vector.random2D();
      randomVector.mult(forceVector);
      this.creatures[i].applyForce(randomVector);
    }
  }

  this.move = () => {
    for(let i in this.creatures) {
      this.creatures[i].move();
    }
  }

  this.moveAccordingToDNA = (tick) => {
    for(let i in this.creatures) {
      this.creatures[i].moveAccordingToDNA(tick);
      this.creatures[i].move();
    }
  }

  this.createNewGeneration = () => {
    // Find best creature.
    let bestCreature = this.creatures[0];
    for(let i in this.creatures) {
      let creatureDistanceToTarget = this.creatures[i].getDistanceToTarget();
      let bestCreatureDistanceToTarget = bestCreature.getDistanceToTarget();
      if(creatureDistanceToTarget < bestCreatureDistanceToTarget) {
        bestCreature = this.creatures[i];
      }
    }

    for(let i in this.creatures) {
      this.creatures[i] = bestCreature.copy();
      this.creatures[i].mutateDNA(0.0005);
    }
  }
}
