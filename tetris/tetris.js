let WIDTH = 0, HEIGHT = 0, time = 0, timer = 5, pieceType = 0, nextPiece = Math.floor(Math.random(0,7)), size = 0,
piece = [], board = [];

function setup()
{
	size = round(windowHeight/24);
	WIDTH = size*10;
	HEIGHT = size*24;
	createCanvas(WIDTH, HEIGHT);
	newPiece();
}

function reset()
{
	board = [];
	piece = [];
}

function draw()
{
	background(51);
	if (time >= timer)
	{
		time = 0;
		keys();
		update();
	} else {
		time += 1;
	}
	game();
	drawBoard();
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

function drawBoard()
{
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
    pieceType = nextPiece;
    nextPiece = Math.floor(random(0,7));
    
	//I
	if (pieceType == 0)
	{
		piece.push({x:startX,y:startY,c:co});
		piece.push({x:startX-(size*2),y:startY,c:co});
		piece.push({x:startX-size,y:startY,c:co});
		piece.push({x:startX+size,y:startY,c:co});
	}
	//BOX
	if (pieceType == 1)
	{
		piece.push({x:startX,y:startY,c:co});
		piece.push({x:startX-size,y:startY,c:co});
		piece.push({x:startX-size,y:startY-size,c:co});
		piece.push({x:startX,y:startY-size,c:co});
	}
	//T
	if (pieceType == 2)
	{
		piece.push({x:startX,y:startY,c:co});
		piece.push({x:startX+size,y:startY,c:co});
		piece.push({x:startX-size,y:startY,c:co});
		piece.push({x:startX,y:startY-size,c:co});
	}
	//L
	if (pieceType == 3)
	{
		piece.push({x:startX,y:startY,c:co});
		piece.push({x:startX+size,y:startY,c:co});
		piece.push({x:startX-size,y:startY,c:co});
		piece.push({x:startX+size,y:startY-size,c:co});
	}
	//J
	if (pieceType == 4)
	{
		piece.push({x:startX,y:startY,c:co});
		piece.push({x:startX+size,y:startY,c:co});
		piece.push({x:startX-size,y:startY,c:co});
		piece.push({x:startX-size,y:startY-size,c:co});
	}
	//Z
	if (pieceType == 5)
	{
		piece.push({x:startX,y:startY,c:co});
		piece.push({x:startX+size,y:startY,c:co});
		piece.push({x:startX-size,y:startY-size,c:co});
		piece.push({x:startX,y:startY-size,c:co});
	}
	//S
	if (pieceType == 6)
	{
		piece.push({x:startX,y:startY,c:co});
		piece.push({x:startX+size,y:startY-size,c:co});
		piece.push({x:startX-size,y:startY,c:co});
		piece.push({x:startX,y:startY-size,c:co});
	}
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
		if (pieceType != 1)
			Rotate(1);
	}
	if (key == 'x' || key == 'X')
	{
		if (pieceType != 1)
			Rotate(-1);
	}
}