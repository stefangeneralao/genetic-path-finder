function Creature() {
  // Constructor.
  this.position = createVector(width * 0.5, height * 0.5);
  this.velocity = createVector();
  this.maxVelocity = 0;
  this.size = 1;
  this.dna = new DNA();
  this.fitness = 0;
  this.colorCode = getRandomColor();
  this.isAlive = true;

  // Shows the current position, heading and velocity magnitude.
  this.show = () => {
    push();
    noStroke();
    fill(this.colorCode);
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    ellipse(0, 0, this.velocity.mag() * 2, this.size);
    pop();
  }

  // Sets the visual size.
  this.setSize = (size) => {
    this.size = size;
  }

  // Applies a force vector to velocity.
  // Method does not effect the position.
  this.applyForce = (forceVector) => {
    this.velocity.add(forceVector);
  }

  // Fetches instruction from dna and moves accordingly.
  this.moveAccordingToDNA = (index) => {
    const dnaInstruction = this.dna.getInstructionAtIndex(index);
    this.applyForce(dnaInstruction);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  // Returns a copy of this object.
  this.copy = () => {
    const copiedCreature = new Creature();
    copiedCreature.size = this.size;
    copiedCreature.dna = this.dna.copy();
    copiedCreature.colorCode = this.colorCode;
    copiedCreature.maxVelocity = this.maxVelocity;
    return copiedCreature;
  }

  // Mutates this dna.
  this.mutateDNA = (mutationRate) => {
    this.dna.mutate(mutationRate);
  }

  // Returns distance to target.
  this.getDistanceToTarget = () => {
    return target.getDistance(this.position.x, this.position.y);
  }

  // Sets this position.
  this.setPosition = (xpos, ypos) => {
    this.position.x = xpos;
    this.position.y = ypos;
  }

  // Sets this velocity.
  this.setVelocity = (xvel, yvel) => {
    this.velocity.x = xvel;
    this.velocity.y = yvel;
  }

  // Limits velocity.
  this.limitVelocity = () => {
    if(this.maxVelocity != 0) {
      if(this.velocity.mag() > this.maxVelocity) {
        this.velocity.setMag(this.maxVelocity);
      }
    }
  }

  // Resets the velocity.
  this.freeze = () => {
    this.velocity = createVector();
  }

  // Resets the fitness.
  this.resetFitness = () => {
    this.fitness = 0;
  }

  // Resets velocity and fitness. Also calls a visual flash
  // and sets isAlive variable to false.
  this.kill = () => {
    this.flash();
    this.freeze();
    this.resetFitness();
    this.isAlive = false;
  }

  // Displays a circle around the current position.
  this.flash = () => {
    push();
    fill(this.colorCode);
    noStroke();
    ellipse(this.position.x, this.position.y, 50);
    pop();
  }

  // Sets max force.
  this.setMaxForce = (maxForce) => {
    console.log(maxForce);
    this.dna.setMaxForce(maxForce);
  }

  // Sets max velocity.
  this.setMaxVelocity = (maxVelocity) => {
    this.maxVelocity = maxVelocity;
  }

  // Sets color code.
  this.setColorCode = (colorCode) => {
    this.colorCode = colorCode;
  }

  // Randomize color.
  this.randomizeColor = () => {
    this.colorCode = getRandomColor();
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
