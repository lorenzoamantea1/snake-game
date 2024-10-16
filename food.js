class Food {
    constructor() {
        this.position = createVector(floor(random(20)), floor(random(20)));
    }

    show() {
        fill(255, 0, 0);
        rect(this.position.x, this.position.y, 1, 1);
    }

    respawn() {
        this.position.set(floor(random(20)), floor(random(20)));
    }
}