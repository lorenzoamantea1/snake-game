class Food {

    constructor() {
        this.position = createVector(floor(random(width / resolution)), floor(random(height / resolution)));
        this.type = floor(random(1, 5));
        console.log("[Food]: Spawn -", this.type);
    }

    show() {
        if (this.type === 1) {
            fill(255, 0, 0);
        } else if (this.type === 2) {
            fill(0, 0, 255);
        } else if (this.type === 3) {
            fill(255, 165, 0);
        } else if (this.type === 4) {
            fill(255, 0, 127);
        }
        rect(this.position.x, this.position.y, 1, 1);
    }

    respawn() {
        this.position.set(floor(random(20)), floor(random(20)));
        this.type = floor(random(3));
    }
}