class Dot {
    constructor() {
        this.pos = createVector(width / 2, height - 10);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.brain = new Brain(400);
        this.dead = false;
        this.goal = false;
        this.fitness = 0;
        this.isBest = false;
    }
    show() {
        if (this.isBest == true) {
            fill(0, 255, 0);
            ellipse(this.pos.x, this.pos.y, 15, 15);
        } else {
            fill(255);
            ellipse(this.pos.x, this.pos.y, 10, 10);
        }
    }
    move() {
        if (this.brain.step < this.brain.dirs.length) {
            this.acc = this.brain.dirs[this.brain.step];
            this.brain.step++;
        } else {
            this.dead = true;
        }
        this.vel.add(this.acc);
        this.vel.limit(5);
        this.pos.add(this.vel);
    }

    update() {
        if (this.dead == false && this.goal == false) {
            this.move();
        }
        if (dist(this.pos.x, this.pos.y, goal.x, goal.y) < 5) {
            this.goal = true;
        }
        if (this.pos.x < 1 || this.pos.y < 1 || this.pos.x > width - 1 || this.pos.y > height - 1) {
            this.dead = true;
        }
    }

    calcFitness() {
        if (this.goal == true) {
            this.fitness = 1/16 + 10000 / (this.brain.step * this.brain.step);
        } else {
            let distToGoal = dist(this.pos.x, this.pos.y, goal.x, goal.y);
            this.fitness = 1 / (distToGoal * distToGoal);
        }
    }

    getBaby() {
        let baby = new Dot();
        baby.brain = this.brain.clone();
        return baby;
    }
}