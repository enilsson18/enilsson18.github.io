let WIDTH = 0, HEIGHT = 0, time = 0, timer = 5, nextPiece = 0, pieceType = 0, size = 0,
piece = [], board = [];

function setup()
{
	size = round(windowHeight/24);
	WIDTH = size*10;
	HEIGHT = size*24;
	createCanvas(WIDTH+size*5, HEIGHT);
	newPiece();
}

function reset()
{
	board = [];
	piece = [];
}

function draw()
{
	if (time >= timer)
	{
		time = 0;
		keys();
		update();
	} else {
		time += 1;
	}
	drawBoard();
    drawSideBar();
}

function update()
{
	let move = true;
	for (let i = 0; i < piece.length; i++)
	{
		if(collisionCheck(piece[i].x,piece[i].y+size))
		{
			placePiece();
			move = false;
			break;
		}
	}
	if (move)
	{
		for (let i = 0; i < piece.length; i++)
		{
			piece[i].y += size;
		}
	}
}

function drawSideBar()
{
    fill("#4181EE");
    rect(WIDTH, 0, 5*size, HEIGHT);
    fill(51);
    rect(WIDTH+size/2, size, 4*size, 4*size);
    for (var i = 0; i < nextPiece.length; i++)
    {
      fill(nextPiece[i].c);
      if (nextPiece[0].type == 1){
          rect(nextPiece[i].x+size*7.5, size*2 + nextPiece[i].y + size, size, size);
      } else if (nextPiece[0].type == 0){
        rect(nextPiece[i].x+size*7.5, size*1.5 + nextPiece[i].y + size, size, size);
      } else {
        rect(nextPiece[i].x+size*7, size*2 + nextPiece[i].y + size, size, size);
      }
    }
}

function drawBoard()
{
    fill(51);
	rect(0,0,WIDTH,HEIGHT);
	for (let i = 0; i < board.length; i++)
	{
		fill(board[i].c);
		rect(board[i].x, board[i].y, size, size);
	}
	for (let i = 0; i < piece.length; i++)
	{
		fill(piece[i].c);
		rect(piece[i].x, piece[i].y, size, size);
	}
}

function collisionCheck(posX, posY)
{
	for (let i = 0; i < board.length; i++)
	{
		if (board[i].x == posX && board[i].y == posY)
		{
			return true;
		}
	}
	if (posX < 0 || posX > WIDTH-size || posY < 0 || posY > HEIGHT-size)
	{
		return true;
	}
	return false;
}

function newPiece()
{
	let startX = WIDTH/2, startY = 0, co = color(random(0,255),random(0,255),random(0,255));
	piece = [];
	//pieceType = 1;
    if (nextPiece == 0)
    {
        nextPiece = pieceSetter(Math.floor(random(0,7)), startX, startY, co);
    }
    piece = nextPiece;
    nextPiece = pieceSetter(Math.floor(random(0,7)), startX, startY, co);
}

function pieceSetter(p, startX, startY, co){
  let pT = [];
  //I
	if (p == 0)
	{
		pT.push({x:startX,y:startY,c:co,type:0});
		pT.push({x:startX-(size*2),y:startY,c:co});
		pT.push({x:startX-size,y:startY,c:co});
		pT.push({x:startX+size,y:startY,c:co});
	}
	//BOX
	if (p == 1)
	{
		pT.push({x:startX,y:startY,c:co,type:1});
		pT.push({x:startX-size,y:startY,c:co});
		pT.push({x:startX-size,y:startY-size,c:co});
		pT.push({x:startX,y:startY-size,c:co});
	}
	//T
	if (p == 2)
	{
		pT.push({x:startX,y:startY,c:co,type:2});
		pT.push({x:startX+size,y:startY,c:co});
		pT.push({x:startX-size,y:startY,c:co});
		pT.push({x:startX,y:startY-size,c:co});
	}
	//L
	if (p == 3)
	{
		pT.push({x:startX,y:startY,c:co,type:3});
		pT.push({x:startX+size,y:startY,c:co});
		pT.push({x:startX-size,y:startY,c:co});
		pT.push({x:startX+size,y:startY-size,c:co});
	}
	//J
	if (p == 4)
	{
		pT.push({x:startX,y:startY,c:co,type:4});
		pT.push({x:startX+size,y:startY,c:co});
		pT.push({x:startX-size,y:startY,c:co});
		pT.push({x:startX-size,y:startY-size,c:co});
	}
	//Z
	if (p == 5)
	{
		pT.push({x:startX,y:startY,c:co,type:5});
		pT.push({x:startX+size,y:startY,c:co});
		pT.push({x:startX-size,y:startY-size,c:co});
		pT.push({x:startX,y:startY-size,c:co});
	}
	//S
	if (p == 6)
	{
		pT.push({x:startX,y:startY,c:co,type:6});
		pT.push({x:startX+size,y:startY-size,c:co});
		pT.push({x:startX-size,y:startY,c:co});
		pT.push({x:startX,y:startY-size,c:co});
	}
    return pT;
}

function placePiece()
{
	for (let i = 0; i < piece.length; i++)
	{
		board.push({x:piece[i].x,y:piece[i].y,c:piece[i].c});
		if (piece[i].y <= 0)
		{
			reset();
			break;
		}
	}
    game();
	newPiece();
}

function Rotate(dir)
{
	let temp = 0, rotate = true,
	centerX = piece[0].x,
	centerY = piece[0].y;
	for (let i = 0; i < piece.length; i++)
	{
		piece[i].x -= centerX;
		piece[i].y -= centerY;
		temp = piece[i].x;
		piece[i].x = piece[i].y * dir;
		piece[i].y = (-temp) * dir;
		piece[i].x += centerX;
		piece[i].y += centerY;
		if(collisionCheck(piece[i].x,piece[i].y))
		{
			rotate = false;
		}
	}
	if (!rotate)
	{
		for (let j = 0; j < 3; j++)
		{
			for (let i = 0; i < piece.length; i++)
			{
			piece[i].x -= centerX;
			piece[i].y -= centerY;
			temp = piece[i].x;
			piece[i].x = piece[i].y * dir;
			piece[i].y = (-temp) * dir;
			piece[i].x += centerX;
			piece[i].y += centerY;
			}
		}
	}
}

function game()
{
  let lines = [], newBoard = [];
  for (var i = 0; i < 24*10; i++)
  {
    newBoard.push(0);
  }
  for (var i = 0; i < board.length; i++)
  {
    newBoard[board[i].x/size + (10*(board[i].y/size))] = 1;
  }
  for (var i = 0; i < 24; i++)
  {
    for (var j = 0; j < 10; j++)
    {
      if (newBoard[j + (10*i)] != 1)
      {
        break;
      }
      if (j == 9)
      {
        lines.push(i);
      }
    }
  }
  for (var j = 0; j < lines.length; j++)
  {
    for (let i = 0; i < board.length; i++)
    {
      if (board[i].y == lines[j]*size)
	  {
		board.splice(i,1);
	  }
    }
    for (let i = 0; i < board.length; i++)
	{
		if (board[i].y < lines[j]*size)
		{
			board[i].y += size;
		}
	}
  }
}

function keys()
{
	let move = true;
	timer = 5;
	if (keyIsDown(DOWN_ARROW))
	{
		timer = 1;
	}
	if (keyIsDown(RIGHT_ARROW))
	{
		for (let i = 0; i < piece.length; i++)
		{
			if(collisionCheck(piece[i].x+size,piece[i].y))
			{
				move = false;
				break;
			}
		}
		if (move)
		{
			for (let i = 0; i < piece.length; i++)
			{
				piece[i].x += size;
			}
		}
	}
	if (keyIsDown(LEFT_ARROW))
	{
		for (let i = 0; i < piece.length; i++)
		{
			if(collisionCheck(piece[i].x-size,piece[i].y))
			{
				move = false;
				break;
			}
		}
		if (move)
		{
			for (let i = 0; i < piece.length; i++)
			{
				piece[i].x -= size;
			}
		}
	}
}

function keyPressed()
{
	if (key == 'z' || key == 'Z')
	{
		if (piece[0].type != 1)
			Rotate(1);
	}
	if (key == 'x' || key == 'X')
	{
		if (piece[0].type != 1)
			Rotate(-1);
	}
}