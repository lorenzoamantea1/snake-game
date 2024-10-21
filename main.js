let snake;
let food;
let resolution = 20;
let speed = 5;

function setup() {
    createCanvas(700, 700);
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
