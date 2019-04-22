const WIDTH = 600,
    HEIGHT = 600;
let appleX = WIDTH / 2,
    appleY = HEIGHT / 2,
    score = 0,
    dirX = 1,
    dirY = 0,
    pastScore = 0,
    name = "",
    time = 0,
    timer = 10,
    menu = 1,
    snake = [];
function setup() {
    createCanvas(600, 600);
    frameRate(100);
    snake.push({ x: 60, y: 300 });
    //snake.push({x:snake[snake.length-1].x,y:snake[snake.length-1].y});
}
function reset() {
    appleX = WIDTH / 2;
    appleY = HEIGHT / 2;
    pastScore = score;
    score = 0;
    dirX = 1;
    dirY = 0;
    time = 0;
    timer = 10;
    snake.length = 0;
    snake.push({ x: 60, y: WIDTH / 2 });
    menu = 1;
}
function draw() {
    background(51);
    if (menu == 0) {
        if (time == Math.round(timer)) {
            moveSnake();
            time = 0;
        } else {
            time++;
        }
        collisionCheck();
        drawApple();
        drawSnake();
        fill(15, 106, 252);
        textSize(20);
        text("Score: " + score, 20, 40);
    }
    if (menu == 1) {
        mainMenu();
    }
}
function mainMenu() {
    background(51);
    fill(56, 56, 56);
    rect(150, 100, 300, 400);
    textSize(40);
    fill(255, 255, 255);
    text("Main Menu", 200, 150);
    textSize(30);
    fill(255, 255, 255);
    text("Score: " + pastScore, 240, 210);
    fill(0);
    rect(240, 250, 120, 50);
    fill(225);
    textSize(30);
    text("Play", 270, 285);
    if (
        mouseX >= 240 &&
        mouseX <= 360 &&
        mouseY >= 250 &&
        mouseY <= 300 &&
        mouseIsPressed
    ) {
        menu = 0;
    }
}
function moveSnake() {
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
    }
    snake[0].x = snake[0].x + 20 * dirX;
    snake[0].y = snake[0].y + 20 * dirY;
}
function drawSnake() {
    fill(15, 106, 252);
    for (let i = 0; i < snake.length; i++) {
        rect(snake[i].x, snake[i].y, 20, 20);
    }
}
function collisionCheck() {
    if (
        snake[0].x > 580 ||
        snake[0].x < 0 ||
        snake[0].y > 580 ||
        snake[0].y < 0
    ) {
        die();
    } else if (snake[0].x == appleX && snake[0].y == appleY) {
        eatApple();
    } else {
        for (let i = 2; i < snake.length; i++) {
            if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
                die();
            }
        }
    }
}
function die() {
    reset();
}
function drawApple() {
    fill(255, 0, 0);
    rect(appleX, appleY, 20, 20);
}
function eatApple() {
    score++;
    if (timer > 5) {
        timer -= 0.5;
    }
    snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
    let checking = true;
    while (checking) {
        appleX = Math.floor(random() * 30) * 20;
        appleY = Math.floor(random() * 30) * 20;
        for (let i = 0; i < snake.length; i++) {
            if (appleX == snake[i].x && appleY == snake[i].y) {
                checking = false;
                break;
            }
        }
        if (checking) {
            break;
        }
    }
}
function keyPressed() {
    if (keyCode == LEFT_ARROW && dirX != 1) {
        dirX = -1;
        dirY = 0;
    } else if (keyCode == RIGHT_ARROW && dirX != -1) {
        dirX = 1;
        dirY = 0;
    }
    if (keyCode == UP_ARROW && dirY != 1) {
        dirY = -1;
        dirX = 0;
    } else if (keyCode == DOWN_ARROW && dirY != -1) {
        dirY = 1;
        dirX = 0;
    }
}
