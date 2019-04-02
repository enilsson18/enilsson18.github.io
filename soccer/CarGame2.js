let redScore = 0, blueScore = 0, round = 1, phase = 1;
function setup()
{
    createCanvas(windowWidth, windowHeight);
    player2 = new Car(windowWidth/4,windowHeight/2, 40, 60, 0.1, 90);
    player = new Car((windowWidth/4)*3,windowHeight/2, 40, 60, 0.1, 270);
    ball = new Ball(windowWidth/2,windowHeight/2,50,2);
    angleMode(DEGREES);
}

function reset()
{
	redScore = 0;
	blueScore = 0;
	newRound();
}

function newRound()
{
	player2 = new Car(windowWidth/4,windowHeight/2, 40, 60, 0.1, 90);
    	player = new Car((windowWidth/4)*3,windowHeight/2, 40, 60, 0.1, 270);
    	ball = new Ball(windowWidth/2,windowHeight/2,50,2);
}

function draw() 
{
  	background(51);
	keys();
	carManager();
	game();
	ball.drawBall();
}

//traction is on a scale 1-20
function Car(x, y, width, length, speed, angle)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.length = length;
	this.speed = speed;
	this.traction = 3;
	this.vX = 0;
	this.vY = 0;
	this.rotation = angle+90;
	this.body = loadImage('car.png')
    	this.turnSpeed = .2;
    	this.forwardV = 0;
    	this.aV = 0;
    	this.aD = 0.9;
    	this.aA = 1.05;
    	//this.speedCap = 2;
	this.drawCar = function()
	{
   		push();
		translate(this.x,this.y);
    		rotate(this.rotation);
    		imageMode(CENTER);
		image(this.body,0, 0, this.length, this.width);
    		pop();
	}
	
	this.move = function()
	{
		this.vX += cos(this.rotation+180)*this.speed;
		this.vY += sin(this.rotation+180)*this.speed;
  		this.forwardV = sqrt(sq(this.vY)+sq(this.vX))/30;
		//print("moving " + this.vX + " " + this.vY);
	}
	
	this.rotateCar = function(dir)
	{
		this.aV += this.turnSpeed * dir;
		this.aV *= this.aA;
	}

	this.updateCar = function()
	{
		if (this.x > windowWidth)
		{
			this.vX = -this.vX;
			this.x = windowWidth;
		}
		if (this.x < 0)
		{
			this.vX = -this.vX;
			this.x = 0;
		}
		if (this.y > windowHeight)
		{
			this.vY = -this.vY;
			this.y = windowHeight;
		}
		if (this.y < 0)
		{
			this.vY = -this.vY;
			this.y = 0;
		}
		this.vX += cos(this.rotation+180)*this.forwardV;
		this.vY += sin(this.rotation+180)*this.forwardV;
		this.x += this.vX;
		this.y += this.vY;
		this.vX *= (100-(this.traction))/100;
		this.vY *= (100-(this.traction))/100;
		
		this.rotation += this.aV;
    		this.aV *= this.aD;
    		this.forwardV *= .97;
	}
	
	this.reverse = function()
	{
		this.vX += -cos(this.rotation+180)*this.speed;
		this.vY += -sin(this.rotation+180)*this.speed;
  		this.forwardV = -sqrt(sq(this.vY)+sq(this.vX))/30;
	}
}

function Ball(x,y,size,traction)
{
	this.x = x;
	this.y = y;
	this.size = size;
	this.t = traction;
	this.vX = 0;
	this.vY = 0;
	
	this.drawBall = function()
	{
		fill(0,0,255);
		ellipse(this.x,this.y,this.size,this.size);
		this.update();
	}
	
	this.update = function()
	{
		if (this.x + (this.size/2) > windowWidth || this.x - (this.size/2) < 0)
		{
			this.vX = -this.vX;
		}
		if (this.y + (this.size/2) > windowHeight || this.y - (this.size/2) < 0)
		{
			this.vY = -this.vY;
		}
		this.x += this.vX;
		this.y += this.vY;
		this.vX *= (100-this.t)/100;
		this.vY *= (100-this.t)/100;
	}
}

function game()
{
	fill(0);
	textSize(30);
	text(redScore,windowWidth/20,windowHeight/10);
	text(blueScore,(windowWidth/20)*18.5,windowHeight/10);
	fill(255,0,0);
	rect(0,windowHeight/3,10,windowHeight/3);
	rect(windowWidth-10,windowHeight/3,windowWidth,windowHeight/3);
	
	if (ball.x - (ball.size/2) <= 10 && ball.y - (ball.size/2) >= windowHeight/3 && ball.y + (ball.size/2) <= 2*(windowHeight/3))
	{
		blueScore += 1;
		newRound();
	}
	
	if (ball.x + (ball.size/2) >= windowWidth-10 && ball.y - (ball.size/2) >= windowHeight/3 && ball.y + (ball.size/2) <= 2*(windowHeight/3))
	{
		redScore += 1;
		newRound();
	}
}

function carManager()
{
	player2.updateCar();
	player2.drawCar();
	player.updateCar();
	player.drawCar();
	
	if (dist(player.x,player.y,ball.x,ball.y) <= (ball.size/2) + player.width/2)
	{
		ball.vX += player.vX;
		player.vX -= player.vX;
		
		ball.vY += player.vY;
		player.vY -= player.vY;
	}
	
	if (dist(player2.x,player2.y,ball.x,ball.y) <= (ball.size/2) + player2.width/2)
	{
		ball.vX += player2.vX;
		player2.vX -= player2.vX;
		
		ball.vY += player.vY;
		player2.vY -= player2.vY;
	}
	
	/*if (dist(player.x,player.y,player2.x,player2.y) < (player.width/2)+(player2.width/2))
	{
		player.vX += player2.vX;
		player.vY += player2.vY;
		player2.vX += player.vX;
		player2.vY += player.vY;
		
		player2.vX -= player2.vX;
		player2.vY -= player2.vY;
		player.vX -= player.vX;
		player.vY -= player.vY;
	}*/
}

function keys()
{
	if (keyIsDown(UP_ARROW))
	{
		player.move();
	}
	if (keyIsDown(DOWN_ARROW))
	{
		player.reverse();
	}
	if (keyIsDown(LEFT_ARROW))
	{
		player.rotateCar(-1);
	}
	if (keyIsDown(RIGHT_ARROW))
	{
		player.rotateCar(1);
	}
	if (keyIsDown(87))
	{
		player2.move();
	}
	if (keyIsDown(83))
	{
		player2.reverse();
	}
	if (keyIsDown(65))
	{
		player2.rotateCar(-1);
	}
	if (keyIsDown(68))
	{
		player2.rotateCar(1);
	}
}