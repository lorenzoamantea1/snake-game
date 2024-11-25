let speed = 5;
let bestScore = 0;

let snake;
let enemy;
let food;
let obstacle; 
let resolution;

let gridWidth = 45; 
let gridHeight = 45; 
let numObstacles = 20; 

function setup() {
    canvasSize = min(windowWidth, windowHeight) * 0.9;
    resolution = floor(canvasSize / max(gridWidth, gridHeight));

    createCanvas(gridWidth * resolution, gridHeight * resolution);

    obstacle = new Obstacle(gridWidth, gridHeight, numObstacles);
    enemy = new Enemy(gridWidth, gridHeight);
    const obstaclesCheckbox = document.getElementById('ObstacleSwitch');
    const enemyCheckbox = document.getElementById('EnemySwitch');
    
    let obstaclesSwitch = JSON.parse(localStorage.getItem('obstaclesEnabled'));
    if (obstaclesSwitch === null) {
        obstaclesSwitch = obstaclesCheckbox.checked;
    } else {
        obstaclesCheckbox.checked = obstaclesSwitch;
    }
    
    if (obstaclesSwitch) {
        obstacle.addObstacles(15);
    } else {
        obstacle.clearObstacles();
    }
    
    obstaclesCheckbox.addEventListener('change', (e) => {
        obstaclesSwitch = e.target.checked;
        localStorage.setItem('obstaclesEnabled', JSON.stringify(obstaclesSwitch));
    });
    
    let enemySwitch = JSON.parse(localStorage.getItem('enemyEnabled'));
    if (enemySwitch === null) {
        enemySwitch = enemyCheckbox.checked;
    } else {
        enemyCheckbox.checked = enemySwitch;
    }
    
    if (enemySwitch) {
        enemy.spawn();
    } else {
        enemy.despawn();
    }
    
    enemyCheckbox.addEventListener('change', (e) => {
        enemySwitch = e.target.checked;
        localStorage.setItem('enemyEnabled', JSON.stringify(enemySwitch));
    });

    snake = new Snake(gridWidth, gridHeight);
    food = new Food(obstacle.positions);

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
    } else if (key === 'b' || key === 'B' || keyCode === 66) {
        snake.activateBoost();
    }
}

const upButton = document.querySelector('.up');
const downButton = document.querySelector('.down');
const leftButton = document.querySelector('.left');
const rightButton = document.querySelector('.right');
const boostButton = document.querySelector('.boost');

upButton.addEventListener('touchstart', () => {
  snake.setDir(0, -1);  // Move up
});

downButton.addEventListener('touchstart', () => {
  snake.setDir(0, 1);  // Move down
});

leftButton.addEventListener('touchstart', () => {
  snake.setDir(-1, 0);  // Move left
});

rightButton.addEventListener('touchstart', () => {
  snake.setDir(1, 0);  // Move right
});

boostButton.addEventListener('touchstart', () => {
  snake.activateBoost();  // Activate boost
});

// Optional: To prevent the default browser behavior (like zooming)
document.body.addEventListener('touchmove', function(event) {
  event.preventDefault();
})