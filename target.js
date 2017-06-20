function Target(xpos, ypos) {
  this.position = createVector(xpos, ypos);
  this.size = 50;

  this.show = () => {
    push();
    fill(127);
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
}
