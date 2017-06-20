function Obstacle(xpos, ypos, size) {
  this.position = createVector(xpos, ypos);
  this.size = size ? size : 100;
  this.jitterRate = 1;
  this.bottomBorder = 0;

  this.setPosition = (xpos, ypos) => {
    this.position.x = xpos;
    this.position.y = ypos;
  }

  this.show = () => {
    push();
    if(darkTheme){
      fill(0, 50);
      stroke(255, 5);
    }else{
      fill(255, 50);
      stroke(0, 5);
    }
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

  this.setJitter = (jitterRate) => {
    this.jitterRate = jitterRate;
  }

  this.move = () => {
    const randomVector = p5.Vector.random2D();
    randomVector.mult(this.jitterRate);
    this.moveRelative(randomVector);

    // Check bottom border.
    if(!this.withinBottomBorder()) {
      this.setPosition(this.position.x, this.bottomBorder);
    }
  }

  this.setBottomBorder = (border) => {
    this.bottomBorder = border;
  }

  this.getBottomBorder = () => {
    return this.bottomBorder;
  }

  this.withinBottomBorder = () => {
    const ypos = this.position.y;
    const halfSize = this.size / 2;
    if(ypos < this.bottomBorder) {
      return true;
    }else{
      return false;
    }
  }
}
