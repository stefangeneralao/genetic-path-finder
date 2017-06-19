function Target(xpos, ypos) {
  this.position = createVector(xpos, ypos);
  this.size = 50;

  this.show = () => {
    push();
    fill(127);
    ellipse(this.position.x, this.position.y, this.size);
    pop();
  }
}
