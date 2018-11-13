function setup() {
  var canvas = createCanvas(740, 580);
  canvas.parent('sketch');
  canvas.addClass('mx-auto');
  canvas.style('display:block');

  popSize = createInput("500").parent('population').addClass('form-control');
  mutateRate = createInput("1").parent('mutationRate').addClass('form-control');

  button = createButton('Run').parent('submitButton').addClass('btn btn-outline-dark');
  button.mousePressed(inputEvent);

  pop = new Population(500, 0.01);
  goal = createVector(width / 2, 30);

}

function draw() {
  background(51);
  fill(255, 0, 0);
  ellipse(goal.x, goal.y, 10, 10);

  rect(70, 300, 600, 20)

  if (pop.allDead()) {
    pop.calcFitness();
    pop.naturalSelection();
    pop.mutateBaby();
    let gen = select('#gen')
    gen.html(pop.generation);
  } else {
    pop.update();
    pop.show();
  }
}

function inputEvent() {
  let populationSize = popSize.value();
  let mutateR = mutateRate.value() * 0.01;

  let mutationAlert = select('#mutationAlert');
  let popAlert = select('#popAlert')

  if (populationSize >= 2000) {
    popAlert.style('display:block')
  } else {
    popAlert.style('display:none')
  }

  if (mutateR < 0.01 || mutateR > 1) {
    mutationAlert.style('display:block');
  } else {
    mutationAlert.style('display:none');
    pop = new Population(populationSize, mutateR)
  }
}