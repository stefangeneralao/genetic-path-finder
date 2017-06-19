function Creature() {
  // Constructor.
  this.spawnPoint = createVector();
  this.position = createVector(width * 0.5, height * 0.5);
  this.velocity = createVector();
  this.size = 2;
  this.dna = new DNA();

  // Functions.
  this.randomizeDNA = () => {}
  this.setMutationRate = (mutationRate) => {}
  this.setMaxThrottle = (maxThrottle) => {}
  this.setMaxSpeed = (maxSpeed) => {}

  this.show = () => {
    push();
    noStroke();
    fill(255, 0, 0);
    ellipse(this.position.x, this.position.y, this.size);
    pop();
  }

  this.moveRelative = (vector) => {
    this.position.x += vector.x;
    this.position.y += vector.y;
  }

  this.setSize = (size) => {
    this.size = size;
  }

  this.setSpawnPoint = (xpos, ypos) => {
    this.spawnPoint.x = xpos;
    this.spawnPoint.y = ypos;
    this.position = this.spawnPoint.copy();
  }

  this.applyForce = (forceVector) => {
    this.velocity.add(forceVector);
  }

  this.move = () => {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  this.moveAccordingToDNA = (index) => {
    let dnaInstruction = this.dna.getInstructionAtIndex(index);
    this.applyForce(dnaInstruction);
  }

  this.copy = () => {
    let copiedCreature = new Creature();
    copiedCreature.setSpawnPoint(this.spawnPoint.x, this.spawnPoint.y);
    copiedCreature.size = this.size;
    copiedCreature.dna = this.dna.copy();

    return copiedCreature;
  }

  this.mutateDNA = (mutationRate) => {
    this.dna.mutate(mutationRate);
  }

  this.getDistanceToTarget = () => {
    return dist(
      this.position.x, this.position.y,
      target.position.x, target.position.y
    );
  }
}
