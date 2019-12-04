function Target(xpos, ypos) {
  this.position = createVector(xpos, ypos);
  this.size = 50;
  this.colorCode = color(127, 30);

  this.show = () => {
    push();
    if(darkTheme) {

    }else{
      fill(0, 10);
      stroke(this.colorCode);
    }
    strokeWeight(2);
    ellipse(this.position.x, this.position.y, this.size);
    pop();
  }

  // Returns 0 if hit.
  this.getDistance = (otherPosx, otherPosy) => {
    const distance = dist(
      otherPosx, otherPosy,
      this.position.x, this.position.y
    );

    if(distance > this.size / 2) {
      return distance;
    }else{
      return 0;
    }
  }

  this.setPosition = (xpos, ypos) => {
    this.position.x = xpos;
    this.position.y = ypos;
  }

  this.setSize = (size) => {
    this.size = size;
  }
}
