let resolution = 20;
let speed = 5;
let bestScore = 0;

let snake;
let enemy;
let food;
let obstacle; 

let gridWidth = 35; 
let gridHeight = 35; 
let numObstacles = 15;

function setup() {
    createCanvas(700, 700);
    resolution = floor(width / gridWidth); 

    snake = new Snake(gridWidth, gridHeight);
    obstacle = new Obstacle(gridWidth, gridHeight, numObstacles); 
    food = new Food(obstacle.positions);
    enemy = new Enemy(gridWidth, gridHeight);
    loadBestScore();
    updateScoreDisplay();
}

function draw() {
    snake.checkBoostStatus();

    loadBestScore();

    let currentSpeed = speed + (snake.score / 20) + (snake.boostActive ? speed * 2 : speed);
    frameRate(currentSpeed);

    scale(resolution);
    background(18, 18, 18);

    if (snake.update()) {
        showGameOver();
    }

    if (!snake.xdir == 0 || !snake.ydir == 0) {
        enemy.update(food.position, obstacle.positions);
    }

    if (snake.eat(food) || enemy.eat(food)) {
        food.respawn();
        updateScoreDisplay();
    }
    if (enemy.checkCollision(snake)) {
        updateScoreDisplay();
        if (snake.body.length > enemy.body.length) {
            snake.grow(enemy.body.length);
            console.log("[Main]: Enemy killed -", enemy.body.length);
            snake.score += 15;
            enemy.reset();
        } else {
            enemy.grow(snake.body.length);
            console.log("[Main]: Game Over - Enemy Collision -", enemy.body.length);
            showGameOver();
        }
    }
    if (obstacle.checkCollision(snake)) {
        showGameOver();
    }
    if (obstacle.checkCollision(enemy)) {
        enemy.reset()
    }
    snake.show();
    food.show();
    enemy.show();
    obstacle.show();
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
