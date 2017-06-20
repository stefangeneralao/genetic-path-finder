function DNA() {
  this.genes = [];
  this.maxForce = 1.0;

  this.getInstructionAtIndex = (index) => {
    while(index >= this.genes.length) {
      this.addGene();
    }
    return this.genes[index];
  }

  this.addGene = () => {
    const newGene = this.createNewGene();
    this.genes.push(newGene);
  }

  this.mutate = (mutationRate) => {
    for(let i in this.genes) {
      if(random() < mutationRate) {
        this.genes[i] = this.createNewGene();
      }
    }
  }

  this.createNewGene = () => {
    let newGene = p5.Vector.random2D();
    newGene.mult(this.maxForce);
    return newGene;
  }

  this.copy = () => {
    let copiedDNA = new DNA();
    for(let i in this.genes) {
      copiedDNA.genes.push(this.genes[i]);
    }

    return copiedDNA;
  }

  this.setMaxForce = (maxForce) => {
    this.maxForce = maxForce;
  }
}
