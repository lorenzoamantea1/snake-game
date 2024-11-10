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

    update(target, obstacles) {
        const head = this.body[0].copy();
        this.moveTowardsTarget(target, obstacles);
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
    
    moveTowardsTarget(target, obstacles) {
        const head = this.body[0];
        const dx = target.x - head.x;
        const dy = target.y - head.y;
        let newXDir = this.xdir;
        let newYDir = this.ydir;

        if (abs(dx) > abs(dy)) {
            newXDir = dx > 0 ? 1 : -1;
            newYDir = 0;
        } else {
            newYDir = dy > 0 ? 1 : -1;
            newXDir = 0;
        }

        const newPosX = head.x + newXDir;
        const newPosY = head.y + newYDir;

        if (this.isObstacle(newPosX, newPosY, obstacles) || this.isSelfCollision(newPosX, newPosY)) {
            if (newXDir !== 0) {
                newXDir = 0;
                newYDir = dy > 0 ? 1 : -1;
            } else {
                newYDir = 0;
                newXDir = dx > 0 ? 1 : -1;
            }
        }

        this.xdir = newXDir;
        this.ydir = newYDir;
    }

    isObstacle(x, y, obstacles) {
        for (let obstacle of obstacles) {
            if (obstacle.x === x && obstacle.y === y) {
                return true;
            }
        }
        return false;
    }

    isSelfCollision(x, y) {
        for (let i = 1; i < this.body.length; i++) {
            if (this.body[i].x === x && this.body[i].y === y) {
                return true;
            }
        }
        return false;
    }

    isGameOver(head) {
        if (head.x < 0 || head.x >= this.gridWidth || head.y < 0 || head.y >= this.gridHeight) {
            return true;
        }
        return this.isSelfCollision(head.x, head.y);
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
