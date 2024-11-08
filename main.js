window.onload = function () {
    setTimeout(function () {
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("score-display").style.display = "block";  
        document.getElementById("best-score-display").style.display = "block";  
    }, 3000); 
};



let resolution = 20;
let speed = 5;

let bestScore = 0;

let snake;
let enemy;
let food;

function setup() {
    createCanvas(700, 700);
    snake = new Snake();
    food = new Food();
    enemy = new Enemy();
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

    const target = food.position // snake.body[0]
    snake.update()
    if (!snake.xdir == 0 || !snake.ydir == 0) {
        enemy.update(target);
    }

    if (snake.eat(food) || enemy.eat(food)) {
        food = new Food();
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
            snake.reset();
        }
    }

    snake.show();
    food.show();
    enemy.show();
}

function updateScoreDisplay() {
    document.getElementById('score').innerText = snake.score;
    document.getElementById('best-score').innerText = bestScore;
    if (snake.score > bestScore) {
        document.getElementById("score-display").style.animation = "blink 0.1s infinite alternate";  
        document.getElementById("best-score-display").style.animation = "blink 0.1s infinite alternate";  
        saveBestScore();
    } else {
        document.getElementById("score-display").style.animation = "none";  
        document.getElementById("best-score-display").style.animation = "none";  
    }
}

function saveBestScore() {
    localStorage.setItem('bestScore', snake.score);
}

function loadBestScore() {
    const savedBestScore = localStorage.getItem('bestScore');
    if (savedBestScore) {
        bestScore = parseInt(savedBestScore, 10);
    }
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
