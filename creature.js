function Creature() {
  // Constructor.
  this.position = createVector(width * 0.5, height * 0.5);
  this.velocity = createVector();
  this.size = 1;
  this.dna = new DNA();
  this.fitness = 0;
  this.colorCode = color(
    random(50, 205),
    random(50, 205),
    random(50, 205),
    50
  );
  this.isAlive = true;

  this.show = () => {
    push();
    noStroke();
    fill(this.colorCode);
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    ellipse(0, 0, this.velocity.mag() * 2, this.size);
    pop();
  }

  this.setSize = (size) => {
    this.size = size;
  }

  this.applyForce = (forceVector) => {
    this.velocity.add(forceVector);
  }

  this.moveAccordingToDNA = (index) => {
    let dnaInstruction = this.dna.getInstructionAtIndex(index);
    this.applyForce(dnaInstruction);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  this.copy = () => {
    let copiedCreature = new Creature();
    copiedCreature.size = this.size;
    copiedCreature.dna = this.dna.copy();
    copiedCreature.colorCode = this.colorCode;

    return copiedCreature;
  }

  this.mutateDNA = (mutationRate) => {
    this.dna.mutate(mutationRate);
  }

  this.getDistanceToTarget = () => {
    return target.getDistance(this.position.x, this.position.y);
  }

  this.setPosition = (xpos, ypos) => {
    this.position.x = xpos;
    this.position.y = ypos;
  }

  this.setVelocity = (xvel, yvel) => {
    this.velocity.x = xvel;
    this.velocity.y = yvel;
  }

  this.freeze = () => {
    this.velocity = createVector();
  }

  this.resetFitness = () => {
    this.fitness = 0;
  }

  this.kill = () => {
    this.flash();
    this.freeze();
    this.resetFitness();
    this.isAlive = false;
  }

  this.flash = () => {
    push();
    fill(this.colorCode);
    noStroke();
    ellipse(this.position.x, this.position.y, 50);
    pop();
  }

  this.setMaxForce = (maxForce) => {
    this.dna.setMaxForce(maxForce);
  }

  this.setColorCode = (colorCode) => {
    this.colorCode = colorCode;
  }

  this.randomizeColor = () => {
    return this.colorCode = color(
      random(50, 205),
      random(50, 205),
      random(50, 205),
      50
    );
  }
}

function getRandomColor() {
  return this.colorCode = color(
    random(50, 205),
    random(50, 205),
    random(50, 205),
    50
  );
}
