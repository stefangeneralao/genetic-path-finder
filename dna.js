function DNA() {
  this.genes = [];

  this.getInstructionAtIndex = (index) => {
    while(index >= this.genes.length) {
      this.addGene();
    }
    return this.genes[index];
  }

  this.addGene = () => {
    let newGene = this.createNewGene();
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
    newGene.mult(1);
    return newGene;
  }

  this.copy = () => {
    let copiedDNA = new DNA();
    for(let i in this.genes) {
      copiedDNA.genes.push(this.genes[i]);
    }

    return copiedDNA;
  }
}
