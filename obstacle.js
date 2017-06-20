function Obstacle(xpos, ypos, size) {
  this.position = createVector(xpos, ypos);
  this.size = size ? size : 100;

  this.setPosition = (xpos, ypos) => {
    this.position.x = xpos;
    this.position.y = ypos;
  }

  this.show = () => {
    push();
    fill(255, 50);
    stroke(0, 5);
    strokeWeight(10);
    ellipse(this.position.x, this.position.y, this.size);
    pop();
  }

  this.moveRelative = (vector) => {
    this.position.x += vector.x;
    this.position.y += vector.y;
  }

  // Returns true if creature crashed in this obstacle.
  this.checkCrash = (creature) => {
    const distanceToCreature = dist(
      creature.position.x, creature.position.y,
      this.position.x, this.position.y
    );

    if(distanceToCreature < this.size / 2) {
      return true;
    }else{
      return false;
    }
  }

  this.setSize = (size) => {
    this.size = size;
  }
}
