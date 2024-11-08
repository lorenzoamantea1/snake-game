class Enemy {
    constructor(gridWidth = 35, gridHeight = 35) {
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.reset();
    }

    reset() {
        this.body = [createVector(floor(random(this.gridWidth)), floor(random(this.gridHeight)))];
        this.xdir = 0;
        this.ydir = 0;
        this.growthCounter = 3;
    }

    update(target) {
        const head = this.body[0].copy();
        this.moveTowardsTarget(target);

        head.x += this.xdir;
        head.y += this.ydir;

        if (this.isGameOver(head)) {
            console.log("[Enemy]: update - Game Over");
            this.reset();
            return;
        }

        this.body.unshift(head);

        if (this.growthCounter > 0) {
            this.growthCounter--;
        } else {
            this.body.pop();
        }
    }

    eat(food) {
        if (this.body[0].x === food.position.x && this.body[0].y === food.position.y) {
            this.grow(food.type);
            console.log("[Enemy]: eat -", food.type);
            return true;
        }
        return false;
    }

    moveTowardsTarget(target) {
        const head = this.body[0];

        const dx = target.x - head.x;
        const dy = target.y - head.y;

        if (abs(dx) > abs(dy)) {
            this.xdir = dx > 0 ? 1 : -1;
            this.ydir = 0;
        } else {
            this.ydir = dy > 0 ? 1 : -1;
            this.xdir = 0;
        }

        if (this.body.length > 1) {
            const neck = this.body[1];
            if (head.x + this.xdir === neck.x && head.y + this.ydir === neck.y) {
                if (abs(dx) > abs(dy)) {
                    this.xdir = 0;
                    this.ydir = dy > 0 ? 1 : -1;
                } else {
                    this.ydir = 0;
                    this.xdir = dx > 0 ? 1 : -1;
                }
            }
        }
    }

    isGameOver(head) {
        if (head.x < 0 || head.x >= this.gridWidth || head.y < 0 || head.y >= this.gridHeight) {
            return true;
        }

        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }
        return false;
    }

    grow(len = 1) {
        this.growthCounter += len / 2;
    }

    checkCollision(snake) {
        for (let segment of this.body) {
            if (segment.x === snake.body[0].x && segment.y === snake.body[0].y) {
                return true;
            }
        }
        return false;
    }

    show() {
        fill(209, 0, 255);
        noStroke();
        for (let segment of this.body) {
            rect(segment.x, segment.y, 1, 1);
        }
    }
}
