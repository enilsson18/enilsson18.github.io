const WIDTH = 600, HEIGHT = 600;
let appleX = WIDTH/2, appleY = HEIGHT/2, score = 0, dirX = 1, dirY = 0, pastScore = 0, name = "";
time = 0, timer = 10, menu = 1, submitScore = false;
snake = [];

function setup()
{
	createCanvas(600,600);
	frameRate(100);
	snake.push({x:60,y:WIDTH/2});
	//snake.push({x:snake[snake.length-1].x,y:snake[snake.length-1].y});
	//input = createInput();
}

function reset()
{
	appleX = WIDTH/2;
	appleY = HEIGHT/2;
	pastScore = score;
	score = 0;
	dirX = 1;
	dirY = 0;
	time = 0;
	timer = 10;
	snake.length = 0;
	snake.push({x:60,y:WIDTH/2});
	menu = 1;
}

function draw()
{
	background(51);
	if (menu == 0)
	{
	//input.hide();
	fill(15, 106, 252);
	textSize:20;
	text("Score: " + score, 20, 40);
	if (time == Math.round(timer))
	{
		moveSnake();
		time = 0;
	}
	else
	{
		time++;
	}
	collisionCheck();
	drawApple();
	drawSnake();
	}
	if (menu == 1)
	{
	mainMenu();
	}
	if (menu == 2)
	{
	leaderBoard();
	//input.hide();
	}
}

function mainMenu()
{
	background(51);
	fill(56,56,56);
	rect(150,100,300,400);
	
	textSize(40);
	fill(255,255,255);
	text('Main Menu', 200, 150);
	
	textSize(30);
	fill(255,255,255);
	text('Score: ' + pastScore, 240, 210);
	
	fill(0);
	rect(240,250,120,50);
	fill(225);
	textSize(30);
	text('Play', 270, 285);
	if (mouseX >= 240 && mouseX <= 360 && mouseY >= 250 && mouseY <= 300 && mouseIsPressed)
	{
		menu = 0;
	}
	
	fill(0);
	rect(240,310,120,50);
	fill(225);
	textSize(30);
	text('LB', 280, 345);
	if (mouseX >= 240 && mouseX <= 360 && mouseY >= 310 && mouseY <= 360 && mouseIsPressed)
	{
		menu = 2;
	}
	
	/*
	fill(0);
	rect(240,370,120,50);
	fill(225);
	textSize(30);
	text('Submit', 255, 405);
	input.size(75,20);
	input.position(260, 440);
	const name = input.value();
	if (mouseX >= 240 && mouseX <= 360 && mouseY >= 370 && mouseY <= 420 && mouseIsPressed)
	{
		submitScore = true;
	}
	input.show();
	*/
}

function leaderBoard()
{
	background(51);
	fill(56,56,56);
	rect(150,100,300,400);
	
	textSize(40);
	fill(255,255,255);
	text('Leader Board', 180, 150);
	
	fill(0);
	rect(240,440,120,50);
	fill(225);
	textSize(30);
	text('Back', 265, 475);
	if (mouseX >= 240 && mouseX <= 360 && mouseY >= 440 && mouseY <= 490 && mouseIsPressed)
	{
		menu = 1;
	}
}

function moveSnake()
{	
	for (let i = snake.length-1; i > 0; i--)
	{
		snake[i].x = snake[i-1].x;
		snake[i].y = snake[i-1].y;
	}
	snake[0].x = snake[0].x + (20*dirX);
	snake[0].y = snake[0].y + (20*dirY);
}

function drawSnake()
{
	fill(15, 106, 252);
	for (let i = 0; i < snake.length; i++)
	{
		rect(snake[i].x,snake[i].y,20,20);
	}
}

function collisionCheck()
{
	if (snake[0].x > 580 || snake[0].x < 0 || snake[0].y > 580 || snake[0].y < 0)
	{
		die();
	}
	else if (snake[0].x == appleX && snake[0].y == appleY)
	{
		//print(snake.length);
		eatApple();
	}
	else
	{
		for (let i = 2; i < snake.length; i++)
		{
			if (snake[0].x == snake[i].x && snake[0].y == snake[i].y)
			{
				die();
			}
		}
	}
}

function die()
{
	reset();
}

function drawApple()
{
	fill(255,0,0);
	rect(appleX, appleY, 20, 20);
}

function eatApple()
{
	score++;
	if (timer > 5)
	{
	timer -= .5;
	}
	snake.push({x:snake[snake.length-1].x,y:snake[snake.length-1].y});
	let checking = true;
	while(checking)
	{
	appleX = Math.floor(random(0, 30)) * 20;
	appleY = Math.floor(random(0, 30)) * 20;
	for (let i = 0; i < snake.length; i++)
	{
		if (appleX == snake[i].x && appleY == snake[i].y)
		{
			checking = true;
			break;
		}
		else
		{
		checking = false;
		}
	}
	if (checking)
	{
		break;	
	}
	}
}

function keyPressed()
{
  if (keyCode == LEFT_ARROW && dirX != 1) 
  {
    	dirX = -1;
	dirY = 0;
  }
  else if (keyCode == RIGHT_ARROW && dirX != -1) 
  {
    dirX = 1;
		dirY = 0;
  } 
	
  if (keyCode == UP_ARROW && dirY != 1) 
  {
    dirY = -1;
		dirX = 0;
		
  }
  else if (keyCode == DOWN_ARROW && dirY != -1) 
  {
    dirY = 1;
		dirX = 0;
  } 
		
}

function getData()
{
	if (submitScore)
	{
	submitScore = false;
	return name + " " + pastScore + "\n";
	}
}