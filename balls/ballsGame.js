let level = 1, gameOver = false, map = [], balls = [], blockSize = 50, ballSize = 30, startTurns = true, angle = 0, 
ballSpeed = .05, stall,
ballF = 10, ballFTimer = 0;
function setup()
{
	createCanvas(400,600);
	reset();
}

function reset()
{
	level = 1;
	gameOver = false;
	balls = [];
	map = [];
	
	nextTurn();
}

function draw()
{
	background(51);
	if (!gameOver)
	{
		drawField();
		text("Score: " + level);
		if (startTurns)
		{
			startTurn();
		}
		else
		{
			updateBalls();
		}
	}
	else
	{
		endGame();
	}
}

function drawField()
{
	for (let i = 0; i < map.length; i++)
	{
		rect(map[i].x,map[i].y,blockSize,blockSize);
	}
	for (let i = 0; i < balls.length; i++)
	{
		ellipse(balls[i].x,balls[i].y, ballSize, ballSize);
	}
}

function nextTurn()
{
	for (let i = 0; i < map.length; i++)
	{
		map[i].y += blockSize;
		if (map[i].y >= 600-blockSize)
		{
			gameOver = true;
		}
	}
	for(let i = 0; i < 400; i+= blockSize)
	{
		map.push({x:i,y:0});
	}
	balls.push({x:400/2,y:600-(ballSize/2),vX:0,vY:0});
	startTurns = true;
}

function startTurn()
{
	line(balls[0].x,balls[0].y,mouseX,mouseY);
	if (mouseIsPressed)
	{
		startTurns = false;
		for (let i = 0; i < balls.length; i++)
		{
			balls[i].vX = ballSpeed * (mouseX-balls[i].x);
			balls[i].vY = ballSpeed * (mouseY-balls[i].y);
		}
	}
}

function updateBalls()
{
	stall = 0;
	for (let i = 0; i < balls.length; i++)
	{
			if (balls[i].x + balls[i].vX - ballSize < 0)
				balls[i].vX *= -1;
			if (balls[i].x + balls[i].vX + ballSize > 400)
				balls[i].vX *= -1;
			if (balls[i].y + balls[i].vY - ballSize < 0)
				balls[i].vY *= -1;
			if (balls[i].Y + balls[i].vY - ballSize > 600)
				balls[i].vY = 0;
			if (balls[i].vX == 0 && balls[i].vY == 0)
				stall += 1;
		
			balls[i].x += balls[i].vX;
			balls[i].y += balls[i].vY;
	}
	if (stall == balls.length)
	{
		nextTurn();
	}
}

function endGame()
{
	reset();
}