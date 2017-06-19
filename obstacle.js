function Obstacle() {
  this.position = createVector();
  this.size = 100;

  this.setPosition = (xpos, ypos) => {
    this.position.x = xpos;
    this.position.y = ypos;
  }

  this.show = () => {
    push();
    fill(255);
    ellipse(this.position.x, this.position.y, this.size);
    pop();
  }

  this.moveRelative = (vector) => {
    this.position.x += vector.x;
    this.position.y += vector.y;
  }
}
