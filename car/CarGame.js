let playerCount = 1, tempX = 0, tempY = 0;
function setup()
{
    createCanvas(windowWidth, windowHeight);
    player = new Car(windowWidth/4,windowHeight/2, 40, 60, 0.1, 0);
    player2 = new Car((windowWidth/4)*3,windowHeight/2, 40, 60, 0.1, 0);
    angleMode(DEGREES);
}

function draw() 
{
    	background(51);
	keys();
	carManager();
	text(windowWidth + " " + windowHeight,500,100);
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
		image(this.body, 0, 0, this.length, this.width);
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

function carManager()
{
	text("Speed: " + round(sqrt(sq(player.vX)+sq(player.vY))),50,50);
	player.updateCar();
	player.drawCar();
	if (playerCount == 2)
	{
		player2.updateCar();
		player2.drawCar();
		if (dist(player.x,player.y,player2.x,player2.y) < (player.width/2)+(player2.width/2))
		{
			player.vX += player2.vX;
			player.vY += player2.vY;
			player2.vX += player.vX;
			player2.vY += player.vY;
			
			player2.vX -= player2.vX;
			player2.vY -= player2.vY;
			player.vX -= player.vX;
			player.vY -= player.vY;
		}
	}
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
	if (keyIsDown && key == 'n')
	{
		playerCount = 2;
	}
	if (playerCount == 2)
	{
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
}