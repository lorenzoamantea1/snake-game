class Snake {
    constructor(gridWidth = 35, gridHeight = 35) {
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.reset();
    }

    reset() {
        this.body = [createVector(0,0)];
        this.xdir = 0;
        this.ydir = 0;
        this.points = 0;
    }

    update() {
        const head = this.body[0].copy();
        head.x += this.xdir;
        head.y += this.ydir;

        if (this.isGameOver(head)) {
            console.log("Snake: update - Game Over");
            this.reset(); 
            return true; 
        }

        this.body.unshift(head);
        this.body.pop();

        return false;
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

    setDir(x, y) {
        if (this.body.length > 1) {
            if (x !== 0 && this.xdir !== 0) return; 
            if (y !== 0 && this.ydir !== 0) return; 
        }
        this.xdir = x;
        this.ydir = y;
    }
    grow(len) {
        for (let i = 0; i < len; i++) {
            this.body.push(this.body[this.body.length - 1].copy());
        }
        this.points++
    }

    eat(food) {
        if (this.body[0].x === food.position.x && this.body[0].y === food.position.y) {
            this.grow(food.type);
            console.log("Snake: eat -",food.type);
            return true;
        }
        return false;
    }
    
    show() {
        noStroke();
        fill(0);
        for (let segment of this.body) {
            rect(segment.x, segment.y, 1, 1);
        }
    }
}
