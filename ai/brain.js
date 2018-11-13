angle = 0

class Brain {
    constructor(moves) {
        this.dirs = [];
        this.step = 0;
        for (let i = 0; i < moves; i++) {
            angle = Math.floor((Math.random() * (2*PI)) + 1)
            this.dirs[i] = createVector(cos(angle), sin(angle))
        }
    }

    clone() {
        let clone = new Brain(this.dirs.length);
        for (let i = 0; i < this.dirs.length; i++) {
            clone.dirs[i] = this.dirs[i].copy();
        }
        return clone
    }

    mutate() {
        let mutationRate = 0.01;
        for (let i = 0; i < this.dirs.length; i++) {
            if (Math.random() < mutationRate) {
                angle = Math.floor((Math.random() * (2*PI)) + 1)
                this.dirs[i] = createVector(cos(angle), sin(angle))
            }
        }
    }

}