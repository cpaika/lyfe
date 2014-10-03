//Lists of constants that should only be modified in the source code
var UPDATE_INTERVAL = 1000;
var RECT_SIZE = 10;


//lists of global state for testing
var aliveX = [];
var aliveY = [];

function startGame()
{
	//enter fullscreen mode if possible
	var cvs = document.getElementById("theCanvas");
	if(goFullScreen(cvs))
	{
		document.getElementById("theCanvas").width = window.innerWidth;//TODO this shouldn't be window
		document.getElementById("theCanvas").height = window.innerHeight;
	}
	setInitialState();
	setInterval("update()", UPDATE_INTERVAL);
}

function update()
{
	drawRects();
	drawAlive(aliveX, aliveY);
}

function drawRects()
{
	var x = 0;
	var y = 0;
	var c = document.getElementById("theCanvas");
	var ctx = c.getContext("2d");
	ctx.fillStyle = "#000000";
	while(x*RECT_SIZE < c.width)
	{
		while(y*RECT_SIZE < c.height)
		{
			ctx.fillRect(x*RECT_SIZE,y*RECT_SIZE,(x*RECT_SIZE)+RECT_SIZE,(y*RECT_SIZE)+RECT_SIZE);
			y = y + 1;
		}
		y = 0;
		x = x + 1;
	}
}

function drawAlive(aliveX, aliveY)
{
	var c = document.getElementById("theCanvas");
	var ctx = c.getContext("2d");
	ctx.fillStyle = "#FF0000";
	for(var i = 0; i < aliveX.length; i++)
	{
		var x = aliveX[i]*RECT_SIZE;
		var y = aliveY[i]*RECT_SIZE;
		ctx.fillRect(x,y,x+RECT_SIZE,y+RECT_SIZE);
	}
}

function setInitialState()
{
	aliveX = [1,2,50,60,500];
	aliveY = [1,5,300,200,500];
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