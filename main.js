let snake;
let food;
let resolution = 20;
let speed = 5;

function setup() {
    createCanvas(700, 700);
    snake = new Snake();
    food = new Food();
    enemy = new Enemy();
}

function draw() {

    speed = 5+(snake.points)/2
    frameRate(speed);

    scale(resolution);
    background(220);

    snake.update()

    const target = food.position // snake.body[0]
    enemy.update(target);

    if (snake.eat(food)) {
        food = new Food();
    }

    if (enemy.eat(food)) {
        food = new Food();
    }

    if (enemy.checkCollision(snake)) {
        console.log("Game Over - Enemy Collision");
        snake.reset();
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
    }
}
