class Population {
    constructor(size) {
        this.fitnessSum = 0
        this.generation = 1
        this.bestDot = 0;
        this.minStep = 400;
        this.dots = [];
        for (let i = 0; i < size; i++) {
            this.dots[i] = new Dot();
        }
    }

    show() {
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].show();
        }
    }

    update() {
        for (let i = 0; i < this.dots.length; i++) {
            if (this.dots[i].brain.step > this.minStep) {
                this.dots[i].dead = true;
            } else {
                this.dots[i].update();
            }
        }
    }

    calcFitness() {
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].calcFitness();
        }
    }

    calcFitnessSum() {
        this.fitnessSum = 0
        for (let i = 0; i < this.dots.length; i++) {
            this.fitnessSum += this.dots[i].fitness;
        }
    }

    allDead() {
        let total = 0
        for (let i = 0; i < this.dots.length; i++) {
            if (this.dots[i].dead == true || this.dots[i].goal == true) {
                total++;
            }
        }
        if (total == this.dots.length) {
            return true;
        } else {
            return false;
        }
    }

    naturalSelection() {
        this.calcFitnessSum();
        this.getBestDot();
        this.newDots = [];
        for (let i = 0; i < this.dots.length; i++) {
            this.newDots[i] = new Dot();
        }
        this.newDots[0] = this.dots[this.bestDot].getBaby();
        this.newDots[0].isBest = true;
        for (let i = 1; i < this.newDots.length; i++) {
            parent = this.getParent();
            this.newDots[i] = parent.getBaby()
        }
        this.dots = this.newDots;
        this.generation++;
    }

    getParent() {
        const random = Math.random() * this.fitnessSum
        let currentTotal = 0
        for (let i = 0; i < this.dots.length; i++) {
            currentTotal += this.dots[i].fitness;
            if (currentTotal > random) {
                return this.dots[i];
            }
        }
        return null;
    }

    mutateBaby() {
        for (let i = 1; i < this.dots.length; i++) {
            this.dots[i].brain.mutate();
        }
    }

    getBestDot() {
        let max = 0;
        let maxIndex = 0;
        for (let i = 0; i < this.dots.length; i++) {
            if (this.dots[i].fitness > max) {
                max = this.dots[i].fitness;
                maxIndex = i;
            }
        }
        this.bestDot = maxIndex;

        if (this.dots[this.bestDot].goal == true) {
            this.minStep = this.dots[this.bestDot].brain.step;
        }
    }


}