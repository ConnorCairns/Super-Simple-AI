function setup() {
  createCanvas(740, 580);
  pop = new Population(500);
  goal = createVector(width / 2, 30);
}

function draw() {
  background(51);
  fill(255, 0, 0);
  ellipse(goal.x, goal.y, 10, 10);

  if (pop.allDead()) {
    pop.calcFitness();
    pop.naturalSelection();
    pop.mutateBaby();
  } else {
    pop.update();
    pop.show();
  }
}