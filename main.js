let resolution = 20;
let speed = 5;

let snake;
let enemy;
let food;

function setup() {
    createCanvas(700, 700);
    snake = new Snake();
    food = new Food();
    enemy = new Enemy();
}

function draw() {
    snake.checkBoostStatus();

    let currentSpeed = speed + (snake.points / 2) + (snake.boostActive ? speed * 2 : speed);
    frameRate(currentSpeed);

    scale(resolution);
    background(220);

    const target = food.position // snake.body[0]
    snake.update()
    if (!snake.xdir == 0 || !snake.ydir == 0) {
        enemy.update(target);
    }

    if (snake.eat(food) || enemy.eat(food)) {
        food = new Food();
    }
    if (enemy.checkCollision(snake)) {
        if (snake.body.length > enemy.body.length) {
            snake.grow(enemy.body.length);
            console.log("[Main]: Enemy killed -",enemy.body.length);
            enemy.reset();
        } else {
            enemy.grow(snake.body.length);
            console.log("[Main]: Game Over - Enemy Collision -",enemy.body.length);
            snake.reset();
        }
    }

    snake.show();
    food.show();
    enemy.show();
}

function keyPressed() {
    if (keyCode === 87) {
        snake.setDir(0, -1);
    } else if (keyCode === 83) {
        snake.setDir(0, 1);
    } else if (keyCode === 65) {
        snake.setDir(-1, 0);
    } else if (keyCode === 68) {
        snake.setDir(1, 0);
    } else if (key === 'b') {
        snake.activateBoost();
    }
}
