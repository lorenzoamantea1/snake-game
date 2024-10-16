let snake;
let food;
let resolution = 20;
let speed = 5;

function setup() {
    createCanvas(400, 400);
    snake = new Snake();
    food = new Food();
}

function draw() {

    speed = 5+(snake.points)/2
    
    frameRate(speed);
    
    scale(resolution);
    background(220);

    snake.update()
    if (snake.eat(food)) {
        food = new Food();
    }

    snake.show();
    food.show();

    snake.show();

}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        snake.setDir(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        snake.setDir(0, 1);
    } else if (keyCode === LEFT_ARROW) {
        snake.setDir(-1, 0);
    } else if (keyCode === RIGHT_ARROW) {
        snake.setDir(1, 0);
    }
}