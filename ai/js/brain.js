angle = 0

class Brain {
    constructor(moves, mutationRate) {
        this.dirs = [];
        this.step = 0;
        this.mutationRate = mutationRate;
        for (let i = 0; i < moves; i++) {
            angle = Math.floor((Math.random() * (2*PI)) + 1)
            this.dirs[i] = createVector(cos(angle), sin(angle))
        }
    }

    clone() {
        let clone = new Brain(this.dirs.length, this.mutationRate);
        for (let i = 0; i < this.dirs.length; i++) {
            clone.dirs[i] = this.dirs[i].copy();
        }
        return clone
    }

    mutate() {
        //let mutationRate = 0.01;
        for (let i = 0; i < this.dirs.length; i++) {
            if (Math.random() < this.mutationRate) {
                angle = Math.floor((Math.random() * (2*PI)) + 1)
                this.dirs[i] = createVector(cos(angle), sin(angle))
            }
        }
    }

}