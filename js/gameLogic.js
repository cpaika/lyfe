//Lists of constants that should only be modified in the source code
var UPDATE_INTERVAL = 2000;
var RECT_SIZE = 10;


//lists of global state for testing
var alive;

function startGame()
{
	alive = [[]];
	var RECT_SIZE = parseInt(RECT_SIZE);
	//enter fullscreen mode if possible
	var cvs = document.getElementById("theCanvas");
	if(goFullScreen(cvs))
	{
		document.getElementById("theCanvas").width = window.innerWidth;//TODO this shouldn't be window
		document.getElementById("theCanvas").height = window.innerHeight;
	}
	setInitialState();
	cvs.addEventListener("mousedown", getMousePos, false);
	setInterval("update()", UPDATE_INTERVAL);
}

function update()
{
	drawRects(alive);
	calcChange(alive);
}

function drawRects(alive)
{
	var x = 0;
	var y = 0;
	var c = document.getElementById("theCanvas");
	var ctx = c.getContext("2d");
	ctx.fillStyle = "#000000";
	ctx.fillRect(0,0,document.getElementById("theCanvas").width, document.getElementById("theCanvas").height)
	ctx.fillStyle = "#FF0000";
	while(x*RECT_SIZE < c.width)
	{
		while(y*RECT_SIZE < c.height)
		{
			if(alive[x][y] != 0)
			{
				ctx.fillRect(x*RECT_SIZE,y*RECT_SIZE,RECT_SIZE,RECT_SIZE);
			}
			y = y + 1;
		}
		y = 0;
		x = x + 1;
	}
}

function drawAlive(aliveX, aliveY)
{
	var x = 0;
	var y = 0;
	var c = document.getElementById("theCanvas");
	var ctx = c.getContext("2d");
	ctx.fillStyle = "#FF0000";
	for(var i = 0; i < aliveX.length; i++)
	{
		x = parseInt(aliveX[i]*RECT_SIZE);
		y = parseInt(aliveY[i]*RECT_SIZE);
		console.log("x: " + x + " and after: " + (parseInt(x) + parseInt(RECT_SIZE)));
		console.log("y: " + y + " and after: " + (parseInt(y) + parseInt(RECT_SIZE)));
		ctx.fillRect(parseInt(x),parseInt(y),(parseInt(x) + parseInt(RECT_SIZE)),(parseInt(y) + parseInt(RECT_SIZE)));
	}
}

function setInitialState()
{
	for(var i = 0; (i*RECT_SIZE) < document.getElementById("theCanvas").width; i++)
	{
		alive[i] = [];
		for(var j = 0; (j*RECT_SIZE) < document.getElementById("theCanvas").height; j++)
		{
			//alive[i][j] = 0;
			alive[i][j] = 0;
		}
	}
	alive[20][40] = 1;
	alive[21][40] = 1;
	alive[21][41] = 1;
	alive[20][41] = 1;
	alive[30][90] = 1;
	alive[50][80] = 1;
	alive[34][40] = 1;
	alive[23][45] = 1;
	alive[24][60] = 1;
	alive[28][40] = 1;
}

function calcChange(alive)
{
	for(var i = 0; i < alive.length; i++)
	{
		for(var j = 0; j < alive[i].length; j++)
		{
			var count = countNeighbors(alive, i, j);
			if(count < 2)//rule 1
			{
				alive[i][j] = 0;
			}
			if(count == 3)//rule 4
			{
				console.log("Leaving a block alive");
				alive[i][j] = 1;
			}
			if(count > 3)
			{
				alive[i][j] = 0;
			}
		}
	}
}

function countNeighbors(alive, x, y)
{
	var count = 0;
	for(var f = parseInt(x - 1); f < parseInt(x +1); f++)
	{
		for(var j = parseInt(y-1); j < parseInt(y+1); j++)
		{
			if(((f!=x && j!=y)) && (f > 0) && (f < alive.length) && (j >0) && (j < alive[f].length))//edge cases 
			{
				count = count + (alive[f][j]);
				if(alive[f][j] == 1)
				{
					console.log(count);
				}
			}
		}
	}
	return count;
}
function goFullScreen(i)
{
	if (i.requestFullscreen) 
	{
    	i.requestFullscreen();
	} 
	else if (i.webkitRequestFullscreen) 
	{
    	i.webkitRequestFullscreen();
	} 
	else if (i.mozRequestFullScreen) 
	{
    	i.mozRequestFullScreen();
	} 
	else if (i.msRequestFullscreen) 
	{
    	i.msRequestFullscreen();
	}
	else
	{
		return false;
	}
	return true;
}

function getMousePos(event) 
{
	var x = event.x;
	var y = event.y;
	var canvas = document.getElementById("theCanvas");
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;
	var vector = convertScreenToBlock(x,y);
	addBlock(vector.x,vector.y);
}

function convertScreenToBlock(x,y)
{
	var vector = {x:0, y:0};
	vector.x = Math.round((x/RECT_SIZE) - (x%RECT_SIZE));
	vector.y = Math.round((y/RECT_SIZE) - (y%RECT_SIZE));
	return vector;
}


function addBlock(x, y)
{
	alive[x][y] = 1;
}